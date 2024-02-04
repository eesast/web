import React, { useEffect, useState, Suspense } from "react";
import {
  Table,
  Button,
  message,
  Dropdown,
  Menu,
  Input,
  Layout,
  Row,
  Col,
  Spin,
  Typography,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { getUserInfo } from "../../api/helpers/auth";
//----根据队员信息查找队伍信息------
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
//----正在比赛的room信息
//----插入room和team------
//————创建thuaicode————
//————后端发送post————
import axios from "axios";
import dayjs from "dayjs";
import { useUrl } from "../../api/hooks/url";
import styled from "styled-components";
import * as graphql from "@/generated/graphql";
/* ---------------- 不随渲染刷新的常量 ---------------- */

/* ---------------- 主页面 ---------------- */
const ArenaPage: React.FC = () => {
  const userInfo = getUserInfo();
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  // --------------获取比赛状态-------------------
  const { data: contestData, error: contestError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  });

  // -----------------获取天梯队伍信息------------------
  const {
    data: scoreteamListData,
    //loading: scoreteamListLoading,
    error: scoreteamListError,
  } = graphql.useGetAllTeamInfo_ScoreSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  useEffect(() => {
    if (scoreteamListError) {
      message.error("获取对战信息失败");
      console.log(scoreteamListError.message);
    }
  });

  // -----------------根据队员id查询队伍id------------------
  const { data: isleaderData } = graphql.useIsTeamLeaderSuspenseQuery({
    variables: {
      _id: userInfo?._id!,
      contest_id: Contest_id,
    },
  });
  const { data: ismemberData } = graphql.useIsTeamMemberSuspenseQuery({
    variables: {
      _id: userInfo?._id!,
      contest_id: Contest_id,
    },
  });

  const teamid =
    isleaderData?.contest_team[0]?.team_id ||
    ismemberData?.contest_team_member[0]?.team_id;

  const { data: teamData } = teamid
    ? graphql.useGetTeamInfoSuspenseQuery({
        variables: {
          contest_id: Contest_id,
          team_id: teamid!,
        },
      })
    : { data: undefined };

  // -----------------获取正在比赛的room信息------------------
  const {
    data: roomStatusData,
    error: roomStatusError,
    refetch: roomStatusRefetch,
  } = graphql.useGetRoomInfo_StatusSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  useEffect(() => {
    if (roomStatusError) {
      message.error("获取对战信息失败");
      console.log(roomStatusError.message);
    }
  });

  // -----------------开启对战------------------
  const [insertRoom, { error: insertRoomError }] =
    graphql.useInsertRoomMutation();

  useEffect(() => {
    if (insertRoomError) {
      message.error("发起对战失败");
      console.log(insertRoomError.message);
    }
  });

  const [opponentTeamId, setOpponentTeamId] = useState("");
  // const setfight = (record: graphql.GetAllTeamInfoSubscription["contest_team"][0]) => {
  //     setTeamId(record.team_id);
  // };

  // -----------------天梯列表------------------
  const teamListColumns: TableProps<
    graphql.GetAllTeamInfoSubscription["contest_team"][0]
  >["columns"] = [
    {
      title: "队名",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "队长",
      key: "team_leader_id",
      render: (text, record) => record.team_leader_id?.name,
    },
    {
      title: "队员",
      key: "team_member",
      render: (text, record) =>
        record.contest_team_members.map((i) => [
          i.user_as_contest_team_member.name + "   ",
        ]),
    },
    {
      title: "队伍简介",
      dataIndex: "team_intro",
      key: "team_intro",
      ellipsis: true,
    },
    {
      title: "分数",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) =>
        a.status === "compiled"
          ? b.status === "compiled"
            ? Number(a.score) - Number(b.score)
            : 1
          : -1,
      defaultSortOrder: "descend",
    },
    {
      title: "对战",
      key: "fight",
      filters: [
        {
          text: "已编译代码的队伍",
          value: "compiled",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text, record) => (
        <Dropdown
          overlay={map_menu}
          trigger={["click"]}
          disabled={
            teamid === record.team_id ||
            teamData?.contest_team[0].status !== "compiled" ||
            record.status !== "compiled" ||
            contestData?.contest[0].status.slice(2, 3) !== "1"
          }
        >
          <Button
            className="ant-dropdown-link"
            onClick={() => {
              setOpponentTeamId(record.team_id);
            }}
          >
            开战！ <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  // -----------------对战选项------------------

  // --------------开启对战逻辑-------------------
  const fight = (map: number, team: boolean) => {
    roomStatusRefetch();
    console.log("Room Number:", roomStatusData?.contest_room.length);
    if (
      roomStatusData?.contest_room.length &&
      roomStatusData?.contest_room.length >= 10
    ) {
      message.warning("当前正在进行的比赛过多，请稍后再试");
      return;
    }
    (async () => {
      try {
        const roomId = await insertRoom({
          variables: {
            contest_id: Contest_id,
            team1_id: teamid,
            team2_id: opponentTeamId,
            created_at: dayjs()!,
          },
        });
        await axios.post("room", {
          contest_id: Contest_id,
          map: map,
          room_id: roomId.data?.insert_contest_room_one?.room_id,
          team_seq: team, // 一个是红队还是蓝队的标记
          exposed: 1,
        });
        message.success("已发起对战！");
        message.info("如需观战，可查看记录页面的端口号");
      } catch (e) {
        message.error("发起对战失败");
        console.log(e);
      }
    })();
  };

  // --------------搜索模块-------------------

  const [associatedValue, setAssociatedValue] = useState("");
  const [filterParamList, setFilterParamList] = useState(
    scoreteamListData?.contest_team,
  );
  useEffect(() => {
    if (associatedValue !== "") {
      setFilterParamList([]);
      setFilterParamList(
        scoreteamListData?.contest_team.filter((item) => {
          return (
            item.team_name?.indexOf(associatedValue) !== -1 ||
            item.team_leader_id?.name?.indexOf(associatedValue) !== -1
          );
        }),
      );
    } else {
      setFilterParamList(scoreteamListData?.contest_team);
    }
  }, [associatedValue, scoreteamListData?.contest_team]);
  /* ---------------- 随渲染刷新的组件 ---------------- */
  const map_menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          fight(0, false);
        }}
      >
        我选学生
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          fight(0, true);
        }}
      >
        我选TRICKER
      </Menu.Item>
    </Menu>
  );

  /* ---------------- 页面组件 ---------------- */
  const Container = styled.div`
    height: calc(100vh - 72px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Loading = () => {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
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
            placeholder="  队伍名称 / 队长"
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
            <Table
              //loading={scoreteamListLoading}
              dataSource={
                filterParamList as graphql.GetAllTeamInfoSubscription["contest_team"]
              }
              columns={teamListColumns}
              rowKey={(record) => record.team_id}
            ></Table>
          </Suspense>
        </Col>
      </Row>
    </Layout>
  );
};

export default ArenaPage;
