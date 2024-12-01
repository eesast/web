import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  HomeOutlined,
  TeamOutlined,
  FireOutlined,
  SettingOutlined,
  ExperimentOutlined,
  FieldTimeOutlined,
  BarsOutlined,
  UploadOutlined,
  PlaySquareOutlined,
  RadarChartOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  TrophyOutlined,
  ReadOutlined,
  MenuOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Layout,
  message,
  Button,
  MenuProps,
  Tour,
  TourProps,
} from "antd";
//以下为子分页
import IntroPage from "./IntroPage";
import NoticePage from "./NoticePage";
import TeamPage from "./TeamPage";
import ArenaPage from "./ArenaPage";
import RecordPage from "./RecordPage";
import CodePage from "./CodePage";
import PlaybackPage from "./PlaybackPage";
import StreamPage from "./StreamPage";
import NotFound from "../Components/NotFound";
import AnalysisPage from "./AnalysisPage";
import ManagerPage from "./ManagerPage";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import PlaygroundPage from "./PlaygroundPage";
import Authenticate, { userRoles } from "../Components/Authenticate";
import Loading from "../Components/Loading";

const StreamNativePage = lazy(() => import("./StreamNativePage"));

/* ---------------- 不随渲染刷新的组件 ---------------- */
const { Sider, Content } = Layout;
const submenuKeys = ["home", "game", "team", "arena"];
const userAgent = navigator.userAgent;
const isMobile = userAgent.match(
  /(iPhone|iPod|Android|ios|iPad|AppleWebKit.*Mobile.*)/i,
);
/* ---------------- 主⻚⾯ ---------------- */
const MenuPage: React.FC<ContestProps> = (props) => {
  /* ---------------- States 和引⼊的 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const introRef = useRef(null);
  const playRef = useRef(null);
  const joinRef = useRef(null);
  const codeRef = useRef(null);
  const arenaRef = useRef(null);
  const [collapsed, setCollapsed] = React.useState(isMobile ? true : false);
  const [openKeys, setOpenKeys] = useState(() => {
    //从sessionStorage中获取openKeys
    const keys = sessionStorage.getItem("openKeys");
    if (keys) {
      return JSON.parse(keys);
    }
    return [];
  });
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  //获取是否为某个队伍的成员
  const { data: teamData } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: props.user.uuid,
      contest_id: Contest_id,
    },
  });
  const isMember = teamData?.contest_team_member?.length !== 0;

  const { data: getContestManagersData, error: getContestManagersError } =
    graphql.useGetContestManagersSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: contestData, error: contestError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    if (getContestManagersError) {
      message.error("管理员加载失败");
      console.log(getContestManagersError.message);
    }
  }, [getContestManagersError]);

  useEffect(() => {
    if (contestError) {
      message.error("比赛信息加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);
  /* ---------------- 业务逻辑函数 ---------------- */
  const linkToRule = `https://docs.eesast.com/docs/contests/${contestData?.contest_by_pk?.name}`;

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
      label: (
        <span>
          <span ref={introRef}>带你了解</span>
        </span>
      ),
      icon: <RocketOutlined />,
      children: [
        {
          key: "intro",
          label: <Link to={url.link("intro")}>赛事详情</Link>,
          icon: <InfoCircleOutlined />,
        },
        {
          key: "rule",
          label: (
            <a href={linkToRule} target="_blank" rel="noreferrer">
              比赛规则
            </a>
          ),
          icon: <ReadOutlined />,
        },
        {
          key: "notice",
          label: <Link to={url.link("notice")}>公告与资源</Link>,
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "game",
      label: (
        <span>
          <span ref={playRef}>游玩时刻</span>
        </span>
      ),
      icon: <FireOutlined />,
      children: [
        {
          key: "playground",
          label: <Link to={url.link("playground")}>试玩</Link>,
          icon: <ExperimentOutlined />,
        },
        contestData?.contest_by_pk?.name === "THUAI6"
          ? {
              key: "stream-native",
              label: <Link to={url.link("stream-native")}>直播</Link>,
              icon: <PlaySquareOutlined />,
            }
          : {
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
      label: (
        <Link to={url.link("team")} ref={joinRef}>
          {isMember ? "我的队伍" : "现在报名"}
        </Link>
      ),
      icon: <TeamOutlined />,
    },
    {
      key: "code",
      label: (
        <Link to={url.link("code")} ref={codeRef}>
          代码提交
        </Link>
      ),
      icon: <UploadOutlined />,
    },
    {
      key: "arena",
      label: (
        <span>
          <span ref={arenaRef}>天梯试炼</span>
        </span>
      ),
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
      key: "manager",
      label: <Link to={url.link("manager")}>管理员</Link>,
      icon: <SettingOutlined />,
    },
  ];

  const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && submenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const steps: TourProps["steps"] = [
    {
      title: contestData?.contest_by_pk?.fullname,
      description:
        "欢迎参加" +
        contestData?.contest_by_pk?.fullname +
        "比赛！下面让我来帮助你熟悉赛事互动页面，帮助你更好地参加比赛吧！",
      target: null,
      mask: {
        style: {
          backdropFilter: "blur(8px)",
        },
      },
    },
    {
      title: "带你了解",
      description:
        "在这里，你可以查看比赛的基本介绍、时间安排和比赛公告，请及时关注~",
      placement: "right",
      target: () => introRef.current,
    },
    {
      title: "游玩时刻",
      description:
        "在这里，你可以试玩我们的游戏，还可以观看比赛直播和比赛回放！",
      placement: "right",
      target: () => playRef.current,
    },
    {
      title: "现在报名",
      description: "在这里，你可以选择自己创建队伍或者加入别人的队伍~",
      placement: "right",
      target: () => joinRef.current,
    },
    {
      title: "代码提交",
      description: "比赛的代码在这里提交~",
      placement: "right",
      target: () => codeRef.current,
    },
    {
      title: "天梯试炼",
      description:
        "在这里，你可以查看比赛的积分榜，查看队伍的对战记录，甚至还有专属于你们队伍的数据分析！",
      placement: "right",
      target: () => arenaRef.current,
    },
    // {
    //   title: "游玩时刻",
    //   description: "下面让我们跳转到试玩界面一探究竟吧！",
    //   placement: "right",
    //   target: () => playRef.current,
    // },
  ];

  const TourGuide = () => {
    const [open, setOpen] = useState<boolean>(
      localStorage.getItem("tour_contest") !== "true" &&
        process.env.NODE_ENV !== "development",
    );
    return (
      <Tour
        open={open && !isMobile}
        onClose={() => {
          setOpen(false);
          localStorage.setItem("tour_contest", "true");
          //navigate(url.link("playground"));
        }}
        steps={steps}
      />
    );
  };
  //渲染页面,switch类似c，用以切换url
  return (
    <Layout>
      <TourGuide />
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
                ${props.mode === "light"
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
          zIndex: 98,
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[url.page]}
          defaultSelectedKeys={["back"]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          items={
            getContestManagersData?.contest_by_pk?.contest_managers.some(
              (manager) => manager.user_uuid === props.user.uuid,
            )
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
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="intro" element={<IntroPage {...props} />} />
            <Route path="notice" element={<NoticePage {...props} />} />

            <Route path="playground" element={<PlaygroundPage {...props} />} />
            <Route path="stream" element={<StreamPage {...props} />} />
            <Route
              path="stream-native"
              element={<StreamNativePage {...props} />}
            />
            <Route path="playback" element={<PlaybackPage {...props} />} />

            <Route
              path="team"
              element={
                <Authenticate role={userRoles} user={props.user}>
                  <TeamPage {...props} />
                </Authenticate>
              }
            />
            <Route
              path="code"
              element={
                <Authenticate role={userRoles} user={props.user}>
                  <CodePage {...props} />
                </Authenticate>
              }
            />

            <Route path="arena-score" element={<ArenaPage {...props} />} />
            <Route path="arena-record" element={<RecordPage {...props} />} />
            <Route
              path="arena-analysis"
              element={
                <Authenticate role={userRoles} user={props.user}>
                  <AnalysisPage {...props} />
                </Authenticate>
              }
            />
            <Route path="manager" element={<ManagerPage {...props} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default MenuPage;
