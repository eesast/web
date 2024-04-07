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
  DownloadOutlined,
} from "@ant-design/icons";
import * as xlsx from "xlsx";
import TextArea from "antd/lib/input/TextArea";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import styled from "styled-components";
import { ContestProps } from "..";

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
  const { data: getContestManagersData, error: getContestManagersError } =
    graphql.useGetContestManagersSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (getContestManagersError) {
      message.error("管理员加载失败");
      console.log(getContestManagersError.message);
    }
  }, [getContestManagersError]);

  /* ---------------- 页面组件 ---------------- */
  return getContestManagersData?.contest_by_pk?.contest_managers.some(
    (manager) => manager.user_uuid === user?.uuid,
  ) ? (
    editingTeamID === undefined ? (
      <ListPage
        contest_id={Contest_id}
        setEditingTeamID={setEditingTeamID}
        user_uuid={user?.uuid}
      />
    ) : (
      <SubPage
        contest_id={Contest_id}
        team_id={editingTeamID}
        setEditingTeamID={setEditingTeamID}
        user_uuid={user?.uuid}
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
  user_uuid: string | undefined;
}> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [insertTeam, { error: insertError, loading: teamAdding }] =
    graphql.useInsertTeamMutation();
  const { refetch: refetchisleader } = graphql.useIsTeamLeaderSuspenseQuery({
    variables: {
      uuid: props?.user_uuid,
      contest_id: props.contest_id,
    },
  });
  const { refetch: refetchismember } = graphql.useIsTeamMemberSuspenseQuery({
    variables: {
      user_uuid: props?.user_uuid,
      contest_id: props.contest_id,
    },
  });
  const { error: userError, refetch: refetchUserId } =
    graphql.useGetUser_IdSuspenseQuery({
      variables: {
        email: "",
        realname: "",
      },
    });
  const { data: roomInfoData, error: roomInfoError } =
    graphql.useGetRoomInfoSubscription({
      variables: { contest_id: props.contest_id },
    });

  //队伍一览表功能
  const { data: teamListData, error: teamListError } =
    graphql.useGetAllTeamInfoSubscription({
      variables: {
        contest_id: props.contest_id,
      },
    });

  const { data: contestInfoData, error: contestInfoError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: props.contest_id,
      },
    });

  const ALL_CODES = 1;
  const SUCCESS_CODES = 2;

  const CodesCount = ({ teamId }: { teamId: string }) => {
    const count = useCodesCount(teamId, ALL_CODES);
    return <>{count}</>;
  };
  const CompiledCount = ({ teamId }: { teamId: string }) => {
    const count = useCodesCount(teamId, SUCCESS_CODES);
    return <>{count}</>;
  };
  const TotalScore = ({ teamId }: { teamId: string }) => {
    const count = useTotalScore(teamId);
    return <>{count}</>;
  };
  const CompetitionCount = ({ teamId }: { teamId: string }) => {
    const count = useCompetitionCount(teamId);
    return <>{count}</>;
  };

  function useCompetitionCount(teamId: string) {
    const competitionCount = roomInfoData?.contest_room
      .flatMap((room) => room.contest_room_teams)
      .filter((team) => team.contest_team.team_id === teamId).length;

    return competitionCount;
  }

  function useTotalScore(teamId: string) {
    const totalScore = roomInfoData?.contest_room.reduce((acc, room) => {
      // 找到与teamId匹配的队伍并累加它们的分数
      const teamScore = room.contest_room_teams.find(
        (team) => team.contest_team.team_id === teamId,
      )?.contest_team.score;

      return acc + (Number(teamScore) || 0);
    }, 0);

    return totalScore;
  }

  function useCodesCount(teamId: string, type: number) {
    const { data: codeInfoData, error: codeInfoError } =
      graphql.useGetTeamCodesSubscription({
        variables: { team_id: teamId },
      });

    useEffect(() => {
      if (codeInfoError) {
        message.error("代码信息加载失败");
      }
    });

    if (type === 1) return codeInfoData?.contest_team_code?.length;
    else if (type === 2)
      return codeInfoData?.contest_team_code?.filter(
        (code) => code.compile_status === "Success",
      ).length;
  }

  useEffect(() => {
    if (roomInfoError) {
      message.error("房间信息加载失败");
    }
  }, [roomInfoError]);

  useEffect(() => {
    if (contestInfoError) {
      message.error("比赛信息加载失败");
    }
  }, [contestInfoError]);

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

  function cleanFileName(fileName: string) {
    // 定义非法字符正则表达式
    const illegalRe = /[/?<>\\:*|"]/g;
    // 定义保留名称的正则表达式，如CON, PRN, AUX, NUL等
    const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    // 定义以点结束的正则表达式
    const windowsTrailingRe = /[. ]+$/;
    // 替换非法字符为空字符串
    const cleaned = fileName
      .replace(illegalRe, "")
      .replace(windowsTrailingRe, "");
    // 检查是否为Windows保留名称，如果是，添加前缀
    if (windowsReservedRe.test(cleaned)) {
      return `_${cleaned}`;
    }
    return cleaned;
  }

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
        realname: values.leader_name,
      });
      if (leaderData.data.users.length === 0) {
        message.warning("队长信息有误，查无此人！");
        return;
      }
      const leader_id = leaderData.data.users[0]?.uuid;
      const isTeamLeader = await refetchisleader({
        uuid: leader_id,
        contest_id: props.contest_id,
      });
      const isTeamMember = await refetchismember({
        user_uuid: leader_id,
        contest_id: props.contest_id,
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
          team_leader_uuid: leader_id,
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
      const contestName = cleanFileName(
        contestInfoData?.contest_by_pk?.contest_name!,
      );
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.aoa_to_sheet(teamsData);
      xlsx.utils.book_append_sheet(workBook, workSheet, "helloWorld");
      xlsx.writeFile(workBook, `队伍信息_${contestName}.xlsx`);
    } catch (error) {
      message.error("队伍信息导出失败");
    }
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
      render: (text, record) => record.team_leader?.realname,
    },
    {
      title: "队员",
      key: "team_member",
      render: (text, record) =>
        record.contest_team_members.map((i) => [i.user?.realname + "   "]),
    },
    {
      title: "已提交代码数",
      dataIndex: "submitted_code_num",
      key: "submitted_code_num",
      render: (text, record) => <CodesCount teamId={record.team_id} />,
    },
    {
      title: "过编译代码数",
      dataIndex: "submitted_code_num",
      key: "compiled_code_num",
      render: (text, record) => <CompiledCount teamId={record.team_id} />,
    },
    {
      title: "比赛次数",
      dataIndex: "contest_num",
      key: "contest_num",
      render: (text, record) => <CompetitionCount teamId={record.team_id} />,
      sorter: (a, b) => Number(a.status2) - Number(b.status2),
    },
    {
      title: "天梯总分数",
      dataIndex: "contest_score",
      key: "contest_score",
      render: (text, record) => <TotalScore teamId={record.team_id} />,
      sorter: (a, b) => Number(a.contest_score) - Number(b.contest_score),
    },
    {
      title: "详情",
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
      <Row>
        <Card
          hoverable
          style={{
            padding: "2vh 1vw",
          }}
          title={
            <Text
              css={`
                font-size: xx-large;
                font-weight: bold;
              `}
            >
              队伍管理
            </Text>
          }
          css={`
            width: 100%;
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
            type="primary"
          >
            添加新队伍
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
            icon={<DownloadOutlined />}
            onClick={exportTeamsData}
            type="primary"
          >
            导出队伍信息
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
  user_uuid: string | undefined;
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
      uuid: props?.user_uuid,
      contest_id: props.contest_id,
    },
  });
  const { refetch: refetchismember } = graphql.useIsTeamMemberSuspenseQuery({
    variables: {
      user_uuid: props?.user_uuid,
      contest_id: props.contest_id,
    },
  });

  const { error: userError, refetch: refetchUserId } =
    graphql.useGetUser_IdSuspenseQuery({
      variables: {
        email: "",
        realname: "",
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
        realname: values.member_name,
      });
      if (userData.data.users.length === 0) {
        message.warning("队长信息有误，查无此人！");
        return;
      }
      const user_id = userData.data.users[0].uuid;
      const isTeamLeader = await refetchisleader({
        uuid: user_id,
        contest_id: props.contest_id,
      });
      const isTeamMember = await refetchismember({
        user_uuid: user_id,
        contest_id: props.contest_id,
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
          team_id: props.team_id,
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
        <Text>{teamData?.contest_team[0].team_leader?.realname}</Text>
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
                <Text>{item.user?.realname}</Text>
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
                            user_uuid: item.user?.id,
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
      <Row>
        <Card
          bordered={false}
          style={{ width: "100%" }}
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
        >
          {contentList[activeTabKey as keyof typeof contentList]}
        </Card>
      </Row>
    </div>
  );
};
export default ManageTeamsPage;
