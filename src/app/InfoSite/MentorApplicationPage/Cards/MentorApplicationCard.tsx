import {
  Button,
  Col,
  Card,
  Row,
  List,
  Tooltip,
  Descriptions,
  Badge,
  Typography,
  Select,
  message,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  DownloadOutlined,
  CalendarTwoTone,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { IApplication, ISchedule } from "../Interface";
import dayjs from "dayjs";
import { downloadChatRecordHandler } from "../Handlers";
import DisplayApplicationModal from "../Modals/DisplayApplicationModal";
import axios from "axios";

const { Paragraph } = Typography;
const { confirm } = Modal;

interface MentorApplicationProps {
  applications: IApplication[];
  schedule: ISchedule;
  callback: () => Promise<void>;
}

const MentorApplicationCard: React.FC<MentorApplicationProps> = ({
  applications,
  schedule,
  callback,
}) => {
  const [hideReject, setHideReject] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [displayApplicationVisible, setDisplayApplicationVisible] =
    useState(false);
  const [selectedApplication, setSelectedApplication] = useState<
    IApplication | undefined
  >(undefined);
  const [disabledBySchedule, setDisabledBySchedule] = useState(false);

  useEffect(() => {
    setDisabledBySchedule(
      dayjs(new Date()) < dayjs(schedule.C.beg) ||
        dayjs(new Date()) > dayjs(schedule.D.end) ||
        (dayjs(new Date()) > dayjs(schedule.C.end) &&
          dayjs(new Date()) < dayjs(schedule.D.beg)),
    );
  }, [schedule]);

  const statusHandler = async (value: string, appl: IApplication) => {
    try {
      const res = await axios.post(`/application/info/mentor/status`, {
        id: appl.id,
        status: value,
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

  const confirmHandler = async (appl: IApplication) => {
    confirm({
      title: "确认谈话记录",
      icon: <ExclamationCircleOutlined />,
      content: "该操作不可撤销",
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        try {
          const res = await axios.post(`/application/info/mentor/confirm`, {
            id: appl.id,
          });
          if (res.status !== 200) {
            throw new Error();
          }
          await callback();
          message.success("确认成功");
        } catch (err) {
          message.error("确认失败");
        }
      },
    });
  };

  return (
    <Card>
      <Row>
        <Col style={{ width: "20%" }}>
          <Typography.Text>年份：</Typography.Text>
          <Select
            defaultValue={selectedYear}
            onChange={(value) => {
              setSelectedYear(value);
            }}
          >
            {Array.from(
              { length: new Date().getFullYear() - 2023 + 1 },
              (_, i) => 2023 + i,
            ).map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col style={{ width: "10%" }}>
          <Tooltip title={hideReject ? "显示未通过申请" : "隐藏未通过申请"}>
            <Button
              shape="circle"
              icon={hideReject ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              type="default"
              onClick={() => {
                setHideReject(!hideReject);
              }}
            />
          </Tooltip>
        </Col>
      </Row>

      <List
        dataSource={applications}
        renderItem={(item) => {
          if (item.status === "rejected" && hideReject) return null;
          if (item.year !== selectedYear) return null;
          return (
            <Descriptions
              key={item.id}
              bordered
              size="small"
              css={`
                margin: 24px auto;
              `}
            >
              <Descriptions.Item
                label="学生姓名"
                span={2}
                style={{ width: "25%" }}
              >
                {item.stu?.name ?? "暂无记录"}
              </Descriptions.Item>
              <Descriptions.Item
                label="学生班级"
                span={2}
                style={{ width: "25%" }}
              >
                {item.stu?.clss ?? "暂无记录"}
              </Descriptions.Item>
              <Descriptions.Item
                label="积极分子"
                span={2}
                style={{ width: "25%" }}
              >
                {item.is_mem ? "是" : "否"}
              </Descriptions.Item>
              <Descriptions.Item label="申请时间" span={2}>
                {dayjs(item.created).format("YYYY-MM-DD HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item
                label="申请陈述"
                span={4}
                style={{ width: "25%" }}
              >
                <Paragraph
                  ellipsis={{ rows: 2, expandable: true, symbol: "展开" }}
                >
                  {item.stmt}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item
                label="联系方式"
                span={2}
                style={{ width: "25%" }}
              >
                <Button
                  onClick={() => {
                    setSelectedApplication(item);
                    setDisplayApplicationVisible(true);
                  }}
                >
                  点击查看
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="申请状态" span={2}>
                {disabledBySchedule ||
                item.year !== new Date().getFullYear() ? (
                  item.status === "approved" ? (
                    <Badge status={"success"} text={"已通过"} />
                  ) : item.status === "rejected" ? (
                    <Badge status={"error"} text={"未通过"} />
                  ) : (
                    <Badge status={"processing"} text={"待处理"} />
                  )
                ) : (
                  <Select
                    value={item.status}
                    onChange={async (value) => {
                      await statusHandler(value, item);
                    }}
                  >
                    <Select.Option key={"approved"} value={"approved"}>
                      <Badge status={"success"} text={"已通过"} />
                    </Select.Option>
                    <Select.Option key={"rejected"} value={"rejected"}>
                      <Badge status={"error"} text={"未通过"} />
                    </Select.Option>
                    <Select.Option key={"submitted"} value={"submitted"}>
                      <Badge status={"processing"} text={"待处理"} />
                    </Select.Option>
                  </Select>
                )}
              </Descriptions.Item>
              {item.status === "approved" && (
                <Descriptions.Item label="谈话记录" span={4}>
                  <Row align="middle">
                    <Col style={{ width: "18%" }}>
                      {item.chat ? (
                        <Badge status="success" text="已提交" />
                      ) : (
                        <Badge status="processing" text="未提交" />
                      )}
                    </Col>
                    <Col style={{ width: "18%" }}>
                      {item.chat2 ? (
                        <Badge status="success" text="已确认" />
                      ) : (
                        <Badge status="processing" text="未确认" />
                      )}
                    </Col>
                    {item.chat_t && (
                      <Col style={{ width: "24%" }}>
                        <CalendarTwoTone />
                        {" " + dayjs(item.chat_t).format("YYYY-MM-DD")}
                      </Col>
                    )}
                    <Col style={{ width: "20%" }}>
                      <Button
                        icon={<DownloadOutlined />}
                        onClick={() => downloadChatRecordHandler(item.id)}
                        disabled={!item.chat}
                      >
                        下载
                      </Button>
                    </Col>
                    {!item.chat2 && (
                      <Col style={{ width: "20%" }}>
                        <Button
                          icon={<CheckCircleOutlined />}
                          onClick={() => confirmHandler(item)}
                          disabled={!item.chat}
                        >
                          确认
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Descriptions.Item>
              )}
            </Descriptions>
          );
        }}
      />

      {selectedApplication && (
        <DisplayApplicationModal
          visible={displayApplicationVisible}
          setVisible={setDisplayApplicationVisible}
          appl={selectedApplication}
          detail={false}
        />
      )}
    </Card>
  );
};

export default MentorApplicationCard;
