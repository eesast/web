import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  message,
  Input,
  Layout,
  Row,
  Col,
  Typography,
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
import { downloadFile } from "../../api/cos";
const { Text } = Typography;

const RecordPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const { data: contestData } = graphql.useGetContestInfoSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });
  const contest_name = contestData?.contest_by_pk?.name;

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
  useEffect(() => {
    if (getArenaRoomsError) {
      message.error("获取对战记录失败");
      console.log(getArenaRoomsError.message);
    }
  });

  const roomStatusLabels: { [key: string]: string } = {
    Finished: "已结束",
    Crashed: "非正常退出",
    Running: "进行中",
    Waiting: "排队等待中",
  };

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
      filters: team_id
        ? [
            {
              text: "只看自己",
              value: team_id,
            },
          ]
        : [],
      onFilter: (value, record) =>
        record.contest_room_teams[0]?.contest_team.team_id === value ||
        record.contest_room_teams[1]?.contest_team.team_id === value,
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
      title: "回放",
      key: "download",
      render: (text, record) => (
        <Row>
          <Button
            onClick={() => download(record)}
            disabled={record.status !== "Finished"}
          >
            下载
          </Button>
          <Col span={1} />
          <Button disabled={record.status !== "Finished"}>
            <Link
              to={url
                .append("room", record.room_id)
                .append("speed", 3)
                .link("playback")}
            >
              查看
            </Link>
          </Button>
        </Row>
      ),
    },
  ];

  const download = async (
    record: graphql.GetArenaRoomsSubscription["contest_room"][0],
  ) => {
    try {
      const codefile = {
        filename: record.created_at + "对战记录",
        url: `${contest_name}/arena/${record.room_id}/${record.room_id}.thuaipb`,
      };
      message.info("开始下载" + codefile.filename);
      downloadFile(codefile.url, codefile.filename);
    } catch (e) {
      console.log(e);
      message.info("下载失败");
    }
  };

  const [associatedValue, setAssociatedValue] = useState("");
  const [filterParamList, setFilterParamList] = useState(
    arenaRoomsData?.contest_room,
  );
  useEffect(() => {
    if (associatedValue !== "") {
      setFilterParamList([]);
      setFilterParamList(
        arenaRoomsData?.contest_room.filter((item) => {
          return (
            item.contest_room_teams[0]?.contest_team?.team_name?.indexOf(
              associatedValue,
            ) !== -1 ||
            item.contest_room_teams[1]?.contest_team?.team_name?.indexOf(
              associatedValue,
            ) !== -1
          );
        }),
      );
    } else {
      setFilterParamList(arenaRoomsData?.contest_room);
    }
  }, [associatedValue, arenaRoomsData?.contest_room]);

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
        <Col span={17}>
          <Typography.Text mark>在哪里跌倒，就在哪里爬起来！</Typography.Text>
        </Col>
        <Col span={4}>
          <Button
            size="large"
            type="primary"
            style={{
              width: "10vw",
            }}
          >
            <Link to={url.link("stream")}>观看直播</Link>
          </Button>
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
