import React from "react";
import { Col, Row, Space } from "antd";
import { ContestProps } from "..";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import EditInfo from "./EditInfo";
import Setting from "./Setting";
import EditTimeline from "./EditTimeline";
import UploadWebGL from "./UploadWebGL";
import ManageTeams from "./ManageTeams";
import EditPlayer from "./EditPlayer";
import UploadMap from "./UploadMap";

const ContestAdmin: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  // 关键修改：获取比赛信息以判断名称
  const { data: contestInfoData } = graphql.useGetContestInfoSuspenseQuery({
    variables: { contest_id: Contest_id },
  });

  const contestName = contestInfoData?.contest_by_pk?.fullname || "";
  // 判断逻辑：名称包含“硬件设计”则为硬件比赛
  const isHardware = contestName.includes("硬件设计");

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        display: "flex",
        padding: "4vh 4vw",
        color: mode === "dark" ? "white" : "initial",
      }}
    >
      {/* 第一行：信息编辑 + 比赛设置 */}
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} align="stretch">
        <Col span={16}>
          <EditInfo mode={mode} user={user} />
        </Col>
        <Col span={8}>
          {/* 传参给 Setting */}
          <Setting mode={mode} user={user} isHardware={isHardware} />
        </Col>
      </Row>

      {/* 第二行：时间线 + (WebGL管理) */}
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col span={isHardware ? 24 : 12}>
          <EditTimeline mode={mode} user={user} />
        </Col>
        {!isHardware && (
          <Col span={12}>
            <UploadWebGL mode={mode} user={user} />
          </Col>
        )}
      </Row>

      {/* 第三行：队伍管理 (所有比赛都保留) */}
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col span={24}>
          <ManageTeams mode={mode} user={user} />
        </Col>
      </Row>

      {/* 隐藏行：硬件设计不需要角色和地图管理 */}
      {!isHardware && (
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col span={12}>
            <EditPlayer mode={mode} user={user} />
          </Col>
          <Col span={12}>
            <UploadMap mode={mode} user={user} />
          </Col>
        </Row>
      )}
    </Space>
  );
};

export default ContestAdmin;
