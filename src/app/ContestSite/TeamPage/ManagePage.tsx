import React, { useEffect, Suspense } from "react";
import {
  Input,
  Table,
  Card,
  Row,
  Col,
  Button,
  Form,
  message,
  Modal,
  Typography,
  Space,
  Statistic,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  FireOutlined,
  ArrowUpOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { TableProps } from "antd/lib/table";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { TeamProps } from ".";
import Loading from "@/app/Components/Loading";
import NotJoined from "../Components/NotJoined";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { TextArea } = Input;
const { confirm } = Modal;
const { Paragraph, Title } = Typography;

/* ---------------- 不随渲染刷新的组件 ---------------- */
/* ---------------- 主页面 ---------------- */
const ManagePage: React.FC<TeamProps> = ({ mode, user, refresh }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  //更新队伍信息
  const [UpdateTeam, { data: UpdateTeamData, error: UpdateTeamError }] =
    graphql.useUpdateTeamMutation();
  //删除队伍信息
  const [DeleteTeam, { error: DeleteTeamError }] =
    graphql.useDeleteTeamMutation();

  const [DeleteTeamMember, { error: DeleteTeamMemberError }] =
    graphql.useDeleteTeamMemberMutation();

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (UpdateTeamData && !UpdateTeamError) {
      message.success("更新成功");
    }
  }, [UpdateTeamData, UpdateTeamError]);

  useEffect(() => {
    if (DeleteTeamMemberError) {
      message.error("退出队伍失败");
    }
  }, [DeleteTeamMemberError]);

  useEffect(() => {
    if (DeleteTeamError) {
      message.error("解散队伍失败");
    }
  }, [DeleteTeamError]);

  const { data: teamData } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: user?.uuid,
      contest_id: Contest_id,
    },
  });

  const team_id = teamData?.contest_team_member[0]?.contest_team.team_id;
  if (!team_id) {
    return <NotJoined />;
  }

  const { data: teamInfoData, refetch: refetchTeamInfo } =
    graphql.useGetTeamInfoSuspenseQuery({
      variables: {
        team_id: team_id,
      },
    });

  const { data: teamStatData } = graphql.useGetTeamStatSuspenseQuery({
    variables: {
      team_id: team_id,
    },
  });

  const team = teamInfoData?.contest_team_by_pk;
  const isLeader = user?.uuid === team?.team_leader?.uuid;

  /* ---------------- 业务逻辑函数 ---------------- */
  const onFinish = async (record: any) => {
    const newinfo = {
      team_id: team_id,
      team_name: record.team_name,
      team_intro: record.team_intro,
    };
    await UpdateTeam({
      variables: newinfo,
    });
    await refetchTeamInfo();
  };

  const deleteTeamMember = async (user_id: string) => {
    confirm({
      title: "确定要退出队伍吗？",
      icon: <ExclamationCircleOutlined />,
      content: "若不在任何队伍中无法参加比赛!",
      onOk: async () => {
        const result = await DeleteTeamMember({
          variables: { user_uuid: user_id, team_id: team_id },
        });
        if (!result.errors) {
          Modal.success({
            title: "已退出队伍",
            content: "请重新加入队伍",
          });
          return refresh();
        }
      },
    });
  };
  const deleteTeamMemberByLeader = async (user_id: string) => {
    confirm({
      title: "确定要移除该同学吗？",
      icon: <ExclamationCircleOutlined />,
      content: "若不在任何队伍中无法参加比赛!",
      onOk: async () => {
        const result = await DeleteTeamMember({
          variables: { user_uuid: user_id, team_id: team_id },
        });
        if (!result.errors) {
          message.success("移除成功");
          return refetchTeamInfo();
        }
      },
    });
  };

  const deleteWholeTeam = async (team_id: string) => {
    confirm({
      title: "确定要解散队伍吗？",
      icon: <ExclamationCircleOutlined />,
      content: "会移除队伍以及所有队伍成员，若不在队伍中无法参加比赛!",
      onOk: async () => {
        const result = await DeleteTeam({ variables: { team_id: team_id } });
        if (!result.errors) {
          Modal.success({
            title: "队伍已解散",
            content: "请重新加入队伍",
          });
          return refresh();
        }
      },
    });
  };

  /* ---------------- 随渲染刷新的组件 ---------------- */

  const memberListColumns: TableProps["columns"] = [
    {
      title: "姓名",
      key: "name",
      render: (text, record) => record.user?.realname,
    },
    {
      title: "学号",
      key: "id",
      render: (text, record) => record.user?.student_no,
    },
    {
      title: "管理",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            onClick={async () => {
              await deleteTeamMemberByLeader(record.user?.uuid);
              await refetchTeamInfo();
            }}
            disabled={!isLeader || record.user?.uuid === user?.uuid}
          >
            移除
          </Button>
        );
      },
    },
  ];

  /* ---------------- 页面组件 ---------------- */

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        display: "flex",
        border: "0px solid #ccc",
        padding: "4vh 4vw",
        color: mode === "dark" ? "white" : "initial",
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="已提交代码"
              value={
                teamStatData?.contest_team_by_pk?.contest_team_codes_aggregate
                  ?.aggregate?.count || 0
              }
              prefix={<UploadOutlined />}
              suffix="份"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="共参与了"
              value={
                teamStatData?.contest_team_by_pk?.contest_team_rooms_aggregate
                  ?.aggregate?.count || 0
              }
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="场对战"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="天梯积分"
              value={
                teamStatData?.contest_team_by_pk?.contest_team_rooms_aggregate
                  ?.aggregate?.sum?.score || 0
              }
              valueStyle={{ color: "#cf1322" }}
              prefix={<FireOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
        <Col span={8}>
          <Card bordered={false}>
            <Title level={3} style={{ margin: `0 0 24px` }}>
              队伍信息
            </Title>
            <Suspense fallback={<Loading />}>
              <Form
                name="form"
                layout="vertical"
                initialValues={team!}
                onFinish={onFinish}
              >
                <Form.Item
                  name="team_name"
                  label="队伍名称"
                  rules={[{ required: true, message: "队伍名不能为空" }]}
                >
                  <Input
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="on"
                  />
                </Form.Item>
                <Form.Item
                  name="team_intro"
                  label="队伍简介"
                  rules={[{ required: true, message: "队伍简介不能为空" }]}
                >
                  <TextArea rows={6} />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit">
                    确认修改
                  </Button>
                </Form.Item>
              </Form>
            </Suspense>
          </Card>
        </Col>
        <Col span={16}>
          <Card bordered={false}>
            <Title level={3} style={{ margin: `0 0 12px` }}>
              成员管理
            </Title>
            <Title level={5}>邀请码</Title>
            <Paragraph copyable>{team?.invited_code}</Paragraph>
            <Suspense fallback={<Loading />}>
              <Table
                columns={memberListColumns}
                dataSource={
                  (teamInfoData as graphql.GetTeamInfoQuery)?.contest_team_by_pk
                    ?.contest_team_members
                }
                rowKey={(record) => record.user?.uuid}
              />
            </Suspense>
            <Row justify="end">
              <Button
                danger
                style={{ marginRight: "12px" }}
                onClick={
                  isLeader
                    ? () => deleteWholeTeam(team_id)
                    : () => deleteTeamMember(user?.uuid!)
                }
              >
                {isLeader ? "解散队伍" : "退出队伍"}
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};
export default ManagePage;
