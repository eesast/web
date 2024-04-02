import React, { useEffect } from "react";
import { Typography, Space, Image, Card, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { PageProps } from "..";

const { Title, Paragraph, Text, Link } = Typography;
const { Meta } = Card;

const MinecraftPage: React.FC<PageProps> = ({ mode, user }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Space
      direction="vertical"
      style={{ margin: 0, padding: "1% 20%", backgroundColor: "white" }}
    >
      <Typography>
        <Title level={1}>
          <SmileOutlined /> 欢迎来到EESAST的Minecraft服务器！
        </Title>

        <Paragraph>
          众所周知，Minecraft是一款非常受欢迎的沙盒游戏，同时其中的红石电路部分与电子工程息息相关，
          我们可以在实践中轻松地学习逻辑门、触发器等数字逻辑知识，搭建各种有趣的机器，亲手体验电子工程的乐趣。
          <br />
          为了让大家更好地体验Minecraft和数字电路的乐趣，我们特别搭建了这个服务器，大家可以在这里互相交流玩耍。
          <br />
          软件部还会在暑假举办红石设计大赛，不论是萌新还是老手，都可以参与其中，一展自己的才华！
        </Paragraph>

        <Title level={2}>什么是Minecraft服务器？</Title>
        <Paragraph>
          Minecraft服务器是一个游戏服务端，大家可以使用本地Minecraft客户端通过IP地址或域名连接到服务器，
          从而实现多个玩家在同一个世界中一起游玩，共享资源，合作建设，竞争或对战。
          服务器可以设置不同的规则和模式，例如创造模式、生存模式或冒险模式，以适应各种游戏风格。
          服务器的管理员可以通过插件或模组来自定义服务器的各种功能，包括物品生成，怪物出生，天气变化等。这些服务器可以在个人电脑上运行，也可以租用专业的游戏服务器托管。
        </Paragraph>

        <Title level={2}>我要怎么连接服务器？</Title>
        <Paragraph>
          <Text strong>
            EESAST的服务器域名为 <Text code>mc.eesast.com</Text>
          </Text>
          ， 推荐大家使用PCL2客户端连接（也可自选其他客户端），具体教程请参考
          <Link
            href="https://www.bilibili.com/read/cv18149705/"
            target="_blank"
          >
            PCL2食用(设置)教程
          </Link>
          。
        </Paragraph>

        <Title level={2}>我要去哪里学习红石知识？</Title>
        <Paragraph>
          <Text strong>
            软件部的红石基础教程：
            <Link
              href="https://www.bilibili.com/video/BV11N4y187ZE?p=14&vd_source=f4d9b019d3ab13d634e8df2b16a9cae3"
              target="_blank"
            >
              清华大学电子系科协软件部2023暑期培训
            </Link>
            。
          </Text>
          你可以通过这个视频了解到红石的基本概念和使用方法，帮助你更好地开始你的Minecraft之旅。如果希望进一步学习，可以参考网上的更多资料。如果你对Minecraft非常感兴趣，可以考虑了解一下学校次世代社团的MC部THUnion，那里汇集了许多MC爱好者，他们也在红石设计大赛中展示了非常优秀的作品。
        </Paragraph>

        <Row gutter={16}>
          <Col span={8} offset={3}>
            <Card
              style={{ width: "100%", border: 0 }}
              cover={
                <Image
                  src={`${process.env.REACT_APP_STATIC_URL}/public/images/redstone1.png`}
                />
              }
            >
              <Meta
                description="选手设计的混凝土工厂"
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>
          <Col span={8} offset={2}>
            <Card
              style={{ width: "100%", border: 0 }}
              cover={
                <div style={{ paddingTop: "80px" }}>
                  <Image
                    src={`${process.env.REACT_APP_STATIC_URL}/public/images/redstone2.png`}
                  />
                </div>
              }
            >
              <Meta description="红石电路实现的32位有符号四则运算计算器" />
            </Card>
          </Col>
        </Row>
      </Typography>
    </Space>
  );
};

export default MinecraftPage;
