import { Layout, Menu, Typography } from "antd";
import { SelectParam } from "antd/lib/menu";
import QueueAnim from "rc-queue-anim";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";
import logo from "./assets/logo.png";
import constants from "./constants";
import EdcSite, { IEdcSiteProps } from "./sites/EdcSite";
import HomeSite, { IHomeSiteProps } from "./sites/HomeSite";
import WeeklySite, { IWeeklySiteProps } from "./sites/WeeklySite";

const { Header, Footer } = Layout;
const { Title } = Typography;

export type Site = "home" | "weekly" | "edc";

const App = () => {
  const getRoute = ({ location }: RouteProps) => {
    const Component = routes
      .map(item => {
        if (location!.pathname === item.to) {
          return item.component;
        }
        return null;
      })
      .filter(item => item)[0] as React.FC<
      IHomeSiteProps | IWeeklySiteProps | IEdcSiteProps
    >;

    const homeRoute = () => <Redirect to="/home" />;
    const siteRoute = (props: RouteComponentProps<any>) => (
      <Component {...props} setSite={setSite} />
    );

    return (
      <div style={{ position: "relative" }}>
        <Route exact={true} path="/" render={homeRoute} />
        <QueueAnim type={["right", "left"]}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
            key={location!.pathname}
          >
            <Route location={location} path="/:url" render={siteRoute} />
            <Footer
              style={{
                height: constants.footerHeight,
                textAlign: "center"
              }}
            >
              © 2019 EESAST
            </Footer>
          </div>
        </QueueAnim>
      </div>
    );
  };

  const [site, setSite] = useState<Site>("home");

  const onHeaderMenuSelect = (item: SelectParam) => setSite(item.key as Site);

  return (
    <Router>
      <Layout>
        <Header
          style={{
            backgroundColor: "#fff",
            padding: 0,
            display: "flex",
            flexDirection: "row",
            height: constants.headerHeight + 3,
            zIndex: 99
          }}
        >
          <div
            style={{
              height: "100%",
              width: constants.siderWidth,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            <img
              style={{
                height: "60%",
                width: "auto",
                margin: "auto",
                marginRight: 0
              }}
              src={logo}
              alt="Logo"
            />
            <Title style={{ margin: "auto", marginLeft: 10 }} level={3}>
              EESAST
            </Title>
          </div>
          <Menu
            style={{ lineHeight: constants.headerHeight + "px" }}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            selectedKeys={[site]}
            onSelect={onHeaderMenuSelect}
          >
            <Menu.Item key="home">
              <Link to="/home">首页</Link>
            </Menu.Item>
            <Menu.Item key="weekly">
              <Link to="/weekly">Weekly</Link>
            </Menu.Item>
            <Menu.Item key="edc">
              <Link to="/thuedc">电子设计大赛</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Route render={getRoute} />
      </Layout>
    </Router>
  );
};

const routes = [
  { to: "/home", component: HomeSite },
  { to: "/weekly", component: WeeklySite },
  { to: "/thuedc", component: EdcSite }
];

export default App;
