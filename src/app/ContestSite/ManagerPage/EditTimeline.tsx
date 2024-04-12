import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Typography,
  message,
  theme,
} from "antd";
import dayjs from "dayjs";
import { CaretRightOutlined } from "@ant-design/icons";
import { ContestProps } from "..";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;
const RangePicker: any = DatePicker.RangePicker;

const EditTimeline: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const {
    data: contestTimesData,
    error: getContestTimesError,
    refetch: refetchContestTimes,
  } = graphql.useGetContestTimesSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });
  useEffect(() => {
    if (getContestTimesError) {
      message.error("比赛加载失败");
    }
  }, [getContestTimesError]);

  const [addContestTime, { error: addContestTimeError }] =
    graphql.useAddContestTimeMutation();
  useEffect(() => {
    if (addContestTimeError) {
      message.error("添加事件失败");
    }
  }, [addContestTimeError]);

  const handleAdd = async () => {
    try {
      const values = await addEventForm.validateFields();
      await addContestTime({
        variables: {
          contest_id: Contest_id,
          event: values.event,
          start: values.time[0].format("YYYY-MM-DD"),
          end: values.time[1].format("YYYY-MM-DD"),
        },
      });
      if (addContestTimeError) throw new Error(addContestTimeError.message);
      message.success("事件添加成功");
      refetchContestTimes();
      setIsModalVisible(false);
      addEventForm.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [addEventForm] = Form.useForm();

  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const players = contestTimesData?.contest_time.map((item) => ({
    key: item.event,
    label: item.event,
    style: panelStyle,
    children: (
      <>
        时间：{dayjs(item.start).format("YYYY-MM-DD")} -{" "}
        {dayjs(item.end).format("YYYY-MM-DD")}
        <br />
        描述：{item.description}
      </>
    ),
  }));

  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          时间线编辑
        </Title>
        <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={players}
        />
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "36px",
          }}
        >
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            添加新事件
          </Button>
        </Row>
      </Card>
      <Modal
        open={isModalVisible}
        title="添加新事件"
        centered
        onCancel={() => {
          setIsModalVisible(false);
          addEventForm.resetFields();
        }}
        onOk={handleAdd}
        destroyOnClose
      >
        <Form form={addEventForm} name="addMap" preserve={false}>
          <Form.Item
            name="event"
            label="事件名称"
            rules={[{ required: true, message: "请输入事件名称" }]}
          >
            <Input allowClear placeholder="例：复赛" />
          </Form.Item>
          <Form.Item
            name="time"
            label="起止时间"
            rules={[{ required: true, message: "请选择时间" }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item name="description" label="事件描述（或推送链接）">
            <Input allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default EditTimeline;
