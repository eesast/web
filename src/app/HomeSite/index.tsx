import React, { Suspense, useEffect, useRef, useState } from "react";
import { Layout, Spin, Card, Tooltip } from "antd";
import styled from "styled-components";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import NewsPage from "./NewsPage";
import NotFoundPage from "../Components/NotFound";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";

// 类型接口
interface CardComponentProps {
  onClick: () => void;
  imageSrc?: string;
  text: string;
}

// 滚动容器的共同属性
interface ScrollContainerProps {
  children: React.ReactNode;
  scrollSpeed?: number;
  pauseOnHover?: boolean;
}

// 基础容器样式
const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 滚动容器样式
const ScrollContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding: 0;
  display: flex;
  gap: 16px;
  height: auto;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex-shrink: 0;
    width: 350px;
    height: 490px;
  }
`;

// 卡片组件样式
const StyledCard = styled(Card)<{ hasImage?: boolean }>`
  width: 350px;
  height: 490px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardComponent: React.FC<CardComponentProps> = ({
  onClick,
  imageSrc,
  text,
}) => (
  <Tooltip title={"点击查看详情"}>
    <StyledCard onClick={onClick} hasImage={!!imageSrc}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={text}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
          }}
        />
      )}
    </StyledCard>
  </Tooltip>
);

const InfiniteScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  scrollSpeed = 0.5, // 默认滚动速度
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling] = useState(false);
  const [content, setContent] = useState<React.ReactNode[]>([]); // To hold original and cloned content
  const isPaused = useRef(false);
  const animationFrameRef = useRef<number>(null);

  useEffect(() => {
    // Set the content (original + duplicate) only when the children change
    setContent((prev) => [
      ...React.Children.toArray(children),
      ...React.Children.toArray(children), // duplicate content for scrolling effect
    ]);
  }, [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll animation function
    const scrollAnimation = () => {
      if (!isPaused.current && !isScrolling && container) {
        container.scrollLeft += scrollSpeed;

        // When scroll reaches the half point, reset to the start for infinite effect
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameRef.current = requestAnimationFrame(scrollAnimation);
    };

    // Event listeners to pause scrolling on hover
    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => {
        isPaused.current = true;
      });
      container.addEventListener("mouseleave", () => {
        isPaused.current = false;
      });
    }

    // Start scroll animation
    animationFrameRef.current = requestAnimationFrame(scrollAnimation);

    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollSpeed, pauseOnHover, isScrolling]);

  return <ScrollContainer ref={containerRef}>{content}</ScrollContainer>;
};

// 标题组件样式
const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 4px solid #1890ff;
`;

// 主页面组件
const HomeSite: React.FC<PageProps> = ({ mode, user }) => {
  const url = useUrl();
  const navigate = useNavigate();
  const { Content } = Layout;

  // 加载组件
  const Loading = () => (
    <Container>
      <Spin size="large" />
    </Container>
  );

  // 导航处理函数
  const handleCardClick = (type: "division" | "contest", tab: string) => {
    navigate(`/share/${type}`, {
      replace: true,
      state: { tab },
    });
  };

  return (
    <Layout>
      <Content>
        {/* 路由配置 */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={url.link("news")} />} />
            <Route path="news" element={<NewsPage mode={mode} user={user} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <br />
        <br />

        {/* 内容区域 */}
        <div style={{ width: "100%", maxWidth: "90vw", margin: "0 auto" }}>
          {/* 部门展示区 */}
          <SectionTitle>部门</SectionTitle>
          <InfiniteScrollContainer scrollSpeed={1.5}>
            {/* 部门卡片 */}
            <CardComponent
              onClick={() => handleCardClick("division", "1")}
              imageSrc="/software_cover.jpg"
              text="软件部"
            />
            <CardComponent
              onClick={() => handleCardClick("division", "2")}
              imageSrc="/hardware_cover.jpg"
              text="硬件部"
            />
            <CardComponent
              onClick={() => handleCardClick("division", "3")}
              imageSrc="/project_cover.jpg"
              text="项目部"
            />
            <CardComponent
              onClick={() => handleCardClick("division", "4")}
              imageSrc="/training_cover.jpg"
              text="学培部"
            />
            <CardComponent
              onClick={() => handleCardClick("division", "5")}
              imageSrc="/publicity_cover.jpg"
              text="宣策部"
            />
          </InfiniteScrollContainer>

          <br />
          <br />

          {/* 比赛展示区
          <SectionTitle>比赛</SectionTitle>
          <InfinteScrollContainer scrollSpeed={1}>
            <CardComponent
              onClick={() => handleCardClick('contest', "1")}
              imageSrc="/team_cover.jpg"
              text="队式程序设计大赛"
            />
            <CardComponent
              onClick={() => handleCardClick('contest', "2")}
              imageSrc="/hard_cover.jpg"
              text="硬件设计大赛"
            />
            <CardComponent
              onClick={() => handleCardClick('contest', "3")}
              imageSrc="/soft_cover.jpg"
              text="软件设计大赛"
            />
            <CardComponent
              onClick={() => handleCardClick('contest', "4")}
              imageSrc="/drone_cover.jpg"
              text="智能无人机挑战赛"
            />
            <CardComponent
              onClick={() => handleCardClick('contest', "5")}
              imageSrc="/knowledge_cover.jpg"
              text="新生知识竞赛"
            />
            <CardComponent
              onClick={() => handleCardClick('contest', "6")}
              imageSrc="/challenge_cover.jpg"
              text="挑战杯"
            />
            <CardComponent
              onClick={() => handleCardClick('contest', "7")}
              imageSrc="/electronic_cover.jpg"
              text="电子设计大赛"
            />
          </InfinteScrollContainer> */}
        </div>
      </Content>
    </Layout>
  );
};

export default HomeSite;
