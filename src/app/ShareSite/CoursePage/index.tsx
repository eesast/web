import React, { useState, useEffect } from "react";
import { Card, Layout, message } from "antd";
import { WarningOutlined, ClockCircleOutlined } from "@ant-design/icons";
import * as graphql from "@/generated/graphql";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { PageProps } from "../..";
import DiscussDrawer from "./DiscussDrawer";
import CourseRating from "./CourseRating";
import CourseDetail from "./CourseDetail";
import axios from "axios";

/* ---------------- 接口和类型定义 ---------------- */
export interface CourseProps extends PageProps {
  course_uuid: string;
  isManager: boolean;
}

/* ---------------- 主页面 ---------------- */
const CoursePage: React.FC<PageProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  //const url = useUrl();

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { refetch: courseRefetch } = graphql.useGetCourseSuspenseQuery();

  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/course/is_manager`);
          if (response.status !== 200) throw new Error("Server error");
          setIsManager(response.data.is_manager);
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }
  });

  /* ---------------- 随渲染刷新的组件 ---------------- */
  const columns: ProColumns<graphql.GetCourseQuery["course"][0]>[] = [
    {
      title: "课程号",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "课程名",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "课程简称",
      dataIndex: "name",
      key: "name",
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "年份",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
      // hideInSearch: true,
    },
    {
      title: "学期",
      dataIndex: "semester",
      key: "semester",
      // hideInSearch: true,
      valueType: "select",
      valueEnum: {
        春季学期: { text: "春季学期", status: "spring" },
        秋季学期: { text: "秋季学期", status: "autumn" },
        夏季学期: { text: "夏季学期", status: "summer" },
      },
    },
    {
      title: "主讲教师",
      dataIndex: "professor",
      key: "professor",
    },
    {
      title: "课程属性",
      dataIndex: "type",
      key: "type",
      // hideInSearch: true,
      valueType: "select",
      valueEnum: {
        核心必修: { text: "核心必修", status: "must" },
        专业限选: { text: "专业限选", status: "required" },
        专业限选实验课: { text: "专业限选实验课", status: "required_lab" },
        专业任选: { text: "专业任选", status: "optional" },
      },
    },
    {
      title: "授课语言",
      dataIndex: "language",
      key: "language",
      // hideInSearch: true,
      valueType: "select",
      valueEnum: {
        中文: { text: "中文", status: "chinese" },
        英文: { text: "英文", status: "english" },
      },
    },
    {
      title: "操作",
      valueType: "option",
      width: "24%",
      key: "option",
      render: (text, record, _, action) => [
        <div
          key="action-wrapper"
          className="action-buttons"
          css={`
            display: flex;
            flex-wrap: wrap;
            gap: 16px;

            @media (max-width: 768px) {
              flex-direction: column;

              .ant-btn {
                width: 100%;
                margin-left: 0 !important;
              }
            }
          `}
        >
          <DiscussDrawer
            course_uuid={record.uuid}
            mode={mode}
            user={user}
            isManager={isManager}
          />
          <CourseRating
            course_uuid={record.uuid}
            mode={mode}
            user={user}
            isManager={isManager}
          />
          <CourseDetail
            course_uuid={record.uuid}
            mode={mode}
            user={user}
            isManager={isManager}
          />
        </div>,
        // <Link to={url.append("course", record.uuid).link("repo")}>仓库</Link>,
      ],
    },
  ];

  /* ---------------- 业务逻辑函数 ---------------- */
  const dataRequest = async (params: {
    pageSize?: number;
    current?: number;
    [key: string]: any;
  }): Promise<{
    data: graphql.GetCourseQuery["course"];
    success: boolean;
    total?: number;
  }> => {
    //console.log(params);
    const { data, error } = await courseRefetch();
    if (error) {
      message.error("课程加载失败");
      console.log(error.message);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
    const reversedData = [...(data?.course ?? [])].reverse();
    const filteredData =
      reversedData?.filter((course) => {
        return (
          (!params.code ||
            course.code.toLowerCase().includes(params.code.toLowerCase())) &&
          (!params.fullname ||
            course.fullname
              .toLowerCase()
              .includes(params.fullname.toLowerCase())) &&
          (!params.year || course.year === parseInt(params.year)) &&
          (!params.semester || course.semester === params.semester) &&
          (!params.professor ||
            course.professor
              .toLowerCase()
              .includes(params.professor.toLowerCase())) &&
          (!params.type || course.type === params.type) &&
          (!params.language || course.language === params.language)
        );
      }) ?? [];

    // 处理分页
    const startIndex = (params.current! - 1) * params.pageSize!;
    const endIndex = startIndex + params.pageSize!;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      success: true,
      total: filteredData.length,
    };
  };

  /* ---------------- 页面组件 ---------------- */
  return (
    <Layout
      css={`
        margin: 30px;
      `}
    >
      <Card>
        <ClockCircleOutlined /> <strong>公告：</strong>
        科协同学寒假放假了，新的讨论留待开学后审查，评分区可正常食用，祝大家新年快乐！
        <br />
        <WarningOutlined /> <strong>提示：</strong>
        讨论区中的内容仅代表同学个人观点，仅供参考
      </Card>
      <br />
      <ProTable<graphql.GetCourseQuery["course"][0]>
        columns={columns}
        request={dataRequest}
        rowKey="uuid"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          labelWidth: "auto",
        }}
        dateFormatter="string"
        headerTitle="课程列表"
        // toolBarRender={() => [
        //   <Button key="button" icon={<PlusOutlined />} type="primary">
        //     导入
        //   </Button>,
        // ]}
      />
    </Layout>
  );
};

export default CoursePage;
