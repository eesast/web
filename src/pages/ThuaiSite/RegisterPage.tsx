import React from "react";

import { Input, Card, Row, Col, Button, Space } from "antd"; //botton
import { Layout } from "antd";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { TextArea } = Input;
const SignPage: React.FC = () => {
  return (
    //<Center>

    <Layout>
      <br />
      <br />
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
              <Input placeholder="输入队名" />
              <br />
              <br />
              <TextArea placeholder="输入队伍简介" rows={6} />
              <br />
              <br />
              <Space size={290}>
                <Button type="primary">
                  <Link to="/home"> 创建队伍</Link>
                </Button>
                <Button type="link">加入队伍</Button>
              </Space>
            </Content>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default SignPage;
