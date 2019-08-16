import React, { useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { IAppState, ITeam } from "../redux/types/state";
import { connect } from "react-redux";
import { FormComponentProps } from "antd/lib/form";
import { getTeams, getContestId } from "../redux/actions/teams";
import { message, Card, Form, Input, Icon, Row, Button } from "antd";
import { WithRouterComponent } from "../types/WithRouterComponent";
import styles from "./TeamManagePage.module.css";

interface ITeamManagePageStateProps {
  loggedIn: boolean;
  teams: ITeam[];
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
  const { loggedIn, teams, token, contestId, error, getTeams } = props;

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
      return (
        <div className={styles.root}>
          <Card className={styles.card}>
            <WrappedTeamManageForm
              token={token || ""}
              contestId={contestId}
              props={props}
            />
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

interface ITeamManageFormProps extends FormComponentProps {
  props: WithRouterComponent<{}, ITeamManagePageProps>;
  token: string;
  contestId?: number;
}

const TeamManageForm: React.FC<ITeamManageFormProps> = ({
  form,
  props,
  token,
  contestId
}) => {
  const {
    name,
    description,
    inviteCode,
    leaderUsername,
    membersUsername = []
  } = props.teams[0];

  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <Form {...formItemLayout}>
      <Form.Item label="队伍名称">
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "请输入队伍名称!" }],
          initialValue: name
        })(
          <Input
            prefix={<Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />}
            style={{ width: "30%" }}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="on"
          />
        )}
      </Form.Item>
      <Row>
        <Form.Item label="邀请码">
          <span>{inviteCode}</span>
        </Form.Item>
        <Form.Item label="队长">
          <span>{leaderUsername}</span>
        </Form.Item>
      </Row>
      <Form.Item label="队员">
        <span>{membersUsername!.join(", ")}</span>
      </Form.Item>
      <Form.Item label="队伍简介">
        {getFieldDecorator("description", {
          rules: [{ required: true, message: "请输入队伍简介!" }],
          initialValue: description
        })(
          <Input.TextArea
            autosize={{ minRows: 5, maxRows: 10 }}
            autoComplete="on"
          />
        )}
      </Form.Item>
      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary">确认修改</Button>
      </Form.Item>
    </Form>
  );
};

const WrappedTeamManageForm = Form.create<ITeamManageFormProps>()(
  TeamManageForm
);
