import { useEffect, useState } from "react";
import { message, Layout } from "antd";
import { GetContestInfo as GETCONTESTINFO } from "../../api/contest.graphql";
import { GetContestInfoVariables, GetContestInfo } from "../../api/types";
import { useQuery } from "@apollo/client";
import md2wx from "md2wx";
import { useUrl } from "../../api/hooks/url";

const IntroPage = () => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [contentHtml, setContentHtml] = useState("");
  const { data: introData, error: introError } = useQuery<
    GetContestInfo,
    GetContestInfoVariables
  >(GETCONTESTINFO, {
    variables: {
      contest_id: Contest_id,
    },
  });
  useEffect(() => {
    if (introError) {
      message.error("简介加载失败");
    }
  }, [introError]);
  useEffect(() => {
    if (introData) {
      var contest_intro = introData?.contest[0].description;
      if (contest_intro) {
        setContentHtml(md2wx.renderHtml(contest_intro));
      } else {
        setContentHtml(md2wx.renderHtml("NULL"));
      }
    }
  }, [introData]);
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
};

export default IntroPage;
