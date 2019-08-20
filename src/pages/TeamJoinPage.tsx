import {
  Button,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  List,
  Row,
  Col,
  Collapse
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import api from "../api";
import { WithRouterComponent } from "../types/WithRouterComponent";
import { IAppState, ITeam, IUser } from "../redux/types/state";
import { getTeams, sortTeams, getContestId } from "../redux/actions/teams";
import styles from "./EnrollPage.module.css";

import { FormComponentProps } from "antd/lib/form";

interface ITeamJoinPageStateProps {
  loggedIn: boolean;
  token?: string;
  fetching: boolean;
  contestId?: number;
  user: IUser;
  teams: ITeam[];
  error?: Error | null;
}

interface ITeamJoinPageDispatchProps {
  getTeams: (self: boolean, type: string, year: number) => void;
  sortTeams: (rule: string) => void;
  getContestId: (type: string, year: number) => void;
}

type ITeamJoinPageProps = ITeamJoinPageStateProps & ITeamJoinPageDispatchProps;

const TeamJoinPage: React.FC<
  WithRouterComponent<{}, ITeamJoinPageProps>
> = props => {
  const { token, fetching, user, teams, getTeams, error } = props;

  useEffect(() => {
    getTeams(false, "电设", 2019);
  }, []);

  useEffect(() => {
    if (error) {
      message.error("队伍信息加载失败");
    }
  }, [error]);

  const { Panel } = Collapse;
  const [visible, setVisible] = useState(false);
  const [teamId, setTeamId] = useState(0);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleJoin = () => {
    setVisible(false);
  };

  return (
    <div>
      <List
        className={styles.teamList}
        itemLayout="vertical"
        split={false}
        loading={fetching}
        pagination={{
          onChange: page => {},
          pageSize: 5
        }}
        dataSource={teams}
        renderItem={(item: ITeam) => (
          <List.Item key={item.id}>
            <Collapse accordion expandIconPosition="right">
              <Panel header={item.name} key={item.id}>
                <Descriptions title="队伍信息" column={3}>
                  <Descriptions.Item label="队名">
                    {item.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="队长">
                    {item.leaderUsername}
                  </Descriptions.Item>
                  <Descriptions.Item label="队员">
                    {item.membersUsername!.join(", ")}
                  </Descriptions.Item>
                  <Descriptions.Item label="队伍简介">
                    {item.description}
                  </Descriptions.Item>
                </Descriptions>
                <Row type="flex" justify="center">
                  {/* <Col span={6}>
                      <Input placeholder="填写邀请码" allowClear onChange={setInput} />
                    </Col> */}
                  <Col span={8}>
                    <Button
                      type="primary"
                      onClick={() => {
                        setTeamId(item.id);
                        showModal();
                      }}
                    >
                      加入队伍
                    </Button>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </List.Item>
        )}
      />
      <WrappedTeamJoinForm
        teamId={teamId}
        id={user.id}
        token={token || ""}
        visible={visible}
        onCancel={handleCancel}
        onJoin={handleJoin}
      />
    </div>
  );
};

function mapStateToProps(state: IAppState): ITeamJoinPageStateProps {
  return {
    loggedIn: state.auth.loggedIn,
    fetching: state.teams.fetching,
    contestId: state.teams.contestId,
    token: state.auth.token,
    user: state.auth.user!,
    error: state.teams.error,
    teams: state.teams.items
  };
}

const mapDispatchToProps: ITeamJoinPageDispatchProps = {
  getTeams,
  sortTeams,
  getContestId
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeamJoinPage)
);

interface ITeamJoinFormProps extends FormComponentProps {
  teamId: number;
  id: number;
  token: string;
  visible: boolean;
  onCancel: () => void;
  onJoin: () => void;
}

const TeamJoinForm: React.FC<ITeamJoinFormProps> = ({
  teamId,
  id,
  form,
  token,
  visible,
  onCancel,
  onJoin
}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err && values.inviteCode) {
        try {
          await api.addTeamMember(teamId, id, values.inviteCode, token);
          onCancel();
          Modal.success({ title: "队伍加入成功" });
          getTeams(false, "电设", 2019);
        } catch (error) {
          if (error.response.data === "403 Forbidden: Incorrect invite code") {
            message.error("您填写的邀请码有误");
          } else if (
            error.response.data ===
            "409 Conflict: The number of members exceeds"
          ) {
            message.error("您想加入的队伍人数已达限制");
          } else if (
            error.response.data === "409 Conflict: User is already in a team"
          ) {
            message.error("您已加入一支队伍");
          } else {
            message.error("加入队伍失败，请联系管理员");
          }
        }
      }
    });
  };

  return (
    <Modal
      title="输入邀请码以加入队伍"
      okText="加入"
      okType="primary"
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        handleSubmit();
      }}
    >
      <Form layout="vertical">
        <Form.Item label="inviteCode">
          {getFieldDecorator("inviteCode", {
            rules: [{ required: true, message: "请输入邀请码" }]
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const WrappedTeamJoinForm = Form.create<ITeamJoinFormProps>()(TeamJoinForm);
