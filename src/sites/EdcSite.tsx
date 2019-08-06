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
import { WithRouterPage } from "../types/WithRouterPage";
import NotFoundSite from "./NotFoundSite";

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

const EdcSite: React.FC<WithRouterPage<{}, IEdcSiteProps>> = ({
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
            <Icon type="user" />
            介绍
          </Menu.Item>
          <Menu.Item key="enroll">
            <Link to={`${match.url}/enroll`} replace />
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
            <Icon type="user" />
            资源
          </Menu.Item>
        </Menu>
      </Sider>
      <Content className={styles.content}>
        <Switch location={location}>
          <Route exact={selected} path={`${match.path}`} render={homeRoute} />
          <Route exact path={`${match.path}/intro`} component={IntroPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default EdcSite;
