/* 本页面需要实现的功能：
 * 1、创建队伍
 * 2、将学生添加至指定队伍
 * 3、上传、下载代码
 * 4、手动编译
 */

import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { getUserInfo } from "../../helpers/auth";
//graphql语句
import {
  GetAllTeamInfo as GET_ALL_TEAM_INFO,
  QueryContestManager as QUERY_CONTEST_MANAGER,
  InsertTeam as INSERT_TEAM,
  IsTeamLeader as IS_TEAM_LEADER,
  IsTeamMember as IS_TEAM_MEMBER,
  GetTeamInfo as GET_TEAM_INFO
} from "../../api/contest.graphql";
import { GetUser_Id as GET_USER_ID } from "../../api/contest_manager.graphql";
import {
  GetAllTeamInfo_contest_team,
  GetAllTeamInfo,
  GetAllTeamInfoVariables,
  QueryContestManager,
  QueryContestManagerVariables,
  InsertTeam,
  InsertTeamVariables,
  IsTeamLeader,
  IsTeamLeaderVariables,
  IsTeamMember,
  IsTeamMemberVariables,
  GetUser_Id,
  GetUser_IdVariables,
  GetTeamInfo,
  GetTeamInfoVariables,
} from "../../api/types";
import { Button, Card, Form, Input, Layout, message, Modal, Result, Row, Table, Typography } from "antd";
import { TableProps } from "antd/lib/table";
import { ArrowRightOutlined, PlusOutlined, RollbackOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

const { Text } = Typography;

const ManageContestPage: React.FC = () => {
  //获取比赛ID
  const location = useLocation()
  const Contest_id = location.pathname.split("/")[2].replace('}', '')
  //获取用户信息
  const userInfo = getUserInfo();

  const {
    data: isContestManagerData,
    error: isContestManagerError
  } = useQuery<QueryContestManager, QueryContestManagerVariables>(QUERY_CONTEST_MANAGER, {
    variables: {
      contest_id: Contest_id,
      user_id: userInfo?._id
    }
  });

  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message)
    }
  }, [isContestManagerError]);

  const [editingTeamID, setEditingTeamID] = useState<string>();


  return (
    ((["root", "counselor"].includes(userInfo?.role!) || isContestManagerData?.contest_manager.length === 1)) ?
      ((editingTeamID === undefined) ?
        <ListPage contest_id={Contest_id} setEditingTeamID={setEditingTeamID} /> :
        <SubPage contest_id={Contest_id} team_id={editingTeamID} setEditingTeamID={setEditingTeamID} />) :
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">
          <Link to="/contest">Back To ContestPage</Link>
        </Button>}
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
  contest_id: string,
  setEditingTeamID: React.Dispatch<React.SetStateAction<string | undefined>>
}> = (props) => {

  //添加新队伍功能
  const [insertTeam, { error: insertError, loading: teamAdding }] = useMutation<
    InsertTeam,
    InsertTeamVariables
  >(INSERT_TEAM);

  const { refetch: refetchisleader } = useQuery<
    IsTeamLeader,
    IsTeamLeaderVariables
  >(IS_TEAM_LEADER, {
    variables: {
      _id: "",
      contest_id: props.contest_id,
    },
  });
  const { refetch: refetchismember } = useQuery<
    IsTeamMember,
    IsTeamMemberVariables
  >(IS_TEAM_MEMBER, {
    variables: {
      _id: "",
      contest_id: props.contest_id,
    },
  });

  const {
    error: userError,
    refetch: refetchUserId
  } = useQuery<GetUser_Id, GetUser_IdVariables>(GET_USER_ID, {
    variables: {
      email: "",
      name: ""
    }
  });

  useEffect(() => {
    if (userError) {
      message.error("用户信息查询失败");
      console.log(userError.message);
    }
  }, [userError]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleTeamAdd = async () => {
    const values = await form.getFieldsValue();
    console.log(values);
    if (values.leader_name === undefined ||
      values.leader_email === undefined ||
      values.team_name === undefined ||
      values.team_intro === undefined) {
      return;
    }

    try {
      const leaderData = await refetchUserId({ email: values.leader_email, name: values.leader_name });
      if (leaderData.data.user.length === 0) {
        message.warn("队长信息有误，查无此人！");
        return;
      }
      const leader_id = leaderData.data.user[0]?._id;
      const isTeamLeader = await refetchisleader({
        _id: leader_id,
        contest_id: props.contest_id
      });
      const isTeamMember = await refetchismember({
        _id: leader_id,
        contest_id: props.contest_id
      });
      if (isTeamLeader.data.contest_team.length !== 0 || isTeamMember.data.contest_team_member.length !== 0) {
        message.warn("该用户已存在于某一队伍中");
        return;
      }
      const InviteCode = randomString();
      await insertTeam({
        variables: {
          team_name: values.team_name,
          team_intro: values.team_intro,
          team_leader: leader_id,
          invited_code: InviteCode,
          contest_id: props.contest_id
        }
      });
      if (!insertError) {
        message.success("添加队伍成功");
      }
    } catch {

    }
    form.resetFields();
    refetchteamList();
    setIsModalVisible(false);
  }


  //队伍一览表功能
  const {
    data: teamListData,
    loading: teamListLoading,
    error: teamListError,
    refetch: refetchteamList,
  } = useQuery<GetAllTeamInfo, GetAllTeamInfoVariables>(GET_ALL_TEAM_INFO, {
    variables: {
      contest_id: props.contest_id
    }
  });

  useEffect(() => {
    if (teamListError) {
      message.error("队伍列表加载失败");
      console.log(teamListError.message);
    }
  }, [teamListError]);

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
      dataIndex: "team_intro",
      key: "team_intro",
      render: (text, record) => record.team_intro,
      ellipsis: true,
    },
    {
      title: "已提交代码数",
      dataIndex: "submitted_code_num",
      key: "submitted_code_num",
      render: (text, record) => record.submitted_code_num
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => props.setEditingTeamID(record.team_id)} />
      )
    }

  ];

  //搜索功能


  return (
    <Layout>
      <Row justify="center" css={`margin-top:50px`}>
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
          <Table
            loading={teamListLoading}
            dataSource={teamListData?.contest_team}
            columns={teamListColumns}
            rowKey={record => record.team_id}
          />
        </Card>
      </Row>
      <Button
        css={`
    width:120px;
    margin-top: 12px;
    margin-right: 24px;
    margin-left:150px;
    `}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        添加新队伍
      </Button>
      <Modal
        visible={isModalVisible}
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
            console.log('Failed:', errorInfo);
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
              { type: "email", message: "请输入合法邮箱" }]}
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
            rules={[
              { required: true, message: "Please input team detail!" },
            ]}
          >
            <TextArea placeholder="输入队伍简介" rows={3} allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>

  );

}

