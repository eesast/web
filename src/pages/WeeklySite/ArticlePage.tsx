import React, { useState, useEffect } from "react";
import md2wx from "md2wx";
import {
  ViewArticle as VIEW_ARTICLE,
  GetUserArticleLike as GET_USER_ARTICLE_LIKE,
} from "../../api/article.graphql";
import {
  ViewArticle,
  ViewArticleVariables,
  ViewArticle_update_article_public_returning,
  GetUserArticleLike,
  GetUserArticleLikeVariables,
} from "../../api/types";
import { useQuery, useMutation, gql, useApolloClient } from "@apollo/client";
import { Button, PageHeader, Tag, Tooltip, Layout } from "antd";
import { Loading } from "../../components";
import { useParams, useHistory } from "react-router-dom";
import { DislikeTwoTone, LikeTwoTone } from "@ant-design/icons";
import style from "./ArticlePage.module.css";

const ArticlePage: React.FC = () => {
  const client = useApolloClient();
  const { alias } = useParams();
  const history = useHistory();
  const [article, setArticle] = useState<
    ViewArticle_update_article_public_returning
  >();
  const [like, setLike] = useState(false);
  const [contentHtml, setContentHtml] = useState("");

  const [
    viewArticle,
    { data: articleData, loading: articleLoading, error: articleError },
  ] = useMutation<ViewArticle, ViewArticleVariables>(VIEW_ARTICLE);

  useEffect(() => {
    viewArticle({
      variables: { alias: alias },
    });
  }, [alias, viewArticle]);

  const cacheData = client.readQuery({
    query: gql`
      query getCache {
        _id
        role
      }
    `,
  });

  useEffect(() => {
    if (articleData && !articleError && articleData.update_article_public) {
      setArticle(articleData?.update_article_public?.returning[0]);
      setContentHtml(
        md2wx.renderHtml(
          articleData?.update_article_public?.returning[0].content!
        )
      );
    }
  }, [articleData, articleError]);

  const { data: user_article_like } = useQuery<
    GetUserArticleLike,
    GetUserArticleLikeVariables
  >(GET_USER_ARTICLE_LIKE, {
    variables: {
      article_id: article?.id!,
      user_id: cacheData?._id!,
    },
  });

  useEffect(() => {
    setLike(!!user_article_like?.article_liker_by_pk);
  }, [user_article_like]);

  if (articleLoading) return <Loading />;

  const likeButton = like ? (
    <Button icon={<DislikeTwoTone twoToneColor="red" />} shape="circle" />
  ) : (
    <Tooltip title="请先登录" visible={!user_article_like?.article_liker_by_pk}>
      <Button
        icon={<LikeTwoTone twoToneColor="green" />}
        shape="circle"
        disabled={!user_article_like?.article_liker_by_pk}
      />
    </Tooltip>
  );

  const tags: JSX.Element[] =
    article?.article_tags.map((tag: any) => (
      <Tag color="blue">{tag.tag.tag_name}</Tag>
    )) ?? [];

  return (
    <Layout>
      <div className={style.site_page_header_ghost_wrapper}>
        <PageHeader
          title={article?.title}
          subTitle={`作者: ${article?.author?.username!}`}
          tags={tags}
          extra={likeButton}
          ghost={false}
          onBack={() => {
            history.push("/weekly/explore");
          }}
        >
          {article?.abstract}
        </PageHeader>
      </div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
};

export default ArticlePage;
