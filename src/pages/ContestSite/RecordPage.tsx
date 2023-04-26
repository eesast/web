import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"
import {
  Table,
  Typography,
  Button,
  message,
  Card
} from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { getUserInfo } from "../../helpers/auth";
//----根据队员信息查找队伍信息------
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/contest.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/contest.graphql";
//----天梯队伍信息------
import type { TableProps } from "antd/lib/table";
//----回放信息------
import { GetRoomInfo, GetRoomInfo_contest_room, GetRoomInfoVariables } from "../../api/types";
import { GetRoomInfo as GETROOMINFO } from "../../api/contest.graphql";
//----插入room和team------
import { QueryContestManager, QueryContestManagerVariables } from "../../api/types"
import { QueryContestManager as QUERY_CONTEST_MANAGER } from "../../api/contest.graphql"
//----删除room和team
import { DeleteRoom, DeleteRoomVariables } from "../../api/types";
import { DeleteRoom as DELETEROOM } from "../../api/contest.graphql";
//————创建thuaicode————
import { GetTeamInfo as GETTEAMINFO } from "../../api/contest.graphql";
import { GetTeamInfo, GetTeamInfoVariables } from "../../api/types";
//————后端发送post————
import axios, { AxiosError } from "axios";
import FileSaver from "file-saver";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";

const { Text } = Typography;

const RecordPage: React.FC = () => {

    const userInfo = getUserInfo();
    const location = useLocation();
    const Contest_id = location.pathname.split("/")[2].replace('}', '');

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

    // ----------------获取比赛管理员---------------
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

    const {
        data: roomListData,
        loading: roomListLoading,
        error: teamListError,
        refetch: refetchRoomList,
    } = useQuery<GetRoomInfo, GetRoomInfoVariables>(GETROOMINFO, {
        variables: {
          contest_id: Contest_id
        }
    });
    useEffect(() => {
        if (teamListError) {
            message.error("获取对战信息失败");
            console.log(teamListError.message);
        }
        })

    // ----------------删除room--------------------
    const [deleteRoom, { error: DeleteRoomError }] = useMutation<
        DeleteRoom,
        DeleteRoomVariables
        >(DELETEROOM);
    useEffect(() => {
        if (DeleteRoomError) {
            message.error("删除对战记录失败");
            console.log(DeleteRoomError.message);
        }
        })

    const teamid =
        isleaderData?.contest_team[0]?.team_id ||
        ismemberData?.contest_team_member[0]?.team_id;
    //利用teamid查询team的信息储存在teamdata中
    const { data: teamData } = useQuery<GetTeamInfo, GetTeamInfoVariables>(
        GETTEAMINFO,
        {
        variables: {
            contest_id: Contest_id,
            team_id: teamid!,
        },
        }
    );

    const teamName = teamData?.contest_team[0]?.team_name || "null";
    const roomListColumns: TableProps<GetRoomInfo_contest_room>["columns"] = [
        {
        title: "对战双方",
        key: "team_name",
        filters: [{
            text: '只看自己',
            value: teamName,
        }],
        onFilter: (value, record) => (record.contest_room_teams[0].contest_team.team_name === value) || (record.contest_room_teams[1].contest_team.team_name === value),
        render: (text, record) => {
            return (
                <Text>
                {record.contest_room_teams[0].contest_team.team_name}<br />
                {record.contest_room_teams[1].contest_team.team_name}
                </Text>
            )
        },
        },
        {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (text, record) => record.status ? "已结束" : "正在进行"
        },

        {
        title: "结果",
        dataIndex: "result",
        key: "result",
        render: (text, record) => record.result ? (<Text>{record.result?.split(",")[0]} <br /> {record.result?.split(",")[1]}</Text>) : ""
        },
        {
        title: "对战时间",
        dataIndex: "created_at",
        key: "created_at",
        render: (text, record) => dayjs(record.created_at).format('M-DD HH:mm:ss'),
        },
        {
        title: "回放下载",
        key: "download",
        render: (text, record) => (
            <Button
            type="primary"
            onClick={() => download(record)}
            disabled={record.status !== true}
            >
            下载
            </Button>
        ),
        },
        {
        title: "",
        key: "delete",
        render: (text, record) => (
            isContestManagerData?.contest_manager.length === 1 ?
            <Button
                shape="circle"
                icon={<MinusOutlined />}
                type="dashed"
                size="small"
                onClick={() => { handleDeleteRoom(record.room_id); }}

            >
            </Button>
            : <div />)
        }
    ];

    const download = async (record: GetRoomInfo_contest_room) => {
        try {
        const response = await axios.get(`room/${record.room_id}`, {
            responseType: "blob",
        });
        FileSaver.saveAs(response.data, record.room_id + ".thuaipb");
        } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 401) {
            message.error("认证失败");
        } else {
            message.error("未知错误");
        }
        }
    };

    const handleDeleteRoom = async (Room_id: string) => {
        await deleteRoom({ variables: { room_id: Room_id } });
        await refetchRoomList();
        if (!DeleteRoomError) {
            message.success("已移除此对战记录");
        }
    }

    return (
        <Card>
            <Table
            loading={roomListLoading}
            dataSource={roomListData?.contest_room}
            columns={roomListColumns}
            rowKey={record => record.room_id}>
            </Table>
        </Card>
    );
}

export default RecordPage;
