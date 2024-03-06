/* 本页面需要实现的功能：
 * 1、创建队伍
 * 2、将学生添加至指定队伍
 * 3、上传、下载代码
 * 4、手动编译(尚未实现)
 * 5、控制开放比赛提交代码、编译
 */

import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  List,
  message,
  Modal,
  Result,
  Row,
  Spin,
  Table,
  Typography,
} from "antd";
import { TableProps } from "antd/lib/table";
import {
  ArrowRightOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import styled from "styled-components";
import { ContestProps } from ".";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Text } = Typography;

/* ---------------- 不随渲染刷新的组件 ---------------- */
const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/* ---------------- 主页面 ---------------- */
const ManageTeamsPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const [editingTeamID, setEditingTeamID] = useState<string>();
  const url = useUrl();
  const Contest_id = url.query.get("contest")!;

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: isContestManagerData, error: isContestManagerError } =
    graphql.useQueryContestManagerSuspenseQuery({
      variables: {
        contest_id: Contest_id,
        user_id: user?.uuid,
      },
    });

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message);
    }
  }, [isContestManagerError]);

  /* ---------------- 页面组件 ---------------- */
  return ["root", "counselor"].includes(user?.role!) ||
    isContestManagerData?.contest_manager.length === 1 ? (
    editingTeamID === undefined ? (
      <ListPage contest_id={Contest_id} setEditingTeamID={setEditingTeamID} />
    ) : (
      <SubPage
        contest_id={Contest_id}
        team_id={editingTeamID}
        setEditingTeamID={setEditingTeamID}
      />
    )
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link to={url.link("intro")}>Back To Contest Intro</Link>
        </Button>
      }
    />
  );
};

