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
const { Content } = Layout;
const JoinPage: React.FC = () => {
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
    },
  });
  const { data: ismemberData, refetch: refetchismember } = useQuery<
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
    // console.log(teamId);
    // console.log(inviteCode);
    // console.log(record.team_members.length);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (teamListError) {
      message.error("队伍列表加载失败");
    }
  }, [teamListError]);

  const onclick = async () => {
    const values = await form.getFieldValue("invited_code");
    // console.log(teamId);
    // console.log(inviteCode);
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
      message.error("验证码不对");
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
        record.team_members.map((i) => [i.user.name, ", "]),
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
              //onClick+一个匿名函数
              //onClick={() => onclick(record)}
              disabled={
                isleaderData?.user[0].team_as_leader.length !== 0 ||
                ismemberData?.user[0].team_as_member.length !== 0 ||
                record.team_members.length === 3
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
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default JoinPage;
