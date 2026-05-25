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
    height: auto;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 250px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
`;

const DisplayWall: React.FC = () => {
  return (
    <div style={{ marginTop: "40px" }}>
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
                <Title level={2} style={{ marginBottom: "16px" }}>
                  {item.title}
                </Title>
                <Paragraph
                  style={{
                    fontSize: "14px",
                    display: "-webkit-box",
                    WebkitLineClamp: 8,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    margin: 0,
                    lineHeight: 1.8,
                  }}
                >
                  {item.description}
                </Paragraph>
              </TextSection>
            </CarouselContent>
          </div>
        ))}
      </InfiniteScrollContainer>
    </div>
  );
};

export default DisplayWall;
