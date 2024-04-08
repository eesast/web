import { useState, useEffect } from "react";
import React from "react";
import { useUrl } from "../../api/hooks/url";
import { ContestProps } from ".";
import THUAI6 from "./Components/THUAI6/StreamNative";
import * as graphql from "@/generated/graphql";
import { message } from "antd";
import NotImplemented from "./Components/NotImplemented";
import Loading from "../Components/Loading";

export interface StreamProps {
  url: string;
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
    graphql.useGetContestSwitchSubscription({
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

  const [streamUrl, setStreamUrl] = useState<string>(
    "https://api.eesast.com:8879",
  );
  if (url.query.get("url") !== null) {
    setStreamUrl("http://" + url.query.get("url"));
  }

  const Stream = (props: StreamProps) => {
    if (contestNameData?.contest_by_pk?.name === "THUAI6")
      return <THUAI6 url={props.url} />;
    else return <NotImplemented />;
  };

  return contestSwitchData ? (
    contestSwitchData?.contest_by_pk?.stream_switch ? (
      <Stream url={streamUrl} />
    ) : (
      <NotImplemented />
    )
  ) : (
    <Loading />
  );
};

export default StreamPage;
