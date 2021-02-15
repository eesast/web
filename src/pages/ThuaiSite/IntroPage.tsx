import React from "react";
import Center from "../../components/Center";
import { Card } from "antd";
//import { Link } from "react-router-dom";
import { GetTeamName as GET_TEAMNAME } from "../../api/thuai.graphql";
import { GetTeamName } from "../../api/types";
import { useQuery } from "@apollo/client";
//import { getUserInfo } from "../../helpers/auth";
const IntroPage = () => {
  const { data } = useQuery<GetTeamName>(GET_TEAMNAME);
  //useEffect(() => {
  //   if (error) {
  //     message.error("加载失败");
  //   }
  // }, [error]);
  // if (loading) {
  //   return <Loading />;
  // }
  const team = data?.thuai[0].team_name;
  if (team === undefined) {
    console.log("error");
  }
  return (
    <Center>
      <Card title={team}>{team}</Card>
    </Center>
  );
};

export default IntroPage;
