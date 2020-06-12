import React from "react";
import { Layout, Menu } from "antd";
import {
  SwitcherOutlined,
  ApartmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import {
  useLocation,
  Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import NewsPage from "./NewsPage";
import DivisionPage from "./DivisionPage";
import ContestPage from "./ContestPage";

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
    line-height: 45px;
  }
`;

const HomeSite: React.FC = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const page = location.pathname.split("/")[2] ?? "news";

  return (
    <Layout>
      <StyledHeader>
        <StyledMenu theme="light" mode="horizontal" selectedKeys={[page]}>
          <Menu.Item key="news">
            <Link to={`${url}`}>
              <SwitcherOutlined />
              动态
            </Link>
          </Menu.Item>
          <Menu.Item key="divisions">
            <Link to={`${url}/divisions`}>
              <ApartmentOutlined />
              部门
            </Link>
          </Menu.Item>
          <Menu.Item key="contests">
            <Link to={`${url}/contests`}>
              <TeamOutlined />
              比赛
            </Link>
          </Menu.Item>
        </StyledMenu>
      </StyledHeader>
      <Content>
        <Switch>
          <Route exact path={path}>
            <NewsPage />
          </Route>
          <Route exact path={`${path}/divisions`}>
            <DivisionPage />
          </Route>
          <Route exact path={`${path}/contests`}>
            <ContestPage />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};

export default HomeSite;
