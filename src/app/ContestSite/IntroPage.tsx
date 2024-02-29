import { useEffect, useState } from "react";
import { message } from "antd";
import { useUrl } from "../../api/hooks/url";
import Markdown from "react-markdown";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
/* ---------------- 主页面 ---------------- */
const IntroPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [mode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light",
  );

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: introData, error: introError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (introError) {
      message.error("简介加载失败");
    }
  }, [introError]);
  /* ---------------- 页面组件 ---------------- */
  return (
    <div style={{ 
      border: "0px solid #ccc", 
      padding: "50px", 
      color: mode === 'dark' ? 'white' : 'initial' 
    }}>
      <Markdown>{introData?.contest[0].description}</Markdown>
    </div>
  );
};

export default IntroPage;
