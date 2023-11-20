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
  Upload,
} from "antd";
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery,
} from "@apollo/client";
import axios, { AxiosError } from "axios";
import {
  AddMentorApplication as ADD_MENTOR_APPLICATION,
  ChangeMentorAvailable as CHANGE_MENTOR_AVAILABLE,
  DeleteMentorApplication as DELETE_MENTOR_APPLICATION,
  GetMentorApplications as GET_MENTOR_APPLICATIONS,
  GetMentorApplicationsForCounselors as GET_MENTOR_APPLICATIONS_FOR_COUNSELORS,
  GetMentorAvailable as GET_MENTOR_AVAILABLE,
  GetMentorInfo as GET_MENTOR_INFO,
  GetMentorList as GET_MENTOR_LIST,
  GetFreshmanList as GET_FRESHMAN_LIST,
  UpdateMentorApplication as UPDATE_MENTOR_APPLICATION,
  UpdateMentorApplicationStatus as UPDATE_MENTOR_APPLICATION_STATUS,
  UpdateMentorApplicationChatStatus as UPDATE_MENTOR_APPLICATION_CHAT_STATUS,
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
  GetFreshmanList,
  GetUserByName,
  GetUserByNameVariables,
  UpdateMentorApplication,
  UpdateMentorApplicationStatus,
  UpdateMentorApplicationStatusVariables,
  UpdateMentorApplicationVariables,
  UpsertMentorInfo,
  UpsertMentorInfoVariables,
  UpdateMentorApplicationChatStatus,
  UpdateMentorApplicationChatStatusVariables,
} from "../../api/types";
import dayjs from "dayjs";
import type { TableProps, ColumnProps } from "antd/lib/table";
import type { FilterDropdownProps } from "antd/lib/table/interface";
import {
  EditOutlined,
  SearchOutlined,
  ExclamationCircleFilled,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { getStatusText } from "../../api/helpers/application";
import { getUserInfo } from "../../api/helpers/auth";
import { pick } from "../../api/helpers/pick";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { uploadFile, downloadFile, listFile } from "../../api/helpers/cos";
import {  FilterConfirmProps } from "antd/lib/table/interface";

const param: FilterConfirmProps ={
  closeDropdown: true
}
const { Text } = Typography;

const MentorApplicationPage = () => {
  const userInfo = getUserInfo();

  const [info, setInfo] = useState({
    mentor: {
      start_A: new Date(),
      start_B: new Date(),
      start_C: new Date(),
      start_D: new Date(),
      start_E: new Date(),
      end_A: new Date(),
      end_B: new Date(),
      end_C: new Date(),
      end_D: new Date(),
      end_E: new Date(),
    },
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/application/info");
        setInfo({
          mentor: {
            start_A: new Date(response.data.mentor.start_A),
            start_B: new Date(response.data.mentor.start_B),
            start_C: new Date(response.data.mentor.start_C),
            start_D: new Date(response.data.mentor.start_D),
            start_E: new Date(response.data.mentor.start_E),
            end_A: new Date(response.data.mentor.end_A),
            end_B: new Date(response.data.mentor.end_B),
            end_C: new Date(response.data.mentor.end_C),
            end_D: new Date(response.data.mentor.end_D),
            end_E: new Date(response.data.mentor.end_E),
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
    },
  );

  const {
    loading: applicationForCounselorsLoading,
    error: applicationForCounselorsError,
    data: applicationForCounselorsData,
    // refetch: refetchApplicationsForCounselors,
  } = useQuery<GetMentorApplicationsForCounselors>(
    GET_MENTOR_APPLICATIONS_FOR_COUNSELORS,
    {
      skip: userInfo?.role !== "counselor" && userInfo?.role !== "root",
    },
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
    },
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
    CHANGE_MENTOR_AVAILABLE,
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
    item: GetMentorApplications_mentor_application,
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
  const [editingApplication, setEditingApplication] =
    useState<GetMentorApplications_mentor_application>();
  const [form] = Form.useForm();

  const [
    addApplication,
    { loading: applicationAdding, error: addApplicationError },
  ] = useMutation<AddMentorApplication, AddMentorApplicationVariables>(
    ADD_MENTOR_APPLICATION,
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
    UPDATE_MENTOR_APPLICATION,
  );

  const client = useApolloClient();

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
    DELETE_MENTOR_APPLICATION,
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
    variables: {
      grade_time: info.mentor.start_C,
    },
    skip: userInfo?.role === "teacher",
  });

  useEffect(() => {
    if (mentorListError) {
      message.error("导师列表加载失败");
      console.log(mentorListError);
    }
  }, [mentorListError]);

  const searchInput = useRef<Input>(null);
  const [, setSearchText] = useState("");

  const handleSearch = (
    selectedKeys: FilterDropdownProps["selectedKeys"],
    confirm: FilterDropdownProps["confirm"],
  ) => {
    confirm(param);
    setSearchText(selectedKeys[0].toString());
  };

  const handleReset = (clearFilters: FilterDropdownProps["clearFilters"]) => {
    clearFilters?.();
    setSearchText("");
  };

  const getColumnSearchProps: (
    dataIndex: keyof GetMentorList_user_by_role,
    name: string,
  ) => Partial<ColumnProps<GetMentorList_user_by_role>> = (
    dataIndex,
    name,
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

  const [selectedMentor, setSelectedMentor] =
    useState<GetMentorList_user_by_role>();

  const mentorListColumnsForStudents: TableProps<GetMentorList_user_by_role>["columns"] =
    [
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
        dataIndex: ["user", "total_for_grade", "aggregate", "count"],
        key: "totalApplicants",
        sorter: (a, b) =>
          (a.user?.total_for_grade.aggregate?.count ?? 0) -
          (b.user?.total_for_grade.aggregate?.count ?? 0),
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <Row justify="space-around">
            <Col span={8}>
              <Button
                onClick={() => {
                  if (new Date() < info.mentor.start_C) {
                    return message.info("未到自由申请时间！");
                  } else if (
                    new Date() > info.mentor.end_C &&
                    new Date() < info.mentor.start_D
                  ) {
                    return message.info("未到补选时间！");
                  } else if (new Date() > info.mentor.end_D) {
                    return message.warn("补选时间已过！");
                  }
                  form.setFieldsValue({ mentor: record });
                  setSelectedMentor(record);
                  setModalVisible(true);
                }}
                disabled={
                  (applicationData &&
                    applicationData.mentor_application.length !== 0 &&
                    (applicationData.mentor_application.filter(
                      (i) => i.status === "approved",
                    ).length === 1 ||
                      applicationData.mentor_application.filter(
                        (i) => i.status === "submitted",
                      ).length === 1)) ||
                  !(record.user?.mentor_available?.available ?? false)
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

  const mentorListColumnsForCounselors: TableProps<GetMentorList_user_by_role>["columns"] =
    [
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
          (record.user?.mentor_available?.available ?? false).toString() ===
          value,
        render: (text, record) =>
          record.user?.mentor_available?.available ?? false ? "是" : "否",
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
  const [attributing, setAttributing] = useState(false);

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
        ],
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

  const {
    data: freshmanList,
    error: freshmanListError,
    // refetch: refetchFreshmanList,
  } = useQuery<GetFreshmanList>(GET_FRESHMAN_LIST, {
    skip: userInfo?.role !== "counselor" && userInfo?.role !== "root",
  });

  useEffect(() => {
    if (freshmanListError) {
      message.error("新生列表加载失败");
      console.log(freshmanListError);
    }
  }, [freshmanListError]);

  const handleAttribute = async () => {
    setAttributing(true);

    try {
      const freshmanToAttribute = freshmanList!.user.filter(
        (item) => item.mentor_applications_student.length === 0,
      );
      const teachersToAttribute = mentorList!.user_by_role.filter(
        (item) =>
          item.user?.mentor_available?.available === true &&
          (item.user?.matched.aggregate?.count ?? 0) < 5,
      );

      if (teachersToAttribute.length === 0) {
        message.error("没有可用的导师");
        return;
      }

      if (freshmanToAttribute.length === 0) {
        message.success("随机分配完成");
        return;
      }

      const student =
        freshmanToAttribute[Date.now() % freshmanToAttribute.length];

      const minCount = Math.min(
        ...teachersToAttribute.map(
          (item) => item.user?.matched.aggregate?.count ?? 0,
        ),
      );
      const teachersWithMinCount = teachersToAttribute.filter(
        (item) => item.user?.matched.aggregate?.count === minCount,
      );

      const teacher =
        teachersWithMinCount[Date.now() % teachersWithMinCount.length];

      const { data } = await client.mutate<
        AddMentorApplication,
        AddMentorApplicationVariables
      >({
        mutation: ADD_MENTOR_APPLICATION,
        variables: {
          student_id: student._id,
          mentor_id: teacher._id,
          statement: "系统随机分配",
        },
      });

      await client.mutate<
        UpdateMentorApplicationStatus,
        UpdateMentorApplicationStatusVariables
      >({
        mutation: UPDATE_MENTOR_APPLICATION_STATUS,
        variables: {
          id: data?.insert_mentor_application?.returning[0].id!,
          status: "approved",
        },
      });

      message.success("分配成功");
      window.location.reload();
      return;
    } catch {
      message.error("分配失败");
    } finally {
      setAttributing(false);
    }
  };

  const [importing, setImporting] = useState(false);
  const [importFormVisible, setImportFormVisible] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [parseProgress, setParseProgress] = useState(0);

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

      const mentorInfos = (
        Xlsx.utils.sheet_to_json(firstWorksheet, {
          header: 1,
        }) as (string | number)[][]
      ).filter((i) => i.length !== 0);
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
        }),
      );
    } catch (err) {
      message.error("文件解析失败：" + err);
    } finally {
      setImporting(false);
    }
  };

  const [getMentorInfo, { data: mentorInfoData, refetch: refetchMentorInfo }] =
    useLazyQuery<GetMentorInfo, GetMentorInfoVariables>(GET_MENTOR_INFO);
  const [showMentorInfo, setShowMentorInfo] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [updateInfoForm] = Form.useForm();
  const [
    updateMentorInfo,
    { loading: updateMentorInfoLoading, error: updateMentorInfoError },
  ] = useMutation<UpsertMentorInfo, UpsertMentorInfoVariables>(
    UPSERT_MENTOR_INFO,
  );

  const handleApplicationDelete = async (application_id: any) => {
    try {
      await deleteMentorApplication({
        variables: {
          id: application_id,
        },
      });
      refetchApplications();
      message.success("删除申请成功");
    } catch (err) {
      console.log(err);
      message.error("删除申请失败");
    }
  };

  const [updateApplicationChatStatus] = useMutation<
    UpdateMentorApplicationChatStatus,
    UpdateMentorApplicationChatStatusVariables
  >(UPDATE_MENTOR_APPLICATION_CHAT_STATUS);

  //更新chat_status状态并refetch
  const handleApplicationChatStatusChange = async (
    chat_status: boolean,
    application_id: any,
  ) => {
    try {
      await updateApplicationChatStatus({
        variables: {
          id: application_id,
          chat_status: chat_status,
        },
      });
      await refetchApplications();
    } catch (err) {
      console.log(err);
      message.error("谈话记录状态更新失败");
    }
  };

  const handleUploadRecord = async (
    e: RcCustomRequestOptions,
    application_id: any,
  ) => {
    try {
      const url = `chat_record/${application_id}/${e.file.name}`;
      const result = await uploadFile(e.file, url);
      const xhr = new XMLHttpRequest();
      e.onSuccess!(result, xhr);
      handleApplicationChatStatusChange(true, application_id);
    } catch (err) {
      console.log(err);
      e.onError!(new Error("上传失败"));
    }
  };

  const handleOnchangeRecord = async (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const handleDownloadRecord = async (application_id: any) => {
    try {
      const fileList = await listFile(`chat_record/${application_id}/`);
      const url = fileList.reduce((max, item) => {
        return new Date(item.LastModified) > new Date(max.LastModified)
          ? item
          : max;
      }).Key;
      message.info("开始下载");
      downloadFile(url);
    } catch (err) {
      console.log(err);
      message.error(`下载失败`);
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
        {userInfo?.role === "teacher" && (
          <Timeline.Item
            color={
              new Date() >= info.mentor.start_A &&
              new Date() <= info.mentor.end_A
                ? "green"
                : "red"
            }
          >
            <p>预备阶段：导师更新个人信息</p>
            <p>
              {info.mentor.start_A.toLocaleString()} ~{" "}
              {info.mentor.end_A.toLocaleString()}
            </p>
          </Timeline.Item>
        )}
        <Timeline.Item
          color={
            new Date() >= info.mentor.start_B && new Date() <= info.mentor.end_B
              ? "green"
              : "red"
          }
        >
          <p>预备阶段：学生了解导师信息</p>
          <p>
            {info.mentor.start_B.toLocaleString()} ~{" "}
            {info.mentor.end_B.toLocaleString()}
          </p>
        </Timeline.Item>
        <Timeline.Item
          color={
            new Date() >= info.mentor.start_C && new Date() <= info.mentor.end_C
              ? "green"
              : "red"
          }
        >
          <p>第一阶段：自由申请与匹配</p>
          <p>
            {info.mentor.start_C.toLocaleString()} ~{" "}
            {info.mentor.end_C.toLocaleString()}
          </p>
        </Timeline.Item>
        <Timeline.Item
          color={
            new Date() >= info.mentor.start_D && new Date() <= info.mentor.end_D
              ? "green"
              : "red"
          }
        >
          <p>第二阶段：未匹配同学补选</p>
          <p>
            {info.mentor.start_D.toLocaleString()} ~{" "}
            {info.mentor.end_D.toLocaleString()}
          </p>
        </Timeline.Item>
        <Timeline.Item
          color={
            new Date() >= info.mentor.start_E && new Date() <= info.mentor.end_E
              ? "green"
              : "red"
          }
        >
          <p>第三阶段：系统随机分配</p>
          <p>
            {info.mentor.start_E.toLocaleString()} ~{" "}
            {info.mentor.end_E.toLocaleString()}
          </p>
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
                    {dayjs(item.created_at).format("YYYY-MM-DD HH:mm")}
                  </Descriptions.Item>
                  <Descriptions.Item label="申请状态">
                    {item.status === "submitted" ? (
                      <Badge status="processing" text="待处理" />
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
                          onClick={() => {
                            Modal.confirm({
                              centered: true,
                              title: "确认删除申请？",
                              icon: <ExclamationCircleFilled />,
                              content: "删除后可重新申请",
                              okText: "确认",
                              okType: "danger",
                              cancelText: "取消",
                              onOk: () => handleApplicationDelete(item.id),
                            });
                          }}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                  {item.status === "approved" && (
                    <Descriptions.Item label="谈话记录" span={2}>
                      <Row align="middle">
                        <Col span={6}>
                          {item.chat_status === false ? (
                            <Badge status="processing" text="未提交" />
                          ) : (
                            <Badge status="success" text="已提交" />
                          )}
                        </Col>
                        <Col span={5}>
                          <Upload
                            customRequest={(e) => {
                              handleUploadRecord(e, item.id);
                            }}
                            onChange={handleOnchangeRecord}
                            showUploadList={false}
                            // onRemove={handleRemoveRecord}
                            // multiple={false}
                          >
                            <Button icon={<UploadOutlined />}>提交</Button>
                          </Upload>
                        </Col>
                        {item.chat_status === true && (
                          <Col span={5}>
                            <Button
                              icon={<DownloadOutlined />}
                              onClick={() => handleDownloadRecord(item.id)}
                            >
                              下载
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </Descriptions.Item>
                  )}
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
                  mentorAvailableData?.mentor_available?.[0]?.available ?? false
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
                    {dayjs(item.created_at).format("YYYY-MM-DD HH:mm")}
                  </Descriptions.Item>
                  <Descriptions.Item label="申请状态">
                    {item.status === "submitted" ? (
                      <Badge status="processing" text="待处理" />
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
                  {item.status === "approved" && (
                    <Descriptions.Item label="谈话记录" span={2}>
                      {item.chat_status === false ? (
                        <Badge status="processing" text="未提交" />
                      ) : (
                        <Row align="middle">
                          <Col span={8}>
                            <Badge status="success" text="已提交" />
                          </Col>
                          <Col span={8}>
                            <Button
                              onClick={() => handleDownloadRecord(item.id)}
                            >
                              下载
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Descriptions.Item>
                  )}
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
              (item) => item.user?.mentor_available?.available,
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
            <Col span={3}>
              <Button
                type="primary"
                // onClick={handleAttribute}
                onClick={() => {
                  Modal.confirm({
                    title: "确认进行系统随机分配？",
                    content: "此操作不可撤销",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: handleAttribute,
                  });
                }}
                loading={attributing}
              >
                随机分配
              </Button>
            </Col>
          </Row>

          <Table
            loading={mentorListLoading}
            dataSource={mentorList?.user_by_role.filter(
              (item) => item.user?.mentor_available?.available !== false,
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
