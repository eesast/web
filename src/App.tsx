import { useEffect, useState } from "react";
import {
  ConfigProvider,
  Layout,
  Menu,
  Button,
  BackTop,
  Row,
  Col,
  Space,
  Popover,
  Dropdown,
} from "antd";
import { UserOutlined, ExportOutlined, MenuOutlined } from "@ant-design/icons";
import zhCN from "antd/es/locale/zh_CN";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import { enquireScreenSize } from "./helpers/enquire";
import HomeSite from "./pages/HomeSite";
import LoginPage from "./pages/LoginPage";
import AuthRoute from "./components/AuthRoute";
import ProfilePage from "./pages/ProfilePage";
import InfoSite from "./pages/InfoSite";
import NotFoundPage from "./pages/NotFoundPage";
import Picture from "./components/Picture";
import ThuaiSite from "./pages/ThuaiSite";

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

const UserMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/profile">个人信息</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
    >
      退出
    </Menu.Item>
  </Menu>
);

function App() {
  const location = useLocation();
  const site = location.pathname.split("/")[1];

  const [menuMode, setMenuMode] = useState<"inline" | "horizontal">(
    "horizontal"
  );

  useEffect(() => {
    enquireScreenSize((bool) => {
      setMenuMode(bool ? "inline" : "horizontal");
    });
  });

  const menu = (
    <Menu
      id="nav"
      key="nav"
      theme="light"
      mode={menuMode}
      defaultSelectedKeys={["home"]}
      selectedKeys={[site]}
    >
      <Menu.Item key="home">
        <Link to="/home">首页</Link>
      </Menu.Item>
      <Menu.Item key="contest">
        <Link to="/contest">电子设计大赛</Link>
      </Menu.Item>
      <Menu.Item key="weekly">
        <Link to="/weekly">WEEKLY</Link>
      </Menu.Item>
      <Menu.Item key="info">
        <Link to="/info">INFO</Link>
      </Menu.Item>
      <Menu.Item key="docs">
        <a href="https://docs.eesast.com">DOCS</a> <ExportOutlined />
      </Menu.Item>
      <Menu.Item key="overleaf">
        <a href="https://overleaf.eesast.com">OVERLEAF</a> <ExportOutlined />
      </Menu.Item>
      <Menu.Item key="minecraft">
        <a href="https://mc.eesast.com">MINECRAFT</a> <ExportOutlined />
      </Menu.Item>
    </Menu>
  );

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <StyledHeader>
          <FullRow justify="space-between">
            <Col xxl={4} xl={4} lg={7} md={7} sm={19} xs={19}>
              <Space size="large">
                <Logo>
                  <Space size="middle">
                    <Link to="/home">
                      <Picture
                        src={`${process.env.REACT_APP_STATIC_URL}/public/images/logo.png`}
                        alt="Logo"
                        height="48"
                      />
                    </Link>
                    <Link to="/home" style={{ color: "black" }}>
                      <Title> EESΛST</Title>
                    </Link>
                  </Space>
                </Logo>
              </Space>
            </Col>
            <Col xxl={19} xl={19} lg={16} md={16} sm={4} xs={4}>
              {menuMode === "inline" ? (
                <Popover placement="bottomRight" content={menu} trigger="click">
                  <Button icon={<MenuOutlined />} size="large" type="text" />
                </Popover>
              ) : (
                <div id="menu">{menu}</div>
              )}
            </Col>
            <Col span={1}>
              <Dropdown overlay={UserMenu} placement="bottomRight">
                <Button icon={<UserOutlined />} />
              </Dropdown>
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
            <Route path="/contest">
              <ThuaiSite />
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
        <StyledFooter><a href="https://beian.miit.gov.cn/">京ICP备19058476号-1 </a>  © 2020 EESAST</StyledFooter>
      </Layout>
      <BackTop />
    </ConfigProvider>
  );
}

export default App;
