import React, { useState } from "react";
import {
  Card,
  Collapse,
  CollapseProps,
  Layout,
  List,
  Typography,
  Upload,
  message,
  theme,
} from "antd";
import {
  InboxOutlined,
  CaretRightOutlined,
  CheckOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { ContestProps } from "..";
import * as graphql from "@/generated/graphql";
import { useUrl } from "@/api/hooks/url";
import { useUploadProps } from "@/app/Components/UploadProps";
import { downloadFile } from "@/api/cos";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;
const { Dragger } = Upload;

const UploadWebGL: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const { data: contestNameData } = graphql.useGetContestNameSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const contestName = contestNameData?.contest_by_pk?.name;
  const { uploadProps } = useUploadProps(`public/WebGL/${contestName}`, true);

  const prepareFile = (file: File) => {
    const filenameSplit = file.name.split(".");
    const suffix = filenameSplit.pop();
    if (!["js", "wasm", "data"].includes(suffix!)) {
      message.error("文件类型错误，仅支持js、wasm、data文件");
      return false;
    }
    const result: Promise<File> = new Promise((resolve) => {
      const filename = filenameSplit.shift();
      filenameSplit.push(suffix!);
      if (currentProject && filename !== currentProject.key) {
        message.info(`文件名应以【${currentProject.key}】为前缀，正在自动转换`);
        file = new File(
          [file],
          `${currentProject.key}.${filenameSplit.join(".")}`,
          { type: file.type },
        );
        return resolve(file);
      }
      return resolve(file);
    });
    return result;
  };

  const handleDownload = async (filename: string) => {
    try {
      if (uploadProps.fileList?.some((file) => file.name === `${filename}`)) {
        message.loading(`即将下载${filename}`);
        (await downloadFile(`public/WebGL/${contestName}/${filename}`)) as any;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const WebGLFiles = ({
    projectName,
    suffixes,
  }: {
    projectName: string;
    suffixes: string[];
  }) => {
    return (
      <List
        size="small"
        dataSource={suffixes}
        renderItem={(suffix) => (
          <List.Item
            style={{ padding: "8px" }}
            onClick={() => {
              handleDownload(`${projectName}${suffix}`);
            }}
          >
            <Typography.Text>
              {projectName}
              {suffix}
            </Typography.Text>
            {uploadProps.fileList?.some(
              (file) => file.name === `${projectName}${suffix}`,
            ) ? (
              <CheckOutlined style={{ color: "#3f8600" }} />
            ) : (
              <CloudUploadOutlined style={{ color: "#cf1322" }} />
            )}
          </List.Item>
        )}
      />
    );
  };

  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const suffixes = [".loader.js", ".framework.js", ".wasm", ".data"];
  const webGLprojects: CollapseProps["items"] = [
    {
      key: "playground",
      label: "试玩",
      children: <WebGLFiles projectName="playground" suffixes={suffixes} />,
      style: panelStyle,
    },
    {
      key: "stream",
      label: "直播",
      children: <WebGLFiles projectName="stream" suffixes={suffixes} />,
      style: panelStyle,
    },
    {
      key: "playback",
      label: "回放",
      children: <WebGLFiles projectName="playback" suffixes={suffixes} />,
      style: panelStyle,
    },
  ];
  const [activeKey, setActiveKey] = useState<string | string[]>(["playground"]);
  const currentProject = webGLprojects.find((i) => i.key === activeKey[0]);

  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          WebGL管理
        </Title>
        <Collapse
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={webGLprojects}
        />
        <Dragger
          multiple
          directory
          disabled={!currentProject}
          showUploadList={false}
          beforeUpload={prepareFile}
          {...uploadProps}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            拖拽上传【{currentProject?.label ?? "其它"}】文件
          </p>
          <p className="ant-upload-hint">
            支持同时上传多个文件，也可点击选择文件夹，默认覆盖同名文件
          </p>
        </Dragger>
      </Card>
    </Layout>
  );
};

export default UploadWebGL;
