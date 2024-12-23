import React, { useEffect, useState, useRef } from "react";
import { ContestProps } from ".";
import { useUrl } from "../../api/hooks/url";
import { Button, Card, Layout, Row, Col, Space, Statistic } from "antd";
import {
  FireOutlined,
  ArrowUpOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import * as graphql from "@/generated/graphql";
import { Chart } from "@antv/g2";
import NotJoined from "./Components/NotJoined";

/* ---------------- 不随渲染刷新的常量和组件 ---------------- */
const ranges = [5, 10, 20, 50, 100, 0];

/* ---------------- 主页面 ---------------- */
const AnalysisPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const totalScoreRef = useRef(0);
  const chartPieRef = useRef(null);
  const chartLineRef = useRef(null);

  const { data: teamData } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: user.uuid,
      contest_id: Contest_id,
    },
  });
  const team_id = teamData?.contest_team_member[0]?.contest_team.team_id!;

  const { data: teamStatData } = graphql.useGetTeamStatSuspenseQuery({
    variables: {
      team_id: team_id,
    },
    skip: !team_id,
  });

  const { data: teamArenaRoomsData } = graphql.useGetTeamArenaRoomsSubscription(
    {
      variables: {
        contest_id: Contest_id,
        team_id: team_id,
      },
      skip: !team_id,
    },
  );

  const { data: scoreteamListData } = graphql.useGetTeamsSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const matchCount = teamArenaRoomsData?.contest_room?.length || 0;

  const [activeButton, setActiveButton] = useState(matchCount); // 初始选中的按钮
  const [viewRange, setViewRange] = useState(matchCount);

  /* ---------------- 业务逻辑函数 ---------------- */
  const handleButtonClick = (range: any) => {
    setViewRange(range === 0 ? matchCount : range);
    setActiveButton(range);
  };

  //当前队伍排名
  const scoreRank =
    (scoreteamListData?.contest_team.findIndex(
      (team: any) => team.team_id === team_id,
    ) ?? -1) + 1;

  //天梯积分分析
  useEffect(() => {
    totalScoreRef.current = 0;
    const processedData =
      teamArenaRoomsData?.contest_room?.map((room, index) => {
        const team = room?.contest_room_teams?.find(
          (team) => team.contest_team.team_id === team_id,
        );
        if (team) {
          totalScoreRef.current += team.score ?? 0;
        }
        return {
          match: `Match ${index + 1}`,
          matchDate: dayjs(room.created_at).format("MM-DD HH:mm:ss"),
          score: totalScoreRef.current,
        };
      }) || [];
    const dataToDisplay = processedData.slice(-viewRange);

    if (!chartLineRef.current) return;

    const chart = new Chart({
      container: chartLineRef.current,
      autoFit: true,
    });

    chart
      .data(dataToDisplay)
      .encode("x", "match")
      .encode("y", "score")
      .scale("x", {
        range: [0, 1],
      })
      .scale("y", {
        nice: true,
      });

    chart
      .line()
      .style({
        stroke: "#2E9CE5",
        lineWidth: 2,
      })
      .label({
        text: (d: { score: number }) => `${d.score}`,
        style: {
          fill: mode === "dark" ? "white" : "black",
          fontWeight: "bold",
          dx: 0,
          dy: -12,
        },
      })
      .tooltip({
        items: [
          { field: "matchDate", name: "比赛日期" },
          { field: "score", name: "天梯积分" },
        ],
      });

    chart.axis("x", {
      title: false,
      labelFill: mode === "dark" ? "white" : "black",
      gridStroke: mode === "dark" ? "white" : "black",
      labelFontWeight: "bold",
    });
    chart.axis("y", {
      title: false,
      labelFill: mode === "dark" ? "white" : "black",
      gridStroke: mode === "dark" ? "white" : "black",
      labelFontWeight: "bold",
    });

    chart.point().style("fill", "white").tooltip(false);

    chart.render();

    return () => {
      chart.destroy();
    };
  });

  //对战结果分析
  useEffect(() => {
    const matchResults = teamArenaRoomsData?.contest_room?.reduce(
      (acc, room) => {
        const team = room.contest_room_teams.find(
          (team) => team.contest_team.team_id === team_id,
        );
        const otherTeams = room.contest_room_teams.filter(
          (team) => team.contest_team.team_id !== team_id,
        );

        const isWin = otherTeams.every(
          (otherTeam) => (team?.score ?? 0) > (otherTeam?.score ?? 0),
        );
        const isLoss = otherTeams.every(
          (otherTeam) => (team?.score ?? 0) < (otherTeam?.score ?? 0),
        );
        const isDraw = otherTeams.some(
          (otherTeam) => (team?.score ?? 0) === (otherTeam?.score ?? 0),
        );

        if (isWin) {
          acc.won += 1;
        } else if (isLoss) {
          acc.lost += 1;
        } else if (isDraw) {
          acc.draw += 1;
        }

        return acc;
      },
      { won: 0, lost: 0, draw: 0 },
    );

    const rawData = [
      { type: "获胜", value: matchCount === 0 ? 0 : matchResults?.won },
      { type: "失败", value: matchCount === 0 ? 0 : matchResults?.lost },
      { type: "其他", value: matchCount === 0 ? 0 : matchResults?.draw },
    ];

    // 过滤掉 value 为 0 的数据项
    const data = rawData.filter((item) => item.value !== 0);

    if (!chartPieRef.current) return;

    const chart = new Chart({
      container: chartPieRef.current,
      autoFit: true,
    });

    chart.options({
      type: "interval",
      data: data,
      transform: [{ type: "stackY" }],
      coordinate: { type: "theta" },
      scale: {
        color: {
          range: ["#2593fc", "#f04864", "#facc14"],
        },
      },
      tooltip: {
        items: [
          { field: "type", name: "对战结果:" },
          { field: "value", name: "次数:" },
        ],
      },
      legend: {},
      encode: { y: "value", color: "type" },
      style: { stroke: "white" },
      labels: [
        {
          text: "type",
          radius: 0.8,
          style: { fontSize: 18, fontWeight: "bold" },
        },
      ],
      animate: { enter: { type: "waveIn", duration: 700 } },
    });

    chart.render();

    return () => {
      chart.destroy();
    };
  });
  /* ---------------- ⻚⾯组件 ---------------- */
  if (!team_id)
    return (
      <Layout>
        <NotJoined />
        <div ref={chartLineRef} />
        <div ref={chartPieRef} />
      </Layout>
    );

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
          <Col span={8}>
            <Card hoverable>
              <Statistic
                title="当前排名"
                value={"No." + scoreRank}
                prefix={<BarChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable>
              <Statistic
                title="共参与了"
                value={
                  teamStatData?.contest_team_by_pk?.contest_team_rooms_aggregate
                    ?.aggregate?.count || 0
                }
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="场对战"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable>
              <Statistic
                title="天梯积分"
                value={
                  teamStatData?.contest_team_by_pk?.contest_team_rooms_aggregate
                    ?.aggregate?.sum?.score || 0
                }
                valueStyle={{ color: "#cf1322" }}
                prefix={<FireOutlined />}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={16}>
            <Card
              hoverable
              title={
                <span
                  style={{
                    fontSize: "26px",
                    color: mode === "dark" ? "white" : "black",
                  }}
                >
                  天梯积分分析
                </span>
              }
              style={{
                padding: "2vh 1vw",
                height: `calc(50vh + 180px)`,
              }}
            >
              <div
                ref={chartLineRef}
                style={{ width: "100%", height: "50vh" }}
              />
              <div>
                {ranges.map(
                  (range) =>
                    matchCount >= range && (
                      <Button
                        key={range}
                        type={activeButton === range ? "primary" : "default"}
                        style={{
                          marginRight: "2vw",
                        }}
                        onClick={() => handleButtonClick(range)}
                      >
                        {range === 0 ? "所有" : `最近${range}场`}
                      </Button>
                    ),
                )}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              title={
                <span
                  style={{
                    fontSize: "26px",
                    color: mode === "dark" ? "white" : "black",
                  }}
                >
                  对战结果分析
                </span>
              }
              style={{
                padding: "2vh 1vw",
                height: `calc(50vh + 180px)`,
              }}
            >
              <div
                ref={chartPieRef}
                style={{ width: "100%", height: "50vh" }}
              ></div>
            </Card>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={24}></Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={12}></Col>
          <Col span={12}></Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
          <Col span={24}></Col>
        </Row>
      </Space>
    </Layout>
  );
};

export default AnalysisPage;
