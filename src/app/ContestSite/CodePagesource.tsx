import React, { useContext, useEffect, useRef, useState } from "react";
import {
  UploadRequestOption as RcCustomRequestOptions,
  RcFile,
} from "rc-upload/lib/interface";
import {
  Table,
  Button,
  message,
  Upload,
  Layout,
  Row,
  Col,
  Typography,
  Input,
  Form,
  Space,
} from "antd";
import type { InputRef } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  SmileTwoTone,
  LoadingOutlined,
  SyncOutlined,
  FrownTwoTone,
  CodeOutlined,
} from "@ant-design/icons";
import { uploadFile, downloadFile, existFile, deleteFile } from "../../api/cos";
import type { TableProps } from "antd/lib/table";
import axios, { AxiosError } from "axios";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import { FormInstance } from "antd/lib";
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
    codename: string;
    updatetime: string;
  }
  type EditableTableProps = Parameters<typeof Table>[0];
  type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const handleUpload = async (e: RcCustomRequestOptions) => {
    const lang = (e.file as RcFile).name.split(".").slice(-1).join("");
    const codeName = (e.file as RcFile).name;
    try {
      if (lang === "cpp" || lang === "py") {
        const code_id = await handleCodeChange(lang, codeName);
        const codeUrl = `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.${lang}`;
        const result = await uploadFile(e.file, codeUrl);
        const xhr = new XMLHttpRequest();
        e.onSuccess!(result, xhr);

        //上传成功后发送编译请求
        if (lang === "cpp") {
          await axios.post("code/compile-start", {
            code_id: code_id,
          });
        }
      } else {
        e.onError!(new Error("不支持的文件类型"));
      }
    } catch (err) {
      e.onError!(new Error("上传失败"));
    }
  };
  const handleDownload = async (code_name: string, code_id: string) => {
    try {
      const cpp_exist = await existFile(
        `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.cpp`,
      );
      const py_exist = await existFile(
        `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.py`,
      );
      if ((cpp_exist && py_exist) || (!cpp_exist && !py_exist)) {
        message.error("文件管理错误");
      }
      if (cpp_exist) {
        const codefile = {
          filename: code_name,
          url: `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.cpp`,
        };
        message.info("开始下载:" + codefile.filename);
        downloadFile(codefile.url, codefile.filename);
      } else if (py_exist) {
        const codefile = {
          filename: code_name,
          url: `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.py`,
        };
        message.info("开始下载:" + codefile.filename);
        downloadFile(codefile.url, codefile.filename);
      }
    } catch (err) {
      message.error("下载失败");
      console.log(err);
    }
  };

  const [deleteTeamCode] = graphql.useDeleteTeamCodeMutation();
  const handleDelete = async (code_id: string) => {
    try {
      const cpp_exist = await existFile(
        `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.cpp`,
      );
      const py_exist = await existFile(
        `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.py`,
      );
      if ((cpp_exist && py_exist) || (!cpp_exist && !py_exist)) {
        message.error("文件管理错误");
      } else {
        if (cpp_exist) {
          await deleteFile(
            `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.cpp`,
          );
          //删除可执行文件
          await deleteFile(
            `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}`,
          );
        } else if (py_exist) {
          await deleteFile(
            `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.py`,
          );
        }
        await deleteFile(
          `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.log`,
        );
        //删除网络请求信息
        await deleteFile(
          `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.curl.log`,
        );

        await deleteTeamCode({
          variables: {
            code_id: code_id,
          },
        });

        message.success("删除成功");
      }
    } catch (err) {
      message.error("删除失败");
      console.log(err);
    }
  };

  const handleCodeChange = async (lang: string, codeName: string) => {
    const response = await AddTeamCode({
      variables: {
        team_id: teamid!,
        code_name: codeName,
        language: lang,
        compile_status: lang === "py" ? "No Need" : "Waiting",
      },
    });
    return response.data?.insert_contest_team_code_one?.code_id;
  };
  const handleOnchange = async (info: any) => {
    if (info.file.status === "done") {
      message.success("上传成功");
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const downloadCompile = async (code_id: string) => {
    try {
      const log_exist = await existFile(
        `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.log`,
      );
      if (log_exist) {
        const codefile = {
          filename:
            GetTeamInfo?.contest_team_by_pk?.team_name?.replace(
              /[&|\\*^%$'"#@-]/g,
              "",
            ) +
            "_" +
            GetTeamCodes?.contest_team_code[0].code_name +
            "_compile_log.txt",
          url: `${contestData?.contest_by_pk?.name}/code/${teamid}/${code_id}.log`,
        };
        message.info("开始下载:" + codefile.filename);
        downloadFile(codefile.url, codefile.filename);
      } else {
        message.error("编译信息不存在");
      }
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("认证失败");
      } else {
        message.error("未知错误");
      }
    }
  };

  const [updateTeamCodeName] = graphql.useUpdateTeamCodeNameMutation();

  const resetCodeName = async (
    newName: string,
    code_id: string,
    lang: string,
  ) => {
    try {
      await updateTeamCodeName({
        variables: {
          code_id: code_id,
          code_name: newName + "." + lang,
        },
      });
      message.success("修改成功");
    } catch (err) {
      message.error("修改失败");
    }
  };

  const { Paragraph } = Typography;

  const columns: ColumnsType<datatype> = [
    {
      title: "代码编号",
      dataIndex: "codeindex",
    },
    {
      title: "代码名（点击修改）",
      dataIndex: "codename",
      render: (item: any) => {
        const [filename, lang] = item.code_name.split(".");
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Paragraph
              editable={{
                onChange: (newName) => {
                  //检测文件名是否合法
                  if (newName === "") {
                    message.warning("文件名不能为空");
                    return;
                  }
                  const reg = /^[a-zA-Z0-9_]+$/;
                  if (!reg.test(newName)) {
                    message.warning("文件名只能包含字母、数字和下划线");
                    return;
                  }
                  resetCodeName(newName, item.code_id, lang);
                },
                triggerType: ["text"],
              }}
              code
            >
              {filename}
            </Paragraph>
            <Paragraph>.{lang}</Paragraph>
          </div>
        );
      },
    },

    {
      title: "代码更新时间",
      dataIndex: "updatetime",
      render: (updatetime: string) =>
        new Date(updatetime).toLocaleString("zh-CN", {
          hour12: false,
        }),
    },
    {
      title: "编译状态",
      dataIndex: "compile_status",
      render: (compile_status: string) => {
        function Status(compile_status: string) {
          switch (compile_status) {
            case "Completed":
              return (
                <Space>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                  {compile_status}
                </Space>
              );
            case "No Need":
              return (
                <Space>
                  <SmileTwoTone twoToneColor="#52c41a" />
                  {compile_status}
                </Space>
              );
            case "Failed":
              return (
                <Space>
                  <FrownTwoTone twoToneColor="red" />
                  {compile_status}
                </Space>
              );
            case "Waiting":
              return (
                <Space>
                  <SyncOutlined spin />
                  {compile_status}
                </Space>
              );
            case "Compiling":
              return (
                <Space>
                  <LoadingOutlined spin />
                  {compile_status}
                </Space>
              );
          }
        }

        return Status(compile_status);
      },
    },
    {
      title: "编译信息",
      dataIndex: "compile_info",
      render: (item: any) => (
        <Row justify="start">
          <Button
            disabled={item.compile_status !== "Completed"}
            onClick={() => {
              downloadCompile(item.code_id).catch((e) => {
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
    {
      title: "下载代码",
      dataIndex: "download",
      render: (item: any) => (
        <Row justify="start">
          <Button onClick={() => handleDownload(item.code_name, item.code_id)}>
            <DownloadOutlined />
            下载
          </Button>
        </Row>
      ),
    },
    {
      title: "删除代码",
      dataIndex: "delete",
      render: (code_id: string) => (
        <Row justify="start">
          <Button onClick={() => handleDelete(code_id)} type="primary" danger>
            <DeleteOutlined />
            删除
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
              showUploadList={false}
            >
              <Button>
                添加新代码
                <UploadOutlined /> 上传
              </Button>
            </Upload>
            <br />
            <br />

            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={GetTeamCodes?.contest_team_code.map((item, index) => {
                return {
                  key: index,
                  codeindex: index + 1,
                  codename: item as any,
                  updatetime: item.created_at,
                  compile_status: item.compile_status,
                  compile_info: item,
                  download: item,
                  delete: item.code_id,
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
