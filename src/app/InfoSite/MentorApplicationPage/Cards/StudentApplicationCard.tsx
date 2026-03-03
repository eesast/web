import {
  Button,
  Col,
  Card,
  Row,
  List,
  Descriptions,
  Badge,
  Typography,
  message,
  Modal,
  Form,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { IApplication, IFreshman, IMentor, ISchedule } from "../Interface";
import dayjs from "dayjs";
import EditApplicationModal from "../Modals/EditApplicationModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { PageProps } from "../../..";

const { Paragraph } = Typography;

interface StudentApplicationProps extends PageProps {
  applications: IApplication[]; // 学生已申请的列表
  schedule: ISchedule;
  freshmen: IFreshman[];
  callback: () => Promise<void>;
}

const StudentApplicationCard: React.FC<StudentApplicationProps> = ({
  applications,
  schedule,
  freshmen,
  callback,
  user,
  mode,
}) => {
  const [editApplicationModalVisible, setEditApplicationModalVisible] =
    useState(false);
  const [selectMentor, setSelectMentor] = useState<IMentor | undefined>(
    undefined,
  );
  const [disabledBySchedule, setDisabledBySchedule] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setDisabledBySchedule(
      dayjs(new Date()) < dayjs(schedule.C.beg) ||
        dayjs(new Date()) > dayjs(schedule.D.end) ||
        (dayjs(new Date()) > dayjs(schedule.C.end) &&
          dayjs(new Date()) < dayjs(schedule.D.beg)),
    );
  }, [schedule]);

  const handler = async (id: string) => {
    try {
      const res = await axios.post(`/application/info/mentor/delete`, {
        id: id,
      });
      if (res.status !== 200) {
        throw new Error();
      }
      await callback();
      message.info(`删除成功`);
    } catch (err) {
      message.error(`删除失败`);
    }
  };

  return (
    <Card>
      <Typography.Title level={2} style={{ marginTop: "1%" }}>
        已申请
      </Typography.Title>
      <List
        dataSource={applications}
        renderItem={(item) => {
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
                label="导师姓名"
                span={2}
                style={{ width: "25%" }}
              >
                {item.men?.name ?? "暂无记录"}
              </Descriptions.Item>
              <Descriptions.Item
                label="导师院系"
                span={2}
                style={{ width: "25%" }}
              >
                {item.men?.dept ?? "暂无记录"}
              </Descriptions.Item>
              <Descriptions.Item
                label="积极分子"
                span={2}
                style={{ width: "25%" }}
              >
                {item.is_mem ? "是" : "否"}
              </Descriptions.Item>
              <Descriptions.Item
                label="申请时间"
                span={2}
                style={{ width: "25%" }}
              >
                {dayjs(item.created).format("YYYY-MM-DD HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item
                label="申请陈述"
                span={4}
                style={{ width: "25%" }}
              >
                <Row>
                  <Paragraph
                    ellipsis={{ rows: 2, expandable: true, symbol: "展开" }}
                  >
                    {item.stmt}
                  </Paragraph>
                </Row>
                {item.status !== "approved" && (
                  <Row style={{ marginTop: "5%" }}>
                    <Col style={{ width: "20%" }}>
                      <Button
                        onClick={() => {
                          setSelectMentor(item.men);
                          form.setFieldsValue(item);
                          setEditApplicationModalVisible(true);
                        }}
                        disabled={
                          disabledBySchedule ||
                          item.year !== new Date().getFullYear()
                        }
                      >
                        编辑
                      </Button>
                    </Col>
                    <Col style={{ width: "20%" }}>
                      <Button
                        danger
                        onClick={() => {
                          Modal.confirm({
                            centered: true,
                            title: "确认删除申请？",
                            icon: <ExclamationCircleFilled />,
                            content: "删除后可重新申请",
                            okText: "确认",
                            okType: "danger",
                            cancelText: "取消",
                            onOk: async () => {
                              await handler(item.id);
                            },
                          });
                        }}
                        disabled={
                          disabledBySchedule ||
                          item.year !== new Date().getFullYear()
                        }
                      >
                        删除
                      </Button>
                    </Col>
                  </Row>
                )}
              </Descriptions.Item>
              <Descriptions.Item
                label="联系方式"
                span={2}
                style={{ width: "25%" }}
              >
                {item.men?.mail}
              </Descriptions.Item>
              <Descriptions.Item
                label="申请状态"
                span={2}
                style={{ width: "25%" }}
              >
                {item.status === "approved" ? (
                  <Badge status="success" text="已通过" />
                ) : item.status === "rejected" ? (
                  <Badge status="error" text="未通过" />
                ) : (
                  <Badge status="processing" text="待处理" />
                )}
              </Descriptions.Item>
            </Descriptions>
          );
        }}
      />
      {selectMentor && (
        <EditApplicationModal
          visible={editApplicationModalVisible}
          setVisible={setEditApplicationModalVisible}
          cur_appls={applications}
          mentor={selectMentor}
          freshmen={freshmen}
          form={form}
          callback={callback}
          user={user}
          mode={mode}
        />
      )}
    </Card>
  );
};

export default StudentApplicationCard;
