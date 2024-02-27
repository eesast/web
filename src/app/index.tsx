import React, { Suspense, lazy, useRef, useState } from "react";
import {
  Button,
  ConfigProvider,
  FloatButton,
  Layout,
  Menu,
  Popover,
  Spin,
  Switch,
  Tour,
  TourProps,
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
import NotFoundPage from "./Components/NotFound";
import Authenticate, { userRoles } from "./Components/Authenticate";
import { useUrl } from "../api/hooks/url";
import { useUser } from "@/api/hooks/user";
import { JwtPayload } from "@/api/hooks/user";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale("zh-cn");

export interface PageProps {
  mode: String;
  user: JwtPayload | null;
}

const App: React.FC = () => {
  const url = useUrl();
  const [user, setUser] = useUser();
  const userAgent = navigator.userAgent;
  const isMobile = userAgent.match(
    /(iPhone|iPod|Android|ios|iPad|AppleWebKit.*Mobile.*)/i,
  );
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light",
  );
  const [open, setOpen] = useState<boolean>(
    localStorage.getItem("tour") !== "true",
  );
  const homeRef = useRef(null);
  const contestRef = useRef(null);
  const infoRef = useRef(null);
  const shareRef = useRef(null);
  const themeRef = useRef(null);

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

  const Logo = ({ title }: { title: string }) => {
    return (
      <>
        <img
          src="/logo.png"
          alt="Logo"
          css={`
            display: inline-block;
            height: 60px;
            width: 60px;
          `}
        />
        <h1
          css={`
            display: inline-block;
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
          {title}
        </h1>
      </>
    );
  };

  const Home = () => {
    return (
      <Link
        to={url.link("home", "site")}
        ref={homeRef}
        css={`
          display: flex;
          align-items: center;
          height: 72px;
          width: 180px;
          position: absolute;
          left: 24px;
        `}
      >
        <Logo title="EESΛST" />
      </Link>
    );
  };

  const Navigation = () => {
    const items = [
      {
        key: "contest",
        label: (
          <Link to={url.link("contest", "site")} ref={contestRef}>
            赛事互动 CONTEST
          </Link>
        ),
      },
      {
        key: "info",
        label: (
          <Link to={url.link("info", "site")} ref={infoRef}>
            信息化平台 INFO
          </Link>
        ),
      },
      {
        key: "share",
        label: (
          <Link to={url.link("share", "site")} ref={shareRef}>
            资源共享 SHARE
          </Link>
        ),
      },
    ];

    const { width } = useWindowSize();
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
          content={<Menu mode="inline" items={items} />}
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
        ref={themeRef}
        checked={mode === "light"}
        onChange={() => {
          setMode(mode === "dark" ? "light" : "dark");
          localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
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
        {user ? <Button icon={<UserOutlined />} /> : <Button>登录</Button>}
      </Link>
    );
  };

  const Container = styled.div`
    height: calc(100vh - 72px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Loading = () => {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  };

  const steps: TourProps["steps"] = [
    {
      title: "2024 新版来袭！",
      description:
        "科协官网全新改版，更现代的UI，更丰富的功能，更好的用户体验。新版官网分为主页和三个子站，下面让我们分别介绍它们：",
      target: null,
      cover: <img src="/backgrounds/2024new.jpg" alt="2024New" />,
      mask: {
        style: {
          backdropFilter: "blur(8px)",
        },
      },
    },
    {
      title: "主页",
      description: "（已有功能介绍+一些新特点）",
      placement: "bottom",
      target: () => homeRef.current,
    },
    {
      title: "赛事互动站",
      description: "（已有功能介绍+一些新特点）",
      placement: "bottom",
      target: () => contestRef.current,
    },
    {
      title: "信息化平台",
      description: "（已有功能介绍+一些新特点）",
      placement: "bottom",
      target: () => infoRef.current,
    },
    {
      title: "资源共享站",
      description: "（已有功能介绍+一些新特点）",
      placement: "bottom",
      target: () => shareRef.current,
    },
    {
      title: "暗色模式",
      description: "还有炫酷的暗色模式，即护眼又极客，快来体验一下吧！",
      placement: "bottom",
      target: () => themeRef.current,
    },
  ];

  const HomeSite = lazy(() => import("./HomeSite"));
  const ContestSite = lazy(() => import("./ContestSite"));
  const InfoSite = lazy(() => import("./InfoSite"));
  const ShareSite = lazy(() => import("./ShareSite"));
  const UserSite = lazy(() => import("./UserSite"));

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm:
          mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Tour
        open={open && !isMobile}
        onClose={() => {
          setOpen(false);
          localStorage.setItem("tour", "true");
        }}
        steps={steps}
      />
      <Layout>
        <StyledHeader>
          <Home />
          <Navigation />
          <ThemeSwitch />
          <User />
        </StyledHeader>
        <StyledContent>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route
                path="home/*"
                element={<HomeSite mode={mode} user={user} />}
              />
              <Route
                path="contest/*"
                element={
                  <Authenticate role={userRoles} user={user}>
                    <ContestSite mode={mode} user={user} />
                  </Authenticate>
                }
              />
              <Route
                path="info/*"
                element={
                  <Authenticate role={userRoles} user={user}>
                    <InfoSite mode={mode} user={user} />
                  </Authenticate>
                }
              />
              <Route
                path="share/*"
                element={
                  <Authenticate role={userRoles} user={user}>
                    <ShareSite mode={mode} user={user} />
                  </Authenticate>
                }
              />
              <Route
                path="user/*"
                element={<UserSite mode={mode} user={user} setUser={setUser} />}
              />
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
            2024 EESAST
          </p>
        </StyledFooter>
        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
