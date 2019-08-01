import {
  BackTop,
  Button,
  Layout,
  LocaleProvider,
  Menu,
  Typography
} from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { SelectParam } from "antd/lib/menu";
import moment from "moment";
import "moment/locale/zh-cn";
import QueueAnim from "rc-queue-anim";
import React, { useState } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Switch
} from "react-router-dom";
import logo from "./assets/logo.png";
import constants from "./constants";
import LoginPage from "./pages/LoginPage";
import store from "./redux/store";
import ApiSite from "./sites/ApiSite";
import EdcSite from "./sites/EdcSite";
import HomeSite from "./sites/HomeSite";
import NotFoundSite from "./sites/NotFoundSite";
import WeeklySite from "./sites/WeeklySite";

const { Header, Footer } = Layout;
const { Title } = Typography;

moment.locale("zh-cn");

export type Site = "home" | "weekly" | "edc" | "others";

const App = () => {
  const getRoute = ({ location }: RouteProps) => {
    const pathname = "/" + location!.pathname.split("/")[1];
    const matchedRoute = routes.find(item => pathname === item.to);
    const Component = matchedRoute ? matchedRoute.component : NotFoundSite;

    const homeRoute = () => <Redirect to="/home" />;
    const siteRoute = (props: RouteComponentProps<any>) => (
      <Component {...props} setSite={setSite} />
    );

    return (
      <div style={{ position: "relative" }}>
        <Switch location={location}>
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
              key={pathname}
            >
              <Route location={location} path="/:url" render={siteRoute} />
              <Footer
                style={{
                  height: constants.footerHeight,
                  textAlign: "center",
                  backgroundColor: constants.backgroundColor
                }}
              >
                © 2019 EESAST
              </Footer>
            </div>
          </QueueAnim>
        </Switch>
      </div>
    );
  };

  const [site, setSite] = useState<Site>("home");

  const onHeaderMenuSelect = (item: SelectParam) => setSite(item.key as Site);

  return (
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <Router>
          <Layout>
            <Header
              style={{
                backgroundColor: "#fff",
                padding: 0,
                display: "flex",
                flexDirection: "row",
                height: constants.headerHeight + 2,
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
                style={{
                  flex: 1,
                  lineHeight: constants.headerHeight + "px",
                  borderBottom: 0
                }}
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
                <Link to="/login">
                  <Button icon="user" />
                </Link>
              </div>
            </Header>
            <Route render={getRoute} />
          </Layout>
          <BackTop />
        </Router>
      </LocaleProvider>
    </Provider>
  );
};

const routes = [
  { to: "/home", component: HomeSite },
  { to: "/weekly", component: WeeklySite },
  { to: "/thuedc", component: EdcSite },
  { to: "/api", component: ApiSite },
  { to: "/login", component: LoginPage }
];

export default App;
