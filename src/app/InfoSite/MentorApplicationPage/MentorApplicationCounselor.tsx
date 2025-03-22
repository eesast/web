import { PageProps } from "../..";
import { Space, message, Row, Col } from "antd";
import MentorListCard from "./Cards/MentorListCard";
import CounselorCards from "./Cards/CounselorCards";
import FreshmanCards from "./Cards/FreshmanCards";
import { useState, useEffect } from "react";
import { IMentor, IApplication, ISchedule, IFreshman } from "./Interface";
import axios from "axios";

const MentorApplicationStudent: React.FC<PageProps> = ({ mode, user }) => {
  const [applications, setApplications] = useState<IApplication[]>([]); // 所有申请
  const [mentors, setMentors] = useState<IMentor[]>([]); // 所有导师列表
  const [schedule, setSchedule] = useState<ISchedule | undefined>(undefined); // 申请时间表
  const [freshmen, setFreshmen] = useState<IFreshman[]>([]); // 所有新生列表

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`/application/info/mentor/applications`);
      if (res.status !== 200) {
        throw new Error();
      }
      setApplications(res.data);
    } catch (err) {
      message.error("信息获取失败");
    }
  };

  const fetchMentors = async () => {
    try {
      const res = await axios.get(`/application/info/mentor/mentor_list`);
      if (res.status !== 200) {
        throw new Error();
      }
      setMentors(res.data);
    } catch (err) {
      message.error("信息获取失败");
    }
  };

  const fetchSchedule = async () => {
    try {
      const res = await axios.get(`/application/info/mentor/schedule`);
      if (res.status !== 200) {
        throw new Error();
      }
      setSchedule(res.data);
    } catch (err) {
      message.error("信息获取失败");
    }
  };

  const fetchFreshmen = async () => {
    try {
      const res = await axios.get(`/application/info/mentor/freshmen`);
      if (res.status !== 200) {
        throw new Error();
      }
      setFreshmen(res.data);
    } catch (err) {
      message.error("信息获取失败");
    }
  };

  const updateScheduleCallback = async () => {
    await fetchSchedule();
    await fetchMentors();
    await fetchFreshmen();
  };

  useEffect(() => {
    fetchApplications();
    fetchMentors();
    fetchSchedule();
    fetchFreshmen();
  }, []);

  return (
    <Space
      direction="vertical"
      css={`
        width: 100%;
      `}
    >
      <Row>
        <Col style={{ width: "100%" }}>
          {schedule && (
            <CounselorCards
              schedule={schedule}
              applications={applications}
              callback={updateScheduleCallback}
            />
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "5%" }}>
        <Col style={{ width: "100%" }}>
          <FreshmanCards freshmen={freshmen} applications={applications} />
        </Col>
      </Row>
      <Row style={{ marginTop: "5%" }}>
        <Col style={{ width: "100%" }}>
          {schedule && (
            <MentorListCard
              applications={[]}
              mentors={mentors}
              schedule={schedule}
              freshmen={[]}
              callback={() => Promise.resolve()}
              user={user}
              mode={mode}
            />
          )}
        </Col>
      </Row>
    </Space>
  );
};

export default MentorApplicationStudent;
