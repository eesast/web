import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Prompt } from "react-router-dom"
import {
  Button,
  message,
  Layout,
  Row,
  Col,
  Modal,
  Form,
  Select,
} from "antd";
import { ArrowsAltOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import { GetAllTeamInfo_compile, GetAllTeamInfo_compileVariables } from "../../api/types";
import { GetAllTeamInfo_compile as GETALLTEAMCOMPILE } from "../../api/contest.graphql";
import { useQuery } from "@apollo/client";

import { Unity, useUnityContext } from "react-unity-webgl";

const PlayPage: React.FC = () => {

    const location = useLocation();
    const Contest_id = location.pathname.split("/")[2];
    const room_id = location.pathname.split("/")[4];
    const playback_speed = location.pathname.split("/")[5];

    const {
        data: scoreteamListData,
        loading: scoreteamListLoading,
        error: scoreteamListError,
    } = useQuery<GetAllTeamInfo_compile, GetAllTeamInfo_compileVariables>(GETALLTEAMCOMPILE, {
        variables: {
        contest_id: Contest_id
        }
    });
    useEffect(() => {
        if (scoreteamListError) {
          message.error("获取队伍列表失败");
          console.log(scoreteamListError.message);
        }
    })

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
                sendMessage("InputManager", "AfterInputPlaySpeed", playback_speed? playback_speed: "3");
                sendMessage("InputManager", "AfterInputFilename", projectDir + "test.thuaipb");
            }
            else {
                console.log("room_id: ", room_id);
                sendMessage("InputManager", "AfterInputPlaySpeed", playback_speed? playback_speed: "3");
                sendMessage("InputManager", "AfterInputFilename", "https://api.eesast.com/room/" + room_id);
            }
        }
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const history = useHistory();

    const handleRefresh = async () => {
        form.validateFields();
        if (form.getFieldsError()){
            message.error("请正确填写表单");
            return;
        }
        const values = form.getFieldsValue();
        const room_id = `Team_${values.Student}--vs--Team_${values.Tricker}--${values.Map}`;
        history.push(`/contest/${Contest_id}/play/${room_id}/${values.Speed}`);
        return history.go(0);
    };

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
                        // disabledCanvasEvents={["dragstart", "scroll"]}
                    />
                </Col>
                <Col span={1}>
                    <Button
                        shape="circle"
                        css={`
                            margin-top: 25px;
                        `}
                        icon={<ArrowsAltOutlined />}
                        onClick={() => {
                            requestFullscreen(true);
                        }}
                    >
                    </Button>
                </Col>
                <Col span={3}>
                    <Button
                        css={`
                            margin-top: 25px;
                        `}
                        onClick={() => {
                            handleQuit();
                            setIsPrompt(false);
                            setModalVisible(true);
                        }}
                    >
                        加载决赛回放
                    </Button>
                </Col>
            </Row>
            <Modal
                visible={modalVisible}
                title={"又在玩新游戏啊"}
                centered
                okText="前往"
                onCancel={() => {
                setModalVisible(false);
                form.resetFields();
                history.go(0);
                }}
                onOk={handleRefresh}
                // maskClosable={true}
                // destroyOnClose
            >
                <Form
                form={form}
                name="notice"
                onFinish={handleRefresh}
                >
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
                        showArrow={false}
                        loading={scoreteamListLoading}
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
                        showArrow={false}
                        loading={scoreteamListLoading}
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
                            { value: 'oldmap', label: '天梯地图' },
                            { value: 'newmap', label: '决赛地图' },
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
                            { value: '1', label: '1x' },
                            { value: '2', label: '2x' },
                            { value: '3', label: '3x' },
                            { value: '4', label: '4x' },
                        ]}
                    />
                </Form.Item>
                </Form>
            </Modal>
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
