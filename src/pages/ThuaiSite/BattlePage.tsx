import React, { useState } from "react";
import {
  Table,
  Typography,
  Row,
  Col,
  Button,
  Modal,
  Upload,
  Radio,
  Result,
  Tabs,
  message,
} from "antd";
import { getUserInfo } from "../../helpers/auth";
import styles from "./BattlePage.module.css";
import { Link } from "react-router-dom";
//----根据队员信息查找队伍信息------
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/thuai.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/thuai.graphql";
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
import { GetAllTeamInfo_thuai, GetAllTeamInfo } from "../../api/types";
import { GetAllTeamInfo as GETALLTEAMINFO } from "../../api/thuai.graphql";
//----回放信息------
import { GetRoomInfo_thuai_room, GetRoomInfo } from "../../api/types";
import { GetRoomInfo as GETROOMINFO } from "../../api/thuai.graphql";
//----插入room和team------
import { MakeRoom } from "../../api/types";
import { MakeRoom as MAKEROOM } from "../../api/thuai.graphql";
import {
  InsertTeamIntoRoom,
  InsertTeamIntoRoomVariables,
} from "../../api/types";
import { InsertTeamIntoRoom as INSERTTEAMINTOROOM } from "../../api/thuai.graphql";
//————创建thuaicode————
// import { InsertCode, InsertCodeVariables } from "../../api/types";
// import { InsertCode as INSERTCODE } from "../../api/thuai.graphql";
//————后端发送post————
import axios, { AxiosError } from "axios";
import { useQuery, useMutation } from "@apollo/client"; //更改：取消注释
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const BattlePage: React.FC = () => {
  const userInfo = getUserInfo();
  //-----------------根据队员id查询队伍id------------------
  const { data: isleaderData } = useQuery<IsTeamLeader, IsTeamLeaderVariables>(
    ISTEAMLEADER,
    {
      variables: {
        _id: userInfo?._id!,
      },
    }
  );
  const { data: ismemberData } = useQuery<IsTeamMember, IsTeamMemberVariables>(
    ISTEAMMEMBER,
    {
      variables: {
        _id: userInfo?._id!,
      },
    }
  );
  //-----------------获取天梯队伍信息------------------
  const {
    data: teamListData,
    loading: teamListLoading,
    //error: teamListError,
    //refetch: refetchteamList,
  } = useQuery<GetAllTeamInfo>(GETALLTEAMINFO);
  //-----------------获取room信息------------------、
  const {
    data: roomListData,
    loading: roomListLoading,
    //error: teamListError,
    //refetch: refetchteamList,
  } = useQuery<GetRoomInfo>(GETROOMINFO);
  const [insertTeamIntoRoom, { error: insertTeamIntoRoomError }] = useMutation<
    InsertTeamIntoRoom,
    InsertTeamIntoRoomVariables
  >(INSERTTEAMINTOROOM);
  const [
    makeRoom,
    { data: makeRoomData, error: makeRoomError },
  ] = useMutation<MakeRoom>(MAKEROOM);
  const teamid =
    isleaderData?.user[0].team_as_leader[0]?.team_id ||
    ismemberData?.user[0].team_as_member[0]?.team_id;

  //   const [codeList, setCodeList] = useState<ICode[]>([]);
  //   const [historyList, setHistoryList] = useState<IRoom[]>([]);
  //   const [pageSize, setPageSize] = useState(5);
  //   const [pageNumber, setPageNumber] = useState(1);
  //  const [selectedTeams, setSelectedTeams] = useState<number[]>([]); // 选中作为对手的teamId，比赛限制四队，0用于表示bot
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showCompileInfoModal, setShowCompileInfoModal] = useState(false);
  const [showCodeContentModal, setShowCodeContentModal] = useState(false);
  //const [showHistoryModal, setShowHistoryModal] = useState(false);
  //const [showBattleModal, setShowBattleModal] = useState(false);
  //   const [forceUpdate, setForceUpdate] = useState(true); // 更改以强制重新获取数据
  const [codeRole, setCodeRole] = useState(1); // 代码对应角色
  //   const [selectedCode, setSelectedCode] = useState<ICode[]>([]); // 选择要编译的代码
  //   const [showCompileInfo, setShowCompileInfo] = useState(""); // 查看的编译结果
  //   const [showCodeContent, setShowCodeContent] = useState(""); // 查看的代码内容
  //   const handlePageChange = (currentPage: number, nextPageSize?: number) => {
  //     setPageNumber(currentPage);
  //     if (nextPageSize) setPageSize(nextPageSize);
  //   };
  if (!teamid) {
    return (
      <div>
        <Result
          status="warning"
          title="您还没有加入任何队伍"
          extra={
            <Button type="primary">
              <Link replace to="/thuai/join">
                加入队伍
              </Link>
            </Button>
          }
        />
      </div>
    );
  }
  const handleCodeModal = () => {
    setShowCodeModal(!showCodeModal);
  };

  // const handleHistoryModal = () => {
  //   setShowHistoryModal(!showHistoryModal);
  // };

  // const handleBattleModal = () => {
  //   setShowBattleModal(!showBattleModal);
  // };

  const handleCompileInfoModal = () => {
    setShowCompileInfoModal(false);
    setShowCodeModal(true);
  };
  //点击下载回放
  const download = (record: GetRoomInfo_thuai_room) => {
    (async () => {
      try {
        await axios.get("api.eesast.com/room", {
          url: "record.room_id",
        });
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 401) {
          message.error("401");
        } else if (err.response?.status === 409) {
          message.error("409");
        } else {
          message.error("404");
        }
      }
    })();
  };
  //点击发起对战
  const fight = (record: GetAllTeamInfo_thuai) => {
    (async () => {
      try {
        //make a room
        await makeRoom({});
        console.log(makeRoomData);
        //insert the team of the user choose
        await insertTeamIntoRoom({
          variables: {
            room_id: makeRoomData,
            thuai_team_id: record.team_id,
          },
        });
        //insert their own teamid
        await insertTeamIntoRoom({
          variables: {
            room_id: makeRoomData,
            thuai_team_id: teamid,
          },
        });
      } catch (e) {
        if (makeRoomError) {
          console.error("maek room fail");
          message.error("发起对战失败");
        } else if (insertTeamIntoRoomError) {
          console.error("insert team into room fail");
          message.error("发起对战失败");
        } else {
          message.error("发起对战失败");
          console.log("fail");
        }
      }
      try {
        await axios.post("api.eesast.com/room", {
          //header: {},
          body: { room_id: makeRoomData },
        });
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 400) {
          message.error("400");
        } else {
          message.error("404");
        }
      }
    })();
  };
  const handleCodeContentModal = () => {
    setShowCodeContentModal(false);
    setShowCodeModal(true);
  };

  //   const handleShowCodeContent = (content: string) => {
  //     if (content) setShowCodeContent(content);
  //     else setShowCodeContent("暂无编译信息");
  //     setShowCodeContentModal(true);
  //     setShowCodeModal(false);
  //   };
  const teamListColumns: TableProps<GetAllTeamInfo_thuai>["columns"] = [
    {
      title: "队名",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "队长",
      key: "team_leader",
      render: (text, record) => record.user?.name,
    },
    {
      title: "队员",
      key: "team_member",
      render: (text, record) =>
        record.team_members.map((i) => [i.user.name + "   "]),
    },
    {
      title: "队伍简介",
      dataIndex: "team_sum",
      key: "team_sum",
      ellipsis: true,
    },
    {
      title: "分数",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
      defaultSortOrder: "descend",
    },
    {
      title: "对战",
      key: "fight",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => fight(record)}
          disabled={record.team_id === teamid}
        >
          对战
        </Button>
      ),
    },
  ];
  const roomListColumns: TableProps<GetRoomInfo_thuai_room>["columns"] = [
    {
      title: "ID",
      dataIndex: "room_id",
      key: "room_id",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "队名",
      key: "team_name",
      render: (text, record) =>
        record.thuai_room_teams.map((i) => [i.thuai_team + "  "]),
    },
    {
      title: "结果",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "时间",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "回放下载",
      key: "download",
      render: (text, record) => (
        <Button type="primary" onClick={() => download(record)}>
          下载
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.root}>
      <div style={{ width: "80%" }}>
        {/* 选择比赛用的代码，介绍对战，选择对手 */}
        <Row gutter={16} align="middle" justify="space-between">
          <Col span={12}>
            <Typography>
              <Title level={4}>Tips</Title>
              <Text strong>代码管理</Text>
              <br />
              四个角色，各一份代码。我们只会保留最新的一整份代码供操作。
              <br />
              <Text strong>历史记录</Text>
              <br />
              历次对战的结果和回放文件。
              <br />
              <Text strong>对战</Text>
              <br />
              每场比赛支持最多两支队伍同时对战
            </Typography>
          </Col>
          <Col span={12}>
            <Row gutter={[16, 16]} justify="end">
              <Col span={24}>
                <Button size="large" onClick={handleCodeModal}>
                  代码管理
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className={styles.list}>
        <div style={{ width: "80%" }}>
          <Tabs type="card">
            <TabPane tab="天梯" key="1">
              <Table
                className={styles.list}
                loading={teamListLoading}
                dataSource={teamListData?.thuai}
                columns={teamListColumns}
              />
            </TabPane>
            <TabPane tab="对战记录" key="2">
              <Table
                className={styles.list}
                loading={roomListLoading}
                dataSource={roomListData?.thuai_room}
                columns={roomListColumns}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Modal
        title="代码管理"
        width="50%"
        visible={showCodeModal}
        closable
        footer={null}
        onCancel={handleCodeModal}
      >
        <Row justify="space-between">
          <Col span={8}>
            <Upload
              fileList={[]} // 暂不考虑文件上传列表展示
              //onChange={handleCodeChange}
              //customRequest={handleCodeUpload}
            >
              <Button>上传代码</Button>
            </Upload>
          </Col>
          <Col span={8}>
            AI角色
            <Radio.Group
              value={codeRole}
              onChange={(event) => {
                setCodeRole(event.target.value);
              }}
            >
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3</Radio>
              <Radio value={4}>4</Radio>
            </Radio.Group>
          </Col>
          <Col span={4}></Col>
          <Col span={4}>
            <Button
              type="primary"
              //   onClick={() => {
              //     handleCodeCompile(selectedCode[0], codeRole);
              //     message.info("编译需要一段时间，请稍后刷新以查看");
              //   }}
            >
              编译
            </Button>
          </Col>
        </Row>
        <Table
        //   columns={codeColumns}
        //   dataSource={codeList}
        //   rowSelection={codeSelctionConfig}
        //   pagination={false}
        />
      </Modal>
      <Modal
        visible={showCompileInfoModal}
        title="编译结果"
        closable
        footer={null}
        onCancel={handleCompileInfoModal}
      >
        {/* <div style={{ whiteSpace: "pre" }}>{showCompileInfo}</div> */}
      </Modal>
      <Modal
        visible={showCodeContentModal}
        title="代码"
        closable
        footer={null}
        onCancel={handleCodeContentModal}
      >
        <Button id="copyButton">复制代码</Button>
        {/* <div style={{ whiteSpace: "pre" }} id="codeContent">
          {showCodeContent}
        </div> */}
      </Modal>
    </div>
  );
};
export default BattlePage;
