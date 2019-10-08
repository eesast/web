import { Carousel } from "antd";
import React from "react";
import styles from "./NewsPage.module.css";
import { HomeSitePage } from "../sites/HomeSite";

const news = [
  {
    title: "清华大学电子工程系学生科协",
    content: "宽口径、厚基础，我们软硬皆通。",
    image: "https://api.eesast.com/static/images/eesast-2019-group-photo.jpeg"
  },
  {
    title: "“商汤杯”第二十一届电子设计大赛",
    content: "本次电子设计大赛主题为“火线救援”。",
    image: "https://api.eesast.com/static/images/2019edclogo-background.png"
  }
];

export interface INewsPageProps {
  setPage: (page: HomeSitePage) => void;
}

const NewsPage: React.FC<INewsPageProps> = ({ setPage }) => {
  setPage("news");

  return (
    <Carousel autoplay effect="fade">
      {news.map(news => (
        <div key={news.title} className={styles.container}>
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${news.image})`
            }}
          />
          <div className={styles.center}>
            <img className={styles.image} src={news.image} alt={news.title} />
          </div>
          <div className={styles.description}>
            <h2>{news.title}</h2>
            <p>{news.content}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default NewsPage;
