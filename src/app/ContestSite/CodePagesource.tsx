import React, { useContext, useEffect, useRef, useState } from "react";
import type { UploadFile } from "antd/lib/upload/interface";
import {
  UploadRequestOption as RcCustomRequestOptions,
  RcFile,
} from "rc-upload/lib/interface";
import {
  Table,
  Button,
  message,
  Upload,
  // Tag,
  Layout,
  Row,
  Col,
  Typography,
  Input,
  Form,
} from "antd";
import type { GetRef, InputRef } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  // CheckCircleOutlined,
  // CloseCircleOutlined,
  // LoadingOutlined,
  // QuestionOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { uploadFile, downloadFile, deleteFile, existFile } from "../../api/cos";
import type { TableProps } from "antd/lib/table";
import axios, { AxiosError } from "axios";
import FileSaver from "file-saver";
//import dayjs from "dayjs";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import { __InputValue } from "graphql";
//import { ColumnType } from "antd/es/table";
import { FormInstance } from "antd/lib";
/* ---------------- 接口和类型定义 ---------------- */
// interface Playerprops {
//   key: number;
//   name: string;
//   updatetime: string;
//   filelist: UploadFile[];
// }
/* ---------------- 不随渲染刷新的常量 ---------------- */
//const { Text } = Typography;
/* ---------------- 主页面 ---------------- */
const CodePagesource: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */

  //linqiushi
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  type ColumnsType<T> = TableProps<T>["columns"];
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  //根据队员id查询队伍id

  // 利用teamid查询team的信息储存在teamdata中
  const { data: teamData } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: user?.uuid!,
      contest_id: Contest_id,
    },
  });
  const teamid = teamData?.contest_team_member[0]?.contest_team.team_id!;

  const { data: GetTeamInfo } = graphql.useGetTeamInfoQuery({
    variables: {
      team_id: teamid!,
    },
  });

  // 获取比赛状态
  const { data: contestData, error: contestError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  // 上传代码 换数据库要修改

  //linqiushi:修改后的数据库
  const [AddTeamCode, { error: codeError }] = graphql.useAddTeamCodeMutation();
  // const [UpdateTeamCodeName, { error: update_codeerror }] =
  //   graphql.useUpdateTeamCodeNameMutation();
  //linqiushi 查询
  const { data: GetTeamCodes } = graphql.useGetTeamCodesSubscription({
    variables: {
      team_id: teamid!,
    },
  });

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);

  //linqiushi
  useEffect(() => {
    if (codeError) {
      message.error("上传代码失败");
    }
  });

  /* ---------------- 业务逻辑函数 ---------------- */
  // 编译代码
  const EditableContext = React.createContext<FormInstance<any> | null>(null);
  interface Item {
    key: string;
    codename: string;
    updatetime: string;
  }
  interface EditableRowProps {
    index: number;
  }
  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props}></tr>
        </EditableContext.Provider>
      </Form>
    );
  };
  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
  }
  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  interface datatype {
    key: React.Key;
    // num:string;
    codename: string;
    updatetime: string;
  }
  type EditableTableProps = Parameters<typeof Table>[0];
  type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
  const [dataSource, setDataSource] = useState<datatype[]>([]);
  const [count, setCount] = useState(0);
  // const handleDelete = (key: React.Key) => {
  //   const newData = dataSource?.filter((item: any) => item.key !== key);
  //   setDataSource(newData);
  // };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // useEffect(()=>{
  //   const newdata:datatype={
  //     key:count,
  //     num:`${count}`,
  //     codename:GetTeamCodes?.contest_team_code[count]?.code_name??"未定义",
  //     updatetime:GetTeamCodes?.contest_team_code[count]?.created_at??"未定义"
  //   }
  //   setDataSource([...dataSource, newdata]);
  // }, [GetTeamCodes])
  const handleAdd = () => {
    message.success(count);

    setCount(count + 1);
  };
  const handleUpload = async (e: RcCustomRequestOptions) => {
    const lang = (e.file as RcFile).name.split(".").slice(-1).join("");
    const codeName = (e.file as RcFile).name;
    try {
      if (lang === "cpp") {
        handleCodeChange(lang, codeName);
        const url = `${contestData?.contest_by_pk?.name}/code/${teamid}/${GetTeamCodes?.contest_team_code[0].code_id}.cpp`;
        const result = await uploadFile(e.file, url);
        const xhr = new XMLHttpRequest();
        e.onSuccess!(result, xhr);
      } else if (lang === "py") {
        handleCodeChange(lang, codeName);
        message.info(`${contestData?.contest_by_pk?.name}/code/${teamid}.py`);
        const url = `${contestData?.contest_by_pk?.name}/code/${teamid}/${GetTeamCodes?.contest_team_code[0].code_id}.py`;

        //result这个上传有问题

        const result = await uploadFile(e.file, url);
        console.log(result);
        const xhr = new XMLHttpRequest();
        e.onSuccess!(result, xhr);
      } else {
        e.onError!(new Error("不支持的文件类型"));
      }
    } catch (err) {
      e.onError!(new Error("上传失败"));
    }
    handleAdd();
  };
  const handleDownload = async () => {
    try {
      const cpp_exist = await existFile(
        `${contestData?.contest_by_pk?.name}/code/${teamid}/${GetTeamCodes?.contest_team_code[0].code_id}.cpp`,
      );
      message.info("lalala");
      const py_exist = await existFile(
        `${contestData?.contest_by_pk?.name}/code/${teamid}/${GetTeamCodes?.contest_team_code[0].code_id}.py`,
      );
      if ((cpp_exist && py_exist) || (!cpp_exist && !py_exist)) {
        message.error("文件管理错误");
      }
      if (cpp_exist) {
        const codefile = {
          filename: `${GetTeamCodes?.contest_team_code[0].code_name}.cpp`,
          url: `${contestData?.contest_by_pk?.name}/code/${teamid}/${GetTeamCodes?.contest_team_code[0].code_id}.cpp`,
        };
        message.info("开始下载:" + codefile.filename);
        downloadFile(codefile.url);
      } else if (py_exist) {
        const codefile = {
          filename: `${GetTeamCodes?.contest_team_code[0].code_name}.py`,
          url: `${contestData?.contest_by_pk?.name}/code/${teamid}/${GetTeamCodes?.contest_team_code[0].code_id}.py`,
        };
        message.info("开始下载:" + codefile.filename);
        downloadFile(codefile.url);
      }
    } catch (err) {
      message.error("下载失败");
      console.log(err);
    }
  };
  const handleCodeChange = async (lang: string, codeName: string) => {
    AddTeamCode({
      variables: {
        team_id: teamid!,
        code_name: codeName,
        language: lang,
        //compile_status:`${contestData?.contest_by_pk?.name}/code/${teamid}/${GetTeamCodes?.contest_team_code[0].compile_status}` ?? 'Waiting',
        compile_status: "Waiting",
      },
    });
  };
  const handleOnchange = async (info: any) => {
    if (info.file.status === "done") {
      message.success("上传成功");
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const downloadCompile = async () => {
    try {
      const response = await axios.get(
        `${contestData?.contest_by_pk?.name}/code/${teamid}/${GetTeamCodes?.contest_team_code[0].code_id}.log}`,
        {
          responseType: "blob",
        },
      );
      //let codeTime: string;

      FileSaver.saveAs(
        response.data,
        GetTeamInfo?.contest_team_by_pk?.team_name?.replace(
          /[&|\\*^%$'"#@-]/g,
          "",
        ) +
          "_" +
          GetTeamCodes?.contest_team_code[0].code_name +
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

  const columns: ColumnsType<datatype> = [
    {
      title: "代码名",
      dataIndex: "codename",
    },

    {
      title: "代码更新时间",
      dataIndex: "updatetime",
    },
    {
      title: "下载代码",
      dataIndex: "download",
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
              message.info(
                `下载代码${GetTeamCodes?.contest_team_code[count].code_name}的编译信息`,
              );
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
  return (
    <Layout>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Title level={2}>代码库管理</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Text mark>
            这里是代码库，你的所有代码（
            <Typography.Text code style={{ color: "black" }}>
              AI.cpp
            </Typography.Text>
            或
            <Typography.Text code style={{ color: "black" }}>
              AI.py
            </Typography.Text>
            ）都在这里，你可以给任意角色分配代码库中的任意编译成功的代码
          </Typography.Text>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <div>
            <Upload
              accept=".cpp,.py"
              customRequest={handleUpload}
              onChange={handleOnchange}
            >
              <Button>
                添加新代码
                <UploadOutlined /> 上传
              </Button>
            </Upload>

            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={GetTeamCodes?.contest_team_code.map((item, index) => {
                return {
                  key: index,
                  codename: item.code_name,
                  updatetime: item.created_at,
                } as datatype;
              })}
              columns={columns as ColumnTypes}
            />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};
export default CodePagesource;
