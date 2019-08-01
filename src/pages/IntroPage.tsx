import { Divider, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const IntroPage: React.FC<{}> = () => {
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
