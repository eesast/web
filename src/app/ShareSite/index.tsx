import React, { Suspense, useEffect, useRef } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { Layout, Menu, Spin } from "antd";
import RepoPage from "./RepoPage";
import CoursePage from "./CoursePage";
import NotFoundPage from "../Components/NotFound";
import styled from "styled-components";
import WeeklyPage from "./WeeklyPage";
import { useUrl } from "../../api/hooks/url";
import { useNarrow } from "../../api/hooks/narrow";
import { PageProps } from "..";
import IntroPage from "./IntroPage";
import MinecraftPage from "./MinecraftPage";
import TourGuidePage from "./TourGuidePage";
import Authenticate, { courseRoles } from "../Components/Authenticate";
import DivisionPage from "../HomeSite/DivisionPage";
import ContestPage from "../HomeSite/ContestPage";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Header, Content } = Layout;

/* ---------------- 不随渲染刷新的组件 ---------------- */
const StyledMenu = styled(Menu)`
  &.ant-menu {
    width: 100%;
    line-height: 48px;
    border-bottom: unset;
  }
`;

/* ---------------- 手机端：整条左右滚动的栏目标签 ---------------- */
const MobileNav = styled.div`
  /* 让子标签的 offsetLeft 相对这条滚动栏计算 */
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 8px;
  box-sizing: border-box;
  gap: 2px;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileTab = styled.div<{ $active: boolean }>`
  flex: 0 0 auto;
  height: 46px;
  padding: 0 12px;
  border-bottom: 2px solid transparent;
  border-bottom-color: ${(p) => (p.$active ? "#1677ff" : "transparent")};
  white-space: nowrap;

  a {
    display: block;
    height: 100%;
    line-height: 46px;
    font-size: 14.5px;
    white-space: nowrap;
    color: ${(p) => (p.$active ? "#1677ff" : "inherit")};
    font-weight: ${(p) => (p.$active ? 600 : 400)};
  }
`;

const Container = styled.div`
  height: calc(100vh - 120px);
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

/* ---------------- 主页面 ---------------- */
const ShareSite: React.FC<PageProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();

  const StyledHeader = styled(Header)`
    && {
      padding: 0 50px;
    }

    @media (max-width: 768px) {
      && {
        padding: 0;
      }
    }

    display: flex;
    align-items: center;
    z-index: 99;
    height: 48px;
    width: 100%;
    background-color: ${mode === "light" ? `white` : `#141414`};
    border-bottom: 1px solid
      ${mode === "light" ? `rgba(5, 5, 5, 0.06)` : `rgba(253, 253, 253, 0.12)`};
    position: sticky;
    top: 72px;
  `;
  const navigationType = useNavigationType(); // 获取导航类型
  const location = useLocation(); // 获取当前位置

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname, navigationType]);

  /* ---------------- 随渲染刷新的组件 ---------------- */
  const isNarrow = useNarrow();

  // 栏目清单的唯一来源：桌面菜单和手机横向滚动栏都从这里派生
  const tabs = [
    { key: "intro", label: "介绍" },
    { key: "weekly", label: "Weekly" },
    { key: "minecraft", label: "Minecraft" },
    { key: "division", label: "部门" },
    { key: "contest", label: "比赛" },
    { key: "tourguide", label: "网站说明" },
  ];

  if (courseRoles.includes(user.role)) {
    tabs.splice(1, 0, { key: "course", label: "课程" });
  }

  const items = tabs.map((tab) => ({
    key: tab.key,
    label: <Link to={url.link(tab.key)}>{tab.label}</Link>,
  }));

  // 手机端：整条标签横向滚动，把当前栏目滚进可视范围（不循环）
  const navRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const tab = activeTabRef.current;
    if (!nav || !tab) return;

    const target = tab.offsetLeft - (nav.clientWidth - tab.clientWidth) / 2;
    const max = nav.scrollWidth - nav.clientWidth;
    nav.scrollLeft = Math.min(Math.max(target, 0), Math.max(max, 0));
  }, [url.page, isNarrow]);

  /* ---------------- 页面组件 ---------------- */
  return (
    <Layout>
      <StyledHeader>
        {isNarrow ? (
          <MobileNav ref={navRef}>
            {tabs.map((tab) => (
              <MobileTab
                key={tab.key}
                $active={tab.key === url.page}
                ref={tab.key === url.page ? activeTabRef : undefined}
              >
                <Link to={url.link(tab.key)}>{tab.label}</Link>
              </MobileTab>
            ))}
          </MobileNav>
        ) : (
          <StyledMenu
            theme="light"
            mode="horizontal"
            selectedKeys={[url.page]}
            items={items}
          />
        )}
      </StyledHeader>
      <Content>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={url.link("intro")} />} />
            <Route
              path="intro"
              element={<IntroPage mode={mode} user={user} />}
            />
            <Route
              path="course"
              element={
                <Authenticate role={courseRoles} user={user}>
                  <CoursePage mode={mode} user={user} />
                </Authenticate>
              }
            />
            <Route path="repo" element={<RepoPage mode={mode} user={user} />} />
            <Route
              path="weekly"
              element={<WeeklyPage mode={mode} user={user} />}
            />
            <Route
              path="minecraft"
              element={<MinecraftPage mode={mode} user={user} />}
            />
            <Route
              path="tourguide"
              element={<TourGuidePage mode={mode} user={user} />}
            />
            <Route
              path="division"
              element={<DivisionPage mode={mode} user={user} />}
            />
            <Route
              path="contest"
              element={<ContestPage mode={mode} user={user} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default ShareSite;
