import React, { useEffect, useMemo, useState } from "react";
import { IArticle, IAppState, IUser } from "../redux/types/state";
import { useParams, withRouter, Link } from "react-router-dom";
import { getArticle, getArticleByAlias } from "../redux/actions/weekly";
import { connect } from "react-redux";
import md2wx from "md2wx";
import moment from "moment";
import { Button, Tooltip } from "antd";
import { Typography, Divider, Row, Col } from "antd";
import { LikeOutlined, LikeFilled, EditFilled } from "@ant-design/icons";

import styles from "./ArticlePage.module.css";
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

const ArticlePage: React.FC<IArticlePageProps> = (props) => {
  const { article, user, getArticleByAlias } = props;

  const [loggedIn, setLoggedIn] = useState(false);
  const [likesNum, setLikesNum] = useState(0);
  const [likeState, setLikeState] = useState(false);
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      setLikeState(article.likers.indexOf(user.id) !== -1);
      setLikesNum(article.likers.length);
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
    true,
  ]);
  const toggleLike = async () => {
    await (likeState
      ? api.unlikeArticle(article.id)
      : api.likeArticle(article.id));
    await getArticleByAlias(alias);
    return;
  };
  return (
    <div>
      {loggedIn ? (
        <div className={styles.floated}>
          <Tooltip title="点赞" className={styles.spacer}>
            <Button
              size="large"
              onClick={toggleLike}
              type="primary"
              shape="circle"
              className={styles.large}
            >
              {!likeState ? <LikeOutlined /> : <LikeFilled />}({likesNum})
            </Button>
          </Tooltip>
        </div>
      ) : (
        <div className={styles.floated}>
          <Tooltip title="您需要登录" className={styles.spacer}>
            <Button
              size="large"
              type="primary"
              shape="circle"
              className={styles.large}
            >
              <LikeOutlined /> ({likesNum})
            </Button>
          </Tooltip>
        </div>
      )}
      <Typography className={styles.root}>
        <div id="content" dangerouslySetInnerHTML={{ __html: html }}></div>
        <Divider />
        <Row gutter={16}>
          <Col span={8}>
            <h4>题目:{article.title}</h4>
          </Col>
          <Col span={8}>
            <h4>作者:{article.author}</h4>
          </Col>
          <Col span={8}>
            <h4>编辑于:{moment(article.updatedAt).format("YYYY MMM Do")}</h4>
          </Col>
        </Row>
        <Divider />
        标签:&nbsp;
        {article.tags.map((x) => (
          <Button type="dashed" size="small">
            {x}
          </Button>
        ))}
        <Link to={`/weekly/edit/${alias}`}>
          <EditFilled />
        </Link>
        <Divider />
      </Typography>
    </div>
  );
};

function mapStateToProps(state: IAppState): IArticlePageStateProps {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user!,
    fetching: state.weekly.currentArticle.fetching,
    article: state.weekly.currentArticle.item,
    error: state.weekly.currentArticle.error,
  };
}

const mapDispatchToProps: IArticlePageDispatchProps = {
  getArticle,
  getArticleByAlias,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
);
