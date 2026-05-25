import React from "react";
import { Layout, Table, Typography } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { TableProps } from "antd/lib/table";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";

const { Title } = Typography;

const RLScorePage: React.FC<ContestProps> = () => {
  const url = useUrl();
  const contest_id = url.query.get("contest");

  const { data } = graphql.useGetRlScoresSuspenseQuery({
    variables: { contest_id },
  });

  const rows = (data?.contest_team_RL_score ?? []).map((entry, index) => ({
    rank: index + 1,
    team_id: entry.team_id,
    team_name: entry.contest_team?.team_name ?? "",
    leader: entry.contest_team?.team_leader?.realname ?? "",
    members:
      entry.contest_team?.contest_team_members
        ?.map((m) => m.user.realname)
        .join("、") ?? "",
    score: entry.score ?? 0,
  }));

  const columns: TableProps<(typeof rows)[0]>["columns"] = [
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      render: (rank: number) => {
        if (rank === 1)
          return (
            <span style={{ color: "#faad14", fontWeight: "bold" }}>🥇 1</span>
          );
        if (rank === 2)
          return (
            <span style={{ color: "#bfbfbf", fontWeight: "bold" }}>🥈 2</span>
          );
        if (rank === 3)
          return (
            <span style={{ color: "#ad6800", fontWeight: "bold" }}>🥉 3</span>
          );
        return rank;
      },
    },
    {
      title: "队伍名称",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "队长",
      dataIndex: "leader",
      key: "leader",
    },
    {
      title: "成员",
      dataIndex: "members",
      key: "members",
    },
    {
      title: "积分",
      dataIndex: "score",
      key: "score",
      align: "right",
      render: (score: number) => (
        <span style={{ fontWeight: "bold", fontSize: 16 }}>{score}</span>
      ),
    },
  ];

  return (
    <Layout style={{ padding: "4vh 4vw" }}>
      <Title level={2}>
        <TrophyOutlined style={{ marginRight: 8 }} />
        积分榜
      </Title>
      <Table
        dataSource={rows}
        columns={columns}
        rowKey="team_id"
        pagination={false}
      />
    </Layout>
  );
};

export default RLScorePage;
