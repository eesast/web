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
import { UserOutlined } from "@ant-design/icons";
import zhCN from "antd/es/locale/zh_CN";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import logo from "./assets/logo.png";
import HomeSite from "./pages/HomeSite";
import LoginPage from "./pages/LoginPage";
import AuthRoute from "./components/AutoRoute";
import ProfilePage from "./pages/ProfilePage";

dayjs.locale("zh-cn");

const { Header, Footer, Content } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  z-index: 99;
  height: 67px;
  border-bottom: 2px #eee solid;
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
        <Content>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomeSite />
            </Route>
            <Route exact path="/(login|register)">
              <LoginPage />
            </Route>
            <AuthRoute exact path="/profile">
              <ProfilePage />
            </AuthRoute>
          </Switch>
        </Content>
        <StyledFooter>© 2020 EESAST</StyledFooter>
      </Layout>
      <BackTop />
    </ConfigProvider>
  );
}

export default App;
