import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import Center from "../../components/Center";
import Picture from "../../components/Picture";

const news = [
  {
    title: "清华大学电子工程系学生科协",
    content: "宽口径、厚基础，我们软硬皆通。",
    image: `${process.env.REACT_APP_STATIC_URL}/public/images/eesast-group-photo-2019.jpg`,
  },
  {
    title: "“商汤杯”第二十一届电子设计大赛",
    content: "本次电子设计大赛主题为“火线救援”。",
    image: `${process.env.REACT_APP_STATIC_URL}/public/images/edc-2019-logo-background.png`,
  },
  {
    title: "新生信息知识竞赛",
    content:
      "新生们登上信息学院的大舞台，凭借自己的知识与才智，展开一场激烈的角逐。",
    image: `${process.env.REACT_APP_STATIC_URL}/public/images/knowledge-contest-2019.jpg`,
  },
  {
    title: "硬件设计大赛",
    content: "课赛结合，快速入门，感受硬件的魅力",
    image: `${process.env.REACT_APP_STATIC_URL}/public/images/hardware-design-contest-2019.jpg`,
  },
];

const Container = styled.div`
  position: relative;
  height: calc(100vh - 67px - 48px);
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

const Image = styled(Picture)`
  height: 100%;
  object-fit: cover;
  object-position: center;
  margin-left: auto;
  margin-right: auto;
`;

const Description = styled.div`
  position: absolute;
  left: 48px;
  bottom: 24px;
  text-shadow: 0px 0px 12px white;
`;

const NewsPage: React.FC = () => {
  return (
    <Carousel autoplay effect="fade">
      {news.map((news) => (
        <Container key={news.title}>
          <Background
            style={{
              backgroundImage: `url(${news.image}/compressed)`,
            }}
          />
          <Center>
            <Image src={news.image} alt={news.title} />
          </Center>
          <Description>
            <h2>{news.title}</h2>
            <p>{news.content}</p>
          </Description>
        </Container>
      ))}
    </Carousel>
  );
};

export default NewsPage;
