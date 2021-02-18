import React from "react";
import { Input, Card, Row, Col, Button, Form } from "antd"; //botton
import { Layout } from "antd";
//import { getUserInfo } from "../../helpers/auth";

// import { Link } from "react-router-dom";
// import { useQuery } from "@apollo/client";
const { TextArea } = Input;
const { Content } = Layout;

const ManagePage: React.FC = () => {
  //const userInfo = getUserInfo();

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
                initialValues={{ remember: true }}
              >
                <Form.Item label="队伍名称">
                  <Input
                    style={{ width: "30%" }}
                    disabled={true} //{!isLeader}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="on"
                  />
                </Form.Item>
                <Form.Item label="邀请码">
                  <span>{}</span>
                </Form.Item>
                <Form.Item label="队长">
                  <span>{}</span>
                </Form.Item>
                <Form.Item label="队员">{}</Form.Item>
                <Form.Item label="队伍简介">
                  <TextArea
                    rows={6}
                    disabled={true} //{!isLeader} //onClick={handleSubmit} disabled={!isLeader} onClick={isLeader ? handleDelete : handleQuit}
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button type="primary">确认修改</Button>
                  <Button type="default">
                    {/* {isLeader ? "解散队伍" : "退出队伍"}  */}
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
