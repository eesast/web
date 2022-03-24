import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Layout,
  Button,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { useLocation } from "react-router-dom"
import { getUserInfo } from "../../helpers/auth";
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/contest.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/contest.graphql";
<<<<<<< HEAD:src/pages/ThuaiSite/JoinPage.tsx
import { GetAllTeamInfo_contest_team, GetAllTeamInfo } from "../../api/types";
import { GetAllTeamInfo as GETALLTEAMINFO } from "../../api/contest.graphql";
=======
import { GetAllTeamInfo_contest_team, GetAllTeamInfo, GetAllTeamInfoVariables, QueryContestManager, QueryContestManagerVariables } from "../../api/types";
import { GetAllTeamInfo as GETALLTEAMINFO, QueryContestManager as QUERY_CONTEST_MANAGER } from "../../api/contest.graphql";
>>>>>>> bc39ebafe2a63ad17ba6a2e6958736c60eb502da:src/pages/ContestSite/JoinPage.tsx
//插入队员
import { InsertTeamMember, InsertTeamMemberVariables } from "../../api/types";
import { InsertTeamMember as INSERTTEAMMEMBER } from "../../api/contest.graphql";
import { useMutation, useQuery } from "@apollo/client";
import type { TableProps } from "antd/lib/table";
//导出excel
import xlsx from "xlsx";
const { Content } = Layout;
const JoinPage: React.FC = () => {
  const location = useLocation()
  const Contest_id = location.pathname.split("/")[2].replace('}', '')
  //console.log("此比赛id:"+Contest_id)
  const userInfo = getUserInfo();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamId, setTeamId] = useState<any>();
  const [inviteCode, setInvite] = useState<string | null>();
  const { data: isleaderData, refetch: refetchisleader } = useQuery<
    IsTeamLeader,
    IsTeamLeaderVariables
  >(ISTEAMLEADER, {
    variables: {
      _id: userInfo?._id!,
<<<<<<< HEAD:src/pages/ThuaiSite/JoinPage.tsx
      contest_id: "3b74b9d3-1955-42d1-954a-ef86b25ca6b7",  // TODO： 待更改
=======
      contest_id: Contest_id,
>>>>>>> bc39ebafe2a63ad17ba6a2e6958736c60eb502da:src/pages/ContestSite/JoinPage.tsx
    },
  });
  const { data: ismemberData, refetch: refetchismember } = useQuery<
    IsTeamMember,
    IsTeamMemberVariables
  >(ISTEAMMEMBER, {
    variables: {
      _id: userInfo?._id!,
<<<<<<< HEAD:src/pages/ThuaiSite/JoinPage.tsx
      contest_id: "3b74b9d3-1955-42d1-954a-ef86b25ca6b7",  // TODO： 待更改
=======
      contest_id: Contest_id,
>>>>>>> bc39ebafe2a63ad17ba6a2e6958736c60eb502da:src/pages/ContestSite/JoinPage.tsx
    },
  });
  const {
    data: teamListData,
    loading: teamListLoading,
    error: teamListError,
    refetch: refetchteamList,
<<<<<<< HEAD:src/pages/ThuaiSite/JoinPage.tsx
  } = useQuery<GetAllTeamInfo>(GETALLTEAMINFO);
=======
  } = useQuery<GetAllTeamInfo, GetAllTeamInfoVariables>(GETALLTEAMINFO, {
    variables: {
      contest_id: Contest_id
    }
  });

  const {
    data: isContestManagerData,
    error: isContestManagerError
  } = useQuery<QueryContestManager, QueryContestManagerVariables>(QUERY_CONTEST_MANAGER, {
    variables: {
      contest_id: Contest_id,
      user_id: userInfo?._id
    }
  });
>>>>>>> bc39ebafe2a63ad17ba6a2e6958736c60eb502da:src/pages/ContestSite/JoinPage.tsx

  const teamid =
    isleaderData?.contest_team[0]?.team_id ||
    ismemberData?.contest_team_member[0]?.team_id;

<<<<<<< HEAD:src/pages/ThuaiSite/JoinPage.tsx
useEffect(() => {
  console.log(teamid);
  console.log(isleaderData?.contest_team.length);
  console.log(ismemberData?.contest_team_member.length);
})
=======
  useEffect(() => {
    console.log("队伍的id:" + teamid);
    console.log("是否队长：" + isleaderData?.contest_team.length);
    console.log("是否队员：" + ismemberData?.contest_team_member.length);
  })
