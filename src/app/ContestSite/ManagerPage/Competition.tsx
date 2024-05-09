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

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title, Text } = Typography;
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

const Competition: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [runForm] = Form.useForm();
  const { Option } = Select;

  const { data: contestNameData } = graphql.useGetContestNameSuspenseQuery({
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
  useEffect(() => {
    if (contestMapError) {
      message.error("比赛地图加载失败");
      console.log(contestMapError.message);
    }
  }, [contestMapError]);

  const { data: contestRoundData, error: contestRoundError } =
    graphql.useGetContestRoundsQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  useEffect(() => {
    if (contestRoundError) {
      message.error("比赛轮次加载失败");
      console.log(contestRoundError.message);
    }
  }, [contestRoundError]);

  const [addContestRound, { error: addRoundError }] =
    graphql.useAddContestRoundMutation();

  useEffect(() => {
    if (addRoundError) {
      message.error("比赛轮次添加失败");
      console.log(addRoundError.message);
    }
  }, [addRoundError]);

  const {
    data: competitionRoomsData,
    error: getCompetitionRoomsError,
    refetch: refectCompetitionRooms,
  } = graphql.useGetCompetitionRoomsSuspenseQuery({
    variables: {
      contest_id: Contest_id,
      round_id: contestRoundData?.contest_round[0]?.round_id,
    },
    skip: !contestRoundData?.contest_round[0]?.round_id,
  });
  useEffect(() => {
    if (getCompetitionRoomsError) {
      message.error("获取比赛房间失败");
      console.log(getCompetitionRoomsError.message);
    }
  }, [getCompetitionRoomsError]);

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

  const exportCompetitionData = () => {
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
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.aoa_to_sheet(data);
      xlsx.utils.book_append_sheet(workBook, workSheet);
      xlsx.writeFile(workBook, `比赛信息_${contestName}.xlsx`);
    } catch (error) {
      message.error("比赛信息导出失败");
    }
  };

  const roomStatusLabels: { [key: string]: string } = {
    Finished: "已结束",
    Crashed: "非正常退出",
    Running: "进行中",
    Waiting: "排队等待中",
    Timeout: "运行超时",
  };

  const roomListColumns: TableProps<
    graphql.GetCompetitionRoomsQuery["contest_room"][0]
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
      title: "操作",
      key: "options",
      render: (text, record) => (
        <Space size="small">
          {record.status === "Finished" && (
            <Typography.Link onClick={() => download(record.room_id)}>
              下载回放
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
      await downloadFile(
        `${contestName}/competition/${roomId}/playback.thuaipb`,
      );
    } catch (err) {
      message.error(`比赛回放下载失败`);
      console.log(err);
    }
  };

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
            style={{ width: 120 }}
            defaultValue={contestRoundData?.contest_round[0]?.round_id}
            onChange={(value) =>
              refectCompetitionRooms({
                contest_id: Contest_id,
                round_id: value,
              })
            }
            options={contestRoundData?.contest_round.map((round) => ({
              label: round.name,
              value: round.round_id,
            }))}
          />
          <Progress
            percent={30}
            style={{ width: "calc(80vw - 360px)" }}
            size={["default", 16]}
          />
        </Space>
        <Suspense fallback={<Loading />}>
          <Table
            dataSource={
              competitionRoomsData?.contest_room as graphql.GetCompetitionRoomsQuery["contest_room"]
            }
            columns={roomListColumns}
            rowKey={(record) => record.room_id}
          ></Table>
        </Suspense>
        <Button
          icon={<DownloadOutlined />}
          onClick={exportCompetitionData}
          type="primary"
        >
          导出比赛信息
        </Button>
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

export default Competition;
