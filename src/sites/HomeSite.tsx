import { Layout, Menu, Icon } from "antd";
import React, { useState, useCallback } from "react";
import { Site } from "../App";
import styles from "./HomeSite.module.css";
import logo from "../assets/logo.png";
import { Typography } from "antd";
import { MenuProps } from "antd/lib/menu";
import DivisionPage from "../pages/DivisionPage";
import { Link, Switch, Route } from "react-router-dom";
import { WithRouterComponent } from "../types/WithRouterComponent";
import NotFoundSite from "./NotFoundSite";
import ContestPage from "../pages/ContestPage";

const { Header, Content } = Layout;

export interface IHomeSiteProps {
  setSite: (site: Site) => void;
}

export type HomeSitePage = "timelines" | "divisions" | "contests";

const HomeSite: React.FC<WithRouterComponent<{}, IHomeSiteProps>> = ({
  setSite
}) => {
  setSite("home");

  const NotFoundPage = useCallback(() => <NotFoundSite setSite={setSite} />, [
    setSite
  ]);

  const [currentSelected, setCurrentSelect] = useState<HomeSitePage>(
    "timelines"
  );

  const handleMenuSelect: MenuProps["onSelect"] = e => {
    setCurrentSelect(e.key as HomeSitePage);
  };

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "#fff",
          padding: 0,
          display: "flex",
          flexDirection: "row",
          height: 48,
          zIndex: 99
        }}
      >
        <Menu
          className={styles.menu}
          onSelect={handleMenuSelect}
          selectedKeys={[currentSelected]}
          theme="light"
          mode="horizontal"
        >
          <Menu.Item key="timelines">
            <Link to="/home">
              <Icon type="switcher" />
              动态
            </Link>
          </Menu.Item>
          <Menu.Item key="divisions">
            <Link to="/home/divisions">
              <Icon type="apartment" />
              部门
            </Link>
          </Menu.Item>
          <Menu.Item key="contests">
            <Link to="/home/contests">
              <Icon type="team" />
              比赛
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Switch>
          <Route
            exact
            path="/home"
            render={() => (
              <div className={styles.root}>
                <img className={styles.logo} alt="logo" src={logo} />
                <Typography.Title level={3}>官网建设中...</Typography.Title>
              </div>
            )}
          />
          <Route
            exact
            path="/home/divisions"
            render={() => <DivisionPage setPage={setCurrentSelect} />}
          />
          <Route
            exact
            path="/home/contests"
            render={() => <ContestPage setPage={setCurrentSelect} />}
          />
          <Route render={NotFoundPage} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default HomeSite;
