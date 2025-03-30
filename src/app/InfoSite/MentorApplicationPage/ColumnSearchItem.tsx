import { Space, Input, Button, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/lib/table/interface";
import type { ColumnProps } from "antd/lib/table";

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
  ): Partial<ColumnProps<any>>;
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

export default ColumnSearchItem;
