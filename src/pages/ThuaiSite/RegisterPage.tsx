import React from "react"; //, { useEffect } from "react";
import { Input, Card, Row, Col, Button, Form } from "antd"; //botton
import { Layout, message } from "antd";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../helpers/auth";
import { InsertThuai, InsertThuaiVariables } from "../../api/types";
import { InsertThuai as INSERT_THUAI } from "../../api/thuai.graphql";
import { useMutation } from "@apollo/client";
const { Content } = Layout;
const { TextArea } = Input;

const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};
const headLayout = {
  wrapperCol: { offset: 10, span: 4 },
};
function randomString() {
  var e = 8;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}
//alert(randomString(6));
const SignPage: React.FC = () => {
  const userInfo = getUserInfo();
  const InviteCode = randomString();
  const [form] = Form.useForm(); //获取表单信息？#ques
  const [insertThuai, { error: insertError }] = useMutation<
    InsertThuai,
    InsertThuaiVariables
  >(INSERT_THUAI);
  // useEffect(() => {
  //   if (insertError) {

  //   }
  //   // else
  //   // {
  //   //   message.success("创建成功");
  //   // }
  // }, [insertError]);

  const onFinish = async () => {
    const values = await form.getFieldsValue(); //表单里的信息？#ques
    console.log(values);
    try {
      await insertThuai({
        variables: {
          ...values,
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
                form={form}
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
                  <Link to="/home"> 加入队伍</Link>
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
export default SignPage;
