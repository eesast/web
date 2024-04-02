import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  //Input,
  Layout,
  //Menu,
  message,
  Modal,
  Result,
  Row,
  Select,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
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
const SettingPage: React.FC<ContestProps> = ({ mode, user }) => {
  //获取比赛ID
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [battleForm] = Form.useForm();
  const { Option } = Select;

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

  //设置状态:"1":open,"2":close
  //第一位:代码提交
  //第二位:编译
  //第三位:天梯对战
  // const {
  //   data: contestData,
  //   error: contestError,
  //   refetch: refetchContestData,
  // } = graphql.useGetContestInfoSuspenseQuery({
  //   variables: {
  //     contest_id: Contest_id,
  //   },
  // });

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
  const runContest = async (mode: Number, map: string) => {
    try {
      const round_id = await addContestRound({
        variables: {
          contest_id: Contest_id,
          name: mode === 0 ? "单循环赛" : mode === 1 ? "双循环赛" : "测试赛",
          maps: map,
        },
      });

      await axios.post("/competition/start-all", {
        round_id: round_id,
      });

      message.info(
        "正在运行比赛,模式:" +
          (mode === 0 ? "单循环" : mode === 1 ? "双循环" : "测试"),
      );
    } catch (e) {
      message.error("运行比赛失败!");
      console.log(e);
    }
  };

  const handleOk = () => {
    battleForm
      .validateFields()
      .then((values) => {
        const contestNumber =
          values.contest_mode === "single"
            ? 0
            : values.contest_mode === "double"
              ? 1
              : 2;
        const contestMap = values.map_name;
        runContest(contestNumber, contestMap);
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  // const modeMenu = (
  //   <Menu>
  //     <Menu.Item
  //       key="1"
  //       onClick={() => {
  //         runContest(0);
  //       }}
  //     >
  //       单循环
  //     </Menu.Item>
  //     <Menu.Item
  //       key="2"
  //       onClick={() => {
  //         runContest(1);
  //       }}
  //     >
  //       双循环
  //     </Menu.Item>
  //     <Menu.Item
  //       key="3"
  //       onClick={() => {
  //         runContest(2);
  //       }}
  //     >
  //       测试
  //     </Menu.Item>
  //   </Menu>
  // );

  //发起对战
  // const [isBattleModalVisible, setIsBattleModalVisible] =
  //   useState<boolean>(false);
  // const [battleForm] = Form.useForm();

  // const { error: queryTeamIDError, refetch: refetchTeamID } =
  //   graphql.useQueryTeamIdSuspenseQuery({
  //     variables: {
  //       contest_id: Contest_id,
  //       team_name: "",
  //     },
  //   });

  // useEffect(() => {
  //   if (queryTeamIDError) {
  //     message.error("队伍加载失败");
  //     console.log(queryTeamIDError);
  //   }
  // }, [queryTeamIDError]);

  // const handleBattle = async () => {
  //   const values = await battleForm.getFieldsValue();
  //   if (values.team1 === undefined || values.team2 === undefined) {
  //     return;
  //   }

  //   try {
  //     const team1Data = await refetchTeamID({
  //       contest_id: Contest_id,
  //       team_name: values.team1,
  //     });
  //     if (team1Data.data.contest_team.length === 0) {
  //       message.warning("队伍1名称有误，查询失败！");
  //       return;
  //     }
  //     if (team1Data.data.contest_team[0].status !== "compiled") {
  //       message.warning("队伍1未进行编译！");
  //       return;
  //     }
  //     const team2Data = await refetchTeamID({
  //       contest_id: Contest_id,
  //       team_name: values.team2,
  //     });
  //     if (team2Data.data.contest_team.length === 0) {
  //       message.warning("队伍2名称有误，查询失败！");
  //       return;
  //     }
  //     if (team2Data.data.contest_team[0].status !== "compiled") {
  //       message.warning("队伍2未进行编译！");
  //       return;
  //     }
  //     const team1ID = team1Data.data.contest_team[0].team_id;
  //     const team2ID = team2Data.data.contest_team[0].team_id;

  //     await axios.post("room/assign", {
  //       contest_id: Contest_id,
  //       team_id1: team1ID,
  //       team_id2: team2ID,
  //     });
  //     message.success(
  //       "已成功发起对战: " + values.team1 + " VS " + values.team2,
  //     );
  //   } catch (e) {
  //     message.error("发起对战失败");
  //     console.log(e);
  //   }

  //   battleForm.resetFields();
  //   setIsBattleModalVisible(false);
  // };

  return getContestManagersData?.contest_by_pk?.contest_managers.some(
    (manager) => manager.user_uuid === user?.uuid,
  ) ? (
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
              //refetchContestS();
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
              //refetchContestS();
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
              //refetchContestS();
            }}
          >
            试玩模式
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
              //refetchContestS();
            }}
          >
            直播模式
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
              //refetchContestS();
            }}
          >
            回放模式
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
            创建队伍
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
          battleForm.resetFields();
        }}
        onOk={handleOk}
        destroyOnClose
      >
        <Form
          form={battleForm}
          name="battle"
          //onFinish={handleBattle}
          onFinishFailed={(errorInfo: any) => {
            console.log("Failed:", errorInfo);
          }}
          preserve={false}
        >
          <Form.Item
            name="contest_mode"
            label="比赛模式"
            rules={[{ required: true, message: "请选择比赛模式" }]}
          >
            <Select style={{ width: "40%" }} allowClear>
              <Option value="single">单循环赛</Option>
              <Option value="double">双循环赛</Option>
              <Option value="test">测试赛</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="map_name"
            label="比赛地图"
            rules={[{ required: true, message: "请选择比赛地图" }]}
          >
            <Select style={{ width: "40%" }} allowClear>
              {contestMapData?.contest_map.map((map) => (
                <Option key={map.map_id} value={map.name}>
                  {map.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link to={url.link("intro")}>Back To Contest Intro</Link>
        </Button>
      }
    />
  );
};

export default SettingPage;
