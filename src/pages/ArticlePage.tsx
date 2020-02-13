import React, { useEffect, useMemo, useState } from "react";
import { IArticle, IAppState, IUser } from "../redux/types/state";
import { useParams, withRouter, Link } from "react-router-dom";
import { getArticle, getArticleByAlias } from "../redux/actions/weekly";
import { connect } from "react-redux";
import md2wx from "md2wx";

import { Button } from "antd";
import api from "../api";

interface IArticlePageStateProps {
  loggedIn?: boolean;
  user: IUser;
  fetching: boolean;
  article: IArticle;
  error?: Error | null;
}

interface IArticlePageDispatchProps {
  getArticle: (articleId: number) => void;
  getArticleByAlias: (alias: string) => void;
  // postArticle: (
  //   title: string,
  //   alias: string,
  //   authorId: number,
  //   content: string,
  //   abstract: string,
  //   image: string,
  //   tags: string[]
  // ) => void;
  // updateArticle: (
  //   articleId: number,
  //   title: string,
  //   alias: string,
  //   authorId: number,
  //   content: string,
  //   abstract: string,
  //   image: string,
  //   tags: string[]
  // ) => void;
  // likeArticle: (articleId: number) => void;
  // unlikeArticle: (articleId: number) => void;
}

type IArticlePageProps = IArticlePageStateProps & IArticlePageDispatchProps;

const ArticlePage: React.FC<IArticlePageProps> = props => {
  const { article, user, getArticleByAlias } = props;

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  });

  const { alias } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getArticleByAlias(alias!);
    };

    if (alias) {
      fetchData();
    }
  }, [alias]);

  const html = useMemo(() => md2wx.renderHtml(article.content, true), [
    article.content,
    true
  ]);

  const handleLike = async () => {
    await api.likeArticle(article.id);
  };

  const handleUnlike = async () => {
    await api.unlikeArticle(article.id);
  };

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <h1>{article.title}</h1>
      <h6>{article.author + article.updatedAt}</h6>
      <h5>{article.tags.toString()}</h5>
      <Button onClick={handleLike} disabled={!loggedIn}>
        LIKE
      </Button>
      <Button onClick={handleUnlike} disabled={!loggedIn}>
        UNLIKE
      </Button>
      <Link to={`/weekly/edit`}> 编辑 </Link>
      <div id="content" dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};

function mapStateToProps(state: IAppState): IArticlePageStateProps {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user!,
    fetching: state.weekly.currentArticle.fetching,
    article: state.weekly.currentArticle.item,
    error: state.weekly.currentArticle.error
  };
}

const mapDispatchToProps: IArticlePageDispatchProps = {
  getArticle,
  getArticleByAlias
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
);
