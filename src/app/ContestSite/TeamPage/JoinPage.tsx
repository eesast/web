import React, { useEffect, useState } from "react";
import { Input, Card, Row, Col, Button, Form, Divider, Space } from "antd";
import { Layout, message } from "antd";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import { TeamProps } from ".";
import NotStarted from ".././Components/NotStarted";
import Loading from "@/app/Components/Loading";

const { Content } = Layout;
const { TextArea } = Input;

//生成邀请码，8位
function randomString() {
  var e = 8;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

const JoinPage: React.FC<TeamProps> = ({ mode, user, refresh }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  //查询比赛是否开始报名
  const { data: contestSwitchData } = graphql.useGetContestSwitchSubscription({
    variables: {
      contest_id: Contest_id,
    },
  });

  const { data: contestPlayersData } =
    graphql.useGetContestPlayersSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: teamData } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: user?.uuid!,
      contest_id: Contest_id,
    },
  });

  const isMember = teamData?.contest_team_member?.length !== 0;

  //这里添加unique约束，防止重复邀请码
  //先randomString生成一个invitecode，再查询数据库是否已有，若有则重新生成
  const [InviteCode, setInviteCode] = useState(randomString());
  const { data: isUniqueData, refetch: refetchisUnique } =
    graphql.useGetTeamInfoByInvitedCodeQuery({
      variables: {
        invited_code: InviteCode,
        contest_id: Contest_id,
      },
    });
  useEffect(() => {
    if (isUniqueData?.contest_team.length !== 0) {
      setInviteCode(randomString());
      refetchisUnique();
    }
  }, [isUniqueData, refetchisUnique]);

  //获取表单信息#form为表单名字
  const [registerForm] = Form.useForm();
  const [joinForm] = Form.useForm();

  const [addTeam, { error: addTeamError }] = graphql.useAddTeamMutation();
  const [addTeamPlayer, { error: addTeamPlayerError }] =
    graphql.useAddTeamPlayerMutation();
  //Register函数组件
  const onRegister = async () => {
    const values = await registerForm.getFieldsValue(); //form表单里的信息
    try {
      const team = await addTeam({
        variables: {
          ...values, //剩余参数
          team_leader_uuid: user?.uuid!,
          invited_code: InviteCode!,
          contest_id: Contest_id!,
        },
      });
      if (addTeamError) {
        message.error("创建失败，队伍名称不合法");
        throw addTeamError;
      }
      contestPlayersData?.contest_player.forEach(async (player) => {
        await addTeamPlayer({
          variables: {
            team_id: team?.data?.insert_contest_team_one?.team_id!,
            player: player.player_label,
          },
        });
      });
      if (addTeamPlayerError) {
        message.error("队伍初始化失败，请联系管理员");
        throw addTeamPlayerError;
      }
      message.success("创建成功");
      return refresh();
    } catch (e) {
      console.error(e);
    }
  };

  //Join函数组件
  // 队员插入
  const [addteamMember, { error: addTeamMemberError }] =
    graphql.useAddTeamMemberMutation();
  //点击加入队伍按钮显示队伍信息
  const [isTeamInfoVisible, setIsTeamInfoVisible] = useState(false);
  const [teamInfo, setTeamInfo] = useState<{
    teamLeader: string | null;
    teamName: string | null;
    teamIntro: string | null;
    teamId: string | null;
  }>({
    teamLeader: null,
    teamName: null,
    teamIntro: null,
    teamId: null,
  });
  const [getTeamInfo] = graphql.useGetTeamInfoByInvitedCodeLazyQuery({
    onCompleted: (data) => {
      if (data.contest_team.length > 0) {
        const teamInfo = data.contest_team[0];
        setIsTeamInfoVisible(true);
        setTeamInfo({
          teamLeader: teamInfo.team_leader.realname!,
          teamName: teamInfo.team_name,
          teamIntro: teamInfo.team_intro!,
          teamId: teamInfo.team_id,
        });
      } else {
        message.error("队伍不存在");
      }
    },
  });
  const onClickShowTeamInfo = async () => {
    const values = await joinForm.getFieldValue("invited_code");
    getTeamInfo({
      variables: {
        invited_code: values,
        contest_id: Contest_id,
      },
    });
  };
  //点击确认加入队伍
  const onFinishJoin = async () => {
    try {
      await addteamMember({
        variables: {
          user_uuid: user?.uuid!,
          team_id: teamInfo.teamId!,
        },
      });
      if (addTeamMemberError) {
        message.error("加入失败");
        throw addTeamMemberError;
      }
      message.success("加入成功");
      return refresh();
    } catch (e) {
      console.error(e);
      joinForm.resetFields();
    }
  };
  return contestSwitchData ? (
    contestSwitchData?.contest_by_pk?.team_switch ? (
      <>
        <Layout>
          <br />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card hoverable style={{ height: "500px", width: "80%" }}>
              <Row
                justify="space-evenly"
                style={{ height: "100%", width: "100%" }}
              >
                <Col
                  className="gutter-row"
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                  style={{ height: "100%", width: "100%" }}
                >
                  <Content>
                    <Form
                      name="registerForm"
                      form={registerForm} //表单名字绑定
                      layout="vertical"
                      initialValues={{ remember: true }}
                      onFinish={onRegister}
                    >
                      <Form.Item name="title">
                        <h1 style={{ textAlign: "center" }}>创建队伍</h1>
                      </Form.Item>
                      <Form.Item
                        label="队伍名称"
                        name="team_name"
                        rules={[{ required: true, message: "队伍名不能为空" }]}
                      >
                        <Input placeholder="输入队名" />
                      </Form.Item>

                      <Form.Item
                        label="队伍简介"
                        name="team_intro"
                        rules={[
                          { required: true, message: "队伍简介不能为空" },
                        ]}
                      >
                        <TextArea placeholder="输入队伍简介" rows={6} />
                      </Form.Item>
                      <Form.Item style={{ textAlign: "center" }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={isMember}
                        >
                          创建队伍
                        </Button>
                      </Form.Item>
                    </Form>
                  </Content>
                </Col>
                <Col className="gutter-row" xs={1} sm={1} md={1} lg={1} xl={1}>
                  <div
                    style={{
                      borderLeft: "1px solid #1677ff",
                      height: "100%",
                      alignSelf: "center",
                    }}
                  ></div>
                </Col>
                <Col
                  className="gutter-row"
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                >
                  <Content style={{ height: "100%", width: "100%" }}>
                    <Form
                      name="joinForm"
                      form={joinForm} //表单名字绑定
                      layout="vertical"
                      initialValues={{ remember: true }}
                      style={{ height: "100%", width: "100%" }}
                    >
                      {!isTeamInfoVisible && (
                        <Space
                          direction="vertical"
                          size="middle"
                          style={{ display: "flex" }}
                        >
                          <Form.Item name="title">
                            <h1 style={{ textAlign: "center" }}>加入队伍</h1>
                          </Form.Item>
                          <Form.Item
                            label="邀请码"
                            name="invited_code"
                            rules={[{ required: true, message: "邀请码为空" }]}
                          >
                            <Input placeholder="输入邀请码" />
                          </Form.Item>
                          <Form.Item style={{ textAlign: "center" }}>
                            <Button
                              onClick={onClickShowTeamInfo}
                              disabled={isMember}
                            >
                              <> 加入队伍</>
                            </Button>
                          </Form.Item>
                        </Space>
                      )}

                      {isTeamInfoVisible && (
                        <Space
                          direction="vertical"
                          size="middle"
                          style={{ display: "flex" }}
                        >
                          <Form.Item name="title">
                            <h1 style={{ textAlign: "center" }}>加入队伍</h1>
                          </Form.Item>
                          <Form.Item
                            style={{
                              textAlign: "center",
                              height: "100%",
                              width: "100%",
                              flexDirection: "column",
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "stretch",
                            }}
                          >
                            <div style={{ width: "90%" }}>
                              <Space
                                direction="vertical"
                                size="middle"
                                style={{ width: "100%", height: "100%" }}
                              >
                                <Card
                                  style={{
                                    border: "1px solid #1677ff",
                                    width: "100%",
                                  }}
                                >
                                  <Space
                                    direction="vertical"
                                    style={{ width: "100%" }}
                                  >
                                    <Divider
                                      style={{
                                        border: "0.5px #1677ff",
                                        width: "100%",
                                        margin: "0",
                                      }}
                                    >
                                      队伍信息
                                    </Divider>
                                    <ul
                                      style={{
                                        textAlign: "left",
                                        wordBreak: "break-all",
                                      }}
                                    >
                                      <Space direction="vertical">
                                        <li>队名：{teamInfo.teamName}</li>
                                        <li>队长：{teamInfo.teamLeader}</li>
                                        <li>队伍简介：{teamInfo.teamIntro}</li>
                                      </Space>
                                    </ul>
                                  </Space>
                                </Card>
                                <Row
                                  gutter={16}
                                  style={{ justifyContent: "center" }}
                                >
                                  <Col
                                    xs={18}
                                    sm={18}
                                    md={12}
                                    lg={10}
                                    xl={10}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <Button
                                      onClick={() =>
                                        setIsTeamInfoVisible(false)
                                      }
                                      block
                                    >
                                      取消
                                    </Button>
                                  </Col>
                                  <Col xs={18} sm={18} md={12} lg={10} xl={10}>
                                    <Button
                                      onClick={onFinishJoin}
                                      disabled={isMember}
                                      style={{
                                        backgroundColor: "#1677ff",
                                        color: "white",
                                      }}
                                      block
                                    >
                                      确认加入
                                    </Button>
                                  </Col>
                                </Row>
                              </Space>
                            </div>
                          </Form.Item>
                        </Space>
                      )}
                    </Form>
                  </Content>
                </Col>
              </Row>
            </Card>
          </div>
        </Layout>
      </>
    ) : (
      <NotStarted />
    )
  ) : (
    <Loading />
  );
};
export default JoinPage;
