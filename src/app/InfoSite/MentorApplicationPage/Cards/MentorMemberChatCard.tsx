import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Card,
  Typography,
  Table,
  Badge,
  Button,
  Space,
  InputRef,
  message,
  Modal,
  Tag,
} from "antd";
import type { TableProps } from "antd/lib/table";
import {
  CheckCircleOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
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

interface MentorMemberChatCardProps {
  currentSemester: string | null;
}

const MentorMemberChatCard: React.FC<MentorMemberChatCardProps> = ({
  currentSemester,
}) => {
  const [records, setRecords] = useState<MemberChatRecordWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "/application/info/mentor/my_students_member_chats",
      );
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
      content: (
        <>
          <p>
            确认 <Text strong>{record.user?.realname ?? record.user_id}</Text>{" "}
            在 <Text strong>{record.semester}</Text> 学期的谈话记录？
          </p>
          <p>该操作不可撤销。</p>
        </>
      ),
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
      width: "14%",
      ...ColumnSearchItem(["user", "realname"], "学生姓名", searchInput),
    },
    {
      title: "学号",
      dataIndex: ["user", "student_no"],
      key: "student_no",
      width: "14%",
      ...ColumnSearchItem(["user", "student_no"], "学号", searchInput),
    },
    {
      title: "学期",
      dataIndex: "semester",
      key: "semester",
      width: "28%",
      filters: Array.from(new Set(records.map((r) => r.semester))).map((s) => ({
        text: s,
        value: s,
      })),
      onFilter: (value, record) => record.semester === value,
      render: (val: string) => (
        <Space>
          <Text strong>{val}</Text>
          {val === currentSemester && <Tag color="blue">当前</Tag>}
        </Space>
      ),
    },
    {
      title: "提交时间",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "18%",
      sorter: (a, b) =>
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      defaultSortOrder: "descend",
      render: (val: string) => dayjs(val).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "状态",
      dataIndex: "member_chat_confirm",
      key: "status",
      width: "12%",
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

  if (records.length === 0 && !loading) {
    return null;
  }

  return (
    <Card hoverable>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
        }}
        align="center"
      >
        <Title level={2} style={{ margin: 0 }}>
          积极分子谈话记录
        </Title>
        <Button
          icon={<ReloadOutlined />}
          onClick={fetchRecords}
          loading={loading}
        >
          刷新
        </Button>
      </Space>
      <Table<MemberChatRecordWithUser>
        style={{ marginTop: "3%" }}
        rowKey="id"
        dataSource={records}
        columns={columns}
        loading={loading}
        pagination={false}
        size="small"
        locale={{ emptyText: "暂无谈话记录" }}
      />
    </Card>
  );
};

export default MentorMemberChatCard;
