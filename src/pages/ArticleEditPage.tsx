import { IArticle, IAppState, IUser } from "../redux/types/state";
import { useParams, withRouter } from "react-router-dom";
import { getArticle, getArticleByAlias } from "../redux/actions/weekly";
import { connect } from "react-redux";
import md2wx from "md2wx";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { Site } from "../App";
import styles from "./ArticleEditPage.module.css";
import { Input, Switch, Button, message, Upload } from "antd";
import Clipboard from "clipboard";
import { UploadProps } from "antd/lib/upload";
import api from "../api";

interface IArticleEditPageStateProps {
  //   loggedIn?: boolean;
  user: IUser;
  fetching: boolean;
  article: IArticle;
  error?: Error | null;
}

interface IArticleEditPageDispatchProps {
  getArticle: (articleId: number) => void;
  getArticleByAlias: (alias: string) => void;
  // postArticle: (
  //   title: string,
  //   alias: string,
  //   authorId: number,
  //   content: string,
  //   abstract: string,
  //   image: string,
  //   tags: string[]
  // ) => void;
  // updateArticle: (
  //   articleId: number,
  //   title: string,
  //   alias: string,
  //   authorId: number,
  //   content: string,
  //   abstract: string,
  //   image: string,
  //   tags: string[]
  // ) => void;
}

type IArticleEditPageProps = IArticleEditPageStateProps &
  IArticleEditPageDispatchProps;

const ArticleEditPage: React.FC<IArticleEditPageProps> = props => {
  const {
    article,
    user,
    fetching,
    error,
    getArticle,
    getArticleByAlias
  } = props;
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

  const handleImageUpload: UploadProps["onChange"] = async ({ file }) => {
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject();
        };

        reader.onload = () => {
          resolve(reader.result as string);
        };

        reader.readAsDataURL(file.originFileObj!);
      });

      const ref = textAreaRef.current!;
      const newText =
        text + `\n<img alt="${file.name}" src="${dataUrl}" />\n\n`;
      setText(newText);
      ref.focus();
      ref.selectionStart = newText.length;
      ref.selectionEnd = newText.length;
    } catch {
      message.error("图片上传失败");
    }
  };

  const handlePostArticle = async () => {
    const response = await api.postArticle(
      "test",
      "test" + Math.random(),
      user.id,
      text,
      "test",
      "",
      []
    );
    message.success("response:" + response);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
              复制
            </Button>
            <Button onClick={handlePostArticle}>test</Button>
          </div>
          <Input.TextArea
            ref={textAreaRef as any}
            style={{ resize: "none", flex: 1 }}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 16,
              justifyContent: "flex-end"
            }}
          >
            <Upload
              accept="image/*"
              multiple
              showUploadList={false}
              customRequest={() => {}}
              onChange={handleImageUpload}
            >
              <Button>上传图片</Button>
            </Upload>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <div id="content" dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </div>
  );
};

function mapStateToProps(state: IAppState): IArticleEditPageStateProps {
  return {
    user: state.auth.user!,
    fetching: state.weekly.currentArticle.fetching,
    article: state.weekly.currentArticle.item,
    error: state.weekly.currentArticle.error
  };
}

const mapDispatchToProps: IArticleEditPageDispatchProps = {
  getArticle,
  getArticleByAlias
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleEditPage)
);
