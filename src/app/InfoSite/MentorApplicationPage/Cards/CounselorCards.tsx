import React, { useState } from "react";
import {
  Button,
  Col,
  Card,
  Row,
  Typography,
  Timeline,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { ISchedule, IApplication } from "../Interface";
import { exportApplicationHandler } from "../Handlers";
import ImportFreshmanModal from "../Modals/ImportFreshmanModal";
import ImportMentorModal from "../Modals/ImportMentorModal";
import { Dayjs } from "dayjs";
import axios from "axios";

interface CounselorProps {
  schedule: ISchedule;
  applications: IApplication[];
  callback: () => Promise<void>;
}

const CounselorCards: React.FC<CounselorProps> = ({
  schedule,
  applications,
  callback,
}) => {
  const [importFreshmanVisible, setImportFreshmanVisible] = useState(false);
  const [importFreshmanLoading, setImportFreshmanLoading] = useState(false);
  const [importMentorVisible, setImportMentorVisible] = useState(false);
  const [importMentorLoading, setImportMentorLoading] = useState(false);

  const [exportApplicationLoading, setExportApplicationLoading] =
    useState(false);

  const handler = async (
    date: [Dayjs | null, Dayjs | null] | null,
    scheduleKey: keyof ISchedule,
  ) => {
    try {
      if (!date || !date[0] || !date[1]) return;
      const new_schedule: ISchedule = {
        ...schedule,
        [scheduleKey]: {
          ...schedule[scheduleKey],
          beg: date[0].toDate(),
          end: date[1].toDate(),
        },
      };
      const res = await axios.post(`/application/info/mentor/schedule`, {
        schedule: new_schedule,
      });
      if (res.status !== 200) {
        throw new Error();
      }
      await callback();
      message.info("更新成功");
    } catch (err) {
      message.error("更新失败");
    }
  };

  const renderTimelineItem = (scheduleKey: keyof ISchedule) => {
    const item = schedule[scheduleKey];
    return (
      <Timeline.Item color="#027dcd">
        <Typography.Text>{item.prompt}</Typography.Text>
        <br />
        <br />
        <DatePicker.RangePicker
          defaultValue={[dayjs(item.beg), dayjs(item.end)]}
          onChange={(date) => handler(date, scheduleKey)}
        />
        <br />
        <br />
      </Timeline.Item>
    );
  };

  return (
    <Row>
      <Col style={{ width: "47.5%" }}>
        <Card hoverable>
          <Typography.Title level={2} style={{ marginTop: "1%" }}>
            操作
          </Typography.Title>

          <Row style={{ marginTop: "5%" }}>
            <Col style={{ width: "100%" }}>
              <Button
                onClick={() => setImportFreshmanVisible(true)}
                loading={importFreshmanLoading}
                block
              >
                导入新生信息
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "5%" }}>
            <Col style={{ width: "100%" }}>
              <Button
                onClick={() => setImportMentorVisible(true)}
                loading={importMentorLoading}
                block
              >
                导入导师信息
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "5%" }}>
            <Col style={{ width: "100%" }}>
              <Button
                onClick={async () => {
                  await exportApplicationHandler(
                    applications,
                    setExportApplicationLoading,
                  );
                }}
                loading={exportApplicationLoading}
                block
              >
                导出申请
              </Button>
            </Col>
          </Row>

          {/* <Col span={16}>
                <Tooltip title="点击刷新">
                  <Button
                    onClick={async () => {
                      await refetchFreshmanInfoList({
                        year: selectedYear,
                      });
                    }}
                    block
                  >
                    {"匹配人数: "}
                    {freshmanInfoListData && unmatchedFreshmanList
                      ? freshmanInfoListData.freshman.length -
                      unmatchedFreshmanList.length
                      : NaN}
                    /{freshmanInfoListData?.freshman.length ?? NaN}
                  </Button>
                </Tooltip>
              </Col> */}

          {/* <Col span={8}>
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      title: "确认进行系统随机分配？",
                      content: "此操作不可撤销",
                      okText: "确认",
                      cancelText: "取消",

                      onOk: async () => {
                        setRandomAttributing(true);
                        await handleAttribute(setRandomAttributing);
                      },
                    });
                  }}
                  loading={randomAttributing}
                  block
                >
                  随机分配
                </Button>
              </Col> */}
        </Card>
      </Col>
      <Col style={{ width: "47.5%", marginLeft: "5%" }}>
        <Card hoverable>
          <Typography.Title level={2} style={{ marginTop: "1%" }}>
            管理时间
          </Typography.Title>
          <Row style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Col style={{ width: "100%" }}>
              <Timeline>
                {renderTimelineItem("A")}
                {renderTimelineItem("B")}
                {renderTimelineItem("C")}
                {renderTimelineItem("D")}
                {renderTimelineItem("E")}
              </Timeline>
            </Col>
          </Row>
        </Card>
      </Col>
      <ImportFreshmanModal
        visible={importFreshmanVisible}
        setVisible={setImportFreshmanVisible}
        loading={importFreshmanLoading}
        setLoading={setImportFreshmanLoading}
        callback={callback}
      />
      <ImportMentorModal
        visible={importMentorVisible}
        setVisible={setImportMentorVisible}
        loading={importMentorLoading}
        setLoading={setImportMentorLoading}
        callback={callback}
      />
    </Row>
  );
};

export default CounselorCards;
