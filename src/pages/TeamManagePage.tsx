import React, { useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { IAppState, ITeam } from "../redux/types/state";
import { connect } from "react-redux";
// import { FormComponentProps } from "antd/lib/form";
import { getTeams, getContestId } from "../redux/actions/teams";
import { message, Card, Descriptions } from "antd";
import { WithRouterComponent } from "../types/WithRouterComponent";
import styles from "./TeamManagePage.module.css";

interface ITeamManagePageStateProps {
  loggedIn: boolean;
  teams: ITeam[];
  fetching: boolean;
  token?: string;
  contestId?: number;
  error?: Error | null;
}

interface ITeamManagePageDispatchProps {
  getTeams: (self: boolean, type: string, year: number) => void;
  getContestId: (type: string, year: number) => void;
}

type ITeamManagePageProps = ITeamManagePageDispatchProps &
  ITeamManagePageStateProps;

const TeamManagePage: React.FC<
  WithRouterComponent<{}, ITeamManagePageProps>
> = props => {
  const { loggedIn, teams, fetching, error, getTeams } = props;

  useEffect(() => {
    getTeams(true, "电设", 2019);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      message.error("队伍信息加载失败");
    }
  }, [error]);

  if (loggedIn) {
    if (!teams.length) {
      return <Redirect to={"/thuedc/teams/join"} />;
    } else {
      const {
        name,
        description,
        inviteCode,
        leaderUsername,
        membersUsername = []
      } = teams[0];

      return (
        <div className={styles.root}>
          <Card className={styles.card} loading={fetching}>
            <Descriptions title="队伍信息" column={4}>
              <Descriptions.Item label="队名">{name}</Descriptions.Item>
              <Descriptions.Item label="邀请码">{inviteCode}</Descriptions.Item>
              <Descriptions.Item label="队长">
                {leaderUsername}
              </Descriptions.Item>
              <Descriptions.Item label="队员">
                {membersUsername!.join(", ")}
              </Descriptions.Item>
              <Descriptions.Item label="队伍简介">
                {description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      );
    }
  } else {
    return <Redirect to={"/login"} />;
  }
};

function mapStateToProps(state: IAppState): ITeamManagePageStateProps {
  return {
    loggedIn: state.auth.loggedIn,
    teams: state.teams.items,
    fetching: state.teams.fetching,
    token: state.auth.token,
    contestId: state.teams.contestId,
    error: state.teams.error
  };
}

const mapDispatchToProps: ITeamManagePageDispatchProps = {
  getTeams,
  getContestId
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeamManagePage)
);

// interface ITeamManageFormProps extends FormComponentProps {
//   props: WithRouterComponent<{}, ITeamManagePageProps>;
//   token: string;
//   contestId?: number;
// }
