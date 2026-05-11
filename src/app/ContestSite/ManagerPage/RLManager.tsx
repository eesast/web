import React from "react";
import { Col, Layout, Row, Space } from "antd";
import { ContestProps } from "..";
import Setting from "./Components/Setting";
import EditInfo from "./Components/EditInfo";
import EditTimeline from "./Components/EditTimeline";
import ManageTeams from "./Components/ManageTeams";
import RLScoreManager from "./Components/RLScoreManager";

const RLManager: React.FC<ContestProps> = ({ mode, user }) => {
  return (
    <Layout>
      <Space
        direction="vertical"
        size="large"
        style={{
          display: "flex",
          border: "0px solid #ccc",
          padding: "4vh 4vw",
          color: mode === "dark" ? "white" : "initial",
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true} align="stretch">
          <Col span={16}>
            <EditInfo mode={mode} user={user} />
          </Col>
          <Col span={8}>
            <Setting mode={mode} user={user} />
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={24}>
            <EditTimeline mode={mode} user={user} />
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={24}>
            <RLScoreManager />
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={24}>
            <ManageTeams mode={mode} user={user} />
          </Col>
        </Row>
      </Space>
    </Layout>
  );
};

export default RLManager;
