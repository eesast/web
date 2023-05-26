
import React, { useEffect, useState } from "react";
import { useLocation, Prompt } from "react-router-dom"
import {
  Button,
  message,
  Layout,
  Row,
  Col,
  Modal,
} from "antd";
import { ArrowsAltOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import { Unity, useUnityContext } from "react-unity-webgl";

const PlayPage: React.FC = () => {

    const location = useLocation();
    const room_id = location.pathname.split("/")[4];
    console.log("room_id: ", room_id);

    const projectDir = "/WebGL/";
    // const projectName = "JumpJump-Build";
    const projectName = "THUAI6_WebGL";

    const { unityProvider, sendMessage, isLoaded, unload, requestFullscreen } = useUnityContext({
        loaderUrl: projectDir + projectName + ".loader.js",
        dataUrl: projectDir + projectName + ".data",
        frameworkUrl: projectDir + projectName + ".framework.js",
        codeUrl: projectDir + projectName + ".wasm",
        streamingAssetsUrl: projectDir,
    });

    // We'll use a state to store the device pixel ratio.
    const [devicePixelRatio, setDevicePixelRatio] = useState(
        window.devicePixelRatio
    );

    useEffect(() => {
        // A function which will update the device pixel ratio of the Unity
        // Application to match the device pixel ratio of the browser.
        const updateDevicePixelRatio = function () {
            setDevicePixelRatio(window.devicePixelRatio);
        };
        // A media matcher which watches for changes in the device pixel ratio.
        const mediaMatcher = window.matchMedia(
            `screen and (resolution: ${devicePixelRatio}dppx)`
        );
        // Adding an event listener to the media matcher which will update the
        // device pixel ratio of the Unity Application when the device pixel
        // ratio changes.
        mediaMatcher.addEventListener("change", updateDevicePixelRatio);
        return function () {
            // Removing the event listener when the component unmounts.
            mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
        };
        },
        [devicePixelRatio]
    );

    const handleQuit = async () => {
        try{
            await unload();
        } catch (err) {
            message.error(err);
        }
    }

    const [isPrompt, setIsPrompt] = useState(true);

    useEffect(() => {
        if (isLoaded && isPrompt) {
            console.log("isLoaded: ", isLoaded);
            if (typeof(room_id) === "undefined") {
                sendMessage("InputManager", "AfterInputFilename", projectDir + "test.thuaipb");
            }
            else {
                sendMessage("InputManager", "AfterInputFilename", "https://api.eesast.com/room/" + room_id);
            }
        }
    });

    return (
        <Layout>
            <Row>
                <Col span={20}>
                    <Unity
                        unityProvider={unityProvider}
                        css={`
                            width: 960px;
                            height: 540px;
                            margin: auto;
                            margin-top: 45px;
                            margin-left: 80px;
                            margin-right: 80px;
                            margin-bottom: 45px;
                        `}
                        devicePixelRatio={devicePixelRatio}
                        disabledCanvasEvents={["dragstart", "scroll"]}
                    />
                </Col>
                <Col span={4}>
                    <Button
                        shape="circle"
                        icon={<ArrowsAltOutlined />}
                        onClick={() => {
                            requestFullscreen(true);
                        }}
                    >
                    </Button>
                </Col>
            </Row>
            <Prompt
                when={isPrompt}
                message={ (location) => {
                    if (!isPrompt) {
                        return true;
                    }
                    Modal.confirm({
                        icon: <ExclamationCircleOutlined />,
                        content: "离开页面前，请先结束回放",
                        okText: "结束回放",
                        cancelText: "再看看",
                        onOk: () => {
                            handleQuit();
                            setIsPrompt(false);
                        },
                        onCancel: () => {
                            setIsPrompt(true);
                        },
                    });
                    return false;
                }}
            />
        </Layout>

    );
};

export default PlayPage;
