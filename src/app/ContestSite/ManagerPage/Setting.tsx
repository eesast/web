import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import { ForwardOutlined } from "@ant-design/icons";
import { useUrl } from "../../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from "..";
// import { sharing } from "webpack";
// import { run } from "node:test";
/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Text } = Typography;
/* ---------------- 主页面 ---------------- */
const SettingPage: React.FC<ContestProps> = (props) => {
  //获取比赛ID
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [runForm] = Form.useForm();
  const { Option } = Select;

  const { data: contestMapData, error: contestMapError } =
    graphql.useGetContestMapsQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: contestSwitchData, error: contestSwitchError } =
    graphql.useGetContestSwitchSubscription({
      variables: {
        contest_id: Contest_id,
      },
    });

  const [updateContestSwitch, { error: updateSwitchError }] =
    graphql.useUpdateContestSwitchMutation();

  const [addContestRound, { error: addRoundError }] =
    graphql.useAddContestRoundMutation();

  useEffect(() => {
    if (updateSwitchError) {
      message.error("比赛状态更新失败");
      console.log(updateSwitchError.message);
    }
  }, [updateSwitchError]);

  useEffect(() => {
    if (addRoundError) {
      message.error("比赛轮次添加失败");
      console.log(addRoundError.message);
    }
  }, [addRoundError]);

  useEffect(() => {
    if (contestSwitchError) {
      message.error("获取比赛状态失败");
      console.log(contestSwitchError.message);
    }
  }, [contestSwitchError]);

  useEffect(() => {
    if (contestMapError) {
      message.error("比赛地图加载失败");
      console.log(contestMapError.message);
    }
  }, [contestMapError]);

  //运行比赛
  const runContest = async (map_name: string, map_uuid: string) => {
    try {
      const round_id = await addContestRound({
        variables: {
          contest_id: Contest_id,
          name: map_name,
          map_id: map_uuid,
        },
      });

      await axios.post("/competition/start-all", {
        round_id: round_id,
      });

      message.info("正在运行比赛:" + map_name);
    } catch (e) {
      message.error("运行比赛失败!");
      console.log(e);
    }
  };

  const handleRunContest = () => {
    runForm
      .validateFields()
      .then((values) => {
        const contestName = values.contest_name;
        const contestMapId = values.map_id;
        runContest(contestName, contestMapId);
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

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
            比赛设置
          </Text>
        }
      >
        <Row
          justify="start"
          css={`
            margin-top: 30px;
            margin-left: 20px;
          `}
        >
          <Checkbox
            checked={contestSwitchData?.contest_by_pk?.team_switch === true}
            onChange={async (e) => {
              await updateContestSwitch({
                variables: {
                  contest_id: Contest_id,
                  code_upload_switch:
                    contestSwitchData?.contest_by_pk?.code_upload_switch!,
                  arena_switch: contestSwitchData?.contest_by_pk?.arena_switch!,
                  playground_switch:
                    contestSwitchData?.contest_by_pk?.playground_switch!,
                  stream_switch:
                    contestSwitchData?.contest_by_pk?.stream_switch!,
                  playback_switch:
                    contestSwitchData?.contest_by_pk?.playback_switch!,
                  team_switch: e.target.checked,
                },
              });
              //refetchContestS();
            }}
          >
            开放组队
          </Checkbox>
        </Row>

        <Row
          justify="start"
          css={`
            margin-top: 30px;
            margin-left: 20px;
          `}
        >
          <Checkbox
            checked={
              contestSwitchData?.contest_by_pk?.code_upload_switch === true
            }
            onChange={async (e) => {
              await updateContestSwitch({
                variables: {
                  contest_id: Contest_id,
                  code_upload_switch: e.target.checked,
                  arena_switch: contestSwitchData?.contest_by_pk?.arena_switch!,
                  playground_switch:
                    contestSwitchData?.contest_by_pk?.playground_switch!,
                  stream_switch:
                    contestSwitchData?.contest_by_pk?.stream_switch!,
                  playback_switch:
                    contestSwitchData?.contest_by_pk?.playback_switch!,
                  team_switch: contestSwitchData?.contest_by_pk?.team_switch!,
                },
              });
            }}
          >
            上传代码
          </Checkbox>
        </Row>

        <Row
          justify="start"
          css={`
            margin-top: 30px;
            margin-left: 20px;
          `}
        >
          <Checkbox
            checked={contestSwitchData?.contest_by_pk?.arena_switch === true}
            onChange={async (e) => {
              await updateContestSwitch({
                variables: {
                  contest_id: Contest_id,
                  code_upload_switch:
                    contestSwitchData?.contest_by_pk?.code_upload_switch!,
                  arena_switch: e.target.checked,
                  playground_switch:
                    contestSwitchData?.contest_by_pk?.playground_switch!,
                  stream_switch:
                    contestSwitchData?.contest_by_pk?.stream_switch!,
                  playback_switch:
                    contestSwitchData?.contest_by_pk?.playback_switch!,
                  team_switch: contestSwitchData?.contest_by_pk?.team_switch!,
                },
              });
            }}
          >
            天梯对战
          </Checkbox>
        </Row>

        <Row
          justify="start"
          css={`
            margin-top: 30px;
            margin-left: 20px;
          `}
        >
          <Checkbox
            checked={
              contestSwitchData?.contest_by_pk?.playground_switch === true
            }
            onChange={async (e) => {
              await updateContestSwitch({
                variables: {
                  contest_id: Contest_id,
                  code_upload_switch:
                    contestSwitchData?.contest_by_pk?.code_upload_switch!,
                  arena_switch: contestSwitchData?.contest_by_pk?.arena_switch!,
                  playground_switch: e.target.checked,
                  stream_switch:
                    contestSwitchData?.contest_by_pk?.stream_switch!,
                  playback_switch:
                    contestSwitchData?.contest_by_pk?.playback_switch!,
                  team_switch: contestSwitchData?.contest_by_pk?.team_switch!,
                },
              });
            }}
          >
            试玩功能
          </Checkbox>
        </Row>

        <Row
          justify="start"
          css={`
            margin-top: 30px;
            margin-left: 20px;
          `}
        >
          <Checkbox
            checked={contestSwitchData?.contest_by_pk?.stream_switch === true}
            onChange={async (e) => {
              await updateContestSwitch({
                variables: {
                  contest_id: Contest_id,
                  code_upload_switch:
                    contestSwitchData?.contest_by_pk?.code_upload_switch!,
                  arena_switch: contestSwitchData?.contest_by_pk?.arena_switch!,
                  playground_switch:
                    contestSwitchData?.contest_by_pk?.playground_switch!,
                  stream_switch: e.target.checked,
                  playback_switch:
                    contestSwitchData?.contest_by_pk?.playback_switch!,
                  team_switch: contestSwitchData?.contest_by_pk?.team_switch!,
                },
              });
            }}
          >
            直播功能
          </Checkbox>
        </Row>

        <Row
          justify="start"
          css={`
            margin-top: 30px;
            margin-left: 20px;
          `}
        >
          <Checkbox
            checked={contestSwitchData?.contest_by_pk?.playback_switch === true}
            onChange={async (e) => {
              await updateContestSwitch({
                variables: {
                  contest_id: Contest_id,
                  code_upload_switch:
                    contestSwitchData?.contest_by_pk?.code_upload_switch!,
                  arena_switch: contestSwitchData?.contest_by_pk?.arena_switch!,
                  playground_switch:
                    contestSwitchData?.contest_by_pk?.playground_switch!,
                  stream_switch:
                    contestSwitchData?.contest_by_pk?.stream_switch!,
                  playback_switch: e.target.checked,
                  team_switch: contestSwitchData?.contest_by_pk?.team_switch!,
                },
              });
            }}
          >
            回放功能
          </Checkbox>
        </Row>

        <Row
          justify="start"
          css={`
            margin-top: 15px;
          `}
        >
          <Button
            type="primary"
            css={`
              margin-top: 20px;
              margin-left: 15px;
            `}
            icon={<ForwardOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            运行比赛
          </Button>
        </Row>
        <Row
          justify="start"
          css={`
            margin-top: 10px;
          `}
        ></Row>
      </Card>
      <Modal
        open={isModalVisible}
        title="运行比赛"
        centered
        okText="运行"
        maskClosable={false}
        onCancel={() => {
          setIsModalVisible(false);
          runForm.resetFields();
        }}
        onOk={handleRunContest}
        destroyOnClose
      >
        <Form
          form={runForm}
          name="battle"
          onFinishFailed={(errorInfo: any) => {
            console.log("Failed:", errorInfo);
          }}
          preserve={false}
        >
          <Form.Item
            name="contest_name"
            label="本轮比赛名称"
            rules={[{ required: true, message: "请输入比赛名称" }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="map_id"
            label="比赛地图"
            rules={[{ required: true, message: "请选择比赛地图" }]}
          >
            <Select style={{ width: "40%" }} allowClear>
              {contestMapData?.contest_map.map((map) => (
                <Option key={map.map_id} value={map.map_id}>
                  {map.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default SettingPage;
