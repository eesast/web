import { Divider, Typography } from "antd";
import React from "react";
import { Page } from "../sites/EdcSite";

const { Title, Paragraph } = Typography;

export interface IIntroPageProps {
  setPage: (page: Page) => void;
}

const IntroPage: React.FC<IIntroPageProps> = ({ setPage }) => {
  setPage("intro");

  return (
    <Typography>
      <Title>第二十一届电子设计大赛</Title>
      <Title level={2}>赛事介绍</Title>
      <Divider />

      <Title level={2}>宗旨</Title>
      <Paragraph>Content</Paragraph>
      <Title level={2}>概况</Title>
      <Paragraph>Content</Paragraph>

      <Title level={2}>历届赛题回顾</Title>
      <Divider />
    </Typography>
  );
};

export default IntroPage;
