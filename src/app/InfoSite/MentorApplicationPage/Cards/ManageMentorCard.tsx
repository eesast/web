import {
  Col,
  Card,
  Row,
  Typography,
  Button,
  InputRef,
  Table,
  Switch,
  message,
  InputNumber,
  Form,
} from "antd";
import type { TableProps } from "antd/lib/table";
import { useRef, useState } from "react";
import EditMentorInfoModal from "../Modals/EditMentorInfoModal";
import { IMentor } from "../Interface";
import axios from "axios";
import ColumnSearchItem from "../ColumnSearchItem";

interface ManageMentorProps {
  mentors: IMentor[];
  callback: () => Promise<void>;
}

const ManageMentorCard: React.FC<ManageMentorProps> = ({
  mentors,
  callback,
}) => {
  const searchInput = useRef<InputRef>(null);
  const [selectMentor, setSelectMentor] = useState<IMentor | undefined>(
    undefined,
  );
  const [editMentorInfoVisible, setEditMentorInfoVisible] = useState(false);
  const [form] = Form.useForm();

  const memberHandler = async (mentor: IMentor) => {
    try {
      const res = await axios.post(`/application/info/mentor/member`, {
        is_member: !mentor.is_mem,
        mentor_uuid: mentor.uuid,
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

  const availHandler = async (mentor: IMentor) => {
    try {
      const res = await axios.post(`/application/info/mentor/avail`, {
        available: !mentor.avail,
        mentor_uuid: mentor.uuid,
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

  const maxAppHandler = async (mentor: IMentor, value: number) => {
    try {
      const res = await axios.post(`/application/info/mentor/max_app`, {
        max_applicants: value,
        mentor_uuid: mentor.uuid,
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

  const mentorInfoListColumns: TableProps<IMentor>["columns"] = [
    {
      title: "姓名",
      dataIndex: ["name"],
      key: "name",
      width: "15%",
      ...ColumnSearchItem(["name"], "姓名", searchInput),
    },
    {
      title: "院系",
      dataIndex: ["dept"],
      key: "dept",
      width: "15%",
      filters: [
        { text: "电子系", value: "电子系" },
        { text: "微纳电子系", value: "微纳电子系" },
        { text: "医学院", value: "医学院" },
      ],
      onFilter: (value, record) => record.dept === value,
    },
    {
      title: "积极分子",
      dataIndex: ["is_mem"],
      key: "is_mem",
      width: "10%",
      render: (value, record) => (
        <Switch
          checkedChildren="是"
          unCheckedChildren="否"
          checked={value ?? false}
          onChange={() => memberHandler(record)}
        />
      ),
      filters: [
        { text: "是", value: true },
        { text: "否", value: false },
      ],
      onFilter: (value, record) => record.is_mem === value,
    },
    {
      title: "接收申请",
      dataIndex: "avail",
      key: "avail",
      width: "10%",
      render: (value, record) => (
        <Switch
          checkedChildren="是"
          unCheckedChildren="否"
          checked={value ?? false}
          onChange={() => availHandler(record)}
        />
      ),
      filters: [
        { text: "是", value: true },
        { text: "否", value: false },
      ],
      onFilter: (value, record) => record.avail === value,
    },
    {
      title: "申请限额",
      dataIndex: "max_apl",
      key: "max_apl",
      width: "10%",
      render: (value, record) => (
        <InputNumber
          min={5}
          max={10}
          defaultValue={value}
          onChange={(v) => maxAppHandler(record, v)}
          style={{ width: "70%" }}
        />
      ),
      sorter: (a, b) => (a.max_apl ?? 0) - (b.max_apl ?? 0),
    },
    {
      title: "已申请",
      dataIndex: "tot_apl",
      key: "tot_apl",
      width: "10%",
      sorter: (a, b) => (a.tot_apl ?? 0) - (b.tot_apl ?? 0),
    },
    {
      title: "已接收",
      dataIndex: "mat_apl",
      key: "mat_apl",
      width: "10%",
      sorter: (a, b) => (a.mat_apl ?? 0) - (b.mat_apl ?? 0),
    },
    {
      title: "其它信息",
      key: "others",
      width: "20%",
      render: (value, record) => (
        <Row>
          <Col style={{ width: "50%" }}>
            <Button
              onClick={() => {
                setSelectMentor(record);
                form.setFieldsValue(record);
                setEditMentorInfoVisible(true);
              }}
            >
              编辑
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Card hoverable>
      <Typography.Title level={2} style={{ marginTop: "1%" }}>
        导师列表
      </Typography.Title>
      <Table
        rowKey="uuid"
        dataSource={mentors}
        columns={mentorInfoListColumns}
      />
      {selectMentor && (
        <EditMentorInfoModal
          visible={editMentorInfoVisible}
          setVisible={setEditMentorInfoVisible}
          mentor={selectMentor}
          form={form}
          callback={callback}
        />
      )}
    </Card>
  );
};

export default ManageMentorCard;
