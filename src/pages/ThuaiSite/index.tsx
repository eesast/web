import React from "react";
import {
  useLocation,
  Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import {
  //Tabs,
  //Typography,
  //Divider,
  //Row,
  //Col,
  Menu,
  Layout,
} from "antd";
import RegisterPage from "./RegisterPage";
import IntroPage from "./IntroPage";
import NotFoundPage from "../NotFoundPage";
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1"];
const ThuaiSite: React.FC = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const page = location.pathname.split("/")[2] ?? "intro";

  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout>
      <Sider>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 256 }}
          selectedKeys={[page]}
        >
          <Menu.Item key="intro">
            <Link to={`${url}/intro`}>介绍</Link>
          </Menu.Item>
          <Menu.Item key="source">资源与公告</Menu.Item>

          <SubMenu key="sub1" title="队伍">
            <Menu.Item key="register">
              <Link to={`${url}/register`}>创建</Link>
            </Menu.Item>
            <Menu.Item key="join">加入</Menu.Item>
            <Menu.Item key="manage">管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="fight">对战</Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <Switch>
          <Route exact path={path}>
            <IntroPage />
          </Route>
          <Route exact path={`${path}/register`}>
            <RegisterPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};

export default ThuaiSite;
