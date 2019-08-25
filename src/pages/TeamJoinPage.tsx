import {
  Button,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  Row,
  Col,
  Collapse,
  Popover,
  Pagination
} from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import api from "../api";
import { WithRouterComponent } from "../types/WithRouterComponent";
import { IAppState, ITeam, IUser } from "../redux/types/state";
import {
  getTeams,
  getSelfTeam,
  sortTeams,
  getContestId
} from "../redux/actions/teams";

import { FormComponentProps } from "antd/lib/form";

interface ITeamJoinPageStateProps {
  loggedIn: boolean;
  token?: string;
  fetching: boolean;
  contestId?: number;
  user: IUser;
  teams: ITeam[];
  selfTeam?: ITeam;
  error?: Error | null;
}

interface ITeamJoinPageDispatchProps {
  getTeams: (
    self: boolean,
    type: string,
    year: number,
    begin?: number,
    end?: number
  ) => void;
  getSelfTeam: (type: string, year: number) => void;
  sortTeams: (rule: string) => void;
  getContestId: (type: string, year: number) => void;
}

type ITeamJoinPageProps = ITeamJoinPageStateProps & ITeamJoinPageDispatchProps;

const TeamJoinPage: React.FC<
  WithRouterComponent<{}, ITeamJoinPageProps>
> = props => {
  const { token, user, teams, selfTeam, getTeams, getSelfTeam, error } = props;

  const { Panel } = Collapse;
  const [visible, setVisible] = useState(false);
  const [teamId, setTeamId] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalTeams, setTotalTeams] = useState(50);

  useEffect(() => {
    getSelfTeam("电设", 2019);
  }, [getSelfTeam]);

  //初始化
  useEffect(() => {
    //message.info("try format");
    getTeams(
      false,
      "电设",
      2019,
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
    if (teams.length < pageSize) {
      setTotalTeams((pageNumber - 1) * pageSize + teams.length);
    }
  }, [pageNumber, pageSize, teams, getTeams]);

  useEffect(() => {
    if (error) {
      message.error("队伍信息加载失败");
    }
  }, [error]);

  const formedShowTeams = useMemo(() => {
    return teams.map(item => {
      return (
        <Panel header={item.name} key={item.id}>
          <Descriptions title="队伍信息" column={3}>
            <Descriptions.Item label="队名">{item.name}</Descriptions.Item>
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
            <Col span={8}>
              <Popover
                content={selfTeam ? "您已加入队伍" : "点击按钮现在加入队伍"}
              >
                <Button
                  type="primary"
                  disabled={selfTeam && selfTeam.id !== item.id ? true : false}
                  onClick={() => {
                    if (!selfTeam) {
                      setTeamId(item.id);
                      showModal();
                    } else {
                      // 考虑重定向至管理页面
                    }
                  }}
                >
                  加入队伍
                </Button>
              </Popover>
            </Col>
          </Row>
        </Panel>
      );
    });
  }, [teams, selfTeam]);

  const changePage = (currentPage: number, nextPageSize?: number) => {
    setPageNumber(currentPage);
    if (nextPageSize) setPageSize(nextPageSize);
    if (teams.length < pageSize) {
      setTotalTeams((pageNumber - 1) * pageSize + teams.length);
    }
  };

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
      <Collapse accordion>{formedShowTeams}</Collapse>
      <WrappedTeamJoinForm
        teamId={teamId}
        id={user.id}
        token={token || ""}
        visible={visible}
        onCancel={handleCancel}
        onJoin={handleJoin}
      />
      {/*分页*/}
      {/* 暂未实现显示数量改变的功能 */}
      <Pagination
        total={totalTeams}
        current={pageNumber}
        //defaultPageSize={10}
        pageSize={pageSize}
        //showSizeChanger
        onChange={changePage}
        //onShowSizeChange={changePageSize}
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
    teams: state.teams.items,
    selfTeam: state.teams.selfTeam
  };
}

const mapDispatchToProps: ITeamJoinPageDispatchProps = {
  getTeams,
  getSelfTeam,
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