//生成邀请码，8位
function randomString() {
  var e = 8;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

const ListPage: React.FC<{
  contest_id: string;
  setEditingTeamID: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = (props) => {
  //添加新队伍功能

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [insertTeam, { error: insertError, loading: teamAdding }] =
    graphql.useInsertTeamMutation();
  const { refetch: refetchisleader } = graphql.useIsTeamLeaderSuspenseQuery({
    variables: {
      _id: "",
      contest_id: props.contest_id,
    },
  });
  const { refetch: refetchismember } = graphql.useIsTeamMemberSuspenseQuery({
    variables: {
      uuid: "",
      contest_uuid: props.contest_id,
    },
  });
  const { error: userError, refetch: refetchUserId } =
    graphql.useGetUser_IdSuspenseQuery({
      variables: {
        email: "",
        name: "",
      },
    });
  //队伍一览表功能
  const { data: teamListData, error: teamListError } =
    graphql.useGetAllTeamInfoSubscription({
      variables: {
        contest_id: props.contest_id,
      },
    });

  useEffect(() => {
    if (userError) {
      message.error("用户信息查询失败");
      console.log(userError.message);
    }
  }, [userError]);

  useEffect(() => {
    if (teamListError) {
      message.error("队伍列表加载失败");
      console.log(teamListError.message);
    }
  }, [teamListError]);

  const handleTeamAdd = async () => {
    const values = await form.getFieldsValue();
    if (
      values.leader_name === undefined ||
      values.leader_email === undefined ||
      values.team_name === undefined ||
      values.team_intro === undefined
    ) {
      return;
    }

    try {
      const leaderData = await refetchUserId({
        email: values.leader_email,
        name: values.leader_name,
      });
      if (leaderData.data.user.length === 0) {
        message.warning("队长信息有误，查无此人！");
        return;
      }
      const leader_id = leaderData.data.user[0]?._id;
      const isTeamLeader = await refetchisleader({
        _id: leader_id,
        contest_id: props.contest_id,
      });
      const isTeamMember = await refetchismember({
        uuid: leader_id,
        contest_uuid: props.contest_id,
      });
      if (
        isTeamLeader.data.contest_team.length !== 0 ||
        isTeamMember.data.contest_team_member.length !== 0
      ) {
        message.warning("该用户已存在于某一队伍中");
        return;
      }
      const InviteCode = randomString();
      await insertTeam({
        variables: {
          team_name: values.team_name,
          team_intro: values.team_intro,
          team_leader: leader_id,
          invited_code: InviteCode,
          contest_id: props.contest_id,
        },
      });
      if (!insertError) {
        message.success("添加队伍成功");
      }
    } catch {}
    form.resetFields();
    // refetchteamList();
    setIsModalVisible(false);
  };

  const teamListColumns: TableProps<
    graphql.GetAllTeamInfoSubscription["contest_team"][0]
  >["columns"] = [
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
        record.contest_team_members.map((i) => [
          i.user_as_contest_team_member.name + "   ",
        ]),
    },
    /* {
      title: "已提交代码数",
      dataIndex: "submitted_code_num",
      key: "submitted_code_num",
      render: (text, record) => record.submitted_code_num
    }, */
    {
      title: "编译状态",
      dataIndex: "compiled_status",
      key: "compiled_status",
      render: (text, record) => record.status,
      filters: [
        {
          text: "已编译代码的队伍",
          value: "compiled",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "比赛次数",
      dataIndex: "contest_num",
      key: "contest_num",
      render: (text, record) => record.status2,
      sorter: (a, b) => Number(a.status2) - Number(b.status2),
    },
    {
      title: "比赛分数",
      dataIndex: "contest_score",
      key: "contest_score",
      render: (text, record) => record.contest_score,
      sorter: (a, b) => Number(a.contest_score) - Number(b.contest_score),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={() => props.setEditingTeamID(record.team_id)}
        />
      ),
    },
  ];

  const Loading = () => {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  };

  return (
    <Layout>
      <Row
        justify="center"
        css={`
          margin-top: 50px;
        `}
      >
        <Card
          hoverable
          css={`
            width: 80%;
            padding-top: 24px;
            padding-bottom: 12px;
            &.ant-card-bordered {
              cursor: default;
            }
          `}
        >
          <Suspense fallback={<Loading />}>
            <Table
              //loading={teamListLoading}
              dataSource={
                teamListData?.contest_team as graphql.GetAllTeamInfoSubscription["contest_team"]
              }
              columns={teamListColumns}
              rowKey={(record) => record.team_id}
            />
          </Suspense>
          <Button
            css={`
              width: 120px;
              margin-top: 12px;
            `}
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            添加新队伍
          </Button>
        </Card>
      </Row>
      <Modal
        open={isModalVisible}
        title="添加新队伍"
        centered
        okText="提交"
        maskClosable={false}
        confirmLoading={teamAdding}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        onOk={handleTeamAdd}
        destroyOnClose
      >
        <Form
          form={form}
          name="teamAdd"
          onFinish={handleTeamAdd}
          onFinishFailed={(errorInfo: any) => {
            console.log("Failed:", errorInfo);
          }}
          preserve={false}
        >
          <Form.Item
            name="leader_name"
            label="队长姓名"
            rules={[{ required: true, message: "请输入队长姓名" }]}
          >
            <Input placeholder="输入队长姓名" allowClear />
          </Form.Item>
          <Form.Item
            name="leader_email"
            label="队长邮箱"
            rules={[
              { required: true, message: "请输入队长邮箱" },
              { type: "email", message: "请输入合法邮箱" },
            ]}
          >
            <Input placeholder="输入队长邮箱" allowClear />
          </Form.Item>
          <Form.Item
            name="team_name"
            label="队伍名称"
            rules={[{ required: true, message: "请输入队伍名称" }]}
          >
            <Input placeholder="输入队伍名称" allowClear />
          </Form.Item>
          <Form.Item
            label="队伍简介"
            name="team_intro"
            rules={[{ required: true, message: "Please input team detail!" }]}
          >
            <TextArea placeholder="输入队伍简介" rows={3} allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

const SubPage: React.FC<{
  contest_id: string;
  team_id: string;
  setEditingTeamID: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = (props) => {
  const [activeTabKey, setActiveTabKey] = useState("basic");

  const {
    data: teamData,
    error: getTeamInfoError,
    refetch: refetchTeamInfo,
  } = graphql.useGetTeamInfoSuspenseQuery({
    variables: {
      contest_id: props.contest_id,
      team_id: props.team_id,
    },
  });

  useEffect(() => {
    if (getTeamInfoError) {
      message.error("队伍信息加载失败");
      console.log(getTeamInfoError.message);
    }
  }, [getTeamInfoError]);

  const { refetch: refetchisleader } = graphql.useIsTeamLeaderSuspenseQuery({
    variables: {
      _id: "",
      contest_id: props.contest_id,
    },
  });
  const { refetch: refetchismember } = graphql.useIsTeamMemberSuspenseQuery({
    variables: {
      uuid: "",
      contest_uuid: props.contest_id,
    },
  });

  const { error: userError, refetch: refetchUserId } =
    graphql.useGetUser_IdSuspenseQuery({
      variables: {
        email: "",
        name: "",
      },
    });

  const [insertteamMember, { error: insertError }] =
    graphql.useInsertTeamMemberMutation();

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
    {
      key: "compile",
      tab: "手动编译",
    },
  ];

  const onTabChange = (key: any) => {
    setActiveTabKey(key);
  };

  //添加成员界面
  //#region
  const [add_member_form] = Form.useForm();
  const handleAddMember = async () => {
    const values = add_member_form.getFieldsValue();
    try {
      const userData = await refetchUserId({
        email: values.member_email,
        name: values.member_name,
      });
      if (userData.data.user.length === 0) {
        message.warning("队长信息有误，查无此人！");
        return;
      }
      const user_id = userData.data.user[0]._id;
      const isTeamLeader = await refetchisleader({
        _id: user_id,
        contest_id: props.contest_id,
      });
      const isTeamMember = await refetchismember({
        uuid: user_id,
        contest_uuid: props.contest_id,
      });
      if (
        isTeamLeader.data.contest_team.length !== 0 ||
        isTeamMember.data.contest_team_member.length !== 0
      ) {
        message.warning("该用户已存在于某一队伍中");
        return;
      }
      await insertteamMember({
        variables: {
          team_uuid: props.team_id,
          user_uuid: user_id,
        },
      });
      if (!insertError) {
        message.success("添加成员成功");
      }
    } catch {}
    add_member_form.resetFields();
    refetchTeamInfo();
  };
  //#endregion

  const contentList = {
    basic: (
      <div
        style={{
          fontSize: "large",
          lineHeight: "30px",
        }}
      >
        <Text style={{ fontWeight: "700" }}>{"队名: "}</Text>
        <Text>{teamData?.contest_team[0].team_name}</Text>
        <br />
        <Text style={{ fontWeight: "700" }}>{"队长: "}</Text>
        <Text>{teamData?.contest_team[0].team_leader_id?.name}</Text>
        <br />
        <Text style={{ fontWeight: "700" }}>{"队员: "}</Text>
        {teamData?.contest_team[0].contest_team_members.length === 0 ? (
          <>
            <Text>无</Text>
            <br />
          </>
        ) : (
          <List
            dataSource={teamData?.contest_team[0].contest_team_members}
            renderItem={(item) => (
              <List.Item style={{ width: "100px" }}>
                <Text>{item.user_as_contest_team_member.name}</Text>
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
                            user_uuid: item.user_as_contest_team_member._id,
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
        <Text>{teamData?.contest_team[0].team_intro}</Text>
        <br />
        <Text style={{ fontWeight: "700" }}>{"已提交代码数: "}</Text>
        <Text>{teamData?.contest_team[0].submitted_code_num}</Text>
      </div>
    ),
    addMember: (
      <div>
        <Row justify="start">
          <Form
            name="addMember"
            form={add_member_form}
            onFinish={handleAddMember}
            onFinishFailed={(errorInfo: any) => {
              console.log("Failed:", errorInfo);
            }}
            preserve={false}
          >
            <Form.Item
              name="member_name"
              label="成员姓名"
              rules={[{ required: true, message: "成员的姓名不能为空" }]}
            >
              <Input allowClear placeholder="输入需添加成员姓名" />
            </Form.Item>
            <Form.Item
              name="member_email"
              label="成员邮箱"
              rules={[
                { required: true, message: "成员的邮箱不能为空" },
                {
                  type: "email",
                  message: "请输入合法邮箱",
                },
              ]}
            >
              <Input allowClear placeholder="输入需添加成员邮箱" />
            </Form.Item>
            <Form.Item name="submit">
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  teamData?.contest_team[0].contest_team_members.length === 3
                }
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    ),
  };

  return (
    <div>
      <Row
        justify="center"
        css={`
          margin-top: 50px;
        `}
      >
        <Card
          style={{ width: "80%" }}
          title={
            <Text
              css={`
                font-size: xx-large;
                font-weight: bold;
              `}
            >
              {teamData?.contest_team[0].team_name}
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
          hoverable
        >
          {contentList[activeTabKey as keyof typeof contentList]}
        </Card>
      </Row>
    </div>
  );
};

export default ManageTeamsPage;
