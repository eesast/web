import React, { useEffect } from "react";
import {
  Input,
  Table,
  Result,
  Card,
  Row,
  Col,
  Button,
  Form,
  message,
  Modal,
} from "antd"; //botton
import { Layout } from "antd";
import { getUserInfo } from "../../helpers/auth"; //更改：取消注释
import Loading from "../../components/Loading";
//----根据队员信息查找队伍信息------
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/thuai.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/thuai.graphql";
//---------插入结束----------------
import { GetTeamInfo as GETTEAMINFO } from "../../api/thuai.graphql";
import { GetTeamInfo, GetTeamInfoVariables } from "../../api/types";
//-----------更新队伍名称、队伍简介----------------
import { UpdateTeam as UPDATETEAM } from "../../api/thuai.graphql";
import { UpdateTeam, UpdateTeamVariables } from "../../api/types";
//----------------查询队员信息-------------------
import { GetMemberInfo as GETMEMBERINFO } from "../../api/thuai.graphql";
import {
  GetMemberInfo_team_member,
  GetMemberInfo,
  GetMemberInfoVariables,
} from "../../api/types";
//----------------------删除相关操作-----------------------------
import {
  DeleteTeam as DELETETEAM,
  DeleteAllTeamMember as DELETEALLMEMBERTEAM,
  DeleteTeamMember as DELETETEAMMEMBER,
} from "../../api/thuai.graphql";
import {
  DeleteTeam,
  DeleteTeamVariables,
  DeleteAllTeamMember,
  DeleteAllTeamMemberVariables,
  DeleteTeamMember,
  DeleteTeamMemberVariables,
} from "../../api/types";
// import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client"; //更改：取消注释
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
//import ThuaiSite from ".";
//import { ConsoleSqlOutlined } from "@ant-design/icons";
import { TableProps } from "antd/lib/table";
const { TextArea } = Input;
const { Content } = Layout;
const { confirm } = Modal;

