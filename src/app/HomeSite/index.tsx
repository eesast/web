import React, { Suspense, useEffect, useRef, useState } from "react";
import { Layout, Spin, Table, Card } from "antd";
// import { ApartmentOutlined, TrophyOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Route, Navigate, Routes, Link, useNavigate } from "react-router-dom";
import NewsPage from "./NewsPage";
import NotFoundPage from "../Components/NotFound";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";
import { request } from "http";
// import DivisionPage from "./DivisionPage";
// import ContestPage from "./ContestPage";

interface CardComponentProps {
  onClick: () => void;
  imageSrc?: string;
  text: string;
}

const StyledCard = styled(Card)`
  width: 350px;
  height: 490px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardComponent: React.FC<CardComponentProps> = ({
  onClick,
  imageSrc,
  text,
}) => (
  <StyledCard onClick={onClick}>
    {imageSrc ? (
      <img
        src={imageSrc}
        alt={text}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "inherit",
        }}
      />
    ) : null}
  </StyledCard>
);

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding: 0% 0% 0% 0%;
  display: flex;
  gap: 16px;
  height: auto;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
  & > * {
    flex-shrink: 0;
    width: 350px;
    height: 490px;
  }
`;

const HomeSite: React.FC<PageProps> = ({ mode, user }) => {
  const url = useUrl();
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [isUserScrolling1, setIsUserScrolling1] = useState(false);
  const [isUserScrolling2, setIsUserScrolling2] = useState(false);
  const isPausedRef1 = useRef(false);
  const isPausedRef2 = useRef(false);

  const scrollTimeoutRef1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimeoutRef2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const container = containerRef1.current;
    if (!container) return;

    const scrollStep = 1;

    const autoScroll = () => {
      if (!isPausedRef1.current && !isUserScrolling1) {
        container.scrollLeft += scrollStep;
      }
      requestAnimationFrame(autoScroll);
    };

    const handleMouseEnter = () => (isPausedRef1.current = true);
    const handleMouseLeave = () => (isPausedRef1.current = false);

    const handleUserScroll = () => {
      setIsUserScrolling1(true);
      if (scrollTimeoutRef1.current) clearTimeout(scrollTimeoutRef1.current);
      scrollTimeoutRef1.current = setTimeout(() => {
        setIsUserScrolling1(false);
      }, 1000);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("scroll", handleUserScroll);

    requestAnimationFrame(autoScroll);

    return () => {
      if (scrollTimeoutRef1.current) clearTimeout(scrollTimeoutRef1.current);
      container.removeEventListener("scroll", handleUserScroll);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const container = containerRef2.current;
    if (!container) return;

    const scrollStep = 1;

    const autoScroll = () => {
      if (!isPausedRef2.current && !isUserScrolling2) {
        container.scrollLeft += scrollStep;
      }
      requestAnimationFrame(autoScroll);
    };

    const handleMouseEnter = () => (isPausedRef2.current = true);
    const handleMouseLeave = () => (isPausedRef2.current = false);

    const handleUserScroll = () => {
      setIsUserScrolling2(true);
      if (scrollTimeoutRef2.current) clearTimeout(scrollTimeoutRef2.current);
      scrollTimeoutRef2.current = setTimeout(() => {
        setIsUserScrolling2(false);
      }, 1000);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("scroll", handleUserScroll);

    requestAnimationFrame(autoScroll);

    return () => {
      if (scrollTimeoutRef2.current) clearTimeout(scrollTimeoutRef2.current);
      container.removeEventListener("scroll", handleUserScroll);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const { Content } = Layout;

  const Loading = () => {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  };

  // const items = [
  // {
  // key: "news",
  // icon: <SwitcherOutlined />,
  // label: <Link to={url.link("news")}>动态</Link>,
  // },
  // ];

  const navigate = useNavigate();

  const handleCardClick_division = (tab: string) => {
    navigate("/share/division", {
      replace: true,
      state: { tab },
    });
  };

  const handleCardClick_contest = (tab: string) => {
    navigate("/share/contest", {
      replace: true,
      state: { tab },
    });
  };

  return (
    <Layout>
      {/* 页面头部注释掉的导航菜单 */}
      {/* <StyledHeader>
      <StyledMenu
        theme="light"
        mode="horizontal"
        selectedKeys={[url.page]}
        items={items}
      />
    </StyledHeader> */}

      <Content>
        {/* 路由内容 */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={url.link("news")} />} />
            <Route path="news" element={<NewsPage mode={mode} user={user} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        {/* 页面间距 */}
        <br />
        <br />

        {/* 内容区 */}
        <div style={{ width: "100%", maxWidth: "90vw", margin: "0 auto" }}>
          <ScrollContainer ref={containerRef1}>
            {/* 部门卡片 */}
            <CardComponent
              onClick={() => handleCardClick_division("1")}
              imageSrc={"/software_cover.jpg"}
              text="软件部"
            />
            <CardComponent
              onClick={() => handleCardClick_division("2")}
              imageSrc={"/hardware_cover.jpg"}
              text="硬件部"
            />
            <CardComponent
              onClick={() => handleCardClick_division("3")}
              imageSrc={"/project_cover.jpg"}
              text="项目部"
            />
            <CardComponent
              onClick={() => handleCardClick_division("4")}
              imageSrc={"/training_cover.jpg"}
              text="学培部"
            />
            <CardComponent
              onClick={() => handleCardClick_division("5")}
              imageSrc={"/publicity_cover.jpg"}
              text="宣策部"
            />
          </ScrollContainer>
          <br />
          <br />
          <ScrollContainer ref={containerRef2}>
            {/* 比赛卡片 */}
            <CardComponent
              onClick={() => handleCardClick_contest("1")}
              imageSrc={"/team_cover.jpg"}
              text="队式程序设计大赛"
            />
            <CardComponent
              onClick={() => handleCardClick_contest("2")}
              imageSrc={"/hard_cover.jpg"}
              text="硬件设计大赛"
            />
            <CardComponent
              onClick={() => handleCardClick_contest("3")}
              imageSrc={"/soft_cover.jpg"}
              text="软件设计大赛"
            />
            <CardComponent
              onClick={() => handleCardClick_contest("4")}
              imageSrc={"/drone_cover.jpg"}
              text="智能无人机挑战赛"
            />
            <CardComponent
              onClick={() => handleCardClick_contest("5")}
              imageSrc={"/knowledge_cover.jpg"}
              text="新生知识竞赛"
            />
            <CardComponent
              onClick={() => handleCardClick_contest("6")}
              imageSrc={"/challenge_cover.jpg"}
              text="挑战杯"
            />
            <CardComponent
              onClick={() => handleCardClick_contest("7")}
              imageSrc={"/electronic_cover.jpg"}
              text="电子设计大赛"
            />
          </ScrollContainer>
        </div>
      </Content>
    </Layout>
  );
};

export default HomeSite;
