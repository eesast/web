import React, { useEffect, useState } from "react";
import Center from "../../components/Center";
import { message, Layout } from "antd";
// import { GetTeamName as GET_TEAMNAME } from "../../api/thuai.graphql";
// import { GetTeamName } from "../../api/types";
import { GetIntroContent as GET_INTRO_CONTENT } from "../../api/thuai.graphql";
import { GetIntroContentVariables, GetIntroContent } from "../../api/types";
import { useQuery } from "@apollo/client";
import md2wx from "md2wx";
const IntroPage = () => {
  // const { data: nameData } = useQuery<GetTeamName>(GET_TEAMNAME);
  // const team = nameData?.thuai[0].team_name;
  const [contentHtml, setContentHtml] = useState("");
  const { data: introData, error: introError } = useQuery<
    GetIntroContent,
    GetIntroContentVariables
  >(GET_INTRO_CONTENT, {
    variables: {
      id: 1,
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
    <Center>
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </Layout>
    </Center>
  );
};

export default IntroPage;
