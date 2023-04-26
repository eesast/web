import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import {
  Table,
  Button,
  message,
  Dropdown,
  Menu,
  Input,
  Layout,
  Row,
  Col,
  Typography,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { getUserInfo } from "../../helpers/auth";
//----根据队员信息查找队伍信息------
import { GetContestInfo, GetContestInfoVariables} from "../../api/types";
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/contest.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/contest.graphql";
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
import { GetAllTeamInfo_contest_team} from "../../api/types";
import { GetAllTeamInfo_score, GetAllTeamInfo_scoreVariables } from "../../api/types";
import { GetAllTeamInfo_score as GETALLTEAMSCORE } from "../../api/contest.graphql";
//----正在比赛的room信息
import{GetRoomInfo_status, GetRoomInfo_statusVariables} from "../../api/types"
import{GetRoomInfo_status as GETROOMSTATUS} from "../../api/contest.graphql";
//----插入room和team------
import { InsertRoom, InsertRoomVariables } from "../../api/types";
import { InsertRoom as INSERTROOM } from "../../api/contest.graphql";
import { GetContestInfo as GET_CONTEST_INFO } from "../../api/contest.graphql"
//————创建thuaicode————
import { GetTeamInfo as GETTEAMINFO } from "../../api/contest.graphql";
import { GetTeamInfo, GetTeamInfoVariables } from "../../api/types";
//————后端发送post————
import axios from "axios";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";

const ArenaPage: React.FC = () => {

    const userInfo = getUserInfo();
    const location = useLocation();
    const Contest_id = location.pathname.split("/")[2].replace('}', '');

    //-----------------获取天梯队伍信息------------------
    const {
        data: scoreteamListData,
        loading: scoreteamListLoading,
    } = useQuery<GetAllTeamInfo_score, GetAllTeamInfo_scoreVariables>(GETALLTEAMSCORE, {
        variables: {
        contest_id: Contest_id
        }
    });

    const {
        data: roomStatusData,
        error: roomStatusError,
      } = useQuery<GetRoomInfo_status, GetRoomInfo_statusVariables>(GETROOMSTATUS, {
        variables: {
          contest_id: Contest_id
        }
    });
    useEffect(() => {
        if (roomStatusError) {
          message.error("获取对战信息失败");
          console.log(roomStatusError.message);
        }
    })

    const [insertRoom, { error: insertRoomError }] = useMutation<
        InsertRoom,
        InsertRoomVariables
    >(INSERTROOM);

    //-----------------根据队员id查询队伍id------------------
    const { data: isleaderData } = useQuery<IsTeamLeader, IsTeamLeaderVariables>(
        ISTEAMLEADER,
        {
        variables: {
            _id: userInfo?._id!,
            contest_id: Contest_id,
        },
        }
    );
    const { data: ismemberData } = useQuery<IsTeamMember, IsTeamMemberVariables>(
        ISTEAMMEMBER,
        {
        variables: {
            _id: userInfo?._id!,
            contest_id: Contest_id,
        },
        }
    );
    const teamid =
    isleaderData?.contest_team[0]?.team_id ||
    ismemberData?.contest_team_member[0]?.team_id;
    const { data: teamData } = useQuery<GetTeamInfo, GetTeamInfoVariables>(
        GETTEAMINFO,
        {
        variables: {
            contest_id: Contest_id,
            team_id: teamid!,
        },
        }
    );

    // --------------获取比赛状态-------------------
    const {
        data: contestData,
        error: contestError,
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

    // //-----------------获取room信息------------------、
    // const {
    //     data: roomListData,
    //     loading: roomListLoading,
    //     error: teamListError,
    //     refetch: refetchRoomList,
    // } = useQuery<GetRoomInfo, GetRoomInfoVariables>(GETROOMINFO, {
    //     variables: {
    //     contest_id: Contest_id
    //     }
    // });
    // useEffect(() => {
    //     if (teamListError) {
    //     message.error("获取对战信息失败");
    //     console.log(teamListError.message);
    //     }
    // })

    const map_menu = (
        <Menu>
          <Menu.Item key="0" onClick={() => {
            fight(0, false);
            }}>
            我选学生
          </Menu.Item>
          <Menu.Item key="1" onClick={() => {
            fight(0, true);
            }}>
            我选TRICKER
          </Menu.Item>
      </Menu>
    );

    const [opponentTeamId, setTeamId] = useState("");

    const setfight = (record: GetAllTeamInfo_contest_team) => {
        setTeamId(record.team_id);
    };

    // 渲染队伍列表
    const teamListColumns: TableProps<GetAllTeamInfo_contest_team>["columns"] = [
        {
          title: "队名",
          dataIndex: "team_name",
          key: "team_name",
        },
        {
          title: "队长",
          key: "team_leader_id",
          render: (text, record) => record.team_leader_id?.name
        },
        {
          title: "队员",
          key: "team_member",
          render: (text, record) =>
            record.contest_team_members.map((i) => [i.user_as_contest_team_member.name + "   "]),
        },
        {
          title: "队伍简介",
          dataIndex: "team_intro",
          key: "team_intro",
          ellipsis: true,
        },
        {
          title: "分数",
          dataIndex: "score",
          key: "score",
          sorter: (a,b)=> Number(a.score)-Number(b.score),
          defaultSortOrder: "descend",
        },
        {
          title: "对战",
          key: "fight",
          render: (text, record) => (
            <Dropdown overlay={map_menu} trigger={["click"]}
              disabled={
                teamid === record.team_id ||
                teamData?.contest_team[0].status !== "compiled" ||
                record.status !== "compiled" ||
                contestData?.contest[0].status.slice(2, 3) !== "1"
              }
              >
              <Button
                className="ant-dropdown-link"
                onClick={() => {
                  setfight(record)
                }}
              >
                开战！ <DownOutlined />
              </Button>
            </Dropdown>
          ),
        },
    ];

    const fight = (map: number, team: boolean) => {
        // TODO: 下面的代码有点丑陋
        if(roomStatusData?.contest_room.length&&roomStatusData?.contest_room.length > 10){
          message.warning("当前正在进行的比赛过多，请稍后再试");
          return;
        }
        (async () => {
          try {
            //console.log("您："+teamid+"  对手："+opponentTeamId);
            const roomId = await insertRoom({
              variables: {
                contest_id: Contest_id,
                team1_id: teamid,
                team2_id: opponentTeamId,
                created_at: dayjs()!,
              },
            });
            console.log(roomId);
            await axios.post("room", {
              map: map,
              room_id: roomId.data?.insert_contest_room_one?.room_id,
              team_seq: team, // 一个是红队还是蓝队的标记
              exposed: 1
            });
            message.success("已发起对战！");
            message.info("如需观战，可查看记录页面的端口号");
            // refetchRoomList(
            //   {
            //     contest_id: Contest_id
            //   }
            // );
          } catch (e) {
            if (insertRoomError) {
              console.error("make room fail");
              message.error("发起对战失败");
            } else {
              message.error("发起对战失败");
              console.log(e);
            }
          }
        })();
    };

    const [ associatedValue, setAssociatedValue ] = useState("");
    const [ filterParamList, setFilterParamList ] = useState(scoreteamListData?.contest_team);
    useEffect(() => {
      if (associatedValue !== "") {
        setFilterParamList([])
        setFilterParamList(
          scoreteamListData?.contest_team.filter((item) => {
            return item.team_name?.indexOf(associatedValue) !== -1 || item.team_leader_id?.name?.indexOf(associatedValue) !== -1
          })
        )
      }
      else {
        setFilterParamList(scoreteamListData?.contest_team)
      }
    }, [associatedValue, scoreteamListData?.contest_team])

    return (
        <Layout>
            <br/>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Typography.Title level={2}>
                        天梯挑战
                    </Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Typography.Text mark>
                        愈战愈勇，不断优化你的人工智能，去登顶天梯吧！
                    </Typography.Text>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={2}></Col>
                <Col span={10}>
                    <Input
                    value={associatedValue}
                    onChange={e => {
                        setAssociatedValue(e.target.value?.trim())
                    }}
                    placeholder="  队伍名称 / 队长"
                    allowClear
                    prefix={<SearchOutlined/>}>
                    </Input>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Table
                    loading={scoreteamListLoading}
                    dataSource={filterParamList}
                    columns={teamListColumns}
                    rowKey={record => record.team_id}>
                    </Table>
                </Col>
            </Row>
        </Layout>
    );
}

export default ArenaPage;
