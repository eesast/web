import React from "react";
import Center from "../../components/Center";
import { Card } from "antd";
import { GetTeamName as GET_TEAMNAME } from "../../api/thuai.graphql";
import { GetTeamName } from "../../api/types";
import { useQuery } from "@apollo/client";
const IntroPage = () => {
  const { data: nameData } = useQuery<GetTeamName>(GET_TEAMNAME);
  const team = nameData?.thuai[0].team_name;
  return (
    <Center>
      <Card title={team}>"baga"</Card>
    </Center>
  );
};

export default IntroPage;
