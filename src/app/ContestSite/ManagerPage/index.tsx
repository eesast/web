// 需要整合到此页面的功能有：

//* 1. 导出队伍信息（JoinPage.tsx）
// 2. 修改比赛信息（ListPage.tsx，已注释）
//* 3. 上传代码和天梯功能的开关（SettingPage.tsx）
//* 4. 开启单双循环赛的按钮和配置（SettingPage.tsx）
// 5. 复赛、决赛的得分展示（ManageTeamsPage.tsx）
//* 6. 队伍管理功能（ManageTeamsPage.tsx，考虑是否必要，可转化为统计数据）

// 注：除 NoticePage.tsx 上的管理员功能暂时保留，其余功能和页面在整合后均在原处删除

// 其他有需求的功能：

// 1. 比赛报名、组队情况和代码提交的统计数据
// 2. 复赛、决赛的轮赛进度和得分展示，以及表格导出功能（效仿天梯）
// 3. 比赛地图的添加和管理

// 锦上添花的功能：

// 1. 角色强度的统计分析
// 2. 在比赛记录基础上，允许一键重跑，在线观看回放、下载回放，甚至观看直播（效仿天梯）
// 3. 在线提交WebGL，同时更改是否允许试玩、回放、直播的开关
// 4. 加入在线地图编辑器
import React, { useEffect } from "react";
import { message } from "antd";
import { ContestProps } from "..";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import Forbidden from "@/app/Components/Forbidden";
import NotImplemented from "../Components/NotImplemented";
import SoftwareManager from "./SoftwareManager";
import THUAIManager from "./THUAIManager";
import HardwareManager from "./HardwareManager";
import RLManager from "./RLManager";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const getManagerType = (contestName?: string | null) => {
  const normalizedName = contestName?.trim().toUpperCase() || "";

  if (normalizedName.startsWith("SOFTWARE")) {
    return "SOFTWARE";
  }

  if (normalizedName.startsWith("RL")) {
    return "RL";
  }

  if (normalizedName.startsWith("HARD")) {
    return "HARD";
  }

  if (normalizedName.startsWith("THUAI")) {
    return "THUAI";
  }

  return null;
};

/* ---------------- 不随渲染刷新的组件 ---------------- */

const ManagerPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const { data: getContestManagersData, error: getContestManagersError } =
    graphql.useGetContestManagersSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  const { data: getContestNameData, error: getContestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  useEffect(() => {
    if (getContestManagersError) {
      message.error("管理员加载失败");
      console.log(getContestManagersError.message);
    }
  }, [getContestManagersError]);
  useEffect(() => {
    if (getContestNameError) {
      message.error("比赛信息加载失败");
      console.log(getContestNameError.message);
    }
  }, [getContestNameError]);

  const managerType = getManagerType(getContestNameData?.contest_by_pk?.name);
  const renderManagerPage = () => {
    switch (managerType) {
      case "SOFTWARE":
        return <SoftwareManager mode={mode} user={user} />;
      case "RL":
        return <RLManager mode={mode} user={user} />;
      case "HARD":
        return <HardwareManager mode={mode} user={user} />;
      case "THUAI":
        return <THUAIManager mode={mode} user={user} />;
      default:
        return <NotImplemented />;
    }
  };

  return getContestManagersData?.contest_by_pk?.contest_managers.some(
    (manager) => manager.user_uuid === user.uuid,
  ) ? (
    renderManagerPage()
  ) : (
    <Forbidden />
  );
};

export default ManagerPage;
