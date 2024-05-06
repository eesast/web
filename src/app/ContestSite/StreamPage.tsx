import { lazy, useEffect } from "react";
import React from "react";
import { useUrl } from "../../api/hooks/url";
import { ContestProps } from ".";
import * as graphql from "@/generated/graphql";
import { message } from "antd";
import NotImplemented from "./Components/NotImplemented";
import Loading from "../Components/Loading";

const THUAI6 = lazy(() => import("./Components/THUAI6/StreamNative"));
const THUAI7 = lazy(() => import("./Components/THUAI7/StreamWebGL"));

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

  const streamUrl = url.query.get("url") ?? "https://live.eesast.com/";
  const port = url.query.get("port") ?? "";

  const Stream = () => {
    const contestName = contestNameData?.contest_by_pk?.name;
    if (contestName === "THUAI6") {
      return <THUAI6 streamUrl={streamUrl + port} />;
    } else if (contestName === "THUAI7") {
      return <THUAI7 streamUrl={streamUrl + port} />;
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
