import { Breadcrumb, Layout } from "antd";
import React from "react";
import { Site } from "../App";

const { Content } = Layout;

export interface IHomeSiteProps {
  setSite: (site: Site) => void;
}

const HomeSite: React.FC<IHomeSiteProps> = ({ setSite }) => {
  setSite("home");

  return (
    <Layout style={{ padding: "48px 96px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        Content
      </Content>
    </Layout>
  );
};

export default HomeSite;
