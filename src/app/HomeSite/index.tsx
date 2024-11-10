import React, { Suspense } from "react";
import { Layout, Spin, Tabs } from "antd";
import { ApartmentOutlined, TrophyOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Route, Navigate, Routes } from "react-router-dom";
import NewsPage from "./NewsPage";
import NotFoundPage from "../Components/NotFound";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";
import DivisionPage from "./DivisionPage";
import ContestPage from "./ContestPage";

const HomeSite: React.FC<PageProps> = ({ mode, user }) => {
  const url = useUrl();

  const { Content } = Layout;
  //const StyledHeader = styled(Header)`
  //display: flex;
  //align-items: center;
  //justify-content: center;
  //z-index: 99;
  //height: 48px;
  //width: 100%;
  //background-color: ${mode === "light" ? `white` : `#141414`};
  //border-bottom: 1px solid
  //${mode === "light" ? `rgba(5, 5, 5, 0.06)` : `rgba(253, 253, 253, 0.12)`};
  //position: sticky;
  //top: 72px;
  //`;
  const StyledTabs = styled(Tabs)`
    background-color: ${mode === "light" ? `white` : `#141414`};

    .ant-tabs-nav .ant-tabs-tab {
      justify-content: center;
      align-items: center;
      font-size: 22px;
      width: 300px;
      margin: 0;
    }

    .ant-tabs-nav .ant-tabs-tab .icon-class {
      font-size: 22px;
    }
  `;
  //const StyledMenu = styled(Menu)`
  //&.ant-menu {
  //line-height: 48px;
  //width: 100%;
  //justify-content: center;
  //border-bottom: unset;
  //}
  //`;

  const Container = styled.div`
    height: auto;
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

  // const items = [
  // {
  // key: "news",
  // icon: <SwitcherOutlined />,
  // label: <Link to={url.link("news")}>动态</Link>,
  // },
  // ];

  interface TabItem {
    key: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
  }
  const tabData: TabItem[] = [
    {
      key: "1",
      icon: <ApartmentOutlined />,
      label: "部门",
      content: <DivisionPage mode={mode} user={user} />,
    },
    {
      key: "2",
      icon: <TrophyOutlined />,
      label: "比赛",
      content: <ContestPage mode={mode} user={user} />,
    },
  ];

  return (
    <Layout>
      {/* <StyledHeader> */}
      {/* <StyledMenu */}
      {/* theme="light" */}
      {/* mode="horizontal" */}
      {/* selectedKeys={[url.page]} */}
      {/* items={items} */}
      {/* /> */}
      {/* </StyledHeader> */}
      <Content>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={url.link("news")} />} />
            <Route path="news" element={<NewsPage mode={mode} user={user} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <br />
        <br />
        <div style={{ width: "100%", maxWidth: "90vw", margin: "0 auto" }}>
          <StyledTabs
            defaultActiveKey="1"
            centered
            items={tabData.map(({ key, icon, label, content }) => ({
              icon,
              label,
              key,
              children: content,
            }))}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default HomeSite;
