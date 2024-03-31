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
import React from "react";
import {
  //Button,
  Card,
  //Checkbox,
  Col,
  //Divider,
  //Dropdown,
  //Form,
  //Input,
  Layout,
  // List,
  // message,
  // Modal,
  // Menu,
  // Result,
  Row,
  Space,
  // Spin,
  // Table,
  Typography,
} from "antd";
// import axios from "axios";
// import { TableProps } from "antd/lib/table";
// import TextArea from "antd/lib/input/TextArea";
// import { ForwardOutlined, PlayCircleOutlined } from "@ant-design/icons";
// import { useUrl } from "../../api/hooks/url";
// import * as graphql from "@/generated/graphql";
// import { MenuProps } from "antd/lib";
// import styled from "styled-components";
import { ContestProps } from ".";
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
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={8}>
            <SettingPage mode={mode} user={user} />
          </Col>
          <Col span={16}>
            <EditInfoPage mode={mode} user={user} />
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
      ></Card>
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
