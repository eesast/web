import { useEffect, useState, useRef } from "react";
import {
  Badge,
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  List,
  message,
  Modal,
  Progress,
  Radio,
  Row,
  Space,
  Switch,
  Table,
  Timeline,
  Tooltip,
  Typography,
} from "antd";
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery,
} from "@apollo/client";
import {
  AddMentorApplication as ADD_MENTOR_APPLICATION,
  ChangeMentorAvailable as CHANGE_MENTOR_AVAILABLE,
  DeleteMentorApplication as DELETE_MENTOR_APPLICATION,
  GetMentorApplications as GET_MENTOR_APPLICATIONS,
  GetMentorApplicationsForCounselors as GET_MENTOR_APPLICATIONS_FOR_COUNSELORS,
  GetMentorAvailable as GET_MENTOR_AVAILABLE,
  GetMentorInfo as GET_MENTOR_INFO,
  GetMentorList as GET_MENTOR_LIST,
  UpdateMentorApplication as UPDATE_MENTOR_APPLICATION,
  UpdateMentorApplicationStatus as UPDATE_MENTOR_APPLICATION_STATUS,
  UpsertMentorInfo as UPSERT_MENTOR_INFO,
} from "../../api/info_mentor.graphql";
import { GetUserByName as GET_USER_BY_NAME } from "../../api/user.graphql";
import {
  AddMentorApplication,
  AddMentorApplicationVariables,
  ChangeMentorAvailable,
  ChangeMentorAvailableVariables,
  DeleteMentorApplication,
  DeleteMentorApplicationVariables,
  GetMentorApplications_mentor_application,
  GetMentorApplications,
  GetMentorApplicationsForCounselors,
  GetMentorApplicationsVariables,
  GetMentorAvailable,
  GetMentorAvailableVariables,
  GetMentorInfo,
  GetMentorInfoVariables,
  GetMentorList_user_by_role,
  GetMentorList,
  GetUserByName,
  GetUserByNameVariables,
  UpdateMentorApplication,
  UpdateMentorApplicationStatus,
  UpdateMentorApplicationStatusVariables,
  UpdateMentorApplicationVariables,
  UpsertMentorInfo,
  UpsertMentorInfoVariables,
} from "../../api/types";
import dayjs from "dayjs";
import type { TableProps, ColumnProps } from "antd/lib/table";
import type { FilterDropdownProps } from "antd/lib/table/interface";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { getStatusText } from "../../helpers/application";
import { getUserInfo } from "../../helpers/auth";
import { pick } from "../../helpers/utils";

const { Text } = Typography;

