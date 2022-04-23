// import Center from "../../components/Center";
// import { Result, Button } from "antd";
// import { Link } from "react-router-dom";

// const NotFoundPage = () => {
//   return (
//     <Center>
//       <Result
//         status="404"
//         title="404"
//         subTitle="未找到您要访问的页面"
//         extra={
//           <Button type="primary">
//             <Link to="/home"> 返回主页</Link>
//           </Button>
//         }
//       />
//     </Center>
//   );
// };

// export default NotFoundPage;

import React, { useEffect, useState } from "react";
import type { UploadFile, RcCustomRequestOptions } from "antd/lib/upload/interface"
import { useLocation } from "react-router-dom"
import {
  Table,
  Typography,
  Row,
  Col,
  Button,
  Result,
  Tabs,
  message,
  Form,
  Dropdown,
  Menu,
  Upload,
  Tag,
  Space,
} from "antd";
import {
  DownOutlined,
  UploadOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  QuestionOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "../../helpers/auth";
import { getSharedOSS, downloadFile } from "../../helpers/oss"
import styles from "./BattlePage.module.css";
import { Link } from "react-router-dom";
//----根据队员信息查找队伍信息------
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/contest.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/contest.graphql";
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
import { GetAllTeamInfo_contest_team, GetAllTeamInfo, GetAllTeamInfoVariables } from "../../api/types";
import { GetAllTeamInfo as GETALLTEAMINFO } from "../../api/contest.graphql";
//----回放信息------
import { GetRoomInfo, GetRoomInfo_contest_room, GetRoomInfoVariables } from "../../api/types";
import { GetRoomInfo as GETROOMINFO } from "../../api/contest.graphql";
//----插入room和team------
import { InsertRoom, InsertRoomVariables } from "../../api/types";
import { InsertRoom as INSERTROOM } from "../../api/contest.graphql";
import { QueryContestManager, QueryContestManagerVariables } from "../../api/types"
import {
  QueryContestManager as QUERY_CONTEST_MANAGER
} from "../../api/contest.graphql"
//————创建thuaicode————
// import { InsertCode, InsertCodeVariables } from "../../api/types";
// import { InsertCode as INSERTCODE } from "../../api/contest.graphql";
import { GetTeamInfo as GETTEAMINFO } from "../../api/contest.graphql";
import { GetTeamInfo, GetTeamInfoVariables } from "../../api/types";
import { GetCodeUpdateTime as GETCODETIME } from "../../api/contest.graphql";
import { GetCodeUpdateTime, GetCodeUpdateTimeVariables } from "../../api/types";
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
} from "../../api/contest.graphql";
//————后端发送post————
import axios, { AxiosError } from "axios";
import FileSaver from "file-saver";
import { useQuery, useMutation } from "@apollo/client"; //更改：取消注释
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TabPane } = Tabs;


