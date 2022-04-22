import React, { useEffect } from "react";
import {
  useLocation,
  Link,
  Switch,
  Route,
  useRouteMatch,
  //useParams,
} from "react-router-dom";
import {
  HomeOutlined,
  DatabaseOutlined,
  TeamOutlined,
  FireOutlined,
  LockOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { getUserInfo } from "../../helpers/auth";
//antd的包
import { Menu, Layout, Row, Col, Button, message, Typography } from "antd";
//以下为子分页
//import { contestProps } from "./index";
import IntroPage from "./IntroPage";
import ResourcePage from "./ResourcePage";
import RegisterPage from "./RegisterPage";
import JoinPage from "./JoinPage";
import ManagePage from "./ManagePage";

import BattlePage from "./BattlePage";
import ManageContestPage from "./ManageContestPage";
import NotFoundPage from "../NotFoundPage";
// hasura查询
import { useQuery } from "@apollo/client";
import { GetContestInfo, GetContestInfoVariables, QueryContestManager, QueryContestManagerVariables } from "../../api/types"
import {
  GetContestInfo as GETCONTESTINFO,
  QueryContestManager as QUERY_CONTEST_MANAGER
} from "../../api/contest.graphql"
//学长写好的api，用以没登陆会跳转到登陆页面
import AuthRoute from "../../components/AuthRoute";
//antd部件实例化
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography
const rootSubmenuKeys = ["sub1", "sub2"];
//react页面标准写法
const MenuPage: React.FC = () => {
  const userInfo = getUserInfo();

  //url
  const { path, url } = useRouteMatch();
  const location = useLocation();
  //url的split，预设页面是intro
  const page = location.pathname.split("/")[2] ?? "intro";
  // 从url中获取比赛的id
  const Contest_id = location.pathname.split("/")[2].replace('}', '')
  const {
    data: ContestData,
    error: ContestError,
  } = useQuery<GetContestInfo, GetContestInfoVariables>(GETCONTESTINFO, {
    variables: {
      contest_id: Contest_id
    }
  });

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
    if (ContestError) {
      message.error("比赛加载失败");
      console.log(ContestError.message)
    }
  }, [ContestError]);

  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message)
    }
  }, [isContestManagerError]);

  var Contest_name = ContestData?.contest.length === 1 ? ContestData?.contest[0].contest_name : "null"
  var Contest_type = ContestData?.contest.length === 1 ? ContestData?.contest[0].contest_type : "null"

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
          // style={{ width: 256 }}
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
            <FireOutlined />
            <Link to={`${url}/battle`}>对战</Link>
          </Menu.Item>

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
              <Menu.Item key="manageContest">
                <Link to={`${url}/manageContest`}>管理比赛</Link>
              </Menu.Item>
            </SubMenu>
          ) : null}
        </Menu>
      </Sider>
      <Content>
        <Row align="middle" justify="end">
          <Col span={4}>
            <Text strong>当前比赛：</Text>
            <Text>{Contest_name}</Text>
          </Col>
          <Col span={4}>
            <Text strong>比赛类型：</Text>
            <Text>{Contest_type === "Electronic-design" ? "电子设计大赛" : Contest_type}</Text>
          </Col>
          <Col span={4}>
            <Link to={`/contest`}>
              <Button
                css={`
            margin-top: 12px;
            margin-right: 24px;
          `}

                icon={<ArrowLeftOutlined />}
              >
                返回
              </Button>
            </Link>
          </Col>
        </Row>
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
          <AuthRoute exact path={`${path}/battle`}>
            <BattlePage />

          </AuthRoute>
          <AuthRoute exact path={`${path}/manageContest`}>
            <ManageContestPage />
          </AuthRoute>
          <AuthRoute>
            <NotFoundPage />
          </AuthRoute>
        </Switch>
        {/* </Contest_status.Provider> */}
      </Content>
    </Layout>
  );
};

export default MenuPage;
