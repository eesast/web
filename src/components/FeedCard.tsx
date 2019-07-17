import { Card, Icon } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

const { Meta } = Card;

export interface IFeedCardProps {
  title: string;
  abstract: string;
  image: string;
  loading: boolean;
  views: number;
  tags: string[];
  likes: number;
  createdAt: string;
}

const FeedCard: React.FC<IFeedCardProps> = props => {
  const {
    title,
    abstract,
    image,
    loading,
    views,
    tags,
    likes,
    createdAt
  } = props;

  const [imgLoading, setImgLoading] = useState(true);
  const handleImageLoad = () => {
    setImgLoading(false);
  };

  const [imgFailLoading, setImgFailLoading] = useState(false);
  const handleImageLoadFail = () => {
    setImgLoading(false);
    setImgFailLoading(true);
  };

  return (
    <Card
      style={{ padding: 24 }}
      hoverable={true}
      cover={
        <img
          style={{
            maxHeight: "40vh",
            objectFit: "cover"
          }}
          hidden={imgFailLoading}
          alt={title}
          src={axios.defaults.baseURL + image}
          onLoad={handleImageLoad}
          onError={handleImageLoadFail}
        />
      }
      loading={loading || imgLoading}
    >
      <Meta title={title} description={abstract} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "-24px",
            marginBottom: "-36px",
            marginTop: "36px",
            overflowX: "hidden"
          }}
        >
          <div>
            {moment().diff(moment(createdAt), "weeks") < 2
              ? moment(createdAt).fromNow()
              : moment(createdAt).format("L")}
          </div>
          <div style={{ marginLeft: "12px" }}>{tags && tags.join(" / ")}</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "-24px",
            marginBottom: "-36px",
            marginTop: "36px"
          }}
        >
          <Icon style={{ marginRight: "6px" }} type="eye" />
          <div style={{ marginRight: "12px" }}>{views || 0}</div>
          <Icon style={{ marginRight: "6px" }} type="like" />
          <div>{likes || 0}</div>
        </div>
      </div>
    </Card>
  );
};

export default FeedCard;
