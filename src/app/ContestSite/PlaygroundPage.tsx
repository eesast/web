import React, { useEffect } from "react";
import { ContestProps } from ".";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import NotImplemented from "./Components/NotImplemented";
import { message } from "antd";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaygroundPage: React.FC<ContestProps> = ({ mode, user }) => {
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

  const projectUrl =
    process.env.REACT_APP_STATIC_URL! +
    `/public/WebGL/${contestNameData?.contest_by_pk?.name ?? "Jump"}/`;
  const projectName = "Playground";

  return contestSwitchData?.contest_by_pk?.playground_switch ? (
    // TODO: Copy from PlaybackPage.tsx
    <div>
      <h1>Playground for THUAI7, not implemented yet.</h1>
      <br />
      <p>Project URL: {projectUrl}</p>
      <br />
      <p>Project Name: {projectName}</p>
    </div>
  ) : (
    <Container>
      <NotImplemented />
    </Container>
  );
};

export default PlaygroundPage;
