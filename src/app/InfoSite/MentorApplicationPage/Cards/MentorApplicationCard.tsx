import {
  Button,
  Col,
  Card,
  Row,
  List,
  Tooltip,
  Descriptions,
  Badge,
} from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { IApplication } from "../Interface";
import dayjs from "dayjs";
import { downloadChatRecordHandler } from "../Handlers";
import DisplayApplicationModal from "../Modals/DisplayApplicationModal";

interface MentorApplicationProps {
  applications: IApplication[]; // 导师被申请的列表
  callback: () => Promise<void>;
}

const MentorApplicationCard: React.FC<MentorApplicationProps> = ({
  applications,
  callback,
}) => {
  const [hideReject, setHideReject] = useState(false);
  const [displayApplicationVisible, setDisplayApplicationVisible] =
    useState(false);
  const [selectApplication, setSelectApplication] = useState<
    IApplication | undefined
  >(undefined);

  return (
    <Card>
      <Row>
        <Col span={4}>
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
          return (
            <Descriptions
              key={item.id}
              bordered
              size="small"
              css={`
                margin: 24px auto;
              `}
            >
              <Descriptions.Item label="学生姓名" span={2}>
                {item.stu?.name ?? "暂无记录"}
              </Descriptions.Item>
              <Descriptions.Item label="申请时间" span={2}>
                {dayjs(item.created).format("YYYY-MM-DD HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="学生院系" span={2}>
                {item.stu?.dept ?? "暂无记录"}
              </Descriptions.Item>
              <Descriptions.Item label="申请状态" span={2}>
                {item.status === "approved" ? (
                  <Badge status="success" text="已通过" />
                ) : item.status === "rejected" ? (
                  <Badge status="error" text="未通过" />
                ) : (
                  <Badge status="processing" text="待处理" />
                )}
              </Descriptions.Item>
              {item.status === "approved" && (
                <Descriptions.Item label="谈话记录" span={2}>
                  {!item.chat ? (
                    <Badge status="processing" text="未提交" />
                  ) : (
                    <Row align="middle">
                      <Col span={8}>
                        <Badge status="success" text="已提交" />
                      </Col>
                      <Col span={3}></Col>
                      <Col span={8}>
                        <Button
                          onClick={async () =>
                            await downloadChatRecordHandler(item.id)
                          }
                        >
                          下载
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="详细信息" span={2}>
                <Button
                  onClick={() => {
                    setSelectApplication(item);
                    setDisplayApplicationVisible(true);
                  }}
                >
                  查看详细信息
                </Button>
              </Descriptions.Item>
            </Descriptions>
          );
        }}
      />

      {selectApplication && (
        <DisplayApplicationModal
          visible={displayApplicationVisible}
          setVisible={setDisplayApplicationVisible}
          appl={selectApplication}
          callback={callback}
        />
      )}
    </Card>
  );
};

export default MentorApplicationCard;
