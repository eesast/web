import React from "react";
import { Col, Card, Row, Typography, Timeline } from "antd";
import dayjs from "dayjs";
import { ISchedule, ISchedulePeriod } from "../Interface";
import { PageProps } from "../../..";

interface ScheduleProps extends PageProps {
  schedule: ISchedule;
}

const ScheduleCard: React.FC<ScheduleProps> = ({ schedule, user }) => {
  const renderTimelineItem = (item: ISchedulePeriod) => {
    const isActive =
      dayjs(new Date()) >= dayjs(item.beg) &&
      dayjs(new Date()) <= dayjs(item.end);
    return (
      <Timeline.Item color={isActive ? "green" : "gray"}>
        <p>{item.prompt}</p>
        <br />
        <p>
          {dayjs(item.beg).format("YYYY-MM-DD")} ~{" "}
          {dayjs(item.end).format("YYYY-MM-DD")}
        </p>
      </Timeline.Item>
    );
  };

  return (
    <Card hoverable>
      <Row align="middle">
        <Col>
          <Typography.Title level={2} style={{ margin: "8px 8px 0 8px" }}>
            时间线
          </Typography.Title>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={1} />
        <Col>
          <Timeline>
            {schedule.A.roles?.includes(user.role) &&
              renderTimelineItem(schedule.A)}
            {schedule.B.roles?.includes(user.role) &&
              renderTimelineItem(schedule.B)}
            {schedule.C.roles?.includes(user.role) &&
              renderTimelineItem(schedule.C)}
            {schedule.D.roles?.includes(user.role) &&
              renderTimelineItem(schedule.D)}
            {schedule.E.roles?.includes(user.role) &&
              renderTimelineItem(schedule.E)}
          </Timeline>
        </Col>
      </Row>
    </Card>
  );
};

export default ScheduleCard;
