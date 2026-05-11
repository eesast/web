import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { Button, Layout, Menu, MenuProps } from "antd";
import { ContestProps } from "..";
import { Url } from "../../../api/hooks/url";

const { Sider } = Layout;
const submenuKeys = ["home", "game", "team", "arena"];

export interface MenuGuideRefs {
  introRef: React.RefObject<HTMLSpanElement>;
  playRef: React.RefObject<HTMLSpanElement>;
  joinRef: React.RefObject<HTMLAnchorElement>;
  codeRef: React.RefObject<HTMLAnchorElement>;
  arenaRef: React.RefObject<HTMLSpanElement>;
}

type MenuItem = NonNullable<MenuProps["items"]>[number];

interface MenuPageSiderProps {
  mode: ContestProps["mode"];
  url: Url;
  contestName?: string | null;
  isMember: boolean;
  isManager: boolean;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  guideRefs: MenuGuideRefs;
}

const getBackItem = (url: Url): MenuItem => ({
  key: "back",
  label: <Link to={url.delete("contest").link("contest", "site")}>返回</Link>,
  icon: <HomeOutlined />,
});

const getTeamItem = (
  url: Url,
  isMember: boolean,
  guideRefs: MenuGuideRefs,
) => ({
  key: "team",
  label: (
    <Link to={url.link("team")} ref={guideRefs.joinRef}>
      {isMember ? "我的队伍" : "现在报名"}
    </Link>
  ),
  icon: <TeamOutlined />,
});

const getCodeItem = (url: Url, guideRefs: MenuGuideRefs): MenuItem => ({
  key: "code",
  label: (
    <Link to={url.link("code")} ref={guideRefs.codeRef}>
      代码提交
    </Link>
  ),
  icon: <UploadOutlined />,
});

const getHomeItem = (
  url: Url,
  contestName: string,
  guideRefs: MenuGuideRefs,
): MenuItem => {
  const linkToRule = `https://docs.eesast.com/docs/contests/${contestName}`;

  return {
    key: "home",
    label: (
      <span>
        <span ref={guideRefs.introRef}>带你了解</span>
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
  };
};

const getGameItem = (
  url: Url,
  contestName: string,
  guideRefs: MenuGuideRefs,
): MenuItem => ({
  key: "game",
  label: (
    <span>
      <span ref={guideRefs.playRef}>游玩时刻</span>
    </span>
  ),
  icon: <FireOutlined />,
  children: [
    {
      key: "playground",
      label: <Link to={url.link("playground")}>试玩</Link>,
      icon: <ExperimentOutlined />,
    },
    contestName === "THUAI6"
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
});

const getArenaItem = (url: Url, guideRefs: MenuGuideRefs): MenuItem => ({
  key: "arena",
  label: (
    <span>
      <span ref={guideRefs.arenaRef}>天梯试炼</span>
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
});

const getContestMenuItems = (
  url: Url,
  contestName: string,
  isMember: boolean,
  guideRefs: MenuGuideRefs,
): MenuItem[] => {
  const homeItem = getHomeItem(url, contestName, guideRefs);
  const teamItem = getTeamItem(url, isMember, guideRefs);
  const codeItem = getCodeItem(url, guideRefs);
  const arenaItem = getArenaItem(url, guideRefs);

  if (contestName.startsWith("SOFT")) {
    return [getBackItem(url), teamItem, codeItem];
  }

  if (contestName.startsWith("HARD")) {
    return [getBackItem(url), teamItem];
  }

  if (contestName.startsWith("RL")) {
    const rlScoreItem: MenuItem = {
      key: "rl-score",
      label: <Link to={url.link("rl-score")}>积分榜</Link>,
      icon: <TrophyOutlined />,
    };
    return [homeItem, teamItem, codeItem, rlScoreItem];
  }

  return [
    getBackItem(url),
    homeItem,
    getGameItem(url, contestName, guideRefs),
    teamItem,
    codeItem,
    arenaItem,
  ];
};

const getAdminMenuItems = (url: Url): MenuItem[] => [
  {
    key: "manager",
    label: <Link to={url.link("manager")}>管理员</Link>,
    icon: <SettingOutlined />,
  },
];

const MenuPageSider: React.FC<MenuPageSiderProps> = ({
  mode,
  url,
  contestName,
  isMember,
  isManager,
  collapsed,
  onCollapsedChange,
  guideRefs,
}) => {
  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    const keys = sessionStorage.getItem("openKeys");
    return keys ? JSON.parse(keys) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
  }, [openKeys]);

  const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && submenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const items = getContestMenuItems(
    url,
    contestName || "",
    isMember,
    guideRefs,
  );
  const menuItems = isManager ? items.concat(getAdminMenuItems(url)) : items;

  return (
    <Sider
      theme="light"
      breakpoint="lg"
      onBreakpoint={onCollapsedChange}
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
              onCollapsedChange(!collapsed);
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
        items={menuItems}
        css={`
          height: 100%;
        `}
      />
    </Sider>
  );
};

export default MenuPageSider;
