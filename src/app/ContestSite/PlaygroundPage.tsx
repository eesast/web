import React, { useEffect } from "react";
import { ContestProps } from ".";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";
import NotImplemented from "./Components/NotImplemented";
//import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Unity, useUnityContext } from "react-unity-webgl";
import {
  message,
  Layout,
  Row,
  //Modal,
  //Form,
  //Select,
  //Spin,
  Progress,
  //FloatButton,
} from "antd";
const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaygroundPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const contest = url.query.get("contest");

  const { data: contestNameData, error: contestNameError } =
    graphql.useGetContestNameSuspenseQuery({
      variables: {
        contest_id: contest,
      },
    });
  useEffect(() => {
    if (contestNameError) {
      message.error("获取比赛信息失败");
      console.log(contestNameError.message);
    }
  });

  const { data: contestSwitchData, error: contestSwitchError } =
    graphql.useGetContestSwitchSubscription({
      variables: {
        contest_id: contest,
      },
    });
  useEffect(() => {
    if (contestSwitchError) {
      message.error("获取比赛状态失败");
      console.log(contestSwitchError.message);
    }
  });

  const projectUrl =
    process.env.REACT_APP_STATIC_URL! +
    `/public/WebGL/${contestNameData?.contest_by_pk?.name ?? "Jump"}/`;
  const projectName = "Playground";

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
    //sendMessage,
    isLoaded,
    //unload,
    //requestFullscreen,
    loadingProgression,
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

  return contestSwitchData?.contest_by_pk?.playground_switch ? (
    // TODO: Copy from PlaybackPage.tsx
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
    </Layout>
  ) : (
    <Container>
      <NotImplemented />
    </Container>
  );
};

export default PlaygroundPage;
