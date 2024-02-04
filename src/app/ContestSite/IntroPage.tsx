import { useEffect } from "react";
import { message } from "antd";
import { useUrl } from "../../api/hooks/url";
import Markdown from "react-markdown";
import * as graphql from "@/generated/graphql";
const IntroPage = () => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const { data: introData, error: introError } =
    graphql.useGetContestInfoSuspenseQuery({
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
