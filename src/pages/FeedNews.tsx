import { message, Carousel } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTimelineFeeds } from "../redux/actions/news";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  IAppState,
  IHomepageNewsState,
  ITimelineState
} from "../redux/types/state";

import styles from "./FeedNews.module.css";
import "./FeedNews.css";

type IHomepageNewsDispatchProps = {
  getTimelineFeeds: () => void;
};
type INewsProps = IHomepageNewsState & IHomepageNewsDispatchProps;
const timelinePage: React.FC<ITimelineState> = news => {
  let inner: JSX.Element[] | JSX.Element = [
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${axios.defaults.baseURL + news.originalUri})`
      }}
    ></div>,
    <img
      className={styles.image}
      src={axios.defaults.baseURL + news.originalUri}
      alt={news.description}
    />
  ];
  if (news.link)
    if (news.link[0] === "/")
      inner = (
        <Link to={news.link} id={news.alias} className={styles.timeline}>
          {inner}
        </Link>
      );
    else
      inner = (
        <a href={news.link} id={news.alias} className={styles.timeline}>
          {inner}
        </a>
      );
  return <div>{inner}</div>;
};

const FeedNews: React.FC<INewsProps> = props => {
  const { error, items, getTimelineFeeds } = props;

  useEffect(() => {
    getTimelineFeeds();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      message.error("主页加载失败");
    }
  }, [error]);
  const res: any = [];
  for (const item of items) {
    res.push(timelinePage(item));
  }
  return (
    <div>
      <Carousel autoplay>{res}</Carousel>
    </div>
  );
};

function mapStateToProps(state: IAppState): IHomepageNewsState {
  return {
    fetching: state.news.fetching,
    error: state.news.error,
    items: state.news.items
  };
}

const mapDispatchToProps: IHomepageNewsDispatchProps = {
  getTimelineFeeds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedNews);
