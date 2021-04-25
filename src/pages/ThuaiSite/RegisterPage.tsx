import React from "react";
import { Input, Card, Row, Col, Button, Form, Result } from "antd"; //botton
import { Layout, message } from "antd";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../helpers/auth";
//graphql的语句由Apollo生成ts句柄，在此import
import { InsertThuai, InsertThuaiVariables } from "../../api/types";
import { InsertThuai as INSERT_THUAI } from "../../api/thuai.graphql";
import { useMutation, useQuery } from "@apollo/client";
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/thuai.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/thuai.graphql";

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
  //获取user的信息，返回_id/email/role，_id为hasura和mongo通用
  const userInfo = getUserInfo();
  //查询语句
  const { refetch: refetchisleader } = useQuery<
    IsTeamLeader,
    IsTeamLeaderVariables
  >(ISTEAMLEADER, {
    variables: {
      _id: userInfo?._id!,
    },
  });
  const { refetch: refetchismember } = useQuery<
    IsTeamMember,
    IsTeamMemberVariables
  >(ISTEAMMEMBER, {
    variables: {
      _id: userInfo?._id!,
    },
  });
  const InviteCode = randomString();

  //获取表单信息#form为表单名字
  const [form] = Form.useForm();

  const [insertThuai, { error: insertError }] = useMutation<
    InsertThuai,
    InsertThuaiVariables
  >(INSERT_THUAI);
  //函数组件
  const onFinish = async () => {
    const values = await form.getFieldsValue(); //form表单里的信息
    console.log(values);
    try {
      await insertThuai({
        variables: {
          ...values, //剩余参数
          team_leader: userInfo?._id!,
          invited_code: InviteCode!,
        },
      });
    } catch (e) {
      message.error("创建失败,可能队名重复或网络问题");
    } finally {
      if (!insertError) {
        message.success("创建成功");
        form.resetFields();
      }
    }
    refetchisleader();
    refetchismember();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  if (
    true
    //isleaderData?.user[0].team_as_leader.length !== 0 ||
    //ismemberData?.user[0].team_as_member.length !== 0
  ) {
    return (
      <div>
        <Result status="warning" title="报名已结束，不能再创建队伍" />
      </div>
    );
  }
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
                  label="队名"
                  name="team_name"
                  rules={[
                    { required: true, message: "Please input the team name!" },
                  ]}
                >
                  <Input placeholder="输入队名" />
                </Form.Item>

                <Form.Item
                  label="队伍简介"
                  name="team_sum"
                  rules={[
                    { required: true, message: "Please input team detail!" },
                  ]}
                >
                  <TextArea placeholder="输入队伍简介" rows={6} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Link to="/thuai/join"> 加入队伍</Link>
                </Form.Item>
                <Form.Item {...headLayout}>
                  <Button type="primary" htmlType="submit">
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
