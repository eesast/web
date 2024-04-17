import React, { useEffect } from "react";
import { message } from "antd";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import NotImplemented from "./Components/NotImplemented";
import Loading from "../Components/Loading";
import THUAI6 from "./Components/THUAI6/PlaybackWebGL";
import THUAI7 from "./Components/THUAI7/PlaybackWebGL";

const PlaybackPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  const { data: contestNameData, error: contestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: Contest_id,
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
        contest_id: Contest_id,
      },
    });
  useEffect(() => {
    if (contestSwitchError) {
      message.error("获取比赛状态失败");
      console.log(contestSwitchError.message);
    }
  });

  const Playback = () => {
    if (contestNameData?.contest_by_pk?.name === "THUAI6") return <THUAI6 />;
    else if (contestNameData?.contest_by_pk?.name === "THUAI7")
      return <THUAI7 />;
    else return <NotImplemented />;
  };

  return contestSwitchData ? (
    contestSwitchData?.contest_by_pk?.playback_switch ? (
      <Playback />
    ) : (
      <NotImplemented />
    )
  ) : (
    <Loading />
  );
};

export default PlaybackPage;
