import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Typography,
  Table,
  Tag,
  Button,
  Input,
  Space,
  Modal,
  message,
  Row,
  Col,
} from "antd";
import { PlusOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import { ISemester } from "../Interface";

const { Title, Text } = Typography;

const SemesterManageCard: React.FC = () => {
  const [semesters, setSemesters] = useState<ISemester[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSemester, setNewSemester] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  // 删除二次确认：第一步弹窗，第二步输入学期名
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [setCurrentLoading, setSetCurrentLoading] = useState<string | null>(
    null,
  );

  const fetchSemesters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/application/semester_list");
      if (res.status !== 200) throw new Error();
      setSemesters(res.data);
    } catch {
      message.error("学期列表获取失败");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSemesters();
  }, [fetchSemesters]);

  const handleSetCurrent = async (semester: string) => {
    setSetCurrentLoading(semester);
    try {
      const res = await axios.post("/application/set_semester", { semester });
      if (res.status !== 200) throw new Error();
      message.success(`已将 ${semester} 设为当前学期`);
      await fetchSemesters();
    } catch {
      message.error("设置当前学期失败");
    } finally {
      setSetCurrentLoading(null);
    }
  };

  const handleAdd = async () => {
    const trimmed = newSemester.trim();
    if (!trimmed) {
      message.warning("学期名称不能为空");
      return;
    }
    setAddLoading(true);
    try {
      const res = await axios.post("/application/add_semester", {
        semester: trimmed,
      });
      if (res.status !== 200) throw new Error();
      message.success(`学期 ${trimmed} 添加成功`);
      setNewSemester("");
      await fetchSemesters();
    } catch {
      message.error("添加学期失败（该学期可能已存在）");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    if (deleteConfirmInput !== deleteTarget) {
      message.error("输入的学期名称与目标不符，请重新输入");
      return;
    }
    setDeleteLoading(true);
    try {
      const res = await axios.delete("/application/delete_semester", {
        data: { semester: deleteTarget },
      });
      if (res.status !== 200) throw new Error();
      message.success(`学期 ${deleteTarget} 已删除`);
      setDeleteTarget(null);
      setDeleteConfirmInput("");
      await fetchSemesters();
    } catch {
      message.error("删除学期失败");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      title: "学期",
      dataIndex: "semester",
      key: "semester",
      render: (val: string, record: ISemester) => (
        <Space>
          <Text strong={record.is_current}>{val}</Text>
          {record.is_current && <Tag color="blue">当前</Tag>}
        </Space>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (_: any, record: ISemester) => (
        <Space>
          {!record.is_current && (
            <Button
              size="small"
              icon={<CheckOutlined />}
              loading={setCurrentLoading === record.semester}
              onClick={() => handleSetCurrent(record.semester)}
            >
              设为当前
            </Button>
          )}
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            disabled={record.is_current}
            title={record.is_current ? "不能删除当前学期" : ""}
            onClick={() => {
              setDeleteTarget(record.semester);
              setDeleteConfirmInput("");
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card hoverable>
        <Title level={2} style={{ marginTop: "1%" }}>
          学期管理
        </Title>

        <Row style={{ marginTop: "5%" }} gutter={[0, 16]}>
          <Col style={{ width: "100%" }}>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                placeholder="新学期名称，如 2077-Spring"
                value={newSemester}
                onChange={(e) => setNewSemester(e.target.value)}
                onPressEnter={handleAdd}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                loading={addLoading}
                onClick={handleAdd}
              >
                添加学期
              </Button>
            </Space.Compact>
          </Col>
        </Row>

        <Row style={{ marginTop: "3%" }}>
          <Col style={{ width: "100%" }}>
            <Table<ISemester>
              rowKey="semester"
              dataSource={semesters}
              columns={columns}
              loading={loading}
              pagination={false}
              size="small"
            />
          </Col>
        </Row>
      </Card>

      {/* 删除二次确认弹窗 */}
      <Modal
        open={!!deleteTarget}
        title={<Text type="danger">确认删除学期</Text>}
        onCancel={() => {
          setDeleteTarget(null);
          setDeleteConfirmInput("");
        }}
        onOk={handleDeleteConfirm}
        okText="确认删除"
        cancelText="取消"
        okButtonProps={{
          danger: true,
          disabled: deleteConfirmInput !== deleteTarget,
          loading: deleteLoading,
        }}
        destroyOnClose
      >
        <p>
          此操作将永久删除学期 <Text strong>{deleteTarget}</Text>，且不可恢复。
        </p>
        <p>
          请在下方输入 <Text code>{deleteTarget}</Text> 以确认删除：
        </p>
        <Input
          value={deleteConfirmInput}
          onChange={(e) => setDeleteConfirmInput(e.target.value)}
          placeholder={deleteTarget ?? ""}
          onPressEnter={handleDeleteConfirm}
          status={
            deleteConfirmInput && deleteConfirmInput !== deleteTarget
              ? "error"
              : undefined
          }
        />
      </Modal>
    </>
  );
};

export default SemesterManageCard;
