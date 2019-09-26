import React, { useState, useMemo, useEffect } from "react";
import { Site } from "../App";
import styles from "./MarkdownSite.module.css";
import md2wx from "md2wx";
import { Input, Switch, Button, message } from "antd";
import Clipboard from "clipboard";
import "./MarkdownSite.css";

export interface IMarkdownSiteProps {
  setSite: (site: Site) => void;
}

const ApiSite: React.FC<IMarkdownSiteProps> = ({ setSite }) => {
  setSite("others");

  const [text, setText] = useState("");
  const [highlight, setHighlight] = useState(true);

  const html = useMemo(() => md2wx(text, highlight), [text, highlight]);

  useEffect(() => {
    const clipboard = new Clipboard("#button", {
      target: () => document.getElementById("content")!
    });
    clipboard.on("success", () => message.success("复制成功"));
    clipboard.on("error", () => message.error("复制失败"));
    return () => clipboard.destroy();
  });

  return (
    <div className={styles.root}>
      <div className={styles.column}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16
            }}
          >
            <Switch
              checkedChildren="代码高亮"
              unCheckedChildren="代码高亮"
              checked={highlight}
              onChange={setHighlight}
            />
            <Button id="button">复制</Button>
          </div>
          <Input.TextArea
            style={{ resize: "none", flex: 1 }}
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.column}>
        <div id="content" dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </div>
  );
};

export default ApiSite;
