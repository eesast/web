import React, { useEffect, useState } from "react";
import type {
  UploadFile,
  RcCustomRequestOptions,
} from "antd/lib/upload/interface";
import { useLocation } from "react-router-dom";
import {
  Table,
  Button,
  message,
  Upload,
  Tag,
  Layout,
  Row,
  Col,
  Typography,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  QuestionOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "../../api/helpers/auth";
import {
  uploadFile,
  downloadFile,
  deleteFile,
  existFile,
} from "../../api/helpers/cos";
//----根据队员信息查找队伍信息------
import {
  GetContestInfo,
  GetContestInfoVariables,
  IsTeamLeader,
  IsTeamLeaderVariables,
} from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/contest.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/contest.graphql";
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
import { GetContestInfo as GET_CONTEST_INFO } from "../../api/contest.graphql";
//————创建thuaicode————
import { GetTeamInfo as GETTEAMINFO } from "../../api/contest.graphql";
import { GetTeamInfo, GetTeamInfoVariables } from "../../api/types";
import { GetCompileStatus as GETCOMPILESTATUS } from "../../api/contest.graphql";
import { GetCompileStatus, GetCompileStatusVariables } from "../../api/types";
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
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import dayjs from "dayjs";

const { Text } = Typography;

const CodePage: React.FC = () => {
  interface Playerprops {
    key: number;
    name: string;
    updatetime: string;
    filelist: UploadFile[];
  }

  const userInfo = getUserInfo();
  const location = useLocation();
  const Contest_id = location.pathname.split("/")[2];

  const [codeRole, setCodeRole] = useState(1); // 代码对应角色
  const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [fileList3, setFileList3] = useState<UploadFile[]>([]);
  const [fileList4, setFileList4] = useState<UploadFile[]>([]);
  const [fileList5, setFileList5] = useState<UploadFile[]>([]);
  const defaultDate = dayjs("2000-01-01 00:00:00");
  const [time1, setTime1] = useState(defaultDate);
  const [time2, setTime2] = useState(defaultDate);
  const [time3, setTime3] = useState(defaultDate);
  const [time4, setTime4] = useState(defaultDate);
  const [time5, setTime5] = useState(defaultDate);

  //-----------------根据队员id查询队伍id------------------
  const { data: isleaderData } = useQuery<IsTeamLeader, IsTeamLeaderVariables>(
    ISTEAMLEADER,
    {
      variables: {
        _id: userInfo?._id!,
        contest_id: Contest_id,
      },
    },
  );
  const { data: ismemberData } = useQuery<IsTeamMember, IsTeamMemberVariables>(
    ISTEAMMEMBER,
    {
      variables: {
        _id: userInfo?._id!,
        contest_id: Contest_id,
      },
    },
  );

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
    },
  );

  const { data: teamCompileStatus } = useSubscription<
    GetCompileStatus,
    GetCompileStatusVariables
  >(GETCOMPILESTATUS, {
    variables: {
      contest_id: Contest_id,
      team_id: teamid!,
    },
  });

  // --------------获取比赛状态-------------------
  const { data: contestData, error: contestError } = useQuery<
    GetContestInfo,
    GetContestInfoVariables
  >(GET_CONTEST_INFO, {
    variables: {
      contest_id: Contest_id,
    },
  });
  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);

  const { data: codetimeData } = useSubscription<
    GetCodeUpdateTime,
    GetCodeUpdateTimeVariables
  >(GETCODETIME, {
    variables: {
      team_id: teamid!,
    },
  });
  useEffect(() => {
    if (codetimeData?.contest_code.length === 1) {
      if (codetimeData?.contest_code[0].code1_update_time) {
        setTime1(dayjs(codetimeData?.contest_code[0].code1_update_time));
      }
      if (codetimeData?.contest_code[0].code2_update_time) {
        setTime2(dayjs(codetimeData?.contest_code[0].code2_update_time));
      }
      if (codetimeData?.contest_code[0].code3_update_time) {
        setTime3(dayjs(codetimeData?.contest_code[0].code3_update_time));
      }
      if (codetimeData?.contest_code[0].code4_update_time) {
        setTime4(dayjs(codetimeData?.contest_code[0].code4_update_time));
      }
      if (codetimeData?.contest_code[0].code5_update_time) {
        setTime5(dayjs(codetimeData?.contest_code[0].code5_update_time));
      }
    }
  }, [codetimeData]);

  //-----------------上传代码------------------、
  const [upsertCode1, { error: code1Error }] = useMutation<
    UpsertCode1,
    UpsertCode1Variables
  >(UPSERTCODE1);
  useEffect(() => {
    if (code1Error) {
      message.error("上传代码失败");
    }
  });

  const [upsertCode2, { error: code2Error }] = useMutation<
    UpsertCode2,
    UpsertCode2Variables
  >(UPSERTCODE2);
  useEffect(() => {
    if (code2Error) {
      message.error("上传代码失败");
    }
  });

  const [upsertCode3, { error: code3Error }] = useMutation<
    UpsertCode3,
    UpsertCode3Variables
  >(UPSERTCODE3);
  useEffect(() => {
    if (code3Error) {
      message.error("上传代码失败");
    }
  });

  const [upsertCode4, { error: code4Error }] = useMutation<
    UpsertCode4,
    UpsertCode4Variables
  >(UPSERTCODE4);
  useEffect(() => {
    if (code4Error) {
      message.error("上传代码失败");
    }
  });

  const [upsertCode5, { error: code5Error }] = useMutation<
    UpsertCode5,
    UpsertCode5Variables
  >(UPSERTCODE5);
  useEffect(() => {
    if (code5Error) {
      message.error("上传代码失败");
    }
  });

  const playerList = [
    {
      key: 1,
      name: "P1",
      updatetime: time1.format("M-DD HH:mm:ss"),
      filelist: fileList1,
    },
    {
      key: 2,
      name: "P2",
      updatetime: time2.format("M-DD HH:mm:ss"),
      filelist: fileList2,
    },
    {
      key: 3,
      name: "P3",
      updatetime: time3.format("M-DD HH:mm:ss"),
      filelist: fileList3,
    },
    {
      key: 4,
      name: "P4",
      updatetime: time4.format("M-DD HH:mm:ss"),
      filelist: fileList4,
    },
    {
      key: 5,
      name: "TRICKER",
      updatetime: time5.format("M-DD HH:mm:ss"),
      filelist: fileList5,
    },
  ];

  const playerListColumns: TableProps<Playerprops>["columns"] = [
    {
      title: "AI角色",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "代码更新时间",
      dataIndex: "updatetime",
      key: "time",
    },
    {
      title: "上传代码",
      key: "upload",
      dataIndex: "upload",
      render: (text, record) => (
        <Upload
          accept=".cpp,.py"
          // maxCount={1}
          customRequest={handleUpload}
          onChange={handleOnchange}
          onRemove={handleRemove}
          // data={(file) => {
          //   return {
          //     key: file.url,
          // }}}
          multiple
          fileList={record.filelist}
        >
          <Button
            disabled={contestData?.contest[0].status.slice(0, 1) !== "1"}
            onClick={() => {
              setCodeRole(record.key);
            }}
          >
            <UploadOutlined /> 上传
          </Button>
        </Upload>
      ),
    },
    {
      title: "下载代码",
      key: "download",
      render: (text, record) => (
        <Row justify="start">
          <Button onClick={handleDownload}>
            <DownloadOutlined />
            下载
          </Button>
        </Row>
      ),
    },
    {
      title: "编译信息",
      key: "compile_info",
      render: (text, record) => (
        <Row justify="start">
          <Button
            onClick={() => {
              setCodeRole(record.key);
              message.info(`下载角色${codeRole}的编译信息`);
              downloadCompile().catch((e) => {
                message.error("下载失败");
              });
            }}
          >
            <CodeOutlined />
            获取
          </Button>
        </Row>
      ),
    },
  ];

  const CompiledTag: React.FC = () => {
    if (teamCompileStatus?.contest_team[0].status === "compiled")
      return (
        <div>
          <Tag icon={<CheckCircleOutlined />} color="success">
            success
          </Tag>
        </div>
      );
    else if (teamCompileStatus?.contest_team[0].status === "compiling")
      return (
        <div>
          <Tag icon={<LoadingOutlined />} color="gold">
            compiling
          </Tag>
        </div>
      );
    else if (teamCompileStatus?.contest_team[0].status === "failed") {
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          failed
        </Tag>
      );
    } else {
      return (
        <Tag icon={<QuestionOutlined />} color="purple">
          unknown
        </Tag>
      );
    }
  };

  const handleCodeCompile = () => {
    (async () => {
      if (
        time1.isSame(defaultDate) ||
        time2.isSame(defaultDate) ||
        time3.isSame(defaultDate) ||
        time4.isSame(defaultDate) ||
        time5.isSame(defaultDate)
      ) {
        message.error("请先上传5份选手代码！");
        return;
      }
      try {
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

  const downloadCompile = async () => {
    try {
      const response = await axios.get(`code/logs/${teamid}/${codeRole}`, {
        responseType: "blob",
      });
      let codeTime: string;
      switch (codeRole) {
        case 1:
          codeTime = time1.format("YY-MM-DD_HH-mm-ss");
          break;
        case 2:
          codeTime = time2.format("YY-MM-DD_HH-mm-ss");
          break;
        case 3:
          codeTime = time3.format("YY-MM-DD_HH-mm-ss");
          break;
        case 4:
          codeTime = time4.format("YY-MM-DD_HH-mm-ss");
          break;
        case 5:
          codeTime = time5.format("YY-MM-DD_HH-mm-ss");
          break;
        default:
          codeTime = "unknown";
          break;
      }
      FileSaver.saveAs(
        response.data,
        teamData?.contest_team[0].team_name.replace(/[&|\\*^%$'"#@-]/g, "") +
          "_" +
          codeTime +
          "_player_" +
          codeRole +
          "_compile_log.txt",
      );
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("认证失败");
      } else {
        message.error("未知错误");
      }
    }
  };

  const handleUpload = async (e: RcCustomRequestOptions) => {
    const lang = e.file.name.split(".").slice(-1).join("");
    try {
      if (lang === "cpp") {
        const url = `THUAI6/${teamid}/player${codeRole}.cpp`;
        const result = await uploadFile(e.file, url, "team_code", {
          team_id: teamid,
        });
        e.onSuccess(result, e.file);
        handleCodeChange(url, codeRole, lang);
      } else if (lang === "py") {
        const url = `THUAI6/${teamid}/player${codeRole}.py`;
        const result = await uploadFile(e.file, url, "team_code", {
          team_id: teamid,
        });
        e.onSuccess(result, e.file);
        handleCodeChange(url, codeRole, lang);
      } else {
        e.onError(new Error("不支持的文件类型"));
      }
    } catch (err) {
      e.onError(new Error("上传失败"));
    }
  };

  const handleOnchange = async (info: any) => {
    if (info.fileList.length === 2) {
      info.fileList = info.fileList.slice(-1);
      message.warning("一名角色对应一份代码文件！");
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} → P${codeRole} 上传成功`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} → P${codeRole} 上传失败`);
    }
    switch (codeRole) {
      case 1:
        setFileList1(info.fileList);
        break;
      case 2:
        setFileList2(info.fileList);
        break;
      case 3:
        setFileList3(info.fileList);
        break;
      case 4:
        setFileList4(info.fileList);
        break;
      case 5:
        setFileList5(info.fileList);
        break;
      default:
        break;
    }
  };

  const handleRemove = async (file: UploadFile) => {
    const lang = file.name.split(".").slice(-1).join("");
    try {
      if (file.response?.status === 200) {
        if (lang === "cpp") {
          await deleteFile(
            `/THUAI6/${teamid}/player${codeRole}.cpp`,
            "team_code",
            { team_id: teamid },
          );
        } else if (lang === "py") {
          await deleteFile(
            `/THUAI6/${teamid}/player${codeRole}.py`,
            "team_code",
            { team_id: teamid },
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async () => {
    try {
      const cpp_exist = await existFile(
        `THUAI6/${teamid}/player${codeRole}.cpp`,
        "team_code",
        { team_id: teamid },
      );
      const py_exist = await existFile(
        `THUAI6/${teamid}/player${codeRole}.py`,
        "team_code",
        { team_id: teamid },
      );
      if ((cpp_exist && py_exist) || (!cpp_exist && !py_exist)) {
        throw Error("File error");
      }
      if (cpp_exist) {
        const codefile = {
          filename: `player${codeRole}.cpp`,
          url: `/THUAI6/${teamid}/player${codeRole}.cpp`,
        };
        message.info("开始下载:" + codefile.filename);
        downloadFile(codefile.url, "team_code", { team_id: teamid }).catch(
          (e) => {
            message.error("下载失败");
          },
        );
      } else if (py_exist) {
        const codefile = {
          filename: `player${codeRole}.py`,
          url: `/THUAI6/${teamid}/player${codeRole}.py`,
        };
        message.info("开始下载:" + codefile.filename);
        downloadFile(codefile.url, "team_code", { team_id: teamid }).catch(
          (e) => {
            message.error("下载失败");
          },
        );
      }
    } catch (err) {
      message.error(err);
    }
  };

  //上传最新代码的日期储存起来
  let now = dayjs();
  const handleCodeChange1 = async (url: string, lang: string) => {
    upsertCode1({
      variables: {
        code: url,
        update_time: now!,
        team_id: teamid!,
        contest_id: Contest_id!,
        code_type: lang,
      },
    });
  };
  const handleCodeChange2 = async (url: string, lang: string) => {
    upsertCode2({
      variables: {
        code: url,
        update_time: now!,
        team_id: teamid!,
        contest_id: Contest_id!,
        code_type: lang,
      },
    });
  };
  const handleCodeChange3 = async (url: string, lang: string) => {
    upsertCode3({
      variables: {
        code: url,
        update_time: now!,
        team_id: teamid!,
        contest_id: Contest_id!,
        code_type: lang,
      },
    });
  };
  const handleCodeChange4 = async (url: string, lang: string) => {
    upsertCode4({
      variables: {
        code: url,
        update_time: now!,
        team_id: teamid!,
        contest_id: Contest_id!,
        code_type: lang,
      },
    });
  };
  const handleCodeChange5 = async (url: string, lang: string) => {
    upsertCode5({
      variables: {
        code: url,
        update_time: now!,
        team_id: teamid!,
        contest_id: Contest_id!,
        code_type: lang,
      },
    });
  };
  const handleCodeChange = (url: string, codeRole: any, lang: string) => {
    switch (codeRole) {
      case 1:
        handleCodeChange1(url, lang);
        break;
      case 2:
        handleCodeChange2(url, lang);
        break;
      case 3:
        handleCodeChange3(url, lang);
        break;
      case 4:
        handleCodeChange4(url, lang);
        break;
      case 5:
        handleCodeChange5(url, lang);
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Title level={2}>代码管理</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Text mark>
            请上传对应角色的<Typography.Text code>AI.cpp</Typography.Text>或
            <Typography.Text code>AI.py</Typography.Text>
            文件。每次提交任意一份新代码都需要重新编译，即便上传的是Python文件。
          </Typography.Text>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Table
            dataSource={playerList}
            columns={playerListColumns}
            onRow={(record) => {
              return {
                onMouseEnter: (event) => {
                  setCodeRole(record.key);
                },
              };
            }}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={3}></Col>
        <Col span={2}>
          <Text>编译状态：</Text>
        </Col>
        <Col span={13}>
          <CompiledTag />
        </Col>
        <Col span={4}>
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
      </Row>
    </Layout>
  );
};

export default CodePage;
