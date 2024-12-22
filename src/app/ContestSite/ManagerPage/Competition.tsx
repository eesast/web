import React, { Suspense, useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Modal,
  Progress,
  Select,
  Space,
  Table,
  TableProps,
  Typography,
  message,
} from "antd";
import { ContestProps } from "..";
import axios from "axios";
import * as xlsx from "xlsx";
import { ForwardOutlined, DownloadOutlined } from "@ant-design/icons";
import * as graphql from "@/generated/graphql";
import { useUrl } from "@/api/hooks/url";
import { downloadFile } from "@/api/cos";
import dayjs from "dayjs";
import Loading from "@/app/Components/Loading";
import { useNavigate } from "react-router-dom";

/* ---------------- 接⼝和类型定义 ---------------- */
interface TeamLabelBind {
  team_id: string;
  label: string;
}

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title, Text } = Typography;
const { Option } = Select;
const roomStatusLabels: { [key: string]: string } = {
  Finished: "已结束",
  Crashed: "非正常退出",
  Running: "进行中",
  Waiting: "排队等待中",
  Timeout: "运行超时",
  Failed: "发起失败",
};
const cleanFileName = (fileName: string) => {
  // 定义非法字符正则表达式
  const illegalRe = /[/?<>\\:*|"]/g;
  // 定义保留名称的正则表达式，如CON, PRN, AUX, NUL等
  const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
  // 定义以点结束的正则表达式
  const windowsTrailingRe = /[. ]+$/;
  // 替换非法字符为空字符串
  const cleaned = fileName
    .replace(illegalRe, "")
    .replace(windowsTrailingRe, "");
  // 检查是否为Windows保留名称，如果是，添加前缀
  if (windowsReservedRe.test(cleaned)) {
    return `_${cleaned}`;
  }
  return cleaned;
};

/* ---------------- 主⻚⾯ ---------------- */
const Competition: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和引⼊的 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [runForm] = Form.useForm();
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: contestMapData, error: contestMapError } =
    graphql.useGetContestMapsQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  const { data: contestRoundData, error: contestRoundError } =
    graphql.useGetContestRoundsQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  const [addContestRound, { error: addRoundError }] =
    graphql.useAddContestRoundMutation();
  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestMapError) {
      message.error("比赛地图加载失败");
      console.log(contestMapError.message);
    }
  }, [contestMapError]);

  useEffect(() => {
    if (contestRoundError) {
      message.error("比赛轮次加载失败");
      console.log(contestRoundError.message);
    }
  }, [contestRoundError]);

  useEffect(() => {
    if (addRoundError) {
      message.error("比赛轮次添加失败");
      console.log(addRoundError.message);
    }
  }, [addRoundError]);
  /* ---------------- 业务逻辑函数 ---------------- */
  //运行比赛
  const runContest = async (round_name: string, map_uuid: string) => {
    try {
      const response = await addContestRound({
        variables: {
          contest_id: Contest_id,
          name: round_name,
          map_id: map_uuid,
        },
      });

      await axios.post("/competition/start-all", {
        round_id: response.data?.insert_contest_round_one?.round_id,
      });

      message.info("正在运行比赛:" + round_name);
    } catch (e) {
      message.error("运行比赛失败!");
      console.log(e);
    }
  };

  const handleRunContest = () => {
    runForm
      .validateFields()
      .then((values) => {
        const roundName = values.round_name;
        const contestMapId = values.map_id;
        runContest(roundName, contestMapId);
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  /* ---------------- ⻚⾯组件 ---------------- */
  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          开赛情况
        </Title>
        <Space
          size="middle"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Button
            type="primary"
            icon={<ForwardOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            新轮次
          </Button>
          <Select
            style={{ width: 160 }}
            defaultValue={contestRoundData?.contest_round[0]?.round_id}
            onChange={setRoundId}
            options={contestRoundData?.contest_round.map((round) => ({
              label: round.name,
              value: round.round_id,
            }))}
          />
        </Space>
        {roundId && <Round roundId={roundId} />}
        <Modal
          open={isModalVisible}
          title="运行比赛"
          centered
          okText="运行"
          maskClosable={false}
          onCancel={() => {
            setIsModalVisible(false);
            runForm.resetFields();
          }}
          onOk={handleRunContest}
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
              name="round_name"
              label="本轮比赛名称"
              rules={[{ required: true, message: "请输入比赛名称" }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="map_id"
              label="比赛地图"
              rules={[{ required: true, message: "请选择比赛地图" }]}
            >
              <Select style={{ width: "40%" }}>
                {contestMapData?.contest_map.map((map) => (
                  <Option key={map.map_id} value={map.map_id}>
                    {map.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </Layout>
  );
};

const Round: React.FC<{ roundId: string }> = ({ roundId }) => {
  /* ---------------- States 和引⼊的 Hooks ---------------- */
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

  const { data: competitionRoomsData, error: getCompetitionRoomsError } =
    graphql.useGetCompetitionRoomsSubscription({
      variables: {
        contest_id: Contest_id,
        round_id: roundId,
      },
    });

  const {
    data: teamsCompetitionResultData,
    error: getTeamsCompetitionResultError,
  } = graphql.useGetTeamsCompetitionResultSuspenseQuery({
    variables: {
      contest_id: Contest_id,
      round_id: roundId,
    },
  });
  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (getCompetitionRoomsError) {
      message.error("获取比赛房间失败");
      console.log(getCompetitionRoomsError.message);
    }
  }, [getCompetitionRoomsError]);
  useEffect(() => {
    if (getTeamsCompetitionResultError) {
      message.error("获取队伍比赛结果失败");
      console.log(getTeamsCompetitionResultError.message);
    }
  }, [getTeamsCompetitionResultError]);
  /* ---------------- 业务逻辑函数 ---------------- */
  const exportCompetitionRooms = () => {
    try {
      let data: any = [];
      data = data.concat(
        // 函数concat 把队伍信息和成员信息连接起来
        // eslint-disable-next-line
        competitionRoomsData?.contest_room.map((room) => [
          room.room_id,
          room.created_at,
          room.contest_room_teams[0]?.team_label ?? "Default",
          room.contest_room_teams[0]?.contest_team.team_name,
          room.contest_room_teams[0]?.score,
          room.contest_room_teams[1]?.team_label ?? "Default",
          room.contest_room_teams[1]?.contest_team.team_name,
          room.contest_room_teams[1]?.score,
          room.status,
        ]),
      );
      const contestName = cleanFileName(contestNameData?.contest_by_pk?.name!);
      const roundName = cleanFileName(
        teamsCompetitionResultData?.contest_round_by_pk?.name!,
      );
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.aoa_to_sheet(data);
      xlsx.utils.book_append_sheet(workBook, workSheet);
      xlsx.writeFile(workBook, `比赛记录_${contestName}_${roundName}.xlsx`);
    } catch (error) {
      message.error("比赛记录导出失败");
    }
  };

  const exportCompetitionResult = () => {
    try {
      let data: any = [];
      data = data.concat(
        // 函数concat 把队伍信息和成员信息连接起来
        // eslint-disable-next-line
        teamsCompetitionResultData?.contest_team.map((team) =>
          [
            team.team_name,
            team.contest_team_rooms_aggregate.aggregate?.count,
            team.contest_team_rooms_aggregate.aggregate?.sum?.score,
          ].concat(
            team.contest_team_members?.map(
              (member) =>
                `${member.user.realname} (${member.user.class}, ${member.user.student_no})`,
            ),
          ),
        ),
      );
      const contestName = cleanFileName(contestNameData?.contest_by_pk?.name!);
      const roundName = cleanFileName(
        teamsCompetitionResultData?.contest_round_by_pk?.name!,
      );
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.aoa_to_sheet(data);
      xlsx.utils.book_append_sheet(workBook, workSheet);
      xlsx.writeFile(workBook, `比赛结果_${contestName}_${roundName}.xlsx`);
    } catch (error) {
      message.error("比赛结果导出失败");
    }
  };

  const roomListColumns: TableProps<
    graphql.GetCompetitionRoomsSubscription["contest_room"][0]
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
      filters: Object.keys(roomStatusLabels).map((key) => ({
        text: roomStatusLabels[key],
        value: key,
      })),
      onFilter: (value, record) => record.status === value,
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
            <Typography.Link
              onClick={() => download(record.round_id, record.room_id)}
            >
              下载回放
            </Typography.Link>
          )}
          {record.status === "Finished" && (
            <Typography.Link
              disabled={!contestSwitchData?.contest_by_pk?.playback_switch}
              onClick={() =>
                navigate(
                  url
                    .append("room", record.room_id)
                    .append("competition", record.room_id)
                    .link("playback"),
                )
              }
            >
              在线回放
            </Typography.Link>
          )}
          {record.status !== "Waiting" && (
            <Typography.Link
              onClick={() => {
                const teamLabels: TeamLabelBind[] = [
                  {
                    team_id:
                      record.contest_room_teams[0]!.contest_team.team_id!,
                    label: record.contest_room_teams[0]!.team_label!,
                  },
                  {
                    team_id:
                      record.contest_room_teams[1]!.contest_team.team_id!,
                    label: record.contest_room_teams[1]!.team_label!,
                  },
                ];
                restart(record.round_id, teamLabels);
              }}
            >
              发起重赛
            </Typography.Link>
          )}
        </Space>
      ),
    },
  ];

  const download = async (roundId: string, roomId: string) => {
    try {
      const contestName = contestNameData?.contest_by_pk?.name;
      message.loading(`即将下载比赛回放`);
      await downloadFile(
        `${contestName}/competition/${roundId}/${roomId}/playback.thuaipb`,
      );
    } catch (err) {
      message.error(`比赛回放下载失败`);
      console.log(err);
    }
  };

  const restart = async (roundId: string, teamLabels: TeamLabelBind[]) => {
    try {
      await axios.post("/competition/start-one", {
        round_id: roundId,
        team_labels: teamLabels,
      });
      message.info(`发起重赛成功`);
    } catch (err) {
      message.error(`发起重赛失败`);
      console.log(err);
    }
  };

  const roomCount = competitionRoomsData?.contest_room.length ?? 1;
  const finishedRoomCount =
    competitionRoomsData?.contest_room.filter(
      (room) => room.status === "Finished",
    ).length ?? 0;
  const coveredRoomCount =
    competitionRoomsData?.contest_room.filter(
      (room) =>
        room.status === "Failed" ||
        room.status === "Crashed" ||
        room.status === "Timeout" ||
        room.status === "Finished",
    ).length ?? 0;
  const coveredRate = (coveredRoomCount / roomCount) * 100;
  const finishedRate = (finishedRoomCount / roomCount) * 100;
  /* ---------------- ⻚⾯组件 ---------------- */
  return (
    <Suspense fallback={<Loading />}>
      <Progress
        format={() => `${finishedRoomCount}/${coveredRoomCount}/${roomCount}`}
        percent={coveredRate}
        success={{ percent: finishedRate }}
        status="active"
        style={{ width: "100%", paddingRight: "50px", marginBottom: "24px" }}
        size={["default", 16]}
      />
      <Table
        dataSource={
          competitionRoomsData?.contest_room as graphql.GetCompetitionRoomsSubscription["contest_room"]
        }
        columns={roomListColumns}
        rowKey={(record) => record.room_id}
      ></Table>
      <Space size="middle">
        <Button
          icon={<DownloadOutlined />}
          onClick={exportCompetitionRooms}
          type="primary"
        >
          导出比赛记录
        </Button>
        <Button
          icon={<DownloadOutlined />}
          onClick={exportCompetitionResult}
          type="primary"
        >
          导出比赛结果
        </Button>
      </Space>
    </Suspense>
  );
};

export default Competition;
