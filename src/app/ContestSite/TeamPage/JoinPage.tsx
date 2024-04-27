import React, { useEffect, useState } from "react";
import { Input, Card, Row, Col, Button, Form, Space, Modal } from "antd";
import { Layout, message } from "antd";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import { TeamProps } from ".";
import NotStarted from ".././Components/NotStarted";
import Loading from "@/app/Components/Loading";

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
  const { data: contestSwitchData } = graphql.useGetContestSwitchQuery({
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
      user_uuid: user.uuid!,
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
          team_leader_uuid: user.uuid!,
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
          user_uuid: user.uuid!,
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
      <Layout
        css={`
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 72px);
        `}
      >
        <Card
          hoverable
          style={{ height: "480px", width: "90%", maxWidth: "1000px" }}
        >
          <Row style={{ height: "432px" }}>
            <Col span={11}>
              <h1 style={{ textAlign: "center" }}>创建队伍</h1>
              <Form
                name="registerForm"
                form={registerForm} //表单名字绑定
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onRegister}
              >
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
                  rules={[{ required: true, message: "队伍简介不能为空" }]}
                >
                  <TextArea placeholder="输入队伍简介" rows={6} />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit" disabled={isMember}>
                    创建队伍
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col
              span={2}
              css={`
                display: flex;
                flex-direction: column;
                align-items: center;
              `}
            >
              <div
                style={{
                  borderLeft: "1px solid #1677ff",
                  height: "100%",
                }}
              />
            </Col>
            <Col span={11}>
              <h1 style={{ textAlign: "center" }}>加入队伍</h1>
              <Form
                name="joinForm"
                form={joinForm} //表单名字绑定
                layout="vertical"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label="邀请码"
                  name="invited_code"
                  rules={[{ required: true, message: "邀请码为空" }]}
                  style={{ margin: "80px 0 160px" }}
                >
                  <Input placeholder="输入邀请码" />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button onClick={onClickShowTeamInfo} disabled={isMember}>
                    加入队伍
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
        <Modal
          title="请确认队伍信息"
          open={isTeamInfoVisible}
          onOk={onFinishJoin}
          onCancel={() => setIsTeamInfoVisible(false)}
          okText="确认加入"
          cancelText="取消"
        >
          <Space direction="vertical">
            <br />
            <li>队名：{teamInfo.teamName}</li>
            <li>队长：{teamInfo.teamLeader}</li>
            <li>队伍简介：{teamInfo.teamIntro}</li>
          </Space>
        </Modal>
      </Layout>
    ) : (
      <NotStarted />
    )
  ) : (
    <Loading />
  );
};
export default JoinPage;
