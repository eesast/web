/* 本页面需要实现的功能：
 * 1、创建队伍
 * 2、将学生添加至指定队伍
 * 3、上传、下载代码
 * 4、手动编译(尚未实现)
 * 5、控制开放比赛提交代码、编译
 */

import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Drawer,
  Layout,
  message,
  Space,
  Table,
  Typography,
} from "antd";
import { TableProps } from "antd/lib/table";
import { DownloadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import * as xlsx from "xlsx";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from "..";
import Loading from "@/app/Components/Loading";
import { downloadFile } from "@/api/cos";

/* ---------------- 不随渲染刷新的常量和组件 ---------------- */
const { Title } = Typography;
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
/* ---------------- 主页面 ---------------- */
const ManageTeams: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const contest_id = url.query.get("contest")!;

  const [showTeamInfo, setShowTeamInfo] = useState(false);
  const [showTeamCode, setShowTeamCode] = useState(false);
  const [teamId, setTeamId] = useState<string | null>(null);
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: contestNameData, error: contestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: contest_id,
      },
    });

  const { data: teamsData, error: getTeamsError } =
    graphql.useGetTeamsSuspenseQuery({
      variables: {
        contest_id: contest_id,
      },
    });
  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestNameError) {
      message.error("比赛信息加载失败");
    }
  }, [contestNameError]);
  useEffect(() => {
    if (getTeamsError) {
      message.error("队伍列表加载失败");
    }
  }, [getTeamsError]);
  /* ---------------- 业务逻辑函数 ---------------- */
  const exportTeamsData = () => {
    try {
      let data: any = [];
      data = data.concat(
        // 函数concat 把队伍信息和成员信息连接起来
        // eslint-disable-next-line
        teamsData?.contest_team.map((team) =>
          [
            team.team_name,
            team.team_intro,
            team.team_leader?.realname,
            team.team_leader?.class,
            team.team_leader?.student_no,
          ].concat(
            team.contest_team_members?.map(
              (member) =>
                `${member.user.realname} (${member.user.class}, ${member.user.student_no})`,
            ),
          ),
        ),
      );
      const contestName = cleanFileName(contestNameData?.contest_by_pk?.name!);
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.aoa_to_sheet(data);
      xlsx.utils.book_append_sheet(workBook, workSheet);
      xlsx.writeFile(workBook, `队伍信息_${contestName}.xlsx`);
    } catch (error) {
      message.error("队伍信息导出失败");
    }
  };

  const teamListColumns: TableProps<
    graphql.GetTeamsQuery["contest_team"][0]
  >["columns"] = [
    {
      title: "队名",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "成员",
      key: "team_member",
      render: (text, record) =>
        record.contest_team_members.map((i) => [`${i.user.realname}   `]),
    },
    {
      title: "已提交代码数",
      dataIndex: "code_num",
      key: "code_num",
      render: (text, record) =>
        record.contest_team_codes_aggregate.aggregate?.count,
    },
    {
      title: "已选择代码数",
      dataIndex: "selected_code_num",
      key: "selected_code_num",
      render: (text, record) =>
        record.contest_team_players_aggregate.aggregate?.count,
    },
    {
      title: "对战次数",
      dataIndex: "contest_num",
      key: "contest_num",
      render: (text, record) =>
        record.contest_team_rooms_aggregate.aggregate?.count,
      sorter: (a, b) =>
        a.contest_team_rooms_aggregate.aggregate?.count! -
        b.contest_team_rooms_aggregate.aggregate?.count!,
    },
    {
      title: "天梯总分数",
      dataIndex: "contest_score",
      key: "contest_score",
      render: (text, record) =>
        record.contest_team_rooms_aggregate.aggregate?.sum?.score,
      sorter: (a, b) =>
        a.contest_team_rooms_aggregate.aggregate?.sum?.score! -
        b.contest_team_rooms_aggregate.aggregate?.sum?.score!,
    },
    {
      title: "详情",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Typography.Link
            onClick={() => {
              setShowTeamInfo(true);
              setTeamId(record.team_id);
            }}
          >
            队伍主页
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              setShowTeamCode(true);
              setTeamId(record.team_id);
            }}
          >
            队伍代码
          </Typography.Link>
        </Space>
      ),
    },
  ];

  /* ---------------- 页面组件 ---------------- */
  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
          width: "100%",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          队伍管理
        </Title>
        <Suspense fallback={<Loading />}>
          <Table
            dataSource={(teamsData as graphql.GetTeamsQuery)?.contest_team}
            columns={teamListColumns}
            rowKey={(record) => record.team_id}
          />
        </Suspense>
        <Button
          icon={<DownloadOutlined />}
          onClick={exportTeamsData}
          type="primary"
        >
          导出队伍信息
        </Button>
      </Card>
      <Drawer
        title="队伍主页"
        placement="right"
        closable={false}
        open={showTeamInfo}
        onClose={() => setShowTeamInfo(false)}
        key="team_info"
      >
        {teamId && <ManageTeamInfo teamId={teamId} />}
      </Drawer>
      <Drawer
        title="队伍代码"
        placement="right"
        closable={false}
        open={showTeamCode}
        onClose={() => setShowTeamCode(false)}
        key="team_code"
      >
        {teamId && <ManageTeamCode teamId={teamId} />}
      </Drawer>
    </Layout>
  );
};

