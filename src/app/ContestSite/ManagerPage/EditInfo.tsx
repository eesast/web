import React, { useEffect } from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from "..";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;
const EditInfo: React.FC<ContestProps> = (props) => {
  const [form] = Form.useForm();
  const RangePicker: any = DatePicker.RangePicker;
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const {
    data: contestInfoData,
    error: contestInfoError,
    refetch: refetchContestInfoData,
  } = graphql.useGetContestInfoSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const initialValues = {
    fullname: contestInfoData?.contest_by_pk?.fullname || "",
    description: contestInfoData?.contest_by_pk?.description || "",
    time: [
      dayjs(contestInfoData?.contest_by_pk?.start_date, "YYYY-MM-DD"), // 加一天
      dayjs(contestInfoData?.contest_by_pk?.end_date, "YYYY-MM-DD"), // 加一天
    ],
  };

  const [UpdateContestInfo, { error: UpdateContestInfoError }] =
    graphql.useUpdateContestInfoMutation();

  const onFinish = async (record: any) => {
    const newinfo = {
      contest_id: Contest_id,
      fullname: record.fullname,
      description: record.description,
      start_date: record.time[0].format("YYYY-MM-DD"),
      end_date: record.time[1].format("YYYY-MM-DD"),
    };
    await UpdateContestInfo({
      variables: newinfo,
    });
    await refetchContestInfoData();
    if (!UpdateContestInfoError) {
      message.info("比赛信息已更新");
    }
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  });

  useEffect(() => {
    if (contestInfoError) {
      message.error("简介加载失败");
    }
  }, [contestInfoError]);

  useEffect(() => {
    if (UpdateContestInfoError) {
      message.error("简介更新失败");
    }
  }, [UpdateContestInfoError]);
  return (
    <Card
      hoverable
      style={{
        padding: "2vh 1vw",
      }}
    >
      <Title level={2} style={{ margin: `0 0 24px` }}>
        比赛信息编辑
      </Title>
      <Form form={form} name="contest" onFinish={onFinish} preserve={false}>
        <Form.Item
          name="fullname"
          label="名称"
          rules={[{ required: true, message: "请输入比赛名称" }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
          className="form-item-description"
          rules={[{ required: false, message: "请输入比赛描述" }]}
        >
          <Input.TextArea autoSize={{ minRows: 6, maxRows: 6 }} allowClear />
        </Form.Item>
        <Form.Item
          name="time"
          label="比赛时间"
          rules={[{ required: true, message: "请输入比赛时间" }]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditInfo;
