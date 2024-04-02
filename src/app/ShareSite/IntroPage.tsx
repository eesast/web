import React from "react";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { PageProps } from "..";
import { useUrl } from "@/api/hooks/url";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

type ResourceProps = {
  image: string;
  title: string;
  text: string;
  link: string;
  reverse?: boolean;
};

const Resource: React.FC<ResourceProps> = ({
  image,
  title,
  text,
  link,
  reverse,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      bordered
      style={{
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "3%",
        borderRadius: "1rem",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ flexDirection: reverse ? "row-reverse" : "row" }}
      >
        <Col span={8}>
          <img
            src={image}
            alt="resource"
            style={{ width: "100%", borderRadius: "1rem" }}
          />
        </Col>
        <Col span={15}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Title level={3}>{title}</Title>
            <Paragraph ellipsis={{ rows: 2, expandable: true }}>
              {text}
            </Paragraph>
            <Button
              type="primary"
              onClick={() =>
                link.includes("http")
                  ? window.open(link, "_blank")
                  : navigate(link)
              }
            >
              <RightCircleOutlined />
              点击进入
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

const IntroPage: React.FC<PageProps> = ({ mode, user }) => {
  const url = useUrl();
  return (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Resource
        image={`${process.env.REACT_APP_STATIC_URL}/public/images/eesast_docs.png`}
        title="EESAST DOCS"
        text="软件部丰富、实用的技术文档，包含C++,C#,HTML,JS等编程语言，Git、WSL等常用工具的使用方法，游戏开发、网站开发等技术的学习资料。"
        link="https://docs.eesast.com/"
      />
      <Resource
        image={`${process.env.REACT_APP_STATIC_URL}/public/images/sast_weekly.jfif`}
        title="SAST Weekly"
        text="SAST Weekly 是由电子工程系学生科协推出的科技系列推送，内容涵盖信息领域技术科普、研究前沿热点介绍、科技新闻跟进探索等多个方面，帮助同学们增长姿势，开拓眼界，每周更新，欢迎关注！"
        link={url.link("weekly")}
      />
      <Resource
        image={`${process.env.REACT_APP_STATIC_URL}/public/images/bilibili_account.png`}
        title="清华大学电子系软件部Bilibili账户"
        text="软件部在Bilibili上的账户，包含软件部的技术培训视频、软件设计比赛的精彩展示视频等。"
        link="https://space.bilibili.com/687960301"
      />
      <Resource
        image={`${process.env.REACT_APP_STATIC_URL}/public/images/electronic_design.png`}
        title="电子设计大赛硬件课程资料"
        text="电子设计大赛是电子系与自动化系联合承办的高水平科技赛事，每年都会为选手提供嵌入式硬件技术培训，帮助选手搭建属于自己的智能小车。这里提供了2021年至今的丰富的课程资料。"
        link="https://obsidian-algebra-843.notion.site/2023-7b054b53f0fd4d588d6f9b7528f9e1ec"
      />
      <Resource
        image={`${process.env.REACT_APP_STATIC_URL}/public/images/eesast_minecraft.png`}
        title="Minecraft服务器"
        text="部署在软件部服务器上的Minecraft服务器，你可以在里面自由的探索！欢迎加入！"
        link={url.link("minecraft")}
      />
    </Space>
  );
};

export default IntroPage;
