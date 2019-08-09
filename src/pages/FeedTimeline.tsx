import { message, Carousel } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTimelineFeeds } from "../redux/actions/timelines";
import axios from "axios";
import { Link } from "react-router-dom";
import { IAppState, ITimeline, ITimelinesState } from "../redux/types/state";
import styles from "./FeedTimeline.module.css";
import "./FeedTimeline.css";

const timelinePage: React.FC<ITimeline> = item => {
  let inner: JSX.Element[] | JSX.Element = [
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${axios.defaults.baseURL + item.originalUri})`
      }}
    ></div>,
    <img
      className={styles.image}
      src={axios.defaults.baseURL + item.originalUri}
      alt={item.description}
    />
  ];
  if (item.link)
    if (item.link[0] === "/")
      inner = (
        <Link to={item.link} id={item.alias} className={styles.timeline}>
          {inner}
        </Link>
      );
    else
      inner = (
        <a href={item.link} id={item.alias} className={styles.timeline}>
          {inner}
        </a>
      );
  return <div>{inner}</div>;
};

type ITimelineDispatchProps = {
  getTimelineFeeds: () => void;
};

type ITimelineProps = ITimelinesState & ITimelineDispatchProps;

const FeedTimeline: React.FC<ITimelineProps> = props => {
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

  return (
    <div>
      <Carousel autoplay>{items.map(item => timelinePage(item))}</Carousel>
    </div>
  );
};

function mapStateToProps(state: IAppState): ITimelinesState {
  return {
    fetching: state.timeline.fetching,
    error: state.timeline.error,
    items: state.timeline.items
  };
}

const mapDispatchToProps: ITimelineDispatchProps = {
  getTimelineFeeds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedTimeline);
