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

  const [text, setText] = useState(`
# This is md2wx

## It supports \`$\\LaTeX$\`

> with the help of [\`katex\`](https://github.com/KaTeX/KaTeX)

This is \`$a^2$\`; this is \`$b^2$\`.

How about this one:

\`\`\`math
\\sqrt{a^2+b^2}
\`\`\`

It can convert \`SVG\` to \`PNG\` so you can copy & paste the HTML to WeChat!

## Of course there is code highlighting

\`\`\`
const a = 13;
\`\`\`

---

**Enjoy!**

---

![logo](https://api.eesast.com/static/images/logo.png)
  `);
  const [highlight, setHighlight] = useState(true);

  const html = useMemo(() => md2wx.renderHtml(text, highlight), [
    text,
    highlight
  ]);

  const [pngConverting, setPngConverting] = useState(false);

  const handleConvert = async () => {
    setPngConverting(true);
    await md2wx.convertSvgToPng();
    setPngConverting(false);
    message.success("转换成功");
  };

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
              alignItems: "center",
              marginBottom: 16
            }}
          >
            <div style={{ flex: 1 }}>
              若粘贴到图文窗口后图片部分截断或不显示，请单独复制图片到相应位置
            </div>
            <Switch
              checkedChildren="代码高亮"
              unCheckedChildren="代码高亮"
              checked={highlight}
              onChange={setHighlight}
            />
            <Button
              style={{ marginLeft: 8 }}
              loading={pngConverting}
              onClick={handleConvert}
            >
              转换 SVG 为 PNG
            </Button>
            <Button style={{ marginLeft: 8 }} id="button">
              复制 HTML 到微信
            </Button>
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
