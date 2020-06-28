// export { default as ArticlePage } from "./ArticlePage";
// export { default as ArticleFeedPage } from "./ArticleFeedPage";
// export { default as ArticleManagePage } from "./ArticleManagePage";
// export { default as ArticleEditPage } from "./ArticleEditPage";

import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  CompassOutlined,
  FileDoneOutlined,
  BulbOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import style from "./index.module.css";
import {
  useRouteMatch,
  useLocation,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import ArticleFeedPage from "./ArticleFeedPage";
import { AuthRoute } from "../../components";
import ArticleManagePage from "./ArticleManagePage";
import ArticlePage from "./ArticlePage";

const { Header, Content, Sider } = Layout;

const WeeklySite: React.FC = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const [siderCollapsed, setSiderCollapsed] = useState(true);

  const breadcrumb = location.pathname.split("/")[3] ?? <BulbOutlined />;

  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={siderCollapsed}
        onCollapse={() => setSiderCollapsed(!siderCollapsed)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <Menu mode="inline" theme="light">
          <Menu.Item key="explore" icon={<CompassOutlined />}>
            <Link to={`/weekly/explore`}>浏览</Link>
          </Menu.Item>
          <Menu.Item key="Manage" icon={<FileDoneOutlined />}>
            管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header className={style.page_header}>
          <Breadcrumb css={"margin-top: 1em;"}>
            <Breadcrumb.Item>Weekly</Breadcrumb.Item>
            <Breadcrumb.Item>Explore</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
          </Breadcrumb>
        </Header> */}
        <Content>
          <Switch>
            <Route exact path="/weekly">
              <Redirect to="/weekly/explore" />
            </Route>
            <Route exact path={`${path}/explore`}>
              <ArticleFeedPage />
            </Route>
            <Route strict path={`${path}/explore/:alias`}>
              <ArticlePage />
            </Route>
            <AuthRoute exact path={`${path}/manage`}>
              <ArticleManagePage />
            </AuthRoute>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WeeklySite;
