import React from "react";
import { Button, Layout, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
//import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ProColumns, ProTable } from "@ant-design/pro-components";
//import { Link } from "react-router-dom";
import { PageProps } from "../..";
import DiscussDrawer from "./DiscussDrawer";
import CourseRating from "./CourseRating";

/* ---------------- 接口和类型定义 ---------------- */
export interface CourseProps extends PageProps {
  course_uuid: string;
}

/* ---------------- 主页面 ---------------- */
const CoursesPage: React.FC<PageProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  //const url = useUrl();

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { refetch: courseRefetch } = graphql.useGetCourseSuspenseQuery();

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
      width: "20%",
      key: "option",
      render: (text, record, _, action) => [
        <DiscussDrawer course_uuid={record.uuid} mode={mode} user={user} />,
        <CourseRating course_uuid={record.uuid} mode={mode} user={user} />,
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
    const filteredData =
      data?.course.filter((course) => {
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
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            导入
          </Button>,
        ]}
      />
    </Layout>
  );
};

export default CoursesPage;
