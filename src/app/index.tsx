import React, { Suspense, useState } from "react";
import {
  Button,
  ConfigProvider,
  FloatButton,
  Layout,
  Menu,
  Popover,
  Switch,
  theme,
} from "antd";
import zhCN from "antd/es/locale/zh_CN";
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

export interface PageProps {
  mode: String;
}

const App: React.FC = () => {
  const url = useUrl();
  const userInfo = getUserInfo();
  const { width } = useWindowSize();
  const [mode, setMode] = useState<"light" | "dark">("light");

  const { Header, Footer, Content } = Layout;

  const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    height: 72px;
    width: 100%;
    background-color: ${mode === "light" ? `white` : `#141414`};
    border-bottom: 1px solid
      ${mode === "light" ? `rgba(5, 5, 5, 0.06)` : `rgba(253, 253, 253, 0.12)`};
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

  const Logo = () => {
    return (
      <Link
        to={url.link("home", "site")}
        css={`
          display: flex;
          align-items: center;
          height: 72px;
          width: 180px;
          position: absolute;
          left: 24px;
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
            color: ${mode === "light"
              ? `rgba(0, 0, 0, 0.88)`
              : `rgba(255, 255, 255, 0.85)`};
          `}
        >
          EESΛST
        </h1>
      </Link>
    );
  };

  const Navigation = () => {
    const items = [
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
    ];
    if (width > 888) {
      return (
        <Menu
          css={`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 72px;
            width: 480px;
          `}
          mode="horizontal"
          selectedKeys={[url.site]}
          items={items}
        />
      );
    } else {
      return (
        <Popover
          placement="bottom"
          content={
            <Menu
              mode="inline"
              items={items}
              css={`
              border-inline-end = 0;
            `}
            />
          }
          trigger="click"
        >
          <Button icon={<MenuOutlined />} size="large" type="text" />
        </Popover>
      );
    }
  };

  const ThemeSwitch = () => {
    return (
      <Switch
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 120px;
        `}
        checked={mode === "light"}
        onChange={() => {
          setMode(mode === "dark" ? "light" : "dark");
        }}
        checkedChildren="日"
        unCheckedChildren="夜"
      />
    );
  };

  const User = () => {
    return (
      <Link
        to={url.link("user", "site")}
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 64px;
          position: absolute;
          right: 32px;
        `}
      >
        {userInfo ? <Button icon={<UserOutlined />} /> : <Button>登录</Button>}
      </Link>
    );
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm:
          mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Layout>
        <StyledHeader>
          <Logo />
          <Navigation />
          <ThemeSwitch />
          <User />
        </StyledHeader>
        <StyledContent>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="home/*" element={<HomeSite mode={mode} />} />
              <Route
                path="contest/*"
                element={
                  <Authenticate role={userRoles}>
                    <ContestSite mode={mode} />
                  </Authenticate>
                }
              />
              <Route
                path="info/*"
                element={
                  <Authenticate role={userRoles}>
                    <InfoSite mode={mode} />
                  </Authenticate>
                }
              />
              <Route
                path="share/*"
                element={
                  <Authenticate role={userRoles}>
                    <ShareSite mode={mode} />
                  </Authenticate>
                }
              />
              <Route path="user/*" element={<UserSite mode={mode} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </StyledContent>
        <StyledFooter>
          <h2>友情链接</h2>
          <p>
            <a href="https://docs.eesast.com">DOCS</a> <ExportOutlined />{" "}
            &nbsp;&nbsp;
            <a href="https://overleaf.eesast.com">OVERLEAF</a>{" "}
            <ExportOutlined /> &nbsp;&nbsp;
            <a href="https://mc.eesast.com">MINECRAFT</a> <ExportOutlined />
          </p>
          <p>
            <a href="https://beian.miit.gov.cn/">京ICP备2023014732号-1</a> ©
            2023 EESAST
          </p>
        </StyledFooter>
        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
