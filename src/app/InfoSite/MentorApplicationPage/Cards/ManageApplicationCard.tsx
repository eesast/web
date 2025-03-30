import {
  Col,
  Card,
  Row,
  Typography,
  Button,
  InputRef,
  Table,
  message,
  Badge,
  Upload,
  Tooltip,
} from "antd";
import type { TableProps } from "antd/lib/table";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { IApplication } from "../Interface";
import ColumnSearchItem from "../ColumnSearchItem";
import DisplayApplicationModal from "../Modals/DisplayApplicationModal";
import {
  uploadChatRecordHandler,
  downloadChatRecordHandler,
} from "../Handlers";

interface ManageApplicationProps {
  applications: IApplication[];
  callback: () => Promise<void>;
}

const ManageApplicationCard: React.FC<ManageApplicationProps> = ({
  applications,
  callback,
}) => {
  const searchInput = useRef<InputRef>(null);
  const [selectApplication, setSelectApplication] = useState<
    IApplication | undefined
  >(undefined);
  const [displayApplicationVisible, setDisplayApplicationVisible] =
    useState(false);

  const applicationListColumns: TableProps<IApplication>["columns"] = [
    {
      title: "年份",
      dataIndex: ["year"],
      key: "year",
      width: "8%",
      render: (value) => value,
      filters: Array.from(new Set(applications.map((a) => a.year))).map(
        (year) => ({
          text: year,
          value: year,
        }),
      ),
      onFilter: (value, record) => record.year === value,
    },
    {
      title: "创建时间",
      dataIndex: ["created"],
      key: "created",
      width: "10%",
      render: (value) => new Date(value).toLocaleDateString("zh-CN"),
      sorter: (a, b) =>
        new Date(a.created).getTime() - new Date(b.created).getTime(),
    },
    {
      title: "学生姓名",
      dataIndex: ["stu", "name"],
      key: "student_name",
      width: "10%",
      render: (value, record) => value,
      ...ColumnSearchItem(["stu", "name"], "学生姓名", searchInput),
    },
    {
      title: "导师姓名",
      dataIndex: ["men", "name"],
      key: "mentor_name",
      width: "10%",
      render: (value, record) => value,
      ...ColumnSearchItem(["men", "name"], "导师姓名", searchInput),
    },
    {
      title: "积极分子",
      dataIndex: ["is_mem"],
      key: "is_mem",
      width: "10%",
      render: (value) => (value ? "是" : "否"),
      filters: [
        { text: "是", value: "是" },
        { text: "否", value: "否" },
      ],
      onFilter: (value, record) => (record.is_mem ? "是" : "否") === value,
    },
    {
      title: "申请状态",
      dataIndex: ["status"],
      key: "status",
      width: "10%",
      render: (value) =>
        value === "approved" ? (
          <Badge status={"success"} text={"已通过"} />
        ) : value === "rejected" ? (
          <Badge status={"error"} text={"未通过"} />
        ) : (
          <Badge status={"processing"} text={"待处理"} />
        ),
      filters: [
        { text: "待处理", value: "submitted" },
        { text: "已通过", value: "approved" },
        { text: "未通过", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "谈话记录",
      dataIndex: ["chat"],
      key: "chat",
      width: "10%",
      render: (value) =>
        value ? (
          <Badge status="success" text="已提交" />
        ) : (
          <Badge status="processing" text="未提交" />
        ),
      filters: [
        { text: "已提交", value: true },
        { text: "未提交", value: false },
      ],
      onFilter: (value, record) => record.chat === value,
    },
    {
      title: "谈话确认",
      dataIndex: ["chat2"],
      key: "chat2",
      width: "10%",
      render: (value) =>
        value ? (
          <Badge status="success" text="已确认" />
        ) : (
          <Badge status="processing" text="未确认" />
        ),
      filters: [
        { text: "已确认", value: true },
        { text: "未确认", value: false },
      ],
      onFilter: (value, record) => record.chat === value,
    },
    {
      title: "详情",
      key: "detail",
      width: "5%",
      render: (value, record) => (
        <Row>
          <Col style={{ width: "50%" }}>
            <Button
              onClick={() => {
                setSelectApplication(record);
                setDisplayApplicationVisible(true);
              }}
            >
              查看
            </Button>
          </Col>
        </Row>
      ),
    },
    {
      title: "谈话操作",
      key: "chat_action",
      width: "10%",
      render: (value, record) => (
        <Row>
          <Col style={{ width: "50%" }}>
            <Upload
              customRequest={async (e) => {
                await uploadChatRecordHandler(e, record.id, callback);
              }}
              onChange={(info) => {
                if (info.file.status === "done") {
                  message.success(`${info.file.name} 上传成功`);
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} 上传失败`);
                }
              }}
              showUploadList={false}
              disabled={record.status !== "approved" || record.chat2}
            >
              <Tooltip title="提交">
                <Button
                  icon={<UploadOutlined />}
                  disabled={record.status !== "approved" || record.chat2}
                />
              </Tooltip>
            </Upload>
          </Col>
          <Col style={{ width: "50%" }}>
            <Tooltip title="下载">
              <Button
                icon={<DownloadOutlined />}
                onClick={() => downloadChatRecordHandler(record.id)}
                disabled={!record.chat}
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Card hoverable>
      <Typography.Title level={2} style={{ marginTop: "1%" }}>
        申请列表
      </Typography.Title>
      <Table
        rowKey="id"
        dataSource={applications}
        columns={applicationListColumns}
      />
      {selectApplication && (
        <DisplayApplicationModal
          visible={displayApplicationVisible}
          setVisible={setDisplayApplicationVisible}
          appl={selectApplication}
          detail={true}
        />
      )}
    </Card>
  );
};

export default ManageApplicationCard;
