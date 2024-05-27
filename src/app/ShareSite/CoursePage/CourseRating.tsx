import React, { useState, useRef, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Drawer,
  Form,
  message,
  Rate,
  Space,
  Spin,
  Typography,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { CourseProps } from ".";
import * as graphql from "@/generated/graphql";
import { Chart } from "@antv/g2";

const CourseRating: React.FC<CourseProps> = ({
  course_uuid,
  mode,
  user,
}: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [form] = Form.useForm();
  const chartRadarRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const { data: courseRatingData, refetch: refetchCourseRating } =
    graphql.useGetCourseRatingOneQuery({
      variables: {
        course_uuid: course_uuid,
        user_uuid: user.uuid,
      },
    });

  const { data: courseRatingTotal, refetch: refetchCourseRatingTotal } =
    graphql.useGetCourseRatingQuery({
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
    setLoading(true);
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
      refetchCourseRatingTotal();
    } catch (error) {
      message.error("保存评分失败");
      console.log(error);
    }
  };

  const taskAmountDesc = ["大", "较大", "适中", "较小", "小"];
  const contentDifficultyDesc = ["难", "较难", "适中", "较易", "易"];
  const courseQualityDesc = ["差", "较差", "一般", "较好", "好"];
  const harvestDesc = ["小", "较小", "适中", "较大", "大"];
  const scoreDesc = ["差", "较差", "一般", "较好", "好"];
  const relevanceDesc = ["低", "较低", "一般", "较高", "高"];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!chartRadarRef.current) return;
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
        item: "考试作业讲课相关度",
        score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim6,
      },
      {
        item: "收获感",
        score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim4,
      },
      {
        item: "给分好坏",
        score: courseRatingTotal?.course_rating_aggregate?.aggregate?.avg?.dim5,
      },
    ];

    const chart = new Chart({
      container: chartRadarRef.current,
      autoFit: true,
    });

    chart.options({
      type: "view",
      autoFit: true,
      data: radarData,
      scale: {
        x: { padding: 0.5, align: 0 },
        y: { tickCount: 1, domainMin: 0, domainMax: 5 },
      },
      coordinate: { type: "polar" },
      axis: {
        x: {
          grid: true,
          gridLineWidth: 2,
          gridSroke: mode === "dark" ? "white" : "black",
          tick: false,
          gridLineDash: [0, 0],
          labelFontSize: 16,
          labelFill: mode === "dark" ? "white" : "black",
          labelAlign: "horizontal",
          labelFontWeight: "bold",
          labelSpacing: 15,
        },
        y: {
          zIndex: 1,
          title: false,
          gridLineWidth: 2,
          gridSroke: mode === "dark" ? "white" : "black",
          labelFill: mode === "dark" ? "white" : "black",
          labelFontSize: 15,
          gridLineDash: [0, 0],
        },
      },
      interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
      children: [
        {
          type: "area",
          encode: { x: "item", y: "score", color: "#4083FE" },
          style: { fillOpacity: 0.5 },
        },
        {
          type: "line",
          encode: { x: "item", y: "score", color: "#4083FE" },
          style: { lineWidth: 2 },
        },
        {
          type: "point",
          encode: {
            x: "item",
            y: "score",
            color: "#4184FE",
            shape: "point",
            size: 3,
          },
          tooltip: null,
        },
      ],
    });

    chart.render();

    setLoading(false);
    return () => {
      chart.destroy();
    };
  });

  return (
    <>
      <Badge
        count={courseRatingTotal?.course_rating_aggregate.aggregate?.count}
      >
        <Button
          type="primary"
          onClick={showDrawer}
          style={{
            marginLeft: "30px",
          }}
        >
          评分
        </Button>
      </Badge>
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "26px" }}>课程评分</span>
            <Space>
              <Button
                size="large"
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
        width={600}
        onClose={closeDrawer}
        open={openDrawer}
        key="course_rating"
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              size="large"
              onClick={closeDrawer}
              style={{ width: 80, height: 40, marginRight: 12 }}
            >
              取消
            </Button>
            <Button
              onClick={handleSaveRating}
              style={{ width: 80, height: 40, marginRight: 12 }}
              type="primary"
            >
              保存
            </Button>
          </div>
        }
      >
        <Card
          hoverable
          title={
            <span style={{ fontSize: "23px", fontWeight: "bold" }}>
              评分说明
            </span>
          }
          style={{
            padding: "15px",
          }}
        >
          <Typography.Text>
            <span style={{ fontSize: "18px", lineHeight: 1.8 }}>
              1.
              评分目的：课程评分旨在帮助同学们更好地了解课程情况，为选课提供参考，希望同学根据自身上课体验认真评分
              <br />
              <br />
              2.
              任务量和内容难度：星级越高表示任务量越小、内容难度越低，主要是为了反映任务量的多少和难度的高低，但
              <span style={{ fontWeight: "bold" }}>并非星级越高越合适</span>
              ，同学可以根据自身需求进行评判
              <br />
            </span>
          </Typography.Text>
        </Card>
        <br />
        <Card
          hoverable
          title={
            <span style={{ fontSize: "23px", fontWeight: "bold" }}>
              平均评分
            </span>
          }
          style={{
            padding: "15px",
          }}
        >
          <Spin spinning={loading}>
            <div
              ref={chartRadarRef}
              style={{ width: "100%", height: "36vh" }}
            />
          </Spin>
          <div style={{ textAlign: "center", fontSize: "18px" }}>
            已有
            <span style={{ color: "red", fontWeight: "bold" }}>
              {courseRatingTotal?.course_rating_aggregate.aggregate?.count}
            </span>
            人完成评分
          </div>
        </Card>
        <br />
        <Card
          hoverable
          title={
            <span style={{ fontSize: "23px", fontWeight: "bold" }}>
              我的评分
            </span>
          }
          style={{
            padding: "15px",
          }}
        >
          <Form
            layout="inline"
            labelAlign="left"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 22 }}
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
            <Form.Item
              name="dim1"
              label={
                <span style={{ fontSize: "18px", paddingLeft: "108px" }}>
                  任务量
                </span>
              }
              style={{ marginBottom: "18px" }}
            >
              <Rate tooltips={taskAmountDesc} style={{ fontSize: 35 }} />
            </Form.Item>
            <Form.Item
              name="dim2"
              label={
                <span style={{ fontSize: "18px", paddingLeft: "90px" }}>
                  内容难度
                </span>
              }
              style={{ marginBottom: "18px" }}
            >
              <Rate tooltips={contentDifficultyDesc} style={{ fontSize: 35 }} />
            </Form.Item>
            <Form.Item
              name="dim3"
              label={
                <span style={{ fontSize: "18px", paddingLeft: "90px" }}>
                  上课质量
                </span>
              }
              style={{ marginBottom: "18px" }}
            >
              <Rate tooltips={courseQualityDesc} style={{ fontSize: 35 }} />
            </Form.Item>
            <Form.Item
              name="dim4"
              label={
                <span style={{ fontSize: "18px", paddingLeft: "108px" }}>
                  收获感
                </span>
              }
              style={{ marginBottom: "18px" }}
            >
              <Rate tooltips={harvestDesc} style={{ fontSize: 35 }} />
            </Form.Item>
            <Form.Item
              name="dim5"
              label={
                <span style={{ fontSize: "18px", paddingLeft: "90px" }}>
                  给分好坏
                </span>
              }
              style={{ marginBottom: "18px" }}
            >
              <Rate tooltips={scoreDesc} style={{ fontSize: 35 }} />
            </Form.Item>
            <Form.Item
              name="dim6"
              label={
                <span style={{ fontSize: "18px", paddingLeft: "0px" }}>
                  考试作业讲课相关度
                </span>
              }
              style={{ marginBottom: "18px" }}
            >
              <Rate tooltips={relevanceDesc} style={{ fontSize: 35 }} />
            </Form.Item>
          </Form>
        </Card>
      </Drawer>
    </>
  );
};

export default CourseRating;
