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
import { Card, Col, message, Layout, Row, Space, Typography } from "antd";
import { ContestProps } from "..";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import Setting from "./Setting";
import ManageTeams from "./ManageTeams";
import EditInfo from "./EditInfo";
import Forbidden from "@/app/Components/Forbidden";
import Competition from "./Competition";
import EditPlayer from "./EditPlayer";
import UploadMap from "./UploadMap";
import UploadWebGL from "./UploadWebGL";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;

/* ---------------- 不随渲染刷新的组件 ---------------- */

const ManagerPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const { data: getContestManagersData, error: getContestManagersError } =
    graphql.useGetContestManagersSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  useEffect(() => {
    if (getContestManagersError) {
      message.error("管理员加载失败");
      console.log(getContestManagersError.message);
    }
  }, [getContestManagersError]);

  return getContestManagersData?.contest_by_pk?.contest_managers.some(
    (manager) => manager.user_uuid === user?.uuid,
  ) ? (
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
            <EditInfo mode={mode} user={user} />
          </Col>
          <Col span={8}>
            <Setting mode={mode} user={user} />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={24}>
            <ManageTeams mode={mode} user={user} />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={8}>
            <EditPlayer mode={mode} user={user} />
          </Col>
          <Col span={8}>
            <UploadMap mode={mode} user={user} />
          </Col>
          <Col span={8}>
            <UploadWebGL mode={mode} user={user} />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={24}>
            <Competition mode={mode} user={user} />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={12}>
            <CharacterData mode={mode} user={user} />
          </Col>
          <Col span={12}>
            <ContestData mode={mode} user={user} />
          </Col>
        </Row>
      </Space>
    </Layout>
  ) : (
    <Forbidden />
  );
};

const CharacterData: React.FC<ContestProps> = ({ mode, user }) => {
  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          角色数据分析
        </Title>
      </Card>
    </Layout>
  );
};

const ContestData: React.FC<ContestProps> = ({ mode, user }) => {
  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          比赛数据分析
        </Title>
      </Card>
    </Layout>
  );
};

export default ManagerPage;
