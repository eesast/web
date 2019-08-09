import { message, Carousel } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTimelineFeeds } from "../redux/actions/news";
import Constants from "../constants";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  IAppState,
  IHomepageNewsState,
  ITimelineState
} from "../redux/types/state";
const { headerHeight, footerHeight, secondaryHeaderHeight } = Constants;

type IHomepageNewsDispatchProps = {
  getTimelineFeeds: () => void;
};
type INewsProps = IHomepageNewsState & IHomepageNewsDispatchProps;
const timelinePage: React.FC<ITimelineState> = news => {
  let inner: JSX.Element[] | JSX.Element = [
    <div id="background"></div>,
    <img
      src={axios.defaults.baseURL + news.originalUri}
      alt={news.description}
    />
  ];
  if (news.link)
    if (news.link[0] === "/")
      inner = (
        <Link to={news.link} id={news.alias}>
          {inner}
        </Link>
      );
    else
      inner = (
        <a href={news.link} id={news.alias}>
          {inner}
        </a>
      );
  return (
    <div>
      <style>
        {`
          :root{
            --mainHeight:calc(100vh - ${headerHeight}px - ${footerHeight}px - ${secondaryHeaderHeight}px);
          }

          #${news.alias} {
          height: var(--mainHeight);
          width:100vw;    
          }

          #${news.alias} img{
            max-height: var(--mainHeight);
            max-width: 100vw;
            margin: calc(var(--mainHeight) / 2) auto auto auto;
            transform:translateY(-50%);
          }

          #${news.alias} div#background{
            position:absolute;
            background-repeat: round;
            width:100vw;
            height:var(--mainHeight);
            background-image:url(${axios.defaults.baseURL + news.originalUri});
            
            filter:brightness(0.5) blur(10px);
          }
        `}
      </style>
      {inner}
    </div>
  );
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
      <style>
        {`
          .ant-carousel .slick-slide{
            text-align: center;
            height: calc(100vh - ${headerHeight}px - ${footerHeight}px - ${secondaryHeaderHeight}px);
            overflow:  hidden;
            lineHeight: 5em;
            }
          .ant-carousel .slick-dots li button {
            height:6px;
            width:25px;
          }
          .ant-carousel .slick-dots li.slick-active button {
            width:40px;
          }
        `}
      </style>
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
