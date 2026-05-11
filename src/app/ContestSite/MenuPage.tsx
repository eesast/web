import React, { useEffect, useRef, useState } from "react";
import { Layout, message } from "antd";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import MenuPageRoutes from "./Components/MenuPageRoutes";
import MenuPageSider, { MenuGuideRefs } from "./Components/MenuPageSider";
import MenuPageTour from "./Components/MenuPageTour";

const { Content } = Layout;
const isMobile = Boolean(
  navigator.userAgent.match(
    /(iPhone|iPod|Android|ios|iPad|AppleWebKit.*Mobile.*)/i,
  ),
);

const MenuPage: React.FC<ContestProps> = (props) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [collapsed, setCollapsed] = useState(isMobile);

  const guideRefs: MenuGuideRefs = {
    introRef: useRef<HTMLSpanElement>(null),
    playRef: useRef<HTMLSpanElement>(null),
    joinRef: useRef<HTMLAnchorElement>(null),
    codeRef: useRef<HTMLAnchorElement>(null),
    arenaRef: useRef<HTMLSpanElement>(null),
  };

  const { data: teamData } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: props.user.uuid,
      contest_id: Contest_id,
    },
  });
  const isMember = teamData?.contest_team_member?.length !== 0;

  const { data: getContestManagersData, error: getContestManagersError } =
    graphql.useGetContestManagersSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: contestData, error: contestError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  useEffect(() => {
    if (getContestManagersError) {
      message.error("管理员加载失败");
      console.log(getContestManagersError.message);
    }
  }, [getContestManagersError]);

  useEffect(() => {
    if (contestError) {
      message.error("比赛信息加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);

  const contest = contestData?.contest_by_pk;
  const isManager = Boolean(
    getContestManagersData?.contest_by_pk?.contest_managers.some(
      (manager) => manager.user_uuid === props.user.uuid,
    ),
  );

  return (
    <Layout>
      <MenuPageTour
        contestFullname={contest?.fullname}
        guideRefs={guideRefs}
        isMobile={isMobile}
      />
      <MenuPageSider
        mode={props.mode}
        url={url}
        contestName={contest?.name}
        isMember={isMember}
        isManager={isManager}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        guideRefs={guideRefs}
      />
      <Content
        css={`
          margin-left: ${collapsed ? `50px` : `200px`};
        `}
      >
        <MenuPageRoutes {...props} />
      </Content>
    </Layout>
  );
};

export default MenuPage;