>>>>>>> bc39ebafe2a63ad17ba6a2e6958736c60eb502da:src/pages/ContestSite/JoinPage.tsx

  /***************队员插入****************/
  const [insertteamMember, { error: insertError }] = useMutation<
    InsertTeamMember,
    InsertTeamMemberVariables
  >(INSERTTEAMMEMBER);
  //点击加入
  const showModal = (record: GetAllTeamInfo_contest_team) => {
    setIsModalVisible(true);
    setTeamId(record.team_id);
    setInvite(record.invited_code);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (teamListError) {
      message.error("队伍列表加载失败");
      console.log(teamListError.message);
    }
  }, [teamListError]);

  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message)
    }
  }, [isContestManagerError]);

  const exportTeamsData = () => {
    try {
      const data: any = [];
      const teamsData = data.concat(  // 函数concat 把队伍信息和成员信息连接起来
        // eslint-disable-next-line
        teamListData?.contest_team.map((team) =>
          [
            team.team_name,
            team.team_intro,
            team.team_leader_id?.name,
            team.team_leader_id?.email || "null",
            team.team_leader_id?.phone || "null",
          ].concat(team.contest_team_members?.map((member) =>
<<<<<<< HEAD:src/pages/ThuaiSite/JoinPage.tsx
          `${member.user_as_contest_team_member?.name}/ ${member.user_as_contest_team_member?._id}/ ${member.user_as_contest_team_member?.email || "null"}/ ${member.user_as_contest_team_member?.phone || "null"}`
=======
            `${member.user_as_contest_team_member?.name}/ ${member.user_as_contest_team_member?._id}/ ${member.user_as_contest_team_member?.email || "null"}/ ${member.user_as_contest_team_member?.phone || "null"}`
>>>>>>> bc39ebafe2a63ad17ba6a2e6958736c60eb502da:src/pages/ContestSite/JoinPage.tsx
          ))
        )
      );
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.aoa_to_sheet(teamsData);
      xlsx.utils.book_append_sheet(workBook, workSheet, "helloWorld");
      xlsx.writeFile(workBook, "队伍信息.xlsx");
    } catch (error) {
      message.error("队伍信息导出失败");
    }
  };

  const onclick = async () => {
    const values = await form.getFieldValue("invited_code");
    if (inviteCode === values) {
      try {
        await insertteamMember({
          variables: {
            team_id: teamId,
            user_id: userInfo?._id!!,
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

  const teamListColumns: TableProps<GetAllTeamInfo_contest_team>["columns"] = [
    {
      title: "队名",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "队长",
      key: "team_leader",
      render: (text, record) => record.team_leader_id?.name,
    },
    {
      title: "队员",
      key: "team_member",
      render: (text, record) =>
        record.contest_team_members.map((i) => [i.user_as_contest_team_member.name + "   "]),
    },
    {
      title: "队伍简介",
<<<<<<< HEAD:src/pages/ThuaiSite/JoinPage.tsx
      dataIndex: "team_sum",
      key: "team_sum",
=======
      dataIndex: "team_intro",
      key: "team_intro",
>>>>>>> bc39ebafe2a63ad17ba6a2e6958736c60eb502da:src/pages/ContestSite/JoinPage.tsx
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
                // true
                isleaderData?.contest_team.length !== 0 ||
                ismemberData?.contest_team_member.length !== 0 ||
                record.contest_team_members.length === 3
              }
            >
              加入
            </Button>
            <Modal
              title="邀请码"
              visible={isModalVisible}
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
  return (
    <Layout>
      <br />
      <br />
      <Row>
        <Col offset={4}>
          <Card
            hoverable
            css={`
              width: 1000px;
              padding-top: 24px;
              padding-bottom: 12px;
              &.ant-card-bordered {
                cursor: default;
              }
            `}
          >
            <Content>
              <Table
                loading={teamListLoading}
                dataSource={teamListData?.contest_team}
                columns={teamListColumns}
              />
            </Content>
            <Button
              style={{ marginLeft: "20px" }}
              onClick={exportTeamsData}
              type="primary"
              shape="round"
              disabled={!(["root", "counselor"].includes(userInfo?.role!) || isContestManagerData?.contest_manager.length === 1)} //待权限管理配置完成后再更改
              size="small"
            >
              导出队伍信息
            </Button>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default JoinPage;
