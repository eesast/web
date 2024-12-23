import React, { useEffect } from "react";
import { ContestProps } from ".";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import NotImplemented from "./Components/NotImplemented";
// import ReactRouterPrompt from "react-router-prompt";
import styled from "styled-components";
import { Unity, useUnityContext } from "react-unity-webgl";
import { message, Layout, Row, Progress, FloatButton } from "antd";
// import { message, Layout, Row, Modal, Progress, FloatButton } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";
import Loading from "../Components/Loading";

/* ---------------- 不随渲染刷新的常量和组件 ---------------- */
const projectName = "playground";
const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/* ---------------- 主⻚⾯ ---------------- */
const PlaygroundPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和引⼊的 Hooks ---------------- */
  const url = useUrl();
  const contest = url.query.get("contest");
  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: contestNameData, error: contestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: contest,
      },
    });

  const { data: contestSwitchData, error: contestSwitchError } =
    graphql.useGetContestSwitchQuery({
      variables: {
        contest_id: contest,
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
  const projectUrl =
    process.env.REACT_APP_STATIC_URL! +
    `/public/WebGL/${contestNameData?.contest_by_pk?.name ?? "Jump"}/`;

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
    isLoaded,
    // unload,
    loadingProgression,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: projectUrl + projectName + ".loader.js",
    dataUrl: projectUrl + projectName + ".data",
    frameworkUrl: projectUrl + projectName + ".framework.js",
    codeUrl: projectUrl + projectName + ".wasm",
    streamingAssetsUrl: projectUrl,
    cacheControl: handleCacheControl,
  });

  // const handleQuit = async () => {
  //   try {
  //     await unload();
  //     return;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  /* ---------------- ⻚⾯组件 ---------------- */
  return contestSwitchData ? (
    contestSwitchData?.contest_by_pk?.playground_switch ? (
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
              okText="结束试玩"
              title="离开页面前，请先结束试玩"
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

export default PlaygroundPage;
