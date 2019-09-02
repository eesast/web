import { Button, Form, Input, message, Modal, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";
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
//import styles from "./TeamJoinPage.module.css";

import { FormComponentProps } from "antd/lib/form";
import { PaginationConfig, SortOrder } from "antd/lib/table";

interface ITeamJoinPageStateProps {
  loggedIn: boolean;
  token?: string;
  fetching: boolean;
  contestId?: number;
  user: IUser;
  teams: ITeam[];
  selfTeam: ITeam;
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
  const {
    token,

    user,
    teams,
    selfTeam,
    getTeams,
    getSelfTeam,
    error,
    fetching
  } = props;

  const [visible, setVisible] = useState(false);
  const [teamId, setTeamId] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalTeams, setTotalTeams] = useState(50);
  const [activeRow, setActiveRow] = useState("");
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSelfTeam("电设", 2019);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //message.info("try format");
    const fetchData = async () => {
      await getTeams(
        false,
        "电设",
        2019,
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize
      );
    };

    fetchData();
    message.info(
      `pageNumber${pageNumber} pageSize${pageSize} total${totalTeams} teams${teams.length}`
    );

    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  useEffect(() => {
    if (error) {
      message.error("队伍信息加载失败");
    }
  }, [error]);

  // const formedShowTeams = useMemo(() => {
  //   return teams.map(item => {
  //     return (
  //       <Panel header={item.name} key={item.id}>
  //         <Descriptions title="队伍信息" column={3}>
  //           <Descriptions.Item label="队名">{item.name}</Descriptions.Item>
  //           <Descriptions.Item label="队长">
  //             {item.leaderUsername}
  //           </Descriptions.Item>
  //           <Descriptions.Item label="队员">
  //             {item.membersUsername!.join(", ")}
  //           </Descriptions.Item>
  //           <Descriptions.Item label="队伍简介">
  //             {item.description}
  //           </Descriptions.Item>
  //         </Descriptions>
  //         <Row type="flex" justify="center">
  //           <Col span={8}>
  //             <Popover
  //               content={
  //                 selfTeam.id !== 0 ? "您已加入队伍" : "点击按钮现在加入队伍"
  //               }
  //             >
  //               <Button
  //                 type="primary"
  //                 disabled={
  //                   selfTeam.id !== 0 && selfTeam.id !== item.id ? true : false
  //                 }
  //                 onClick={() => {
  //                   if (selfTeam.id === 0) {
  //                     setTeamId(item.id);
  //                     showModal();
  //                   } else {
  //                     // 考虑重定向至管理页面
  //                   }
  //                 }}
  //               >
  //                 加入队伍
  //               </Button>
  //             </Popover>
  //           </Col>
  //         </Row>
  //       </Panel>
  //     );
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [teams, selfTeam]);

  const changePage = (currentPage: number, nextPageSize?: number) => {
    setPageNumber(currentPage);
    if (nextPageSize) setPageSize(nextPageSize);
    if (teams.length < pageSize) {
      setTotalTeams((pageNumber - 1) * pageSize + teams.length);
    }
  };

  const changePageSize = (current: number, nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPageNumber(current);
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

  // const fetchData = async () => {
  //   if (!contestId) {
  //     props.getContestId("电设", 2019);
  //   }
  //   const teams = await api.getTeams(
  //     false,
  //     contestId!,
  //     token!,
  //     (pageNumber - 1) * pageSize,
  //     pageNumber * pageSize
  //   );
  //   for (const team of teams) {
  //     const leaderUsername = await api.getUsername(team.leader, token!);
  //     team.leaderUsername = leaderUsername;
  //     team.membersUsername = [];
  //     for (const id of team.members) {
  //       if (id === team.leader) {
  //         team.membersUsername!.push(leaderUsername);
  //       } else {
  //         const username = await api.getUsername(id, token!);
  //         team.membersUsername!.push(username);
  //       }
  //     }
  //   }

  //   await setData([...teams]);
  //   setLoading(false);
  // };

  const handleChange = (pagination: PaginationConfig) => {
    //setPageNumber(pagination.current!);
    //fetchData();
  };

  const handleClick = (record: ITeam) => {
    if (activeRow === String(record.id)) setActiveRow("");
    else setActiveRow(String(record.id));
  };

  const sortDir: SortOrder[] = ["descend", "ascend"];

  const columns = [
    {
      title: "队伍名称",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a: ITeam, b: ITeam) => {
        let nameA = a.name,
          nameB = b.name;
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      },
      sortDirections: sortDir
    },
    {
      title: "队长",
      dataIndex: "leaderUsername",
      key: "leaderUsername",
      width: "30%"
    },
    {
      title: "队伍成员",
      dataIndex: "membersUsername",
      key: "membersUsername"
    }
  ];

  const pagination: PaginationConfig = {
    total:
      teams.length < pageSize
        ? (pageNumber - 1) * pageSize + teams.length
        : totalTeams,
    current: pageNumber,
    //defaultPageSize={10}
    pageSize: pageSize,
    showSizeChanger: true,
    onChange: changePage,
    onShowSizeChange: changePageSize,
    pageSizeOptions: ["5", "10", "20"]
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={teams}
        loading={fetching}
        pagination={pagination}
        rowKey={(record: ITeam) => String(record.id)}
        expandedRowKeys={[activeRow]}
        onChange={handleChange}
        expandRowByClick
        //bordered
        onRowClick={handleClick}
        expandedRowRender={(record: ITeam) => (
          <div>
            <p style={{ margin: 0 }}>{record.description}</p>
            <Popover
              content={
                selfTeam.id !== 0 ? "您已加入队伍" : "点击按钮现在加入队伍"
              }
            >
              <Button
                type="primary"
                disabled={
                  selfTeam.id !== 0 && selfTeam.id !== record.id ? true : false
                }
                onClick={() => {
                  message.info(`selfTeam${selfTeam.id}`);
                  if (selfTeam.id === 0) {
                    setTeamId(record.id);
                    showModal();
                  } else {
                    // 考虑重定向至管理页面
                  }
                }}
              >
                加入队伍
              </Button>
            </Popover>
          </div>
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
    // <div className={styles.root}>
    //   <div className={styles.list}>
    //     {formedShowTeams.length === 0 ? (
    //       <Empty />
    //     ) : (
    //       <Collapse accordion expandIconPosition="right">
    //         {formedShowTeams}
    //       </Collapse>
    //     )}
    //   </div>
    //   <WrappedTeamJoinForm
    //     teamId={teamId}
    //     id={user.id}
    //     token={token || ""}
    //     visible={visible}
    //     onCancel={handleCancel}
    //     onJoin={handleJoin}
    //   />
    //   <div>
    //     {/*分页*/}
    //     {/* 暂未实现显示数量改变的功能 */}
    //     <Row type="flex" justify="center">
    //       <Pagination
    //         total={totalTeams}
    //         current={pageNumber}
    //         //defaultPageSize={10}
    //         pageSize={pageSize}
    //         showSizeChanger
    //         onChange={changePage}
    //         onShowSizeChange={changePageSize}
    //         pageSizeOptions={["5", "10", "20"]}
    //       />
    //     </Row>
    //   </div>
    // </div>
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
          //getTeams(false, "电设", 2019);
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
