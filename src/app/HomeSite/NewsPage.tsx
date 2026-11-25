import React, { useEffect, useRef, useState } from "react";
import { Carousel, Image, Card } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Center from "../Components/Center";
import { PageProps } from "..";
import { getImageNews, NewsSlide } from "../../api/news";
import { useNarrow } from "../../api/hooks/narrow";

const news = [
  {
    title: "清华大学电子工程系学生科协",
    content: "宽口径、厚基础，我们软硬皆通。",
    image: `${process.env.REACT_APP_STATIC_URL!}/public/images/eesast-group-photo-2025.jpg`,
  },
  // {
  //   title: "“商汤杯”第二十一届电子设计大赛",
  //   content: "本次电子设计大赛主题为“火线救援”。",
  //   image: `${process.env.REACT_APP_STATIC_URL!}/public/images/edc-2019-logo-background.png`,
  // },
  {
    title: "新生信息知识竞赛",
    content:
      "新生们登上信息学院的大舞台，凭借自己的知识与才智，展开一场激烈的角逐。",
    image: `${process.env.REACT_APP_STATIC_URL!}/public/images/knowledge-contest-2019.jpg`,
  },
  {
    title: "硬件设计大赛",
    content: "课赛结合，快速入门，感受硬件的魅力",
    image: `${process.env.REACT_APP_STATIC_URL!}/public/images/hardware-design-contest-2019.jpg`,
  },
];

const StyledCard = styled(Card)`
  width: 100%;
  background: transparent;
  .ant-card-body {
    padding: 200;
  }
  border: none;
  .ant-card {
    border: none;
    box-shadow: none;
  }
`;

const CarouselWrap = styled.div`
  position: relative;
`;

// 手机端的左右箭头，点一下切上一张 / 下一张
const ArrowButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.38);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transform: translateY(-50%);
  -webkit-tap-highlight-color: transparent;
  transition: background 0.2s ease;

  &:active {
    background: rgba(0, 0, 0, 0.6);
  }

  left: ${(p) => (p.$side === "left" ? "10px" : "auto")};
  right: ${(p) => (p.$side === "right" ? "10px" : "auto")};
`;

const Container = styled.div`
  position: relative;
  height: calc(100vh - 67px);
  width: 100%;

  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 4 / 3;
    overflow: hidden;

    /* 图片统一铺满整张卡片：不再依赖 Center 的 flex 行为，
       也不会因为原图分辨率/长宽比不同而显示成不同大小 */
    .ant-image {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    /* 底部渐变遮罩，保证文字压在照片上仍然可读 */
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 55%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
      z-index: 1;
      pointer-events: none;
    }
  }
`;

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  filter: opacity(0.7) blur(12px);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled.div`
  position: absolute;
  left: 48px;
  bottom: 24px;
  text-shadow: 0px 0px 12px white;

  @media (max-width: 768px) {
    left: 16px;
    right: 16px;
    bottom: 16px;
    z-index: 2;
    text-shadow: 0 0 12px rgba(0, 0, 0, 0.6);

    /* 标题与正文都固定为最多 2 行，超出部分用省略号截断。
       这样无论文案长短，五张幻灯片的文字块尺寸和字号都完全一致 */
    h2 {
      margin: 0 0 6px;
      font-size: 20px;
      line-height: 1.3;
      color: #fff;
      word-break: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      overflow: hidden;
    }

    p {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
      color: rgba(255, 255, 255, 0.92);
      word-break: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      overflow: hidden;
    }

    /* 「电子新闻」的说明整体是一个链接，手机端去掉下划线，
       避免和另外三张看起来不一样 */
    a {
      text-decoration: none;
    }
  }
`;

// 新增成员的文字说明带链接，其余样式与原成员保持一致，仅增加下划线
const DescriptionLink = styled.a`
  display: block;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover,
  &:focus {
    color: inherit;
    text-decoration: underline;
  }
`;

const NewsPage: React.FC<PageProps> = ({ mode, user }) => {
  const isNarrow = useNarrow();
  const carouselRef = useRef<CarouselRef>(null);

  // 电子系图片新闻：作为轮播新增的成员，获取失败时不影响原有成员
  const [newsSlides, setNewsSlides] = useState<NewsSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = news.length + newsSlides.length;

  // 手机端：关掉自动播放、换成可拖拽的滚动效果
  // 桌面端：保持原来的自动播放 + 淡入淡出，完全不变
  const carouselEffect: "scrollx" | "fade" = isNarrow ? "scrollx" : "fade";

  useEffect(() => {
    let mounted = true;
    getImageNews().then((slides) => {
      if (mounted) setNewsSlides(slides);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // 新成员是异步加入轮播的，翻页点会随之重建；此处保证当前页码始终有效
  useEffect(() => {
    if (currentSlide >= slideCount) {
      setCurrentSlide(0);
      carouselRef.current?.goTo(0);
    }
  }, [currentSlide, slideCount]);

  return (
    <StyledCard>
      <CarouselWrap>
        <Carousel
          ref={carouselRef}
          autoplay={!isNarrow}
          dots
          draggable={isNarrow}
          effect={carouselEffect}
          afterChange={(index) => setCurrentSlide(index)}
        >
          {news.map((news) => (
            <Container key={news.title}>
              <Background
                style={{
                  backgroundImage: `url(${news.image})`,
                }}
              />
              <Center>
                <Image src={news.image} alt={news.title} preview={false} />
              </Center>
              <Description>
                <h2>{news.title}</h2>
                <p>{news.content}</p>
              </Description>
            </Container>
          ))}
          {newsSlides.map((slide) => (
            <Container key={slide.link}>
              <Background
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              <Center>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  preview={false}
                  referrerPolicy="no-referrer"
                />
              </Center>
              <Description>
                <DescriptionLink
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2>{slide.title}</h2>
                  <p>{slide.content}</p>
                </DescriptionLink>
              </Description>
            </Container>
          ))}
        </Carousel>
        {isNarrow && (
          <>
            <ArrowButton
              type="button"
              $side="left"
              aria-label="上一张"
              onClick={() => carouselRef.current?.prev()}
            >
              <LeftOutlined />
            </ArrowButton>
            <ArrowButton
              type="button"
              $side="right"
              aria-label="下一张"
              onClick={() => carouselRef.current?.next()}
            >
              <RightOutlined />
            </ArrowButton>
          </>
        )}
      </CarouselWrap>
    </StyledCard>
  );
};

export default NewsPage;
