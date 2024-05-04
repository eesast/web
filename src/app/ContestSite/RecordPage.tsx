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
// import axios, { AxiosError } from "axios";
// import FileSaver from "file-saver";
import dayjs from "dayjs";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import Loading from "../Components/Loading";
const { Text } = Typography;

const RecordPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

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
            【{record.contest_room_teams[0]?.team_label ?? "Team1"}】
            {record.contest_room_teams[0]?.contest_team.team_name}：
            {record.contest_room_teams[0]?.score}
            <br />【{record.contest_room_teams[1]?.team_label ?? "Team2"}】
            {record.contest_room_teams[1]?.contest_team.team_name}：
            {record.contest_room_teams[1]?.score}
          </Text>
        );
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (record.status ? "已结束" : "正在进行"),
    },
    {
      title: "观战端口",
      dataIndex: "port",
      key: "port",
      render: (text, record) =>
        record.status ? "--" : record.port ? record.port : "等待分配",
    },
    {
      title: "回放",
      key: "download",
      render: (text, record) => (
        <Row>
          <Button
            onClick={() => download(record)}
            disabled={record.status !== "true"}
          >
            下载
          </Button>
          <Col span={1} />
          <Button disabled={record.status !== "true"}>
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
    message.info("暂不支持下载");
    // try {
    //   const response = await axios.get(`room/${record.room_id}`, {
    //     responseType: "blob",
    //   });
    //   FileSaver.saveAs(response.data, record.room_id + ".thuaipb");
    // } catch (e) {
    //   const err = e as AxiosError;
    //   if (err.response?.status === 401) {
    //     message.error("认证失败");
    //   } else {
    //     message.error("未知错误");
    //   }
    // }
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
