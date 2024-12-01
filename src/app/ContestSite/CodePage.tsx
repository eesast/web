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
  Tooltip,
  Typography,
  Input,
  Form,
  Select,
  Space,
} from "antd";
import type { InputRef } from "antd";
import {
  InboxOutlined,
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
import NotJoined from "./Components/NotJoined";

/* ---------------- 接⼝和类型定义 ---------------- */
interface Item {
  key: string;
  codename: string;
  updatetime: string;
}
interface EditableRowProps {
  index: number;
}
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}
interface playertype {
  key: string;
  team_label: string;
  player_name: string;
  code_index: number;
  code_name: string;
  updatetime: string;
  operation: string;
  role: string;
}
interface datatype {
  key: React.Key;
  codename: string;
  updatetime: string;
}
/* ---------------- 不随渲染刷新的常量和组件 ---------------- */
const { Dragger } = Upload;
type ColumnsType<T> = TableProps<T>["columns"];
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
/* ---------------- 主页面 ---------------- */
const CodePage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */

  //linqiushi
  const url = useUrl();
  const { Option } = Select;
  const { Paragraph } = Typography;
  const Contest_id = url.query.get("contest");
  const [selectedCodeId, setSelectedCodeId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [editingCodeKey, setEditingCodeKey] = useState("");
  const [editingRoleKey, setEditingRoleKey] = useState("");
  const codeIndexMap = new Map();
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

  const { data: contestSwitchData } = graphql.useGetContestSwitchSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const { data: GetTeamInfo } = graphql.useGetTeamInfoQuery({
    variables: {
      team_id: teamid,
    },
    skip: !teamid,
  });

  const { data: teamCodesData, error: teamCodesError } =
    graphql.useGetTeamCodesSubscription({
      variables: {
        team_id: teamid,
      },
      skip: !teamid,
    });

  const { data: teamPlayersData, refetch: refetchTeamPlayers } =
    graphql.useGetTeamPlayersSuspenseQuery({
      variables: {
        team_id: teamid,
      },
      skip: !teamid,
    });

  // 获取比赛状态
  const { data: contestData, error: contestError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: contestPlayersData } = graphql.useGetContestPlayersQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  //linqiushi:修改后的数据库
  const [AddTeamCode, { error: codeError }] = graphql.useAddTeamCodeMutation();

  const [updatePlayerCodes] = graphql.useUpdateTeamPlayerMutation();

  const [deleteTeamCode] = graphql.useDeleteTeamCodeMutation();

  const [updateTeamCodeName] = graphql.useUpdateTeamCodeNameMutation();

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestError) {
      console.log(contestError.message);
    }
  }, [contestError]);

  useEffect(() => {
    if (codeError) {
      console.log(codeError.message);
    }
  });

  useEffect(() => {
    if (teamCodesError) {
      console.log(teamCodesError.message);
    }
  });

  if (!teamid) {
    return <NotJoined />;
  }

  /* ---------------- 业务逻辑函数 ---------------- */
  const open = contestSwitchData?.contest_by_pk?.code_upload_switch;
  // 编译代码
  const EditableContext = React.createContext<FormInstance<any> | null>(null);
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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleUpload = async (e: RcCustomRequestOptions) => {
    if (!open) {
      message.info("代码功能暂未开放");
      return;
    }
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

  const handleDelete = async (code_id: string) => {
    if (!open) {
      message.info("代码功能暂未开放");
      return;
    }
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
    if (!open) {
      message.info("代码功能暂未开放");
      return;
    }
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
    if (!open) {
      message.info("代码功能暂未开放");
      return;
    }
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
            teamCodesData?.contest_team_code[0].code_name +
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

  const resetCodeName = async (
    newName: string,
    code_id: string,
    lang: string,
  ) => {
    if (!open) {
      message.info("代码功能暂未开放");
      return;
    }
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

  const isEditingCode = (record: any) => record.key === editingCodeKey;

  const isEditingRole = (record: any) => record.key === editingRoleKey;

  const handlePlayerRoleChange = async (key: string, role: string) => {
    if (!open) {
      message.info("代码功能暂未开放");
      return;
    }
    try {
      await updatePlayerCodes({
        variables: {
          team_id: teamid,
          player: key,
          code_id: teamPlayersData?.contest_team_player?.find(
            (code) => code.player === key,
          )?.player_code?.code_id!,
          role: role,
        },
      });
      message.success("角色属性更新成功");
      refetchTeamPlayers();
      setEditingRoleKey("");
    } catch (error) {
      message.error("更新失败，请重试");
    }
  };

  const handlePlayerCodesChange = async (
    key: string,
    code_id: string | undefined | null,
  ) => {
    if (!open) {
      message.info("代码功能暂未开放");
      return;
    }
    try {
      await updatePlayerCodes({
        variables: {
          team_id: teamid,
          player: key,
          code_id: code_id,
          role: teamPlayersData?.contest_team_player?.find(
            (code) => code.player === key,
          )?.role!,
        },
      });
      message.success("角色代码更新成功");
      refetchTeamPlayers();
      setEditingCodeKey("");
    } catch (error) {
      console.log(error);
      message.error("更新失败，请重试");
    }
  };

  teamCodesData?.contest_team_code.forEach((code, index) => {
    codeIndexMap.set(code.code_id, index + 1); // 存储 code_name 到 codeindex 的映射
  });

  const dataSourcePlayer = contestPlayersData?.contest_player
    ? [...contestPlayersData?.contest_player]
        .sort((a, b) => a.player_label.localeCompare(b.player_label))
        ?.map((item, index) => {
          const code = teamPlayersData?.contest_team_player.find(
            (code) => code.player === item.player_label,
          );
          return {
            key: item.player_label,
            team_label: item.team_label,
            code_index: codeIndexMap.get(code?.player_code?.code_id),
            code_name: code?.player_code?.code_name,
            player_name: item.player_label,
            updatetime: code?.player_code?.created_at,
            role: code?.role,
          } as playertype;
        })
    : [];

  const dataSourceCodes = teamCodesData?.contest_team_code.map(
    (item, index) => {
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
    },
  );
  /* ---------------- ⻚⾯组件 ---------------- */
  const columnsPlayer: ColumnsType<playertype> = [
    {
      title: "战队",
      width: "10%",
      dataIndex: "team_label",
    },
    {
      title: "角色",
      width: "10%",
      dataIndex: "player_name",
    },
    {
      title: <Tooltip title="仅作统计用，不影响比赛结果">技能/属性</Tooltip>,
      width: "10%",
      dataIndex: "role",
      render: (text, record) => {
        if (isEditingRole(record)) {
          const rolesJson = contestPlayersData?.contest_player?.find(
            (item) => item?.player_label === record?.player_name,
          )?.roles_available;
          const roles = rolesJson ? JSON.parse(rolesJson) : [];
          return (
            <Tooltip title="仅作统计用，不影响比赛结果">
              <Select
                allowClear
                style={{ width: "100%" }}
                defaultValue={text}
                onChange={(value) => setSelectedRole(value)}
              >
                {roles.map((role: string, idx: string) => (
                  <Option key={idx} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Tooltip>
          );
        }
        return <Tooltip title="仅作统计用，不影响比赛结果">{text}</Tooltip>;
      },
    },
    {
      title: "代码编号（与下表一致）",
      width: "10%",
      dataIndex: "code_index",
    },
    {
      title: "代码名",
      width: "15%",
      dataIndex: "code_name",
      render: (text, record) => {
        if (isEditingCode(record)) {
          return (
            <Select
              allowClear
              style={{ width: "100%" }}
              defaultValue={text}
              onChange={(value) => setSelectedCodeId(value)}
            >
              {teamCodesData?.contest_team_code
                .filter((item) => {
                  return (
                    item.compile_status === "No Need" ||
                    item.compile_status === "Completed"
                  );
                })
                .map((code, idx) => (
                  <Option
                    key={idx}
                    value={code.code_id}
                  >{`代码${codeIndexMap.get(code.code_id)} : ${code.code_name}`}</Option>
                ))}
            </Select>
          );
        }
        return text;
      },
    },
    {
      title: "代码上传时间",
      width: "15%",
      dataIndex: "updatetime",
      render: (updatetime: string) =>
        updatetime
          ? new Date(updatetime).toLocaleString("zh-CN", {
              hour12: false,
            })
          : "",
    },
    {
      title: "选择代码",
      width: "15%",
      dataIndex: "selectcode",
      render: (_, record) => {
        const editable = isEditingCode(record);
        return editable ? (
          <div>
            <Button
              type="primary"
              style={{ marginRight: "20px" }}
              onClick={() =>
                handlePlayerCodesChange(record.key, selectedCodeId)
              }
            >
              保存
            </Button>
            <Button onClick={() => setEditingCodeKey("")}>取消</Button>
          </div>
        ) : (
          <Button
            disabled={!open}
            onClick={() => setEditingCodeKey(record.key)}
          >
            选择代码
          </Button>
        );
      },
    },
    {
      title: "选择属性",
      width: "15%",
      dataIndex: "selectrole",
      render: (_, record) => {
        const editable = isEditingRole(record);
        return editable ? (
          <div>
            <Button
              type="primary"
              style={{ marginRight: "20px" }}
              onClick={() => handlePlayerRoleChange(record.key, selectedRole)}
            >
              保存
            </Button>
            <Button onClick={() => setEditingRoleKey("")}>取消</Button>
          </div>
        ) : (
          <Button
            disabled={!open}
            onClick={() => setEditingRoleKey(record.key)}
          >
            选择属性
          </Button>
        );
      },
    },
  ];

  const columnsCodes: ColumnsType<datatype> = [
    {
      title: "代码编号",
      width: "10%",
      dataIndex: "codeindex",
    },
    {
      title: "代码名（点击修改）",
      width: "15%",
      dataIndex: "codename",
      render: (item: any) => {
        const [filename, lang] = item.code_name.split(".");
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Paragraph
              editable={
                open && {
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
                }
              }
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
      title: "代码上传时间",
      width: "15%",
      dataIndex: "updatetime",
      render: (updatetime: string) =>
        new Date(updatetime).toLocaleString("zh-CN", {
          hour12: false,
        }),
    },
    {
      title: "编译状态",
      width: "15%",
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
      width: "15%",
      dataIndex: "compile_info",
      render: (item: any) => (
        <Row justify="start">
          <Button
            disabled={
              item.compile_status !== "Completed" &&
              item.compile_status !== "Failed"
            }
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
      width: "15%",
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
      width: "15%",
      dataIndex: "delete",
      render: (code_id: string) => (
        <Row justify="start">
          <Button
            disabled={!open}
            onClick={() => handleDelete(code_id)}
            type="primary"
            danger
          >
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
          <Typography.Title level={2}>角色代码选择</Typography.Title>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSourcePlayer}
            columns={columnsPlayer as ColumnTypes}
          />
        </Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Typography.Title level={2}>我的代码库</Typography.Title>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Dragger
            multiple
            disabled={!open}
            accept=".cpp,.py"
            customRequest={handleUpload}
            onChange={handleOnchange}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">拖拽上传AI.cpp或AI.py</p>
            <p className="ant-upload-hint">
              支持同时上传多个文件，也可点击选择文件
            </p>
          </Dragger>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSourceCodes}
            columns={columnsCodes as ColumnTypes}
          />
        </Col>
      </Row>
    </Layout>
  );
};
export default CodePage;
