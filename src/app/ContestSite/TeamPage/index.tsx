import React, { useEffect } from "react";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from "../.";

import ManagePage from "./ManagePage";
import JoinPage from "./JoinPage";

const IndexPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  //获取是否为某个队伍的成员
  const { data: ismemberData, refetch: refetchMember } =
    graphql.useIsTeamMemberSuspenseQuery({
      variables: {
        user_uuid: user?.uuid!,
        contest_id: Contest_id,
      },
    });

  const isMember = ismemberData?.contest_team_member[0];

  useEffect(() => {
    refetchMember();
  }, [refetchMember, isMember]);

  return !isMember ? (
    <JoinPage user={user} mode={mode} />
  ) : (
    <ManagePage user={user} mode={mode} />
  );
};

export default IndexPage;