const SubPage: React.FC<{
  contest_id: string,
  team_id: string,
  setEditingTeamID: React.Dispatch<React.SetStateAction<string | undefined>>
}> = (props) => {

  const {
    data: teamData,
    error: getTeamInfoError,
    refetch: refetchTeamInfo
  } = useQuery<GetTeamInfo, GetTeamInfoVariables>(GET_TEAM_INFO, {
    variables: {
      contest_id: props.contest_id,
      team_id: props.team_id
    }
  });

  useEffect(() => {
    if (getTeamInfoError) {
      message.error("队伍信息加载失败");
      console.log(getTeamInfoError.message);
    }
  }, [getTeamInfoError]);

  const [activeTabKey, setActiveTabKey] = useState("basic");

  const tabList = [
    {
      key: "basic",
      tab: "基础信息"
    },
    {
      key: "addMember",
      tab: "添加成员"
    },
    {
      key: "code",
      tab: "查看代码"
    },
    {
      key: "compile",
      tab: "手动编译"
    }
  ];

  const onTabChange = (key: any) => {
    setActiveTabKey(key);
  }

  const contentList = {
    basic: (
      <div>
        <Text>
          队名: {teamData?.contest_team[0].team_name}
        </Text>
        <br />
        <Text>
          队长: {teamData?.contest_team[0].team_leader_id?.name}
        </Text>
        <br />
        <Text>
          队员: {teamData?.contest_team[0].contest_team_members.length === 0 ? "无" : teamData?.contest_team[0].contest_team_members.map((i) => [i.user_as_contest_team_member.name + "   "])}
        </Text>
        <br />
        <Text>
          队伍描述: {teamData?.contest_team[0].team_intro}
        </Text>
        <br />
        <Text>
          已提交代码数: {teamData?.contest_team[0].submitted_code_num}
        </Text>
      </div>
    ),
    addMember: (
      <div>
        <p>add-member</p>
        <Button onClick={() => refetchTeamInfo()}>Refetch</Button>
      </div>

    )
  }


  return (
    <div>
      <Row
        justify="center"
        css={`margin-top:50px`}>
        <Card
          style={{ width: "70%" }}
          title={
            <Text css={`
          font-size:x-large;
          font-weight:bold;
          `}>
              {teamData?.contest_team[0].team_name}
            </Text>}
          extra={<Button icon={<RollbackOutlined />} onClick={() => props.setEditingTeamID(undefined)} />}
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
}


export default ManageContestPage;
