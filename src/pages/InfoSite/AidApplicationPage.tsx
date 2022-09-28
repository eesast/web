import React, { useEffect, useState, useRef } from "react";
import {
  Space,
  Typography,
  Timeline,
  List,
  Descriptions,
  message,
  Button,
  Form,
  Modal,
  Select,
  Input,
  Table,
  Progress,
} from "antd";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import {
  GetAidApplications,
  GetAidApplicationsVariables,
  GetAidApplications_aid_application,
  UpdateAidApplication,
  UpdateAidApplicationVariables,
  GetAidApplicationsForCounselors,
  GetAidApplicationsForCounselors_aid_application,
  DeleteAidApplication,
  DeleteAidApplicationVariables,
  AddAidApplication,
  AddAidApplicationVariables,
  GetUserById,
  GetUserByIdVariables,
} from "../../api/types";
import {
  GetAidApplications as GET_AID_APPLICATIONS,
  UpdateAidApplication as UPDATE_AID_APPLICATION,
  DeleteAidApplication as DELETE_AID_APPLICATION,
  GetAidApplicationsForCounselors as GET_AID_APPLICATIONS_FOR_COUNSELORS,
  AddAidApplication as ADD_AID_APPLICATION,
} from "../../api/info_aid.graphql";
import { GetUserById as GET_USER_BY_ID } from "../../api/user.graphql";
import isUrl from "is-url";
import { aids } from "../../configs";
import { generateThankLetter } from "../../helpers/application";
import type { ColumnProps, TableProps } from "antd/lib/table";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import get from "lodash.get";
import type { FilterDropdownProps } from "antd/lib/table/interface";
import { getUserInfo } from "../../helpers/auth";

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

const aidNames = Object.keys(aids);

const aidSelectOptions = [...aidNames, ""].map((i) => (
  <Option key={i} value={i}>
    {i || "全部"}
  </Option>
));

const classes = [9, 0, 1].reduce<string[]>(
  (pre, year) => [
    ...pre,
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((_class) => `无${year}${_class}`),
  ],
  []
);

const exportSelectOptions = ["全部", ...classes].map((_class) => (
  <Option key={_class} value={_class}>
    {_class}
  </Option>
));

