import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import displayWallConfig from "./displayWallConfig.json";

const { Title, Paragraph } = Typography;

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
    width: 600px; /* Fixed width for scrolling items */
  }

  @media (max-width: 768px) {
    & > * {
      width: 85vw;
    }
  }
`;

interface ScrollContainerProps {
  children: React.ReactNode;
  scrollSpeed?: number;
  pauseOnHover?: boolean;
}

const InfiniteScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  scrollSpeed = 0.5,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling] = useState(false);
  const [content, setContent] = useState<React.ReactNode[]>([]);
  const isPaused = useRef(false);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    setContent((prev) => [
      ...React.Children.toArray(children),
      ...React.Children.toArray(children),
    ]);
  }, [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAnimation = () => {
      if (!isPaused.current && !isScrolling && container) {
        container.scrollLeft += scrollSpeed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameRef.current = requestAnimationFrame(scrollAnimation);
    };

    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => {
        isPaused.current = true;
      });
      container.addEventListener("mouseleave", () => {
        isPaused.current = false;
      });
    }

    animationFrameRef.current = requestAnimationFrame(scrollAnimation);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollSpeed, pauseOnHover, isScrolling]);

  return <ScrollContainer ref={containerRef}>{content}</ScrollContainer>;
};

const CarouselContent = styled.div`
  display: flex !important;
  flex-direction: row;
  height: 400px;
  background-color: #f0f2f5;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  white-space: normal; /* Override nowrap from ScrollContainer */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: 330px; /* 固定总高，保证 7 张卡片完全等大 */

    &:hover {
      transform: none;
    }
  }
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 250px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    /* 硬性高度 + 溢出裁切，图片不会再把文字区挤走 */
    flex: 0 0 180px;
    height: 180px;
    min-width: 0;
    min-height: 0;

    img {
      /* 覆盖上面的 height:100%，避免百分比解析失败退化成原始尺寸 */
      height: 180px;
      /* 上下居上裁切，左右居中 */
      object-position: center top;
    }
  }
`;

const TextSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;

  @media (max-width: 768px) {
    flex: 1 1 auto;
    min-height: 0;
    padding: 14px 16px;
    justify-content: flex-start;
    overflow: hidden;
  }
`;

const CardTitle = styled(Title)`
  && {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    && {
      margin: 0 0 8px;
      font-size: 17px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const CardDesc = styled(Paragraph)`
  && {
    margin: 0;
    font-size: 14px;
    line-height: 1.8;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    && {
      font-size: 13px;
      line-height: 1.7;
      -webkit-line-clamp: 2;
    }
  }
`;

const WallWrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const DisplayWall: React.FC = () => {
  return (
    <WallWrapper>
      <SectionTitle>赛事信息</SectionTitle>
      <InfiniteScrollContainer scrollSpeed={1}>
        {displayWallConfig.map((item: any) => (
          <div key={item.id}>
            <CarouselContent
              onClick={() => {
                if (item.link) window.open(item.link, "_blank");
              }}
            >
              <ImageSection>
                <img alt={item.title} src={item.image} />
              </ImageSection>
              <TextSection>
                <CardTitle level={2}>{item.title}</CardTitle>
                <CardDesc>{item.description}</CardDesc>
              </TextSection>
            </CarouselContent>
          </div>
        ))}
      </InfiniteScrollContainer>
    </WallWrapper>
  );
};

export default DisplayWall;
