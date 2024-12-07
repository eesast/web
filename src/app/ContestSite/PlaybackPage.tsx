import React, { useEffect } from "react";
import { FloatButton, Layout, Progress, Row, message } from "antd";
// import { FloatButton, Layout, Modal, Progress, Row, message } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { useUrl } from "../../api/hooks/url";
import { Unity, useUnityContext } from "react-unity-webgl";
// import ReactRouterPrompt from "react-router-prompt";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import styled from "styled-components";
import NotImplemented from "./Components/NotImplemented";
import Loading from "../Components/Loading";

/* ---------------- 不随渲染刷新的常量和组件 ---------------- */
const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const projectName = "playback";
/* ---------------- 主⻚⾯ ---------------- */
const PlaybackPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和引⼊的 Hooks ---------------- */
  const [localFilename, setLocalFilename] = React.useState<string>("");
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const room_id = url.query.get("room");
  const playback_speed = url.query.get("speed");
  const isPWA = url.query.get("pwa");
  const openLocalFile = isPWA === "true";
  const competitionOrArena = url.query.has("competition")
    ? "competition"
    : "arena";
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: contestNameData, error: contestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const { data: contestSwitchData, error: contestSwitchError } =
    graphql.useGetContestSwitchQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestNameError) {
      message.error("获取比赛信息失败");
      console.log(contestNameError.message);
    }
  });
  useEffect(() => {
    if (contestSwitchError) {
      message.error("获取比赛状态失败");
      console.log(contestSwitchError.message);
    }
  });
  /* ---------------- 业务逻辑函数 ---------------- */
  const projectUrl = `${process.env.REACT_APP_STATIC_URL!}/public/WebGL/${contestNameData?.contest_by_pk?.name}/`;

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
    // unload,
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

  useEffect(() => {
    if (isLoaded) {
      if (openLocalFile) {
        sendMessage(
          "InputManager",
          "AfterInputPlaySpeed",
          playback_speed ? playback_speed : "3",
        );
        sendMessage("InputManager", "AfterInputFilename", localFilename);
      } else if (room_id) {
        sendMessage(
          "InputManager",
          "AfterInputPlaySpeed",
          playback_speed ? playback_speed : "3",
        );
        sendMessage(
          "InputManager",
          "AfterInputFilename",
          `${process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_DEV_URL! : process.env.REACT_APP_API_URL!}/${competitionOrArena}/playback/${room_id}`,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // const handleQuit = async () => {
  //   try {
  //     await unload();
  //     return;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (!openLocalFile && !room_id) {
      message.warning({
        content: "未选择回放房间号或本地文件",
        key: "failMessage",
      });
    }
  }, [openLocalFile, room_id]);

  if (openLocalFile) {
    if ("launchQueue" in window) {
      console.log("File Handling API is supported!");
      (window.launchQueue as any).setConsumer(async (launchParams: any) => {
        const files = launchParams.files as FileSystemFileHandle[];
        const fileHandle = files[0];
        if (
          fileHandle &&
          fileHandle.name.endsWith(".thuaipb") &&
          fileHandle.kind === "file"
        ) {
          console.log(fileHandle);
          const file = await fileHandle.getFile();
          console.log(file);
          console.log(URL.createObjectURL(file));
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = () => {
            console.log(reader.result);
          };
          setLocalFilename(URL.createObjectURL(file));
        } else {
          message.error("不支持的文件类型");
          console.error("Invalid file type!");
          return <NotImplemented />;
        }
      });
    } else {
      console.error("File Handling API is not supported!");
      return <NotImplemented />;
    }
  }
  /* ---------------- ⻚⾯组件 ---------------- */
  return contestSwitchData ? (
    contestSwitchData?.contest_by_pk?.playback_switch ? (
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
              padding: 0 0;
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
        {/* <ReactRouterPrompt when={isLoaded}>
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
        </ReactRouterPrompt> */}
      </Layout>
    ) : (
      <NotImplemented />
    )
  ) : (
    <Loading />
  );
};

export default PlaybackPage;
