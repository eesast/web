import React from "react";
import { ContestProps } from ".";
//import { useUrl } from "../../api/hooks/url";

/* ---------------- 主页面 ---------------- */
const AnalysisPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  //const url = useUrl();
  //const Contest_id = url.query.get("contest");
  return (
    <div style={{ color: mode === "dark" ? "white" : "initial" }}>
      <h1>敬请期待！</h1>
    </div>
  );
};

export default AnalysisPage;
