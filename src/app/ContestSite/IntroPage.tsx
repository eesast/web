import { useEffect } from "react";
import { message } from "antd";
import { GetContestInfo as GETCONTESTINFO } from "../../api/contest.graphql";
import { GetContestInfoVariables, GetContestInfo } from "../../api/types";
import { useQuery } from "@apollo/client";
import { useUrl } from "../../api/hooks/url";
import Markdown from "react-markdown";

const IntroPage = () => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
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

  return <Markdown>{introData?.contest[0].description}</Markdown>;
};

export default IntroPage;
