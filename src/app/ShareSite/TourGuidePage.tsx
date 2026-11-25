import React from "react";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { PageProps } from "..";
import { useUrl } from "@/api/hooks/url";
import { useNarrow } from "@/api/hooks/narrow";
import { useNavigate } from "react-router-dom";

/* ---------------- 接口和类型定义 ---------------- */
type ResourceProps = {
  image: string;
  title: string;
  text: string;
  link: string;
  reverse?: boolean;
  mode?: string;
  narrow?: boolean;
};

/* ---------------- 手机端：图片铺满白卡，文字压在下部，遮住的图片做模糊 ---------------- */
// 图片按「左右优先」铺满：宽度撑满卡片，纵向按比例裁切
const TourImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  pointer-events: none;
  user-select: none;
`;

// 文字区：贴底、整幅宽，backdrop-filter 只模糊它自己盖住的那块图片
const TourText = styled.div<{ $light: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px 14px;
  background-color: ${(p) =>
    p.$light ? "rgba(255, 255, 255, 0.76)" : "rgba(0, 0, 0, 0.55)"};
  border-top: 1px solid
    ${(p) =>
      p.$light ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.12)"};
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  backdrop-filter: blur(14px) saturate(150%);
`;

const TourTitle = styled.div<{ $light: boolean }>`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  color: ${(p) =>
    p.$light ? "rgba(0, 0, 0, 0.88)" : "rgba(255, 255, 255, 0.92)"};
`;

const TourParagraph = styled(Typography.Paragraph)<{ $light: boolean }>`
  && {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: ${(p) =>
      p.$light ? "rgba(0, 0, 0, 0.66)" : "rgba(255, 255, 255, 0.72)"};
  }
`;

const Resource: React.FC<ResourceProps> = ({
  image,
  title,
  text,
  link,
  reverse,
  mode,
  narrow,
}) => {
  const navigate = useNavigate();

  const open = () =>
    link.includes("http") ? window.open(link, "_blank") : navigate(link);

  /* ---------------- 手机端 ---------------- */
  if (narrow) {
    const light = mode === "light";

    return (
      <Card
        variant="outlined"
        style={{
          // 白卡尺寸保持不变，只是换成图片打底
          margin: "1rem",
          borderRadius: "1rem",
          height: "250px",
          position: "relative",
          overflow: "hidden",
        }}
        styles={{ body: { padding: 0, height: "100%" } }}
      >
        <TourImage src={image} alt={title} />
        <TourText $light={light}>
          <TourTitle $light={light}>{title}</TourTitle>
          <TourParagraph $light={light}>{text}</TourParagraph>
          {link && (
            <Button
              type="primary"
              onClick={open}
              style={{ alignSelf: "flex-start", marginTop: "2px" }}
            >
              <RightCircleOutlined />
              点击进入
            </Button>
          )}
        </TourText>
      </Card>
    );
  }

  /* ---------------- 桌面端（保持原样） ---------------- */
  return (
    <Card
      variant="outlined"
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
              <Button type="primary" onClick={open}>
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
const TourGuidePage: React.FC<PageProps> = ({ mode }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const isNarrow = useNarrow();

  /* ---------------- 页面组件 ---------------- */
  return (
    <div style={{ padding: "1rem" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12}>
          <Resource
            narrow={isNarrow}
            mode={mode}
            image={`${process.env.REACT_APP_STATIC_URL}/public/images/help_contest.jpg`}
            title="赛事互动站"
            text="新版官网致力于为所有选手和赛事组织者提供更好的参赛体验，包括试玩功能、数据透视功能、以及全新设计的页面布局，让您轻松上手，玩转比赛！"
            link={url.link("contest/list", "site")}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Resource
            narrow={isNarrow}
            mode={mode}
            image={`${process.env.REACT_APP_STATIC_URL}/public/images/help_info.jpg`}
            title="信息化平台"
            text="信息化平台是与院系合作建设的学生操作平台，目前囊括了新生导师和奖学金申请功能，未来将覆盖学习生活的更多方面，敬请期待！"
            link={url.link("info/notices", "site")}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Resource
            narrow={isNarrow}
            mode={mode}
            image={`${process.env.REACT_APP_STATIC_URL}/public/images/help_share.jpg`}
            title="资源共享站"
            text="资源共享站是新版官网整合而成的全新子站，希望为同学们接入更多有趣的资源，包括课程资料、技术分享、以及娱乐活动等，让您的大学生活更加丰富多彩！"
            link={url.link("share/intro", "site")}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Resource
            narrow={isNarrow}
            mode={mode}
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
