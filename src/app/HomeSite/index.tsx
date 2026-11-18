import React, { Suspense, useEffect, useRef, useState } from "react";
import { Layout, Spin, Card, Tooltip } from "antd";
import styled from "styled-components";
import {
  Route,
  Navigate,
  Routes,
  useNavigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import NewsPage from "./NewsPage";
import NotFoundPage from "../Components/NotFound";
import { useUrl } from "../../api/hooks/url";
import { useNarrow } from "../../api/hooks/narrow";
import { PageProps } from "..";
import DisplayWall from "./DisplayWall";

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

/* ---------------- 手机端：部门手风琴 ---------------- */

// key 与 DivisionPage 的 Tab 一一对应
const divisions = [
  { key: "1", name: "软件部", cover: "/software_cover.jpg" },
  { key: "2", name: "硬件部", cover: "/hardware_cover.jpg" },
  { key: "3", name: "项目部", cover: "/project_cover.jpg" },
  { key: "4", name: "学培部", cover: "/training_cover.jpg" },
  { key: "5", name: "宣策部", cover: "/publicity_cover.jpg" },
];

// 记录上次展开的是哪一张，跨路由返回时不丢
const DEPT_ACTIVE_KEY = "dept-active";

const StripContainer = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  height: 270px;
`;

const Strip = styled.button<{ $open: boolean }>`
  position: relative;
  flex: ${(p) => (p.$open ? 5 : 1)} 1 0;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #e8e8e8;
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
  transition: flex-grow 0.35s ease;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(${(p) => (p.$open ? 0 : 5)}px)
      brightness(${(p) => (p.$open ? 1 : 0.6)});
    transform: scale(${(p) => (p.$open ? 1 : 1.12)});
    transition:
      filter 0.35s ease,
      transform 0.35s ease;
  }

  span {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: vertical-rl;
    text-orientation: upright;
    letter-spacing: 4px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    color: #fff;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
    opacity: ${(p) => (p.$open ? 0 : 1)};
    transition: opacity 0.25s ease;
    pointer-events: none;
  }
`;

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

  @media (max-width: 768px) {
    gap: 12px;

    & > * {
      width: 55vw;
      height: auto;
      aspect-ratio: 4 / 5;
    }
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

  @media (max-width: 768px) {
    width: 55vw;
    height: auto;
    aspect-ratio: 4 / 5;
    margin: 8px;

    &:hover {
      transform: none;
    }
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
  const animationFrameRef = useRef<number>(0);

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

  @media (max-width: 768px) {
    margin-top: 0;
    font-size: 22px;
    margin-bottom: 12px;
  }
`;

// 内容区容器（手机端收窄内边距）
const PageBody = styled.div`
  width: 100%;
  padding: 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// 段落间距（手机端收紧）
const Spacer = styled.div`
  height: 44px;

  @media (max-width: 768px) {
    height: 12px;
  }
`;

// 主页面组件
const HomeSite: React.FC<PageProps> = ({ mode, user }) => {
  const url = useUrl();
  const navigate = useNavigate();
  const { Content } = Layout;
  const navigationType = useNavigationType(); // 获取导航类型
  const location = useLocation(); // 获取当前位置

  const isNarrow = useNarrow();
  const accordionRef = useRef<HTMLDivElement>(null);
  const [activeDept, setActiveDept] = useState<number | null>(() => {
    const saved = sessionStorage.getItem(DEPT_ACTIVE_KEY);
    if (saved === null) return 0; // 默认展开第一张
    const index = Number(saved);
    return Number.isInteger(index) && index >= 0 && index < divisions.length
      ? index
      : null;
  });

  // 点到手风琴以外的地方 → 自动收起
  useEffect(() => {
    if (!isNarrow) return;

    const handleDocClick = (event: MouseEvent) => {
      const el = accordionRef.current;
      if (el && !el.contains(event.target as Node)) {
        setActiveDept(null);
        sessionStorage.setItem(DEPT_ACTIVE_KEY, "-1");
      }
    };

    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, [isNarrow]);

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname, navigationType]);

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

  // 第一次点击展开，再次点击同一张才进入部门页
  const handleStripClick = (index: number) => {
    if (activeDept === index) {
      handleCardClick("division", divisions[index].key);
    } else {
      setActiveDept(index);
      sessionStorage.setItem(DEPT_ACTIVE_KEY, String(index));
    }
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

        <Spacer />

        {/* 内容区域 */}
        <PageBody>
          {/* 部门展示区 */}
          <SectionTitle>部门</SectionTitle>
          {isNarrow ? (
            <StripContainer ref={accordionRef}>
              {divisions.map((division, index) => (
                <Strip
                  key={division.key}
                  type="button"
                  $open={activeDept === index}
                  aria-expanded={activeDept === index}
                  aria-label={division.name}
                  onClick={() => handleStripClick(index)}
                >
                  <img src={division.cover} alt="" />
                  <span>{division.name}</span>
                </Strip>
              ))}
            </StripContainer>
          ) : (
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
          )}
          <Spacer />
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
          {/* 展示墙区域 */}
          <DisplayWall />
        </PageBody>
      </Content>
    </Layout>
  );
};

export default HomeSite;
