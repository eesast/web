import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Card,
  Typography,
  Table,
  Tag,
  Badge,
  Button,
  Space,
  InputRef,
  message,
  Modal,
} from "antd";
import type { TableProps } from "antd/lib/table";
import { CheckCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { IMemberChatRecord } from "../Interface";
import { downloadNewMemberChatHandler } from "../Handlers";
import ColumnSearchItem from "../ColumnSearchItem";

const { Title, Text } = Typography;

interface MemberChatRecordWithUser extends IMemberChatRecord {
  user?: {
    realname: string;
    student_no: string;
    department: string;
    class: string;
  };
}

const ManageMemberChatCard: React.FC = () => {
  const [records, setRecords] = useState<MemberChatRecordWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/application/info/mentor/all_member_chats");
      if (res.status !== 200) throw new Error();
      setRecords(res.data);
    } catch {
      message.error("积极分子谈话记录获取失败");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleConfirm = (record: MemberChatRecordWithUser) => {
    Modal.confirm({
      title: "确认积极分子谈话记录",
      content: `确认 ${record.user?.realname ?? record.user_id} 在 ${record.semester} 学期的谈话记录？`,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        try {
          const res = await axios.post(
            "/application/info/mentor/member_chat_confirm",
            { record_id: record.id },
          );
          if (res.status !== 200) throw new Error();
          message.success("确认成功");
          await fetchRecords();
        } catch {
          message.error("确认失败");
        }
      },
    });
  };

  const columns: TableProps<MemberChatRecordWithUser>["columns"] = [
    {
      title: "学生姓名",
      dataIndex: ["user", "realname"],
      key: "realname",
      width: "12%",
      ...ColumnSearchItem(["user", "realname"], "学生姓名", searchInput),
    },
    {
      title: "学号",
      dataIndex: ["user", "student_no"],
      key: "student_no",
      width: "12%",
      ...ColumnSearchItem(["user", "student_no"], "学号", searchInput),
    },
    {
      title: "院系",
      dataIndex: ["user", "department"],
      key: "department",
      width: "12%",
    },
    {
      title: "学期",
      dataIndex: "semester",
      key: "semester",
      width: "14%",
      filters: Array.from(new Set(records.map((r) => r.semester))).map((s) => ({
        text: s,
        value: s,
      })),
      onFilter: (value, record) => record.semester === value,
      render: (val: string) => <Text strong>{val}</Text>,
    },
    {
      title: "提交时间",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "16%",
      sorter: (a, b) =>
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      defaultSortOrder: "descend",
      render: (val: string) => dayjs(val).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "状态",
      dataIndex: "member_chat_confirm",
      key: "status",
      width: "10%",
      filters: [
        { text: "已确认", value: true },
        { text: "待确认", value: false },
      ],
      onFilter: (value, record) => record.member_chat_confirm === value,
      render: (confirmed: boolean) =>
        confirmed ? (
          <Badge status="success" text="已确认" />
        ) : (
          <Badge status="warning" text="待确认" />
        ),
    },
    {
      title: "操作",
      key: "action",
      width: "18%",
      render: (_: any, record: MemberChatRecordWithUser) => (
        <Space>
          <Button
            size="small"
            icon={<DownloadOutlined />}
            onClick={() =>
              downloadNewMemberChatHandler(record.user_id, record.semester)
            }
          >
            下载
          </Button>
          {!record.member_chat_confirm && (
            <Button
              size="small"
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleConfirm(record)}
            >
              确认
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card hoverable>
      <Title level={2} style={{ marginTop: "1%" }}>
        积极分子谈话记录管理
      </Title>
      <Table<MemberChatRecordWithUser>
        style={{ marginTop: "3%" }}
        rowKey="id"
        dataSource={records}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 20 }}
        size="small"
        locale={{ emptyText: "暂无谈话记录" }}
      />
    </Card>
  );
};

export default ManageMemberChatCard;
