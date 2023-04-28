import React, { useEffect } from "react";
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
  FireOutlined,
  LockOutlined,
  DoubleLeftOutlined,
  // ExperimentOutlined
} from "@ant-design/icons";
import { getUserInfo } from "../../helpers/auth";
//antd的包
import { Menu, Layout, message } from "antd";
//以下为子分页
//import { contestProps } from "./index";
import IntroPage from "./IntroPage";
import ResourcePage from "./ResourcePage";
import RegisterPage from "./RegisterPage";
import JoinPage from "./JoinPage";
import ManagePage from "./ManagePage";
// import BattlePage from "./BattlePage";
import ArenaPage from "./ArenaPage";
import RecordPage from "./RecordPage";
import CodePage from "./CodePage";
// import PlayPage from "./PlayPage";
import ManageTeamsPage from "./ManageTeamsPage";
import SettingPage from "./SettingPage";
import NotFoundPage from "../NotFoundPage";
// hasura查询
import { useQuery } from "@apollo/client";
import { QueryContestManager, QueryContestManagerVariables } from "../../api/types"
import {
  QueryContestManager as QUERY_CONTEST_MANAGER
} from "../../api/contest.graphql"
//学长写好的api，用以没登陆会跳转到登陆页面
import AuthRoute from "../../components/AuthRoute";
//antd部件实例化
const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const MenuPage: React.FC = () => {
  const userInfo = getUserInfo();

  //url
  const { path, url } = useRouteMatch();
  const location = useLocation();
  //url的split，预设页面是intro
  const page = location.pathname.split("/")[3] ?? "intro";
  // 从url中获取比赛的id
  const Contest_id = location.pathname.split("/")[2].replace('}', '')

  const {
    data: isContestManagerData,
    error: isContestManagerError
  } = useQuery<QueryContestManager, QueryContestManagerVariables>(QUERY_CONTEST_MANAGER, {
    variables: {
      contest_id: Contest_id,
      user_id: userInfo?._id
    }
  });
  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message)
    }
  }, [isContestManagerError]);

  //渲染页面,switch类似c，用以切换url
  return (
    <Layout>
      <Sider
      theme="light"
      collapsedWidth={0}
      collapsible={true}
      >
        <Menu
          mode="inline"
          selectedKeys={[page]}
          defaultSelectedKeys={["back"]}
        >
          <Menu.Item key="back">
            <DoubleLeftOutlined />
            <Link to={`/contest`}>返回</Link>
          </Menu.Item>
          <Menu.Item key="intro">
            <HomeOutlined />
            <Link to={`${url}/intro`}>介绍</Link>
          </Menu.Item>
          <Menu.Item key="source">
            <DatabaseOutlined />
            <Link to={`${url}/source`}>资源与公告</Link>
          </Menu.Item>
          <SubMenu
            key="team"
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
          {/* <Menu.Item key="fight">
            <FireOutlined />
            <Link to={`${url}/battle`}>对战</Link>
          </Menu.Item> */}
          <SubMenu
            key="fight"
            title={
              <span>
                <FireOutlined />
                对战
              </span>
            }
          >
            <Menu.Item key="arena">
              <Link to={`${url}/arena`}>天梯</Link>
            </Menu.Item>
            <Menu.Item key="records">
              <Link to={`${url}/records`}>记录</Link>
            </Menu.Item>
            <Menu.Item key="codes">
              <Link to={`${url}/codes`}>代码</Link>
            </Menu.Item>
          </SubMenu>
          {/* <Menu.Item key="play">
            <ExperimentOutlined />
            <Link to={`${url}/play`}>开玩</Link>
          </Menu.Item> */}

          {(["root", "counselor"].includes(userInfo?.role!) || isContestManagerData?.contest_manager.length === 1) ? (
            <SubMenu
              key="sub2"
              title={
                <span>
                  <LockOutlined />
                  管理员
                </span>
              }
            >
              <Menu.Item key="manageTeams">
                <Link to={`${url}/manageTeams`}>管理队伍</Link>
              </Menu.Item>
              <Menu.Item key="setting">
                <Link to={`${url}/setting`}>比赛设置</Link>
              </Menu.Item>
            </SubMenu>
          ) : null}
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
          <AuthRoute exact path={`${path}/manage`}>
            <ManagePage />
          </AuthRoute>

          <AuthRoute exact path={`${path}/arena`}>
            <ArenaPage />
          </AuthRoute>
          <AuthRoute exact path={`${path}/records`}>
            <RecordPage />
          </AuthRoute>
          <AuthRoute exact path={`${path}/codes`}>
            <CodePage />
          </AuthRoute>
          {/* <AuthRoute exact path={`${path}/battle`}>
            <BattlePage />
          </AuthRoute> */}

          {/* <AuthRoute exact path={`${path}/play`}>
            <PlayPage />
          </AuthRoute> */}
          <AuthRoute exact path={`${path}/manageTeams`}>
            <ManageTeamsPage />
          </AuthRoute>
          <AuthRoute exact path={`${path}/setting`}>
            <SettingPage />
          </AuthRoute>
          <AuthRoute>
            <NotFoundPage />
          </AuthRoute>
        </Switch>
      </Content>
    </Layout>
  );
};

export default MenuPage;
