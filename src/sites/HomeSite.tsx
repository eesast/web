import React from "react";
import { Site } from "../App";
import styles from "./HomeSite.module.css";
import logo from "../assets/logo.png";
import { Typography } from "antd";

export interface IHomeSiteProps {
  setSite: (site: Site) => void;
}

const HomeSite: React.FC<IHomeSiteProps> = ({ setSite }) => {
  setSite("home");

  return (
    <div className={styles.root}>
      <img className={styles.logo} alt="logo" src={logo} />
      <Typography.Title level={3}>官网建设中...</Typography.Title>
    </div>
  );
};

export default HomeSite;
