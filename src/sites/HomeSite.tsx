import { Layout, Menu, Icon } from "antd";
import React from "react";
import { Site } from "../App";
import FeedNews from "../pages/FeedNews";
import Constants from "../constants";
const { headerHeight, footerHeight, secondaryHeaderHeight } = Constants;
const { useState } = React;
const { Header } = Layout;

export interface IHomeSiteProps {
  setSite: (site: Site) => void;
}
type homepageOption = "news" | "branches" | "games";
export interface IHomepageSelections {
  selected: homepageOption;
}

const HomepageOptions: React.FC<IHomepageSelections> = selection => {
  const option = selection.selected;
  switch (option) {
    case "news":
      return <FeedNews />;
    case "branches":
      return <Layout style={{ padding: "0" }}>branches</Layout>;
    case "games":
      return <Layout style={{ padding: "0" }}>games</Layout>;
    default:
      return <Layout style={{ padding: "0" }}></Layout>;
  }
};

const HomeSite: React.FC<IHomeSiteProps> = ({ setSite }) => {
  setSite("home");
  const [currentSelect, setCurrentSelect] = useState<homepageOption>("news");
  const handleClick = (e: any) => {
    setCurrentSelect(e.key);
  };
  return (
    <Layout
      style={{
        padding: "0",
        height: `calc(100vh - ${headerHeight}px - ${footerHeight}px )`
      }}
    >
      <Header
        style={{
          backgroundColor: "#fff",
          padding: 0,
          display: "flex",
          flexDirection: "row",
          height: secondaryHeaderHeight,
          zIndex: 99
        }}
      >
        <Menu
          onClick={handleClick}
          selectedKeys={[currentSelect]}
          theme={"light"}
          mode="horizontal"
        >
          <Menu.Item key="news">
            <Icon type="switcher" />
            动态
          </Menu.Item>
          <Menu.Item key="branches">
            <Icon type="apartment" />
            部门
          </Menu.Item>
          <Menu.Item key="games">
            <Icon type="team" />
            比赛
          </Menu.Item>
        </Menu>
      </Header>
      <HomepageOptions selected={currentSelect} />
    </Layout>
  );
};

export default HomeSite;
