/* eslint-disable jsx-a11y/anchor-is-valid */
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
  List,
  message,
  Modal,
  Space,
  Table,
  Typography,
} from "antd";
import { TableProps } from "antd/lib/table";
import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  RollbackOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import * as xlsx from "xlsx";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from "..";
import Loading from "@/app/Components/Loading";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Text, Title } = Typography;
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
/* ---------------- 不随渲染刷新的组件 ---------------- */
/* ---------------- 主页面 ---------------- */
const ManageTeams: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const [editingTeamID, setEditingTeamID] = useState<string>();
  const url = useUrl();
  const Contest_id = url.query.get("contest")!;

  /* ---------------- 页面组件 ---------------- */
  return editingTeamID === undefined ? (
    <ListPage
      contest_id={Contest_id}
      setEditingTeamID={setEditingTeamID}
      user_uuid={user?.uuid}
    />
  ) : (
    <SubPage
      contest_id={Contest_id}
      team_id={editingTeamID}
      setEditingTeamID={setEditingTeamID}
      user_uuid={user?.uuid}
    />
  );
};

const ListPage: React.FC<{
  contest_id: string;
  setEditingTeamID: React.Dispatch<React.SetStateAction<string | undefined>>;
  user_uuid: string | undefined;
}> = (props) => {
  const { data: contestNameData, error: contestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: props.contest_id,
      },
    });

  useEffect(() => {
    if (contestNameError) {
      message.error("比赛信息加载失败");
    }
  }, [contestNameError]);

  const { data: teamsData, error: getTeamsError } =
    graphql.useGetTeamsSuspenseQuery({
      variables: {
        contest_id: props.contest_id,
      },
    });

  useEffect(() => {
    if (getTeamsError) {
      message.error("队伍列表加载失败");
    }
  }, [getTeamsError]);

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
                `${member.user?.realname} (${member.user?.class}, ${member.user?.student_no})`,
            ),
          ),
        ),
      );
      const contestName = cleanFileName(contestNameData?.contest_by_pk?.name!);
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.aoa_to_sheet(data);
      xlsx.utils.book_append_sheet(workBook, workSheet, "helloWorld");
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
        record.contest_team_members.map((i) => [
          `${i.user?.realname} (${i.user?.class}, ${i.user?.student_no})   `,
        ]),
    },
    {
      title: "过编译代码数",
      dataIndex: "code_num",
      key: "code_num",
      render: (text, record) =>
        record.contest_team_codes_aggregate.aggregate?.count,
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
          <a onClick={() => props.setEditingTeamID(record.team_id)}>队伍主页</a>
          <a onClick={() => props.setEditingTeamID(record.team_id)}>队伍代码</a>
        </Space>
      ),
    },
  ];

  return (
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
  );
};

const SubPage: React.FC<{
  contest_id: string;
  team_id: string;
  setEditingTeamID: React.Dispatch<React.SetStateAction<string | undefined>>;
  user_uuid: string | undefined;
}> = (props) => {
  const [activeTabKey, setActiveTabKey] = useState("basic");

  const {
    data: teamData,
    error: getTeamInfoError,
    refetch: refetchTeamInfo,
  } = graphql.useGetTeamInfoSuspenseQuery({
    variables: {
      team_id: props.team_id,
    },
  });

  useEffect(() => {
    if (getTeamInfoError) {
      message.error("队伍信息加载失败");
      console.log(getTeamInfoError.message);
    }
  }, [getTeamInfoError]);

  const { error: userError } = graphql.useGetUser_IdSuspenseQuery({
    variables: {
      email: "",
      realname: "",
    },
  });

  const [DeleteTeamMember, { error: DeleteTeamMemberError }] =
    graphql.useDeleteTeamMemberMutation();

  useEffect(() => {
    if (userError) {
      message.error("用户信息查询失败");
      console.log(userError.message);
    }
  }, [userError]);

  useEffect(() => {
    if (DeleteTeamMemberError) {
      message.error("删除成员失败");
    }
  }, [DeleteTeamMemberError]);

  const tabList = [
    {
      key: "basic",
      tab: "基础信息",
    },
    {
      key: "addMember",
      tab: "添加成员",
    },
    {
      key: "code",
      tab: "查看代码",
    },
  ];

  const onTabChange = (key: any) => {
    setActiveTabKey(key);
  };

  const contentList = (
    <div
      style={{
        fontSize: "large",
        lineHeight: "30px",
      }}
    >
      <Text style={{ fontWeight: "700" }}>{"队名: "}</Text>
      <Text>{teamData?.contest_team_by_pk?.team_name}</Text>
      <br />
      <Text style={{ fontWeight: "700" }}>{"队长: "}</Text>
      <Text>{teamData?.contest_team_by_pk?.team_leader?.realname}</Text>
      <br />
      <Text style={{ fontWeight: "700" }}>{"队员: "}</Text>
      {teamData?.contest_team_by_pk?.contest_team_members.length === 0 ? (
        <>
          <Text>无</Text>
          <br />
        </>
      ) : (
        <List
          dataSource={teamData?.contest_team_by_pk?.contest_team_members}
          renderItem={(item) => (
            <List.Item style={{ width: "100px" }}>
              <Text>{item.user?.realname}</Text>
              <MinusCircleOutlined
                onClick={() => {
                  Modal.confirm({
                    title: "确定要移除该成员吗？",
                    icon: <ExclamationCircleOutlined />,
                    content: "若不在任何队伍中无法参加比赛!",
                    onOk: async () => {
                      await DeleteTeamMember({
                        variables: {
                          team_id: props.team_id,
                          user_uuid: item.user?.uuid,
                        },
                      });
                      await refetchTeamInfo();
                      if (!DeleteTeamMemberError) {
                        message.success("成功移除该成员");
                      }
                    },
                  });
                }}
              />
            </List.Item>
          )}
        />
      )}

      <Text style={{ fontWeight: "700" }}>{"队伍描述: "}</Text>
      <br />
      <Text>{teamData?.contest_team_by_pk?.team_intro}</Text>
    </div>
  );

  return (
    <Card
      bordered={false}
      style={{ width: "100%" }}
      title={
        <Text
          css={`
            font-size: xx-large;
            font-weight: bold;
          `}
        >
          {teamData?.contest_team_by_pk?.team_name}
        </Text>
      }
      extra={
        <Button
          icon={<RollbackOutlined />}
          onClick={() => props.setEditingTeamID(undefined)}
        />
      }
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={(key) => {
        onTabChange(key);
      }}
    >
      {contentList}
    </Card>
  );
};
export default ManageTeams;
