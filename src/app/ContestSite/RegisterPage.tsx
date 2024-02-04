import React from "react";
import { Input, Card, Row, Col, Button, Form } from "antd"; //botton  修改:delete Result
import { Layout, message } from "antd";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../api/helpers/auth";
//graphql的语句由Apollo生成ts句柄，在此import
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";

const { Content } = Layout;
const { TextArea } = Input;

//css
const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};
const headLayout = {
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
const RegisterPage: React.FC = () => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  //获取user的信息，返回_id/email/role，_id为hasura和mongo通用
  const userInfo = getUserInfo();
  // 查询此用户是否已有队伍，若有则不可再创建

  const { data: isleaderData, refetch: refetchisleader } =
    graphql.useIsTeamLeaderSuspenseQuery({
      variables: {
        _id: userInfo?._id!,
        contest_id: Contest_id,
      },
    });
  const { data: ismemberData, refetch: refetchismember } =
    graphql.useIsTeamMemberSuspenseQuery({
      variables: {
        _id: userInfo?._id!,
        contest_id: Contest_id,
      },
    });
  // TODO: 待修复：创建完队伍后会渲染一次
  // useEffect(() => {
  //   if (isleaderData?.contest_team.length !== 0 ||
  //     ismemberData?.contest_team_member.length !== 0)
  //     message.warning("您已在队伍中，不可再创建队伍！");
  // })
  const InviteCode = randomString();

  //获取表单信息#form为表单名字
  const [form] = Form.useForm();

  const [insertTeam, { error: insertError }] = graphql.useInsertTeamMutation();
  //函数组件
  const onFinish = async () => {
    const values = await form.getFieldsValue(); //form表单里的信息
    try {
      await insertTeam({
        variables: {
          ...values, //剩余参数
          team_leader: userInfo?._id!,
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
      console.log("当前错误：" + e);
    }
    refetchisleader();
    refetchismember();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
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
                    { required: true, message: "Please input the team name!" },
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
                <Form.Item {...tailLayout}>
                  <Link to={url.link("team-join")}> 加入队伍</Link>
                </Form.Item>
                <Form.Item {...headLayout}>
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
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default RegisterPage;
