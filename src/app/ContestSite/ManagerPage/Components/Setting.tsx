import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  message,
  Space,
  Typography,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useUrl } from "../../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from "../..";
/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;
/* ---------------- 主页面 ---------------- */
const Setting: React.FC<ContestProps> = (props) => {
  //获取比赛ID
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [codeDeadline, setCodeDeadline] = useState<Dayjs | null>(null);
  const [deadlineLoading, setDeadlineLoading] = useState(false);

  const {
    data: contestSwitchData,
    error: contestSwitchError,
    refetch: refetchContestSwitch,
  } = graphql.useGetContestSwitchQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const [updateContestSwitch, { error: updateSwitchError }] =
    graphql.useUpdateContestSwitchMutation();

  useEffect(() => {
    if (updateSwitchError) {
      message.error("比赛状态更新失败");
      console.log(updateSwitchError.message);
    }
  }, [updateSwitchError]);

  useEffect(() => {
    if (contestSwitchError) {
      message.error("获取比赛状态失败");
      console.log(contestSwitchError.message);
    }
  }, [contestSwitchError]);

  useEffect(() => {
    if (!Contest_id) return;

    setDeadlineLoading(true);
    axios
      .post("/competition/get_software_contest_ddl", {
        contest_id: Contest_id,
      })
      .then((res) => {
        const deadline = res.data?.data?.deadline;
        setCodeDeadline(deadline ? dayjs(deadline) : null);
      })
      .catch((err) => {
        message.error("获取代码提交截止时间失败");
        console.log(err);
      })
      .finally(() => {
        setDeadlineLoading(false);
      });
  }, [Contest_id]);

  const handleDeadlineSave = async () => {
    if (!Contest_id || !codeDeadline) {
      message.warning("请先选择代码提交截止时间");
      return;
    }

    setDeadlineLoading(true);
    try {
      await axios.post("/competition/set_software_contest_ddl", {
        contest_id: Contest_id,
        deadline: codeDeadline.toISOString(),
      });
      message.success("代码提交截止时间已更新");
    } catch (err: any) {
      message.error(
        "更新代码提交截止时间失败: " +
          (err.response?.data?.error || err.message),
      );
    } finally {
      setDeadlineLoading(false);
    }
  };

  return (
    <Card
      hoverable
      style={{
        padding: "2vh 1vw",
        minHeight: "480px",
      }}
    >
      <Title level={2} style={{ margin: `0 0 36px` }}>
        比赛设置
      </Title>
      <Space direction="vertical" size="large">
        <Checkbox
          checked={contestSwitchData?.contest_by_pk?.team_switch === true}
          onChange={async (e) => {
            await updateContestSwitch({
              variables: {
                contest_id: Contest_id,
                ...contestSwitchData?.contest_by_pk!,
                team_switch: e.target.checked,
              },
            });
            refetchContestSwitch();
          }}
        >
          开放组队
        </Checkbox>
        <Checkbox
          checked={
            contestSwitchData?.contest_by_pk?.code_upload_switch === true
          }
          onChange={async (e) => {
            await updateContestSwitch({
              variables: {
                contest_id: Contest_id,
                ...contestSwitchData?.contest_by_pk!,
                code_upload_switch: e.target.checked,
              },
            });
            refetchContestSwitch();
          }}
        >
          上传代码
        </Checkbox>
        <Checkbox
          checked={contestSwitchData?.contest_by_pk?.arena_switch === true}
          onChange={async (e) => {
            await updateContestSwitch({
              variables: {
                contest_id: Contest_id,
                ...contestSwitchData?.contest_by_pk!,
                arena_switch: e.target.checked,
              },
            });
            refetchContestSwitch();
          }}
        >
          天梯对战
        </Checkbox>
        <Checkbox
          checked={contestSwitchData?.contest_by_pk?.playground_switch === true}
          onChange={async (e) => {
            await updateContestSwitch({
              variables: {
                contest_id: Contest_id,
                ...contestSwitchData?.contest_by_pk!,
                playground_switch: e.target.checked,
              },
            });
            refetchContestSwitch();
          }}
        >
          试玩功能
        </Checkbox>
        <Checkbox
          checked={contestSwitchData?.contest_by_pk?.stream_switch === true}
          onChange={async (e) => {
            await updateContestSwitch({
              variables: {
                contest_id: Contest_id,
                ...contestSwitchData?.contest_by_pk!,
                stream_switch: e.target.checked,
              },
            });
            refetchContestSwitch();
          }}
        >
          直播功能
        </Checkbox>
        <Checkbox
          checked={contestSwitchData?.contest_by_pk?.playback_switch === true}
          onChange={async (e) => {
            await updateContestSwitch({
              variables: {
                contest_id: Contest_id,
                ...contestSwitchData?.contest_by_pk!,
                playback_switch: e.target.checked,
              },
            });
            refetchContestSwitch();
          }}
        >
          回放功能
        </Checkbox>
        <Space direction="vertical" size="small">
          <Typography.Text>代码提交截止时间</Typography.Text>
          <Space>
            <DatePicker
              showTime
              value={codeDeadline}
              onChange={(value) => setCodeDeadline(value)}
              disabled={deadlineLoading}
            />
            <Button
              type="primary"
              loading={deadlineLoading}
              onClick={handleDeadlineSave}
            >
              保存
            </Button>
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

export default Setting;
