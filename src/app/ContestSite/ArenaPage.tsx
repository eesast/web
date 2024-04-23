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
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import Loading from "../Components/Loading";
/* ---------------- 不随渲染刷新的常量 ---------------- */
interface TeamLabelBind {
  team_id: string;
  label: string;
}
const { Option } = Select;

/* ---------------- 不随渲染刷新的组件 ---------------- */
/* ---------------- 主页面 ---------------- */
const ArenaPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [runForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [opponentTeamId, setOpponentTeamId] = useState("");
  const [associatedValue, setAssociatedValue] = useState("");
  const [filterParamList, setFilterParamList] = useState<
    graphql.GetAllTeamInfo_ScoreQuery["contest_team"]
  >([]);

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  //获取比赛状态
  const { data: contestData, error: contestError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  //获取天梯队伍信息
  const { data: scoreteamListData, error: scoreteamListError } =
    graphql.useGetAllTeamInfo_ScoreSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: teamData, error: teamDataError } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: user.uuid,
      contest_id: Contest_id,
    },
  });

  const team_id = teamData?.contest_team_member[0]?.contest_team.team_id!;

  //获取正在比赛的room信息
  const {
    data: roomStatusData,
    error: roomStatusError,
    refetch: roomStatusRefetch,
  } = graphql.useGetRoomInfo_StatusSuspenseQuery({
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

  const rawTeamLabels = contestMapData?.contest_map[0]?.team_labels;
  // 将JSON字符串转换为数组
  const teamLabels = rawTeamLabels ? JSON.parse(rawTeamLabels) : [];

  //开启对战
  //const [insertRoom, { error: insertRoomError }] =
  // graphql.useInsertRoomMutation();

  /* ---------------- useEffect ---------------- */
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

  // useEffect(() => {
  //   if (insertRoomError) {
  //     message.error("发起对战失败");
  //     console.log(insertRoomError.message);
  //   }
  // });

  useEffect(() => {
    if (teamDataError) {
      message.error("队伍信息获取失败");
      console.log(teamDataError.message);
    }
  });

  useEffect(() => {
    if (contestMapError) {
      message.error("比赛地图加载失败");
      console.log(contestMapError.message);
    }
  }, [contestMapError]);
  //搜索模块
  useEffect(() => {
    if (associatedValue !== "") {
      setFilterParamList([]);
      setFilterParamList(
        scoreteamListData?.contest_team.filter((item) => {
          return (
            item.team_name?.indexOf(associatedValue) !== -1 ||
            item.team_leader?.realname?.indexOf(associatedValue) !== -1
          );
        }),
      );
    } else {
      setFilterParamList(scoreteamListData?.contest_team);
    }
  }, [associatedValue, scoreteamListData?.contest_team]);

  /* ---------------- 业务逻辑函数 ---------------- */
  //开启对战逻辑
  const fight = (label_us: string, label_opponent: string, map_id: string) => {
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
        //  await insertRoom({
        //   variables: {
        //     contest_id: Contest_id,
        //     team1_id: team_id,
        //     team2_id: opponentTeamId,
        //     created_at: dayjs()!,
        //   },
        // });
        await axios.post("/arena/create", {
          contest_name: contestData?.contest_by_pk?.name,
          team_labels: teamLabels,
          map_id: map_id,
          //room_id: roomId.data?.insert_contest_room_one?.room_id,
          //team_seq: team, // 一个是红队还是蓝队的标记
          //exposed: 1,
        });

        message.success("已发起对战！");
        message.info("如需观战，可查看记录页面的端口号");
      } catch (e) {
        message.error("发起对战失败");
        console.log(e);
      }
    })();
  };

  /* ---------------- 随渲染刷新的组件 ---------------- */
  /* ---------------- 页面组件 ---------------- */

  const getColorByRank = (rank: number) => {
    switch (rank) {
      case 1:
        return "#FFD700"; // 金色
      case 2:
        return "#C0C0C0"; // 银色
      case 3:
        return "#CD7F32"; // 铜色
      default:
        return "#E6E1E1"; // 默认颜色，例如黑色
    }
  };
  const getSizeByRank = (rank: number) => {
    switch (rank) {
      case 1:
        return "120px";
      case 2:
        return "105px";
      case 3:
        return "90px";
      default:
        return "75px";
    }
  };
  return (
    <Layout>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
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
            placeholder="队伍名称 / 队长"
            allowClear
            prefix={<SearchOutlined />}
          ></Input>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Suspense fallback={<Loading />}>
            <List
              itemLayout="horizontal"
              dataSource={
                filterParamList as graphql.GetAllTeamInfoSubscription["contest_team"]
              }
              renderItem={(item, index) => (
                <Content style={{ marginBottom: "20px" }}>
                  <Tooltip title="点击开战" placement="topRight">
                    <Card
                      style={{ width: "100%", height: "150px" }}
                      styles={{
                        body: { paddingTop: "30px" },
                      }}
                      hoverable
                      onClick={() => {
                        setIsModalVisible(true);
                        setOpponentTeamId(item.team_id);
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
                              fontSize: getSizeByRank(index + 1), //文本大小
                              fontWeight: "bold",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              color: getColorByRank(index + 1), // 文本颜色
                              lineHeight: "90px",
                              textShadow: "5px 5px 0 #666, 7px 7px 0 #eee",
                              textAlign: "center",
                              opacity: 0.9,
                            }}
                          >
                            {index + 1}
                          </Typography.Text>
                        </Col>
                        <Col span={14}>
                          <Row style={{ marginBottom: "20px" }} gutter={4}>
                            <Col
                              span={9}
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Typography.Text
                                style={{ fontSize: "20px", fontWeight: "bold" }}
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
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                              >
                                队员：
                                {[
                                  ...new Set([
                                    item.team_leader?.realname,
                                    ...item.contest_team_members.map(
                                      (i) => i.user?.realname,
                                    ),
                                  ]),
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </Typography.Text>
                            </Col>
                          </Row>
                          <Divider />
                          <Row gutter={4} style={{ marginBottom: "0px" }}>
                            <Col
                              span={14}
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
                        <Col span={6}>
                          <Typography.Text
                            style={{
                              display: "block",
                              fontSize: "30px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            分数：{item.score}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Card>
                  </Tooltip>
                </Content>
              )}
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
        }}
        onOk={() => {
          const player = runForm.getFieldValue("round_player");
          const mapId = runForm.getFieldValue("map_id");
          const otherPlayers = teamLabels.filter(
            (label: string) => label !== player,
          );
          const opponent = otherPlayers.length > 0 ? otherPlayers[0] : null; // Take the first available player as opponent
          fight(player, opponent, mapId);
        }}
        destroyOnClose
      >
        <Form
          form={runForm}
          name="battle"
          onFinishFailed={(errorInfo: any) => {
            console.log("Failed:", errorInfo);
          }}
          preserve={false}
        >
          <Form.Item
            name="map_id"
            label="比赛地图"
            rules={[{ required: true, message: "请选择比赛地图" }]}
          >
            <Select style={{ width: "40%" }} allowClear>
              {contestMapData?.contest_map.map((map) => (
                <Option key={map.map_id} value={map.map_id}>
                  {map.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="round_player"
            label="比赛角色"
            rules={[{ required: true, message: "请选择比赛角色" }]}
          >
            <Select style={{ width: "40%" }} allowClear>
              {teamLabels?.map((label: string, index: number) => (
                <Option key={index} value={label}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ArenaPage;
