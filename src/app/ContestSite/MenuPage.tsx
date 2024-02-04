import React, { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  HomeOutlined,
  DatabaseOutlined,
  TeamOutlined,
  FireOutlined,
  LockOutlined,
  DoubleLeftOutlined,
  ExperimentOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "../../api/helpers/auth";
//antd的包
import { Menu, Layout, Typography, message } from "antd";
//以下为子分页
//import { contestProps } from "./index";
import IntroPage from "./IntroPage";
import NoticePage from "./NoticePage";
import RegisterPage from "./RegisterPage";
import JoinPage from "./JoinPage";
import ManagePage from "./ManagePage";
import ArenaPage from "./ArenaPage";
import RecordPage from "./RecordPage";
import CodePage from "./CodePage";
import PlaybackPage from "./PlaybackPage";
import StreamPage from "./StreamPage";
import ManageTeamsPage from "./ManageTeamsPage";
import SettingPage from "./SettingPage";
import NotFoundPage from "../Components/NotFound";
// hasura查询
//学长写好的api，用以没登陆会跳转到登陆页面
import { isMobileOnly } from "react-device-detect";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";

//antd部件实例化
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

const MenuPage: React.FC = () => {
  const userInfo = getUserInfo();

  const url = useUrl();
  const Contest_id = url.query.get("contest");

  const { data: isContestManagerData, error: isContestManagerError } =
    graphql.useQueryContestManagerSuspenseQuery({
      variables: {
        contest_id: Contest_id,
        user_id: userInfo?._id,
      },
    });
  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message);
    }
  }, [isContestManagerError]);

  //渲染页面,switch类似c，用以切换url
  return (
    <Layout>
      <Sider
        theme="light"
        collapsedWidth={0}
        collapsible={true}
        defaultCollapsed={isMobileOnly}
      >
        <Menu
          mode="inline"
          selectedKeys={[url.page]}
          defaultSelectedKeys={["back"]}
        >
          <Menu.Item key="back">
            <DoubleLeftOutlined />
            <Link to={url.delete("contest").link("contest", "site")}>返回</Link>
          </Menu.Item>
          <Menu.Item key="intro">
            <HomeOutlined />
            <Link to={url.link("intro")}>介绍</Link>
          </Menu.Item>
          <Menu.Item key="notice">
            <DatabaseOutlined />
            <Link to={url.link("notice")}>公告与资源</Link>
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
            <Menu.Item key="team-register">
              <Link to={url.link("team-register")}>创建</Link>
            </Menu.Item>
            <Menu.Item key="team-join">
              <Link to={url.link("team-join")}>加入</Link>
            </Menu.Item>
            <Menu.Item key="team-manage">
              <Link to={url.link("team-manage")}>管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="code">
            <CodeOutlined />
            <Link to={url.link("code")}>代码</Link>
          </Menu.Item>
          <SubMenu
            key="arena"
            title={
              <span>
                <FireOutlined />
                天梯
              </span>
            }
          >
            <Menu.Item key="arena-score">
              <Link to={url.link("arena-score")}>积分榜</Link>
            </Menu.Item>
            <Menu.Item key="arena-record">
              <Link to={url.link("arena-record")}>对战记录</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="lab"
            title={
              <span>
                <ExperimentOutlined />
                实验室
                <Text disabled> beta</Text>
              </span>
            }
          >
            <Menu.Item key="playground">
              <Link to={url.link("playground")}>试玩</Link>
            </Menu.Item>
            <Menu.Item key="stream">
              <Link to={url.link("stream")}>直播</Link>
            </Menu.Item>
            <Menu.Item key="playback">
              <Link to={url.link("playback")}>回放</Link>
            </Menu.Item>
          </SubMenu>

          {["root", "counselor"].includes(userInfo?.role!) ||
          isContestManagerData?.contest_manager.length === 1 ? (
            <SubMenu
              key="admin"
              title={
                <span>
                  <LockOutlined />
                  管理员
                </span>
              }
            >
              <Menu.Item key="admin-manage">
                <Link to={url.link("admin-manage")}>管理队伍</Link>
              </Menu.Item>
              <Menu.Item key="admin-setting">
                <Link to={url.link("admin-setting")}>比赛设置</Link>
              </Menu.Item>
            </SubMenu>
          ) : null}
        </Menu>
      </Sider>
      <Content>
        <Routes>
          <Route path="intro" element={<IntroPage />} />

          <Route path="notice" element={<NoticePage />} />
          <Route path="team-register" element={<RegisterPage />} />
          <Route path="team-join" element={<JoinPage />} />
          <Route path="team-manage" element={<ManagePage />} />

          <Route path="arena-score" element={<ArenaPage />} />
          <Route path="arena-record" element={<RecordPage />} />
          <Route path="code" element={<CodePage />} />

          <Route path="playground" element={<PlaybackPage />} />
          <Route path="stream" element={<StreamPage />} />
          <Route path="playback" element={<PlaybackPage />} />

          <Route path="admin-manage" element={<ManageTeamsPage />} />
          <Route path="admin-setting" element={<SettingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default MenuPage;
