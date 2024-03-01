import React, { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  HomeOutlined,
  TeamOutlined,
  FireOutlined,
  LockOutlined,
  ExperimentOutlined,
  FieldTimeOutlined,
  ContactsOutlined,
  BarsOutlined,
  RocketOutlined,
  UserSwitchOutlined,
  UploadOutlined,
  PlaySquareOutlined,
  RadarChartOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  TrophyOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  SettingOutlined,
  ReadOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Menu, Layout, message, Button } from "antd";
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
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";

//antd部件实例化
const { Sider, Content } = Layout;

const MenuPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  const userAgent = navigator.userAgent;
  const isMobile = userAgent.match(
    /(iPhone|iPod|Android|ios|iPad|AppleWebKit.*Mobile.*)/i,
  );
  const [collapsed, setCollapsed] = React.useState(isMobile ? true : false);

  const { data: isContestManagerData, error: isContestManagerError } =
    graphql.useQueryContestManagerSuspenseQuery({
      variables: {
        contest_id: Contest_id,
        user_id: user?.uuid,
      },
    });
  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message);
    }
  }, [isContestManagerError]);

  const items = [
    {
      key: "back",
      label: (
        <Link to={url.delete("contest").link("contest", "site")}>返回</Link>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: "home",
      label: "比赛详情",
      icon: <InfoCircleOutlined />,
      children: [
        {
          key: "intro",
          label: <Link to={url.link("intro")}>设定介绍</Link>,
          icon: <ReadOutlined />,
        },
        {
          key: "timeline",
          label: <Link to={url.link("timeline")}>时间节点</Link>,
          icon: <ScheduleOutlined />,
        },
        {
          key: "notice",
          label: <Link to={url.link("notice")}>公告与资源</Link>,
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "interface",
      label: "游玩时刻",
      icon: <FireOutlined />,
      children: [
        {
          key: "playground",
          label: <Link to={url.link("playground")}>试玩</Link>,
          icon: <ExperimentOutlined />,
        },
        {
          key: "stream",
          label: <Link to={url.link("stream")}>直播</Link>,
          icon: <PlaySquareOutlined />,
        },
        {
          key: "playback",
          label: <Link to={url.link("playback")}>回放</Link>,
          icon: <HistoryOutlined />,
        },
      ],
    },
    {
      key: "team",
      label: "现在报名",
      icon: <TeamOutlined />,
      children: [
        {
          key: "team-register",
          label: <Link to={url.link("team-register")}>创建队伍</Link>,
          icon: <RocketOutlined />,
        },
        {
          key: "team-join",
          label: <Link to={url.link("team-join")}>加入队伍</Link>,
          icon: <ContactsOutlined />,
        },
        {
          key: "team-manage",
          label: <Link to={url.link("team-manage")}>管理队伍</Link>,
          icon: <UserSwitchOutlined />,
        },
      ],
    },
    {
      key: "code",
      label: <Link to={url.link("code")}>代码提交</Link>,
      icon: <UploadOutlined />,
    },
    {
      key: "arena",
      label: "天梯试炼",
      icon: <TrophyOutlined />,
      children: [
        {
          key: "arena-score",
          label: <Link to={url.link("arena-score")}>积分榜</Link>,
          icon: <BarChartOutlined />,
        },
        {
          key: "arena-record",
          label: <Link to={url.link("arena-record")}>对战记录</Link>,
          icon: <FieldTimeOutlined />,
        },
        {
          key: "arena-analysis",
          label: <Link to={url.link("arena-analysis")}>数据分析</Link>,
          icon: <RadarChartOutlined />,
        },
      ],
    },
  ];

  const itemsAdmin = [
    {
      key: "admin",
      label: "管理员",
      icon: <LockOutlined />,
      children: [
        {
          key: "admin-manage",
          label: <Link to={url.link("admin-manage")}>管理队伍</Link>,
          icon: <SolutionOutlined />,
        },
        {
          key: "admin-setting",
          label: <Link to={url.link("admin-setting")}>比赛设置</Link>,
          icon: <SettingOutlined />,
        },
      ],
    },
  ];

  //渲染页面,switch类似c，用以切换url
  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        collapsible={true}
        collapsed={collapsed}
        collapsedWidth={50}
        trigger={
          <div
            css={`
              width: 100%;
              border-inline-end: 1px solid
                ${mode === "light"
                  ? `rgba(5, 5, 5, 0.06)`
                  : `rgba(253, 253, 253, 0.12)`};
            `}
          >
            <Button
              type="link"
              icon={<MenuOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          </div>
        }
        style={{
          height: "100%",
          position: "fixed",
          left: 0,
          top: "72px",
          bottom: 0,
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[url.page]}
          defaultSelectedKeys={["back"]}
          items={
            ["root", "counselor"].includes(user?.role!) ||
            isContestManagerData?.contest_manager.length === 1
              ? items.concat(itemsAdmin)
              : items
          }
          css={`
            height: 100%;
          `}
        />
      </Sider>
      <Content
        css={`
          margin-left: ${collapsed ? `50px` : `200px`};
        `}
      >
        <Routes>
          <Route path="intro" element={<IntroPage mode={mode} user={user} />} />

          <Route
            path="notice"
            element={<NoticePage mode={mode} user={user} />}
          />
          <Route
            path="team-register"
            element={<RegisterPage mode={mode} user={user} />}
          />
          <Route
            path="team-join"
            element={<JoinPage mode={mode} user={user} />}
          />
          <Route
            path="team-manage"
            element={<ManagePage mode={mode} user={user} />}
          />

          <Route
            path="arena-score"
            element={<ArenaPage mode={mode} user={user} />}
          />
          <Route
            path="arena-record"
            element={<RecordPage mode={mode} user={user} />}
          />
          <Route path="code" element={<CodePage mode={mode} user={user} />} />

          <Route
            path="playground"
            element={<PlaybackPage mode={mode} user={user} />}
          />
          <Route
            path="stream"
            element={<StreamPage mode={mode} user={user} />}
          />
          <Route
            path="playback"
            element={<PlaybackPage mode={mode} user={user} />}
          />

          <Route
            path="admin-manage"
            element={<ManageTeamsPage mode={mode} user={user} />}
          />
          <Route
            path="admin-setting"
            element={<SettingPage mode={mode} user={user} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default MenuPage;