const ManagePage: React.FC = () => {
  const userInfo = getUserInfo();
  //-----------------根据队员id查询队伍信息------------------
  const { data: isleaderData, loading: leaderLoading } = useQuery<
    IsTeamLeader,
    IsTeamLeaderVariables
  >(ISTEAMLEADER, {
    variables: {
      _id: userInfo?._id!,
    },
  });
  const {
    data: ismemberData,
    loading: memberLoading,
    refetch: refetchMember,
  } = useQuery<IsTeamMember, IsTeamMemberVariables>(ISTEAMMEMBER, {
    variables: {
      _id: userInfo?._id!,
    },
  });
  const teamid =
    isleaderData?.user[0].team_as_leader[0]?.team_id ||
    ismemberData?.user[0].team_as_member[0]?.team_id;

  //根据team_id查询所有队员信息
  const { data: teamMemberData, loading: teamMemberLoading } = useQuery<
    GetMemberInfo,
    GetMemberInfoVariables
  >(GETMEMBERINFO, {
    variables: {
      team_id: teamid,
    },
  });
  //更新队伍信息
  const [
    UpdateTeam,
    { data: UpdateTeamData, loading: UpdatingTeamInfo, error: UpdateTeamError },
  ] = useMutation<UpdateTeam, UpdateTeamVariables>(UPDATETEAM);
  //删除队伍信息
  const [DeleteTeam, { error: DeleteTeamError }] = useMutation<
    DeleteTeam,
    DeleteTeamVariables
  >(DELETETEAM);
  //删除所有队员
  const [
    DeleteAllTeamMember,
    { error: DeleteAllTeamMemberERROR },
  ] = useMutation<DeleteAllTeamMember, DeleteAllTeamMemberVariables>(
    DELETEALLMEMBERTEAM
  );

  const [DeleteTeamMember, { error: DeleteTeamMemberError }] = useMutation<
    DeleteTeamMember,
    DeleteTeamMemberVariables
  >(DELETETEAMMEMBER);

  //利用teamid查询team的信息储存在teamdata中
  const { data: teamData, loading, refetch: refetchTeam } = useQuery<
    GetTeamInfo,
    GetTeamInfoVariables
  >(GETTEAMINFO, {
    variables: {
      team_id: teamid!,
    },
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
    if (DeleteTeamError || DeleteAllTeamMemberERROR) {
      message.error("解散队伍失败");
    }
  }, [DeleteTeamError, DeleteAllTeamMemberERROR]);

  const team = {
    ...teamData?.thuai[0],
    leader_name: teamData?.thuai[0]?.user?.name,
  };
  const isLeader = userInfo?._id === team?.team_leader;

  if (loading || leaderLoading || memberLoading || !userInfo) {
    return <Loading />;
  }
  const userid = userInfo._id;
  //若未加入任何队伍
  if (!teamid) {
    return (
      <div>
        <Result
          status="warning"
          title="您还没有加入任何队伍"
          extra={
            <Button type="primary">
              <Link replace to="/thuai/join">
                加入队伍
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  const onFinish = async (record: any) => {
    const newinfo = {
      team_id: teamid,
      team_name: record.team_name,
      team_sum: record.team_sum,
    };
    UpdateTeam({
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
        await DeleteTeamMember({ variables: { user_id } });
        Modal.success({
          title: "已退出队伍",
          content: "请重新加入队伍",
        });
        await refetchMember();
        //await refetchTeam();
      },
    });
  };
  const deleteTeamMemberByLeader = async (user_id: string) => {
    confirm({
      title: "确定要移除该同学吗？",
      icon: <ExclamationCircleOutlined />,
      content: "若不在任何队伍中无法参加比赛!",
      onOk: async () => {
        await DeleteTeamMember({ variables: { user_id } });
        message.success("移除成功");
        //await refetchMember();
        await refetchTeam();
      },
    });
  };
  const deleteWholeTeam = async (team_id: string) => {
    confirm({
      title: "确定要解散队伍吗？",
      icon: <ExclamationCircleOutlined />,
      content: "会移除队伍以及所有队伍成员，若不在队伍中无法参加比赛!",
      onOk: async () => {
        await DeleteAllTeamMember({ variables: { team_id } });
        await DeleteTeam({ variables: { team_id } });
        Modal.success({
          title: "队伍已解散",
          content: "请重新加入队伍",
        });
      },
    });
  };
  const memberListColumns: TableProps<GetMemberInfo_team_member>["columns"] = [
    {
      title: "姓名",
      key: "name",
      render: (text, record) => record.user?.name,
    },
    {
      title: "学号",
      key: "id",
      render: (text, record) => record.user?.id,
    },
    {
      title: "管理",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            disabled={!isLeader}
            onClick={() => deleteTeamMemberByLeader(record.user._id)}
          >
            移除
          </Button>
        );
      },
    },
  ];
  //-----------------查询结束---------------------------
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
                //form={form}
                layout="vertical"
                //initialValues={{ remember: true }}
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
                    style={{ width: "30%" }}
                    disabled={false} //{!isLeader}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="on"
                    placeholder={team.team_name}
                  />
                </Form.Item>
                <Form.Item name="invited_code" label="邀请码">
                  <span>{team.invited_code}</span>
                </Form.Item>
                <Form.Item label="队长">
                  <span>{team.leader_name}</span>
                </Form.Item>
                <Form.Item label="队员">
                  {}

                  <Table
                    loading={teamMemberLoading}
                    columns={memberListColumns}
                    dataSource={teamMemberData?.team_member}
                  />
                </Form.Item>
                <Form.Item
                  name="team_sum"
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
                    rows={6}
                    disabled={false}
                    placeholder={team.team_sum}
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    loading={UpdatingTeamInfo}
                    htmlType="submit"
                  >
                    确认修改
                  </Button>
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
