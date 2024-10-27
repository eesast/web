import React, { useState, useEffect, useRef } from "react";
import {
  Space,
  Typography,
  Card,
  Timeline,
  Button,
  List,
  message,
  Descriptions,
  Badge,
  Modal,
  Form,
  Select,
  Input,
  Table,
  Switch,
  Progress,
  InputRef,
} from "antd";
import axios, { AxiosError } from "axios";
import isUrl from "is-url";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import type { ColumnProps, TableProps } from "antd/lib/table";
import type { FilterDropdownProps } from "antd/lib/table/interface";
import { getStatusText, getStatusValue } from "../../api/utils/application";
import { FilterConfirmProps } from "antd/lib/table/interface";
import * as graphql from "@/generated/graphql";
import { PageProps } from "..";

/* ---------------- 不随渲染刷新的组件 ---------------- */
const param: FilterConfirmProps = {
  closeDropdown: true,
};
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const grade = new Date().getFullYear() % 10;
const classes = [(grade + 7) % 10, (grade + 8) % 10, (grade + 9) % 10].reduce<
  string[]
>(
  (pre, year) => [
    ...pre,
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((_class) => `无${year}${_class}`),
  ],
  [],
);

const exportSelectOptions = classes.map((_class) => (
  <Option key={_class} value={_class}>
    {_class}
  </Option>
));

