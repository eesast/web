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
  Spin,
} from "antd"; //botton
import { Layout } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { TableProps } from "antd/lib/table";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import styled from "styled-components";
import { ContestProps } from "../.";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { TextArea } = Input;
const { Content } = Layout;
const { confirm } = Modal;
const { Paragraph, Text } = Typography;

/* ---------------- 不随渲染刷新的组件 ---------------- */
const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ---------------- 主页面 ---------------- */
const ManagePage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const navigate = useNavigate();
  const Contest_id = url.query.get("contest");
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: isleaderData, refetch: refetchLeader } =
    graphql.useIsTeamLeaderSuspenseQuery({
      variables: {
        uuid: user?.uuid!,
        contest_id: Contest_id,
      },
    });

  const { data: ismemberData, refetch: refetchMember } =
    graphql.useIsTeamMemberSuspenseQuery({
      variables: {
        user_uuid: user?.uuid!,
        contest_id: Contest_id,
      },
    });

  const teamid =
    isleaderData?.contest_team[0]?.team_id ||
    ismemberData?.contest_team_member[0]?.team_id;

  //根据team_id查询所有队员信息
  const { data: teamMemberData, refetch: refetchMemberInfo } =
    graphql.useGetMemberInfoQuery({
      variables: {
        team_id: teamid!,
      },
    });

  //更新队伍信息
  const [UpdateTeam, { data: UpdateTeamData, error: UpdateTeamError }] =
    graphql.useUpdateTeamMutation();
  //删除队伍信息
  const [DeleteTeam, { error: DeleteTeamError }] =
    graphql.useDeleteTeamMutation();

  const [DeleteTeamMember, { error: DeleteTeamMemberError }] =
    graphql.useDeleteTeamMemberMutation();

  //利用teamid查询team的信息储存在teamdata中
  const { data: teamData, refetch: refetchTeam } = graphql.useGetTeamInfoQuery({
    variables: {
      team_id: teamid!,
      contest_id: Contest_id,
    },
  });

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (teamid) {
      refetchMemberInfo();
    }
  });

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

  const team = {
    ...teamData?.contest_team[0],
    leader_name: teamData?.contest_team[0]?.team_leader?.realname,
  };
  const isLeader = user?.uuid === team.team_leader?.uuid;

  if (!user) {
    return <Spin />;
  }
  if (!team.team_intro) {
    //team_intro获取较慢，需要等待team_intro获取完毕
    return <Spin />;
  }

  const userid = user!.uuid!;

  /* ---------------- 业务逻辑函数 ---------------- */
  const onFinish = async (record: any) => {
    const newinfo = {
      team_id: teamid!,
      team_name: record.team_name,
      team_intro: record.team_intro,
    };
    await UpdateTeam({
      variables: newinfo,
    });
    await refetchTeam();
  };

  const deleteTeamMember = async (user_id: string) => {
    confirm({
      title: "确定要退出队伍吗？",
      icon: <ExclamationCircleOutlined />,
      content: "若不在任何队伍中无法参加比赛!",
      onOk: async () => {
        const result = await DeleteTeamMember({
          variables: { user_uuid: user_id, team_id: teamid! },
        });
        if (!result.errors) {
          Modal.success({
            title: "已退出队伍",
            content: "请重新加入队伍",
          });
        }
        await refetchMember();
        navigate(0);
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
          variables: { user_uuid: user_id, team_id: teamid! },
        });
        if (!result.errors) {
          message.success("移除成功");
        }
        await refetchTeam();
        navigate(0);
      },
    });
  };

  const deleteWholeTeam = async (team_id: string) => {
    confirm({
      title: "确定要解散队伍吗？",
      icon: <ExclamationCircleOutlined />,
      content: "会移除队伍以及所有队伍成员，若不在队伍中无法参加比赛!",
      onOk: async () => {
        const result = await DeleteTeam({ variables: { team_id: teamid! } });
        if (!result.errors) {
          Modal.success({
            title: "队伍已解散",
            content: "请重新加入队伍",
          });
        }
        await refetchLeader();
        navigate(0);
      },
    });
  };

  const Loading = () => {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  };

  /* ---------------- 随渲染刷新的组件 ---------------- */

  const memberListColumns: TableProps<
    graphql.GetMemberInfoQuery["contest_team_member"][0]
  >["columns"] = [
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
              await refetchMemberInfo();
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
    <Layout>
      <br />
      <br />
      <Row>
        <Col offset={7}>
          <Card
            hoverable
            css={`
              width: 500px;
              padding-top: 24px;
              padding-bottom: 12px;
              &.ant-card-bordered {
                cursor: default;
              }
            `}
          >
            <Content>
              <Form
                name="form"
                layout="vertical"
                initialValues={team}
                onFinish={onFinish}
              >
                <Form.Item
                  name="team_name"
                  label="队伍名称"
                  rules={[
                    {
                      required: true,
                    },
                    () => ({
                      validator(rule, value) {
                        if (value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("队伍名不能为空");
                      },
                    }),
                  ]}
                >
                  <Input
                    defaultValue={team.team_name}
                    style={{ width: "30%" }}
                    disabled={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="on"
                  />
                </Form.Item>
                <Form.Item name="invited_code" label="邀请码">
                  <Paragraph copyable>{team.invited_code}</Paragraph>
                </Form.Item>
                <Form.Item label="队长">
                  <Text>{team.team_leader?.realname}</Text>
                </Form.Item>
                <Form.Item label="队员">
                  <Suspense fallback={<Loading />}>
                    <Table
                      columns={memberListColumns}
                      dataSource={
                        teamMemberData?.contest_team_member as graphql.GetMemberInfoQuery["contest_team_member"]
                      }
                      rowKey={(record) => record.user?.uuid}
                    />
                  </Suspense>
                </Form.Item>
                <Form.Item
                  name="team_intro"
                  label="队伍简介"
                  rules={[
                    {
                      required: true,
                    },
                    () => ({
                      validator(rule, value) {
                        if (value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("队伍简介不能为空");
                      },
                    }),
                  ]}
                >
                  <TextArea
                    defaultValue={team.team_intro!}
                    rows={6}
                    disabled={false}
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <Row justify="center">
                    <Col span={6}>
                      <Suspense fallback={<Loading />}>
                        <Button type="primary" htmlType="submit">
                          确认修改
                        </Button>
                      </Suspense>
                    </Col>
                    <Col span={6}>
                      <Button
                        danger
                        type="default"
                        onClick={
                          isLeader
                            ? () => deleteWholeTeam(teamid)
                            : () => deleteTeamMember(userid)
                        }
                      >
                        {isLeader ? "解散队伍" : "退出队伍"}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Content>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default ManagePage;
