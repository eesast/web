import React from "react";
import { Table, Space, Card, Row, Col, Layout } from "antd";
const { Content } = Layout;
const JoinPage: React.FC = () => {
  const columns = [
    {
      title: "队伍名称",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "队长",
      dataIndex: "leader",
      key: "leader",
    },
    {
      title: "队员",
      dataIndex: "member",
      key: "member",
    },
    {
      title: "加入队伍",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Invite</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      leader: "test",
      member: "testtest",
    },
  ];
  return (
    <Layout>
      <br />
      <br />
      <Row>
        <Col offset={4}>
          <Card
            hoverable
            css={`
              width: 1000px;
              padding-top: 24px;
              padding-bottom: 12px;
              &.ant-card-bordered {
                cursor: default;
              }
            `}
          >
            <Content>
              <Table columns={columns} dataSource={data} />
            </Content>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default JoinPage;
