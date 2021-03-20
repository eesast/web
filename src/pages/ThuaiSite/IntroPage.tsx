import { useEffect, useState } from "react";
import { message, Layout } from "antd";
import { GetIntroContent as GET_INTRO_CONTENT } from "../../api/thuai.graphql";
import { GetIntroContentVariables, GetIntroContent } from "../../api/types";
import { useQuery } from "@apollo/client";
import md2wx from "md2wx";
const IntroPage = () => {
  const [contentHtml, setContentHtml] = useState("");
  const { data: introData, error: introError } = useQuery<
    GetIntroContent,
    GetIntroContentVariables
  >(GET_INTRO_CONTENT, {
    variables: {
      id: 3,
    },
  });
  useEffect(() => {
    if (introError) {
      message.error("加载失败");
    }
  }, [introError]);
  useEffect(() => {
    console.log("intro", introData);
    if (introData) {
      setContentHtml(md2wx.renderHtml(introData?.article[0].content!));
    }
  }, [introData]);
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
};

export default IntroPage;