/* ---------------- 主页面 ---------------- */
const HonorApplicationPage: React.FC<PageProps> = ({ mode, user }) => {
  /* ---------------- states 和 引入 hooks ---------------- */
  const [selectedYear] = useState<number>(new Date().getFullYear());
  const [info, setInfo] = useState({
    honors: [""],
    honor: {
      start_A: new Date(),
      start_B: new Date(),
      end_A: new Date(),
      end_B: new Date(),
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setSearchText] = useState<React.Key>("");

  const searchInput = useRef<InputRef>(null);
  const [exportFormVisible, setExportFormVisible] = useState(false);
  const [exportHonor, setExportHonor] = useState("");
  const [exportClasses, setExportClasses] = useState<string[]>([]);
  const [exportLoading, setExportLoading] = useState(false);

  const [exportAllLoading, setExportAllLoading] = useState(false);

  const [importFormVisible, setImportFormVisible] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [parseProgress, setParseProgress] = useState(0);

  /* ---------------- 数据获取hook ---------------- */
  // 获取荣誉申请信息
  const {
    loading: applicationLoading,
    error: applicationError,
    data: applicationData,
    refetch: refetchApplications,
  } = graphql.useGetHonorApplicationsQuery({
    variables: {
      uuid: user.uuid!,
      year: selectedYear,
    },
    skip: user.role !== "student",
  });

  // 获取辅导员的荣誉申请信息
  const {
    loading: applicationsForCounselorsLoading,
    error: applicationsForCounselorsError,
    data: applicationsForCounselors,
    refetch: refetchApplicationsForCounselors,
  } = graphql.useGetHonorApplicationsForCounselorsQuery({
    variables: { year: selectedYear },
    skip: user.role !== "counselor",
  });

  /* ---------------- useEffect 部分 ---------------- */
  useEffect(() => {
    // 获取荣誉信息
    const fetch = async () => {
      try {
        const response = await axios.get("/application/info/honor");
        setInfo({
          honors: response.data.types,
          honor: {
            start_A: new Date(response.data.time.start_A),
            start_B: new Date(response.data.time.start_B),
            end_A: new Date(response.data.time.end_A),
            end_B: new Date(response.data.time.end_B),
          },
        });
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 401) {
          message.error("验证失败");
        } else if (err.response?.status === 500) {
          message.error("数据错误");
        } else {
          message.error("未知错误");
        }
      }
    };
    fetch();
  }, []);

  const honorSelectOptions = info.honors.map((i) => (
    <Option key={i} value={i}>
      {i}
    </Option>
  ));

  // 申请加载失败时提示
  useEffect(() => {
    if (applicationError) {
      message.error("申请加载失败");
      console.error(applicationError);
    }
  }, [applicationError]);

  const [applicationFormVisible, setApplicationFormVisible] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<graphql.GetHonorApplicationsQuery["honor_application"][0]>();

  const [form] = Form.useForm();

  const [applicationUpdating, setApplicationUpdating] =
    useState<boolean>(false);

  const handleApplicationEdit = async () => {
    try {
      form.validateFields();
    } catch {
      return;
    }

    const values = form.getFieldsValue();

    if (!values.honor || !values.statement) {
      message.error("请填写完整的申请信息");
      return;
    }

    setApplicationUpdating(true);
    try {
      if (editingApplication) {
        await axios.post(`/application/honor/update_one`, {
          id: editingApplication.id,
          honor: values.honor,
          statement: values.statement,
          attachment_url: values.attachment_url,
          student_uuid: user.uuid,
        });
        message.success("申请更新成功");
      } else {
        await axios.post(`/application/honor/insert_one`, {
          student_uuid: user.uuid,
          honor: values.honor,
          statement: values.statement,
          attachment_url: values.attachment_url,
        });
        message.success("申请提交成功");
      }
    } catch (err) {
      console.error(err);
      message.error("Error in submitting application");
    }

    setApplicationUpdating(false);
    setApplicationFormVisible(false);
    setEditingApplication(undefined);
    form.resetFields();

    refetchApplications();
  };

  // 申请加载失败时提示
  useEffect(() => {
    if (applicationsForCounselorsError) {
      message.error("申请加载失败");
    }
  }, [applicationsForCounselorsError]);

  /* ---------------- 其他函数和处理逻辑 ---------------- */
  // 删除申请
  const handleApplicationDelete = async (id: string) => {
    confirm({
      title: "确定要删除此申请吗？",
      icon: <ExclamationCircleOutlined />,
      content: "此操作不可恢复。",
      onOk: async () => {
        try {
          await axios.post(`/application/honor/delete_one`, {
            id: id,
            student_uuid: user.uuid,
          });
          message.success("申请删除成功");
        } catch (err) {
          console.error(err);
          message.error("Error in deleting application");
        }
        await refetchApplications();
      },
    });
  };

  // 处理搜索
  const handleSearch = (
    selectedKeys: FilterDropdownProps["selectedKeys"],
    confirm: FilterDropdownProps["confirm"],
  ) => {
    confirm(param);
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters: FilterDropdownProps["clearFilters"]) => {
    clearFilters?.();
    setSearchText("");
  };

  // 搜索栏
  const getColumnSearchProps: (
    dataIndex: "realname" | "class" | "student_no",
    name: string,
  ) => Partial<
    ColumnProps<
      graphql.GetHonorApplicationsForCounselorsQuery["honor_application"][0]
    >
  > = (dataIndex, name) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        css={`
          padding: 8px;
        `}
      >
        <Input
          ref={searchInput}
          placeholder={`搜索${name}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          css={`
            width: 188px;
            margin-bottom: 8px;
            display: block;
          `}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon={<SearchOutlined />}
          size="small"
          css={`
            width: 90px;
            margin-right: 8px;
          `}
        >
          搜索
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          css={`
            width: 90px;
          `}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#027dcd" : undefined }} />
    ),
    onFilter: (value, record) =>
      record["student"]![dataIndex]!.toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current && searchInput.current.select());
      }
    },
  });

  // 处理申请审批
  const handleApplicationApprove = async (
    checked: boolean,
    item: graphql.GetHonorApplicationsForCounselorsQuery["honor_application"][0],
  ) => {
    try {
      await axios.post(`/application/honor/update_status_one`, {
        id: item.id,
        status: checked ? "approved" : "rejected",
        counselor_uuid: user.uuid,
      });
      message.success("申请状态更新成功");
    } catch (err) {
      console.error(err);
      message.error("Error in approving application");
    }
    await refetchApplicationsForCounselors();
  };

  // 表格列
  const honorColumnsForCounselor: TableProps<
    graphql.GetHonorApplicationsForCounselorsQuery["honor_application"][0]
  >["columns"] = [
    {
      title: "学号",
      dataIndex: ["student", "student_no"],
      key: "student_id",
      ...getColumnSearchProps("student_no", "学号"),
    },
    {
      title: "姓名",
      dataIndex: ["student", "realname"],
      key: "name",
      ...getColumnSearchProps("realname", "姓名"),
    },
    {
      title: "班级",
      dataIndex: ["student", "class"],
      key: "class",
      ...getColumnSearchProps("class", "班级"),
    },
    {
      title: "荣誉类型",
      dataIndex: "honor",
      key: "honor",
      filters: info.honors.map((honor) => ({ text: honor, value: honor })),
      onFilter: (value, record) => record.honor === value,
    },
    {
      title: "申请状态",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "已提交",
          value: "submitted",
        },
        {
          text: "未通过",
          value: "rejected",
        },
        {
          text: "已通过",
          value: "approved",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text, record) => getStatusText(text),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Switch
          checked={record.status === "approved"}
          checkedChildren="已通过"
          unCheckedChildren="未通过"
          onChange={(checked) => {
            handleApplicationApprove(checked, record);
          }}
        />
      ),
    },
  ];

  // 导出申请
  const handleApplicationExport = async () => {
    if (!exportHonor || exportClasses.length === 0) {
      message.info("请选择筛选条件");
      return;
    }

    setExportLoading(true);

    const Xlsx = await import("xlsx");

    const applications = applicationsForCounselors!.honor_application
      .filter(
        (application) =>
          application.honor === exportHonor &&
          exportClasses.some((_class) =>
            application.student?.class?.includes(_class),
          ),
      )
      .map((i) => [
        i.id,
        i.student?.realname,
        i.student?.class,
        i.student?.student_no,
        exportHonor,
        getStatusText(i.status),
        i.statement,
        i.attachment_url,
      ]);

    if (applications.length === 0) {
      message.info("未找到符合条件的申请");
      setExportLoading(false);
      return;
    }

    const head = [
      "申请 ID",
      "姓名",
      "班级",
      "学号",
      "荣誉类型",
      "申请状态",
      "申请陈述",
      "申请材料",
    ];

    applications.unshift(head);

    const worksheet = Xlsx.utils.aoa_to_sheet(applications);
    const workbook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(workbook, worksheet, "荣誉申请");
    Xlsx.writeFile(workbook, `荣誉申请-${exportHonor}.xlsx`);

    message.success("申请导出成功");
    setExportLoading(false);
  };

  // 导出全部申请
  const handleAllApplicationExport = async () => {
    setExportAllLoading(true);

    const applications = applicationsForCounselors!.honor_application.map(
      (i) => [
        i.id,
        i.student?.realname,
        i.student?.class,
        i.student?.student_no,
        i.honor,
        getStatusText(i.status),
        i.statement,
        i.attachment_url,
      ],
    );

    if (applications.length === 0) {
      message.info("无申请");
      setExportAllLoading(false);
      return;
    }

    const Xlsx = await import("xlsx");

    const head = [
      "申请 ID",
      "姓名",
      "班级",
      "学号",
      "荣誉类型",
      "申请状态",
      "申请陈述",
      "申请材料",
    ];

    applications.unshift(head);

    const worksheet = Xlsx.utils.aoa_to_sheet(applications);
    const workbook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(workbook, worksheet, "全部荣誉申请");
    Xlsx.writeFile(workbook, `荣誉申请-全部.xlsx`);

    message.success("申请导出成功");
    setExportAllLoading(false);
  };

  // 导入申请
  const handleApplicationImport = async () => {
    if (!fileList || fileList.length !== 1) {
      message.info("请选择文件");
      return;
    }
    const file = fileList[0];

    setImportLoading(true);

    const Xlsx = await import("xlsx");

    try {
      const reader = new FileReader();
      const data = await new Promise<ArrayBuffer>((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject();
        };

        reader.onload = () => {
          resolve(reader.result as ArrayBuffer);
        };

        reader.readAsBinaryString(file);
      });
      const workbook = Xlsx.read(data, { type: "binary" });
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];

      const applications = (
        Xlsx.utils.sheet_to_json(firstWorksheet, {
          header: 1,
        }) as (string | number)[][]
      ).filter((i) => i.length !== 0);
      const head = applications.shift();
      if (!head || head.length < 6) {
        throw new Error("Parse error");
      }

      let count = 0;
      await Promise.all(
        applications.map(async (application) => {
          try {
            const id = application[0];
            const honor = application[4].toString().trim();
            const status = application[5].toString().trim();

            if (
              !["已提交", "未通过", "已通过"].includes(status) ||
              !info.honors.includes(honor as any)
            ) {
              throw new Error("Parse error");
            }

            await axios.post(`/application/honor/update_status_one`, {
              id,
              status: getStatusValue(status),
              counselor_uuid: user.uuid,
            });

            count++;
            setParseProgress(Math.round((count / applications.length) * 100));
          } catch (err) {
            throw err;
          }
        }),
      );
      await refetchApplicationsForCounselors();
      setParseProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // 清除文件输入
      }
      setFileList(null); // 清除文件列表
      message.success("导入成功!");
      setImportFormVisible(false);
    } catch (err) {
      message.error("文件解析失败：" + err);
    } finally {
      setImportLoading(false);
    }
  };

  // 取消导入
  const handleCancel = () => {
    setImportFormVisible(false);
    setParseProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 清除文件输入
    }
    setFileList(null); // 清除文件列表
  };

  /* ---------------- 页面渲染 ---------------- */
  return (
    <Space
      direction="vertical"
      css={`
        width: 100%;
      `}
    >
      <Typography.Title level={2}>关键时间点</Typography.Title>
      <Timeline>
        <Timeline.Item
          color={
            new Date() >= info.honor.start_A && new Date() <= info.honor.end_A
              ? "green"
              : "red"
          }
        >
          <p>第一阶段：荣誉申请</p>
          <p>
            {info.honor.start_A.toLocaleString(undefined, { hour12: false })} ~{" "}
            {info.honor.end_A.toLocaleString(undefined, { hour12: false })}
          </p>
        </Timeline.Item>
        <Timeline.Item
          color={
            new Date() >= info.honor.start_B && new Date() <= info.honor.end_B
              ? "green"
              : "red"
          }
        >
          <p>第二阶段：荣誉申请结果公示</p>
          <p>
            {info.honor.start_B.toLocaleString(undefined, { hour12: false })} ~{" "}
            {info.honor.end_B.toLocaleString(undefined, { hour12: false })}
          </p>
        </Timeline.Item>
      </Timeline>
      <Typography.Title level={2}>荣誉</Typography.Title>
      {user.role === "student" && (
        <>
          <Button
            disabled={false}
            type="primary"
            onClick={() => {
              if (new Date() < info.honor.start_A) {
                return message.info("未到申请时间！");
              } else if (new Date() > info.honor.end_A) {
                return message.warning("申请时间已过！");
              }
              setApplicationFormVisible(true);
            }}
          >
            申请荣誉
          </Button>
          <List
            loading={applicationLoading}
            dataSource={applicationData?.honor_application}
            renderItem={(item) => {
              return (
                <Card
                  hoverable
                  styles={{
                    body: {
                      padding: "20px",
                    },
                  }}
                  css={`
                    margin: 24px auto;
                  `}
                >
                  <Descriptions key={item.id} bordered size="small" column={8}>
                    <Descriptions.Item
                      label="荣誉类型"
                      span={3}
                      labelStyle={{
                        whiteSpace: "nowrap",
                        width: "90px",
                        fontWeight: "bold",
                      }}
                      contentStyle={{
                        width: "100px",
                      }}
                    >
                      {item.honor}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="申请状态"
                      span={5}
                      labelStyle={{
                        whiteSpace: "nowrap",
                        width: "90px",
                        fontWeight: "bold",
                      }}
                      contentStyle={{
                        width: "80px",
                      }}
                    >
                      {item.status === "submitted" ? (
                        <Badge status="processing" text="已提交" />
                      ) : item.status === "approved" ? (
                        <Badge status="success" text="已通过" />
                      ) : (
                        <Badge status="error" text="未通过" />
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="申请陈述"
                      span={8}
                      labelStyle={{
                        whiteSpace: "nowrap",
                        width: "90px",
                        fontWeight: "bold",
                      }}
                    >
                      <Text
                        css={`
                          word-rap: break-word;
                          white-space: pre-wrap;
                        `}
                      >
                        {item.statement}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="申请材料"
                      span={3}
                      labelStyle={{
                        whiteSpace: "nowrap",
                        width: "90px",
                        fontWeight: "bold",
                      }}
                      contentStyle={{
                        width: "80px",
                      }}
                    >
                      {item.attachment_url && isUrl(item.attachment_url) ? (
                        <a
                          href={item.attachment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.attachment_url}
                        </a>
                      ) : (
                        (item.attachment_url ?? "无")
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="操作"
                      span={5}
                      labelStyle={{
                        whiteSpace: "nowrap",
                        width: "90px",
                        fontWeight: "bold",
                      }}
                    >
                      <Button
                        css={`
                          margin: 5px;
                        `}
                        disabled={item.status !== "submitted"}
                        onClick={() => {
                          if (new Date() < info.honor.start_A) {
                            return message.info("未到申请时间！");
                          } else if (new Date() > info.honor.end_A) {
                            return message.warning("申请时间已过！");
                          }
                          setEditingApplication(item);
                          form.setFieldsValue(item);
                          setApplicationFormVisible(true);
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        css={`
                          margin: 5px;
                        `}
                        disabled={false}
                        danger
                        onClick={() => {
                          if (new Date() < info.honor.start_A) {
                            return message.info("未到申请时间！");
                          } else if (new Date() > info.honor.end_A) {
                            return message.warning("申请时间已过！");
                          }
                          handleApplicationDelete(item.id);
                        }}
                      >
                        删除
                      </Button>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              );
            }}
          />
          <Modal
            open={applicationFormVisible}
            title={editingApplication ? "编辑申请" : "新申请"}
            centered
            destroyOnClose
            okText="提交"
            onCancel={() => {
              setApplicationFormVisible(false);
              setEditingApplication(undefined);
              form.resetFields();
            }}
            onOk={handleApplicationEdit}
            maskClosable={false}
            confirmLoading={applicationUpdating}
          >
            <Form
              form={form}
              name="application"
              onFinish={handleApplicationEdit}
              initialValues={editingApplication}
            >
              <Form.Item
                name="honor"
                label="荣誉"
                rules={[{ required: true, message: "请选择所申请的荣誉类型" }]}
              >
                <Select placeholder="荣誉类型">{honorSelectOptions}</Select>
              </Form.Item>
              <Form.Item
                name="statement"
                label="申请陈述"
                rules={[{ required: true, message: "请输入申请陈述" }]}
              >
                <TextArea
                  css={`
                    resize: none;
                  `}
                  autoSize={{ minRows: 5 }}
                  placeholder="与所申请荣誉相对应的申请陈述"
                />
              </Form.Item>
              <Form.Item name="attachment_url" label="申请材料链接">
                <Input placeholder="推荐使用清华云盘上传文件并在此粘贴分享链接" />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
      {user.role === "teacher" && <></>}
      {user.role === "counselor" && (
        <>
          <Space direction="horizontal">
            <Button
              disabled={applicationsForCounselorsLoading}
              onClick={() => setExportFormVisible(true)}
            >
              导出申请
            </Button>
            <Button
              disabled={applicationsForCounselorsLoading}
              loading={exportAllLoading}
              onClick={() => handleAllApplicationExport()}
            >
              导出全部
            </Button>
            <Button
              disabled={applicationsForCounselorsLoading}
              onClick={() => setImportFormVisible(true)}
            >
              导入申请
            </Button>
          </Space>
          <Table
            loading={applicationsForCounselorsLoading}
            dataSource={applicationsForCounselors?.honor_application}
            columns={honorColumnsForCounselor}
            rowKey="id"
            expandable={{
              expandedRowRender: (record) => (
                <Descriptions key={record.id} size="small">
                  <Descriptions.Item label="申请陈述" span={3}>
                    <Text
                      css={`
                        word-wrap: break-word;
                        white-space: pre-wrap;
                      `}
                    >
                      {record.statement}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="申请材料" span={3}>
                    {record.attachment_url && isUrl(record.attachment_url) ? (
                      <a
                        href={record.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {record.attachment_url}
                      </a>
                    ) : (
                      record.attachment_url || "无"
                    )}
                  </Descriptions.Item>
                </Descriptions>
              ),
            }}
          />
          <Modal
            open={exportFormVisible}
            title="导出申请"
            centered
            onOk={handleApplicationExport}
            onCancel={() => setExportFormVisible(false)}
            maskClosable={false}
            confirmLoading={exportLoading}
          >
            <Form layout="vertical">
              <Form.Item required label="荣誉">
                <Select<string>
                  placeholder="荣誉类型"
                  onChange={(value) => setExportHonor(value)}
                >
                  {honorSelectOptions}
                </Select>
              </Form.Item>
              <Form.Item required label="班级">
                <Select<string[]>
                  mode="tags"
                  placeholder="选择需要导出的班级（可多选）"
                  onChange={(value) => setExportClasses(value)}
                >
                  {exportSelectOptions}
                </Select>
              </Form.Item>
              <Typography.Text>
                若班级不在下拉菜单内，请手动输入班级名，并回车，结果即会包含该班级的申请。
              </Typography.Text>
            </Form>
          </Modal>
          <Modal
            open={importFormVisible}
            title="导入申请"
            centered
            onOk={handleApplicationImport}
            onCancel={handleCancel}
            maskClosable={false}
            confirmLoading={importLoading}
            okText="导入"
          >
            <Typography.Paragraph>
              上传 Excel 文件以更新申请状态。Excel
              的格式应与导出文件相同，申请状态只能包含：已提交，未通过，已通过。
            </Typography.Paragraph>
            <div
              css={`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              `}
            >
              <input
                ref={fileInputRef}
                id="upload-file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                name="file"
                onChange={(e) => {
                  setFileList(e.target.files);
                  setParseProgress(0);
                }}
              />
              <label htmlFor="upload-file"></label>
              {parseProgress > 0 && (
                <Progress
                  type="circle"
                  percent={parseProgress}
                  status="active"
                />
              )}
            </div>
          </Modal>
        </>
      )}
    </Space>
  );
};

export default HonorApplicationPage;
