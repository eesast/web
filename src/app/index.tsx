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
  align-items: center;
  z-index: 99;
  height: 72px;
  width: 100%;
  background-color: white;
  /* background-color: #141414; */
  border-bottom: 1px rgba(128, 128, 128, 0.75) solid;
  position: fixed;
  top: 0;
`;

const StyledContent = styled(Content)`
  margin-top: 72px;
  min-height: calc(100vh - 72px);
  width: 100%;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

const App: React.FC = () => {
  const url = useUrl();
  const userInfo = getUserInfo();
  const { width } = useWindowSize();

  const Logo = (
    <Link
      to={url.link("home", "site")}
      css={`
        display: flex;
        align-items: center;
        height: 72px;
        width: 180px;
      `}
    >
      <img
        src="/logo.png"
        alt="Logo"
        css={`
          display: flex;
          height: 60px;
          width: 60px;
        `}
      />
      <h1
        css={`
          display: flex;
          height: 60px;
          width: 108px;
          margin-left: 6px;
          margin-top: 16px;
          font-size: 32px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.88);
          /* color: rgba(255, 255, 255, 0.85); */
        `}
      >
        EESΛST
      </h1>
    </Link>
  );

  const Navigation = (
    <Menu
      css={`
        border-bottom: 0;
      `}
      mode={width < 768 ? "inline" : "horizontal"}
      defaultSelectedKeys={["home"]}
      selectedKeys={[url.site]}
      items={[
        {
          key: "contest",
          label: <Link to={url.link("contest", "site")}>赛事互动 CONTEST</Link>,
        },
        {
          key: "info",
          label: <Link to={url.link("info", "site")}>信息化平台 INFO</Link>,
        },
        {
          key: "share",
          label: <Link to={url.link("share", "site")}>资源共享 SHARE</Link>,
        },
      ]}
    />
  );

  return (
    <Layout>
      <StyledHeader>
        <Col xxl={4} xl={4} lg={7} md={7} sm={19} xs={19}>
          {Logo}
        </Col>
        <Col xxl={19} xl={19} lg={16} md={16} sm={4} xs={4}>
          {width < 768 ? (
            <Popover
              placement="bottomRight"
              content={Navigation}
              trigger="click"
            >
              <Button icon={<MenuOutlined />} size="large" type="text" />
            </Popover>
          ) : (
            Navigation
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
