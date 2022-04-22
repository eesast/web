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
import {
  GetAllTeamInfo_contest_team,
  GetAllTeamInfo,
  GetAllTeamInfoVariables,
  QueryContestManager,
  QueryContestManagerVariables,
} from "../../api/types";
import {
  GetAllTeamInfo as GETALLTEAMINFO,
  QueryContestManager as QUERY_CONTEST_MANAGER,
} from "../../api/contest.graphql";
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
  const Contest_id = location.pathname.split("/")[2].replace('}', '');
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
      contest_id: Contest_id,
    },
  });
  const { data: ismemberData, refetch: refetchismember } = useQuery<
    IsTeamMember,
    IsTeamMemberVariables
  >(ISTEAMMEMBER, {
    variables: {
      _id: userInfo?._id!,
      contest_id: Contest_id,
    },
  });
  const {
    data: teamListData,
    loading: teamListLoading,
    error: teamListError,
    refetch: refetchteamList,
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

  /* const teamid =
    isleaderData?.contest_team[0]?.team_id ||
    ismemberData?.contest_team_member[0]?.team_id; */

  useEffect(() => {
    refetchteamList();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

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
            `${member.user_as_contest_team_member?.name}/ ${member.user_as_contest_team_member?._id}/ ${member.user_as_contest_team_member?.email || "null"}/ ${member.user_as_contest_team_member?.phone || "null"}`
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
      render: (text, record, index) =>
        record.contest_team_members.map((i) => [i.user_as_contest_team_member.name + "   "]),
      //record.contest_team_members[0].user_as_contest_team_member.name,
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
      <Row
        justify="center"
        css={`margin-top:50px`}>
        <Col>
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
                rowKey={record => record.team_id}
              />
            </Content>
            <Button
              style={{ marginLeft: "20px" }}
              onClick={exportTeamsData}
              type="primary"
              shape="round"
              disabled={!(["root", "counselor"].includes(userInfo?.role!) || isContestManagerData?.contest_manager.length === 1)}
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
