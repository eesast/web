import React from "react";
import {
  ConfigProvider,
  Layout,
  Menu,
  Button,
  BackTop,
  Row,
  Col,
  Space,
} from "antd";
import { UserOutlined, ExportOutlined } from "@ant-design/icons";
import zhCN from "antd/es/locale/zh_CN";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import logo from "./assets/logo.png";
import HomeSite from "./pages/HomeSite";
import LoginPage from "./pages/LoginPage";
import AuthRoute from "./components/AuthRoute";
import ProfilePage from "./pages/ProfilePage";
import InfoSite from "./pages/InfoSite";
import NotFoundPage from "./pages/NotFoundPage";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale("zh-cn");

const { Header, Footer, Content } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  z-index: 99;
  height: 67px;
  border-bottom: 2px #eee solid;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

const FullRow = styled(Row)`
  width: 100%;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

function App() {
  const location = useLocation();
  const site = location.pathname.split("/")[1];

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <StyledHeader>
          <FullRow justify="space-between">
            <Col>
              <Space size="large">
                <Logo>
                  <Space size="middle">
                    <img src={logo} alt="Logo" height="48" />
                    <Title>EESΛST</Title>
                  </Space>
                </Logo>
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={["home"]}
                  selectedKeys={[site]}
                >
                  <Menu.Item key="home">
                    <Link to="/home">首页</Link>
                  </Menu.Item>
                  <Menu.Item key="weekly">
                    <Link to="/weekly">WEEKLY</Link>
                  </Menu.Item>
                  <Menu.Item key="info">
                    <Link to="/info">INFO</Link>
                  </Menu.Item>
                  <Menu.Item key="overleaf">
                    <a href="https://overleaf.eesast.com">OVERLEAF</a>{" "}
                    <ExportOutlined />
                  </Menu.Item>
                  <Menu.Item key="minecraft">
                    <a href="https://mc.eesast.com">MINECRAFT</a>{" "}
                    <ExportOutlined />
                  </Menu.Item>
                </Menu>
              </Space>
            </Col>
            <Col span={1}>
              <Link to="/profile">
                <Button icon={<UserOutlined />} />
              </Link>
            </Col>
          </FullRow>
        </StyledHeader>
        <Content
          css={`
            margin-top: 67px;
          `}
        >
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomeSite />
            </Route>
            <AuthRoute path="/info">
              <InfoSite />
            </AuthRoute>
            <Route exact path="/(login|register|reset|verify)">
              <LoginPage />
            </Route>
            <AuthRoute exact path="/profile">
              <ProfilePage />
            </AuthRoute>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Content>
        <StyledFooter>© 2020 EESAST</StyledFooter>
      </Layout>
      <BackTop />
    </ConfigProvider>
  );
}

export default App;
