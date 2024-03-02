import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MenuPage from "./MenuPage";
import dayjs from "dayjs";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";
import ListPage from "./ListPage";

/* ---------------- 接口和类型定义 ---------------- */
export interface ContestProps extends PageProps {
  // contest: string | null;
}

/* ---------------- 不随渲染刷新的常量 ---------------- */
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
/* ---------------- 不随渲染刷新的组件 ---------------- */
/* ---------------- 主页面 ---------------- */
const ContestSite: React.FC<PageProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  /* ---------------- useEffect ---------------- */
  /* ---------------- 业务逻辑函数 ---------------- */
  /* ---------------- 随渲染刷新的组件 ---------------- */
  /* ---------------- 页面组件 ---------------- */
  return (
    <Routes>
      <Route path="/" element={<Navigate to={url.link("list")} />} />
      <Route path="list" element={<ListPage mode={mode} user={user} />} />
      <Route path="*" element={<MenuPage mode={mode} user={user} />} />
    </Routes>
  );
};

export default ContestSite;
