import React, { useEffect, useState, Suspense } from "react";
import {
  Tooltip,
  message,
  Divider,
  Form,
  Modal,
  Input,
  Layout,
  List,
  Row,
  Card,
  Col,
  Select,
  Typography,
  Checkbox,
  Avatar,
  Button,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { listFile, getAvatarUrl } from "../../api/cos";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import Loading from "../Components/Loading";

/* ---------------- 不随渲染刷新的常量和组件 ---------------- */
interface TeamLabelBind {
  team_id: string;
  label: string;
}
const { Option } = Select;

/* ---------------- 主页面 ---------------- */
const ArenaPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [runForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [opponentTeamId, setOpponentTeamId] = useState("");
  const [associatedValue, setAssociatedValue] = useState("");
  const [onlyCompiledTeams, setOnlyCompiledTeams] = useState(false);
  const [selectedMapId, setSelectedMapId] = useState("");
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  type VisibleContestTeam = graphql.GetTeamsQuery["contest_team"][0] & {
    isVisible: boolean;
  };
  const [filterParamList, setFilterParamList] = useState<VisibleContestTeam[]>(
    [],
  );

  // const [imageUrlList, setImageUrlList] = useState<string[]>([]); // 队伍头像数组

  //获取比赛状态
  const { data: contestData, error: contestError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: contestSwitchData } = graphql.useGetContestSwitchSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const { data: contestPlayersData } =
    graphql.useGetContestPlayersSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  const playerCount = contestPlayersData?.contest_player.length;

  //获取天梯队伍信息
  const { data: scoreteamListData, error: scoreteamListError } =
    graphql.useGetTeamsSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: teamData, error: teamDataError } =
    graphql.useGetTeamSuspenseQuery({
      variables: {
        user_uuid: user.uuid,
        contest_id: Contest_id,
      },
    });

  const team_id = teamData?.contest_team_member[0]?.contest_team.team_id;

  const { refetch: oppTeamStatusRefetch } =
    graphql.useGetTeamStatusSuspenseQuery({
      variables: {
        team_id: team_id,
      },
      skip: !team_id,
    });
  //为了避免点击后两次refetch造成延迟过久，这里opponent和us的data分开获取
  const { data: ourTeamStatusData } = graphql.useGetTeamStatusSuspenseQuery({
    variables: {
      team_id: team_id,
    },
    skip: !team_id,
  });
  const ourPlayersCount =
    ourTeamStatusData?.contest_team_by_pk?.contest_team_players_aggregate
      ?.aggregate?.count;
  const requiredPlayersCount =
    ourTeamStatusData?.contest_team_by_pk?.contest?.contest_players_aggregate
      ?.aggregate?.count;
  //获取正在比赛的room信息
  const {
    data: roomStatusData,
    error: roomStatusError,
    refetch: roomStatusRefetch,
  } = graphql.useGetRunningArenaRoomsSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const { data: contestMapData, error: contestMapError } =
    graphql.useGetContestMapsQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  /* ---------------- useEffect ---------------- */

  const rawTeamLabels = contestMapData?.contest_map.find((item) => {
    return item.map_id === selectedMapId;
  })?.team_labels;
  const teamLabels = rawTeamLabels ? JSON.parse(rawTeamLabels) : [];
  const uniqueTeamLabels = Array.from(new Set(teamLabels)) as any;

  /*
  useEffect(() => {
    // 获取所有头像 URL
    const fetchAvatars = async () => {
      const urls = await Promise.all(
        filterParamList.map(async (item) => {
          try {
            // 发起头像请求
            const files = await listFile(`avatar/${item.team_id}/`);
            const imageFiles = files.filter((file) =>
              /\.(jpe?g|png)$/i.test(file.Key)
            );
            if (imageFiles.length > 0) {
              const firstImage = imageFiles[0];
              return await getAvatarUrl(firstImage.Key);
            } else {
              return "/TeamOutlined.png"; // 使用默认头像 URL
            }
          } catch (error) {
            console.error("Failed to load avatar:", error);
            return "/TeamOutlined.png"; // 出现错误时使用默认头像 URL
          }
        })
      );
      setImageUrlList(urls);
    };

    fetchAvatars();
  }, [filterParamList]); // 每次 filterParamList 变化时重新获取
*/

  const [teamAvatars, setTeamAvatars] = useState<string[][]>([]); // 每支队伍的队员头像数组

  useEffect(() => {
    let isMounted = true;

    const fetchAvatar = async (userId: string | null | undefined) => {
      try {
        const files = await listFile(`avatar/${userId}/`);
        const imageFiles = files.filter((file) =>
          /\.(jpe?g|png)$/i.test(file.Key),
        );
        if (imageFiles.length > 0) {
          const firstImage = imageFiles[0];
          return getAvatarUrl(firstImage.Key);
        } else {
          return `https://api.dicebear.com/9.x/thumbs/svg?scale=80&backgroundType=gradientLinear&seed=${userId}`;
        }
      } catch (error) {
        console.error("Failed to load avatar:", error);
        return `https://api.dicebear.com/9.x/thumbs/svg?scale=80&backgroundType=gradientLinear&seed=${userId}`;
      }
    };

    const fetchTeamAvatars = async () => {
      const teamAvatarsPromises = filterParamList.map(async (team) => {
        const teamMembers = [...team.contest_team_members];

        const avatars = await Promise.all(
          teamMembers.map(async (member) => {
            if (member?.user.uuid) {
              return fetchAvatar(member.user.uuid);
            }
            return "/UserOutlined.png";
          }),
        );
        return avatars;
      });

      const result = await Promise.all(teamAvatarsPromises);
      if (isMounted) {
        setTeamAvatars(result);
      }
    };

    fetchTeamAvatars();

    return () => {
      isMounted = false;
    };
  }, [filterParamList]);

  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  });

  useEffect(() => {
    if (scoreteamListError) {
      message.error("获取对战信息失败");
      console.log(scoreteamListError.message);
    }
  });

  useEffect(() => {
    if (roomStatusError) {
      message.error("获取对战信息失败");
      console.log(roomStatusError.message);
    }
  });

  useEffect(() => {
    if (teamDataError) {
      message.error("队伍信息获取失败");
      console.log(teamDataError.message);
    }
  });

  useEffect(() => {
    if (contestMapError) {
      console.log(contestMapError.message);
    }
  }, [contestMapError]);

  useEffect(() => {
    setFilterParamList(
      scoreteamListData?.contest_team.map((team) => {
        const teamName = team.team_name;
        const teamLeader = team.team_leader?.realname;
        const teamPlayerCount =
          team.contest_team_players_aggregate.aggregate?.count;
        const isVisible =
          (teamName.includes(associatedValue) ||
            teamLeader?.includes(associatedValue)) &&
          (!onlyCompiledTeams || teamPlayerCount === playerCount);
        return { ...team, isVisible: isVisible || false };
      }) || [],
    );
  }, [associatedValue, onlyCompiledTeams, playerCount, scoreteamListData]);

  /* ---------------- 业务逻辑函数 ---------------- */
  const open = contestSwitchData?.contest_by_pk?.arena_switch;
  //检查对手队伍是否满足对战条件

  //开启对战逻辑
  const fight = (label_us: string, label_opponent: string, map_id: string) => {
    if (!open) {
      message.info("对战功能暂未开放");
      return;
    }
    const teamLabels: TeamLabelBind[] = [
      {
        team_id: team_id,
        label: label_us,
      },
      {
        team_id: opponentTeamId,
        label: label_opponent,
      },
    ];
    roomStatusRefetch();
    console.log("Room Number:", roomStatusData?.contest_room.length);
    if (
      roomStatusData?.contest_room.length &&
      roomStatusData?.contest_room.length >= 6
    ) {
      message.warning("当前正在进行的比赛过多，请稍后再试");
      return;
    }
    (async () => {
      try {
        await axios.post("/arena/create", {
          contest_name: contestData?.contest_by_pk?.name,
          team_labels: teamLabels,
          map_id: map_id,
        });
        message.success("已发起对战！");
        message.info("如需观战，可查看记录页面的端口号");
      } catch (e) {
        message.error("发起对战失败");
        console.log(e);
      }
    })();
  };

  const handleStartBattle = (item: any) => {
    console.log(item.team_id);
    if (!open) {
      message.info("对战功能暂未开放");
      return;
    }
    if (!team_id) {
      message.info("您尚未加入队伍，请先加入队伍");
      return;
    }
    if (ourPlayersCount !== requiredPlayersCount) {
      message.info("您的队伍代码未编译通过或角色未分配代码，请先完善");
      return;
    }
    if (item.team_id === team_id) {
      message.info("不能和自己的队伍对战");
      return;
    }
    oppTeamStatusRefetch({ team_id: item.team_id }).then((result) => {
      const playersCount =
        result.data?.contest_team_by_pk?.contest_team_players_aggregate
          .aggregate?.count;
      const requiredPlayersCount =
        result.data?.contest_team_by_pk?.contest.contest_players_aggregate
          .aggregate?.count;
      if (playersCount !== requiredPlayersCount) {
        setOpponentTeamId(item.team_id);
        message.info("该队伍代码未编译通过或角色未分配代码，请选择其他队伍");
      } else {
        setOpponentTeamId(item.team_id);
        setIsModalVisible(true);
      }
    });
  };
  /* ---------------- 页面组件 ---------------- */

  const getColorByRank = (rank: number, mode: any) => {
    if (rank <= 3) {
      const colors = ["#FFD700", "#C0C0C0", "#CD7F32"];
      return colors[rank - 1];
    }
    // 其他排名根据模式返回相应的颜色
    return mode === "dark" ? "#FFFFFF" : "#333333";
  };

  const getRankEmoji = (rank: number) => {
    const emojis = ["🥇", "🥈", "🥉"];
    return rank <= 3 ? emojis[rank - 1] : `${rank}`;
  };
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);

  return (
    <Layout>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={10}>
          <Typography.Title level={2}>天梯挑战</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Text mark>
            愈战愈勇，不断优化你的人工智能，去登顶天梯吧！
          </Typography.Text>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={10}>
          <Input
            value={associatedValue}
            onChange={(e) => {
              setAssociatedValue(e.target.value?.trim());
            }}
            placeholder="  队伍名称 / 队长"
            allowClear
            prefix={<SearchOutlined />}
          ></Input>
        </Col>
        <Col
          span={10}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Checkbox
            onChange={() => setOnlyCompiledTeams(!onlyCompiledTeams)}
            checked={onlyCompiledTeams}
            disabled={!(open && team_id)}
          >
            只看可发起对战的队伍
          </Checkbox>
          <Button
            style={{ marginLeft: 16 }}
            onClick={() => setIsSimplifiedView(!isSimplifiedView)}
          >
            {isSimplifiedView ? "详细模式" : "简洁模式"}
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Suspense fallback={<Loading />}>
            <List
              itemLayout="horizontal"
              dataSource={filterParamList}
              renderItem={(item, index) =>
                item.isVisible && (
                  <Content style={{ marginBottom: "20px" }}>
                    <Tooltip
                      title={open && team_id ? "点击开战" : ""}
                      placement="topRight"
                    >
                      {isSimplifiedView ? (
                        <Card
                          style={{
                            height: "50px",
                            width: "100%",
                            marginBottom: "-12px",
                            padding: "0 20px",
                          }}
                          hoverable={open && team_id}
                          onClick={() => handleStartBattle(item)}
                        >
                          <Row
                            align="middle"
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: -12,
                              marginLeft: -40,
                            }}
                          >
                            <Col span={3}>
                              <Typography.Text
                                style={{
                                  fontSize: "24px",
                                  fontWeight: "bold",
                                  height: "100%",
                                  lineHeight: 1,
                                  textAlign: "center",
                                  display: "block",
                                  width: "100%",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {getRankEmoji(index + 1)}
                              </Typography.Text>
                            </Col>

                            <Col span={8}>
                              <Typography.Text
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  textAlign: "left",
                                  lineHeight: 1,
                                  marginLeft: "20px",
                                }}
                              >
                                队名：{item.team_name}
                              </Typography.Text>
                            </Col>
                            <Col
                              span={8}
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Typography.Text
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                }}
                              >
                                队伍：
                                {teamAvatars[index]?.map(
                                  (avatarUrl, memberindex) => (
                                    <Tooltip
                                      title={
                                        <Typography.Text>
                                          姓名：
                                          {item.contest_team_members[
                                            memberindex
                                          ].user.realname || "暂无"}
                                          <br />
                                          院系：
                                          {item.contest_team_members[
                                            memberindex
                                          ].user.department || "暂无"}
                                          <br />
                                          班级：
                                          {item.contest_team_members[
                                            memberindex
                                          ].user.class || "暂无"}
                                          <br />
                                          学号：
                                          {item.contest_team_members[
                                            memberindex
                                          ].user.student_no || "暂无"}
                                          <br />
                                          清华邮箱：
                                          {item.contest_team_members[
                                            memberindex
                                          ].user.tsinghua_email || "暂无"}
                                        </Typography.Text>
                                      }
                                      placement="rightTop"
                                      color={
                                        mode === "dark" ? "black" : "white"
                                      }
                                      overlayStyle={{ maxWidth: "600px" }}
                                    >
                                      <Avatar
                                        key={memberindex}
                                        src={avatarUrl}
                                        size={24}
                                        style={{
                                          fontSize: "23px",
                                          marginRight: "10px",
                                        }}
                                      />
                                    </Tooltip>
                                  ),
                                )}
                              </Typography.Text>
                            </Col>

                            <Col span={4}>
                              <Typography.Text
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                  lineHeight: 1,
                                }}
                              >
                                积分：
                                {item.contest_team_rooms_aggregate.aggregate
                                  ?.sum?.score ?? "暂无记录"}
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Card>
                      ) : (
                        <Card
                          style={{ width: "100%", height: "130px" }}
                          styles={{
                            body: { paddingTop: "25px" },
                          }}
                          hoverable={open && team_id}
                          onClick={() => {
                            handleStartBattle(item);
                          }}
                        >
                          <Row
                            gutter={4}
                            align="middle"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <Col span={3}>
                              <Typography.Text
                                style={{
                                  display: "block",
                                  fontFamily: "Roboto",
                                  fontSize: "3.5rem",
                                  fontWeight: "normal",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  color: getColorByRank(index + 1, mode),
                                  lineHeight: "90px",
                                  textAlign: "center",
                                }}
                              >
                                {getRankEmoji(index + 1)}
                              </Typography.Text>
                            </Col>
                            <Col span={15}>
                              <Row style={{ marginBottom: "10px" }} gutter={4}>
                                <Col
                                  span={10}
                                  style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <Typography.Text
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    队名：{item.team_name}
                                  </Typography.Text>
                                </Col>
                                <Col
                                  span={14}
                                  style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <Typography.Text
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    队伍：
                                    {teamAvatars[index]?.map(
                                      (avatarUrl, memberindex) => (
                                        <Tooltip
                                          title={
                                            <Typography.Text>
                                              姓名：
                                              {item.contest_team_members[
                                                memberindex
                                              ].user.realname || "暂无"}
                                              <br />
                                              院系：
                                              {item.contest_team_members[
                                                memberindex
                                              ].user.department || "暂无"}
                                              <br />
                                              班级：
                                              {item.contest_team_members[
                                                memberindex
                                              ].user.class || "暂无"}
                                              <br />
                                              学号：
                                              {item.contest_team_members[
                                                memberindex
                                              ].user.student_no || "暂无"}
                                              <br />
                                              清华邮箱：
                                              {item.contest_team_members[
                                                memberindex
                                              ].user.tsinghua_email || "暂无"}
                                            </Typography.Text>
                                          }
                                          placement="rightTop"
                                          color={
                                            mode === "dark" ? "black" : "white"
                                          }
                                          overlayStyle={{ maxWidth: "600px" }}
                                        >
                                          <Avatar
                                            key={memberindex}
                                            src={avatarUrl}
                                            style={{
                                              fontSize: "26px",
                                              marginRight: "10px",
                                            }}
                                          />
                                        </Tooltip>
                                      ),
                                    )}
                                  </Typography.Text>
                                </Col>
                              </Row>
                              <Divider style={{ margin: "4px 0" }} />
                              <Row gutter={4} style={{ marginTop: "16px" }}>
                                <Col
                                  span={16}
                                  style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <Typography.Text style={{ fontSize: "16px" }}>
                                    队伍简介：{item.team_intro}
                                  </Typography.Text>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={5}>
                              <Typography.Text
                                style={{
                                  display: "block",
                                  fontSize: "26px",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                积分：
                                {item.contest_team_rooms_aggregate.aggregate
                                  ?.sum?.score ?? "暂无记录"}
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Card>
                      )}
                    </Tooltip>
                  </Content>
                )
              }
            />
          </Suspense>
        </Col>
      </Row>
      <Modal
        open={isModalVisible}
        title="发起对战"
        centered
        okText="对战！"
        maskClosable={false}
        onCancel={() => {
          setIsModalVisible(false);
          runForm.resetFields();
          setSelectedMapId("");
        }}
        onOk={() => {
          runForm.submit();
        }}
        destroyOnClose
      >
        <Form
          form={runForm}
          name="battle"
          onFinish={(values) => {
            const player = runForm.getFieldValue("round_player");
            const mapId = runForm.getFieldValue("map_id");
            const otherPlayers = uniqueTeamLabels.filter(
              (label: string) => label !== player,
            );
            const opponent =
              otherPlayers.length > 0 ? otherPlayers[0] : uniqueTeamLabels[0]; // Take the first available player as opponent
            fight(player, opponent, mapId);
            setIsModalVisible(false);
          }}
          onFinishFailed={(errorInfo: any) => {
            console.log("发起对战失败:", errorInfo);
          }}
        >
          <Form.Item
            name="map_id"
            label="比赛地图"
            rules={[{ required: true, message: "请选择比赛地图" }]}
          >
            <Select
              style={{ width: "40%" }}
              onChange={(value) => {
                setSelectedMapId(value);
                runForm.resetFields(["round_player"]);
              }}
              allowClear
            >
              {contestMapData?.contest_map.map((map) => (
                <Option key={map.map_id} value={map.map_id}>
                  {map.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Tooltip title={selectedMapId ? "" : "请先选择地图"}>
            <Form.Item
              name="round_player"
              label="比赛角色"
              rules={[{ required: true, message: "请选择比赛角色" }]}
            >
              <Select
                style={{ width: "40%" }}
                disabled={!selectedMapId}
                allowClear
              >
                {uniqueTeamLabels?.map((label: string, index: number) => (
                  <Option key={index} value={label}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Tooltip>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ArenaPage;
