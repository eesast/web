import React, { useState } from "react";
import { Button, Drawer, Form, Rate, Space, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { CourseProps } from ".";
import * as graphql from "@/generated/graphql";
import { Radar } from "@ant-design/charts";

const CourseRating: React.FC<CourseProps> = ({
  course_uuid,
  mode,
  user,
}: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [form] = Form.useForm();
  const { data: courseRatingData, refetch: refetchCourseRating } =
    graphql.useGetCourseRatingOneQuery({
      variables: {
        course_uuid: course_uuid,
        user_uuid: user.uuid,
      },
    });

  const { data: courseRatingTotal } = graphql.useGetCourseRatingQuery({
    variables: {
      course_uuid: course_uuid,
    },
  });

  const [addCourseRating] = graphql.useAddCourseRatingMutation();
  const [updateCourseRating] = graphql.useUpdateCourseRatingMutation();
  //const [deleteCourseRating] = graphql.useDeleteCourseRatingMutation();

  const showDrawer = () => {
    handleGetCourseRating();
    setOpenDrawer(true);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleGetCourseRating = async () => {
    setIsRotating(true);
    const { data, error } = await refetchCourseRating({ course_uuid });
    setTimeout(() => setIsRotating(false), 500);
    if (error) {
      message.error("获取评分失败");
      console.log(error);
      return;
    }
    if (data) {
      form.setFieldsValue(courseRatingData?.course_rating_by_pk);
    } else {
      message.error("获取评分失败");
    }
  };

  const handleSaveRating = async () => {
    const values = await form.validateFields();
    if (
      values.dim1 === 0 ||
      values.dim2 === 0 ||
      values.dim3 === 0 ||
      values.dim4 === 0 ||
      values.dim5 === 0 ||
      values.dim6 === 0
    ) {
      message.error("请完成所有评分");
      return;
    }
    try {
      if (courseRatingData?.course_rating_by_pk) {
        // 如果已有评分，进行更新操作
        await updateCourseRating({
          variables: {
            course_id: course_uuid,
            user_uuid: user.uuid,
            dim1: values.dim1,
            dim2: values.dim2,
            dim3: values.dim3,
            dim4: values.dim4,
            dim5: values.dim5,
            dim6: values.dim6,
          },
        });
        message.success("评分已更新");
      } else {
        // 如果没有评分，进行添加操作
        await addCourseRating({
          variables: {
            dim1: values.dim1,
            dim2: values.dim2,
            dim3: values.dim3,
            dim4: values.dim4,
            dim5: values.dim5,
            dim6: values.dim6,
            course_id: course_uuid,
            user_uuid: user.uuid,
          },
        });
        message.success("评分已添加");
      }
      refetchCourseRating();
    } catch (error) {
      message.error("保存评分失败");
      console.log(error);
    }
  };

  const radarData = [
    {
      item: "任务量",
      score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim1,
    },
    {
      item: "内容难度",
      score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim2,
    },
    {
      item: "上课质量",
      score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim3,
    },
    {
      item: "收获感",
      score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim4,
    },
    {
      item: "给分好坏",
      score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim5,
    },
    {
      item: "考试作业讲课相关度",
      score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim6,
    },
  ];

  const config = {
    tutle: {
      visable: true,
      text: "课程评分雷达图",
    },
    radarData,
    angleField: "item",
    radiusField: "score",
    radiusAxis: {
      grid: {
        alternateColor: ["rgba(0, 0, 0, 0.04)", null],
      },
    },
    area: { visible: false },
    point: { visible: true },
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        评分
      </Button>
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>课程评分</span>
            <Space>
              <Button
                type="link"
                icon={
                  <ReloadOutlined
                    style={{
                      fontSize: "20px",
                      color: "#1890ff",
                      transition: "transform 0.5s ease",
                      transform: isRotating ? "rotate(360deg)" : "rotate(0deg)",
                    }}
                  />
                }
                onClick={handleGetCourseRating}
              />
            </Space>
          </div>
        }
        width={520}
        onClose={closeDrawer}
        open={openDrawer}
        key="course_rating"
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={handleSaveRating} type="primary">
              保存
            </Button>
          </div>
        }
      >
        <Radar {...config} />
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            dim1: 0,
            dim2: 0,
            dim3: 0,
            dim4: 0,
            dim5: 0,
            dim6: 0,
          }}
        >
          <Form.Item name="dim1" label="任务量">
            <Rate style={{ fontSize: 28 }} />
          </Form.Item>
          <Form.Item name="dim2" label="内容难度">
            <Rate style={{ fontSize: 28 }} />
          </Form.Item>
          <Form.Item name="dim3" label="上课质量">
            <Rate style={{ fontSize: 28 }} />
          </Form.Item>
          <Form.Item name="dim4" label="收获感">
            <Rate style={{ fontSize: 28 }} />
          </Form.Item>
          <Form.Item name="dim5" label="给分好坏">
            <Rate style={{ fontSize: 28 }} />
          </Form.Item>
          <Form.Item name="dim6" label="考试作业讲课相关度">
            <Rate style={{ fontSize: 28 }} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default CourseRating;
