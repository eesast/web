import React from "react";
import Center from "../../components/Center";
import { Card } from "antd";
//import { Link } from "react-router-dom";
import { GetTeamName as GET_TEAMNAME } from "../../api/thuai.graphql";
import { GetTeamName } from "../../api/types";
import { useQuery } from "@apollo/client";
//import { getUserInfo } from "../../helpers/auth";
const IntroPage = () => {
  //const { data } = useQuery<GetTeamName>(GET_TEAMNAME);
  const {
    //error: nameError,
    data: nameData,
  } = useQuery<GetTeamName>(GET_TEAMNAME);
  const team = nameData?.thuai[0].team_name;
  // try {
  //   const team = nameData?.thuai[0].team_name;
  // }catch(e){
  //   if(nameError){
  //     console.log("error");
  //   }
  // }

  return (
    <Center>
      <Card title={team}>"baga"</Card>
    </Center>
  );
};

export default IntroPage;
