import { useEffect } from "react";
import { RpcError } from "grpc-web";
import { AvailableServiceClient } from "@/generated/grpc-web/THUAI6/ServicesServiceClientPb";
import * as MessageType from "@/generated/grpc-web/THUAI6/MessageType_pb";
import * as Message2Clients from "@/generated/grpc-web/THUAI6/Message2Clients_pb";
import * as Message2Server from "@/generated/grpc-web/THUAI6/Message2Server_pb";
import { FloatButton, Layout, Modal, Progress, Row } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";
import React from "react";
import { StreamProps } from "../../StreamPage";
import { Unity, useUnityContext } from "react-unity-webgl";
import ReactRouterPrompt from "react-router-prompt";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const THUAI7: React.FC<StreamProps> = ({ streamUrl }) => {
  const projectUrl =
    process.env.REACT_APP_STATIC_URL! + "/public/WebGL/THUAI7/";
  const projectName = "stream";

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

  const [message, setMessage] = React.useState<string>("");

  useEffect(() => {
    const client = new AvailableServiceClient(streamUrl);
    const request = new Message2Server.IDMsg();
    request.setPlayerId(99);
    client.tryConnection(
      request,
      {},
      (error: RpcError, response: Message2Clients.BoolRes) => {
        if (!error) {
          console.log("Success making gRPC call:", response.toObject());
          const spectator = new Message2Server.PlayerMsg();
          spectator.setPlayerId(2024);
          const stream = client.addPlayer(spectator, {});
          stream.on("data", (response) => {
            if (response.getGameState() === MessageType.GameState.GAME_END) {
              stream.cancel();
              console.log("Game Ended.");
            }
            setMessage(JSON.stringify(response.toObject()));
            console.log("Received data from server");
          });
          stream.on("status", (status) => {
            console.log("Received status from server:", status);
          });
          stream.on("error", (error) => {
            console.error("Error making gRPC call:", error);
          });
          stream.on("end", () => {
            console.log("Server ended streaming connection.");
          });
        } else {
          console.error("Error making gRPC call:", error);
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoaded && message.length > 0) {
      sendMessage("UpdateManager", "UpdateMessageByJson", message);
    }
  });

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
            okText="结束直播"
            title="离开页面前，请先结束直播"
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
