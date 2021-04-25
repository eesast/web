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
import { getUserInfo } from "../../helpers/auth";
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/thuai.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/thuai.graphql";
import { GetAllTeamInfo_thuai, GetAllTeamInfo } from "../../api/types";
import { GetAllTeamInfo as GETALLTEAMINFO } from "../../api/thuai.graphql";
//插入队员
import { InsertTeamMember, InsertTeamMemberVariables } from "../../api/types";
import { InsertTeamMember as INSERTTEAMMEMBER } from "../../api/thuai.graphql";
import { useMutation, useQuery } from "@apollo/client";
import type { TableProps } from "antd/lib/table";
//导出excel
import xlsx from "xlsx";
const { Content } = Layout;
const JoinPage: React.FC = () => {
  const userInfo = getUserInfo();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamId, setTeamId] = useState<any>();
  const [inviteCode, setInvite] = useState<string | null>();
  const { refetch: refetchisleader } = useQuery<
    IsTeamLeader,
    IsTeamLeaderVariables
  >(ISTEAMLEADER, {
    variables: {
      _id: userInfo?._id!,
    },
  });
  const { refetch: refetchismember } = useQuery<
    IsTeamMember,
    IsTeamMemberVariables
  >(ISTEAMMEMBER, {
    variables: {
      _id: userInfo?._id!,
    },
  });
  const {
    data: teamListData,
    loading: teamListLoading,
    error: teamListError,
    refetch: refetchteamList,
  } = useQuery<GetAllTeamInfo>(GETALLTEAMINFO);
  /***************队员插入****************/
  const [insertteamMember, { error: insertError }] = useMutation<
    InsertTeamMember,
    InsertTeamMemberVariables
  >(INSERTTEAMMEMBER);
  //点击加入
  const showModal = (record: GetAllTeamInfo_thuai) => {
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
    }
  }, [teamListError]);

  const exportTeamsData = () => {
    try {
      const data: any = [];
      const teamsData = data.concat(
        teamListData?.thuai.map((team) =>
          [
            team.team_name,
            team.team_sum,
            team.user?.name,
            team.user?.email || "null",
            team.user?.phone || "null",
          ].concat(team.team_members.map((member) => member.user?.name))
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
      } catch (e) {
        message.error("加入失败");
      } finally {
        if (!insertError) {
          message.success("加入成功");
          setIsModalVisible(false);
        }
      }
    } else {
      message.error("验证码错误");
    }
    refetchismember();
    refetchisleader();
    refetchteamList();
  };

  const teamListColumns: TableProps<GetAllTeamInfo_thuai>["columns"] = [
    {
      title: "队名",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "队长",
      key: "team_leader",
      render: (text, record) => record.user?.name,
    },
    {
      title: "队员",
      key: "team_member",
      render: (text, record) =>
        record.team_members.map((i) => [i.user.name + "   "]),
    },
    {
      title: "队伍简介",
      dataIndex: "team_sum",
      key: "team_sum",
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
                true
                //isleaderData?.user[0].team_as_leader.length !== 0 ||
                //ismemberData?.user[0].team_as_member.length !== 0 ||
                //record.team_members.length === 3
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
                dataSource={teamListData?.thuai}
                columns={teamListColumns}
              />
            </Content>
            <Button
              style={{ marginLeft: "20px" }}
              onClick={exportTeamsData}
              type="primary"
              shape="round"
              disabled={userInfo?.role !== "root"} //待权限管理配置完成后再更改
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
