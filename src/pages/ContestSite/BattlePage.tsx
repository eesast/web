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
  MinusOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "../../helpers/auth";
import { uploadFile, downloadFile, deleteFile, listFile } from "../../helpers/cos";
import styles from "./BattlePage.module.css";
import { Link } from "react-router-dom";
//----根据队员信息查找队伍信息------
import { GetContestInfo, GetContestInfoVariables, IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/contest.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/contest.graphql";
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
import { GetAllTeamInfo_contest_team} from "../../api/types";

import { GetAllTeamInfo_score, GetAllTeamInfo_scoreVariables } from "../../api/types";
import { GetAllTeamInfo_score as GETALLTEAMSCORE } from "../../api/contest.graphql";
//----回放信息------
import { GetRoomInfo, GetRoomInfo_contest_room, GetRoomInfoVariables } from "../../api/types";
import { GetRoomInfo as GETROOMINFO } from "../../api/contest.graphql";
//----正在比赛的room信息
import{GetRoomInfo_status, GetRoomInfo_statusVariables} from "../../api/types"
import{GetRoomInfo_status as GETROOMSTATUS} from "../../api/contest.graphql";
//----插入room和team------
import { InsertRoom, InsertRoomVariables } from "../../api/types";
import { InsertRoom as INSERTROOM } from "../../api/contest.graphql";
import { QueryContestManager, QueryContestManagerVariables } from "../../api/types"
import {
  QueryContestManager as QUERY_CONTEST_MANAGER,
  GetContestInfo as GET_CONTEST_INFO,
} from "../../api/contest.graphql"
//----删除room和team
import { DeleteRoom, DeleteRoomVariables } from "../../api/types";
import { DeleteRoom as DELETEROOM } from "../../api/contest.graphql";
//————创建thuaicode————
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
  UpsertCode5,
  UpsertCode5Variables,
} from "../../api/types";
import {
  UpsertCode1 as UPSERTCODE1,
  UpsertCode2 as UPSERTCODE2,
  UpsertCode3 as UPSERTCODE3,
  UpsertCode4 as UPSERTCODE4,
  UpsertCode5 as UPSERTCODE5,
} from "../../api/contest.graphql";
//————后端发送post————
import axios, { AxiosError } from "axios";
import FileSaver from "file-saver";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { SubMenu } = Menu;

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
    data: scoreteamListData,
    loading: scoreteamListLoading,
    //error: teamListError,
    //refetch: refetchteamList,
  } = useQuery<GetAllTeamInfo_score, GetAllTeamInfo_scoreVariables>(GETALLTEAMSCORE, {
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
      if (codetimeData?.contest_code[0].code5_update_time) {
        setTime5(dayjs(codetimeData?.contest_code[0].code5_update_time).format("M-DD HH:mm:ss"));
      }
    }
  }, [codetimeData])

  const {
    data: roomStatusData,
    error: roomStatusError,
  } = useQuery<GetRoomInfo_status, GetRoomInfo_statusVariables>(GETROOMSTATUS, {
    variables: {
      contest_id: Contest_id
    }
  });
  useEffect(() => {
    if (roomStatusError) {
      message.error("获取对战信息失败");
      console.log(roomStatusError.message);
    }
  })


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

  const [upsertCode5, { data: code5updatetime, error: code5Error }] = useMutation<
    UpsertCode5,
    UpsertCode5Variables
  >(UPSERTCODE5);

  // ----------------删除room--------------------
  const [deleteRoom, { error: DeleteRoomError }] = useMutation<
    DeleteRoom,
    DeleteRoomVariables
  >(DELETEROOM);
  useEffect(() => {
    if (DeleteRoomError) {
      message.error("删除对战记录失败");
      console.log(DeleteRoomError.message);
    }
  })

  // --------------获取比赛状态-------------------
  const {
    data: contestData,
    error: contestError,
  } = useQuery<GetContestInfo, GetContestInfoVariables>(GET_CONTEST_INFO, {
    variables: {
      contest_id: Contest_id
    }
  });
  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);

  const [codeRole, setCodeRole] = useState(1); // 代码对应角色
  const [opponentTeamId, setTeamId] = useState("");
  const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [fileList3, setFileList3] = useState<UploadFile[]>([]);
  const [fileList4, setFileList4] = useState<UploadFile[]>([]);
  const [fileList5, setFileList5] = useState<UploadFile[]>([]);
  const [time1, setTime1] = useState("未上传");
  const [time2, setTime2] = useState("未上传");
  const [time3, setTime3] = useState("未上传");
  const [time4, setTime4] = useState("未上传");
  const [time5, setTime5] = useState("未上传");
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
    else if (code5updatetime) {
      setTime5(dayjs(code5updatetime.insert_contest_code_one?.code5_update_time).format("M-DD HH:mm:ss"))
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
      code5updatetime,
      code5Error,
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
    console.log("values");
    upsertCode1({ variables: { code: url, update_time: now!, team_id: teamid!, contest_id: Contest_id!, code_type: "C" } });
    console.log("values");
  };
  const handleCodeChange2 = async (url: string) => {
    upsertCode2({ variables: { code: url, update_time: now!, team_id: teamid!, contest_id: Contest_id!, code_type: "C" } });
  };
  const handleCodeChange3 = async (url: string) => {
    upsertCode3({ variables: { code: url, update_time: now!, team_id: teamid!, contest_id: Contest_id!, code_type: "C" } });
  };
  const handleCodeChange4 = async (url: string) => {
    upsertCode4({ variables: { code: url, update_time: now!, team_id: teamid!, contest_id: Contest_id!, code_type: "C" } });
  };
  const handleCodeChange5 = async (url: string) => {
    upsertCode5({ variables: { code: url, update_time: now!, team_id: teamid!, contest_id: Contest_id!, code_type: "C" } });
  };
  const handleCodeChange = (url: string, codeRole: any) => {
    switch (codeRole) {
      case 1:
        console.log("values");
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
      case 5:
        handleCodeChange5(url);
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
    //console.log(teamData?.contest_team[0].status);
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
  const fight = (mapnum: number) => {
    console.log(roomStatusData?.contest_room.length);
    // TODO: 下面的代码有点丑陋
    if(roomStatusData?.contest_room.length&&roomStatusData?.contest_room.length > 15){
      message.warning("当前正在进行的比赛过多，请稍后再试");
      return;
    }
    (async () => {
      try {
        //console.log("您："+teamid+"  对手："+opponentTeamId);
        const roomId = await insertRoom({
          variables: {
            contest_id: Contest_id,
            team1_id: teamid,
            team2_id: opponentTeamId,
            created_at: now!,
          },
        });
        console.log(roomId);
        await axios.post("room", {
          //header: {},
          map: mapnum,
          room_id: roomId.data?.insert_contest_room_one?.room_id,
          team_seq: false, // 一个是红队还是蓝队的标记
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
  const fight2 = (mapnum: number) => {
    console.log(roomStatusData?.contest_room.length);
    // TODO: 下面的代码有点丑陋
    if(roomStatusData?.contest_room.length&&roomStatusData?.contest_room.length > 15){
      message.warning("当前正在进行的比赛过多，请稍后再试");
      return;
    }
    (async () => {
      try {
        // console.log("您："+teamid+"  对手："+opponentTeamId);
        const roomId = await insertRoom({
          variables: {
            contest_id: Contest_id,
            team1_id: teamid,
            team2_id: opponentTeamId,
            created_at: now!
          },
        });
        await axios.post("room", {
          //header: {},
          map:mapnum,
          room_id: roomId.data?.insert_contest_room_one?.room_id,
          team_seq: true,
        });
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


  const map_menu = (
    <Menu>
    <SubMenu key="map1" title="初始地图">
    <Menu.Item key="1"  onClick={() => {
      fight(0);
      }}>
        红队
      </Menu.Item>
      <Menu.Item key="2" onClick={() => {
        fight2(0);
        }}>
        蓝队
      </Menu.Item>
    </SubMenu>

    <SubMenu key="map2" title="环形电磁基地">
    <Menu.Item key="1"  onClick={() => {
      fight(1);
      }}>
        红队
      </Menu.Item>
      <Menu.Item key="2" onClick={() => {
        fight2(1);
        }}>
        蓝队
      </Menu.Item>
    </SubMenu>
  </Menu>
  );

  const handleUpload = async (e: RcCustomRequestOptions) => {
    const lang = e.filename.split(".").slice(-1, ).join('');
    try {
      if (lang === "cpp") {
        const url = `/THUAI6/${teamid}/player${codeRole}.cpp`;
        const result = await uploadFile(e.file, url);
        e.onSuccess(result, e.file);
        handleCodeChange(url, codeRole);
        await refetchCodeTime({
          team_id: teamid!,
        });
      } else if (lang === "py") {
        const url = `/THUAI6/${teamid}/player${codeRole}.py`;
        const result = await uploadFile(e.file, url);
        e.onSuccess(result, e.file);
        handleCodeChange(url, codeRole);
        await refetchCodeTime({
          team_id: teamid!,
        });
      } else {
        e.onError(new Error("不支持的文件类型"));
      }
    } catch (err) {
      e.onError(new Error("上传失败"));
    }
  };

  const handleRemove = async (file: UploadFile) => {
    const lang = file.name.split(".").slice(-1, ).join('');
    try {
      if (file.response?.status === 200) {
        if (lang === "cpp") {
          await deleteFile(`/THUAI6/${teamid}/player${codeRole}.cpp`);
        } else if (lang === "py") {
          await deleteFile(`/THUAI6/${teamid}/player${codeRole}.py`);
        }
      }
    } catch (err) {
      console.log(err);
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
      case 5: setFileList5(info.fileList); break;
      default: break;
    }
  }

  const handleDownload = async () => {
    let result = await listFile(`THUAI6/${teamid}/${codeRole}`);
    if (result.length === 0) {
      message.error("未找到代码文件");
    } else {
      if (result[0].Key.indexOf(`THUAI6/${teamid}/${codeRole}`) === 0) {
        switch (result[0].Key.split('.').slice(-1, ).join('')) {
          case "cpp": {
            const codefile = {
              filename: `Player${codeRole}.cpp`,
              url: `/THUAI6/${teamid}/player${codeRole}.cpp`
            }
            message.info("开始下载:" + codefile.filename);
            downloadFile(codefile).catch(e => {
              message.error("下载失败");
            })
          } break;
          case "py": {
            const codefile = {
              filename: `Player${codeRole}.py`,
              url: `/THUAI6/${teamid}/player${codeRole}.py`
            }
            message.info("开始下载:" + codefile.filename);
            downloadFile(codefile).catch(e => {
              message.error("下载失败");
            })
          } break;
        }
      }
    }
  }

  const handleCodeCompile = () => {
    (async () => {
      if (time1 === "未上传" || time2 === "未上传" || time3 === "未上传" || time4 === "未上传"|| time5 === "未上传") {
        message.error("请先上传5份选手代码！");
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

  const handleDeleteRoom = async (Room_id: string) => {
    await deleteRoom({ variables: { room_id: Room_id } });
    await refetchRoomList();
    if (!DeleteRoomError) {
      message.success("已移除此对战记录");
    }
  }
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
      sorter: (a,b)=> Number(a.score)-Number(b.score),
      defaultSortOrder: "descend",
    },
    {
      title: "对战",
      key: "fight",
      render: (text, record) => (
        <Dropdown overlay={map_menu} trigger={["click"]}
          disabled={
            teamid === record.team_id ||
            teamData?.contest_team[0].status !== "compiled" ||
            record.status !== "compiled" ||
            contestData?.contest[0].status.slice(2, 3) !== "1"
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
      render: (text, record) => dayjs(record.created_at).format('M-DD HH:mm:ss'),
    },
    {
      title: "回放下载",
      key: "download",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => download(record)}
          disabled={record.status !== true}
        >
          下载
        </Button>
      ),
    },
    {
      title: "",
      key: "delete",
      render: (text, record) => (
        isContestManagerData?.contest_manager.length === 1 ?
          <Button
            shape="circle"
            icon={<MinusOutlined />}
            type="dashed"
            size="small"
            onClick={() => { handleDeleteRoom(record.room_id); }}

          >
          </Button>
          : <div />)
    }
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
    { key: 4, name: 'P4', updatetime: time4, filelist: fileList4 },
    { key: 5, name: 'P5', updatetime: time5, filelist: fileList5 }
  ]

  const playerListColumns: TableProps<Playerprops>["columns"] = [
    {
      title: 'AI角色',
      dataIndex: "name",
      key: "name",
    },
    {
      title: '代码更新时间',
      dataIndex: "updatetime",
      key: "time",
    },
    {
      title: '上传代码(AI.cpp & AI.py)',
      key: "upload",
      dataIndex: "upload",
      render: (text, record) => (
        <Upload
          accept=".cpp,.py"
          customRequest={handleUpload}
          onChange={handleOnchange}
          onRemove={handleRemove}
          multiple
          fileList={record.filelist}
        >
          <Button
            disabled={contestData?.contest[0].status.slice(0, 1) !== "1"}
            onClick={() => {
              //console.log(record)
              setCodeRole(record.key)
            }}
          >
            <UploadOutlined /> 上传
          </Button>
        </Upload>
      )
    },
    {
      title: '上传代码(AI.py)',
      key: "upload",
      dataIndex: "upload",
      render: (text, record) => (
        <Upload
          accept=".py"
          customRequest={handleUpload}
          onChange={handleOnchange}
          onRemove={handleRemove}
          multiple
          fileList={record.filelist}
        >
          <Button
            disabled={contestData?.contest[0].status.slice(0, 1) !== "1"}
            onClick={() => {
              //console.log(record)
              setCodeRole(record.key)
            }}
          >
            <UploadOutlined /> 上传
          </Button>
        </Upload>
      )

    },
    {
      title: '上传代码(AI.py)',
      key: "upload",
      dataIndex: "upload",
      render: (text, record) => (
        <Upload
          accept=".py"
          customRequest={handleUpload}
          onChange={handleOnchange}
          onRemove={handleRemove}
          multiple
          fileList={record.filelist}
        >
          <Button
            disabled={contestData?.contest[0].status.slice(0, 1) !== "1"}
            onClick={() => {
              //console.log(record)
              setCodeRole(record.key)
            }}
          >
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
          <Button onClick={handleDownload}>
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
              <Title level={4}>--THUAI5 Battle--</Title>
              <Text strong>新地图：环形电磁基地 正式上线！</Text>
              <br />
              愈战愈勇，不断优化你的人工智能，去登顶天梯吧！
              <br />
              <Text strong>对战记录</Text>
              <br />
              历次对战的结果和回放文件，回放文件可通过RunPlayback观看。
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
                loading={scoreteamListLoading}
                dataSource={scoreteamListData?.contest_team}
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
                          disabled={contestData?.contest[0].status.slice(1, 2) !== "1"}
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
