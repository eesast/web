import React from "react";

import { Input, Card, Row, Col } from "antd"; //botton
import { Layout } from "antd";
const { Content } = Layout;
const { TextArea } = Input;
const SignPage: React.FC = () => {
  return (
    //<Center>

    <Layout>
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
              <Input placeholder="Basic usage" />
              <TextArea rows={4} />
            </Content>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default SignPage;