const AidApplicationPage = () => {
  const userInfo = getUserInfo();

  const {
    loading: applicationLoading,
    error: applicationError,
    data: applicationData,
    refetch: refetchApplications,
  } = useQuery<GetAidApplications, GetAidApplicationsVariables>(
    GET_AID_APPLICATIONS,
    {
      variables: {
        _id: userInfo?._id!,
        _gte: "2022-01-01"
      },
      skip: userInfo?.role === "counselor",
    }
  );

  useEffect(() => {
    if (applicationError) {
      message.error("助学金加载失败");
    }
  }, [applicationError]);

  const [applicationFormVisible, setApplicationFormVisible] = useState(false);
  const [
    editingApplication,
    setEditingApplication,
  ] = useState<GetAidApplications_aid_application>();

  const [form] = Form.useForm();

  const [
    updateApplication,
    { loading: applicationUpdating, error: updateApplicationError },
  ] = useMutation<UpdateAidApplication, UpdateAidApplicationVariables>(
    UPDATE_AID_APPLICATION
  );

  useEffect(() => {
    if (updateApplicationError) {
      message.error("申请更新失败");
    }
  }, [updateApplicationError]);

  const [
    addApplication,
    { loading: applicationAdding, error: addApplicationError },
  ] = useMutation<
    AddAidApplication,
    AddAidApplicationVariables
  >(ADD_AID_APPLICATION);

  useEffect(() => {
    if (addApplicationError) {
      message.error("助学金记录添加失败");
    }
  }, [addApplicationError]);

  const handleApplicationEdit = async (mode: boolean) => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    const values = form.getFieldsValue();

    if (mode) await updateApplication({
      variables: {
        id: editingApplication!.id,
        thank_letter: values.thank_letter,
        form_url: values.form_url,
      },
    });
    else {
      const { data } = await client.query<
        GetUserById,
        GetUserByIdVariables
      >({
        query: GET_USER_BY_ID,
        variables: {
          id: values.student_number,
        },
      });

      if (data.user.length !== 1) {
        message.error("数据错误：用户不存在或不唯一！");
        return;
      }
      if (data.user[0].name !== values.name) {
        message.error("数据错误：姓名和学号不匹配！");
        return;
      }
      const id = data.user[0]._id;

      if (!aidNames.includes(values.aid)) {
        message.error("数据错误：助学金不存在！");
        return;
      }
      const codes = [...aids[values.aid as keyof typeof aids]].map(
        (i) => i.code
      );
      if (!codes.includes(values.code)) {
        message.error("数据错误：助学金代码错误！");
        return;
      }

      await addApplication({
        variables: {
          student_id: id,
          aid: values.aid,
          amount: values.amount,
          code: values.code,
        },
      });
    }

    setApplicationFormVisible(false);
    setEditingApplication(undefined);
    form.resetFields();
    refetchApplications();
    refetchApplicationsForCounselors();
    message.success("操作成功！");
  };

  const [deleteApplication, { error: deleteApplicationError }] = useMutation<
    DeleteAidApplication,
    DeleteAidApplicationVariables
  >(DELETE_AID_APPLICATION);

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
        await refetchApplicationsForCounselors();
      },
    });
  };

  const {
    loading: applicationsForCounselorsLoading,
    error: applicationsForCounselorsError,
    data: applicationsForCounselors,
    refetch: refetchApplicationsForCounselors,
  } = useQuery<GetAidApplicationsForCounselors>(
    GET_AID_APPLICATIONS_FOR_COUNSELORS,
    {
      skip: userInfo?.role !== "counselor",
    }
  );

  useEffect(() => {
    if (applicationsForCounselorsError) {
      message.error("申请加载失败");
    }
  }, [applicationsForCounselorsError]);

  const searchInput = useRef<Input>(null);

  const getColumnSearchProps: (
    dataIndex:
      | keyof GetAidApplicationsForCounselors_aid_application
      | (
          | keyof GetAidApplicationsForCounselors_aid_application
          | "name"
          | "class"
        )[],
    name: string
  ) => Partial<ColumnProps<GetAidApplicationsForCounselors_aid_application>> = (
    dataIndex,
    name
  ) => ({
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
      <SearchOutlined
        type="search"
        style={{ color: filtered ? "#027dcd" : undefined }}
      />
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

  const aidColumnsForCounselor: TableProps<GetAidApplicationsForCounselors_aid_application>["columns"] = [
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
      title: "助学金",
      dataIndex: "aid",
      key: "aid",
      filters: aidNames.map((aid) => ({
        text: aid,
        value: aid,
      })),
      onFilter: (value, record) => record.aid === value,
    },
    {
      title: "代码",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "金额",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button danger onClick={() => handleApplicationDelete(record.id)}>
          删除
        </Button>
      ),
    },
  ];

  const [, setSearchText] = useState<React.Key>("");

  const handleSearch = (
    selectedKeys: FilterDropdownProps["selectedKeys"],
    confirm: FilterDropdownProps["confirm"]
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters: FilterDropdownProps["clearFilters"]) => {
    clearFilters?.();
    setSearchText("");
  };

  const [exportFormVisible, setExportFormVisible] = useState(false);
  const [exportAid, setExportAid] = useState("");
  const [exportClasses, setExportClasses] = useState<string[]>([]);
  const [exportLoading, setExportLoading] = useState(false);

  const handleApplicationExport = async (
    example?: GetAidApplicationsForCounselors_aid_application[]
  ) => {
    if (!example && exportClasses.length === 0) {
      message.info("请选择筛选条件");
      return;
    }

    setExportLoading(true);

    const Xlsx = await import("xlsx");

    const applications = (example
      ? example
      : applicationsForCounselors!.aid_application.filter(
          (application) =>
            (exportAid ? application.aid === exportAid : true) &&
            (exportClasses.includes("全部")
              ? true
              : exportClasses.some((_class) =>
                  application.student.class?.includes(_class)
                ))
        )
    ).map((i) => [
      i.id,
      i.student.id,
      i.student.name,
      i.student.class,
      i.aid,
      i.code,
      i.amount,
    ]);

    if (applications.length === 0) {
      message.info("未找到符合条件的助学金");
      setExportLoading(false);
      return;
    }

    const head = ["申请 ID", "学号", "姓名", "班级", "助学金", "代码", "金额"];

    applications.unshift(head);

    const worksheet = Xlsx.utils.aoa_to_sheet(applications);
    const workbook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(workbook, worksheet, "助学金");
    Xlsx.writeFile(
      workbook,
      exportAid ? `助学金-${exportAid}.xlsx` : `助学金.xlsx`
    );

    if (!example) {
      message.success("助学金导出成功");
    }
    setExportLoading(false);
  };

  const handleExampleDownload = () => {
    const student = {
      id: 2016000000,
      name: "测试学生",
      department: "电子系",
      class: "无60",
    };
    const example = [
      {
        id: "8ac0f001-8d9f-4de7-96c5-9fbfb638ad5f",
        student,
        code: "Z2052032",
        aid: "清华之友——怀庄助学金",
        amount: 3200,
      },
      {
        id: "8bc0f001-8d9f-4de7-96c5-9fbfb638ad5f",
        student,
        code: "Z2062020",
        aid: "清华大学生活费助学金",
        amount: 2000,
      },
    ];
    handleApplicationExport(example as any);
  };

  const [importFormVisible, setImportFormVisible] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [parseProgress, setParseProgress] = useState(0);

  const client = useApolloClient();

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

      const applications = (Xlsx.utils.sheet_to_json(firstWorksheet, {
        header: 1,
      }) as (string | number)[][]).filter((i) => i.length !== 0);
      const head = applications.shift();
      if (!head || head.length < 6) {
        throw new Error("Parse error");
      }

      applications.map((application) => {
        const code = application[5].toString().trim();
        const name = application[4].toString().trim();

        if (!aidNames.includes(name)) {
          throw new Error("Parse error");
        }
        const codes = [...aids[name as keyof typeof aids]].map((i) => i.code);
        if (!codes.includes(code as any)) {
          throw new Error("Parse error");
        }

        return "";
      });

      let count = 0;
      await Promise.all(
        applications.map(async (application) => {
          try {
            const student_id = application[1].toString();
            const code = application[5].toString().trim();
            const aid = application[4].toString().trim();
            const amount = parseInt(application[6].toString().trim(), 10);

            const { data } = await client.query<
              GetUserById,
              GetUserByIdVariables
            >({
              query: GET_USER_BY_ID,
              variables: {
                id: student_id,
              },
            });

            // _id in database
            const id = data.user[0]._id;

            const { errors } = await client.mutate<
              AddAidApplication,
              AddAidApplicationVariables
            >({
              mutation: ADD_AID_APPLICATION,
              variables: {
                student_id: id,
                aid,
                amount,
                code,
              },
            });

            count++;
            setParseProgress(Math.round((count / applications.length) * 100));

            if (errors) {
              throw errors;
            }
          } catch (err) {
            throw err;
          }
        })
      );
      refetchApplicationsForCounselors();
    } catch (err) {
      message.error("文件解析失败：" + err);
    } finally {
      setFileList(null);
      setImportLoading(false);
    }
  };

  const [thankLetterGenerating, setThankLetterGenerating] = useState(false);

  return (
    <Space
      direction="vertical"
      css={`
        width: 100%;
      `}
    >
      <Typography.Title level={2}>关键时间点</Typography.Title>
      <Timeline>
        <Timeline.Item color="green">
          <p>第一阶段：助学金荣誉申请</p>
          <p>2022-10-01 00:00 ~ 2022-10-05 23:59</p>
        </Timeline.Item>
        <Timeline.Item color="green">
          <p>第二阶段：助学金申请结果公示</p>
          <p>2022-10-13 00:00 ~ 2022-10-15 23:59</p>
        </Timeline.Item>
      </Timeline>
      <Typography.Title level={2}>助学金</Typography.Title>
      {userInfo?.role !== "counselor" && (
        <>
          <List
            loading={applicationLoading}
            dataSource={applicationData?.aid_application}
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
                  <Descriptions.Item label="助学金" span={2}>
                    {item.aid}
                  </Descriptions.Item>
                  <Descriptions.Item label="金额" span={1}>
                    {item.amount}
                  </Descriptions.Item>
                  <Descriptions.Item label="专用申请表" span={3}>
                    {item.form_url && isUrl(item.form_url) ? (
                      <a
                        href={item.form_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.form_url}
                      </a>
                    ) : (
                      item.form_url ?? "无"
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="感谢信正文" span={3}>
                    <Text
                      css={`
                        word-rap: break-word;
                        white-space: pre-wrap;
                      `}
                    >
                      {item.thank_letter ?? "无"}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="操作" span={3}>
                    <Button
                      css={`
                        margin: 5px;
                      `}
                      onClick={() => {
                        setEditingApplication(item);
                        form.setFieldsValue(item);
                        setApplicationFormVisible(true);
                      }}
                    >
                      上传材料
                    </Button>
                    <Button
                      css={`
                        margin: 5px;
                      `}
                      loading={thankLetterGenerating}
                      disabled={!item.thank_letter}
                      onClick={() => {
                        setThankLetterGenerating(true);
                        try {
                          generateThankLetter(item);
                        } catch {
                          message.error("感谢信预览失败");
                        } finally {
                          setThankLetterGenerating(false);
                        }
                      }}
                    >
                      预览感谢信
                    </Button>
                  </Descriptions.Item>
                </Descriptions>
              );
            }}
          />
          <Modal
            visible={applicationFormVisible}
            title="编辑申请"
            centered
            destroyOnClose
            okText="提交"
            onCancel={() => {
              setApplicationFormVisible(false);
              setEditingApplication(undefined);
              form.resetFields();
            }}
            onOk={() => handleApplicationEdit(true)}
            maskClosable={false}
            confirmLoading={applicationUpdating}
          >
            <Form
              form={form}
              name="application"
              onFinish={() => handleApplicationEdit(true)}
              initialValues={editingApplication}
            >
              <Form.Item name="aid" label="助学金">
                <Select disabled>{aidSelectOptions}</Select>
              </Form.Item>
              <Form.Item name="code" label="代码">
                <Input disabled />
              </Form.Item>
              <Form.Item name="amount" label="金额">
                <Input disabled type="number" />
              </Form.Item>
              <Form.Item name="form_url" label="专用申请表">
                <Input placeholder="使用清华云盘上传文件并在此粘贴下载链接（带有 ?dl=1 后缀）" />
              </Form.Item>
              <Form.Item name="thank_letter" label="感谢信正文">
                <TextArea
                  css={`
                    resize: none;
                  `}
                  autoSize={{ minRows: 5 }}
                  placeholder="仅需输入感谢信正文，抬头和称呼等内容以及格式由系统预览自动生成。预览结果不包含姓名，需自行打印手写签字。"
                />
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
              导出助学金
            </Button>
            <Button
              disabled={applicationsForCounselorsLoading}
              onClick={handleExampleDownload}
            >
              下载导入样例
            </Button>
            <Button
              disabled={applicationsForCounselorsLoading}
              onClick={() => setImportFormVisible(true)}
            >
              导入助学金
            </Button>
            <div style={{ flex: 1 }} />
            <Button
              disabled={applicationsForCounselorsLoading}
              onClick={() => setApplicationFormVisible(true)}
            >
              添加助学金记录
            </Button>
          </Space>
          <Table
            loading={applicationsForCounselorsLoading}
            dataSource={applicationsForCounselors?.aid_application}
            columns={aidColumnsForCounselor}
            rowKey="id"
            expandedRowRender={(record) => (
              <Descriptions key={record.id} size="small">
                <Descriptions.Item label="专用申请表" span={3}>
                  {record.form_url && isUrl(record.form_url) ? (
                    <a
                      href={record.form_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {record.form_url}
                    </a>
                  ) : (
                    record.form_url ?? "无"
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="感谢信正文" span={3}>
                  <Text
                    css={`
                      word-rap: break-word;
                      white-space: pre-wrap;
                    `}
                  >
                    {record.thank_letter ?? "无"}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="操作" span={3}>
                  <Button
                    loading={thankLetterGenerating}
                    disabled={!record.thank_letter}
                    onClick={() => {
                      setThankLetterGenerating(true);
                      try {
                        generateThankLetter(record);
                      } catch {
                        message.error("感谢信预览失败");
                      } finally {
                        setThankLetterGenerating(false);
                      }
                    }}
                  >
                    预览感谢信
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            )}
          />
          <Modal
            visible={exportFormVisible}
            title="导出助学金"
            centered
            onOk={() => handleApplicationExport()}
            onCancel={() => setExportFormVisible(false)}
            maskClosable={false}
            confirmLoading={exportLoading}
          >
            <Form layout="vertical">
              <Form.Item required label="助学金">
                <Select<string>
                  placeholder="助学金名称"
                  onChange={(value) => setExportAid(value)}
                  defaultValue=""
                >
                  {aidSelectOptions}
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
                若班级不在下拉菜单内，请手动输入班级名，并回车，结果即会包含该班级的助学金记录。
              </Typography.Text>
            </Form>
          </Modal>
          <Modal
            visible={importFormVisible}
            title="导入助学金"
            centered
            onOk={handleApplicationImport}
            onCancel={() => setImportFormVisible(false)}
            maskClosable={false}
            confirmLoading={importLoading}
            okText="导入"
          >
            <Typography.Paragraph>
              上传 Excel 文件以添加助学金。Excel
              的格式应与样例文件相同，助学金的名称、代码及金额均应正确。
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
          <Modal
            visible={applicationFormVisible}
            title="添加助学金记录"
            centered
            destroyOnClose
            okText="提交"
            onCancel={() => {
              setApplicationFormVisible(false);
              setEditingApplication(undefined);
              form.resetFields();
            }}
            onOk={() => handleApplicationEdit(false)}
            maskClosable={false}
            confirmLoading={applicationAdding}
          >
            <Form
              form={form}
              name="application"
              onFinish={() => handleApplicationEdit(false)}
            >
              <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="student_number" label="学号" rules={[{ required: true, message: "请输入学号" }]}>
                <Input type="number"/>
              </Form.Item>
              <Form.Item name="aid" label="助学金" rules={[{ required: true, message: "请输入助学金名称" }]}>
                <Select>{aidSelectOptions}</Select>
              </Form.Item>
              <Form.Item name="code" label="代码" rules={[{ required: true, message: "请输入助学金代码" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="amount" label="金额" rules={[{ required: true, message: "请输入助学金金额" }]}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name="form_url" label="专用申请表">
                <Input disabled placeholder="学生填写：专用申请表下载链接" />
              </Form.Item>
              <Form.Item name="thank_letter" label="感谢信正文">
                <TextArea
                  css={`
                    resize: none;
                  `}
                  autoSize={{ minRows: 5 }}
                  disabled
                  placeholder="学生填写：感谢信正文"
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </Space>
  );
};

export default AidApplicationPage;
