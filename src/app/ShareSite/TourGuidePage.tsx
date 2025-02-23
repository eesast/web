import React from "react";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { PageProps } from "..";
import { useUrl } from "@/api/hooks/url";
import { useNavigate } from "react-router-dom";

/* ---------------- 接口和类型定义 ---------------- */
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
        margin: "1rem",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "250px",
        justifyContent: "center",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          flexDirection: reverse ? "row-reverse" : "row",
          height: "100%",
        }}
      >
        <Col xs={24} sm={12} md={10}>
          <img
            src={image}
            alt="resource"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "1rem",
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={13}>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Title level={3} style={{ marginBottom: "0.5rem" }}>
              {title}
            </Title>
            <Paragraph style={{ fontSize: "14px", marginBottom: "1rem" }}>
              {text}
            </Paragraph>
            {link && (
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
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title, Paragraph } = Typography;

/* ---------------- 主页面 ---------------- */
const TourGuidePage: React.FC<PageProps> = () => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();

  /* ---------------- 页面组件 ---------------- */
  return (
    <div style={{ padding: "1rem" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12}>
          <Resource
            image={`${process.env.REACT_APP_STATIC_URL}/public/images/help_contest.jpg`}
            title="赛事互动站"
            text="新版官网致力于为所有选手和赛事组织者提供更好的参赛体验，包括试玩功能、数据透视功能、以及全新设计的页面布局，让您轻松上手，玩转比赛！"
            link={url.link("contest/list", "site")}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Resource
            image={`${process.env.REACT_APP_STATIC_URL}/public/images/help_info.jpg`}
            title="信息化平台"
            text="信息化平台是与院系合作建设的学生操作平台，目前囊括了新生导师和奖学金申请功能，未来将覆盖学习生活的更多方面，敬请期待！"
            link={url.link("info/notices", "site")}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Resource
            image={`${process.env.REACT_APP_STATIC_URL}/public/images/help_share.jpg`}
            title="资源共享站"
            text="资源共享站是新版官网整合而成的全新子站，希望为同学们接入更多有趣的资源，包括课程资料、技术分享、以及娱乐活动等，让您的大学生活更加丰富多彩！"
            link={url.link("share/intro", "site")}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Resource
            image={`${process.env.REACT_APP_STATIC_URL}/public/images/help_dark.jpg`}
            title="暗色模式"
            text="此外还有炫酷的暗色模式，既护眼又极客，快来体验一下吧！"
            link=""
          />
        </Col>
      </Row>
    </div>
  );
};

export default TourGuidePage;
