import { useEffect } from "react";
import { message } from "antd";
import { useUrl } from "../../api/hooks/url";
import Markdown from "react-markdown";
import * as graphql from "../../generated/graphql";
/* ---------------- 主页面 ---------------- */
const IntroPage = () => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
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
  return <Markdown>{introData?.contest[0].description}</Markdown>;
};

export default IntroPage;
