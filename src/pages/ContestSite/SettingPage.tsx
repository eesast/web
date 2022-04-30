import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Dropdown, Form, Input, Layout, Menu, message, Modal, Result, Row, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ForwardOutlined, PlayCircleOutlined } from "@ant-design/icons";
import {
    QueryTeamID as QUERY_TEAM_ID,
    GetContestInfo as GET_CONTEST_INFO,
    QueryContestManager as QUERY_CONTEST_MANAGER,
    UpdateContestStatus as UPDATE_CONTEST_STATUS
} from "../../api/contest.graphql";
import {
    QueryTeamID,
    QueryTeamIDVariables,
    GetContestInfo,
    GetContestInfoVariables,
    QueryContestManager,
    QueryContestManagerVariables,
    UpdateContestStatus,
    UpdateContestStatusVariables
} from "../../api/types";
import { useMutation, useQuery } from "@apollo/client";
import { getUserInfo } from "../../helpers/auth";

const { Text } = Typography;

const SettingPage: React.FC = () => {
    //获取比赛ID
    const location = useLocation()
    const Contest_id = location.pathname.split("/")[2].replace('}', '')
    //获取用户信息
    const userInfo = getUserInfo();

    const {
        data: isContestManagerData,
        error: isContestManagerError
    } = useQuery<QueryContestManager, QueryContestManagerVariables>(QUERY_CONTEST_MANAGER, {
        variables: {
            contest_id: Contest_id,
            user_id: userInfo?._id
        }
    });
    useEffect(() => {
        if (isContestManagerError) {
            message.error("管理员加载失败");
            console.log(isContestManagerError.message)
        }
    }, [isContestManagerError]);

    //设置状态:"1":open,"2":close
    //第一位:代码提交
    //第二位:编译
    //第三位:天梯对战
    const {
        data: contestData,
        error: contestError,
        refetch: refetchContestData
    } = useQuery<GetContestInfo, GetContestInfoVariables>(GET_CONTEST_INFO, {
        variables: {
            contest_id: Contest_id
        }
    });
    useEffect(() => {
        if (contestError) {
            message.error("比赛加载失败");
            console.log(contestError.message);
        }
    }, [contestError]);

    const [
        updateContestStatus,
        { error: updateStatusError }
    ] = useMutation<UpdateContestStatus, UpdateContestStatusVariables>(UPDATE_CONTEST_STATUS);

    useEffect(() => {
        if (updateStatusError) {
            message.error("比赛状态更新失败");
            console.log(updateStatusError.message);
        }
    }, [updateStatusError]);


    //运行比赛
    const runContest = async (mode: Number) => {
        try {
            await axios.post("contest", {
                mode: mode
            });
            message.info("正在运行比赛,模式:" + (mode === 0 ? "单循环" : (mode === 1 ? "双循环" : "测试")));
        } catch (e) {
            message.error("运行比赛失败!");
            console.log(e);
        }

    }

    const modeMenu =
        <Menu>
            <Menu.Item key="1" onClick={() => { runContest(0) }}>
                单循环
            </Menu.Item>
            <Menu.Item key="2" onClick={() => { runContest(1) }}>
                双循环
            </Menu.Item>
            <Menu.Item key="3" onClick={() => { runContest(2) }}>
                测试
            </Menu.Item>
        </Menu>;

    //发起对战
    const [isBattleModalVisible, setIsBattleModalVisible] = useState<boolean>(false);
    const [battleForm] = Form.useForm();

    const {
        error: queryTeamIDError,
        refetch: refetchTeamID
    } = useQuery<QueryTeamID, QueryTeamIDVariables>(QUERY_TEAM_ID, {
        variables: {
            contest_id: Contest_id,
            team_name: ""
        }
    });

    useEffect(() => {
        if (queryTeamIDError) {
            message.error("队伍加载失败");
            console.log(queryTeamIDError);
        }
    }, [queryTeamIDError]);

    const handleBattle = async () => {
        const values = await battleForm.getFieldsValue();
        console.log(values);
        if (values.team1 === undefined || values.team2 === undefined) {
            return;
        }

        try {
            const team1Data = await refetchTeamID({ contest_id: Contest_id, team_name: values.team1 });
            if (team1Data.data.contest_team.length === 0) {
                message.warn("队伍1名称有误，查询失败！");
                return;
            }
            if (team1Data.data.contest_team[0].status !== "compiled") {
                message.warn("队伍1未进行编译！");
                return;
            }
            const team2Data = await refetchTeamID({ contest_id: Contest_id, team_name: values.team2 });
            if (team2Data.data.contest_team.length === 0) {
                message.warn("队伍2名称有误，查询失败！");
                return;
            }
            if (team2Data.data.contest_team[0].status !== "compiled") {
                message.warn("队伍2未进行编译！");
                return;
            }
            const team1ID = team1Data.data.contest_team[0].team_id;
            const team2ID = team2Data.data.contest_team[0].team_id;

            await axios.post("room/assign", {
                team_id1: team1ID,
                team_id2: team2ID
            });
            message.success("已成功发起对战: " + values.team1 + " VS " + values.team2);
        } catch (e) {
            message.error("发起对战失败");
            console.log(e);
        }

        battleForm.resetFields();
        setIsBattleModalVisible(false);
    }
    console.log(contestData?.contest[0].status.slice(0, 1) === '1');

    return (
        (["root", "counselor"].includes(userInfo?.role!) || isContestManagerData?.contest_manager.length === 1) ?
            <Layout>
                <Row justify="center" css={`margin-top:50px`}>
                    <Card
                        hoverable
                        style={{ width: "50%" }}
                        title={<Text css={`
                        font-size:xx-large;
                        font-weight:bold;
                        `}
                        >
                            设置
                        </Text>}
                    >
                        <Row justify="start" css={`margin-top:15px;margin-left:20px`}>
                            <Checkbox
                                checked={contestData?.contest[0].status?.slice(0, 1) === '1'}
                                onChange={async (e) => {
                                    await updateContestStatus({
                                        variables: {
                                            contest_id: Contest_id,
                                            status: (e.target.checked ? "1" : "0") + contestData?.contest[0].status?.slice(1, 3)
                                        }
                                    });
                                    refetchContestData();
                                }}>上传代码</Checkbox>
                        </Row>

                        <Row justify="start" css={`margin-top:15px;margin-left:20px`}>
                            <Checkbox
                                checked={contestData?.contest[0].status?.slice(1, 2) === '1'}
                                onChange={async (e) => {
                                    await updateContestStatus({
                                        variables: {
                                            contest_id: Contest_id,
                                            status: contestData?.contest[0].status?.slice(0, 1) + (e.target.checked ? "1" : "0") + contestData?.contest[0].status?.slice(2, 3)
                                        }
                                    });
                                    refetchContestData();
                                }}>编译代码</Checkbox>
                        </Row>

                        <Row justify="start" css={`margin-top:15px;margin-left:20px`}>
                            <Checkbox
                                checked={contestData?.contest[0].status?.slice(2, 3) === '1'}
                                onChange={async (e) => {
                                    await updateContestStatus({
                                        variables: {
                                            contest_id: Contest_id,
                                            status: contestData?.contest[0].status?.slice(0, 2) + (e.target.checked ? "1" : "0")
                                        }
                                    });
                                    refetchContestData();
                                }}>天梯对战</Checkbox>
                        </Row>

                        <Row justify="start" css={`margin-top:15px`}>
                            <Dropdown
                                overlay={modeMenu}
                                trigger={["click"]}
                            >
                                <Button css={`
                            margin-top: 12px;
                            margin-left: 15px
                            `}
                                    icon={<ForwardOutlined />}>
                                    运行比赛
                                </Button>
                            </Dropdown>
                        </Row>
                        <Row justify="start" css={`margin-top:10px`}>
                            <Button
                                css={`
                            margin-top: 12px;
                            margin-left: 15px
                            `}
                                icon={<PlayCircleOutlined />}
                                onClick={() => { setIsBattleModalVisible(true) }}
                            >
                                发起对战
                            </Button>
                        </Row>
                    </Card>
                </Row>

                <Modal
                    visible={isBattleModalVisible}
                    title="发起对战"
                    centered
                    okText="发起"
                    maskClosable={false}
                    onCancel={() => {
                        setIsBattleModalVisible(false);
                        battleForm.resetFields();
                    }}
                    onOk={handleBattle}
                    destroyOnClose
                >
                    <Form
                        form={battleForm}
                        name="battle"
                        onFinish={handleBattle}
                        onFinishFailed={(errorInfo: any) => {
                            console.log('Failed:', errorInfo);
                        }}
                        preserve={false}
                    >
                        <Form.Item
                            name="team1"
                            label="队伍1"
                            rules={[{ required: true, message: "请输入队伍1" }]}
                        >
                            <Input placeholder="输入队伍1" allowClear />
                        </Form.Item>
                        <Form.Item
                            name="team2"
                            label="队伍2"
                            rules={[{ required: true, message: "请输入队伍2" }]}
                        >
                            <Input placeholder="输入队伍2" allowClear />
                        </Form.Item>
                        <Form.Item name="remark">
                            <Text>
                                PS: 队伍1为红方,队伍2为蓝方
                            </Text>
                        </Form.Item>
                    </Form>
                </Modal>
            </Layout> :
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">
                    <Link to="/contest">Back To ContestPage</Link>
                </Button>}
            />
    );
}

export default SettingPage;
