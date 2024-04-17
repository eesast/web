import React from "react";
import { FloatButton, Layout, Modal, Progress, Row, message } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { useUrl } from "@/api/hooks/url";
import { Unity, useUnityContext } from "react-unity-webgl";
import ReactRouterPrompt from "react-router-prompt";
import styled from "styled-components";
import NotImplemented from "../NotImplemented";

const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const THUAI7: React.FC = () => {
  const url = useUrl();
  const isPWA = url.query.get("pwa");
  const openLocalFile = isPWA === "true";

  const projectUrl =
    process.env.REACT_APP_STATIC_URL! + "/public/WebGL/THUAI7/";
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
    // sendMessage,
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
          const file = await fileHandle.getFile();
          console.log(file);
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = () => {
            console.log(reader.result);
          };
        } else {
          message.error("不支持的文件类型");
          console.error("Invalid file type!");
          return <NotImplemented />;
        }
      });
      return <NotImplemented />;
    } else {
      console.error("File Handling API is not supported!");
      return <NotImplemented />;
    }
  }

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
      <ReactRouterPrompt when={isLoaded}>
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

export default THUAI7;
