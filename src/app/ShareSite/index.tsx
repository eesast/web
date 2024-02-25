import React, { Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
// import { getUserInfo } from "../../api/helpers/auth";
import { Layout, Menu, Spin } from "antd";
import RepoPage from "./RepoPage";
import CoursePage from "./CoursePage";
import NotFoundPage from "../Components/NotFound";
import styled from "styled-components";
import WeeklyPage from "./WeeklyPage";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";

const ShareSite: React.FC<PageProps> = ({ mode }) => {
  const url = useUrl();
  // const userInfo = getUserInfo();

  const { Header, Content } = Layout;
  const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    z-index: 99;
    height: 48px;
    width: 100%;
    background-color: ${mode === "light" ? `white` : `#141414`};
    border-bottom: 1px solid
      ${mode === "light" ? `rgba(5, 5, 5, 0.06)` : `rgba(253, 253, 253, 0.12)`};
    position: fixed;
    top: 72px;
  `;

  const StyledMenu = styled(Menu)`
    &.ant-menu {
      line-height: 48px;
      border-bottom: unset;
    }
  `;

  const StyledContent = styled(Content)`
    margin-top: 48px;
    width: 100%;
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

  const items = [
    {
      key: "course",
      label: <Link to={url.link("course")}>课程</Link>,
      disabled: true,
    },
    {
      key: "repo",
      label: <Link to={url.link("repo")}>仓库</Link>,
      disabled: true,
    },
    // {
    //   key: "toturial",
    //   label: <Link to={url.link("toturial")}>教程</Link>,
    // },
    {
      key: "weekly",
      label: <Link to={url.link("weekly")}>推送</Link>,
    },
  ];

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
      <StyledContent>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={url.link("weekly")} />} />
            <Route path="course" element={<CoursePage />} />
            <Route path="repo" element={<RepoPage />} />
            {/* <Route path="toturial"} element={<CoursePage />} /> */}
            <Route path="weekly" element={<WeeklyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </StyledContent>
    </Layout>
  );
};

export default ShareSite;
