import {
  Col,
  Card,
  Row,
  Typography,
  Space,
  Input,
  Button,
  InputRef,
  Table,
  Form,
} from "antd";
import { PageProps } from "../../..";
import type { TableProps, ColumnProps } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/lib/table/interface";
import { useEffect, useRef, useState } from "react";
import EditApplicationModal from "../Modals/EditApplicationModal";
import DisplayMentorInfoModal from "../Modals/DisplayMentorInfoModal";
import { IApplication, ISchedule, IMentor, IFreshman } from "../Interface";
import dayjs from "dayjs";

const getNestedValue = (record: any, path: (string | number)[]) => {
  return path.reduce((acc, key) => acc && acc[key], record);
};

const searchHandler = (
  selectedKeys: FilterDropdownProps["selectedKeys"],
  confirm: FilterDropdownProps["confirm"],
) => {
  confirm({ closeDropdown: true });
};

const resetHandler = (clearFilters: FilterDropdownProps["clearFilters"]) => {
  clearFilters?.();
};

interface ColumnSearchProps {
  (
    dataIndex: (string | number)[],
    name: string,
    input: React.RefObject<InputRef>,
  ): Partial<ColumnProps<IMentor>>;
}

const ColumnSearchItem: ColumnSearchProps = (dataIndex, name, input) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <Space
      direction="vertical"
      css={`
        padding: 8px;
      `}
    >
      <Input
        ref={input}
        placeholder={`搜索${name}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => searchHandler(selectedKeys, confirm)}
        css={`
          width: 188px;
          display: block;
        `}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => searchHandler(selectedKeys, confirm)}
          icon={<SearchOutlined />}
          size="small"
          css={`
            width: 90px;
          `}
        >
          搜索
        </Button>
        <Button
          onClick={() => resetHandler(clearFilters)}
          size="small"
          css={`
            width: 90px;
          `}
        >
          重置
        </Button>
      </Space>
    </Space>
  ),

  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#027dcd" : undefined }} />
  ),

  onFilter: (value, record) =>
    getNestedValue(record, dataIndex)!
      .toString()
      .toLowerCase()
      .includes(value.toString().toLowerCase()),

  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => input.current && input.current.select());
    }
  },
});

const departmentFilter = [
  { text: "电子系", value: "电子系" },
  { text: "微纳电子系", value: "微纳电子系" },
  { text: "医学院", value: "医学院" },
];

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

  useEffect(() => {
    setDisabledBySchedule(
      dayjs(new Date()) < dayjs(schedule.C.beg) ||
        dayjs(new Date()) > dayjs(schedule.D.end) ||
        (dayjs(new Date()) > dayjs(schedule.C.end) &&
          dayjs(new Date()) < dayjs(schedule.D.beg)),
    );
  }, [schedule]);

  const mentorInfoListColumns: TableProps<IMentor>["columns"] = [
    {
      title: "姓名",
      dataIndex: ["name"],
      key: "name",
      ...ColumnSearchItem(["name"], "姓名", searchInput),
    },
    {
      title: "院系",
      dataIndex: ["dept"],
      key: "dept",
      filters: departmentFilter,
      onFilter: (value, record) => record.dept === value,
    },
    {
      title: "申请限额",
      dataIndex: "max_apl",
      key: "max_apl",
      render: (value, record) => (record.avail ? value : "Unavailable"),
    },
    {
      title: "已申请人数",
      dataIndex: "tot_apl",
      key: "tot_apl",
      sorter: (a, b) => (a.tot_apl ?? 0) - (b.tot_apl ?? 0),
    },
    {
      title: "已接收人数",
      dataIndex: "mat_apl",
      key: "mat_apl",
      sorter: (a, b) => (a.mat_apl ?? 0) - (b.mat_apl ?? 0),
    },
    {
      title: "操作",
      key: "action",
      render: (value, record) => (
        <Row justify="space-around">
          {user.role === "student" && (
            <Col span={8}>
              <Button
                onClick={() => {
                  setSelectMentor(record);
                  form.setFieldsValue(
                    applications.find((i) => i.men?.uuid === record.uuid) ?? {
                      men: {
                        name: record.name,
                        dept: record.dept,
                      },
                      stmt: "",
                    },
                  );
                  setEditApplicationModalVisible(true);
                }}
                disabled={
                  !freshmen.find((i) => i.uuid && i.uuid === user.uuid) ||
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
          <Col span={8}>
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
            form={form}
            callback={callback}
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
