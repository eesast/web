import { PageProps } from "../..";
import { Space, message, Row, Col } from "antd";
import MentorInfoCard from "./Cards/MentorInfoCard";
import MentorApplicationCard from "./Cards/MentorApplicationCard";
import MentorListCard from "./Cards/MentorListCard";
import ScheduleCard from "./Cards/ScheduleCard";
import MentorMemberChatCard from "./Cards/MentorMemberChatCard";
import { useEffect, useState } from "react";
import {
  IMentor,
  IApplication,
  IMemberChatRecord,
  ISchedule,
} from "./Interface";
import axios from "axios";

const MentorApplicationMentor: React.FC<PageProps> = ({ mode, user }) => {
  const [mentor, setMentor] = useState<IMentor | undefined>(undefined); // 导师本人
  const [applications, setApplications] = useState<IApplication[]>([]); // 本导师的被申请列表
  const [mentors, setMentors] = useState<IMentor[]>([]); // 所有导师列表
  const [schedule, setSchedule] = useState<ISchedule | undefined>(undefined); // 申请时间表
  const [memberChatRecords, setMemberChatRecords] = useState<
    IMemberChatRecord[]
  >([]);
  const [currentSemester, setCurrentSemester] = useState<string | null>(null);

  const fetchMentor = async () => {
    try {
      const res = await axios.get(`/application/info/mentor/mentor`);
      if (res.status !== 200) {
        throw new Error();
      }
      setMentor(res.data);
    } catch (err) {
      message.error("信息获取失败");
    }
  };

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

  const fetchMemberChatData = async () => {
    try {
      const [recordsRes, semesterRes] = await Promise.all([
        axios.get(`/application/info/mentor/my_students_member_chats`),
        axios.get(`/application/semester`),
      ]);
      if (recordsRes.status === 200) setMemberChatRecords(recordsRes.data);
      if (semesterRes.status === 200) setCurrentSemester(semesterRes.data);
    } catch {
      // 非关键数据，静默失败
    }
  };

  const updateStatusCallback = async () => {
    await fetchApplications();
    await fetchMentors();
    await fetchMemberChatData();
  };

  const updateInfoCallback = async () => {
    await fetchMentor();
    await fetchMentors();
  };

  useEffect(() => {
    fetchMentor();
    fetchApplications();
    fetchMentors();
    fetchSchedule();
    fetchMemberChatData();
  }, []);

  return (
    <Space
      direction="vertical"
      css={`
        width: 100%;
      `}
    >
      <Row>
        <Col style={{ width: "65%" }}>
          <Row>
            <Col style={{ width: "100%" }}>
              {mentor && (
                <MentorInfoCard mentor={mentor} callback={updateInfoCallback} />
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "5%" }}>
            <Col style={{ width: "100%" }}>
              {schedule && (
                <MentorApplicationCard
                  applications={applications}
                  schedule={schedule}
                  memberChatRecords={memberChatRecords}
                  currentSemester={currentSemester}
                  callback={updateStatusCallback}
                />
              )}
            </Col>
          </Row>
          {mentor?.is_mem && (
            <Row style={{ marginTop: "5%" }}>
              <Col style={{ width: "100%" }}>
                <MentorMemberChatCard currentSemester={currentSemester} />
              </Col>
            </Row>
          )}
        </Col>
        <Col style={{ width: "30%", marginLeft: "5%" }}>
          {schedule && (
            <ScheduleCard schedule={schedule} user={user} mode={mode} />
          )}
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

export default MentorApplicationMentor;
