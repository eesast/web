import React, { useEffect } from "react";
import { IArticle, IAppState, IUser } from "../redux/types/state";
import { useParams, withRouter } from "react-router-dom";
import { getArticle, getArticleByAlias } from "../redux/actions/weekly";
import { connect } from "react-redux";

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
  const { article, user, fetching, error, getArticle } = props;

  const { alias } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getArticleByAlias(alias!);
    };

    if (alias) {
      fetchData();
    }
  });

  return (
    <div>
      <h1>hello world</h1>
      <h2>文章阅读待实现</h2>
      <h3>请注意，现在阅读和编辑的路由都链接此页面</h3>
      <p>当前文章为{alias}</p>
      <h1>效果呢？</h1>
      <p>{article.content}</p>
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