const MentorApplicationPage = () => {
  const userInfo = getUserInfo();

  const {
    loading: applicationLoading,
    error: applicationError,
    data: applicationData,
    refetch: refetchApplications,
  } = useQuery<GetMentorApplications, GetMentorApplicationsVariables>(
    GET_MENTOR_APPLICATIONS,
    {
      variables: {
        _id: userInfo?._id!,
      },
      skip: userInfo?.role === "counselor",
    }
  );

  const {
    loading: applicationForCounselorsLoading,
    error: applicationForCounselorsError,
    data: applicationForCounselorsData,
  } = useQuery<GetMentorApplicationsForCounselors>(
    GET_MENTOR_APPLICATIONS_FOR_COUNSELORS,
    {
      skip: userInfo?.role !== "counselor" && userInfo?.role !== "root",
    }
  );

  useEffect(() => {
    if (applicationError || applicationForCounselorsError) {
      message.error("申请加载失败");
    }
  }, [applicationError, applicationForCounselorsError]);

  const {
    loading: mentorAvailableLoading,
    data: mentorAvailableData,
    error: mentorAvailableError,
    refetch: refetchMentorAvailable,
  } = useQuery<GetMentorAvailable, GetMentorAvailableVariables>(
    GET_MENTOR_AVAILABLE,
    {
      variables: {
        _id: userInfo?._id!,
      },
      skip: userInfo?.role !== "teacher",
    }
  );

  useEffect(() => {
    if (mentorAvailableError) {
      message.error("导师接收状态加载失败");
    }
  }, [mentorAvailableError]);

  const [
    changeMentorAvailable,
    {
      loading: changeMentorAvailableLoading,
      error: changeMentorAvailableError,
    },
  ] = useMutation<ChangeMentorAvailable, ChangeMentorAvailableVariables>(
    CHANGE_MENTOR_AVAILABLE
  );

  useEffect(() => {
    if (changeMentorAvailableError) {
      message.error("导师接收状态更新失败");
    }
  }, [changeMentorAvailableError]);

  const handleMentorAvailableChange = async (checked: boolean) => {
    await changeMentorAvailable({
      variables: { _id: userInfo?._id!, available: checked },
    });
    await refetchMentorAvailable();
  };

  const [
    updateApplicationStatus,
    {
      loading: updateApplicationStatusLoading,
      error: updateApplicationStatusError,
    },
  ] = useMutation<
    UpdateMentorApplicationStatus,
    UpdateMentorApplicationStatusVariables
  >(UPDATE_MENTOR_APPLICATION_STATUS);

  useEffect(() => {
    if (updateApplicationStatusError) {
      message.error("申请状态更新失败");
    }
  }, [updateApplicationStatusError]);

  const handleApplicationStatusChange = async (
    status: "approved" | "submitted" | "rejected",
    item: GetMentorApplications_mentor_application
  ) => {
    await updateApplicationStatus({
      variables: {
        id: item.id,
        status: status,
      },
    });
    await refetchApplications();
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [
    editingApplication,
    setEditingApplication,
  ] = useState<GetMentorApplications_mentor_application>();
  const [form] = Form.useForm();

  const [
    addApplication,
    { loading: applicationAdding, error: addApplicationError },
  ] = useMutation<AddMentorApplication, AddMentorApplicationVariables>(
    ADD_MENTOR_APPLICATION
  );

  useEffect(() => {
    if (addApplicationError) {
      message.error("申请提交失败");
    }
  }, [addApplicationError]);

  const [
    updateApplication,
    { loading: applicationUpdating, error: updateApplicationError },
  ] = useMutation<UpdateMentorApplication, UpdateMentorApplicationVariables>(
    UPDATE_MENTOR_APPLICATION
  );

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
          statement: values.statement,
        },
      });
    } else {
      await addApplication({
        variables: {
          statement: values.statement,
          student_id: userInfo?._id!,
          mentor_id: selectedMentor?._id!,
        },
      });
    }

    setModalVisible(false);
    setEditingApplication(undefined);
    setSelectedMentor(undefined);
    form.resetFields();

    refetchApplications();
    refetchMentorList();
  };

  const [
    deleteMentorApplication,
    {
      loading: deleteMentorApplicationLoading,
      error: deleteMentorApplicationError,
    },
  ] = useMutation<DeleteMentorApplication, DeleteMentorApplicationVariables>(
    DELETE_MENTOR_APPLICATION
  );

  useEffect(() => {
    if (deleteMentorApplicationError) {
      message.error("删除申请失败");
    }
  }, [deleteMentorApplicationError]);

  const {
    data: mentorList,
    loading: mentorListLoading,
    error: mentorListError,
    refetch: refetchMentorList,
  } = useQuery<GetMentorList>(GET_MENTOR_LIST, {
    skip: userInfo?.role === "teacher",
  });

  useEffect(() => {
    if (mentorListError) {
      message.error("导师列表加载失败");
    }
  }, [mentorListError]);

  const searchInput = useRef<Input>(null);
  const [, setSearchText] = useState("");

  const handleSearch = (
    selectedKeys: FilterDropdownProps["selectedKeys"],
    confirm: FilterDropdownProps["confirm"]
  ) => {
    confirm();
    setSearchText(selectedKeys[0].toString());
  };

  const handleReset = (clearFilters: FilterDropdownProps["clearFilters"]) => {
    clearFilters?.();
    setSearchText("");
  };

  const getColumnSearchProps: (
    dataIndex: keyof GetMentorList_user_by_role,
    name: string
  ) => Partial<ColumnProps<GetMentorList_user_by_role>> = (
    dataIndex,
    name
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <Space
        direction="vertical"
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
            display: block;
          `}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            css={`
              width: 90px;
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
        </Space>
      </Space>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#027dcd" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]!.toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current && searchInput.current.select());
      }
    },
  });

  const [
    selectedMentor,
    setSelectedMentor,
  ] = useState<GetMentorList_user_by_role>();

  const mentorListColumnsForStudents: TableProps<GetMentorList_user_by_role>["columns"] = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "姓名"),
    },
    {
      title: "院系",
      dataIndex: "department",
      key: "department",
      filters: [
        {
          text: "电子系",
          value: "电子系",
        },
        {
          text: "微纳电子系",
          value: "微纳电子系",
        },
        {
          text: "医学院",
          value: "医学院",
        },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "申请人数",
      dataIndex: ["user", "total", "aggregate", "count"],
      key: "totalApplicants",
      sorter: (a, b) =>
        (a.user?.total.aggregate?.count ?? 0) -
        (b.user?.total.aggregate?.count ?? 0),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Row justify="space-around">
          <Col span={8}>
            <Button
              onClick={() => {
                form.setFieldsValue({ mentor: record });
                setSelectedMentor(record);
                setModalVisible(true);
              }}
              disabled={
                (applicationData &&
                  applicationData.mentor_application.length !== 0 &&
                  (applicationData.mentor_application.filter(
                    (i) => i.status === "approved"
                  ).length === 1 ||
                    applicationData.mentor_application.filter(
                      (i) => i.status === "submitted"
                    ).length === 1)) ||
                // ||
                // applicationData.mentor_application.filter(
                //   (i) => i.status === "rejected"
                // ).length > 1
                !(record.user?.mentor_available?.available ?? true)
              }
            >
              申请
            </Button>
          </Col>
          <Col span={8}>
            <Button
              onClick={() => {
                getMentorInfo({ variables: { mentor_id: record._id } });
                setShowMentorInfo(true);
              }}
            >
              查看信息
            </Button>
          </Col>
          <Col span={8}></Col>
        </Row>
      ),
    },
  ];

  const mentorListColumnsForCounselors: TableProps<GetMentorList_user_by_role>["columns"] = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "姓名"),
    },
    {
      title: "院系",
      dataIndex: "department",
      key: "department",
      filters: [
        {
          text: "电子系",
          value: "电子系",
        },
        {
          text: "微纳电子系",
          value: "微纳电子系",
        },
        {
          text: "医学院",
          value: "医学院",
        },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "申请人数",
      dataIndex: ["user", "total", "aggregate", "count"],
      key: "totalApplicants",
      sorter: (a, b) =>
        (a.user?.total.aggregate?.count ?? 0) -
        (b.user?.total.aggregate?.count ?? 0),
    },
    {
      title: "匹配人数",
      dataIndex: ["user", "matched", "aggregate", "count"],
      key: "matched",
      sorter: (a, b) =>
        (a.user?.matched.aggregate?.count ?? 0) -
        (b.user?.matched.aggregate?.count ?? 0),
    },
    {
      title: "正在接收",
      dataIndex: "available",
      key: "available",
      filters: [
        {
          text: "是",
          value: "true",
        },
        {
          text: "否",
          value: "false",
        },
      ],
      onFilter: (value, record) =>
        (record.user?.mentor_available?.available ?? true).toString() === value,
      render: (text, record) =>
        record.user?.mentor_available?.available ?? true ? "是" : "否",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              getMentorInfo({ variables: { mentor_id: record._id } });
              setShowMentorInfo(true);
            }}
          >
            查看信息
          </Button>
        </>
      ),
    },
  ];

  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    try {
      const Xlsx = await import("xlsx");

      const applications = applicationForCounselorsData!.mentor_application.map(
        (i) => [
          i.student.id,
          i.student.name,
          i.student.class,
          i.mentor.department,
          i.mentor.name,
          i.statement,
          getStatusText(i.status),
        ]
      );

      const head = [
        "学号",
        "姓名",
        "班级",
        "导师院系",
        "导师姓名",
        "申请陈述",
        "申请状态",
      ];

      applications.unshift(head);

      const worksheet = Xlsx.utils.aoa_to_sheet(applications);
      const workbook = Xlsx.utils.book_new();
      Xlsx.utils.book_append_sheet(workbook, worksheet, "新生导师");
      Xlsx.writeFile(workbook, `新生导师.xlsx`);

      message.success("申请导出成功");
    } catch {
      message.error("申请导出失败");
    } finally {
      setExporting(false);
    }
  };

  const [importing, setImporting] = useState(false);
  const [importFormVisible, setImportFormVisible] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [parseProgress, setParseProgress] = useState(0);

  const client = useApolloClient();

  const handleImport = async () => {
    if (!fileList || fileList.length !== 1) {
      message.info("请选择文件");
      return;
    }
    const file = fileList[0];
    setImporting(true);

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

      const mentorInfos = (Xlsx.utils.sheet_to_json(firstWorksheet, {
        header: 1,
      }) as (string | number)[][]).filter((i) => i.length !== 0);
      const head = mentorInfos.shift();
      if (!head || head.length < 5) {
        throw new Error("Parse error");
      }

      let count = 0;
      await Promise.all(
        mentorInfos.map(async (info) => {
          try {
            const name = info[0].toString();
            const intro = info[1].toString();
            const background = info[2].toString();
            const field = info[3].toString();
            const achievement = info[4].toString();

            console.log(`try get user`);

            const { data } = await client.query<
              GetUserByName,
              GetUserByNameVariables
            >({
              query: GET_USER_BY_NAME,
              variables: {
                name: name,
              },
            });

            console.log(`get user ${data}`);

            // _id in database
            const id = data.user[0]._id;

            const { errors } = await client.mutate<
              UpsertMentorInfo,
              UpsertMentorInfoVariables
            >({
              mutation: UPSERT_MENTOR_INFO,
              variables: {
                mentor_id: id,
                intro,
                background,
                field,
                achievement,
              },
            });

            console.log(`upsert ${errors}`);

            count++;
            setParseProgress(Math.round((count / mentorInfos.length) * 100));

            if (errors) {
              throw errors;
            }
          } catch (err) {
            throw err;
          }
        })
      );
    } catch (err) {
      message.error("文件解析失败：" + err);
    } finally {
      setImporting(false);
    }
  };

  const [
    getMentorInfo,
    { data: mentorInfoData, refetch: refetchMentorInfo },
  ] = useLazyQuery<GetMentorInfo, GetMentorInfoVariables>(GET_MENTOR_INFO);
  const [showMentorInfo, setShowMentorInfo] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [updateInfoForm] = Form.useForm();
  const [
    updateMentorInfo,
    { loading: updateMentorInfoLoading, error: updateMentorInfoError },
  ] = useMutation<UpsertMentorInfo, UpsertMentorInfoVariables>(
    UPSERT_MENTOR_INFO
  );

  return (
    <Space
      direction="vertical"
      css={`
        width: 100%;
      `}
    >
      <Typography.Title level={2}>关键时间点</Typography.Title>
      <Timeline>
        {userInfo?.role === "teacher" && (
          <Timeline.Item color="blue">
            <p>预备阶段：导师更新个人信息</p>
            <p>2021-01-10 00:00 ~ 2021-01-17 23:59</p>
          </Timeline.Item>
        )}
        <Timeline.Item color="green">
          <p>预备阶段：学生了解导师信息</p>
          <p>2021-01-18 00:00 ~ 2021-02-21 23:59</p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <p>第一阶段：自由申请与匹配</p>
          <p>2021-02-22 00:00 ~ 2021-02-28 23:59</p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <p>第二阶段：未匹配同学补选</p>
          <p>2021-03-01 00:00 ~ 2021-03-04 23:59</p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <p>第三阶段：系统随机分配</p>
          <p>2021-03-05 00:00 ~ 2021-03-11 23:59</p>
        </Timeline.Item>
      </Timeline>
      {userInfo?.role === "student" && (
        <>
          <Typography.Title level={2}>已申请</Typography.Title>
          <List
            loading={applicationLoading}
            dataSource={applicationData?.mentor_application}
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
                  <Descriptions.Item label="导师姓名" span={2}>
                    {item.mentor.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="导师院系">
                    {item.mentor.department}
                  </Descriptions.Item>
                  <Descriptions.Item label="申请时间" span={2}>
                    {dayjs(item.created_at).format("llll")}
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
                    <br />
                    <br />
                    <Row>
                      <Col span={4}>
                        <Button
                          disabled={item.status !== "submitted"}
                          onClick={() => {
                            setEditingApplication(item);
                            form.setFieldsValue(item);
                            setModalVisible(true);
                          }}
                        >
                          编辑
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          danger
                          loading={deleteMentorApplicationLoading}
                          onClick={async () => {
                            await deleteMentorApplication({
                              variables: {
                                id: item.id,
                              },
                            });
                            refetchApplications();
                            message.success("删除申请成功");
                          }}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                </Descriptions>
              );
            }}
          />
        </>
      )}
      {userInfo?.role === "teacher" && (
        <>
          <Row align="middle">
            <Col span={4}>
              <Switch
                loading={mentorAvailableLoading || changeMentorAvailableLoading}
                checkedChildren="正在接收申请"
                unCheckedChildren="停止接收申请"
                checked={
                  mentorAvailableData?.mentor_available?.[0]?.available ?? true
                }
                onChange={handleMentorAvailableChange}
              />
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={() => {
                  getMentorInfo({ variables: { mentor_id: userInfo._id } });
                  setShowMentorInfo(true);
                }}
              >
                查看我的信息
              </Button>
            </Col>
          </Row>

          <List
            loading={applicationLoading}
            dataSource={applicationData?.mentor_application}
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
                  <Descriptions.Item label="学生姓名" span={2}>
                    {item.student.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="学生院系">
                    {item.student.department}
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱" span={2}>
                    {item.student.email}
                  </Descriptions.Item>
                  {item.status === "approved" && (
                    <Descriptions.Item label="手机">
                      {item.student.phone}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item label="申请时间" span={2}>
                    {dayjs(item.created_at).format("llll")}
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
                    <Typography.Text style={{ wordWrap: "break-word" }}>
                      {item.statement}
                    </Typography.Text>
                    <br />
                    <br />
                    <Radio.Group
                      disabled={updateApplicationStatusLoading}
                      value={item.status}
                      onChange={(e) => {
                        handleApplicationStatusChange(e.target.value, item);
                      }}
                    >
                      <Radio value="approved">接收该同学</Radio>
                      <Radio value="submitted">尚未处理</Radio>
                      <Radio value="rejected">拒绝该同学</Radio>
                    </Radio.Group>
                  </Descriptions.Item>
                </Descriptions>
              );
            }}
          />
        </>
      )}
      {userInfo?.role === "student" && (
        <>
          <Typography.Title level={2}>导师列表</Typography.Title>
          <Table
            rowKey="_id"
            loading={mentorListLoading}
            dataSource={mentorList?.user_by_role.filter(
              (item) => item.user?.mentor_available?.available !== false
            )}
            columns={mentorListColumnsForStudents}
          />
          <Modal
            visible={modalVisible}
            title={editingApplication?.statement ? "编辑申请" : "新申请"}
            centered
            destroyOnClose
            okText="提交"
            onCancel={() => {
              setModalVisible(false);
              setEditingApplication(undefined);
              setSelectedMentor(undefined);
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
              <Form.Item name={["mentor", "name"]} label="导师姓名">
                <Input readOnly />
              </Form.Item>
              <Form.Item name={["mentor", "department"]} label="导师院系">
                <Input readOnly />
              </Form.Item>
              <Form.Item
                name="statement"
                label="申请陈述"
                rules={[{ required: true, message: "请输入申请陈述" }]}
              >
                <Input.TextArea
                  style={{ resize: "none" }}
                  autoSize={{ minRows: 5 }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
      {userInfo?.role === "counselor" && (
        <>
          <Typography.Title level={2}>导师列表</Typography.Title>
          <Row>
            <Col span={3}>
              <Button
                onClick={handleExport}
                loading={exporting}
                disabled={applicationForCounselorsLoading}
              >
                导出申请
              </Button>
            </Col>
            <Col span={3}>
              <Button
                onClick={() => setImportFormVisible(true)}
                loading={importing}
                disabled={applicationForCounselorsLoading}
              >
                导入信息
              </Button>
            </Col>
          </Row>

          <Table
            loading={mentorListLoading}
            dataSource={mentorList?.user_by_role.filter(
              (item) => item.user?.mentor_available?.available !== false
            )}
            columns={mentorListColumnsForCounselors}
          />
          <Modal
            visible={importFormVisible}
            title="导入导师信息"
            centered
            onOk={handleImport}
            onCancel={() => setImportFormVisible(false)}
            maskClosable={false}
            confirmLoading={importing}
            okText="导入"
          >
            <Typography.Paragraph>
              上传 Excel 文件以更新申请状态。Excel
              的格式应为：导师姓名、简要信息、教育背景、研究领域、学术成果
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
      <Modal
        visible={showMentorInfo}
        title="导师信息"
        centered
        destroyOnClose
        onCancel={() => {
          setShowMentorInfo(false);
        }}
        footer={null}
        width="70%"
      >
        <Descriptions
          title={
            mentorInfoData?.mentor_info_by_pk
              ? `${mentorInfoData?.mentor_info_by_pk?.user.name}的信息`
              : "老师信息未记录于数据库中"
          }
          column={1}
          extra={
            ["teacher", "counselor"].includes(userInfo?.role!) ? (
              <Tooltip title="更新信息">
                <Button
                  type="primary"
                  onClick={() => {
                    setShowUpdateInfo(true);
                    setShowMentorInfo(false);
                    updateInfoForm.setFields([
                      {
                        name: "intro",
                        value: mentorInfoData?.mentor_info_by_pk?.intro,
                      },
                      {
                        name: "background",
                        value: mentorInfoData?.mentor_info_by_pk?.background,
                      },
                      {
                        name: "field",
                        value: mentorInfoData?.mentor_info_by_pk?.field,
                      },
                      {
                        name: "achievement",
                        value: mentorInfoData?.mentor_info_by_pk?.achievement,
                      },
                    ]);
                  }}
                  shape="circle"
                  icon={<EditOutlined />}
                />
              </Tooltip>
            ) : (
              <></>
            )
          }
        >
          <Descriptions.Item label="基本信息">
            {mentorInfoData?.mentor_info_by_pk?.intro}
          </Descriptions.Item>
          <Descriptions.Item label="教育背景">
            {mentorInfoData?.mentor_info_by_pk?.background}
          </Descriptions.Item>
          <Descriptions.Item label="研究领域">
            {mentorInfoData?.mentor_info_by_pk?.field}
          </Descriptions.Item>
          <Descriptions.Item label="学术成果">
            {mentorInfoData?.mentor_info_by_pk?.achievement}
          </Descriptions.Item>
          <Descriptions.Item label="联系邮箱">
            {mentorInfoData?.mentor_info_by_pk?.user.email}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <Modal
        visible={showUpdateInfo}
        title={`更新${mentorInfoData?.mentor_info_by_pk?.user.name}信息`}
        centered
        destroyOnClose
        onCancel={() => {
          setShowUpdateInfo(false);
        }}
        okText="更新"
        confirmLoading={updateMentorInfoLoading}
        cancelText="取消"
        onOk={async () => {
          try {
            const values = await updateInfoForm
              .validateFields()
              .catch((info) => message.error(`表单验证失败`));
            await updateMentorInfo({
              variables: {
                ...pick(values, [
                  "intro",
                  "background",
                  "field",
                  "achievement",
                ]),
                mentor_id:
                  mentorInfoData?.mentor_info_by_pk?.mentor_id! ||
                  userInfo?._id!,
              },
            });
            message.info(`信息更新成功`);
            await refetchMentorInfo!();
          } catch (error) {
            message.error(`信息更新失败：${updateMentorInfoError}`);
          }
        }}
        width="70%"
      >
        <Form form={updateInfoForm} layout="vertical" name="updateInfoForm">
          <Form.Item
            name="intro"
            label="基本信息"
            rules={[{ required: true, message: "请输入导师的基本信息" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="background" label="教育背景">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="field" label="研究领域">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="achievement" label="学术成果">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default MentorApplicationPage;
