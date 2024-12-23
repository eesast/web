import React, { Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Layout, Menu, Spin } from "antd";
import RepoPage from "./RepoPage";
import CoursePage from "./CoursePage";
import NotFoundPage from "../Components/NotFound";
import styled from "styled-components";
import WeeklyPage from "./WeeklyPage";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";
import IntroPage from "./IntroPage";
import MinecraftPage from "./MinecraftPage";
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

  /* ---------------- 随渲染刷新的组件 ---------------- */
  let items = [
    {
      key: "intro",
      label: <Link to={url.link("intro")}>介绍</Link>,
    },
    // {
    //   key: "repo",
    //   label: <Link to={url.link("repo")}>仓库</Link>,
    //   disabled: true,
    // },
    // {
    //   key: "toturial",
    //   label: <Link to={url.link("toturial")}>教程</Link>,
    // },
    {
      key: "weekly",
      label: <Link to={url.link("weekly")}>Weekly</Link>,
    },
    {
      key: "minecraft",
      label: <Link to={url.link("minecraft")}>Minecraft</Link>,
    },
    {
      key: "division",
      label: <Link to={url.link("division")}>部门</Link>,
    },
    {
      key: "contest",
      label: <Link to={url.link("contest")}>比赛</Link>,
    },
  ];

  if (courseRoles.includes(user.role)) {
    items.splice(1, 0, {
      key: "course",
      label: <Link to={url.link("course")}>课程</Link>,
    });
  }

  /* ---------------- 页面组件 ---------------- */
  return (
    <Layout>
      <StyledHeader>
        <StyledMenu
          theme="light"
          mode="horizontal"
          selectedKeys={[url.page]}
          items={items}
        />
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
