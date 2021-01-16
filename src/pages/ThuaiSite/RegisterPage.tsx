import React from "react";

import { Input, Card, Row, Col, Button, Form } from "antd"; //botton
import { Layout } from "antd";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { TextArea } = Input;
const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};
const headLayout = {
  wrapperCol: { offset: 10, span: 4 },
};
const SignPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
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
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="队名"
                  name="队名"
                  rules={[
                    { required: true, message: "Please input the team name!" },
                  ]}
                >
                  <Input placeholder="输入队名" />
                </Form.Item>

                <Form.Item
                  label="队伍简介"
                  name="队伍简介"
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
