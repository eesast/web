import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  message,
  Input,
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Checkbox,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
//----根据队员信息查找队伍信息------
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
//----回放信息------
//----插入room和team------
//----删除room和team
//————创建thuaicode————
//————后端发送post————
import dayjs from "dayjs";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import Loading from "../Components/Loading";
import { downloadFile } from "@/api/cos";

/* ---------------- 不随渲染刷新的常量和组件 ---------------- */
const { Text } = Typography;
const roomStatusLabels: { [key: string]: string } = {
  Finished: "已结束",
  Crashed: "非正常退出",
  Running: "进行中",
  Waiting: "排队等待中",
  Timeout: "运行超时",
  Failed: "发起失败",
};
/* ---------------- 主⻚⾯ ---------------- */
const RecordPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和引⼊的 Hooks ---------------- */
  const [onlyMyTeam, setOnlyMyTeam] = useState(false);
  const [associatedValue, setAssociatedValue] = useState("");
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const navigate = useNavigate();
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: contestNameData } = graphql.useGetContestNameSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const { data: contestSwitchData } = graphql.useGetContestSwitchSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const { data: teamData } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: user.uuid,
      contest_id: Contest_id,
    },
  });

  const team_id = teamData?.contest_team_member[0]?.contest_team.team_id!;

  const { data: arenaRoomsData, error: getArenaRoomsError } =
    graphql.useGetArenaRoomsSubscription({
      variables: {
        contest_id: Contest_id,
      },
    });
  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (getArenaRoomsError) {
      message.error("获取对战记录失败");
      console.log(getArenaRoomsError.message);
    }
  });
  /* ---------------- 业务逻辑函数 ---------------- */
  const roomListColumns: TableProps<
    graphql.GetArenaRoomsSubscription["contest_room"][0]
  >["columns"] = [
    {
      title: "对战时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) =>
        dayjs(record.created_at).format("MM-DD HH:mm:ss"),
    },
    {
      title: "对战双方",
      key: "team_name",
      render: (text, record) => {
        return (
          <Text>
            【{record.contest_room_teams[0]?.team_label ?? "Default"}】
            {record.contest_room_teams[0]?.contest_team.team_name}：
            {record.contest_room_teams[0]?.score ?? "0"}
            <br />【{record.contest_room_teams[1]?.team_label ?? "Default"}】
            {record.contest_room_teams[1]?.contest_team.team_name}：
            {record.contest_room_teams[1]?.score ?? "0"}
          </Text>
        );
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text, record) => roomStatusLabels[record.status] ?? "未知状态",
    },
    {
      title: "观战端口",
      dataIndex: "port",
      key: "port",
      render: (text, record) => record.port ?? "----",
    },
    {
      title: "操作",
      key: "options",
      render: (text, record) => (
        <Space size="small">
          {record.status === "Running" && (
            <Typography.Link
              disabled={!contestSwitchData?.contest_by_pk?.stream_switch}
              onClick={() =>
                navigate(
                  url
                    .append("port", record.port)
                    .link(
                      contestNameData?.contest_by_pk?.name === "THUAI6"
                        ? "stream-native"
                        : "stream",
                    ),
                )
              }
            >
              观看直播
            </Typography.Link>
          )}
          {record.status === "Finished" && (
            <Typography.Link onClick={() => download(record.room_id)}>
              下载回放
            </Typography.Link>
          )}
          {record.status === "Finished" && (
            <Typography.Link
              disabled={!contestSwitchData?.contest_by_pk?.playback_switch}
              onClick={() =>
                navigate(url.append("room", record.room_id).link("playback"))
              }
            >
              在线回放
            </Typography.Link>
          )}
        </Space>
      ),
    },
  ];

  const download = async (roomId: string) => {
    try {
      const contestName = contestNameData?.contest_by_pk?.name;
      message.loading(`即将下载比赛回放`);
      await downloadFile(`${contestName}/arena/${roomId}/playback.thuaipb`);
    } catch (err) {
      message.error(`比赛回放下载失败`);
      console.log(err);
    }
  };

  const [filterParamList, setFilterParamList] = useState(
    arenaRoomsData?.contest_room,
  );
  useEffect(() => {
    setFilterParamList(
      arenaRoomsData?.contest_room?.filter((room) => {
        const teamId1 = room.contest_room_teams[0]?.contest_team.team_id;
        const teamId2 = room.contest_room_teams[1]?.contest_team.team_id;
        const teamName1 = room.contest_room_teams[0]?.contest_team.team_name;
        const teamName2 = room.contest_room_teams[1]?.contest_team.team_name;
        return (
          (teamName1?.includes(associatedValue) ||
            teamName2?.includes(associatedValue)) &&
          (!onlyMyTeam || teamId1 === team_id || teamId2 === team_id)
        );
      }) ?? [],
    );
  }, [associatedValue, arenaRoomsData, onlyMyTeam, team_id]);
  /* ---------------- ⻚⾯组件 ---------------- */
  return (
    <Layout>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Title level={2}>对战记录</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Text mark>在哪里跌倒，就在哪里爬起来！</Typography.Text>
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
            placeholder="  队伍名称"
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
            onChange={() => {
              setOnlyMyTeam(!onlyMyTeam);
            }}
            checked={onlyMyTeam}
            disabled={!team_id}
          >
            只看我的队伍
          </Checkbox>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Suspense fallback={<Loading />}>
            <Table
              dataSource={
                filterParamList as graphql.GetArenaRoomsSubscription["contest_room"]
              }
              columns={roomListColumns}
              rowKey={(record) => record.room_id}
            ></Table>
          </Suspense>
        </Col>
      </Row>
    </Layout>
  );
};

export default RecordPage;
