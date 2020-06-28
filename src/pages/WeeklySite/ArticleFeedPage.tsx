import React, { useState, useEffect } from "react";
import ArticleFeedCard from "./ArticleFeedCard";
import { Row, Col, List } from "antd";
import { useQuery } from "@apollo/client";
import { GetArticleFeeds as GET_ARTICLE_FEEDS } from "../../api/article.graphql";
import { GetArticleFeeds, GetArticleFeedsVariables } from "../../api/types";
import { Link } from "react-router-dom";

const ArticleFeedPage: React.FC = () => {
  const [articles, setArticles] = useState<
    {
      title: string;
      alias: string;
      abstract: string;
      author: string;
      likes: number;
      views: number;
      tags: string[];
    }[]
  >([]);

  const { data, loading, error } = useQuery<
    GetArticleFeeds,
    GetArticleFeedsVariables
  >(GET_ARTICLE_FEEDS, {
    variables: { limit: 5, cursor: "2020-06-19T08:41:02.633547+00:00" },
  });

  useEffect(() => {
    if (data) {
      setArticles(
        data.article_public.map((article) => {
          return {
            title: article.title!,
            alias: article.alias!,
            abstract: article.abstract!,
            author: article.author?.username!,
            likes: article.article_likers_aggregate.aggregate?.count!,
            views: article.views!,
            tags: article.article_tags.map((t) => t.tag.tag_name),
          };
        })
      );
    }
  }, [data]);

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <List
          dataSource={articles}
          renderItem={(item) => {
            return (
              <Link to={`/weekly/explore/${item.alias}`}>
                <ArticleFeedCard article={item} />
              </Link>
            );
          }}
        ></List>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default ArticleFeedPage;
