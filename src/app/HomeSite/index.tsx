import React, { Suspense, lazy } from "react";
import { Layout, Menu, Spin } from "antd";
import {
  SwitcherOutlined,
  ApartmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link, Route, Navigate, Routes } from "react-router-dom";
import NewsPage from "./NewsPage";
import NotFoundPage from "../Components/NotFound";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";

const HomeSite: React.FC<PageProps> = ({ mode }) => {
  const url = useUrl();

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
      key: "news",
      icon: <SwitcherOutlined />,
      label: <Link to={url.link("news")}>动态</Link>,
    },
    {
      key: "divisions",
      icon: <ApartmentOutlined />,
      label: <Link to={url.link("divisions")}>部门</Link>,
    },
    {
      key: "contests",
      icon: <TeamOutlined />,
      label: <Link to={url.link("contests")}>比赛</Link>,
    },
  ];

  const DivisionPage = lazy(() => import("./DivisionPage"));
  const ContestPage = lazy(() => import("./ContestPage"));

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
            <Route path="/" element={<Navigate to={url.link("news")} />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="divisions" element={<DivisionPage />} />
            <Route path="contests" element={<ContestPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </StyledContent>
    </Layout>
  );
};

export default HomeSite;
