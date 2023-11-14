import React from "react";
import { Layout, Menu } from "antd";
import {
  SwitcherOutlined,
  ApartmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import NewsPage from "./NewsPage";
import DivisionPage from "./DivisionPage";
import ContestPage from "./ContestPage";
import NotFoundPage from "../NotFoundPage";
import { useUrl } from "../../api/hooks/url";

const { Header, Content } = Layout;

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

const HomeSite: React.FC = () => {
  const url = useUrl();

  return (
    <Layout>
      <StyledHeader>
        <StyledMenu theme="light" mode="horizontal" selectedKeys={[url.page]}>
          <Menu.Item key="news">
            <Link to={url.link("news")}>
              <SwitcherOutlined />
              动态
            </Link>
          </Menu.Item>
          <Menu.Item key="divisions">
            <Link to={url.link("divisions")}>
              <ApartmentOutlined />
              部门
            </Link>
          </Menu.Item>
          <Menu.Item key="contests">
            <Link to={url.link("contests")}>
              <TeamOutlined />
              比赛
            </Link>
          </Menu.Item>
        </StyledMenu>
      </StyledHeader>
      <Content>
        <Switch>
          <Route exact path={url.route("home", "site")}>
            <Redirect to={url.link("news")} />
          </Route>
          <Route exact path={url.route("news")}>
            <NewsPage />
          </Route>
          <Route exact path={url.route("divisions")}>
            <DivisionPage />
          </Route>
          <Route exact path={url.route("contests")}>
            <ContestPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};

export default HomeSite;
