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
  GetTeamInfo as GET_TEAM_INFO,
  InsertTeamMember as INSERT_TEAM_MEMBER,
  DeleteTeamMember as DELETE_TEAM_MEMBER
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
  InsertTeamMember,
  InsertTeamMemberVariables,
  DeleteTeamMember,
  DeleteTeamMemberVariables,
} from "../../api/types";
import { Button, Card, Col, Form, Input, Layout, List, message, Modal, Result, Row, Table, Typography, Upload } from "antd";
import { TableProps } from "antd/lib/table";
import { ArrowRightOutlined, DownloadOutlined, ExclamationCircleOutlined, ForwardOutlined, MinusCircleOutlined, PlusOutlined, RollbackOutlined, UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { downloadFile, getSharedOSS } from "../../helpers/oss";
import OSS from "ali-oss";
import { RcCustomRequestOptions, RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

const { Text } = Typography;
const { confirm } = Modal;

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
          <Button
            css={`
    width:120px;
    margin-top: 12px;
    `}
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            添加新队伍
          </Button>
          <Button
            css={`
          margin-top: 12px;
          margin-left: 15px
          `}
            icon={<ForwardOutlined />}
          >
            运行比赛
          </Button>

        </Card>
      </Row>

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

  const [insertteamMember, { error: insertError }] = useMutation<
    InsertTeamMember,
    InsertTeamMemberVariables
  >(INSERT_TEAM_MEMBER);

  const [DeleteTeamMember, { error: DeleteTeamMemberError }] = useMutation<
    DeleteTeamMember,
    DeleteTeamMemberVariables
  >(DELETE_TEAM_MEMBER);

  useEffect(() => {
    if (DeleteTeamMemberError) {
      message.error("删除成员失败");
    }
  }, [DeleteTeamMemberError]);

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

  //添加成员界面
  //#region
  const [add_member_form] = Form.useForm();
  const handleAddMember = async () => {
    const values = add_member_form.getFieldsValue();
    try {
      const userData = await refetchUserId({ email: values.member_email, name: values.member_name });
      if (userData.data.user.length === 0) {
        message.warn("队长信息有误，查无此人！");
        return;
      }
      const user_id = userData.data.user[0]._id;
      const isTeamLeader = await refetchisleader({
        _id: user_id,
        contest_id: props.contest_id
      });
      const isTeamMember = await refetchismember({
        _id: user_id,
        contest_id: props.contest_id
      });
      if (isTeamLeader.data.contest_team.length !== 0 || isTeamMember.data.contest_team_member.length !== 0) {
        message.warn("该用户已存在于某一队伍中");
        return;
      }
      await insertteamMember({
        variables: {
          team_id: props.team_id,
          user_id: user_id,
        },
      });
      if (!insertError) {
        message.success("添加成员成功")
      }
    } catch {

    }
    add_member_form.resetFields();
    refetchTeamInfo();
  }
  //#endregion

  //上传和查看代码界面
  //列出team已上传的代码文件
  const [codeList, setCodeList] = useState<OSS.ObjectMeta[]>([]);//返回的查看结果
  const [codeRoutes1, setCodeRoutes1] = useState<string>();
  const [codeRoutes2, setCodeRoutes2] = useState<string>();
  const [codeRoutes3, setCodeRoutes3] = useState<string>();
  const [codeRoutes4, setCodeRoutes4] = useState<string>();
  const list = async () => {
    try {
      let oss = await getSharedOSS();
      let result = await oss.list({
        'max-keys': 5,
        'prefix': `THUAI5/${props.team_id}/`,
      },
        { 'timeout': 0 });
      console.log(result.objects);
      setCodeList(result.objects);

      setCodeRoutes1(undefined);
      setCodeRoutes2(undefined);
      setCodeRoutes3(undefined);
      setCodeRoutes4(undefined);

      for (let i = 0; i < result.objects.length; i++) {
        if (result.objects[i].name === `THUAI5/${props.team_id}/`) {
          continue;
        }
        if (result.objects[i].name.indexOf(`THUAI5/${props.team_id}/`) === 0) {
          switch (result.objects[i].name.split('/')[2]) {
            case "player1.cpp": setCodeRoutes1(result.objects[i].name); break;
            case "player2.cpp": setCodeRoutes2(result.objects[i].name); break;
            case "player3.cpp": setCodeRoutes3(result.objects[i].name); break;
            case "player4.cpp": setCodeRoutes4(result.objects[i].name); break;
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => { list() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(codeList);
  console.log(codeRoutes1);



  const handleUpload = async (e: RcCustomRequestOptions, i: number) => {
    const oss = await getSharedOSS();
    const result = await oss.multipartUpload(
      `THUAI5/${props.team_id}/player${i}.cpp`,
      e.file,
      {
        progress: (progress) =>
          e.onProgress({ percent: progress * 100 }, e.file),
      }
    );
    if (result.res.status === 200) {
      e.onSuccess(result.res, e.file);
    } else {
      e.onError(new Error());
    }

  };

  const handleRemove = async (file: UploadFile, i: number) => {
    if (file.response?.status === 200) {
      const oss = await getSharedOSS();
      await oss.delete(`THUAI5/${props.team_id}/player${i}.cpp`);
    }
    switch (i) {
      case 1: setCodeRoutes1(undefined); break;
      case 2: setCodeRoutes2(undefined); break;
      case 3: setCodeRoutes3(undefined); break;
      case 4: setCodeRoutes4(undefined); break;
    }

  };

  const handleDownload = (file: UploadFile<any>, codeRole: number) => {
    console.log(file);
    const codefile = {
      filename: file.name,
      url: `/${file.uid}`
    }
    message.info("开始下载:" + codefile.filename);
    downloadFile(codefile).catch(e => {
      message.error("下载失败");
    })
  }

  const handleChange = (info: UploadChangeParam<UploadFile<any>>, codeRole: number) => {
    console.log(info);
    console.log(info.file);
    if (info.file.status === 'done') {
      message.success(`${info.file.name} → P${codeRole} 上传成功`);
      switch (codeRole) {
        case 1: setCodeRoutes1(`THUAI5/${props.team_id}/player${codeRole}.cpp`); break;
        case 2: setCodeRoutes2(`THUAI5/${props.team_id}/player${codeRole}.cpp`); break;
        case 3: setCodeRoutes3(`THUAI5/${props.team_id}/player${codeRole}.cpp`); break;
        case 4: setCodeRoutes4(`THUAI5/${props.team_id}/player${codeRole}.cpp`); break;
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} → P${codeRole} 上传失败`);
    }

  }

  /* async function getStream() {
    try {
      const oss = await getSharedOSS();
      const result = await oss.get('contest_upload/%E6%B8%B8%E6%88%8F%E8%A7%84%E5%88%99_%E9%80%89%E6%89%8B%E7%89%88.md');
      console.log(result);
      console.log(result.content);

    } catch (e) {
      console.log(e);
    }
  } */


  const contentList = {
    basic: (
      <div
        style={{
          fontSize: "large",
          lineHeight: "30px"
        }}
      >
        <Text style={{ fontWeight: "700" }}>
          {"队名: "}
        </Text>
        <Text>
          {teamData?.contest_team[0].team_name}
        </Text>
        <br />
        <Text style={{ fontWeight: "700" }}>
          {"队长: "}
        </Text>
        <Text>
          {teamData?.contest_team[0].team_leader_id?.name}
        </Text>
        <br />
        <Text style={{ fontWeight: "700" }}>
          {"队员: "}
        </Text>
        {
          teamData?.contest_team[0].contest_team_members.length === 0 ?
            <><Text>无</Text><br /></> :
            <List
              dataSource={teamData?.contest_team[0].contest_team_members}
              renderItem={(item) => (
                <List.Item style={{ width: "100px" }}>
                  <Text>{item.user_as_contest_team_member.name}</Text>
                  <MinusCircleOutlined onClick={() => {
                    Modal.confirm({
                      title: "确定要移除该成员吗？",
                      icon: <ExclamationCircleOutlined />,
                      content: "若不在任何队伍中无法参加比赛!",
                      onOk: async () => {
                        await DeleteTeamMember({ variables: { team_id: props.team_id, user_id: item.user_as_contest_team_member._id } });
                        await refetchTeamInfo();
                        if (!DeleteTeamMemberError) {
                          message.success("成功移除该成员");
                        }
                      }
                    });
                  }} />
                </List.Item>
              )}
            />
        }

        <Text style={{ fontWeight: "700" }}>
          {"队伍描述: "}
        </Text>
        <br />
        <Text>
          {teamData?.contest_team[0].team_intro}
        </Text>
        <br />
        <Text style={{ fontWeight: "700" }}>
          {"已提交代码数: "}
        </Text>
        <Text>
          {teamData?.contest_team[0].submitted_code_num}
        </Text>
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
              rules={[{ required: true, message: "成员的邮箱不能为空" }, {
                type: "email",
                message: "请输入合法邮箱"
              }]}
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
              >提交
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    ),
    code: (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Player1" hoverable>
              <Upload
                customRequest={async (e: RcCustomRequestOptions) => {
                  if (codeRoutes1) {
                    confirm({
                      title: "你确定用此代码替换原代码吗？",
                      icon: <ExclamationCircleOutlined />,
                      content: '一个角色只能提交一份代码',
                      onOk() {
                        handleUpload(e, 1);
                      }
                    })
                  } else {
                    handleUpload(e, 1);
                  }
                }}
                onRemove={async (file: UploadFile) => {
                  handleRemove(file, 1);
                }}
                onDownload={async (file: UploadFile<any>) => {
                  handleDownload(file, 1);
                }}
                onChange={(info: UploadChangeParam<UploadFile<any>>) => { handleChange(info, 1); }}
                beforeUpload={(file: RcFile) => {
                  const isCpp = file.type === 'text/plain' && file.name.endsWith(".cpp");
                  if (!isCpp) {
                    message.error(`请上传cpp文件`);
                  }
                  return isCpp;
                }}
                showUploadList={{
                  showDownloadIcon: true,
                  downloadIcon: <DownloadOutlined />,
                }}
                fileList={!codeRoutes1 ? undefined : [
                  {
                    response: { status: 200 },
                    status: "done",
                    uid: codeRoutes1,
                    name: codeRoutes1?.split('/')[2],
                    type: "",
                  } as UploadFile]
                }
              >
                <Button icon={<UploadOutlined />}>上传代码</Button>
              </Upload>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Player2" hoverable>
              <Upload
                customRequest={async (e: RcCustomRequestOptions) => {
                  if (codeRoutes2) {
                    confirm({
                      title: "你确定用此代码替换原代码吗？",
                      icon: <ExclamationCircleOutlined />,
                      content: '一个角色只能提交一份代码',
                      onOk() {
                        handleUpload(e, 2);
                      }
                    })
                  } else {
                    handleUpload(e, 2);
                  }
                }}
                onRemove={async (file: UploadFile) => {
                  handleRemove(file, 2);
                }}
                fileList={!codeRoutes2 ? undefined : [
                  {
                    response: { status: 200 },
                    status: "done",
                    uid: codeRoutes2,
                    name: codeRoutes2?.split('/')[2],
                    type: "",
                  } as UploadFile]
                }
              >
                <Button icon={<UploadOutlined />}>上传代码</Button>
              </Upload>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Player3" hoverable>
              <Upload
                customRequest={async (e: RcCustomRequestOptions) => {
                  if (codeRoutes3) {
                    confirm({
                      title: "你确定用此代码替换原代码吗？",
                      icon: <ExclamationCircleOutlined />,
                      content: '一个角色只能提交一份代码',
                      onOk() {
                        handleUpload(e, 3);
                      }
                    })
                  } else {
                    handleUpload(e, 3);
                  }
                }}
                onRemove={async (file: UploadFile) => {
                  handleRemove(file, 3);
                }}
                fileList={!codeRoutes3 ? undefined : [
                  {
                    response: { status: 200 },
                    status: "done",
                    uid: codeRoutes3,
                    name: codeRoutes3?.split('/')[2],
                    type: "",
                  } as UploadFile]
                }
              >
                <Button icon={<UploadOutlined />}>上传代码</Button>
              </Upload>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Player4" hoverable>
              <Upload
                customRequest={async (e: RcCustomRequestOptions) => {
                  if (codeRoutes4) {
                    confirm({
                      title: "你确定用此代码替换原代码吗？",
                      icon: <ExclamationCircleOutlined />,
                      content: '一个角色只能提交一份代码',
                      onOk() {
                        handleUpload(e, 4);
                      }
                    })
                  } else {
                    handleUpload(e, 4);
                  }
                }}
                onRemove={async (file: UploadFile) => {
                  handleRemove(file, 4);
                }}
                fileList={!codeRoutes4 ? undefined : [
                  {
                    response: { status: 200 },
                    status: "done",
                    uid: codeRoutes4,
                    name: codeRoutes4?.split('/')[2],
                    type: "",
                  } as UploadFile]
                }
              >
                <Button icon={<UploadOutlined />}>上传代码</Button>
              </Upload>
            </Card>
          </Col>
        </Row>
      </div >
    ),
    complie: (
      <div>

      </div>
    ),
  }


  return (
    <div>
      <Row
        justify="center"
        css={`margin-top:50px`}>
        <Card
          style={{ width: "80%" }}
          title={
            <Text css={`
          font-size:xx-large;
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
