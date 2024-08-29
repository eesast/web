import { useEffect, useState, useRef } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
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
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import type { TableProps, ColumnProps } from "antd/lib/table";
import type { FilterDropdownProps } from "antd/lib/table/interface";
import {
  SearchOutlined,
  ExclamationCircleFilled,
  UploadOutlined,
  DownloadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { getStatusText } from "../../api/utils/application";
import { pick } from "../../api/utils/pick";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { uploadFile, downloadFile, listFile } from "../../api/cos";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { RcFile } from "rc-upload/lib/interface";
import * as graphql from "@/generated/graphql";
import { PageProps } from "..";
// import Center from "../Components/Center";

const param: FilterConfirmProps = {
  closeDropdown: true,
};
const { Text } = Typography;

const getNestedValue: any = (record: any, path: (string | number)[]) => {
  return path.reduce((acc, key) => acc && acc[key], record);
};

const departmentFilter = [
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
];

interface IAppliedMentorDetail {
  mentor_uuid: string;
  real_name: string;
  email: string;
  intro: string;
  background: string;
  field: string;
  achievement: string;
}

interface IMentorDetail {
  mentor_uuid: any;
  real_name: string;
  available: boolean;
  max_applicants: number;
  intro: string;
  background: string;
  field: string;
  achievement: string;
}

interface IMentorFull {
  total_applicants: number;
  matched_applicants: number;
  achievement?: string | null;
  available: boolean;
  background?: string | null;
  field?: string | null;
  intro?: string | null;
  max_applicants: number;
  mentor_uuid: string;
  user: {
    department?: string | null;
    email?: string | null;
    realname?: string | null;
  };
}

interface IAppliedStudentDetail {
  application_id: string;
  student_uuid: string;
  real_name: string;
  department: string;
  email: string;
  phone: string;
  created_at: string;
  statement: string;
  status: string;
}

interface IFreshman {
  realname: string;
  student_no: string;
}

interface IRegisteredFreshman {
  realname: string;
  student_no: string;
  uuid: string;
}

interface IApplicationSchedule {
  activateIn: number;
  start_A: Date;
  start_B: Date;
  start_C: Date;
  start_D: Date;
  start_E: Date;
  end_A: Date;
  end_B: Date;
  end_C: Date;
  end_D: Date;
  end_E: Date;
}

const MentorApplicationPage: React.FC<PageProps> = ({ mode, user }) => {
  // schedule
  const [selectedYear] = useState<number>(new Date().getFullYear());
  const [mentorApplicationSchedule, setMentorApplicationSchedule] =
    useState<IApplicationSchedule>();
  const [mentorListFull, setMentorListFull] = useState<IMentorFull[]>();
  // mentor see mentor detail
  const [mentorDetail, setMentorDetail] = useState<IMentorDetail>();
  const [mentorDetailVisible, setMentorDetailVisible] = useState(false);
  const [mentorInfoForm] = Form.useForm();
  // student see mentor detail
  const [selectMentorDetail, setSelectMentorDetail] =
    useState<IAppliedMentorDetail>();
  const [selectMentorDetailVisiable, setSelectMentorDetailVisiable] =
    useState(false);
  // mentor see student detail
  const [selectAppliedStudentDetail, setSelectAppliedStudentDetail] =
    useState<IAppliedStudentDetail>();
  const [
    selectAppliedStudentDetailVisiable,
    setSelectAppliedStudentDetailVisiable,
  ] = useState(false);
  // mentor hide reject application
  const [hideReject, setHideReject] = useState(false);
  // student apply mentor
  const [selectMentor, setSelectMentor] = useState<String>();
  const [applicationModalVisible, setApplicationModalVisible] = useState(false);
  const [applicationForm] = Form.useForm();
  // search
  const searchInput = useRef<InputRef>(null);
  // export
  const [exporting, setExporting] = useState(false);
  // import mentor info
  const [importingMentorInfo, setImportingMentorInfo] = useState(false);
  const [importMentorInfoFileList, setImportMentorInfoFileList] =
    useState<FileList | null>(null);
  const [importMentorInfoFormVisible, setImportMentorInfoFormVisible] =
    useState(false);
  const [importMentorInfoProgress, setImportMentorInfoProgress] = useState(0);
  // import freshman info
  const [importingFreshmanInfo, setImportingFreshmanInfo] = useState(false);
  const [importFreshmanInfoFileList, setImportFreshmanInfoFileList] =
    useState<FileList | null>(null);
  const [importFreshmanInfoFormVisible, setImportFreshmanInfoFormVisible] =
    useState(false);
  const [importFreshmanInfoProgress, setImportFreshmanInfoProgress] =
    useState(0);
  // unmatched freshman list
  const [unmatchedFreshmanList, setUnmatchedFreshmanList] = useState<
    IFreshman[]
  >([]);
  // registered student list
  const [registeredFreshmanList, setRegisteredFreshmanList] = useState<
    IRegisteredFreshman[]
  >([]);
  // random attribute
  const [attributing, setAttributing] = useState(false);

  /**
   * Universal
   */
  // GetMentorApplicationSchedule
  const { data: mentorApplicationScheduleData } =
    graphql.useGetMentorApplicationScheduleQuery({
      variables: {
        year: selectedYear,
      },
      skip: !selectedYear,
    });

  // useEffect(() => {
  //   if (selectedYear) {
  //     refetchMentorApplicationSchedule();
  //     mentorListWithApplicationsCount(mentorInfoListData, selectedYear);
  //   }
  // }, [selectedYear]);

  useEffect(() => {
    if (mentorApplicationScheduleData?.mentor_time_by_pk) {
      setMentorApplicationSchedule(
        mentorApplicationScheduleData.mentor_time_by_pk,
      );
    }
  }, [mentorApplicationScheduleData]);

  // Get mentor info list
  const {
    loading: mentorInfoListLoading,
    error: mentorInfoListError,
    data: mentorInfoListData,
    refetch: refetchMentorInfoList,
  } = graphql.useGetMentorInfoListQuery();

  useEffect(() => {
    if (mentorInfoListError) {
      message.error("导师信息列表加载失败");
      message.error(mentorInfoListError.message);
    }
  }, [mentorInfoListError]);

  useEffect(() => {
    const processMentorData = async () => {
      await mentorListWithApplicationsCount(mentorInfoListData, selectedYear);
    };
    processMentorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorInfoListData, selectedYear]);

  const { refetch: getMentorApplicationsCount } =
    graphql.useGetMentorApplicationsCountQuery({
      variables: {
        uuid: null,
        year: selectedYear,
      },
      skip: !selectedYear || !mentorInfoListData,
    });

  const { refetch: getMentorApplicationsApprovedCount } =
    graphql.useGetMentorApplicationsApprovedCountQuery({
      variables: {
        uuid: null,
        year: selectedYear,
      },
      skip: !selectedYear || !mentorInfoListData,
    });

  // Get mentor list detail
  const mentorListWithApplicationsCount = async (
    mentorInfoListData: graphql.GetMentorInfoListQuery | undefined,
    selectedYear: number | undefined,
  ) => {
    if (!mentorInfoListData?.mentor_info || !selectedYear) {
      return;
    }
    const info = await Promise.all(
      mentorInfoListData.mentor_info.map(async (mentor) => {
        const { data: applicationsCountResult } =
          await getMentorApplicationsCount({
            uuid: mentor.mentor_uuid,
            year: selectedYear,
          });

        const { data: applicationsApprovedCountResult } =
          await getMentorApplicationsApprovedCount({
            uuid: mentor.mentor_uuid,
            year: selectedYear,
          });

        return {
          ...mentor,
          total_applicants:
            applicationsCountResult?.mentor_application_aggregate?.aggregate
              ?.count ?? NaN,
          matched_applicants:
            applicationsApprovedCountResult?.mentor_application_aggregate
              ?.aggregate?.count ?? NaN,
        };
      }),
    );
    setMentorListFull(info);
  };

  /**
   * Mentor Only
   */
  // Get mentor info
  useEffect(() => {
    if (user.role !== "teacher" || !mentorInfoListData?.mentor_info) {
      return;
    }
    const mentor = mentorInfoListData.mentor_info.find(
      (mentor) => mentor.mentor_uuid === user.uuid,
    );
    if (mentor) {
      setMentorDetail({
        mentor_uuid: mentor.mentor_uuid,
        real_name: mentor.user.realname ?? "",
        available: mentor.available,
        max_applicants: mentor.max_applicants,
        intro: mentor.intro ?? "",
        background: mentor.background ?? "",
        field: mentor.field ?? "",
        achievement: mentor.achievement ?? "",
      });
    } else {
      const insertMentorInfoAsync = async () => {
        await insertMentorInfo({
          variables: {
            mentor_uuid: user.uuid,
          },
        });
      };
      insertMentorInfoAsync();
    }
  }, [mentorInfoListData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Insert mentor info
  const [insertMentorInfo] = graphql.useInsertMentorInfoMutation({
    onCompleted: () => {
      refetchMentorInfoList();
    },
  });

  // Update mentor available status
  const [
    updateMentorInfoAvailable,
    { loading: updateMentorInfoAvailableLoading },
  ] = graphql.useUpdateMentorInfoAvailableMutation({
    onCompleted: () => {
      refetchMentorInfoList();
    },
  });

  // Update mentor max applicants
  const [updateMentorInfoMaxApplicants] =
    graphql.useUpdateMentorInfoMaxApplicantsMutation({
      onCompleted: () => {
        refetchMentorInfoList();
      },
    });

  // Update mentor info description
  const [
    updateMentorInfoDescription,
    {
      loading: updateMentorInfoDescriptionLoading,
      error: updateMentorInfoDescriptionError,
    },
  ] = graphql.useUpdateMentorInfoDescriptionMutation({
    onCompleted: () => {
      refetchMentorInfoList();
    },
  });

  // Get mentor application list
  const {
    loading: mentorApplicationsListForMentorLoading,
    data: mentorApplicationsListForMentorData,
    refetch: refetchMentorApplicationsListForMentor,
  } = graphql.useGetMentorApplicationsListForMentorQuery({
    variables: {
      uuid: user.uuid!,
      year: selectedYear,
    },
    skip: user.role !== "teacher",
  });

  // useEffect(() => {
  //   refetchMentorApplicationSchedule({
  //     year: selectedYear,
  //   });
  // }, [selectedYear]);

  // Update mentor application status
  const [
    updateMentorApplicationStatus,
    { loading: updateMentorApplicationStatusLoading },
  ] = graphql.useUpdateMentorApplicationStatusMutation();
  /**
   * Student Only
   */
  // Insert mentor application
  const [insertMentorApplication, { loading: insertMentorApplicationLoading }] =
    graphql.useInsertMentorApplicationMutation({
      onCompleted: async () => {
        await refetchMentorApplicationsListForStudent();
        await mentorListWithApplicationsCount(mentorInfoListData, selectedYear);
      },
    });

  // Update mentor application statement
  const [
    updateMentorApplicationStatement,
    { loading: updateMentorApplicationStatementLoading },
  ] = graphql.useUpdateMentorApplicationStatementMutation({
    onCompleted: async () => {
      await refetchMentorApplicationsListForStudent();
    },
  });

  // Get student mentor application list
  const {
    loading: mentorApplicationsListForStudentLoading,
    data: mentorApplicationsListForStudentData,
    refetch: refetchMentorApplicationsListForStudent,
  } = graphql.useGetMentorApplicationsListForStudentQuery({
    variables: {
      uuid: user.uuid!,
      year: selectedYear,
    },
    skip: user.role !== "student",
  });
  // Delete mentor application
  const [
    deleteMentorApplication,
    {
      loading: deleteMentorApplicationLoading,
      error: deleteMentorApplicationError,
    },
  ] = graphql.useDeleteMentorApplicationMutation({
    onCompleted: async () => {
      await refetchMentorApplicationsListForStudent();
      await mentorListWithApplicationsCount(mentorInfoListData, selectedYear);
    },
  });

  // Handle application edit
  const handleApplicationEdit = async () => {
    try {
      applicationForm.validateFields();
    } catch {
      message.error("无信息或信息不完整");
      return;
    }
    const values = applicationForm.getFieldsValue();
    if (values.statement.length === 0) {
      message.error("陈述不能为空");
      return;
    }
    const submittedApplication =
      mentorApplicationsListForStudentData?.mentor_application.find(
        (i) => i.mentor_uuid === selectMentor,
      );
    if (submittedApplication) {
      if (submittedApplication.status === "approved") {
        message.error("已通过或已拒绝的申请无法修改");
        return;
      }
      await updateMentorApplicationStatement({
        variables: {
          id: submittedApplication.id,
          statement: values.statement,
        },
      });
    } else {
      await insertMentorApplication({
        variables: {
          mentor_uuid: selectMentor,
          student_uuid: user.uuid,
          year: selectedYear,
          statement: values.statement,
        },
      });
    }

    setApplicationModalVisible(false);
    setSelectMentor(undefined);
    applicationForm.resetFields();
  };

  const [updateApplicationChatStatus] =
    graphql.useUpdateMentorApplicationChatStatusMutation();

  /**
   * Counselor Only
   */
  // Update mentor application schedule
  const [insertMentorApplicationSchedule] =
    graphql.useInsertMentorApplicationScheduleMutation();

  useEffect(() => {
    if (
      mentorApplicationSchedule &&
      (user.role === "counselor" || user.role === "root")
    ) {
      insertMentorApplicationSchedule({
        variables: {
          year: selectedYear,
          start_A: mentorApplicationSchedule.start_A,
          start_B: mentorApplicationSchedule.start_B,
          start_C: mentorApplicationSchedule.start_C,
          start_D: mentorApplicationSchedule.start_D,
          start_E: mentorApplicationSchedule.start_E,
          end_A: mentorApplicationSchedule.end_A,
          end_B: mentorApplicationSchedule.end_B,
          end_C: mentorApplicationSchedule.end_C,
          end_D: mentorApplicationSchedule.end_D,
          end_E: mentorApplicationSchedule.end_E,
        },
      });
    }
  }, [mentorApplicationSchedule]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get mentor application list for counselor
  const {
    loading: mentorApplicationsListForCounselorsLoading,
    data: mentorApplicationsListForCounselorsData,
  } = graphql.useGetMentorApplicationsListForCounselorQuery({
    skip: user.role !== "counselor",
    variables: {
      year: selectedYear,
    },
  });

  // Insert freshman info list
  const [insertFreshmanInfoList] = graphql.useInsertFreshmanInfoListMutation();

  // Get freshman info list
  const {
    data: freshmanInfoListData,
    loading: freshmanInfoListLoading,
    refetch: refetchFreshmanInfoList,
  } = graphql.useGetFreshmanInfoListQuery({
    variables: {
      year: selectedYear,
    },
    skip: user.role !== "counselor",
  });

  useEffect(() => {
    if (freshmanInfoListData && mentorApplicationsListForCounselorsData) {
      const mentorApplicationsListForCounselorsApproved =
        mentorApplicationsListForCounselorsData.mentor_application.filter(
          (i) => i.status === "approved",
        );
      setUnmatchedFreshmanList(
        freshmanInfoListData.freshman.filter(
          (i) =>
            !mentorApplicationsListForCounselorsApproved.find(
              (j) => j.student.student_no === i.student_no,
            ),
        ),
      );
      const updateRegisteredFreshmanList = async () => {
        const promises = freshmanInfoListData.freshman.map(async (i) => {
          const { data: stu } = await queryStudentByStudentNo({
            variables: {
              student_no: i.student_no,
            },
          });
          if (stu?.users && stu.users.length > 0) {
            return {
              realname: i.realname,
              student_no: i.student_no,
              uuid: stu.users[0].uuid,
            };
          }
        });
        const results = await Promise.all(promises);
        const validResults = results.filter((res) => res !== undefined);
        setRegisteredFreshmanList(validResults as IRegisteredFreshman[]);
      };
      updateRegisteredFreshmanList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freshmanInfoListData, mentorApplicationsListForCounselorsData]);

  const [queryStudentByStudentNo] =
    graphql.useQueryStudentByStudentNoLazyQuery();

  const [queryTeacherByRealname] = graphql.useQueryTeacherByRealnameLazyQuery();

  /**
   * Props
   */
  // Search props
  const handleSearch = (
    selectedKeys: FilterDropdownProps["selectedKeys"],
    confirm: FilterDropdownProps["confirm"],
  ) => {
    confirm(param);
  };
  const handleReset = (clearFilters: FilterDropdownProps["clearFilters"]) => {
    clearFilters?.();
  };

  // Search mentor info list
  const getColumnSearchProps: (
    dataIndex: (string | number)[],
    name: string,
  ) => Partial<ColumnProps<IMentorFull>> = (dataIndex, name) => ({
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
      getNestedValue(record, dataIndex)!
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current && searchInput.current.select());
      }
    },
  });

  // Export mentor application list
  const handleExport = async () => {
    setExporting(true);
    try {
      const Xlsx = await import("xlsx");
      const applications =
        mentorApplicationsListForCounselorsData!.mentor_application.map((i) => [
          i.student.student_no,
          i.student.realname,
          i.student.department,
          i.student.class,
          i.mentor.realname,
          i.mentor.department,
          getStatusText(i.status),
          i.statement,
        ]);
      const head = [
        "学生学号",
        "学生姓名",
        "学生院系",
        "学生班级",
        "导师姓名",
        "导师院系",
        "申请状态",
        "申请陈述",
      ];
      applications.unshift(head);
      const worksheet = Xlsx.utils.aoa_to_sheet(applications);
      const workbook = Xlsx.utils.book_new();
      Xlsx.utils.book_append_sheet(workbook, worksheet, "新生导师");
      const current_time = dayjs().format("YYYY:MM:DD-HH:mm:ss");
      Xlsx.writeFile(workbook, `新生导师申请记录-${current_time}.xlsx`);
      message.success("申请导出成功");
    } catch {
      message.error("申请导出失败");
    } finally {
      setExporting(false);
    }
  };

  // mentor info list columns
  const mentorInfoListColumns: TableProps<IMentorFull>["columns"] = [
    {
      title: "姓名",
      dataIndex: ["user", "realname"],
      key: "realname",
      ...getColumnSearchProps(["user", "realname"], "姓名"),
    },
    {
      title: "院系",
      dataIndex: ["user", "department"],
      key: "department",
      filters: departmentFilter,
      onFilter: (value, record) => record.user.department === value,
    },
    {
      title: "申请限额",
      dataIndex: "max_applicants",
      key: "max_applicants",
      render: (value, record) => (record.available ? value : "Unavailable"),
    },
    {
      title: "已申请人数",
      dataIndex: "total_applicants",
      key: "total_applicants",
      sorter: (a, b) =>
        isNaN(a.total_applicants)
          ? 1
          : isNaN(b.total_applicants)
            ? -1
            : a.total_applicants - b.total_applicants,
    },
    {
      title: "已接收人数",
      dataIndex: "matched_applicants",
      key: "matched_applicants",
      sorter: (a, b) =>
        isNaN(a.matched_applicants)
          ? 1
          : isNaN(b.matched_applicants)
            ? -1
            : a.matched_applicants - b.matched_applicants,
    },
    {
      title: "操作",
      key: "action",
      render: (value, record) => (
        <Row justify="space-around">
          {user.role === "student" && (
            <Col span={8}>
              <Button
                onClick={() => {
                  setSelectMentor(record.mentor_uuid);
                  applicationForm.setFieldsValue(
                    mentorApplicationsListForStudentData?.mentor_application.find(
                      (i) => i.mentor_uuid === record.mentor_uuid,
                    ) ?? {
                      mentor: {
                        realname: record.user.realname,
                        department: record.user.department,
                      },
                      statement: "",
                    },
                  );
                  setApplicationModalVisible(true);
                }}
                disabled={
                  user.role !== "student" ||
                  !mentorApplicationSchedule ||
                  dayjs(new Date()) <
                    dayjs(mentorApplicationSchedule.start_C) ||
                  dayjs(new Date()) > dayjs(mentorApplicationSchedule.end_D) ||
                  (dayjs(new Date()) > dayjs(mentorApplicationSchedule.end_C) &&
                    dayjs(new Date()) <
                      dayjs(mentorApplicationSchedule.start_D)) ||
                  (((mentorApplicationsListForStudentData?.mentor_application &&
                    mentorApplicationsListForStudentData.mentor_application
                      .length > 0) ||
                    !record.available ||
                    record.total_applicants === undefined ||
                    record.max_applicants === undefined ||
                    record.total_applicants >= record.max_applicants) &&
                    !(
                      (mentorApplicationsListForStudentData?.mentor_application?.find(
                        (i) => i.mentor_uuid === record.mentor_uuid,
                      )?.status ?? "approved") !== "approved"
                    ))
                }
              >
                {mentorApplicationsListForStudentData?.mentor_application.find(
                  (i) => i.mentor_uuid === record.mentor_uuid,
                )
                  ? "编辑申请"
                  : "申请"}
              </Button>
            </Col>
          )}
          <Col span={8}>
            <Button
              onClick={() => {
                setSelectMentorDetail({
                  mentor_uuid: record.mentor_uuid,
                  real_name: record.user.realname ?? "",
                  intro: record.intro ?? "",
                  background: record.background ?? "",
                  field: record.field ?? "",
                  achievement: record.achievement ?? "",
                  email: record.user.email ?? "",
                });
                setSelectMentorDetailVisiable(true);
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

  // 随机分配
  const handleAttribute = async () => {
    if (
      !mentorListFull ||
      !unmatchedFreshmanList ||
      !registeredFreshmanList ||
      !freshmanInfoListData ||
      !selectedYear ||
      attributing
    ) {
      message.error("数据加载失败，请刷新重试");
      return;
    }
    let teachersToAttribute = new Map<IMentorFull, number>();
    let teachersHash = new Array<IMentorFull>();
    const unmatchedRegisteredFreshmanList = registeredFreshmanList.filter((i) =>
      unmatchedFreshmanList.find((j) => j.student_no === i.student_no),
    );

    // 建立哈希映射，key 为老师，value 为匹配数，记录匹配数不超过 5 的老师
    let mentorNum = 0;
    mentorListFull.forEach((item: IMentorFull) => {
      if (item.available && (item.matched_applicants ?? 0) < 5) {
        teachersToAttribute.set(item, item.matched_applicants ?? 0);
        teachersHash.push(item);
        mentorNum++;
      }
    });
    let matched = new Map<IRegisteredFreshman, IMentorFull>();
    let numOfStudents = unmatchedRegisteredFreshmanList.length;

    let isMentorEnough = true;
    for (let i = 0; i < numOfStudents; i++) {
      if (mentorNum === 0) {
        isMentorEnough = false;
        break;
      }
      let randomIndex = Math.floor(Math.random() * mentorNum);
      let tmpTeacher = teachersHash[randomIndex];
      matched.set(unmatchedRegisteredFreshmanList[i], tmpTeacher);

      //更新老师的匹配数
      if ((teachersToAttribute.get(tmpTeacher) ?? 0) < 4) {
        teachersToAttribute.set(
          tmpTeacher,
          (teachersToAttribute.get(tmpTeacher) ?? 0) + 1,
        );
      } else {
        teachersToAttribute.delete(tmpTeacher);
        teachersHash.splice(randomIndex, 1);
        mentorNum--;
      }
    }

    if (matched.size === 0) {
      message.info("无可分配对象");
      setAttributing(false);
      return;
    }

    // 弹窗确认
    const confirm = window.confirm(
      `未匹配学生共${unmatchedFreshmanList.length}人，其中${freshmanInfoListData.freshman.length - registeredFreshmanList.length}人未注册，待随机分配${numOfStudents}人，可分配导师${isMentorEnough ? "充足" : "不足"}，实际分配${matched.size}人，确认继续？`,
    );
    if (!confirm) {
      setAttributing(false);
      return;
    }

    //更新数据库
    for (const [student, teacher] of matched) {
      try {
        const { data } = await insertMentorApplication({
          variables: {
            mentor_uuid: teacher.mentor_uuid,
            student_uuid: student.uuid,
            year: selectedYear,
            statement: "系统随机分配",
          },
        });
        await updateMentorApplicationStatus({
          variables: {
            id: data?.insert_mentor_application_one?.id!,
            status: "approved",
          },
        });
      } catch (err: any) {
        message.info("分配失败");
        message.info(err.message);
      }
    }
    message.success("随机分配已完成");
    setAttributing(false);
    window.location.reload();
    return;
  };

  // Import mentor description
  const handleImportMentorInfo = async () => {
    if (!importMentorInfoFileList || importMentorInfoFileList.length !== 1) {
      message.info("请选择文件");
      return;
    }
    const file = importMentorInfoFileList[0];
    setImportingMentorInfo(true);
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
            const { data } = await queryTeacherByRealname({
              variables: {
                realname: name,
              },
            });
            const uuid = data?.users[0].uuid;
            if (
              !mentorInfoListData!.mentor_info.find(
                (i) => i.mentor_uuid === uuid,
              )
            ) {
              await insertMentorInfo({
                variables: {
                  mentor_uuid: uuid!,
                },
              });
            }
            const { errors } = await updateMentorInfoDescription({
              variables: {
                mentor_uuid: uuid!,
                intro: intro,
                background: background,
                field: field,
                achievement: achievement,
              },
            });
            count++;
            setImportMentorInfoProgress(
              Math.round((count / mentorInfos.length) * 100),
            );
            if (errors) {
              throw errors;
            }
          } catch (err) {
            throw err;
          }
        }),
      );
    } catch (err) {
      message.error("Error loading file.\n" + err);
    } finally {
      setImportingMentorInfo(false);
      setImportFreshmanInfoFormVisible(false);
    }
  };

  // Import freshman info
  const handleImportFreshmanInfo = async (year: number) => {
    if (
      !importFreshmanInfoFileList ||
      importFreshmanInfoFileList.length !== 1
    ) {
      message.info("请选择文件");
      return;
    }
    const file = importFreshmanInfoFileList[0];
    setImportingFreshmanInfo(true);
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
      const studentInfos = (
        Xlsx.utils.sheet_to_json(firstWorksheet, {
          header: 1,
        }) as (string | number)[][]
      ).filter((i) => i.length !== 0);
      const head = studentInfos.shift();
      if (!head || head.length < 2) {
        throw new Error("Parse error");
      }

      let count = 0;
      const studentInfosWithUuid = await Promise.all(
        studentInfos.map(async (info) => {
          try {
            const student_no = info[0].toString();
            const realname = info[1].toString();
            const { data: studentData } = await queryStudentByStudentNo({
              variables: {
                student_no: student_no,
              },
            });
            const stu = studentData?.users[0];
            if (stu?.uuid && stu.realname) {
              if (stu.realname !== realname) {
                throw new Error(
                  `Realname mismatch: ${stu.realname} !== ${realname}`,
                );
              }
              count++;
              setImportFreshmanInfoProgress(
                Math.round(
                  Math.max((count / studentInfos.length) * 100 - 1, 0),
                ),
              );
              return {
                student_no: student_no,
                realname: realname,
                uuid: stu.uuid,
                year: year,
              };
            } else {
              count++;
              setImportFreshmanInfoProgress(
                Math.round(
                  Math.max((count / studentInfos.length) * 100 - 1, 0),
                ),
              );
              return {
                student_no: student_no,
                realname: realname,
                uuid: null,
                year: year,
              };
            }
          } catch (err) {
            throw err;
          }
        }),
      );
      await insertFreshmanInfoList({
        variables: {
          freshmanData: studentInfosWithUuid,
        },
      });
      setImportFreshmanInfoProgress(100);
    } catch (err) {
      message.error("Error loading file.\n" + err);
    } finally {
      setImportingFreshmanInfo(false);
      setImportFreshmanInfoFormVisible(false);
    }
  };

  // Upload chat record
  const handleUploadChatRecord = async (
    e: RcCustomRequestOptions,
    application_id: any,
  ) => {
    try {
      const url = `chat_record/${application_id}/${(e.file as RcFile).name}`;
      const result = await uploadFile(e.file, url);
      const xhr = new XMLHttpRequest();
      e.onSuccess!(result, xhr);
      await updateApplicationChatStatus({
        variables: {
          id: application_id,
          chat_status: true,
        },
      });
    } catch (err) {
      console.log(err);
      e.onError!(new Error("上传失败"));
    }
  };

  // Download chat record
  const handleDownloadChatRecord = async (application_id: any) => {
    try {
      const importMentorInfoFileList = await listFile(
        `chat_record/${application_id}/`,
      );
      const url = importMentorInfoFileList.reduce((max, item) => {
        return new Date(item.LastModified) > new Date(max.LastModified)
          ? item
          : max;
      }).Key;
      message.info("开始下载");
      downloadFile(url).catch((e) => message.error("下载失败：" + e));
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
      <Row style={{ justifyContent: "space-evenly" }}>
        <Col span={13}>
          {user.role === "teacher" && mentorDetail && (
            <>
              <Card>
                <Row>
                  <Col span={8}>
                    <Switch
                      loading={
                        mentorInfoListLoading ||
                        updateMentorInfoAvailableLoading
                      }
                      checkedChildren="正在接收申请"
                      unCheckedChildren="停止接收申请"
                      checked={mentorDetail?.available ?? false}
                      onChange={async () => {
                        if (!mentorDetail) return;
                        const isAvailable = !mentorDetail.available;
                        setMentorDetail({
                          ...mentorDetail,
                          available: isAvailable,
                        });
                        await updateMentorInfoAvailable({
                          variables: {
                            uuid: user.uuid!,
                            available: isAvailable,
                          },
                        });
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Typography.Text>申请人数上限： </Typography.Text>
                    <InputNumber
                      min={1}
                      max={5}
                      defaultValue={mentorDetail?.max_applicants}
                      onChange={async (value) => {
                        if (!mentorDetail || !value) return;
                        setMentorDetail({
                          ...mentorDetail,
                          max_applicants: value,
                        });
                        await updateMentorInfoMaxApplicants({
                          variables: {
                            uuid: user.uuid!,
                            max_applicants: value,
                          },
                        });
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      onClick={async () => {
                        setMentorDetailVisible(true);
                      }}
                    >
                      我的信息
                    </Button>
                  </Col>
                </Row>
              </Card>
              <br />
              <Card>
                <List>
                  <Row>
                    <Col span={4}>
                      <Tooltip
                        title={hideReject ? "显示未通过申请" : "隐藏未通过申请"}
                      >
                        <Button
                          shape="circle"
                          icon={
                            hideReject ? (
                              <EyeInvisibleOutlined />
                            ) : (
                              <EyeOutlined />
                            )
                          }
                          type="default"
                          onClick={() => {
                            setHideReject(!hideReject);
                          }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  <List
                    loading={mentorApplicationsListForMentorLoading}
                    dataSource={
                      mentorApplicationsListForMentorData?.mentor_application
                    }
                    renderItem={(item) => {
                      if (item.status === "rejected" && hideReject) return null;
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
                            {item.student?.realname}
                          </Descriptions.Item>
                          <Descriptions.Item label="申请时间" span={2}>
                            {dayjs(item.created_at).format("YYYY-MM-DD HH:mm")}
                          </Descriptions.Item>
                          <Descriptions.Item label="学生院系" span={2}>
                            {item.student?.department}
                          </Descriptions.Item>
                          <Descriptions.Item label="申请状态" span={2}>
                            {item.status === "approved" ? (
                              <Badge status="success" text="已通过" />
                            ) : item.status === "rejected" ? (
                              <Badge status="error" text="未通过" />
                            ) : (
                              <Badge status="processing" text="待处理" />
                            )}
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
                                  <Col span={3}></Col>
                                  <Col span={8}>
                                    <Button
                                      onClick={async () =>
                                        await handleDownloadChatRecord(item.id)
                                      }
                                    >
                                      下载
                                    </Button>
                                  </Col>
                                </Row>
                              )}
                            </Descriptions.Item>
                          )}
                          <Descriptions.Item label="详细信息" span={2}>
                            <Button
                              onClick={() => {
                                setSelectAppliedStudentDetail({
                                  application_id: item.id,
                                  student_uuid: item.student_uuid,
                                  real_name: item.student?.realname ?? "",
                                  department: item.student?.department ?? "",
                                  email: item.student?.email ?? "",
                                  phone: item.student?.phone ?? "",
                                  created_at: item.created_at,
                                  statement: item.statement,
                                  status: item.status,
                                });
                                setSelectAppliedStudentDetailVisiable(true);
                              }}
                            >
                              查看详细信息
                            </Button>
                          </Descriptions.Item>
                        </Descriptions>
                      );
                    }}
                  />
                </List>
              </Card>
            </>
          )}

          {user.role === "student" && (
            <Card>
              <Typography.Title level={2}>已申请</Typography.Title>
              <List
                loading={mentorApplicationsListForStudentLoading}
                dataSource={
                  mentorApplicationsListForStudentData?.mentor_application
                }
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
                        {item.mentor?.realname}
                      </Descriptions.Item>
                      <Descriptions.Item label="导师院系" span={2}>
                        {item.mentor?.department}
                      </Descriptions.Item>
                      <Descriptions.Item label="申请时间" span={2}>
                        {dayjs(item.created_at).format("YYYY-MM-DD HH:mm")}
                      </Descriptions.Item>
                      <Descriptions.Item label="申请状态" span={2}>
                        {item.status === "approved" ? (
                          <Badge status="success" text="已通过" />
                        ) : item.status === "rejected" ? (
                          <Badge status="error" text="未通过" />
                        ) : (
                          <Badge status="processing" text="待处理" />
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="申请陈述" span={4}>
                        <Text
                          css={`
                            word-rap: break-word;
                            white-space: pre-wrap;
                          `}
                        >
                          {item.statement}
                        </Text>
                        {item.status !== "approved" && (
                          <>
                            <br />
                            <br />
                            <Row>
                              <Col span={4}>
                                <Button
                                  disabled={item.status === "approved"}
                                  onClick={() => {
                                    setSelectMentor(item.mentor_uuid);
                                    applicationForm.setFieldsValue(item);
                                    setApplicationModalVisible(true);
                                  }}
                                >
                                  编辑
                                </Button>
                              </Col>
                              <Col span={4}>
                                <Button
                                  danger
                                  loading={deleteMentorApplicationLoading}
                                  disabled={item.status === "approved"}
                                  onClick={() => {
                                    Modal.confirm({
                                      centered: true,
                                      title: "确认删除申请？",
                                      icon: <ExclamationCircleFilled />,
                                      content: "删除后可重新申请",
                                      okText: "确认",
                                      okType: "danger",
                                      cancelText: "取消",
                                      onOk: async () => {
                                        await deleteMentorApplication({
                                          variables: {
                                            id: item.id,
                                          },
                                        });
                                        if (deleteMentorApplicationError) {
                                          message.error("删除失败");
                                        } else {
                                          message.success("删除成功");
                                        }
                                      },
                                    });
                                  }}
                                >
                                  删除
                                </Button>
                              </Col>
                            </Row>
                          </>
                        )}
                      </Descriptions.Item>
                      {item.status === "approved" && (
                        <Descriptions.Item label="谈话记录" span={4}>
                          <Row
                            align="middle"
                            style={{ justifyContent: "space-evenly" }}
                          >
                            <Col span={4}>
                              {item.chat_status === false ? (
                                <Badge status="processing" text="未提交" />
                              ) : (
                                <Badge status="success" text="已提交" />
                              )}
                            </Col>
                            <Col span={2} />
                            <Col span={4}>
                              <Upload
                                customRequest={async (e) => {
                                  await handleUploadChatRecord(e, item.id);
                                }}
                                onChange={(info) => {
                                  if (info.file.status === "done") {
                                    message.success(
                                      `${info.file.name} 上传成功`,
                                    );
                                  } else if (info.file.status === "error") {
                                    message.error(`${info.file.name} 上传失败`);
                                  }
                                }}
                                showUploadList={false}
                              >
                                <Button icon={<UploadOutlined />}>提交</Button>
                              </Upload>
                            </Col>
                            {item.chat_status === true && (
                              <>
                                <Col span={2} />
                                <Col span={4}>
                                  <Button
                                    icon={<DownloadOutlined />}
                                    onClick={() =>
                                      handleDownloadChatRecord(item.id)
                                    }
                                  >
                                    下载
                                  </Button>
                                </Col>
                              </>
                            )}
                          </Row>
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  );
                }}
              />
            </Card>
          )}

          {user.role === "counselor" &&
            mentorApplicationSchedule &&
            selectedYear === new Date().getFullYear() && (
              <Card hoverable>
                <Typography.Title level={2} style={{ margin: "8px 8px 0 8px" }}>
                  管理时间
                </Typography.Title>
                <br />
                <Row>
                  <Col span={1} />
                  <Col>
                    <Timeline style={{ width: "100%" }}>
                      <Timeline.Item color="#027dcd">
                        <Typography.Text>
                          预备阶段：导师更新个人信息
                        </Typography.Text>
                        <br />
                        <br />
                        <DatePicker.RangePicker
                          defaultValue={[
                            dayjs(mentorApplicationSchedule.start_A),
                            dayjs(mentorApplicationSchedule.end_A),
                          ]}
                          onChange={(date) => {
                            if (date && date[0] && date[1]) {
                              setMentorApplicationSchedule({
                                ...mentorApplicationSchedule,
                                start_A: date[0].toDate(),
                                end_A: date[1].toDate(),
                              });
                            }
                          }}
                        />
                        <br />
                        <br />
                      </Timeline.Item>
                      <Timeline.Item color="#027dcd">
                        <Typography.Text>
                          预备阶段：学生了解导师信息
                        </Typography.Text>
                        <br />
                        <br />
                        <DatePicker.RangePicker
                          defaultValue={[
                            dayjs(mentorApplicationSchedule.start_B),
                            dayjs(mentorApplicationSchedule.end_B),
                          ]}
                          onChange={(date) => {
                            if (date && date[0] && date[1]) {
                              setMentorApplicationSchedule({
                                ...mentorApplicationSchedule,
                                start_B: date[0].toDate(),
                                end_B: date[1].toDate(),
                              });
                            }
                          }}
                        />
                        <br />
                        <br />
                      </Timeline.Item>
                      <Timeline.Item color="#027dcd">
                        <Typography.Text>
                          第一阶段：自由申请与匹配
                        </Typography.Text>
                        <br />
                        <br />
                        <DatePicker.RangePicker
                          defaultValue={[
                            dayjs(mentorApplicationSchedule.start_C),
                            dayjs(mentorApplicationSchedule.end_C),
                          ]}
                          onChange={(date) => {
                            if (date && date[0] && date[1]) {
                              setMentorApplicationSchedule({
                                ...mentorApplicationSchedule,
                                start_C: date[0].toDate(),
                                end_C: date[1].toDate(),
                              });
                            }
                          }}
                        />
                        <br />
                        <br />
                      </Timeline.Item>
                      <Timeline.Item color="#027dcd">
                        <Typography.Text>
                          第二阶段：未匹配同学补选
                        </Typography.Text>
                        <br />
                        <br />
                        <DatePicker.RangePicker
                          defaultValue={[
                            dayjs(mentorApplicationSchedule.start_D),
                            dayjs(mentorApplicationSchedule.end_D),
                          ]}
                          onChange={(date) => {
                            if (date && date[0] && date[1]) {
                              setMentorApplicationSchedule({
                                ...mentorApplicationSchedule,
                                start_D: date[0].toDate(),
                                end_D: date[1].toDate(),
                              });
                            }
                          }}
                        />
                        <br />
                        <br />
                      </Timeline.Item>
                      <Timeline.Item color="#027dcd">
                        <Typography.Text>
                          第三阶段：系统随机分配
                        </Typography.Text>
                        <br />
                        <br />
                        <DatePicker.RangePicker
                          defaultValue={[
                            dayjs(mentorApplicationSchedule.start_E),
                            dayjs(mentorApplicationSchedule.end_E),
                          ]}
                          onChange={(date) => {
                            if (date && date[0] && date[1]) {
                              setMentorApplicationSchedule({
                                ...mentorApplicationSchedule,
                                start_E: date[0].toDate(),
                                end_E: date[1].toDate(),
                              });
                            }
                          }}
                        />
                      </Timeline.Item>
                    </Timeline>
                  </Col>
                </Row>
                <Typography.Title level={2} style={{ margin: "8px 8px 0 8px" }}>
                  操作
                </Typography.Title>
                <br />
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Button
                      onClick={() => setImportFreshmanInfoFormVisible(true)}
                      loading={importingFreshmanInfo}
                      disabled={
                        freshmanInfoListLoading ||
                        mentorApplicationsListForCounselorsLoading
                      }
                      block
                    >
                      导入新生信息
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      onClick={() => setImportMentorInfoFormVisible(true)}
                      loading={importingMentorInfo}
                      disabled={
                        freshmanInfoListLoading ||
                        mentorApplicationsListForCounselorsLoading
                      }
                      block
                    >
                      导入导师信息
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      onClick={handleExport}
                      loading={exporting}
                      disabled={
                        freshmanInfoListLoading ||
                        mentorApplicationsListForCounselorsLoading
                      }
                      block
                    >
                      导出申请
                    </Button>
                  </Col>
                  <Col span={16}>
                    <Tooltip title="点击刷新">
                      <Button
                        onClick={async () => {
                          await refetchFreshmanInfoList({
                            year: selectedYear,
                          });
                        }}
                        disabled={
                          freshmanInfoListLoading ||
                          mentorApplicationsListForCounselorsLoading
                        }
                        block
                      >
                        {"匹配人数: "}
                        {freshmanInfoListData && unmatchedFreshmanList
                          ? freshmanInfoListData.freshman.length -
                            unmatchedFreshmanList.length
                          : NaN}
                        /{freshmanInfoListData?.freshman.length ?? NaN}
                      </Button>
                    </Tooltip>
                  </Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      onClick={() => {
                        Modal.confirm({
                          title: "确认进行系统随机分配？",
                          content: "此操作不可撤销",
                          okText: "确认",
                          cancelText: "取消",
                          onOk: async () => {
                            setAttributing(true);
                            await handleAttribute();
                          },
                        });
                      }}
                      loading={attributing}
                      block
                    >
                      随机分配
                    </Button>
                  </Col>
                </Row>
                <br />
              </Card>
            )}
        </Col>

        {mentorApplicationSchedule && (
          <Col span={9}>
            <Card hoverable>
              <Row align="middle">
                {/* <Col>
                  <Input
                    defaultValue={new Date().getFullYear()}
                    size="large"
                    style={{
                      fontSize: 24,
                      border: "none",
                      padding: 0,
                      width: 60,
                      cursor: "default",
                      fontWeight: "bold",
                    }}
                    onChange={async (v) => {
                      if (v.target.value.length === 4) {
                        setSelectedYear(parseInt(v.target.value));
                      }
                    }}
                  />
                </Col> */}
                <Col>
                  <Typography.Title
                    level={2}
                    style={{ margin: "8px 8px 0 8px" }}
                  >
                    时间线
                  </Typography.Title>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={1}></Col>
                <Col>
                  <Timeline>
                    {(user.role === "teacher" || user.role === "counselor") && (
                      <Timeline.Item
                        color={
                          dayjs(new Date()) >=
                            dayjs(mentorApplicationSchedule.start_A) &&
                          dayjs(new Date()) <=
                            dayjs(mentorApplicationSchedule.end_A)
                            ? "green"
                            : "gray"
                        }
                      >
                        <p>预备阶段：导师更新个人信息</p>
                        <br />
                        <p>
                          {dayjs(mentorApplicationSchedule.start_A).format(
                            "YYYY-MM-DD",
                          )}{" "}
                          ~{" "}
                          {dayjs(mentorApplicationSchedule.end_A).format(
                            "YYYY-MM-DD",
                          )}
                        </p>
                      </Timeline.Item>
                    )}
                    <Timeline.Item
                      color={
                        dayjs(new Date()) >=
                          dayjs(mentorApplicationSchedule.start_B) &&
                        dayjs(new Date()) <=
                          dayjs(mentorApplicationSchedule.end_B)
                          ? "green"
                          : "gray"
                      }
                    >
                      <p>预备阶段：学生了解导师信息</p>
                      <br />
                      <p>
                        {dayjs(mentorApplicationSchedule.start_B).format(
                          "YYYY-MM-DD",
                        )}{" "}
                        ~{" "}
                        {dayjs(mentorApplicationSchedule.end_B).format(
                          "YYYY-MM-DD",
                        )}
                      </p>
                    </Timeline.Item>

                    <Timeline.Item
                      color={
                        dayjs(new Date()) >=
                          dayjs(mentorApplicationSchedule.start_C) &&
                        dayjs(new Date()) <=
                          dayjs(mentorApplicationSchedule.end_C)
                          ? "green"
                          : "gray"
                      }
                    >
                      <p>第一阶段：自由申请与匹配</p>
                      <br />
                      <p>
                        {dayjs(mentorApplicationSchedule.start_C).format(
                          "YYYY-MM-DD",
                        )}{" "}
                        ~{" "}
                        {dayjs(mentorApplicationSchedule.end_C).format(
                          "YYYY-MM-DD",
                        )}
                      </p>
                    </Timeline.Item>

                    <Timeline.Item
                      color={
                        dayjs(new Date()) >=
                          dayjs(mentorApplicationSchedule.start_D) &&
                        dayjs(new Date()) <=
                          dayjs(mentorApplicationSchedule.end_D)
                          ? "green"
                          : "gray"
                      }
                    >
                      <p>第二阶段：未匹配同学补选</p>
                      <br />
                      <p>
                        {dayjs(mentorApplicationSchedule.start_D).format(
                          "YYYY-MM-DD",
                        )}{" "}
                        ~{" "}
                        {dayjs(mentorApplicationSchedule.end_D).format(
                          "YYYY-MM-DD",
                        )}
                      </p>
                    </Timeline.Item>

                    <Timeline.Item
                      color={
                        dayjs(new Date()) >=
                          dayjs(mentorApplicationSchedule.start_E) &&
                        dayjs(new Date()) <=
                          dayjs(mentorApplicationSchedule.end_E)
                          ? "green"
                          : "gray"
                      }
                    >
                      <p>第三阶段：系统随机分配</p>
                      <br />
                      <p>
                        {dayjs(mentorApplicationSchedule.start_E).format(
                          "YYYY-MM-DD",
                        )}{" "}
                        ~{" "}
                        {dayjs(mentorApplicationSchedule.end_E).format(
                          "YYYY-MM-DD",
                        )}
                      </p>
                    </Timeline.Item>
                  </Timeline>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>

      <br />

      {user.role === "counselor" && (
        <>
          <Col span={26}>
            <Row style={{ justifyContent: "space-evenly" }}>
              <Col span={11}>
                <Card hoverable>
                  <Typography.Title
                    level={2}
                    style={{ margin: "8px 8px 0 8px" }}
                  >
                    未匹配学生
                  </Typography.Title>
                  <Table
                    style={{ margin: "16px 8px 0 8px" }}
                    dataSource={unmatchedFreshmanList}
                    columns={[
                      {
                        title: "学号",
                        dataIndex: "student_no",
                        key: "student_no",
                      },
                      { title: "姓名", dataIndex: "realname", key: "realname" },
                    ]}
                  />
                </Card>
              </Col>

              <Col span={11}>
                <Card hoverable>
                  <Typography.Title
                    level={2}
                    style={{ margin: "8px 8px 0 8px" }}
                  >
                    未注册学生
                  </Typography.Title>
                  <Table
                    style={{ margin: "16px 8px 0 8px" }}
                    dataSource={freshmanInfoListData?.freshman.filter(
                      (i) =>
                        !registeredFreshmanList.find(
                          (j) => j.student_no === i.student_no,
                        ),
                    )}
                    columns={[
                      {
                        title: "学号",
                        dataIndex: "student_no",
                        key: "student_no",
                      },
                      { title: "姓名", dataIndex: "realname", key: "realname" },
                    ]}
                  />
                </Card>
              </Col>
            </Row>
          </Col>

          <Modal
            open={importMentorInfoFormVisible}
            title="导入导师信息"
            centered
            onOk={handleImportMentorInfo}
            onCancel={() => setImportMentorInfoFormVisible(false)}
            maskClosable={false}
            confirmLoading={importingMentorInfo}
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
                onChange={(e) => setImportMentorInfoFileList(e.target.files)}
              />
              <label htmlFor="upload-file"></label>
              {importMentorInfoProgress > 0 && (
                <Progress
                  type="circle"
                  percent={importMentorInfoProgress}
                  status="active"
                />
              )}
            </div>
          </Modal>

          <Modal
            open={importFreshmanInfoFormVisible}
            title="导入新生信息"
            centered
            onOk={() => handleImportFreshmanInfo(selectedYear)}
            onCancel={() => setImportFreshmanInfoFormVisible(false)}
            maskClosable={false}
            confirmLoading={importingMentorInfo}
            okText="导入"
          >
            <Typography.Paragraph>
              上传 Excel 文件以更新申请状态。Excel 的格式应为：学号、姓名
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
                onChange={(e) => setImportFreshmanInfoFileList(e.target.files)}
              />
              <label htmlFor="upload-file"></label>
              {importFreshmanInfoProgress > 0 && (
                <Progress
                  type="circle"
                  percent={importFreshmanInfoProgress}
                  status="active"
                />
              )}
            </div>
          </Modal>
        </>
      )}

      {/* {user.role === "student" && ( */}
      <br />
      <>
        <Col span={26}>
          <Card hoverable>
            <Typography.Title level={2}>导师列表</Typography.Title>
            <Table
              rowKey="_id"
              loading={!mentorListFull}
              dataSource={mentorListFull}
              columns={mentorInfoListColumns}
            />
          </Card>
        </Col>
        <Modal
          open={applicationModalVisible}
          title={
            mentorApplicationsListForStudentData &&
            mentorApplicationsListForStudentData.mentor_application.filter(
              (i) => i.mentor_uuid === selectMentor,
            ).length > 0
              ? "编辑申请"
              : "新申请"
          }
          centered
          destroyOnClose
          okText="提交"
          onCancel={() => {
            setApplicationModalVisible(false);
            setSelectMentor(undefined);
            applicationForm.resetFields();
          }}
          onOk={handleApplicationEdit}
          maskClosable={false}
          confirmLoading={
            insertMentorApplicationLoading ||
            updateMentorApplicationStatementLoading
          }
        >
          <Form
            form={applicationForm}
            name="application"
            onFinish={handleApplicationEdit}
          >
            <Form.Item name={["mentor", "realname"]} label="导师姓名">
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
      {/* )} */}

      {/* 学生详细信息 */}
      <Modal
        open={selectAppliedStudentDetailVisiable}
        title={
          selectAppliedStudentDetail?.real_name
            ? `${selectAppliedStudentDetail.real_name}的信息`
            : "学生信息未记录于数据库中"
        }
        centered
        destroyOnClose
        onCancel={() => {
          setSelectAppliedStudentDetailVisiable(false);
        }}
        footer={null}
        width="60%"
      >
        <Descriptions column={3}>
          <Descriptions.Item label="姓名">
            {selectAppliedStudentDetail?.real_name ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="院系">
            {selectAppliedStudentDetail?.department ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {selectAppliedStudentDetail?.email ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="手机">
            {selectAppliedStudentDetail?.phone ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="申请时间" span={2}>
            {dayjs(selectAppliedStudentDetail?.created_at).format(
              "YYYY-MM-DD HH:mm",
            ) ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="申请陈述" span={3}>
            {selectAppliedStudentDetail?.statement ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item span={3}>{""}</Descriptions.Item> 占位
          <Descriptions.Item span={1}>
            <Radio.Group
              disabled={
                updateMentorApplicationStatusLoading ||
                selectAppliedStudentDetail?.application_id === undefined
              }
              value={selectAppliedStudentDetail?.status}
              onChange={async (e) => {
                try {
                  await updateMentorApplicationStatus({
                    variables: {
                      id: selectAppliedStudentDetail?.application_id,
                      status: e.target.value,
                    },
                  });
                  setSelectAppliedStudentDetail(
                    selectAppliedStudentDetail
                      ? {
                          ...selectAppliedStudentDetail,
                          status: e.target.value,
                        }
                      : undefined,
                  );
                  await refetchMentorApplicationsListForMentor({
                    uuid: user.uuid!,
                    year: selectedYear,
                  });
                  await mentorListWithApplicationsCount(
                    mentorInfoListData,
                    selectedYear,
                  );
                  setSelectAppliedStudentDetailVisiable(false);
                } catch (err) {
                  message.error("更新失败");
                }
              }}
            >
              <Radio value="approved">接收</Radio>
              <Radio value="submitted">待处理</Radio>
              <Radio value="rejected">拒绝</Radio>
            </Radio.Group>
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      {/* 老师详细信息 */}

      <Modal
        open={selectMentorDetailVisiable}
        centered
        destroyOnClose
        onCancel={() => {
          setSelectMentorDetailVisiable(false);
        }}
        footer={null}
        width="60%"
      >
        {selectMentorDetail?.mentor_uuid && selectMentorDetail?.real_name ? (
          <Descriptions title={selectMentorDetail.real_name} column={1}>
            <Descriptions.Item label="基本信息">
              {selectMentorDetail?.intro ?? "暂无记录"}
            </Descriptions.Item>
            <Descriptions.Item label="教育背景">
              {selectMentorDetail?.background ?? "暂无记录"}
            </Descriptions.Item>
            <Descriptions.Item label="研究领域">
              {selectMentorDetail?.field ?? "暂无记录"}
            </Descriptions.Item>
            <Descriptions.Item label="学术成果">
              {selectMentorDetail?.achievement ?? "暂无记录"}
            </Descriptions.Item>
            <Descriptions.Item label="联系邮箱">
              {selectMentorDetail?.email ?? "暂无记录"}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Descriptions title={"导师信息未记录于数据库中"}></Descriptions>
        )}
      </Modal>

      {/* 更改老师信息 */}
      <Modal
        open={mentorDetailVisible}
        centered
        destroyOnClose
        onCancel={() => {
          setMentorDetailVisible(false);
        }}
        okText="更新"
        confirmLoading={updateMentorInfoDescriptionLoading}
        cancelText="取消"
        onOk={async () => {
          try {
            if (
              mentorDetail?.mentor_uuid === undefined ||
              mentorDetail?.real_name === undefined
            ) {
              throw new Error(
                "导师信息未记录于数据库中或姓名为空，请联系管理员",
              );
            }
            const values = await mentorInfoForm
              .validateFields()
              .catch((info) => message.error(`表单验证失败`));
            await updateMentorInfoDescription({
              variables: {
                ...pick(values, [
                  "achievement",
                  "background",
                  "field",
                  "intro",
                ]),
                mentor_uuid: mentorDetail.mentor_uuid,
              },
            });
            setMentorDetailVisible(false);
            message.info(`信息更新成功`);
          } catch (error) {
            message.error(`信息更新失败：${updateMentorInfoDescriptionError}`);
          }
        }}
        width="70%"
      >
        <Form
          form={mentorInfoForm}
          layout="vertical"
          name="mentorInfoForm"
          initialValues={{
            intro: mentorDetail?.intro,
            background: mentorDetail?.background,
            field: mentorDetail?.field,
            achievement: mentorDetail?.achievement,
          }}
        >
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
