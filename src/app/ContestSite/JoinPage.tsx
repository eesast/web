import React, { useEffect, useState, Suspense } from "react";
import {
  Table,
  Typography,
  Row,
  Col,
  Layout,
  Button,
  message,
  Modal,
  Form,
  Input,
  Spin,
} from "antd";
import type { TableProps } from "antd/lib/table";
//导出excel
import * as xlsx from "xlsx";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import styled from "styled-components";
import { ContestProps } from ".";
/* ---------------- 不随渲染刷新的常量 ---------------- */
/* ---------------- 不随渲染刷新的组件 ---------------- */
const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/* ---------------- 主页面 ---------------- */
const JoinPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamId, setTeamId] = useState<any>();
  const [inviteCode, setInvite] = useState<string | null>();
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: isleaderData, refetch: refetchisleader } =
    graphql.useIsTeamLeaderSuspenseQuery({
      variables: {
        uuid: user?.uuid!,
        contest_id: Contest_id,
      },
    });

  const { data: ismemberData, refetch: refetchismember } =
    graphql.useIsTeamMemberSuspenseQuery({
      variables: {
        user_uuid: user?.uuid!,
        contest_id: Contest_id,
      },
    });

  const { data: getContestManagersData, error: getContestManagersError } =
    graphql.useGetContestManagersSuspenseQuery({
      variables: {
        contest_id: Contest_id,
        // user_uuid: user?.uuid,
      },
    });

  const {
    data: teamListData,
    error: teamListError,
    refetch: refetchteamList,
  } = graphql.useGetAllTeamInfo_ScoreSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  // 队员插入
  const [insertteamMember, { error: insertError }] =
    graphql.useInsertTeamMemberMutation();

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    refetchteamList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (teamListError) {
      message.error("队伍列表加载失败");
      console.log(teamListError.message);
    }
  }, [teamListError]);

  useEffect(() => {
    if (getContestManagersError) {
      message.error("管理员加载失败");
      console.log(getContestManagersError.message);
    }
  }, [getContestManagersError]);
  /* ---------------- 业务逻辑函数 ---------------- */
  //点击加入
  const showModal = (
    record: graphql.GetAllTeamInfo_ScoreQuery["contest_team"][0],
  ) => {
    setIsModalVisible(true);
    setTeamId(record.team_id);
    setInvite(record.invited_code);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const exportTeamsData = () => {
    try {
      const data: any = [];
      const teamsData = data.concat(
        // 函数concat 把队伍信息和成员信息连接起来
        // eslint-disable-next-line
        teamListData?.contest_team.map((team) =>
          [
            team.team_name,
            team.team_intro,
            team.team_leader?.realname,
            team.team_leader?.email || "null",
            team.team_leader?.phone || "null",
          ].concat(
            team.contest_team_members?.map(
              (member) =>
                `${member.user?.realname}/ ${member.user?.id}/ ${
                  member.user?.email || "null"
                }/ ${member.user?.phone || "null"}`,
            ),
          ),
        ),
      );
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.aoa_to_sheet(teamsData);
      xlsx.utils.book_append_sheet(workBook, workSheet, "helloWorld");
      xlsx.writeFile(workBook, "队伍信息.xlsx");
    } catch (error) {
      message.error("队伍信息导出失败");
    }
  };
  //点击加入
  const onclick = async () => {
    const values = await form.getFieldValue("invited_code");
    if (inviteCode === values) {
      try {
        await insertteamMember({
          variables: {
            team_id: teamId,
            user_uuid: user?.uuid!,
          },
        });
        if (!insertError) {
          message.success("加入成功");
          setIsModalVisible(false);
        }
      } catch (e) {
        message.error("加入失败");
        console.log("错误信息:" + e);
      }
    } else {
      message.error("验证码错误");
    }
    refetchismember();
    refetchisleader();
    refetchteamList();
  };

  /* ---------------- 随渲染刷新的组件 ---------------- */
  const Loading = () => {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  };

  const teamListColumns: TableProps<
    graphql.GetAllTeamInfo_ScoreQuery["contest_team"][0]
  >["columns"] = [
    {
      title: "队名",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "队长",
      key: "team_leader",
      render: (text, record) => record.team_leader?.realname,
    },
    {
      title: "队员",
      key: "team_member",
      render: (text, record, index) =>
        record.contest_team_members.map((i) => [i.user?.realname + "   "]),
      //record.contest_team_members[0].user.name,
    }, // TODO: 此处有误
    {
      title: "队伍简介",
      dataIndex: "team_intro",
      key: "team_intro",
      render: (text, record) => record.team_intro,
      ellipsis: true,
    },
    {
      title: "加入",
      key: "action",
      render: (text, record) => (
        <Row justify="start">
          <Col span={8}>
            <Button
              type="primary"
              onClick={() => showModal(record)}
              disabled={
                isleaderData?.contest_team.length !== 0 ||
                ismemberData?.contest_team_member.length !== 0 ||
                record.contest_team_members.length === 3
              }
            >
              加入
            </Button>
            <Modal
              title="邀请码"
              open={isModalVisible}
              onOk={() => onclick()}
              onCancel={handleCancel}
            >
              <Form
                name="form"
                form={form} //表单名字绑定
              >
                <Form.Item
                  name="invited_code"
                  rules={[
                    {
                      required: true,
                      message: "Please input the invite code!",
                    },
                  ]}
                >
                  <Input placeholder="输入邀请码" />
                </Form.Item>
              </Form>
            </Modal>
          </Col>
        </Row>
      ),
    },
  ];

  /* ---------------- 页面组件 ---------------- */
  return (
    <Layout>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Title level={2}>加入战队</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Text mark>选一个心仪的队伍加入吧！</Typography.Text>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Suspense fallback={<Loading />}>
            <Table
              //loading={teamListLoading}
              dataSource={
                teamListData?.contest_team as graphql.GetAllTeamInfo_ScoreQuery["contest_team"]
              }
              columns={teamListColumns}
              rowKey={(record) => record.team_id}
            />
          </Suspense>
          <Button
            style={{ marginLeft: "20px" }}
            onClick={exportTeamsData}
            type="primary"
            shape="round"
            disabled={
              !getContestManagersData?.contest_by_pk?.contest_managers.some(
                (manager) => manager.user_uuid === user?.uuid,
              )
            }
            size="small"
          >
            导出队伍信息
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};
export default JoinPage;
