import React from "react";
import {
  useLocation,
  Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import {
  HomeOutlined,
  DatabaseOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
//antd的包
import { Menu, Layout } from "antd";
//以下为子分页
import IntroPage from "./IntroPage";
import ResourcePage from "./ResourcePage";
import RegisterPage from "./RegisterPage";
import JoinPage from "./JoinPage";
import ManagePage from "./ManagePage";
import BattlePage from "./BattlePage";
import NotFoundPage from "../NotFoundPage";
//学长写好的api，用以没登陆会跳转到登陆页面
import AuthRoute from "../../components/AuthRoute";
//antd部件实例化
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1"];
//react页面标准写法
const ThuaiSite: React.FC = () => {
  //url
  const { path, url } = useRouteMatch();
  const location = useLocation();
  //url的split，预设页面是intro
  const page = location.pathname.split("/")[2] ?? "intro";
  //小子分页
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);
  //subpage的开关
  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  //渲染页面,switch类似c，用以切换url
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
            <HomeOutlined />
            <Link to={`${url}/intro`}>介绍</Link>
          </Menu.Item>
          <Menu.Item key="source">
            <DatabaseOutlined />
            <Link to={`${url}/source`}>资源与公告</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <TeamOutlined />
                队伍
              </span>
            }
          >
            <Menu.Item key="register">
              <Link to={`${url}/register`}>创建</Link>
            </Menu.Item>
            <Menu.Item key="join">
              <Link to={`${url}/join`}>加入</Link>
            </Menu.Item>
            <Menu.Item key="manage">
              <Link to={`${url}/manage`}>管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="fight">
            <ThunderboltOutlined />
            <Link to={`${url}/battle`}>对战</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <Switch>
          <Route exact path={path}>
            <IntroPage />
          </Route>
          <Route exact path={`${path}/intro`}>
            <IntroPage />
          </Route>
          <Route exact path={`${path}/source`}>
            <ResourcePage />
          </Route>
          <AuthRoute exact path={`${path}/register`}>
            <RegisterPage />
          </AuthRoute>
          <AuthRoute exact path={`${path}/join`}>
            <JoinPage />
          </AuthRoute>
          <Route exact path={`${path}/manage`}>
            <ManagePage />
          </Route>
          <Route exact path={`${path}/battle`}>
            <BattlePage />
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
