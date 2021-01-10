import React from "react";
//import Center from "src/component/Center";
import { Form, Input, InputNumber, Button, Card, Row, Col } from "antd";
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: " require",
  types: {
    email: "not the email",
    number: " not the number",
  },
  number: {
    range: "0~10",
  },
};

const SignPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    //<Center>

    <Layout>
      <Header>Header</Header>
      <Row>
        <Col offset={8}>
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
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={["user", "name"]}
                  label="Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["user", "email"]}
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["user", "age"]}
                  label="Age"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 99,
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item name={["user", "website"]} label="Website">
                  <Input />
                </Form.Item>
                <Form.Item name={["user", "introduction"]} label="Introduction">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Content>
          </Card>
        </Col>
      </Row>
      <Footer>Footer</Footer>
    </Layout>

    //</Center>
  );
};
export default SignPage;
