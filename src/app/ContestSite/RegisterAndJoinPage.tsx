import React, { Fragment, useEffect, useState } from "react";
import { Input, Card, Row, Col, Button, Form, Divider, Space } from "antd"; //botton  修改:delete Result
import { Layout, message } from "antd";
import { Link } from "react-router-dom";
//graphql的语句由Apollo生成ts句柄，在此import
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import Background from "../UserSite/Components/Background";
import { QueryDocumentKeys } from "graphql/language/ast";
import NotStarted from "./Components/NotStarted";

const style: React.CSSProperties = {
  background: "transparent",
  padding: "0px 0",
};

const { Content } = Layout;
const { TextArea } = Input;

//css
const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};
const headLayout = {
  wrapperCol: { offset: 10, span: 4 },
};
const buttonLayout = {
  wrapperCol: { offset: 10, span: 4 },
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
const RegisterPage: React.FC<ContestProps> = ({ mode, user }) => {
  //register页面
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  // 查询此用户是否已有队伍，若有则不可再创建

  //查询比赛是否开始报名
  const { data: canStartRegister, refetch: refetchcanStartRegister } =
    graphql.useGetStartRegisterOrNotSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: isleaderData, refetch: refetchisleader } =
    graphql.useIsTeamLeaderSuspenseQuery({
      variables: {
        uuid: user?.uuid!,
        contest_id: Contest_id,
      },
    });
  const { data: ismemberData, refetch: refetchismember } =
    graphql.useIsTeamMemberSuspenseQuery({
      variables: {
        user_uuid: user?.uuid!,
        contest_id: Contest_id,
      },
    });
  // TODO: 待修复：创建完队伍后会渲染一次
  // useEffect(() => {
  //   if (isleaderData?.contest_team.length !== 0 ||
  //     ismemberData?.contest_team_member.length !== 0)
  //     message.warning("您已在队伍中，不可再创建队伍！");
  // })

  //这里添加unique约束，防止重复邀请码
  //const InviteCode = randomString();
  //先randomString生成一个invitecode，再查询数据库是否已有，若有则重新生成
  const [InviteCode, setInviteCode] = useState<string | null>(null);
  const [isUnique, setIsUnique] = useState<boolean>(false);
  useEffect(() => {
    if (InviteCode === null) {
      setInviteCode(randomString());
    }
  }, [InviteCode]);
  const { data: isUniqueData, refetch: refetchisUnique } =
    graphql.useGetTeamInfoByInvitedCodeQuery({
      variables: {
        invited_code: InviteCode!,
      },
    });
  useEffect(() => {
    if (isUniqueData?.contest_team.length === 0) {
      setIsUnique(true);
    } else {
      setInviteCode(randomString());
    }
  }, [isUniqueData]);

  //获取表单信息#form为表单名字
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [insertTeam, { error: insertError }] = graphql.useInsertTeamMutation();
  //Register函数组件
  const onFinish = async () => {
    const values = await form.getFieldsValue(); //form表单里的信息
    try {
      console.log("当前用户uuid：" + user?.uuid!);
      console.log("当前邀请码：" + InviteCode);
      console.log("当前比赛id：" + Contest_id);
      console.log(values);
      await insertTeam({
        variables: {
          ...values, //剩余参数
          team_leader_uuid: user?.uuid!,
          invited_code: InviteCode!,
          contest_id: Contest_id!,
        },
      });
      if (!insertError) {
        message.success("创建成功");
        form.resetFields();
      }
    } catch (e) {
      message.error("创建失败,可能队名重复或网络问题");
      //console.log("当前错误：" + e);
    }
    refetchisleader();
    refetchismember();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //Join函数组件
  // 队员插入
  const [insertteamMember] = graphql.useInsertTeamMemberMutation();
  //点击加入队伍按钮显示队伍信息
  const [isTeamInfoVisible, setIsTeamInfoVisible] = useState(false);
  const [teamLeader, setTeamLeader] = useState<string | null>();
  const [teamName, setTeamName] = useState<string | null>();
  const [teamIntro, setTeamIntro] = useState<string | null>();
  const [teamId, setTeamId] = useState<string | null>();
  const [getTeamInfo, { error: getTeamInfoError }] =
    graphql.useGetTeamInfoByInvitedCodeLazyQuery({
      onCompleted: (data) => {
        if (data.contest_team.length > 0) {
          const teamInfo = data.contest_team[0];
          setTeamLeader(teamInfo.team_leader?.realname);
          setTeamName(teamInfo.team_name);
          setTeamIntro(teamInfo.team_intro);
          setTeamId(teamInfo.team_id);
          setIsTeamInfoVisible(true);
        } else {
          message.error("队伍不存在");
        }
      },
    });
  const onClickShowTeamInfo = async () => {
    const values = await form2.getFieldValue("invited_code");
    getTeamInfo({
      variables: {
        invited_code: values,
      },
    });
  };
  //点击取消加入队伍
  const handleCancelShowTeamInfo = () => {
    setIsTeamInfoVisible(false);
  };
  //点击确认加入队伍
  const onFinishJoin = async () => {
    const values = await form2.getFieldValue("invited_code");
    try {
      await insertteamMember({
        variables: {
          user_uuid: user?.uuid!,
          team_id: teamId!,
        },
      });
      message.success("加入成功");
      form.resetFields();
    } catch (e) {
      message.error("加入失败,可能队伍不存在或网络问题");
      console.log("当前错误：" + e);
    }
    refetchisleader();
    refetchismember();
  };
  return !canStartRegister.contest[0].team_switch ? (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Card
          hoverable
          style={{ height: "60vh", width: "80%" }}
          // css={`
          //   width: 500px;
          //   padding-top: 24px;
          //   padding-bottom: 12px;
          //   &.ant-card-bordered {
          //     cursor: default;
          //   }
          // `}
        >
          <Row justify="space-evenly">
            <Col className="gutter-row" xs={4} sm={4} md={6} lg={8} xl={10}>
              <Content>
                <Form
                  name="form"
                  form={form} //表单名字绑定
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="队伍名称"
                    name="team_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the team name!",
                      },
                    ]}
                  >
                    <Input placeholder="输入队名" />
                  </Form.Item>

                  <Form.Item
                    label="队伍简介"
                    name="team_intro"
                    rules={[
                      { required: true, message: "Please input team detail!" },
                    ]}
                  >
                    <TextArea placeholder="输入队伍简介" rows={6} />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        isleaderData?.contest_team.length !== 0 ||
                        ismemberData?.contest_team_member.length !== 0
                      }
                    >
                      创建队伍
                    </Button>
                  </Form.Item>
                </Form>
              </Content>
            </Col>
            <Col className="gutter-row" xs={0} sm={1} md={1} lg={1} xl={1}>
              <div
                style={{
                  borderLeft: "1px solid #1677ff",
                  height: "100%",
                  alignSelf: "center",
                }}
              ></div>
            </Col>
            <Col className="gutter-row" xs={4} sm={4} md={6} lg={8} xl={10}>
              <Content>
                <Form
                  name="form2"
                  form={form2} //表单名字绑定
                  layout="vertical"
                  initialValues={{ remember: true }}
                >
                  {!isTeamInfoVisible && (
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ display: "flex" }}
                    >
                      <Form.Item
                        label="邀请码"
                        name="invited_code"
                        rules={[
                          {
                            required: true,
                            message: "Please input the invited code!",
                          },
                        ]}
                      >
                        <Input placeholder="输入邀请码" />
                      </Form.Item>
                      <Form.Item style={{ textAlign: "center" }}>
                        <Button onClick={onClickShowTeamInfo}>
                          <> 加入队伍</>
                        </Button>
                      </Form.Item>
                    </Space>
                  )}

                  {isTeamInfoVisible && (
                    <Form.Item style={{ textAlign: "center" }}>
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ display: "flex" }}
                      >
                        <Card style={{ border: "1px solid #1677ff" }}>
                          <Space direction="vertical">
                            <Divider style={{ border: "0.5px #1677ff" }}>
                              队伍信息
                            </Divider>
                            <ul style={{ textAlign: "left" }}>
                              <Space direction="vertical">
                                <li>队长：{teamLeader}</li>
                                <li>队名：{teamName}</li>
                                <li>队伍简介：{teamIntro}</li>
                              </Space>
                            </ul>
                          </Space>
                        </Card>
                        <Space>
                          <Button onClick={handleCancelShowTeamInfo}>
                            取消
                          </Button>
                          <Button
                            onClick={onFinishJoin}
                            disabled={
                              isleaderData?.contest_team.length !== 0 ||
                              ismemberData?.contest_team_member.length !== 0
                            }
                            style={{
                              backgroundColor: "#1677ff",
                              color: "white",
                            }}
                          >
                            确认加入
                          </Button>
                        </Space>
                      </Space>
                    </Form.Item>
                  )}
                </Form>
              </Content>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  ) : (
    <NotStarted />
  );
};
export default RegisterPage;