const ManageTeamInfo: React.FC<{ teamId: string }> = ({ teamId }) => {
  const { data: teamInfoData, error: getTeamInfoError } =
    graphql.useGetTeamInfoSuspenseQuery({
      variables: {
        team_id: teamId,
      },
      skip: !teamId,
    });
  useEffect(() => {
    if (getTeamInfoError) {
      message.error("队伍信息加载失败");
    }
  }, [getTeamInfoError]);

  return (
    <>
      <p>队名：{teamInfoData?.contest_team_by_pk?.team_name}</p>
      <p>队长：{teamInfoData?.contest_team_by_pk?.team_leader.realname}</p>
      <p>邀请码：{teamInfoData?.contest_team_by_pk?.invited_code}</p>
      <p>队伍简介：{teamInfoData?.contest_team_by_pk?.team_intro}</p>
      <Divider />
      {teamInfoData?.contest_team_by_pk?.contest_team_members.map((member) => (
        <>
          <p>成员姓名：{member.user.realname}</p>
          <p>成员班级：{member.user.class}</p>
          <p>成员学号：{member.user.student_no}</p>
          <Divider />
        </>
      ))}
    </>
  );
};

const ManageTeamCode: React.FC<{ teamId: string }> = ({ teamId }) => {
  /* ---------------- States 和引⼊的 Hooks ---------------- */
  const url = useUrl();
  const contest_id = url.query.get("contest")!;
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: contestNameData, error: contestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: contest_id,
      },
    });

  const { data: teamPlayersData, error: getTeamPlayersError } =
    graphql.useGetTeamPlayersSuspenseQuery({
      variables: {
        team_id: teamId,
      },
      skip: !teamId,
    });
  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestNameError) {
      message.error("比赛信息加载失败");
    }
  }, [contestNameError]);

  useEffect(() => {
    if (getTeamPlayersError) {
      message.error("队伍代码加载失败");
    }
  }, [getTeamPlayersError]);
  /* ---------------- 业务逻辑函数 ---------------- */
  const handleDownload = async (
    filename: string,
    codeId: string,
    language: string,
  ) => {
    try {
      const contestName = contestNameData?.contest_by_pk?.name;
      message.info("开始下载:" + filename);
      await downloadFile(
        `${contestName}/code/${teamId}/${codeId}.${language}`,
        filename,
      );
    } catch (err) {
      message.error("下载失败");
      console.log(err);
    }
  };
  /* ---------------- ⻚⾯组件 ---------------- */
  return (
    <>
      {teamPlayersData?.contest_team_player.map((player) => (
        <div>
          <p>
            {player.player}: {player.role}
          </p>
          {player.player_code && (
            <Typography.Link
              onClick={() => {
                handleDownload(
                  player.player_code?.code_name!,
                  player.player_code?.code_id!,
                  player.player_code?.language!,
                );
              }}
            >
              <CloudDownloadOutlined /> {"  "}
              {player.player_code?.code_name}
            </Typography.Link>
          )}
          <Divider />
        </div>
      ))}
    </>
  );
};

export default ManageTeams;
