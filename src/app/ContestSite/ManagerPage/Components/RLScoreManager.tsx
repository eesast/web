import React, { useState } from "react";
import {
  Button,
  Card,
  InputNumber,
  Layout,
  message,
  Space,
  Table,
  Typography,
} from "antd";
import { TableProps } from "antd/lib/table";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import axios from "axios";

const { Title } = Typography;

interface ScoreRow {
  team_id: string;
  team_name: string;
  score: number;
}

const RLScoreManager: React.FC = () => {
  const url = useUrl();
  const contest_id = url.query.get("contest")!;
  const [pendingScores, setPendingScores] = useState<Record<string, number>>(
    {},
  );
  const [saving, setSaving] = useState(false);

  const { data, refetch } = graphql.useGetTeamsWithRlScoreSuspenseQuery({
    variables: { contest_id },
  });

  const rows: ScoreRow[] = (data?.contest_team ?? []).map((team) => ({
    team_id: team.team_id,
    team_name: team.team_name,
    score: team.contest_team_RL_scores?.[0]?.score ?? 0,
  }));

  const handleSave = async () => {
    const updates = Object.entries(pendingScores).map(([team_id, score]) => ({
      team_id,
      score,
    }));
    if (updates.length === 0) {
      message.info("没有待保存的修改");
      return;
    }
    setSaving(true);
    try {
      await axios.post("/competition/rl-score/update", {
        contest_id,
        scores: updates,
      });
      message.success("积分更新成功");
      setPendingScores({});
      refetch();
    } catch (err: any) {
      message.error(
        "积分更新失败：" + (err.response?.data?.message ?? err.message),
      );
    } finally {
      setSaving(false);
    }
  };

  const columns: TableProps<ScoreRow>["columns"] = [
    {
      title: "队伍名称",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "当前积分",
      dataIndex: "score",
      key: "score",
      render: (score: number, record) =>
        pendingScores[record.team_id] !== undefined
          ? pendingScores[record.team_id]
          : score,
    },
    {
      title: "修改积分",
      key: "edit",
      render: (_: any, record: ScoreRow) => (
        <InputNumber
          min={0}
          defaultValue={record.score}
          value={
            pendingScores[record.team_id] !== undefined
              ? pendingScores[record.team_id]
              : record.score
          }
          onChange={(value) => {
            if (value !== null) {
              setPendingScores((prev) => ({
                ...prev,
                [record.team_id]: value,
              }));
            }
          }}
        />
      ),
    },
  ];

  return (
    <Layout>
      <Card hoverable style={{ padding: "2vh 1vw", width: "100%" }}>
        <Title level={2} style={{ margin: "0 0 24px" }}>
          RL 积分管理
        </Title>
        <Table
          dataSource={rows}
          columns={columns}
          rowKey="team_id"
          pagination={false}
        />
        <Space style={{ marginTop: 16 }}>
          <Button
            type="primary"
            loading={saving}
            onClick={handleSave}
            disabled={Object.keys(pendingScores).length === 0}
          >
            保存修改
          </Button>
          <Button
            onClick={() => setPendingScores({})}
            disabled={Object.keys(pendingScores).length === 0}
          >
            撤销修改
          </Button>
        </Space>
      </Card>
    </Layout>
  );
};

export default RLScoreManager;
