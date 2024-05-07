import { Suspense, useEffect, useState } from "react";
import {
  FloatButton,
  Form,
  Layout,
  Modal,
  Progress,
  Row,
  Select,
  message,
} from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";
import React from "react";
import { useUrl } from "@/api/hooks/url";
import { Unity, useUnityContext } from "react-unity-webgl";
import ReactRouterPrompt from "react-router-prompt";
import styled from "styled-components";
import Loading from "@/app/Components/Loading";
import { useNavigate } from "react-router-dom";
import * as graphql from "@/generated/graphql";

const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const THUAI6: React.FC = () => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const room_id = url.query.get("room");
  const playback_speed = url.query.get("speed");

  const { data: scoreteamListData, error: scoreteamListError } =
    graphql.useGetTeamsSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  useEffect(() => {
    if (scoreteamListError) {
      message.error("获取队伍列表失败");
      console.log(scoreteamListError.message);
    }
  });

  const projectUrl =
    process.env.REACT_APP_STATIC_URL! + "/public/WebGL/THUAI6/";
  const projectName = "playback";

  const handleCacheControl = (url: string) => {
    if (url.match(/\.data/) || url.match(/\.wasm/) || url.match(/\.bundle/)) {
      // 可变的资源
      return "must-revalidate";
    }
    if (url.match(/\.mp4/) || url.match(/\.wav/)) {
      // 不变的静态资源
      return "immutable";
    }
    return "no-store";
  };

  const {
    unityProvider,
    sendMessage,
    isLoaded,
    unload,
    requestFullscreen,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: projectUrl + projectName + ".loader.js",
    dataUrl: projectUrl + projectName + ".data",
    frameworkUrl: projectUrl + projectName + ".framework.js",
    codeUrl: projectUrl + projectName + ".wasm",
    streamingAssetsUrl: projectUrl,
    cacheControl: handleCacheControl,
  });

  const handleQuit = async () => {
    try {
      await unload();
      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (room_id === null) {
        sendMessage(
          "InputManager",
          "AfterInputPlaySpeed",
          playback_speed ? playback_speed : "3",
        );
        sendMessage(
          "InputManager",
          "AfterInputFilename",
          projectUrl + "test.thuaipb",
        );
      } else {
        console.log("room_id: ", room_id);
        sendMessage(
          "InputManager",
          "AfterInputPlaySpeed",
          playback_speed ? playback_speed : "3",
        );
        sendMessage(
          "InputManager",
          "AfterInputFilename",
          "https://api.eesast.com/room/" + room_id,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const [jump, setJump] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRefresh = async () => {
    try {
      await form.validateFields();
      if (isLoaded) {
        setJump(true);
        await handleQuit();
      }
      const values = form.getFieldsValue();
      const room_id = `Team_${values.Student}--vs--Team_${values.Tricker}--${values.Map}`;
      navigate(
        url
          .append("room", room_id)
          .append("speed", values.Speed)
          .link("playback"),
      );
      return;
    } catch {
      var errors = form.getFieldsError();
      for (let i = 0; i < 4; i++) {
        if (errors[i].errors.length !== 0) {
          console.log(errors[i].errors[0]);
          return;
        }
      }
    }
  };

  return (
    <Layout>
      <Row>
        {isLoaded === false && (
          <Container>
            <Progress
              type="circle"
              percent={Math.min(
                Math.round(((loadingProgression * 100) / 90) * 99),
                100,
              )}
            />
          </Container>
        )}
        <Unity
          unityProvider={unityProvider}
          css={`
            width: 100%;
            max-width: calc((100vh - 72px) / 9 * 16);
            max-height: calc(100vh - 72px);
            aspect-ratio: 16 / 9;
            padding: 0.9vw 1.6vw;
          `}
        />
      </Row>
      <FloatButton
        icon={<ArrowsAltOutlined />}
        style={{ right: 48 }}
        type="primary"
        onClick={() => {
          requestFullscreen(true);
        }}
      />
      <FloatButton
        description="加载回放"
        badge={{ dot: true }}
        shape="square"
        style={{ right: 112 }}
        onClick={() => {
          setModalVisible(true);
        }}
      />
      <Modal
        open={modalVisible}
        title="又在玩新游戏啊"
        centered
        okText="前往"
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={handleRefresh}
      >
        <Suspense fallback={<Loading />}>
          <Form form={form} name="notice" onFinish={handleRefresh}>
            <Form.Item
              name="Student"
              label="队伍1名称（学生）"
              rules={[{ required: true, message: "请输入队伍1名称" }]}
            >
              <Select
                showSearch
                placeholder="队伍名称"
                style={{ width: 200 }}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                optionFilterProp="children"
                options={(scoreteamListData?.contest_team || []).map((d) => ({
                  value: d.team_id,
                  label: d.team_name,
                  children: d.team_name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="Tricker"
              label="队伍2名称（TRICKER）"
              rules={[{ required: true, message: "请输入队伍2名称" }]}
            >
              <Select
                showSearch
                placeholder="队伍名称"
                style={{ width: 200 }}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                optionFilterProp="children"
                options={(scoreteamListData?.contest_team || []).map((d) => ({
                  value: d.team_id,
                  label: d.team_name,
                  children: d.team_name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="Map"
              label="选择地图"
              rules={[{ required: true, message: "请选择地图" }]}
            >
              <Select
                placeholder="地图"
                style={{ width: 120 }}
                options={[
                  { value: "oldmap", label: "天梯地图" },
                  { value: "newmap", label: "决赛地图" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="Speed"
              label="回放速度"
              rules={[{ required: true, message: "请选择回放速度" }]}
            >
              <Select
                placeholder="倍速"
                style={{ width: 120 }}
                options={[
                  { value: "1", label: "1x" },
                  { value: "2", label: "2x" },
                  { value: "3", label: "3x" },
                  { value: "4", label: "4x" },
                ]}
              />
            </Form.Item>
          </Form>
        </Suspense>
      </Modal>
      <ReactRouterPrompt when={isLoaded && !jump}>
        {({ isActive, onConfirm, onCancel }) => (
          <Modal
            open={isActive}
            cancelText="再看看"
            centered={true}
            okText="结束回放"
            title="离开页面前，请先结束回放"
            onOk={async () => {
              await handleQuit();
              onConfirm();
            }}
            onCancel={onCancel}
            width={320}
          />
        )}
      </ReactRouterPrompt>
    </Layout>
  );
};

export default THUAI6;
