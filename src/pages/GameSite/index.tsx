import React from "react";
import { Layout, Menu } from "antd";
import { AndroidOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  useLocation,
  Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import SignPage from "./SignPage";
import NewsPage from "./NewsPage";
import NotFoundPage from "../NotFoundPage";
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
const GameSite: React.FC = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const page = location.pathname.split("/")[2] ?? "sign";
  return (
    <Layout>
      <StyledHeader>
        <StyledMenu theme="light" mode="horizontal" selectedKeys={[page]}>
          <Menu.Item key="sign">
            <Link to={`${url}`}>
              <AndroidOutlined />
              报名
            </Link>
          </Menu.Item>
          <Menu.Item key="divisions">
            <Link to={`${url}/divisions`}>展示</Link>
          </Menu.Item>
          <Menu.Item key="contests">
            <Link to={`${url}/contests`}>队伍管理</Link>
          </Menu.Item>
        </StyledMenu>
      </StyledHeader>
      <Content>
        <Switch>
          <Route exact path={path}>
            <SignPage />
          </Route>
          <Route exact path={`${path}/divisions`}>
            <NewsPage />
          </Route>
          <Route exact path={`${path}/contests`}>
            <NotFoundPage />
          </Route>
          <Route>
            <SignPage />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};

export default GameSite;
