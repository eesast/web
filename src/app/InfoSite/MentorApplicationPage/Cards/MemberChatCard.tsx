import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Typography,
  Table,
  Tag,
  Badge,
  Button,
  Space,
  Upload,
  message,
  Row,
  Col,
} from "antd";
import type { TableProps } from "antd/lib/table";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { IMemberChatRecord } from "../Interface";
import {
  uploadNewMemberChatHandler,
  downloadNewMemberChatHandler,
} from "../Handlers";
import { PageProps } from "../../..";

const { Title, Text } = Typography;

interface MemberChatCardProps extends PageProps {}

interface MemberChatData {
  is_member: boolean;
  current_semester: string | null;
  records: IMemberChatRecord[];
}

const MemberChatCard: React.FC<MemberChatCardProps> = ({ user }) => {
  const [data, setData] = useState<MemberChatData>({
    is_member: false,
    current_semester: null,
    records: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/application/info/mentor/my_member_chats");
      if (res.status !== 200) throw new Error();
      setData(res.data);
    } catch {
      message.error("积极分子谈话记录获取失败");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const canSubmit = (record: IMemberChatRecord) => {
    return (
      !record.member_chat_confirm &&
      data.current_semester !== null &&
      record.semester === data.current_semester
    );
  };

  const canSubmitNew = () => {
    // 当前学期没有任何记录时，可以初次提交
    if (!data.current_semester) return false;
    const existsForCurrent = data.records.some(
      (r) => r.semester === data.current_semester,
    );
    return !existsForCurrent;
  };

  const columns: TableProps<IMemberChatRecord>["columns"] = [
    {
      title: "学期",
      dataIndex: "semester",
      key: "semester",
      render: (val: string) => (
        <Space>
          <Text strong>{val}</Text>
          {val === data.current_semester && <Tag color="blue">当前</Tag>}
        </Space>
      ),
    },
    {
      title: "提交时间",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a, b) =>
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      defaultSortOrder: "descend",
      render: (val: string) => dayjs(val).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "状态",
      dataIndex: "member_chat_confirm",
      key: "status",
      render: (confirmed: boolean) =>
        confirmed ? (
          <Badge status="success" text="已确认" />
        ) : (
          <Badge status="processing" text="待确认" />
        ),
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: IMemberChatRecord) => (
        <Space>
          {/* 重新提交（覆盖上传）：仅当前学期且未确认 */}
          <Upload
            customRequest={(e) => {
              uploadNewMemberChatHandler(
                e,
                user.uuid,
                record.semester,
                fetchData,
              );
            }}
            onChange={(info) => {
              if (info.file.status === "done") {
                message.success(`${info.file.name} 上传成功`);
              } else if (info.file.status === "error") {
                message.error(`${info.file.name} 上传失败`);
              }
            }}
            showUploadList={false}
            disabled={!canSubmit(record)}
          >
            <Button
              icon={<UploadOutlined />}
              disabled={!canSubmit(record)}
              title={
                record.member_chat_confirm
                  ? "已确认，无法重新提交"
                  : record.semester !== data.current_semester
                    ? "非当前学期，无法提交"
                    : "重新提交"
              }
            >
              重新提交
            </Button>
          </Upload>
          <Button
            icon={<DownloadOutlined />}
            onClick={() =>
              downloadNewMemberChatHandler(user.uuid, record.semester)
            }
          >
            下载
          </Button>
        </Space>
      ),
    },
  ];

  if (!data.is_member) {
    return null; // 非积极分子不展示此卡片
  }

  return (
    <Card hoverable>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ marginTop: "1%", marginBottom: 0 }}>
            积极分子谈话记录
          </Title>
        </Col>
        <Col>
          {data.current_semester && canSubmitNew() && (
            <Upload
              customRequest={(e) => {
                uploadNewMemberChatHandler(
                  e,
                  user.uuid,
                  data.current_semester!,
                  fetchData,
                );
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
              <Button type="primary" icon={<UploadOutlined />}>
                提交本学期谈话记录（{data.current_semester}）
              </Button>
            </Upload>
          )}
        </Col>
      </Row>

      <Table<IMemberChatRecord>
        style={{ marginTop: "3%" }}
        rowKey="id"
        dataSource={data.records}
        columns={columns}
        loading={loading}
        pagination={false}
        size="small"
        locale={{ emptyText: "暂无谈话记录" }}
      />
    </Card>
  );
};

export default MemberChatCard;
