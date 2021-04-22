import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Row,
  Col,
  Button,
  Modal,
  Input,
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
import { InsertRoom, InsertRoomVariables } from "../../api/types";
import { InsertRoom as INSERTROOM } from "../../api/thuai.graphql";
//————创建thuaicode————
// import { InsertCode, InsertCodeVariables } from "../../api/types";
// import { InsertCode as INSERTCODE } from "../../api/thuai.graphql";

//上传代码
import {
  UpsertCode1,
  UpsertCode1Variables,
  UpsertCode2,
  UpsertCode2Variables,
  UpsertCode3,
  UpsertCode3Variables,
  UpsertCode4,
  UpsertCode4Variables,
} from "../../api/types";
import {
  UpsertCode1 as UPSERTCODE1,
  UpsertCode2 as UPSERTCODE2,
  UpsertCode3 as UPSERTCODE3,
  UpsertCode4 as UPSERTCODE4,
} from "../../api/thuai.graphql";
//————后端发送post————
import axios, { AxiosError } from "axios";
import { useQuery, useMutation } from "@apollo/client"; //更改：取消注释
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const BattlePage: React.FC = () => {
  const userInfo = getUserInfo();
  const { TextArea } = Input;
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
  const [insertRoom, { error: insertRoomError }] = useMutation<
    InsertRoom,
    InsertRoomVariables
  >(INSERTROOM);
  const teamid =
    isleaderData?.user[0].team_as_leader[0]?.team_id ||
    ismemberData?.user[0].team_as_member[0]?.team_id;
  //-----------------上传代码------------------、
  const [upsertCode1, { data: code1, error: code1Error }] = useMutation<
    UpsertCode1,
    UpsertCode1Variables
  >(UPSERTCODE1);

  const [upsertCode2, { data: code2, error: code2Error }] = useMutation<
    UpsertCode2,
    UpsertCode2Variables
  >(UPSERTCODE2);

  const [upsertCode3, { data: code3, error: code3Error }] = useMutation<
    UpsertCode3,
    UpsertCode3Variables
  >(UPSERTCODE3);

  const [upsertCode4, { data: code4, error: code4Error }] = useMutation<
    UpsertCode4,
    UpsertCode4Variables
  >(UPSERTCODE4);

  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showCompileInfoModal, setShowCompileInfoModal] = useState(false);
  const [showCodeContentModal, setShowCodeContentModal] = useState(false);
  const [codeRole, setCodeRole] = useState(1); // 代码对应角色
  const [codeText, setCodeText] = useState("");
  useEffect(() => {
    if (code1Error || code2Error || code3Error || code4Error) {
      message.error("上传代码失败");
    } else if (code1 || code2 || code3 || code4) {
      message.success("上传代码成功");
    }
  }, [
    code1,
    code1Error,
    code2,
    code2Error,
    code3,
    code3Error,
    code4,
    code4Error,
  ]);

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

  const inputChange = (e: any) => {
    setCodeText(e.target.value);
  };

  const handleCodeChange1 = async (codeText: any) => {
    upsertCode1({ variables: { code: codeText, team_id: teamid! } });
    //console.log(values);
  };
  const handleCodeChange2 = async (codeText: any) => {
    upsertCode2({ variables: { code: codeText, team_id: teamid! } });
  };
  const handleCodeChange3 = async (codeText: any) => {
    upsertCode3({ variables: { code: codeText, team_id: teamid! } });
  };
  const handleCodeChange4 = async (codeText: any) => {
    upsertCode4({ variables: { code: codeText, team_id: teamid! } });
  };
  const handleCodeChange = (codeRole: any, codeText: any) => {
    switch (codeRole) {
      case 1:
        handleCodeChange1(codeText);
        break;
      case 2:
        handleCodeChange2(codeText);
        break;
      case 3:
        handleCodeChange3(codeText);
        break;
      case 4:
        handleCodeChange4(codeText);
        break;
      default:
        break;
    }
  };
  const handleCodeModal = () => {
    setShowCodeModal(!showCodeModal);
  };

  const handleCompileInfoModal = () => {
    setShowCompileInfoModal(false);
    setShowCodeModal(true);
  };
  //点击下载回放
  const download = (record: GetRoomInfo_thuai_room) => {
    (async () => {
      try {

        await axios.get(`room/${record.room_id}`);
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
        const roomId = await insertRoom({
          variables: {
            team1_id: teamid,
            team2_id: record.team_id,
          },
        });
        await axios.post("room", {
          //header: {},
          room_id: roomId,
        });
      } catch (e) {
        if (insertRoomError) {
          console.error("make room fail");
          message.error("发起对战失败");
        } else {
          message.error("发起对战失败");
          console.log(e);
        }
      }
    })();
  };
  const handleCodeContentModal = () => {
    setShowCodeContentModal(false);
    setShowCodeModal(true);
  };

  const handleCodeCompile = () => {
    (async () => {
      try {
        console.log(teamid);
        await axios.post("code/compile", {
          team_id: teamid,
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
        record.team_members.map((i) => [i.user.name + "  "]),
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
      dataIndex: "show_id",
      key: "show_id",
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
        record.thuai_room_teams.map((i) => [i.thuai_team.team_name + "  "]),
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
            <Button onClick={() => handleCodeChange(codeRole, codeText)}>
              上传代码
            </Button>
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
              onClick={() => {
                handleCodeCompile();
                message.info("编译需要一段时间，请稍后刷新以查看");
              }}
            >
              编译
            </Button>
          </Col>
        </Row>
        <TextArea placeholder="输入完整代码" onChange={(e) => inputChange(e)} />
      </Modal>
      <Modal
        visible={showCompileInfoModal}
        title="编译结果"
        closable
        footer={null}
        onCancel={handleCompileInfoModal}
      ></Modal>
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
