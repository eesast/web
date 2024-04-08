import React from "react";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from "../.";
import Loading from "@/app/Components/Loading";
import ManagePage from "./ManagePage";
import JoinPage from "./JoinPage";

export interface TeamProps extends ContestProps {
  refresh: () => void;
}

const IndexPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  //获取是否为某个队伍的成员
  const { data: teamData, refetch: refetchTeam } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: user?.uuid!,
      contest_id: Contest_id,
    },
  });

  const isMember = teamData?.contest_team_member?.length !== 0;
  return teamData ? (
    isMember ? (
      <ManagePage mode={mode} user={user} refresh={refetchTeam} />
    ) : (
      <JoinPage mode={mode} user={user} refresh={refetchTeam} />
    )
  ) : (
    <Loading />
  );
};

export default IndexPage;
