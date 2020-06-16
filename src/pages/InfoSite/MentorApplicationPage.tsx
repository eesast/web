import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Timeline,
  Space,
  List,
  Descriptions,
  Badge,
  message,
  Button,
  Switch,
  Modal,
  Form,
  Table,
  Input,
} from "antd";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  GetMentorApplications as GET_MENTOR_APPLICATIONS,
  GetMentorAvailable as GET_MENTOR_AVAILABLE,
  ChangeMentorAvailable as CHANGE_MENTOR_AVAILABLE,
  UpdateMentorApplicationStatus as UPDATE_MENTOR_APPLICATION_STATUS,
  AddMentorApplication as ADD_MENTOR_APPLICATION,
  UpdateMentorApplication as UPDATE_MENTOR_APPLICATION,
  GetMentorList as GET_MENTOR_LIST,
  GetMentorApplicationsForCounselors as GET_MENTOR_APPLICATIONS_FOR_COUNSELORS,
} from "../../api/info_mentor.graphql";
import {
  GetMentorApplications,
  GetMentorAvailable,
  ChangeMentorAvailable,
  UpdateMentorApplicationStatus,
  GetRole,
  GetId,
  GetMentorApplicationsVariables,
  ChangeMentorAvailableVariables,
  GetMentorAvailableVariables,
  UpdateMentorApplicationStatusVariables,
  GetMentorApplications_mentor_application,
  AddMentorApplication,
  UpdateMentorApplication,
  AddMentorApplicationVariables,
  UpdateMentorApplicationVariables,
  GetMentorList,
  GetMentorList_user_by_role,
  GetMentorApplicationsForCounselors,
} from "../../api/types";
import dayjs from "dayjs";
import { TableProps, ColumnProps } from "antd/lib/table";
import { FilterDropdownProps } from "antd/lib/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import { getStatusText } from "../../helpers/application";

const { Text } = Typography;

const MentorApplicationPage = () => {
  const { data: userData } = useQuery<GetRole & GetId>(gql`
    {
      role @client
      _id @client
    }
  `);

  const {
    loading: applicationLoading,
    error: applicationError,
    data: applicationData,
    refetch: refetchApplications,
  } = useQuery<GetMentorApplications, GetMentorApplicationsVariables>(
    GET_MENTOR_APPLICATIONS,
    {
      variables: {
        _id: userData?._id!,
      },
      skip: userData?.role === "counselor",
    }
  );

  const {
    loading: applicationForCounselorsLoading,
    error: applicationForCounselorsError,
    data: applicationForCounselorsData,
  } = useQuery<GetMentorApplicationsForCounselors>(
    GET_MENTOR_APPLICATIONS_FOR_COUNSELORS,
    {
      skip: userData?.role !== "counselor",
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
        _id: userData?._id!,
      },
      skip: userData?.role !== "teacher",
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
      variables: { _id: userData?._id!, available: checked },
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
    checked: boolean,
    item: GetMentorApplications_mentor_application
  ) => {
    await updateApplicationStatus({
      variables: {
        id: item.id,
        status: checked ? "approved" : "submitted",
      },
    });
    await refetchApplications();
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [editingApplication, setEditingApplication] = useState<
    GetMentorApplications_mentor_application
  >();
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
          student_id: userData?._id!,
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

  const {
    data: mentorList,
    loading: mentorListLoading,
    error: mentorListError,
    refetch: refetchMentorList,
  } = useQuery<GetMentorList>(GET_MENTOR_LIST, {
    skip: userData?.role === "teacher",
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

  const [selectedMentor, setSelectedMentor] = useState<
    GetMentorList_user_by_role
  >();

  const mentorListColumnsForStudents: TableProps<
    GetMentorList_user_by_role
  >["columns"] = [
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
                ).length === 1 ||
                applicationData.mentor_application.filter(
                  (i) => i.status === "rejected"
                ).length > 1)) ||
            !(record.user?.mentor_available?.available ?? true)
          }
        >
          申请
        </Button>
      ),
    },
  ];

  const mentorListColumnsForCounselors: TableProps<
    GetMentorList_user_by_role
  >["columns"] = [
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
          <p>第一阶段：自由申请与匹配</p>
          <p>2019-09-04 00:00 ~ 2019-09-11 23:59</p>
        </Timeline.Item>
        <Timeline.Item color="green">
          <p>第二阶段：未匹配同学补选</p>
          <p>2019-09-12 00:00 ~ 2019-09-16 23:59</p>
        </Timeline.Item>
        <Timeline.Item color="green">
          <p>第三阶段：系统随机分配</p>
          <p>2019-09-17 00:00 ~ 2019-09-22 23:59</p>
        </Timeline.Item>
      </Timeline>
      {userData?.role === "student" && (
        <>
          <Typography.Title level={2}>已申请</Typography.Title>
          <List
            loading={applicationLoading}
            dataSource={applicationData?.mentor_application}
            renderItem={(item) => {
              return (
                <Descriptions key={item.id} bordered size="small"   css={`
                margin: 24px auto;
              `}>
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
                  </Descriptions.Item>
                </Descriptions>
              );
            }}
          />
        </>
      )}
      {userData?.role === "teacher" && (
        <>
          <Switch
            loading={mentorAvailableLoading || changeMentorAvailableLoading}
            checkedChildren="正在接收申请"
            unCheckedChildren="停止接收申请"
            checked={
              mentorAvailableData?.mentor_available?.[0]?.available ?? true
            }
            onChange={handleMentorAvailableChange}
          />
          <List
            loading={applicationLoading}
            dataSource={applicationData?.mentor_application}
            renderItem={(item) => {
              return (
                <Descriptions key={item.id} bordered size="small"   css={`
                margin: 24px auto;
              `}>
                  <Descriptions.Item label="学生姓名" span={2}>
                    {item.student.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="学生院系">
                    {item.student.department}
                  </Descriptions.Item>
                  {item.status === "approved" && (
                    <Descriptions.Item label="邮箱" span={2}>
                      {item.student.email}
                    </Descriptions.Item>
                  )}
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
                    <Switch
                      loading={updateApplicationStatusLoading}
                      checkedChildren="已接收该同学"
                      unCheckedChildren="未接收该同学"
                      defaultChecked={item.status === "approved"}
                      onChange={(checked) =>
                        handleApplicationStatusChange(checked, item)
                      }
                    />
                  </Descriptions.Item>
                </Descriptions>
              );
            }}
          />
        </>
      )}
      {userData?.role === "student" && (
        <>
          <Typography.Title level={2}>导师列表</Typography.Title>
          <Table
            rowKey="_id"
            loading={mentorListLoading}
            dataSource={mentorList?.user_by_role}
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
      {userData?.role === "counselor" && (
        <>
          <Typography.Title level={2}>导师列表</Typography.Title>
          <Button
            onClick={handleExport}
            loading={exporting}
            disabled={applicationForCounselorsLoading}
          >
            导出申请
          </Button>
          <Table
            loading={mentorListLoading}
            dataSource={mentorList?.user_by_role}
            columns={mentorListColumnsForCounselors}
          />
        </>
      )}
    </Space>
  );
};

export default MentorApplicationPage;
