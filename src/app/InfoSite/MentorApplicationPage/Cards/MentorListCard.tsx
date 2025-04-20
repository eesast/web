import {
  Col,
  Card,
  Row,
  Typography,
  Button,
  InputRef,
  Table,
  Form,
} from "antd";
import { PageProps } from "../../..";
import type { TableProps } from "antd/lib/table";
import { useEffect, useRef, useState } from "react";
import EditApplicationModal from "../Modals/EditApplicationModal";
import DisplayMentorInfoModal from "../Modals/DisplayMentorInfoModal";
import { IApplication, ISchedule, IMentor, IFreshman } from "../Interface";
import dayjs from "dayjs";
import ColumnSearchItem from "../ColumnSearchItem";

interface MentorListProps extends PageProps {
  applications: IApplication[]; // 自身已提交的申请
  mentors: IMentor[]; // 所有导师列表
  schedule: ISchedule; // 申请时间表
  freshmen: IFreshman[]; // 所有新生列表
  callback: () => Promise<void>;
}

const MentorListCard: React.FC<MentorListProps> = ({
  applications,
  mentors,
  schedule,
  freshmen,
  callback,
  user,
  mode,
}) => {
  const searchInput = useRef<InputRef>(null);
  const [editApplicationModalVisible, setEditApplicationModalVisible] =
    useState(false);
  const [selectMentor, setSelectMentor] = useState<IMentor | undefined>(
    undefined,
  );
  const [form] = Form.useForm();
  const [displayMentorInfoVisible, setDisplayMentorInfoVisible] =
    useState(false);
  const [disabledBySchedule, setDisabledBySchedule] = useState(false);
  const [disableByFreshman, setDisableByFreshman] = useState(false);

  useEffect(() => {
    setDisabledBySchedule(
      dayjs(new Date()) < dayjs(schedule.C.beg) ||
        dayjs(new Date()) > dayjs(schedule.D.end) ||
        (dayjs(new Date()) > dayjs(schedule.C.end) &&
          dayjs(new Date()) < dayjs(schedule.D.beg)),
    );
  }, [schedule]);

  useEffect(() => {
    setDisableByFreshman(!freshmen.find((i) => i.uuid && i.uuid === user.uuid));
  }, [freshmen, user.uuid]);

  const mentorInfoListColumns: TableProps<IMentor>["columns"] = [
    {
      title: "姓名",
      dataIndex: ["name"],
      key: "name",
      width: "10%",
      ...ColumnSearchItem(["name"], "姓名", searchInput),
    },
    {
      title: "院系",
      dataIndex: ["dept"],
      key: "dept",
      width: "10%",
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
      width: "15%",
      render: (value) => (value ? "是" : "否"),
      filters: [
        { text: "是", value: "是" },
        { text: "否", value: "否" },
      ],
      onFilter: (value, record) => (record.is_mem ? "是" : "否") === value,
    },
    {
      title: "申请限额",
      dataIndex: "max_apl",
      key: "max_apl",
      width: "15%",
      render: (value, record) => (record.avail ? value : "Unavailable"),
      sorter: (a, b) =>
        (a.avail ? (a.max_apl ?? 0) : 0) - (b.avail ? (b.max_apl ?? 0) : 0),
    },
    {
      title: "已申请人数",
      dataIndex: "tot_apl",
      key: "tot_apl",
      width: "15%",
      sorter: (a, b) => (a.tot_apl ?? 0) - (b.tot_apl ?? 0),
    },
    {
      title: "已接收人数",
      dataIndex: "mat_apl",
      key: "mat_apl",
      width: "15%",
      sorter: (a, b) => (a.mat_apl ?? 0) - (b.mat_apl ?? 0),
    },
    {
      title: "操作",
      key: "action",
      width: "20%",
      render: (value, record) => (
        <Row>
          {user.role === "student" && (
            <Col style={{ width: "50%" }}>
              <Button
                onClick={() => {
                  setSelectMentor(record);
                  form.setFieldsValue(
                    applications.find((i) => i.men?.uuid === record.uuid) ?? {
                      men: {
                        name: record.name,
                        dept: record.dept,
                      },
                    },
                  );
                  setEditApplicationModalVisible(true);
                }}
                disabled={
                  disableByFreshman ||
                  disabledBySchedule ||
                  ((applications.length > 0 ||
                    !record.avail ||
                    record.tot_apl === undefined ||
                    record.max_apl === undefined ||
                    record.tot_apl >= record.max_apl) &&
                    (applications.find((i) => i.men?.uuid === record.uuid)
                      ?.status ?? "approved") === "approved")
                }
              >
                {applications.find((i) => i.men?.uuid === record.uuid)
                  ? "编辑申请"
                  : "申请"}
              </Button>
            </Col>
          )}
          <Col style={{ width: "50%" }}>
            <Button
              onClick={() => {
                setSelectMentor(record);
                setDisplayMentorInfoVisible(true);
              }}
            >
              查看信息
            </Button>
          </Col>
          <Col span={8}></Col>
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
        <>
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
          <DisplayMentorInfoModal
            visible={displayMentorInfoVisible}
            setVisible={setDisplayMentorInfoVisible}
            mentor={selectMentor}
          />
        </>
      )}
    </Card>
  );
};

export default MentorListCard;
