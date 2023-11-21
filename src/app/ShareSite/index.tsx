import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
// import { getUserInfo } from "../../api/helpers/auth";
//导入antd的包
import { Layout, Menu } from "antd";
//以下为分页面
import RepoPage from "./RepoPage";
import CoursePage from "./CoursePage";
import NotFoundPage from "../Components/NotFound";
import { Content } from "antd/lib/layout/layout";
import styled from "styled-components";
import WeeklyPage from "../WeeklyPage";
import { useUrl } from "../../api/hooks/url";

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background-color: white;
  display: flex;
  flex-direction: row;
  height: 48px;
  z-index: 98;
  border-bottom: 2px #eee solid;
`;

const StyledMenu = styled(Menu)`
  &.ant-menu {
    line-height: 46px;
    border-bottom: unset;
  }
`;

const ShareSite: React.FC = () => {
  const url = useUrl();
  // const userInfo = getUserInfo();

  return (
    <Layout>
      <StyledHeader>
        <StyledMenu theme="light" mode="horizontal" selectedKeys={[url.page]}>
          <Menu.Item key="course" disabled>
            <Link to={url.link("course")}>课程</Link>
          </Menu.Item>
          <Menu.Item key="repo" disabled>
            <Link to={url.link("repo")}>仓库</Link>
          </Menu.Item>
          {/* <Menu.Item key="toturial">
            <Link to={url.link("toturial")}>
              教程
            </Link>
          </Menu.Item> */}
          <Menu.Item key="weekly">
            <Link to={url.link("weekly")}>Weekly</Link>
          </Menu.Item>
        </StyledMenu>
      </StyledHeader>
      <Content>
        <Routes>
          <Route path="/" element={<Navigate to={url.link("weekly")} />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="repo" element={<RepoPage />} />
          {/* <Route path="toturial"} element={<CoursePage />} /> */}
          <Route path="weekly" element={<WeeklyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default ShareSite;