const BattlePage: React.FC = () => {
  const userInfo = getUserInfo();
  const location = useLocation();
  const Contest_id = location.pathname.split("/")[2].replace('}', '');

  //-----------------根据队员id查询队伍id------------------
  const { data: isleaderData } = useQuery<IsTeamLeader, IsTeamLeaderVariables>(
    ISTEAMLEADER,
    {
      variables: {
        _id: userInfo?._id!,
        contest_id: Contest_id,
      },
    }
  );
  const { data: ismemberData } = useQuery<IsTeamMember, IsTeamMemberVariables>(
    ISTEAMMEMBER,
    {
      variables: {
        _id: userInfo?._id!,
        contest_id: Contest_id,
      },
    }
  );

  // ----------------获取比赛管理员---------------
  const {
    data: isContestManagerData,
    error: isContestManagerError
  } = useQuery<QueryContestManager, QueryContestManagerVariables>(QUERY_CONTEST_MANAGER, {
    variables: {
      contest_id: Contest_id,
      user_id: userInfo?._id
    }
  });

  //-----------------获取天梯队伍信息------------------
  const {
    data: teamListData,
    loading: teamListLoading,
    //error: teamListError,
    //refetch: refetchteamList,
  } = useQuery<GetAllTeamInfo, GetAllTeamInfoVariables>(GETALLTEAMINFO, {
    variables: {
      contest_id: Contest_id
    }
  });
  //-----------------获取room信息------------------、
  const {
    data: roomListData,
    loading: roomListLoading,
    error: teamListError,
    refetch: refetchRoomList,
  } = useQuery<GetRoomInfo, GetRoomInfoVariables>(GETROOMINFO, {
    variables: {
      contest_id: Contest_id
    }
  });
  useEffect(() => {
    if (teamListError) {
      message.error("获取对战信息失败");
      console.log(teamListError.message);
    }
  })
  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message)
    }
  }, [isContestManagerError]);

  const [insertRoom, { error: insertRoomError }] = useMutation<
    InsertRoom,
    InsertRoomVariables
  >(INSERTROOM);
  const teamid =
    isleaderData?.contest_team[0]?.team_id ||
    ismemberData?.contest_team_member[0]?.team_id;
  //利用teamid查询team的信息储存在teamdata中
  const { data: teamData } = useQuery<GetTeamInfo, GetTeamInfoVariables>(
    GETTEAMINFO,
    {
      variables: {
        contest_id: Contest_id,
        team_id: teamid!,
      },
    }
  );


  const { data: codetimeData, refetch: refetchCodeTime } = useQuery<GetCodeUpdateTime, GetCodeUpdateTimeVariables>(GETCODETIME, {
    variables: {
      team_id: teamid!,
    },
  });
  useEffect(() => {
    // console.log("effect");
    if (codetimeData?.contest_code.length === 1) {
      if (codetimeData?.contest_code[0].code1_update_time) {
        // console.log("a"+codetimeData?.contest_code[0].code1_update_time);
        setTime1(dayjs(codetimeData?.contest_code[0].code1_update_time).format("M-DD HH:mm:ss"));
      }
      if (codetimeData?.contest_code[0].code2_update_time) {
        setTime2(dayjs(codetimeData?.contest_code[0].code2_update_time).format("M-DD HH:mm:ss"));
      }
      if (codetimeData?.contest_code[0].code3_update_time) {
        setTime3(dayjs(codetimeData?.contest_code[0].code3_update_time).format("M-DD HH:mm:ss"));
      }
      if (codetimeData?.contest_code[0].code4_update_time) {
        setTime4(dayjs(codetimeData?.contest_code[0].code4_update_time).format("M-DD HH:mm:ss"));
      }
    }
  }, [codetimeData])
  //-----------------上传代码------------------、
  const [upsertCode1, { data: code1updatetime, error: code1Error }] = useMutation<
    UpsertCode1,
    UpsertCode1Variables
  >(UPSERTCODE1);

  const [upsertCode2, { data: code2updatetime, error: code2Error }] = useMutation<
    UpsertCode2,
    UpsertCode2Variables
  >(UPSERTCODE2);

  const [upsertCode3, { data: code3updatetime, error: code3Error }] = useMutation<
    UpsertCode3,
    UpsertCode3Variables
  >(UPSERTCODE3);

  const [upsertCode4, { data: code4updatetime, error: code4Error }] = useMutation<
    UpsertCode4,
    UpsertCode4Variables
  >(UPSERTCODE4);

  const [codeRole, setCodeRole] = useState(1); // 代码对应角色
  const [opponentTeamId, setTeamId] = useState("");
  const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [fileList3, setFileList3] = useState<UploadFile[]>([]);
  const [fileList4, setFileList4] = useState<UploadFile[]>([]);
  const [time1, setTime1] = useState("未上传");
  const [time2, setTime2] = useState("未上传");
  const [time3, setTime3] = useState("未上传");
  const [time4, setTime4] = useState("未上传");
  useEffect(() => {
    if (code1Error || code2Error || code3Error || code4Error) {
      message.error("上传代码失败");
    } else if (code1updatetime) {
      //console.log("a"+code1updatetime)
      setTime1(dayjs(code1updatetime.insert_contest_code_one?.code1_update_time).format("M-DD HH:mm:ss"))
    }
    else if (code2updatetime) {
      setTime2(dayjs(code2updatetime.insert_contest_code_one?.code2_update_time).format("M-DD HH:mm:ss"))
    }
    else if (code3updatetime) {
      setTime3(dayjs(code3updatetime.insert_contest_code_one?.code3_update_time).format("M-DD HH:mm:ss"))
    }
    else if (code4updatetime) {
      setTime4(dayjs(code4updatetime.insert_contest_code_one?.code4_update_time).format("M-DD HH:mm:ss"))
    }
  }
    , [
      code1updatetime,
      code1Error,
      code2updatetime,
      code2Error,
      code3updatetime,
      code3Error,
      code4updatetime,
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
              <Link replace to={`/contest/${Contest_id}/join`}>
                加入队伍
              </Link>
            </Button>
          }
        />
      </div>
    );
  }


  //上传最新代码的日期储存起来
  let now = dayjs();
  const handleCodeChange1 = async (url: string) => {
    upsertCode1({ variables: { code: url, code1_update_time: now!, team_id: teamid!, contest_id: Contest_id! } });
    //console.log(values);
  };
  const handleCodeChange2 = async (url: string) => {
    upsertCode2({ variables: { code: url, code2_update_time: now!, team_id: teamid!, contest_id: Contest_id! } });
  };
  const handleCodeChange3 = async (url: string) => {
    upsertCode3({ variables: { code: url, code3_update_time: now!, team_id: teamid!, contest_id: Contest_id! } });
  };
  const handleCodeChange4 = async (url: string) => {
    upsertCode4({ variables: { code: url, code4_update_time: now!, team_id: teamid!, contest_id: Contest_id! } });
  };
  const handleCodeChange = (url: string, codeRole: any) => {
    switch (codeRole) {
      case 1:
        handleCodeChange1(url);
        break;
      case 2:
        handleCodeChange2(url);
        break;
      case 3:
        handleCodeChange3(url);
        break;
      case 4:
        handleCodeChange4(url);
        break;
      default:
        break;
    }
  };

  const downloadcompile = async () => {
    try {
      const response = await axios.get(`code/logs/${teamid}/${codeRole}`, {
        responseType: "blob",
      });
      FileSaver.saveAs(response.data, teamid);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("认证失败");
      } else {
        message.error("未知错误");
      }
    }
  };

  const CompiledTag: React.FC = () => {
    if (teamData?.contest_team[0].status === "compiled")
      return (
        <div>
          <Tag icon={<CheckCircleOutlined />} color="success">
            success
          </Tag>
        </div>
      )
    else if (teamData?.contest_team[0].status === "compiling")
      return (
        <div>
          <Tag icon={<LoadingOutlined />} color="gold">
            compiling
          </Tag>
        </div>
      )
    else if (teamData?.contest_team[0].status === "failed") {
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          failed
        </Tag>
      )
    }
    else {
      return (
        <Tag icon={<QuestionOutlined />} color="purple">
          unknown
        </Tag>
      )
    }

  }
  //点击下载回放

  const download = async (record: GetRoomInfo_contest_room) => {
    try {
      const response = await axios.get(`room/${record.room_id}`, {
        responseType: "blob",
      });
      FileSaver.saveAs(response.data, record.room_id + ".thuaipb");
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("认证失败");
      } else {
        message.error("未知错误");
      }
    }
  };
  //点击发起对战
  const fight = () => {
    (async () => {
      try {
        //console.log("您："+teamid+"  对手："+opponentTeamId);
        const roomId = await insertRoom({
          variables: {
            contest_id: Contest_id,
            team1_id: teamid,
            team2_id: opponentTeamId,
          },
        });
        console.log(roomId);
        await axios.post("room", {
          //header: {},
          room_id: roomId.data?.insert_contest_room_one?.room_id,
          team_seq: false, // 一个是紫方还是白方的标记
        });
        message.success("已发起对战!");
        refetchRoomList(
          {
            contest_id: Contest_id
          }
        );
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
  //点击发起对战
  const fight2 = () => {
    (async () => {
      try {
        // console.log("您："+teamid+"  对手："+opponentTeamId);
        const roomId = await insertRoom({
          variables: {
            contest_id: Contest_id,
            team1_id: teamid,
            team2_id: opponentTeamId,
          },
        });
        // await axios.post("room", {
        //   //header: {},
        //   room_id: roomId.data?.insert_contest_room_one?.room_id,
        //   team_seq: true,
        // });
        message.success("已发起对战!");
        console.log(roomId);
      } catch (e) {
        if (insertRoomError) {
          console.error(insertRoomError.message);
          message.error("发起对战失败");
        } else {
          message.error("发起对战失败");
          console.log(e);
        }
      }
    })();
  };
  const setfight = (record: GetAllTeamInfo_contest_team) => {
    setTeamId(record.team_id);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => fight()}>
        红队
      </Menu.Item>
      <Menu.Item key="2" onClick={() => fight2()}>
        蓝队
      </Menu.Item>
    </Menu>
  );

  const handleUpload = async (e: RcCustomRequestOptions) => {
    const oss = await getSharedOSS();
    //console.log(`THUAI5/${teamid}/player${codeRole.toString()}`)
    const url = `/THUAI5/${teamid}/player${codeRole}.cpp`;
    const result = await oss.multipartUpload(
      url,
      e.file,
      {
        progress: (progress) =>
          e.onProgress({ percent: progress * 100 }, e.file),
      }
    );

    if (result.res.status === 200) {
      e.onSuccess(result.res, e.file);
      handleCodeChange(url, codeRole);
      await refetchCodeTime({
        team_id: teamid!,
      });

      // console.log("前："+time2);
      // console.log("角色"+codeRole);
      // switch(codeRole) {
      //   case 1: setTime1(dayjs(code1updatetime?.insert_contest_code_one?.code1_update_time).format("M-DD HH:mm:ss"));break;
      //   case 2: setTime2(dayjs(code2updatetime?.insert_contest_code_one?.code2_update_time).format("M-DD HH:mm:ss"));break;
      //   case 3: setTime3(dayjs(code3updatetime?.insert_contest_code_one?.code3_update_time).format("M-DD HH:mm:ss"));break;
      //   case 4: setTime4(dayjs(code4updatetime?.insert_contest_code_one?.code4_update_time).format("M-DD HH:mm:ss"));break;
      //   default: break;
      // }
      // console.log("后:"+time2);
    } else {
      e.onError(new Error());
    }
  };

  const handleRemove = async (file: UploadFile) => {
    if (file.response?.status === 200) {
      const oss = await getSharedOSS();
      await oss.delete(`/THUAI5/${teamid}/player${codeRole}.cpp`);
    }
  };

  const handleOnchange = async (info: any) => {
    if (info.fileList.length === 2) {
      info.fileList = info.fileList.slice(-1);
      message.warning("一名角色对应一份代码文件！");
    }
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} → P${codeRole} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} → P${codeRole} 上传失败`);
    }
    switch (codeRole) {
      case 1: setFileList1(info.fileList); break;
      case 2: setFileList2(info.fileList); break;
      case 3: setFileList3(info.fileList); break;
      case 4: setFileList4(info.fileList); break;
      default: break;
    }


  }

  const handleCodeCompile = () => {
    (async () => {
      if (time1 === "未上传" || time2 === "未上传" || time3 === "未上传" || time4 === "未上传") {
        message.error("请先上传4份选手代码！");
        return;
      }
      try {
        console.log(teamid);
        await axios.post("code/compile", {
          team_id: teamid,
        });
        message.info("已开始编译。编译需要一段时间，请稍后刷新以查看。");
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 401) {
          message.error("401");
        } else if (err.response?.status === 409) {
          message.error("409");
        } else {
          message.error("404");
          console.log(err.message);
        }
      }
    })();
  };
  // 渲染队伍列表
  const teamListColumns: TableProps<GetAllTeamInfo_contest_team>["columns"] = [
    {
      title: "队名",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "队长",
      key: "team_leader_id",
      render: (text, record) => record.team_leader_id?.name
    },
    {
      title: "队员",
      key: "team_member",
      render: (text, record) =>
        record.contest_team_members.map((i) => [i.user_as_contest_team_member.name + "   "]),
    },
    {
      title: "队伍简介",
      dataIndex: "team_intro",
      key: "team_intro",
      ellipsis: true,
    },
    {
      title: "分数",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => Number(a.score) - Number(b.score),
      defaultSortOrder: "descend",
    },
    {
      title: "对战",
      key: "fight",
      render: (text, record) => (
        <Dropdown overlay={menu} trigger={["click"]}
          disabled={
            teamid === record.team_id ||
            teamData?.contest_team[0].status !== "compiled" ||
            record.status !== "compiled" ||
            isContestManagerData?.contest_manager.length === 0
          }>
          <Button
            className="ant-dropdown-link"
            onClick={() => {
              // console.log(teamData?.contest_team[0].status);
              // console.log(record.status);
              setfight(record)
            }}
          >
            开战！ <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];
  const teamName = teamData?.contest_team[0]?.team_name || "null";
  const roomListColumns: TableProps<GetRoomInfo_contest_room>["columns"] = [
    // {
    //   title: "ID",
    //   dataIndex: "show_id",
    //   key: "show_id",
    //   sorter: (a, b) => a.show_id - b.show_id,
    //   defaultSortOrder: "descend",
    // },
    {
      title: "对战双方",
      key: "team_name",
      filters: [{
        text: '只看自己',
        value: teamName,
      }],
      onFilter: (value, record) => (record.contest_room_teams[0].contest_team.team_name === value) || (record.contest_room_teams[1].contest_team.team_name === value),
      render: (text, record) => {
        return (
          <div>
            <Text>
              {record.contest_room_teams[0].contest_team.team_name}<br />
              {record.contest_room_teams[1].contest_team.team_name}
            </Text>
          </div>
        )
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text, record) => record.status ? "已结束" : "正在进行"
    },

    {
      title: "结果",
      dataIndex: "result",
      key: "result",
      render: (text, record) => record.result ? (<Text>{record.result?.split(",")[0]} <br /> {record.result?.split(",")[1]}</Text>) : ""
    },
    {
      title: "对战时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => dayjs(record.created_at).format('M-DD HH:mm:ss')
    },
    {
      title: "回放下载",
      key: "download",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => download(record)}
          disabled={record.status !== true || isContestManagerData?.contest_manager.length === 0}
        >
          下载
        </Button>
      ),
    },
  ];
  interface Playerprops {
    key: number,
    name: string,
    updatetime: string,
    filelist: UploadFile[],
  }



  const playerList = [
    { key: 1, name: 'P1', updatetime: time1, filelist: fileList1 },
    { key: 2, name: 'P2', updatetime: time2, filelist: fileList2 },
    { key: 3, name: 'P3', updatetime: time3, filelist: fileList3 },
    { key: 4, name: 'P4', updatetime: time4, filelist: fileList4 }
  ]

  const playerListColumns: TableProps<Playerprops>["columns"] = [
    {
      title: 'AI角色',
      dataIndex: "name",
      key: "name"
    },
    {
      title: '代码更新时间',
      dataIndex: "updatetime",
      key: "time",
    },
    {
      title: '上传代码(AI.cpp)',
      key: "upload",
      dataIndex: "upload",
      render: (text, record) => (
        <Upload
          accept=".cpp"
          customRequest={handleUpload}
          onChange={handleOnchange}
          onRemove={handleRemove}
          multiple
          fileList={record.filelist}
        >
          <Button onClick={() => {
            //console.log(record)
            setCodeRole(record.key)
          }}>
            <UploadOutlined /> 上传
          </Button>
        </Upload>
      )

    },
    {
      title: '下载代码',
      key: "download",
      render: (text, record) => (
        <Row justify="start">
          <Button onClick={() => {
            setCodeRole(record.key);
            const codefile = {
              filename: `Player${codeRole}.cpp`,
              url: `/THUAI5/${teamid}/player${codeRole}.cpp`
            }
            message.info("开始下载:" + codefile.filename);
            downloadFile(codefile).catch(e => {
              message.error("下载失败");
            })
          }}>
            <DownloadOutlined />下载
          </Button>
        </Row>)

    },
    {
      title: '编译信息',
      key: 'compile_info',
      render: (text, record) => (
        <Row justify="start">
          <Button onClick={() => {
            setCodeRole(record.key);
            message.info(`下载角色${codeRole}的编译信息`);
            downloadcompile().catch(e => {
              message.error("下载失败");
            })
          }}>
            <CodeOutlined />获取
          </Button>
        </Row>
      )
    }
  ]

  return (
    <div className={styles.root}>
      <div style={{ width: "80%" }}>
        {/* 选择比赛用的代码，介绍对战，选择对手 */}
        <Row gutter={16} align="middle" justify="space-between">
          <Col span={12}>
            <Typography>
              <Title level={4}>Tips</Title>
              <Text strong>天梯对战（仍然在鸽）</Text>
              <br />
              每场比赛支持最多两支队伍同时对战，请先通过编译再与他人对战！
              <br />
              <Text strong>对战记录（敬请期待）</Text>
              <br />
              各个历次对战的结果和回放文件。
              <br />
              <Text strong>代码管理</Text>
              <br />
              四个角色，各一份代码。请上传对应角色的AI.cpp文件。我们只会保留最新的一整份代码供操作，您可以下载到此份代码。
              <br />
            </Typography>
          </Col>
          <Col span={12}>
            <Row gutter={[16, 16]} justify="end">
              {/* <Col span={24}>
                <Button size="large" onClick={handleCodeModal}>
                  代码管理
                </Button>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </div>
      <div className={styles.list}>
        <div style={{ width: "100%" }}>
          <Tabs type="card">
            <TabPane tab="天梯" key="1">
              <Table
                className={styles.list}
                loading={teamListLoading}
                dataSource={teamListData?.contest_team}
                columns={teamListColumns}
                rowKey={record => record.team_id}
              />
            </TabPane>
            <TabPane tab="对战记录" key="2">
              <Table
                className={styles.list}
                loading={roomListLoading}
                dataSource={roomListData?.contest_room}
                columns={roomListColumns}
                rowKey={record => record.room_id}
              />
            </TabPane>
            <TabPane tab="代码管理" key="3">
              <Form
                name="form"
                //form={form} //表单名字绑定
                layout="vertical"
                initialValues={teamData}
              //onFinish={onFinish}
              //onFinishFailed={onFinishFailed}
              >
                <Table
                  dataSource={playerList}
                  columns={playerListColumns}
                  onRow={record => {
                    return {
                      onMouseEnter: event => {
                        setCodeRole(record.key);
                        //console.log("鼠标事件"+codeRole);
                      }
                    }
                  }}
                />

                <Form.Item name="status">
                  <Row>

                    <Col>
                      <Text>编译状态：</Text>
                    </Col>
                    <Col span={17}>
                      <CompiledTag />
                    </Col>
                    <Space>
                      <Col span={3}>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={() => {
                            handleCodeCompile();
                          }}
                        >
                          编译代码
                        </Button>
                      </Col>
                      {/* <Col span={6}>
                  <Button
                    type="primary"
                    onClick={downloadcompile}
                    //disabled={teamData?.thuai[0].status === "success"}
                  >
                    下载编译信息
                  </Button>
                  </Col> */}
                    </Space>
                  </Row>
                </Form.Item>
                {/* <Form.Item label="code1" name="status">
                  <TextArea
                    rows={10}
                    disabled={false}
                    defaultValue={codeData?.contest_code[0].code1 + " "}
                  />
                </Form.Item>
                <Form.Item label="code2" name="status">
                  <TextArea
                    rows={10}
                    disabled={false}
                    defaultValue={codeData?.contest_code[0].code2 + " "}
                  />
                </Form.Item>
                <Form.Item label="code3" name="status">
                  <TextArea
                    rows={10}
                    disabled={false}
                    defaultValue={codeData?.contest_code[0].code3 + " "}
                  />
                </Form.Item>
                <Form.Item label="code4" name="status">
                  <TextArea
                    rows={10}
                    disabled={false}
                    defaultValue={codeData?.contest_code[0].code4 + " "}
                  />
                </Form.Item> */}
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default BattlePage;
