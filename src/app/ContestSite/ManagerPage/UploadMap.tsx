import React from "react";
import { Card, Layout, Typography } from "antd";
import { ContestProps } from "..";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;

const UploadMap: React.FC<ContestProps> = ({ mode, user }) => {
  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          地图管理
        </Title>
      </Card>
    </Layout>
  );
};

export default UploadMap;
