// 需要整合到此页面的功能有：

//* 1. 导出队伍信息（JoinPage.tsx）
// 2. 修改比赛信息（ListPage.tsx，已注释）
//* 3. 上传代码和天梯功能的开关（SettingPage.tsx）
//* 4. 开启单双循环赛的按钮和配置（SettingPage.tsx）
// 5. 复赛、决赛的得分展示（ManageTeamsPage.tsx）
//* 6. 队伍管理功能（ManageTeamsPage.tsx，考虑是否必要，可转化为统计数据）

// 注：除 NoticePage.tsx 上的管理员功能暂时保留，其余功能和页面在整合后均在原处删除

// 其他有需求的功能：

// 1. 比赛报名、组队情况和代码提交的统计数据
// 2. 复赛、决赛的轮赛进度和得分展示，以及表格导出功能（效仿天梯）
// 3. 比赛地图的添加和管理

// 锦上添花的功能：

// 1. 角色强度的统计分析
// 2. 在比赛记录基础上，允许一键重跑，在线观看回放、下载回放，甚至观看直播（效仿天梯）
// 3. 在线提交WebGL，同时更改是否允许试玩、回放、直播的开关
// 4. 加入在线地图编辑器
import React, { useEffect } from "react";
import {
  Button,
  Card,
  //Checkbox,
  Col,
  DatePicker,
  //Divider,
  //Dropdown,
  Form,
  Input,
  message,
  Layout,
  // List,
  // message,
  // Modal,
  // Menu,
  // Result,
  Row,
  Select,
  Space,
  // Spin,
  // Table,
  Typography,
} from "antd";
// import axios from "axios";
// import { TableProps } from "antd/lib/table";
// import TextArea from "antd/lib/input/TextArea";
// import { ForwardOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import moment from "moment";
// import { MenuProps } from "antd/lib";
// import styled from "styled-components";
import { ContestProps } from "..";
// import { MenuInfo } from 'rc-menu/lib/interface';
import SettingPage from "./SettingPage";
import ManageTeamsPage from "./ManageTeamsPage";
/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Text } = Typography;
// const { Header } = Layout;
/* ---------------- 不随渲染刷新的组件 ---------------- */
// const Container = styled.div`
//   height: calc(100vh - 72px);
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const ManagerPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  // const url = useUrl();
  // const Contest_id = url.query.get("contest")!;
  // const [currentPage, setCurrentPage] = useState('home');

  return (
    <Layout>
      <Space
        direction="vertical"
        size="large"
        style={{
          display: "flex",
          border: "0px solid #ccc",
          padding: "4vh 4vw",
          color: mode === "dark" ? "white" : "initial",
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true} align="stretch">
          <Col span={16}>
            <EditInfoPage mode={mode} user={user} />
          </Col>
          <Col span={8}>
            <SettingPage mode={mode} user={user} />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={24}>
            <ManageTeamsPage mode={mode} user={user} />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={16}>
            <CharacterPage mode={mode} user={user} />
          </Col>
          <Col span={8}>
            <ContestDataPage mode={mode} user={user} />
          </Col>
        </Row>
      </Space>
    </Layout>
  );
};

const EditInfoPage: React.FC<ContestProps> = ({ mode, user }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const RangePicker: any = DatePicker.RangePicker;
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const {
    data: contestInfoData,
    error: contestInfoError,
    refetch: refetchContestInfoData,
  } = graphql.useGetContestInfoSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const initialValues = {
    contest_name: contestInfoData?.contest_by_pk?.contest_name || "",
    contest_type: "THUAI",
    description: contestInfoData?.contest_by_pk?.description || "",
    // 注意: 时间范围选择器需要的是moment对象数组
    time: [
      moment(contestInfoData?.contest_by_pk?.start_date, "YYYY-MM-DD"), // 加一天
      moment(contestInfoData?.contest_by_pk?.end_date, "YYYY-MM-DD"), // 加一天
    ],
  };

  const [UpdateContestInfo, { error: UpdateContestInfoError }] =
    graphql.useUpdateContestInfoMutation();

  const onFinish = async (record: any) => {
    const newinfo = {
      contest_id: Contest_id,
      contest_name: record.contest_name,
      name: record.contest_name,
      description: record.description,
      start_date: record.time[0].format("YYYY-MM-DD"),
      end_date: record.time[1].format("YYYY-MM-DD"),
    };
    await UpdateContestInfo({
      variables: newinfo,
    });
    await refetchContestInfoData();
    message.info("比赛信息已更新");
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  });

  useEffect(() => {
    if (contestInfoError) {
      message.error("简介加载失败");
    }
  }, [contestInfoError]);

  useEffect(() => {
    if (UpdateContestInfoError) {
      message.error("简介更新失败");
    }
  }, [UpdateContestInfoError]);
  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
        title={
          <Text
            css={`
              font-size: xx-large;
              font-weight: bold;
            `}
          >
            比赛信息编辑
          </Text>
        }
      >
        <Form form={form} name="contest" onFinish={onFinish} preserve={false}>
          <Form.Item
            name="contest_name"
            label="名称"
            rules={[{ required: true, message: "请输入比赛名称" }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="contest_type"
            label="类型"
            rules={[{ required: true, message: "请输入比赛类型" }]}
          >
            <Select style={{ width: "40%" }} allowClear>
              <Option value="THUAI">THUAI</Option>
              <Option value="Electronic-design">电子设计大赛</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            className="form-item-description"
            rules={[{ required: false, message: "请输入比赛描述" }]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} allowClear />
          </Form.Item>
          <Form.Item
            name="time"
            label="比赛时间"
            rules={[{ required: true, message: "请输入比赛时间" }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

const CharacterPage: React.FC<ContestProps> = ({ mode, user }) => {
  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
        title={
          <Text
            css={`
              font-size: xx-large;
              font-weight: bold;
            `}
          >
            角色数据
          </Text>
        }
      ></Card>
    </Layout>
  );
};

const ContestDataPage: React.FC<ContestProps> = ({ mode, user }) => {
  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
        title={
          <Text
            css={`
              font-size: xx-large;
              font-weight: bold;
            `}
          >
            比赛数据
          </Text>
        }
      ></Card>
    </Layout>
  );
};

export default ManagerPage;
