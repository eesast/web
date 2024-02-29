import React, { useState, useEffect, useRef } from "react";
import {
  Space,
  Typography,
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
import { getStatusText, getStatusValue } from "../../api/helpers/application";
import get from "lodash.get";
import { getUserInfo } from "../../api/helpers/auth";
import { FilterConfirmProps } from "antd/lib/table/interface";
import * as graphql from "@/generated/graphql";

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

const HonorApplicationPage = () => {
  const userInfo = getUserInfo();
  const [info, setInfo] = useState({
    honors: [""],
    honor: {
      start_A: new Date(),
      start_B: new Date(),
      end_A: new Date(),
      end_B: new Date(),
    },
  });

  useEffect(() => {
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

  const {
    loading: applicationLoading,
    error: applicationError,
    data: applicationData,
    refetch: refetchApplications,
  } = graphql.useGetHonorApplicationsQuery({
    variables: {
      _id: userInfo?._id!,
      _gte: info.honor.start_A,
    },
    skip: userInfo?.role === "counselor",
  });

  useEffect(() => {
    if (applicationError) {
      message.error("申请加载失败");
    }
  }, [applicationError]);

  const [applicationFormVisible, setApplicationFormVisible] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<graphql.GetHonorApplicationsQuery["honor_application"][0]>();

  const [form] = Form.useForm();

  const [
    addApplication,
    { loading: applicationAdding, error: addApplicationError },
  ] = graphql.useAddHonorApplicationMutation();

  useEffect(() => {
    if (addApplicationError) {
      message.error("申请提交失败");
    }
  }, [addApplicationError]);

  const [
    updateApplication,
    { loading: applicationUpdating, error: updateApplicationError },
  ] = graphql.useUpdateHonorApplicationMutation();

  useEffect(() => {
    if (updateApplicationError) {
      message.error("申请更新失败");
    }
  }, [updateApplicationError]);

  const handleApplicationEdit = async () => {
    try {
      form.validateFields();
    } catch {}

    const values = form.getFieldsValue();

    if (editingApplication) {
      await updateApplication({
        variables: {
          id: editingApplication.id,
          honor: values.honor,
          statement: values.statement,
          attachment_url: values.attachment_url,
        },
      });
    } else {
      await addApplication({
        variables: {
          student_id: userInfo?._id!,
          honor: values.honor,
          statement: values.statement,
          attachment_url: values.attachment_url,
        },
      });
    }

    setApplicationFormVisible(false);
    setEditingApplication(undefined);
    form.resetFields();

    refetchApplications();
  };

  const [deleteApplication, { error: deleteApplicationError }] =
    graphql.useDeleteHonorApplicationMutation();

  useEffect(() => {
    if (deleteApplicationError) {
      message.error("申请删除失败");
    }
  }, [deleteApplicationError]);

  const handleApplicationDelete = async (id: string) => {
    confirm({
      title: "确定要删除此申请吗？",
      icon: <ExclamationCircleOutlined />,
      content: "此操作不可恢复。",
      onOk: async () => {
        await deleteApplication({ variables: { id } });
        await refetchApplications();
      },
    });
  };

  const {
    loading: applicationsForCounselorsLoading,
    error: applicationsForCounselorsError,
    data: applicationsForCounselors,
    refetch: refetchApplicationsForCounselors,
  } = graphql.useGetHonorApplicationsForCounselorsQuery({
    variables: { _gte: info.honor.start_A },
    skip: userInfo?.role !== "counselor",
  });

  useEffect(() => {
    if (applicationsForCounselorsError) {
      message.error("申请加载失败");
    }
  }, [applicationsForCounselorsError]);

  const searchInput = useRef<InputRef>(null);
  const [, setSearchText] = useState<React.Key>("");

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

  const getColumnSearchProps: (
    dataIndex:
      | keyof graphql.GetHonorApplicationsForCounselorsQuery["honor_application"][0]
      | (
          | keyof graphql.GetHonorApplicationsForCounselorsQuery["honor_application"][0]
          | "name"
          | "class"
        )[],
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
      get(record, dataIndex)
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current && searchInput.current.select());
      }
    },
  });

  const [
    updateApplicationStatus,
    {
      loading: updateApplicationStatusLoading,
      error: updateApplicationStatusError,
    },
  ] = graphql.useUpdateHonorApplicationStatusMutation();

  const handleApplicationApprove = async (
    checked: boolean,
    item: graphql.GetHonorApplicationsForCounselorsQuery["honor_application"][0],
  ) => {
    await updateApplicationStatus({
      variables: {
        id: item.id,
        status: checked ? "approved" : "rejected",
      },
    });
    await refetchApplicationsForCounselors();
  };

  useEffect(() => {
    if (updateApplicationStatusError) {
      message.error("申请状态更新失败");
    }
  }, [updateApplicationStatusError]);

  const honorColumnsForCounselor: TableProps<
    graphql.GetHonorApplicationsForCounselorsQuery["honor_application"][0]
  >["columns"] = [
    {
      title: "学号",
      dataIndex: ["student", "id"],
      key: "student_id",
      ...getColumnSearchProps(["student", "id"], "学号"),
    },
    {
      title: "姓名",
      dataIndex: ["student", "name"],
      key: "name",
      ...getColumnSearchProps(["student", "name"], "姓名"),
    },
    {
      title: "班级",
      dataIndex: ["student", "class"],
      key: "class",
      ...getColumnSearchProps(["student", "class"], "班级"),
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
          loading={updateApplicationStatusLoading}
          onChange={(checked) => {
            handleApplicationApprove(checked, record);
          }}
        />
      ),
    },
  ];

  const [exportFormVisible, setExportFormVisible] = useState(false);
  const [exportHonor, setExportHonor] = useState("");
  const [exportClasses, setExportClasses] = useState<string[]>([]);
  const [exportLoading, setExportLoading] = useState(false);

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
            application.student.class?.includes(_class),
          ),
      )
      .map((i) => [
        i.id,
        i.student.id,
        i.student.name,
        i.student.class,
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
      "学号",
      "姓名",
      "班级",
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

  const [exportAllLoading, setExportAllLoading] = useState(false);

  const handleAllApplicationExport = async () => {
    setExportAllLoading(true);

    const applications = applicationsForCounselors!.honor_application.map(
      (i) => [
        i.id,
        i.student.id,
        i.student.name,
        i.student.class,
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
      "学号",
      "姓名",
      "班级",
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

  const [importFormVisible, setImportFormVisible] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [parseProgress, setParseProgress] = useState(0);

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

            updateApplicationStatus({
              variables: {
                id,
                status: getStatusValue(status),
              },
            });

            count++;
            setParseProgress(Math.round((count / applications.length) * 100));

            if (updateApplicationStatusError) {
              throw updateApplicationStatusError;
            }
          } catch (err) {
            throw err;
          }
        }),
      );
    } catch (err) {
      message.error("文件解析失败：" + err);
    } finally {
      setImportLoading(false);
    }
  };

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
            {info.honor.start_A.toLocaleString()} ~{" "}
            {info.honor.end_A.toLocaleString()}
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
            {info.honor.start_B.toLocaleString()} ~{" "}
            {info.honor.end_B.toLocaleString()}
          </p>
        </Timeline.Item>
      </Timeline>
      <Typography.Title level={2}>荣誉</Typography.Title>
      {userInfo?.role !== "counselor" && (
        <>
          <Button
            disabled={false}
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
                <Descriptions
                  key={item.id}
                  bordered
                  size="small"
                  css={`
                    margin: 24px auto;
                  `}
                >
                  <Descriptions.Item label="荣誉类型" span={2}>
                    {item.honor}
                  </Descriptions.Item>
                  <Descriptions.Item label="申请状态">
                    {item.status === "submitted" ? (
                      <Badge status="processing" text="已提交" />
                    ) : item.status === "approved" ? (
                      <Badge status="success" text="已通过" />
                    ) : (
                      <Badge status="error" text="未通过" />
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="申请陈述" span={3}>
                    <Text
                      css={`
                        word-rap: break-word;
                        white-space: pre-wrap;
                      `}
                    >
                      {item.statement}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="申请材料" span={2}>
                    {item.attachment_url && isUrl(item.attachment_url) ? (
                      <a
                        href={item.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.attachment_url}
                      </a>
                    ) : (
                      item.attachment_url ?? "无"
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="操作">
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
            confirmLoading={applicationUpdating || applicationAdding}
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
      {userInfo?.role === "counselor" && (
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
              expandedRowRender: record => (
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
            )}}
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
            onCancel={() => setImportFormVisible(false)}
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
                id="upload-file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                name="file"
                onChange={(e) => setFileList(e.target.files)}
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
