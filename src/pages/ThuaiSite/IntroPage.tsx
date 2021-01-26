import React from "react";
import Center from "../../components/Center";
import { Card } from "antd";
//import { Link } from "react-router-dom";
import { GetTeamName as GET_TEAMNAME } from "../../api/thuai.graphql";
import { GetTeamName } from "../../api/types";
import { useQuery } from "@apollo/client";
//import Loading from "../../components/Loading";
const IntroPage = () => {
  const { data: team } = useQuery<GetTeamName>(GET_TEAMNAME);
  // useEffect(() => {
  //   if (error) {
  //     message.error("加载失败");
  //   }
  // }, [error]);
  // if (loading) {
  //   return <Loading />;
  // }
  //const team = {...data};
  return (
    <Center>
      <Card title={team}></Card>
    </Center>
  );
};

export default IntroPage;
