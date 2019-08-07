import {
  Button,
  Card,
  Descriptions,
  Form,
  Icon,
  Input,
  message,
  Modal
} from "antd";
import React, { useEffect } from "react";
import { IAppState, ITeam } from "../redux/types/state";
import { getTeams } from "../redux/actions/teams";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { WithRouterComponent } from "../types/WithRouterComponent";
import { FormComponentProps } from "antd/lib/form";
import { Link } from "react-router-dom";
import api from "../api";
import styles from "./EnrollPage.module.css";

interface IEnrollPageStateProps {
  loggedIn: boolean;
  token?: string;
  fetching: boolean;
  inviteCode?: string;
  error?: Error | null;
  teams: ITeam[];
}

interface IEnrollPageDispatchProps {
  getTeams: (self: boolean) => void;
}

type IEnrollPageProps = IEnrollPageStateProps & IEnrollPageDispatchProps;

const EnrollPage: React.FC<
  WithRouterComponent<{}, IEnrollPageProps>
> = props => {
  const { loggedIn, token, error, teams, getTeams } = props;

  useEffect(() => {
    getTeams(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      message.error("队伍信息加载失败");
    }
  }, [error]);

  if (loggedIn) {
    if (!teams.length) {
      return (
        <div className={styles.root}>
          <Card className={styles.card}>
            <WrappedEnrollForm token={token || ""} props={props} />
          </Card>
        </div>
      );
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
          <Card className={styles.card}>
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

function mapStateToProps(state: IAppState): IEnrollPageStateProps {
  return {
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
    fetching: state.teams.fetching,
    error: state.teams.error,
    teams: state.teams.items
  };
}

const mapDispatchToProps: IEnrollPageDispatchProps = {
  getTeams
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EnrollPage)
);

interface IEnrollFormProps extends FormComponentProps {
  props: WithRouterComponent<{}, {}>;
  token: string;
}

const EnrollForm: React.FC<IEnrollFormProps> = ({ form, props, token }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err && values.name && values.description) {
        try {
          const inviteCode = await api.newTeam(
            values.name,
            values.description,
            1,
            token
          );
          Modal.success({
            title: "队伍创建成功",
            content: <div>邀请码：{inviteCode}</div>
          });
          props.history.push({ pathname: "/thuedc" });
          props.history.replace({ pathname: "/thuedc/enroll" });
        } catch (error) {
          if (
            error.response.data === "409 Conflict: Team name already exists"
          ) {
            Modal.error({
              title: "队伍名称已被注册"
            });
          } else if (
            error.response.data === "409 Conflict: User is already in a team"
          ) {
            Modal.error({
              title: "用户已加入队伍"
            });
          } else {
            Modal.error({
              title: "队伍创建失败"
            });
          }
        }
      }
    });
  };

  return (
    <Form>
      <Form.Item label="队伍名称">
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "请输入队伍名称" }]
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
      <Form.Item label="队伍简介">
        {getFieldDecorator("description", {
          rules: [{ required: true, message: "请输入队伍简介" }]
        })(
          <Input.TextArea
            autosize={{ minRows: 5, maxRows: 10 }}
            autoComplete="on"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Link replace to="/thuedc/teams/join" style={{ float: "right" }}>
          加入队伍
        </Link>
      </Form.Item>
      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          创建队伍
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedEnrollForm = Form.create<IEnrollFormProps>()(EnrollForm);
