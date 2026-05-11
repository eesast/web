import {
  Col,
  Card,
  Row,
  Typography,
  Button,
  Badge,
  InputRef,
  Table,
} from "antd";
import type { TableProps } from "antd/lib/table";
import { useRef, useState } from "react";
import { IApplication } from "../Interface";
import ColumnSearchItem from "../ColumnSearchItem";
import DisplayApplicationModal from "../Modals/DisplayApplicationModal";

interface ManageApplicationProps {
  applications: IApplication[];
  is_member: boolean;
  callback: () => Promise<void>;
}

const ManageApplicationCard: React.FC<ManageApplicationProps> = ({
  applications,
  is_member,
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
  ];

  return (
    <Card hoverable>
      <Typography.Title level={2} style={{ marginTop: "1%" }}>
        {is_member ? "积极分子列表" : "申请列表"}
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
