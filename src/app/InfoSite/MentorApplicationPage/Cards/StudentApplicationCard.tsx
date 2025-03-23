import {
  Button,
  Col,
  Card,
  Row,
  List,
  Descriptions,
  Badge,
  Typography,
  Upload,
  message,
  Modal,
  Form,
} from "antd";
import { CalendarTwoTone } from "@ant-design/icons";
import { IApplication, IMentor } from "../Interface";
import dayjs from "dayjs";
import {
  downloadChatRecordHandler,
  uploadChatRecordHandler,
} from "../Handlers";
import {
  UploadOutlined,
  DownloadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import EditApplicationModal from "../Modals/EditApplicationModal";
import { useState } from "react";
import axios from "axios";

const { Paragraph } = Typography;

interface StudentApplicationProps {
  applications: IApplication[]; // 学生已申请的列表
  callback: () => Promise<void>;
}

const StudentApplicationCard: React.FC<StudentApplicationProps> = ({
  applications,
  callback,
}) => {
  const [editApplicationModalVisible, setEditApplicationModalVisible] =
    useState(false);
  const [selectMentor, setSelectMentor] = useState<IMentor | undefined>(
    undefined,
  );
  const [form] = Form.useForm();

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
                      >
                        编辑
                      </Button>
                    </Col>
                    <Col style={{ width: "20%" }}>
                      <Button
                        danger
                        disabled={item.status === "approved"}
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
              {item.status === "approved" && (
                <Descriptions.Item
                  label="谈话记录"
                  span={4}
                  style={{ width: "25%" }}
                >
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
                    {!item.chat2 && (
                      <Col style={{ width: "20%" }}>
                        <Upload
                          customRequest={async (e) => {
                            await uploadChatRecordHandler(e, item.id, callback);
                          }}
                          onChange={(info) => {
                            if (info.file.status === "done") {
                              message.success(`${info.file.name} 上传成功`);
                            } else if (info.file.status === "error") {
                              message.error(`${info.file.name} 上传失败`);
                            }
                          }}
                          showUploadList={false}
                        >
                          <Button icon={<UploadOutlined />}>提交</Button>
                        </Upload>
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
                  </Row>
                </Descriptions.Item>
              )}
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
          form={form}
          callback={callback}
        />
      )}
    </Card>
  );
};

export default StudentApplicationCard;
