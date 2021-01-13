import React from "react";
// import {
//     useLocation,
//     Link,
//     Switch,
//     Route,
//     useRouteMatch,
// } from "react-router-dom";
import {
  Tabs,
  //Typography,
  //Divider,
  //Row,
  //Col
} from "antd";
const { TabPane } = Tabs;
const ThuaiSite: React.FC = () => {
  // const { path, url } = useRouteMatch();
  // const location = useLocation();
  return (
    <Tabs
      tabBarStyle={{
        marginTop: 48,
      }}
      tabPosition="left"
    >
      <TabPane tab="介绍" key="intro"></TabPane>
      <TabPane tab="资源与公告" key="source"></TabPane>
      <TabPane tab="报名" key="register"></TabPane>
      <TabPane tab="队伍" key="team"></TabPane>
      <TabPane tab="对战" key="fight"></TabPane>`
    </Tabs>
  );
};
export default ThuaiSite;
