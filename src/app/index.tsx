import React, { Suspense } from "react";
import { Button, Col, FloatButton, Layout, Menu, Popover, Space } from "antd";
import { UserOutlined, MenuOutlined, ExportOutlined } from "@ant-design/icons";
import { Route, Link, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import { useWindowSize } from "../api/hooks/windowsize";
import HomeSite from "./HomeSite";
import ContestSite from "./ContestSite";
import InfoSite from "./InfoSite";
import ShareSite from "./ShareSite";
import UserSite from "./UserSite";
import NotFoundPage from "./Components/NotFound";
import Authenticate, { userRoles } from "./Components/Authenticate";
import { useUrl } from "../api/hooks/url";
import { getUserInfo } from "../api/helpers/auth";
import Loading from "./Components/Loading";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale("zh-cn");

const { Header, Footer, Content } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  z-index: 99;
  height: 67px;
  width: 100%;
  border-bottom: 2px #eee solid;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledContent = styled(Content)`
  margin-top: 67px;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

const App: React.FC = () => {
  const url = useUrl();
  const userInfo = getUserInfo();
  const { width } = useWindowSize();

  const menu = (
    <Menu
      id="nav"
      key="nav"
      theme="light"
      mode={width < 768 ? "inline" : "horizontal"}
      defaultSelectedKeys={["home"]}
      selectedKeys={[url.site]}
    >
      <Menu.Item key="contest">
        <Link to={url.link("contest", "site")}>赛事互动 CONTEST</Link>
      </Menu.Item>
      <Menu.Item key="info">
        <Link to={url.link("info", "site")}>信息化平台 INFO</Link>
      </Menu.Item>
      <Menu.Item key="share">
        <Link to={url.link("share", "site")}>资源共享 SHARE</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <StyledHeader>
        <Col xxl={4} xl={4} lg={7} md={7} sm={19} xs={19}>
          <Space size="large">
            <Link to={url.link("home", "site")}>
              <Space size="middle">
                <img src="/logo.png" alt="Logo" height="48" />
                <h1
                  css={`
                    margin-bottom: 0;
                    font-size: 28px;
                  `}
                >
                  EESΛST
                </h1>
              </Space>
            </Link>
          </Space>
        </Col>
        <Col xxl={19} xl={19} lg={16} md={16} sm={4} xs={4}>
          {width < 768 ? (
            <Popover placement="bottomRight" content={menu} trigger="click">
              <Button icon={<MenuOutlined />} size="large" type="text" />
            </Popover>
          ) : (
            <div id="menu">{menu}</div>
          )}
        </Col>
        <Col span={1}>
          <Link to={url.link("user", "site")}>
            {userInfo ? (
              <Button icon={<UserOutlined />} />
            ) : (
              <Button>登录</Button>
            )}
          </Link>
        </Col>
      </StyledHeader>
      <StyledContent>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="home/*" element={<HomeSite />} />
            <Route
              path="contest/*"
              element={
                <Authenticate role={userRoles}>
                  <ContestSite />
                </Authenticate>
              }
            />
            <Route
              path="info/*"
              element={
                <Authenticate role={userRoles}>
                  <InfoSite />
                </Authenticate>
              }
            />
            <Route
              path="share/*"
              element={
                <Authenticate role={userRoles}>
                  <ShareSite />
                </Authenticate>
              }
            />
            <Route path="user/*" element={<UserSite />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </StyledContent>
      <StyledFooter>
        <h2>友情链接</h2>
        <p>
          <a href="https://docs.eesast.com">DOCS</a> <ExportOutlined />{" "}
          &nbsp;&nbsp;
          <a href="https://overleaf.eesast.com">
            OVERLEAF
          </a> <ExportOutlined /> &nbsp;&nbsp;
          <a href="https://mc.eesast.com">MINECRAFT</a> <ExportOutlined />
        </p>
        <p>
          <a href="https://beian.miit.gov.cn/">京ICP备2023014732号-1</a> © 2023
          EESAST
        </p>
      </StyledFooter>
      <FloatButton.BackTop />
    </Layout>
  );
};

export default App;
