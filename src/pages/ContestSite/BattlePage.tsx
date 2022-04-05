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
import type {UploadFile, RcCustomRequestOptions} from "antd/lib/upload/interface"
import {useLocation} from "react-router-dom"
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
} from "antd";
import {
  DownOutlined,
  UploadOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "../../helpers/auth";
import {getOSS,downloadFile} from "../../helpers/oss"
import styles from "./BattlePage.module.css";
import { Link } from "react-router-dom";
//----根据队员信息查找队伍信息------
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/contest.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/contest.graphql";
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
import { GetAllTeamInfo_contest_team, GetAllTeamInfo,GetAllTeamInfoVariables } from "../../api/types";
import { GetAllTeamInfo as GETALLTEAMINFO } from "../../api/contest.graphql";
//----回放信息------
import { GetRoomInfo,GetRoomInfo_contest_room, GetRoomInfoVariables} from "../../api/types";
import { GetRoomInfo as GETROOMINFO } from "../../api/contest.graphql";
//----插入room和team------
import { InsertRoom, InsertRoomVariables } from "../../api/types";
import { InsertRoom as INSERTROOM } from "../../api/contest.graphql";
//————创建thuaicode————
// import { InsertCode, InsertCodeVariables } from "../../api/types";
// import { InsertCode as INSERTCODE } from "../../api/contest.graphql";
import { GetTeamInfo as GETTEAMINFO } from "../../api/contest.graphql";
import { GetTeamInfo, GetTeamInfoVariables } from "../../api/types";
// import { GetCode as GETCODE } from "../../api/contest.graphql";
// import { GetCode, GetCodeVariables } from "../../api/types";
//上传代码
// import {
//   UpsertCode1,
//   UpsertCode1Variables,
//   UpsertCode2,
//   UpsertCode2Variables,
//   UpsertCode3,
//   UpsertCode3Variables,
//   UpsertCode4,
//   UpsertCode4Variables,
// } from "../../api/types";
// import {
//   UpsertCode1 as UPSERTCODE1,
//   UpsertCode2 as UPSERTCODE2,
//   UpsertCode3 as UPSERTCODE3,
//   UpsertCode4 as UPSERTCODE4,
// } from "../../api/contest.graphql";
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
  const Contest_id = location.pathname.split("/")[2].replace('}','');


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

  //-----------------获取天梯队伍信息------------------
  const {
    data: teamListData,
    loading: teamListLoading,
    //error: teamListError,
    //refetch: refetchteamList,
  } = useQuery<GetAllTeamInfo,GetAllTeamInfoVariables>(GETALLTEAMINFO,{
    variables:{
      contest_id: Contest_id
    }
  });
  //-----------------获取room信息------------------、
  const {
    data: roomListData,
    loading: roomListLoading,
    error: teamListError,
    //refetch: refetchteamList,
  } = useQuery<GetRoomInfo,GetRoomInfoVariables>(GETROOMINFO,{
    variables:{
      contest_id: Contest_id
    }
  });
  useEffect(() => {
    if(teamListError){
      message.error("获取对战信息失败");
      console.log(teamListError.message);
    }
  })
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
  // const { data: codeData } = useQuery<GetCode, GetCodeVariables>(GETCODE, {
  //   variables: {
  //     team_id: teamid!,
  //   },
  // });
  //-----------------上传代码------------------、
  // const [upsertCode1, { data: code1, error: code1Error }] = useMutation<
  //   UpsertCode1,
  //   UpsertCode1Variables
  // >(UPSERTCODE1);

  // const [upsertCode2, { data: code2, error: code2Error }] = useMutation<
  //   UpsertCode2,
  //   UpsertCode2Variables
  // >(UPSERTCODE2);

  // const [upsertCode3, { data: code3, error: code3Error }] = useMutation<
  //   UpsertCode3,
  //   UpsertCode3Variables
  // >(UPSERTCODE3);

  // const [upsertCode4, { data: code4, error: code4Error }] = useMutation<
  //   UpsertCode4,
  //   UpsertCode4Variables
  // >(UPSERTCODE4);

  const [codeRole, setCodeRole] = useState(1); // 代码对应角色
  const [opponentTeamId, setTeamId] = useState("");
  const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [fileList3, setFileList3] = useState<UploadFile[]>([]);
  const [fileList4, setFileList4] = useState<UploadFile[]>([]);
  // useEffect(() => {
  //   if (code1Error || code2Error || code3Error || code4Error) {
  //     message.error("上传代码失败");
  //   } else if (code1 || code2 || code3 || code4) {
  //     message.success("上传代码成功");
  //   }
  // }, [
  //   code1,
  //   code1Error,
  //   code2,
  //   code2Error,
  //   code3,
  //   code3Error,
  //   code4,
  //   code4Error,
  // ]);

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


  // TODO: CodeText 变成上传最新代码的日期储存起来

  // const handleCodeChange1 = async (codeText: any) => {
  //   upsertCode1({ variables: { code: codeText, team_id: teamid! } });
  //   //console.log(values);
  // };
  // const handleCodeChange2 = async (codeText: any) => {
  //   upsertCode2({ variables: { code: codeText, team_id: teamid! } });
  // };
  // const handleCodeChange3 = async (codeText: any) => {
  //   upsertCode3({ variables: { code: codeText, team_id: teamid! } });
  // };
  // const handleCodeChange4 = async (codeText: any) => {
  //   upsertCode4({ variables: { code: codeText, team_id: teamid! } });
  // };
  // const handleCodeChange = (codeRole: any, codeText: any) => {
  //   switch (codeRole) {
  //     case 1:
  //       handleCodeChange1(codeText);
  //       break;
  //     case 2:
  //       handleCodeChange2(codeText);
  //       break;
  //     case 3:
  //       handleCodeChange3(codeText);
  //       break;
  //     case 4:
  //       handleCodeChange4(codeText);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const downloadcompile = async () => {
    try {
      const response = await axios.get(`code/logs/${teamid}`, {
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

  const CompiledTag: React.FC = ()=>{
    if (teamData?.contest_team[0].status==="compiled")
    return(
      <div>
      <Tag icon={<CheckCircleOutlined />} color="success">
        success
      </Tag>
      </div>
    )
   else{
    return(
      <Tag icon={<CloseCircleOutlined />} color="error">
        failed
      </Tag>
    )
   }

  }
  //点击下载回放
  //TODO: 下载格式待商议
  // const download = async (record: GetRoomInfo) => {
  //   try {
  //     const response = await axios.get(`room/${record.contest_room[0].room_id}`, { // TODO:此处应与后端协调
  //       responseType: "blob",
  //     });
  //     FileSaver.saveAs(response.data, record.contest_room[0].room_id + ".thuaipb"); // TODO: 回放文件格式
  //   } catch (e) {
  //     const err = e as AxiosError;
  //     if (err.response?.status === 401) {
  //       message.error("认证失败");
  //     } else {
  //       message.error("未知错误");
  //     }
  //   }
  // };
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
        // await axios.post("room", {
        //   //header: {},
        //   room_id: roomId.data?.insert_contest_room_one?.room_id,
        //   team_seq: false, // 一个是紫方还是白方的标记
        // });
        message.success("已发起对战!");
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
      const oss = await getOSS();
      //console.log(`THUAI5/${teamid}/player${codeRole.toString()}`)
      const url = `/THUAI5/${teamid}/player${codeRole.toString()}`;
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
      //handleCodeChange(codeRole, url);
    } else {
      e.onError(new Error());
    }
  };

  const handleRemove = async (file: UploadFile) => {
    if (file.response?.status === 200) {
      const oss = await getOSS();
      await oss.delete(`/THUAI5/${teamid}/player${codeRole}.cpp`);
    }
  };

  const handleOnchange = async (info:any)=>{
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
    switch(codeRole){
      case 1: setFileList1(info.fileList);break;
      case 2: setFileList2(info.fileList);break;
      case 3: setFileList3(info.fileList);break;
      case 4: setFileList4(info.fileList);break;
      default: break;
    }


  }

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
      sorter: (a, b) =>  Number(a.score) - Number(b.score),
      defaultSortOrder: "descend",
    },
    {
      title: "对战",
      key: "fight",
      render: (text, record) => (
        <Dropdown overlay={menu} trigger={["click"]}  disabled={teamid === record.team_id}>
          <Button
          className="ant-dropdown-link"
          // type="primary"
          onClick={() => {setfight(record)}}
          >
            开战！ <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];
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
      render: (text, record) =>{
        return(
          <div>
          <Text>
            {record.contest_room_teams[0].contest_team.team_name}<br/>
            {record.contest_room_teams[1].contest_team.team_name}
          </Text>
         </div>
        )},
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "结果",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "对战时间",
      dataIndex: "created_at",
      key: "created_at",
      render:(text, record)=>dayjs(record.created_at).format('M-DD HH:mm:ss')
    },
    {
      title: "回放下载",
      key: "download",
      render: (text, record) => (
        <Button
          type="primary"
          //onClick={() => download(record)}
          disabled={record.status !== true}
        >
          下载
        </Button>
      ),
    },
  ];
  interface Playerprops {
    key:number,
    name:string,
    status:string,
    filelist: UploadFile[],
  }

  const playerList = [
    {key:1,name:'P1',status:'nice',filelist:fileList1},
    {key:2,name:'P2',status:'nice',filelist:fileList2},
    {key:3,name:'P3',status:'nice',filelist:fileList3},
    {key:4,name:'P4',status:'nice',filelist:fileList4}
  ]

  const playerListColumns:TableProps<Playerprops>["columns"] = [
    {
      title:'AI角色',
      dataIndex: "name",
      key: "name"
    },
    {
      title:'上传代码',
      key:"upload",
      dataIndex: "upload",
      render: (text,record) => (
        <Upload
        accept = ".cpp"
        customRequest={handleUpload}
        onChange={handleOnchange}
        onRemove={handleRemove}
        multiple
        fileList={record.filelist}
      >
        <Button onClick={()=>{
          //console.log(record)
          setCodeRole(record.key)
          }}>
          <UploadOutlined /> 上传
        </Button>
      </Upload>
      )

  },
    {
      title:'下载代码',
      key:"download",
      render: (text,record) => (
      <Row justify = "start">
      <Button onClick = {()=>{
        setCodeRole(record.key);
        const codefile = {
          filename: `Player${codeRole}.cpp`,
          url: `/THUAI5/${teamid}/player${codeRole}`
        }
        message.info("开始下载:"+codefile.filename);
        downloadFile(codefile).catch(e=>{
          message.error("下载失败");
        })
      }}>
        <DownloadOutlined/>下载
        </Button>
    </Row>)

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
              <Text strong>天梯对战</Text>
              <br />
              每场比赛支持最多两支队伍同时对战，请先通过编译再与他人对战！
              <Text strong>对战记录</Text>
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
                onRow={record=>{
                  return{
                    onMouseEnter: event => {
                      setCodeRole(record.key);
                      //console.log("鼠标事件"+codeRole);
                  }
                }}}
                />

                <Form.Item name="status">
                <Row>
                  <Col>
                    <Text>编译状态：</Text>
                  </Col>
                  <Col span= {9}>
                  <CompiledTag/>
                  </Col>
                  <Col span= {3}>
                  <Button
                  type="primary"
                  onClick={() => {
                  handleCodeCompile();
                  message.info("编译需要一段时间，请稍后刷新以查看");
                }}
              >
              编译代码
            </Button>
                  </Col>
                  <Col span={6}>
                  <Button
                    type="primary"
                    onClick={downloadcompile}
                    //disabled={teamData?.thuai[0].status === "success"}
                  >
                    下载编译信息
                  </Button>
                  </Col>
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
