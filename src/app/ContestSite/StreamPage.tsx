import { useEffect } from "react";
import React from "react";
import { useUrl } from "../../api/hooks/url";
import { ContestProps } from ".";
import * as graphql from "@/generated/graphql";
import { message } from "antd";
import NotImplemented from "./Components/NotImplemented";
import Loading from "../Components/Loading";
import THUAI6 from "./Components/THUAI6/StreamNative";
import THUAI7 from "./Components/THUAI7/StreamWebGL";

export interface StreamProps {
  streamUrl: string;
}

const StreamPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const contest = url.query.get("contest");

  const { data: contestNameData, error: contestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: contest,
      },
    });
  useEffect(() => {
    if (contestNameError) {
      message.error("获取比赛信息失败");
      console.log(contestNameError.message);
    }
  });

  const { data: contestSwitchData, error: contestSwitchError } =
    graphql.useGetContestSwitchQuery({
      variables: {
        contest_id: contest,
      },
    });
  useEffect(() => {
    if (contestSwitchError) {
      message.error("获取比赛状态失败");
      console.log(contestSwitchError.message);
    }
  });

  const url_dev = url.query.get("url");
  const streamUrl = url_dev
    ? `http://${url_dev}`
    : "https://api.eesast.com:8879";

  const Stream = () => {
    const contestName = contestNameData?.contest_by_pk?.name;
    if (contestName === "THUAI6") {
      return <THUAI6 streamUrl={streamUrl} />;
    } else if (contestName === "THUAI7") {
      return <THUAI7 streamUrl={streamUrl} />;
    } else return <NotImplemented />;
  };

  return contestSwitchData ? (
    contestSwitchData?.contest_by_pk?.stream_switch ? (
      <Stream />
    ) : (
      <NotImplemented />
    )
  ) : (
    <Loading />
  );
};

export default StreamPage;
