import React, { useEffect, useRef, useState } from "react";
import { Carousel, Image, Card } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import styled from "styled-components";
import Center from "../Components/Center";
import { PageProps } from "..";
import { getImageNews, NewsSlide } from "../../api/news";

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

const Container = styled.div`
  position: relative;
  height: calc(100vh - 67px);
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  filter: opacity(0.7) blur(12px);
`;

const Description = styled.div`
  position: absolute;
  left: 48px;
  bottom: 24px;
  text-shadow: 0px 0px 12px white;
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
  // 电子系图片新闻：作为轮播新增的成员，获取失败时不影响原有成员
  const [newsSlides, setNewsSlides] = useState<NewsSlide[]>([]);
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = news.length + newsSlides.length;

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
      <Carousel
        ref={carouselRef}
        autoplay
        dots
        effect="fade"
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
              <Image src={slide.image} alt={slide.title} preview={false} />
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
    </StyledCard>
  );
};

export default NewsPage;
