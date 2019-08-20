import { Icon, Layout, Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import React, { useState } from "react";
import {
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { Site } from "../App";
import styles from "./EdcSite.module.css";
import IntroPage from "../pages/IntroPage";
import { WithRouterComponent } from "../types/WithRouterComponent";
import NotFoundSite from "./NotFoundSite";
import EnrollPage from "../pages/EnrollPage";
import TeamManagePage from "../pages/TeamManagePage";
import TeamJoinPage from "../pages/TeamJoinPage";
import AuthRoute from "../components/AuthRoute";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export interface IEdcSiteProps {
  setSite: (site: Site) => void;
}

type Page =
  | "intro"
  | "enroll"
  | "teamJoin"
  | "teamAdd"
  | "teamManage"
  | "resource";

const EdcSite: React.FC<WithRouterComponent<{}, IEdcSiteProps>> = ({
  setSite,
  match,
  location
}) => {
  const [page, setPage] = useState<Page>("intro");
  const [selected, setSelected] = useState<boolean>(false);

  const homeRoute = () => {
    setSelected(true);
    return <Redirect to={`${match.url}/intro`} />;
  };
  const NotFoundPage = (props: RouteComponentProps<any>) => (
    <NotFoundSite {...props} setSite={setSite} />
  );

  const onMenuSelect: MenuProps["onSelect"] = item => setPage(item.key as Page);

  setSite("edc");

  return (
    <Layout>
      <Sider breakpoint="sm" collapsedWidth="0">
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[page]}
          onSelect={onMenuSelect}
        >
          <Menu.Item key="intro">
            <Link to={`${match.url}/intro`} replace />
            <Icon type="home" />
            介绍
          </Menu.Item>
          <Menu.Item key="enroll">
            <Link to={`${match.url}/enroll`} replace />
            <Icon type="form" />
            报名
          </Menu.Item>
          <SubMenu
            key="team"
            title={
              <span>
                <Icon type="team" />
                队伍
              </span>
            }
          >
            <Menu.Item key="teamJoin">
              <Link to={`${match.url}/teams/join`} replace />
              加入
            </Menu.Item>
            <Menu.Item key="teamManage">
              <Link to={`${match.url}/teams/manage`} replace />
              管理
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="resource">
            <Link to={`${match.url}/resources`} replace />
            <Icon type="database" />
            资源
          </Menu.Item>
        </Menu>
      </Sider>
      <Content className={styles.content}>
        <Switch location={location}>
          <Route exact={selected} path={`${match.path}`} render={homeRoute} />
          <Route exact path={`${match.path}/intro`} component={IntroPage} />
          <Route exact path={`${match.path}/enroll`} component={EnrollPage} />
          <AuthRoute
            location={location}
            path={`${match.path}/teams/manage`}
            component={TeamManagePage}
          <AuthRoute
            location={location}
            path={`${match.path}/teams/join`}
            component={TeamJoinPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default EdcSite;
