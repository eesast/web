import React, { useEffect } from "react";
import { Card, Checkbox, message, Space, Typography } from "antd";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from "..";

// 扩展 Props 类型，增加 isHardware
interface SettingProps extends ContestProps {
  isHardware?: boolean;
}

const Setting: React.FC<SettingProps> = (props) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

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
    }
  }, [updateSwitchError]);

  return (
    <Card hoverable style={{ height: "100%" }}>
      <Typography.Title level={2} style={{ margin: `0 0 24px` }}>
        比赛设置
      </Typography.Title>
      <Space direction="vertical">
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

        {/* 如果是硬件设计，隐藏以下所有与 WebGL/对战相关的开关 */}
        {!props.isHardware && (
          <>
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
              天梯功能
            </Checkbox>
            <Checkbox
              checked={
                contestSwitchData?.contest_by_pk?.playground_switch === true
              }
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
              checked={
                contestSwitchData?.contest_by_pk?.playback_switch === true
              }
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
          </>
        )}
      </Space>
    </Card>
  );
};

export default Setting;
