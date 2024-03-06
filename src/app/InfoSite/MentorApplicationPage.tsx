import { useEffect, useState, useRef } from "react";
import {
  Badge,
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  InputRef,
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
import axios, { AxiosError } from "axios";
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
import { getStatusText } from "../../api/utils/application";
import { pick } from "../../api/utils/pick";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { uploadFile, downloadFile, listFile } from "../../api/cos";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { RcFile } from "rc-upload/lib/interface";
import * as graphql from "@/generated/graphql";
import { PageProps } from "..";

const param: FilterConfirmProps = {
  closeDropdown: true,
};
const { Text } = Typography;

const MentorApplicationPage: React.FC<PageProps> = ({ mode, user }) => {
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
        const response = await axios.get("/application/info/mentor");
        setInfo({
          mentor: {
            start_A: new Date(response.data.time.start_A),
            start_B: new Date(response.data.time.start_B),
            start_C: new Date(response.data.time.start_C),
            start_D: new Date(response.data.time.start_D),
            start_E: new Date(response.data.time.start_E),
            end_A: new Date(response.data.time.end_A),
            end_B: new Date(response.data.time.end_B),
            end_C: new Date(response.data.time.end_C),
            end_D: new Date(response.data.time.end_D),
            end_E: new Date(response.data.time.end_E),
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
  } = graphql.useGetMentorApplicationsQuery({
    variables: {
      uuid: user?.uuid!,
    },
    skip: user?.role === "counselor",
  });

  const {
    loading: applicationForCounselorsLoading,
    error: applicationForCounselorsError,
    data: applicationForCounselorsData,
    // refetch: refetchApplicationsForCounselors,
  } = graphql.useGetMentorApplicationsForCounselorsQuery({
    skip: user?.role !== "counselor" && user?.role !== "root",
  });

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
  } = graphql.useGetMentorAvailableQuery({
    variables: {
      uuid: user?.uuid!,
    },
    skip: user?.role !== "teacher",
  });

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
  ] = graphql.useChangeMentorAvailableMutation();

  useEffect(() => {
    if (changeMentorAvailableError) {
      message.error("导师接收状态更新失败");
    }
  }, [changeMentorAvailableError]);

  const handleMentorAvailableChange = async (checked: boolean) => {
    await changeMentorAvailable({
      variables: { uuid: user?.uuid!, available: checked },
    });
    await refetchMentorAvailable();
  };

  const [
    updateApplicationStatus,
    {
      loading: updateApplicationStatusLoading,
      error: updateApplicationStatusError,
    },
  ] = graphql.useUpdateMentorApplicationStatusMutation();

  useEffect(() => {
    if (updateApplicationStatusError) {
      message.error("申请状态更新失败");
    }
  }, [updateApplicationStatusError]);

  const handleApplicationStatusChange = async (
    status: "approved" | "submitted" | "rejected",
    item: graphql.GetMentorApplicationsQuery["mentor_application"][0],
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
    useState<graphql.GetMentorApplicationsQuery["mentor_application"][0]>();
  const [form] = Form.useForm();

  const [
    addApplication,
    { loading: applicationAdding, error: addApplicationError },
  ] = graphql.useAddMentorApplicationMutation();

  useEffect(() => {
    if (addApplicationError) {
      message.error("申请提交失败");
    }
  }, [addApplicationError]);

  const [
    updateApplication,
    { loading: applicationUpdating, error: updateApplicationError },
  ] = graphql.useUpdateMentorApplicationMutation();

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
          student_uuid: user?.uuid!,
          mentor_uuid: selectedMentor?.uuid!,
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
  ] = graphql.useDeleteMentorApplicationMutation();

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
  } = graphql.useGetMentorListQuery({
    variables: {
      grade_time: info.mentor.start_C,
    },
    skip: user?.role === "teacher",
  });

  useEffect(() => {
    if (mentorListError) {
      message.error("导师列表加载失败");
      console.log(mentorListError);
    }
  }, [mentorListError]);

  const searchInput = useRef<InputRef>(null);
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
    dataIndex: keyof graphql.GetMentorListQuery["users"][0],
    name: string,
  ) => Partial<ColumnProps<graphql.GetMentorListQuery["users"][0]>> = (
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
    useState<graphql.GetMentorListQuery["users"][0]>();

  const mentorListColumnsForStudents: TableProps<
    graphql.GetMentorListQuery["users"][0]
  >["columns"] = [
    {
      title: "姓名",
      dataIndex: "realname",
      key: "realname",
      ...getColumnSearchProps("realname", "姓名"),
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
      dataIndex: ["total_for_grade", "aggregate", "count"],
      key: "totalApplicants",
      sorter: (a, b) =>
        (a.total_for_grade.aggregate?.count ?? 0) -
        (b.total_for_grade.aggregate?.count ?? 0),
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
                  return message.warning("补选时间已过！");
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
                !(record.mentor_available?.available ?? false)
              }
            >
              申请
            </Button>
          </Col>
          <Col span={8}>
            <Button
              onClick={() => {
                getMentorInfo({ variables: { mentor_uuid: record.uuid } });
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

  const mentorListColumnsForCounselors: TableProps<
    graphql.GetMentorListQuery["users"][0]
  >["columns"] = [
    {
      title: "姓名",
      dataIndex: "realname",
      key: "realname",
      ...getColumnSearchProps("realname", "姓名"),
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
      dataIndex: ["total", "aggregate", "count"],
      key: "totalApplicants",
      sorter: (a, b) =>
        (a.total.aggregate?.count ?? 0) - (b.total.aggregate?.count ?? 0),
    },
    {
      title: "匹配人数",
      dataIndex: ["matched", "aggregate", "count"],
      key: "matched",
      sorter: (a, b) =>
        (a.matched.aggregate?.count ?? 0) - (b.matched.aggregate?.count ?? 0),
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
        (record.mentor_available?.available ?? false).toString() === value,
      render: (text, record) =>
        record.mentor_available?.available ?? false ? "是" : "否",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              getMentorInfo({ variables: { mentor_uuid: record.uuid } });
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
          i.student_byuuid?.uuid,
          i.student_byuuid?.realname,
          i.student_byuuid?.class,
          i.mentor_byuuid?.department,
          i.mentor_byuuid?.realname,
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
  } = graphql.useGetFreshmanListQuery({
    skip: user?.role !== "counselor" && user?.role !== "root",
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
      const freshmanToAttribute = freshmanList!.users.filter(
        (item) => item.mentor_application_as_student.length === 0,
      );
      const teachersToAttribute = mentorList!.users.filter(
        (item) =>
          item.mentor_available?.available === true &&
          (item.matched.aggregate?.count ?? 0) < 5,
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
          (item) => item.matched.aggregate?.count ?? 0,
        ),
      );
      const teachersWithMinCount = teachersToAttribute.filter(
        (item) => item.matched.aggregate?.count === minCount,
      );

      const teacher =
        teachersWithMinCount[Date.now() % teachersWithMinCount.length];

      const { data } = await addApplication({
        variables: {
          student_uuid: student.uuid,
          mentor_uuid: teacher.uuid,
          statement: "系统随机分配",
        },
      });

      await updateApplicationStatus({
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

  const [
    updateMentorInfo,
    { loading: updateMentorInfoLoading, error: updateMentorInfoError },
  ] = graphql.useUpsertMentorInfoMutation();

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

            const { data } = await graphql.useGetIdByNameQuery({
              variables: {
                name: name,
              },
            });

            console.log(`get user ${data}`);

            // _id in database
            const uuid = data?.users[0].uuid;

            const { errors } = await updateMentorInfo({
              variables: {
                mentor_uuid: uuid!,
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
    graphql.useGetMentorInfoLazyQuery();
  const [showMentorInfo, setShowMentorInfo] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [updateInfoForm] = Form.useForm();

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

  const [updateApplicationChatStatus] =
    graphql.useUpdateMentorApplicationChatStatusMutation();

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
      const url = `chat_record/${application_id}/${(e.file as RcFile).name}`;
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
        {user?.role === "teacher" && (
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
      {user?.role === "student" && (
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
                    {item.mentor_byuuid?.realname}
                  </Descriptions.Item>
                  <Descriptions.Item label="导师院系">
                    {item.mentor_byuuid?.department}
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
      {user?.role === "teacher" && (
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
                  getMentorInfo({ variables: { mentor_uuid: user.uuid! } });
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
                    {item.student_byuuid?.realname}
                  </Descriptions.Item>
                  <Descriptions.Item label="学生院系">
                    {item.student_byuuid?.department}
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱" span={2}>
                    {item.student_byuuid?.email}
                  </Descriptions.Item>
                  {item.status === "approved" && (
                    <Descriptions.Item label="手机">
                      {item.student_byuuid?.phone}
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
      {user?.role === "student" && (
        <>
          <Typography.Title level={2}>导师列表</Typography.Title>
          <Table
            rowKey="_id"
            loading={mentorListLoading}
            dataSource={mentorList?.users.filter(
              (item) => item.mentor_available?.available,
            )}
            columns={mentorListColumnsForStudents}
          />
          <Modal
            open={modalVisible}
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
              <Form.Item name={["mentor_byuuid", "realname"]} label="导师姓名">
                <Input readOnly />
              </Form.Item>
              <Form.Item
                name={["mentor_byuuid", "department"]}
                label="导师院系"
              >
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
      {user?.role === "counselor" && (
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
            dataSource={mentorList?.users.filter(
              (item) => item.mentor_available?.available !== false,
            )}
            columns={mentorListColumnsForCounselors}
          />
          <Modal
            open={importFormVisible}
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
        open={showMentorInfo}
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
              ? `${mentorInfoData?.mentor_info_by_pk?.userByMentorUuid.realname}的信息`
              : "老师信息未记录于数据库中"
          }
          column={1}
          extra={
            ["teacher", "counselor"].includes(user?.role!) ? (
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
            {mentorInfoData?.mentor_info_by_pk?.userByMentorUuid.email}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <Modal
        open={showUpdateInfo}
        title={`更新${mentorInfoData?.mentor_info_by_pk?.userByMentorUuid.realname}信息`}
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
                mentor_uuid:
                  mentorInfoData?.mentor_info_by_pk?.mentor_uuid! ||
                  user?.uuid!,
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
