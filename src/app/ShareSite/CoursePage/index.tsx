import React, { useState, useEffect } from "react";
import {
  Card,
  Layout,
  message,
  Popover,
  Typography,
  Pagination,
  Spin,
  Tag,
} from "antd";
import { WarningOutlined, ClockCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import * as graphql from "@/generated/graphql";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { PageProps } from "../..";
import { useNarrow } from "@/api/hooks/narrow";
import DiscussDrawer from "./DiscussDrawer";
import CourseRating from "./CourseRating";
import CourseDetail from "./CourseDetail";
import axios from "axios";

/* ---------------- 接口和类型定义 ---------------- */
export interface CourseProps extends PageProps {
  course_uuid: string;
  isManager: boolean;
}

type Course = graphql.GetCourseQuery["course"][0];

/* ---------------- 不随渲染刷新的常量 ---------------- */
// 学期按首字缩成「春 / 秋 / 夏」，与年份拼成「2024 秋」，省掉一整列
const semesterShort = (semester: string) => {
  if (!semester) return "";
  if (semester.startsWith("春")) return "春";
  if (semester.startsWith("秋")) return "秋";
  if (semester.startsWith("夏")) return "夏";
  return semester;
};

const textColor = (light: boolean) =>
  light ? "rgba(0, 0, 0, 0.88)" : "rgba(255, 255, 255, 0.92)";
const subColor = (light: boolean) =>
  light ? "rgba(0, 0, 0, 0.45)" : "rgba(255, 255, 255, 0.5)";
const midColor = (light: boolean) =>
  light ? "rgba(0, 0, 0, 0.55)" : "rgba(255, 255, 255, 0.6)";

/* ---------------- 不随渲染刷新的组件：手机端课程卡片 ---------------- */
const MobileWrap = styled.div`
  padding: 8px 12px 24px;
  box-sizing: border-box;
  width: 100%;
`;

const MobileCard = styled.div<{ $light: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  border-radius: 12px;
  background-color: ${(p) => (p.$light ? "white" : "#1f1f1f")};
  border: 1px solid
    ${(p) => (p.$light ? "rgba(5, 5, 5, 0.06)" : "rgba(253, 253, 253, 0.12)")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  & + & {
    margin-top: 10px;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
`;

const CourseName = styled.div<{ $light: boolean }>`
  flex: 1 1 auto;
  min-width: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(p) => textColor(p.$light)};
`;

// 单行截断，点一下弹层看全号
const CourseCode = styled.div<{ $light: boolean }>`
  flex: 0 0 auto;
  max-width: 104px;
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: ${(p) => subColor(p.$light)};
`;

const CardMeta = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
  margin-top: 6px;
  font-size: 13px;
`;

const MetaFixed = styled.span<{ $light: boolean }>`
  flex: 0 0 auto;
  color: ${(p) => subColor(p.$light)};
`;

// 教师单行截断，点一下弹层看全
const Teacher = styled.span<{ $light: boolean }>`
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  border-bottom: 1px dashed
    ${(p) => (p.$light ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)")};
  color: ${(p) => midColor(p.$light)};
`;

// 三个按钮统一压成文字链，横排省高度
const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(128, 128, 128, 0.15);

  .ant-btn {
    height: 34px !important;
    padding: 0 10px !important;
    font-size: 14px !important;
    background-color: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
    color: #1677ff !important;
  }

  .ant-btn:hover {
    background-color: rgba(22, 119, 255, 0.08) !important;
    color: #1677ff !important;
  }
`;

const PagerWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 14px;
`;

// 课程属性 / 授课语言
const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;

  .ant-tag {
    margin-inline-end: 0;
    padding: 0 8px;
    font-size: 13px;
    line-height: 22px;
    border-radius: 6px;
  }
`;

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
  const isNarrow = useNarrow();
  const light = mode === "light";

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
  const announcement = (
    <Card>
      <ClockCircleOutlined /> <strong>公告：</strong>
      科协同学寒假放假了，新的讨论留待开学后审查，评分区可正常食用，祝大家新年快乐！
      <br />
      <WarningOutlined /> <strong>提示：</strong>
      讨论区中的内容仅代表同学个人观点，仅供参考
    </Card>
  );

  // 手机端只替换表格主体：搜索表单、筛选、分页状态全由 ProTable 自己管
  const renderMobileList = (props: any) => {
    const rows: Course[] = props.dataSource ?? [];
    const pager = props.pagination;
    const total = pager && pager.total ? pager.total : 0;
    // loading 可能是 { spinning: boolean }，直接 !! 会一直为真
    const spinning =
      typeof props.loading === "object"
        ? !!props.loading?.spinning
        : !!props.loading;

    return (
      <Spin spinning={spinning}>
        <div>
          {rows.map((course) => (
            <MobileCard $light={light} key={course.uuid}>
              <CardTop>
                <CourseName $light={light}>{course.fullname}</CourseName>
                <Popover
                  trigger="click"
                  placement="topRight"
                  content={
                    <Typography.Text copyable={{ text: course.code }}>
                      {course.code}
                    </Typography.Text>
                  }
                >
                  <CourseCode $light={light}>{course.code}</CourseCode>
                </Popover>
              </CardTop>
              <CardMeta>
                <MetaFixed $light={light}>
                  {course.year} {semesterShort(course.semester)}
                </MetaFixed>
                <MetaFixed $light={light}>·</MetaFixed>
                <Popover
                  trigger="click"
                  placement="top"
                  content={<span>{course.professor}</span>}
                >
                  <Teacher $light={light}>{course.professor}</Teacher>
                </Popover>
              </CardMeta>
              <CardTags>
                {course.type ? <Tag>{course.type}</Tag> : null}
                {course.language ? <Tag>{course.language}</Tag> : null}
              </CardTags>
              <CardActions>
                <DiscussDrawer
                  course_uuid={course.uuid}
                  mode={mode}
                  user={user}
                  isManager={isManager}
                />
                <CourseRating
                  course_uuid={course.uuid}
                  mode={mode}
                  user={user}
                  isManager={isManager}
                />
                <CourseDetail
                  course_uuid={course.uuid}
                  mode={mode}
                  user={user}
                  isManager={isManager}
                />
              </CardActions>
            </MobileCard>
          ))}
        </div>
        {pager && total > (pager.pageSize || 10) ? (
          <PagerWrap>
            <Pagination
              size="small"
              showLessItems
              current={pager.current}
              pageSize={pager.pageSize}
              total={total}
              onChange={pager.onChange}
            />
          </PagerWrap>
        ) : null}
      </Spin>
    );
  };

  /* ---------------- 手机端 ---------------- */
  if (isNarrow) {
    return (
      <Layout>
        <MobileWrap>
          <div style={{ marginBottom: 12 }}>{announcement}</div>
          <ProTable<graphql.GetCourseQuery["course"][0]>
            columns={columns}
            request={dataRequest}
            rowKey="uuid"
            pagination={{ showQuickJumper: false }}
            search={{
              labelWidth: "auto",
            }}
            dateFormatter="string"
            headerTitle="课程列表"
            cardProps={{ bodyStyle: { padding: 12 } }}
            // 密度 / 列设置在手机上没法用，直接不渲染
            options={{ density: false, setting: false }}
            tableViewRender={renderMobileList}
          />
        </MobileWrap>
      </Layout>
    );
  }

  /* ---------------- 桌面端：保持原样 ---------------- */
  return (
    <Layout
      css={`
        margin: 30px;
      `}
    >
      {announcement}
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
