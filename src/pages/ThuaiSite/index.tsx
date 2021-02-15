import React from "react";
// import {
//     useLocation,
//     Link,
//     Switch,
//     Route,
//     useRouteMatch,
// } from "react-router-dom";
import {
  //Tabs,
  //Typography,
  //Divider,
  //Row,
  //Col,
  Menu,
} from "antd";
//const { TabPane } = Tabs;
const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1"];
const ThuaiSite: React.FC = () => {
  // const { path, url } = useRouteMatch();
  // const location = useLocation();
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
    >
      <Menu.Item key="intro">介绍</Menu.Item>
      <Menu.Item key="source">资源与公告</Menu.Item>
      <Menu.Item key="register">报名</Menu.Item>
      <SubMenu key="sub1" title="队伍">
        <Menu.Item key="join">加入</Menu.Item>
        <Menu.Item key="manage">管理</Menu.Item>
      </SubMenu>
      <Menu.Item key="fight">对战</Menu.Item>
    </Menu>
  );
};

export default ThuaiSite;
