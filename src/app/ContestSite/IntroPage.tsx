import { useEffect } from "react";
import { Card, Col, Row, Space, Statistic, Timeline, message } from "antd";
import { FireOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useUrl } from "../../api/hooks/url";
import Markdown from "react-markdown";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";

const { Countdown } = Statistic;

/* ---------------- 主页面 ---------------- */
const IntroPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: contestInfoData, error: contestInfoError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  const { data: totalTeamNumData } = graphql.useGetTotalTeamNumSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });
  console.log(totalTeamNumData);
  const { data: totalMemberNumData } =
    graphql.useGetTotalMemberNumSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  // TODO: 在这里插入获取时间线数据的代码

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestInfoError) {
      message.error("简介加载失败");
    }
  }, [contestInfoError]);
  /* ---------------- 页面组件 ---------------- */
  return (
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
          <Card bordered={false}>
            <Statistic
              title="已报名"
              value={
                totalMemberNumData?.contest_team_member_aggregate?.aggregate
                  ?.count || 0
              }
              valueStyle={{ color: "#cf1322" }}
              prefix={<FireOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="共组成了"
              value={
                totalTeamNumData?.contest_team_aggregate?.aggregate?.count || 0
              }
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="支队伍"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Countdown
              title="距离报名截止还有"
              value={contestInfoData?.contest_by_pk?.end_date}
              format="D 天 H 时 m 分"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
        <Col span={16}>
          <Card bordered={false}>
            <Markdown>{contestInfoData?.contest_by_pk?.description}</Markdown>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            {/* TODO: 在这里插入时间线组件，相关设置详见 https://ant.design/components/timeline-cn */}
            <Timeline />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default IntroPage;
