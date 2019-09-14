import { Layout, Menu, Icon } from "antd";
import React from "react";
import { Site } from "../App";
import FeedTimeline from "../pages/FeedTimeline";
import styles from "./HomeSite.module.css";
import logo from "../assets/logo.png";
import { Typography } from "antd";
import { ClickParam } from "antd/lib/menu";
import BranchesPage from "../pages/BranchesPage";
const { useState } = React;
const { Header } = Layout;

export interface IHomeSiteProps {
  setSite: (site: Site) => void;
}
type homepageOption = "timelines" | "branches" | "games";

const HomepageOption: (option: string) => homepageOption = option => {
  switch (option) {
    case "timelines":
      return "timelines";
    case "branches":
      return "branches";
    case "games":
      return "games";
    default:
      return "timelines";
  }
};
export interface IHomepageSelections {
  selected: homepageOption;
}

const HomepageOptions: React.FC<IHomepageSelections> = selection => {
  const option = selection.selected;
  switch (option) {
    case "timelines":
      return <FeedTimeline />;
    case "branches":
      return <BranchesPage />;
    default:
      return (
        <div className={styles.root}>
          <img className={styles.logo} alt="logo" src={logo} />
          <Typography.Title level={3}>官网建设中...</Typography.Title>
        </div>
      );
  }
};

const HomeSite: React.FC<IHomeSiteProps> = ({ setSite }) => {
  setSite("home");
  const [currentSelect, setCurrentSelect] = useState<homepageOption>(
    "branches"
  );
  const clickHandler = (e: ClickParam) => {
    setCurrentSelect(HomepageOption(e.key));
  };
  return (
    <Layout
      style={{
        height: "calc(100vh - 64px)"
      }}
    >
      <Header
        style={{
          backgroundColor: "#fff",
          padding: 0,
          display: "flex",
          flexDirection: "row",
          height: 49,
          zIndex: 99
        }}
      >
        <Menu
          onClick={clickHandler}
          selectedKeys={[currentSelect]}
          theme={"light"}
          mode="horizontal"
        >
          <Menu.Item key="timelines">
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
