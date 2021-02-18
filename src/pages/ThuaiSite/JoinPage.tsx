import React, { useEffect } from "react";
import { Table, Card, Row, Col, Layout, Button, message } from "antd";
import { getUserInfo } from "../../helpers/auth";
import { IsTeamLeader, IsTeamLeaderVariables } from "../../api/types";
import { IsTeamLeader as ISTEAMLEADER } from "../../api/thuai.graphql";
import { IsTeamMember, IsTeamMemberVariables } from "../../api/types";
import { IsTeamMember as ISTEAMMEMBER } from "../../api/thuai.graphql";
import { GetAllTeamInfo_thuai, GetAllTeamInfo } from "../../api/types";
import { GetAllTeamInfo as GETALLTEAMINFO } from "../../api/thuai.graphql";
import { useQuery } from "@apollo/client";
import type { TableProps } from "antd/lib/table";
const { Content } = Layout;
const JoinPage: React.FC = () => {
  const userInfo = getUserInfo();
  // var isleader = true;
  // var ismember = true;
  // var [setisleader] = useState(true);
  // var [setismember] = useState(true);
  //var teamid ;
  const { data: isleaderData } = useQuery<IsTeamLeader, IsTeamLeaderVariables>(
    ISTEAMLEADER,
    {
      variables: {
        _id: userInfo?._id!,
      },
    }
  );
  const { data: ismemberData } = useQuery<IsTeamMember, IsTeamMemberVariables>(
    ISTEAMMEMBER,
    {
      variables: {
        _id: userInfo?._id!,
      },
    }
  );
  // useEffect(() => {
  //   setisleader = (!!isleaderData);
  // }, [isleaderData]);
  // const [
  //   selectTeam,
  //   setselectTeam,
  // ] = useState<GetAllTeamInfo_thuai>();
  // const handleApplicationEdit = async () => {
  //   refetchteamList();
  // }
  const {
    data: teamListData,
    loading: teamListLoading,
    error: teamListError,
    //refetch: refetchteamList,
  } = useQuery<GetAllTeamInfo>(GETALLTEAMINFO);
  useEffect(() => {
    if (teamListError) {
      message.error("队伍列表加载失败");
    }
  }, [teamListError]);
  console.log(teamListData);
  const teamListColumns: TableProps<GetAllTeamInfo_thuai>["columns"] = [
    {
      title: "队名",
      dataIndex: "team_name",
      key: "team_name",
      //...getColumnSearchProps("team_name", "队名"),
    },
    {
      title: "队长",
      key: "team_leader",
      render: (text, record) => record.user?.name,
    },
    {
      title: "队员",
      key: "team_member",
      render: (text, record) => record.team_members.map((i) => [i.user.name]),
    },
    {
      title: "队伍简介",
      dataIndex: "team_sum",
      key: "team_sum",
    },
    {
      title: "加入",
      key: "action",
      render: (text, record) => (
        <Row justify="space-around">
          <Col span={8}>
            <Button
              //onClick={() => {}}
              disabled={!!ismemberData && !!isleaderData}
            >
              加入
            </Button>
          </Col>
        </Row>
      ),
    },
  ];
  return (
    <Layout>
      <br />
      <br />
      <Row>
        <Col offset={4}>
          <Card
            hoverable
            css={`
              width: 1000px;
              padding-top: 24px;
              padding-bottom: 12px;
              &.ant-card-bordered {
                cursor: default;
              }
            `}
          >
            <Content>
              <Table
                loading={teamListLoading}
                dataSource={teamListData?.thuai}
                columns={teamListColumns}
              />
            </Content>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default JoinPage;
