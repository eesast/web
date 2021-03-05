import React from "react";
import { GetArticleFeeds_article_public } from "../../api/types";
import { Card, PageHeader, Row, Col } from "antd";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";
import { stringify } from "querystring";

interface ArticleFeedCardProps {
  article: {
    title: string;
    alias: string;
    abstract: string;
    author: string;
    likes: number;
    views: number;
    tags: string[];
  };
}

const ArticleFeedCard: React.FC<ArticleFeedCardProps> = ({ article }) => {
  const Content = ({
    abstract,
    coverImageUrl,
  }: {
    abstract: string;
    coverImageUrl: string;
  }) => {
    return (
      <Row>
        <Col span={20}>{abstract}</Col>
        <Col span={4}>
          <img src={coverImageUrl} alt={""} />
        </Col>
      </Row>
    );
  };

  return (
    <PageHeader
      title={article.title}
      subTitle={`作者: ${article.author}`}
      backIcon={false}
      css={`
        border: 1px solid rgb(235, 237, 240);
        margin: 1em;
      `}
      footer={
        <Row>
          <Col span={1}>
            <EyeOutlined />
          </Col>
          <Col span={1}>{article.views.toString()}</Col>
          <Col span={1}>
            <HeartOutlined />
          </Col>
          <Col span={1}> {article.likes.toString()}</Col>
        </Row>
      }
    >
      <Content
        abstract={article.abstract}
        coverImageUrl={
          "https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
        }
      />
    </PageHeader>
  );
};

export default ArticleFeedCard;
