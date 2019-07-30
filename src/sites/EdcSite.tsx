import { Breadcrumb, Icon, Layout, Menu } from "antd";
import { SelectParam } from "antd/lib/menu";
import React, { useState } from "react";
import {
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { Site } from "../App";
import constants from "../constants";
import IntroPage from "../pages/IntroPage";
import TeamJoinPage from "../pages/TeamJoinPage";
import { WithRouterPage } from "../types/WithRouterPage";
import NotFoundSite from "./NotFoundSite";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export interface IEdcSiteProps {
  setSite: (site: Site) => void;
}

export type Page =
  | "intro"
  | "enroll"
  | "teamJoin"
  | "teamAdd"
  | "teamManage"
  | "resource";

const EdcSite: React.FC<WithRouterPage<{}, IEdcSiteProps>> = ({
  setSite,
  match,
  location
}) => {
  const [page, setPage] = useState<Page>("intro");

  const pageContents: { [K in Page]?: React.FC<any> } = {};
  pageContents.intro = IntroPage;
  pageContents.teamJoin = TeamJoinPage;

  const addProps = (Component: React.FC<any>) => (
    props: RouteComponentProps<any>
  ) => <Component {...props} setPage={setPage} />;
  const homeRoute = () => <Redirect to={`${match.url}/intro`} />;
  const NotFoundPage = (props: RouteComponentProps<any>) => (
    <NotFoundSite {...props} setSite={setSite} />
  );

  const onMenuSelect = (item: SelectParam) => setPage(item.key as Page);

  setSite("edc");

  return (
    <Layout>
      <Sider breakpoint="sm" collapsedWidth="0" width={constants.siderWidth}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[page]}
          defaultOpenKeys={[]}
          style={{ height: "100%", borderRight: 0 }}
          onSelect={onMenuSelect}
        >
          <Menu.Item key="intro">
            <Link to={`${match.url}/intro`} />
            <Icon type="user" />
            介绍
          </Menu.Item>
          <Menu.Item key="enroll">
            <Link to={`${match.url}/enroll`} />
            <Icon type="laptop" />
            报名
          </Menu.Item>
          <SubMenu
            key="team"
            title={
              <span>
                <Icon type="user" />
                队伍
              </span>
            }
          >
            <Menu.Item key="teamJoin">
              <Link to={`${match.url}/teams/join`} />
              加入
            </Menu.Item>
            <Menu.Item key="teamManage">
              <Link to={`${match.url}/teams/manage`} />
              管理
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="resource">
            <Link to={`${match.url}/resources`} />
            <Icon type="user" />
            资源
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Switch location={location}>
            <Route exact={true} path={`${match.path}`} render={homeRoute} />
            <Route
              exact={true}
              path={`${match.path}/intro`}
              render={addProps(pageContents.intro)}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EdcSite;
