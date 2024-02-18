import React, { useEffect } from "react";
import { Route, Link, Routes, Navigate, useNavigate } from "react-router-dom";
import { Layout, Menu, message, Modal } from "antd";
import {
  NotificationOutlined,
  TeamOutlined,
  ContactsOutlined,
  TrophyOutlined,
  ReadOutlined,
  // PayCircleOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import NoticePage from "./NoticePage";
import MentorApplicationPage from "./MentorApplicationPage";
import MentorChatPage from "./MentorChatPage";
import MentorInfoVerifyPage from "./MentorInfoVerifyPage";
import HonorApplicationPage from "./HonorApplicationPage";
import NotFoundPage from "../Components/NotFound";
import ScholarshipApplicationPage from "./ScholarshipApplicationPage";
// import AidApplicationPage from "./AidApplicationPage";
import PostgraduateMentorPage from "./PostgraduateMentorPage";
import PostgraduateApplicationPage from "./PostgraduateApplicationPage";
import { useQuery } from "@apollo/client";
import { GetUserVariables, GetUser } from "../../api/types";
import { GetUser as GET_USER } from "../../api/user.graphql";
import { getUserInfo } from "../../api/helpers/auth";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";

const { Content, Sider } = Layout;

const FixedSider = styled(Sider)`
  overflow: auto;
  top: 0;
  height: 100vh;
  position: fixed;
  left: 0;
  & .ant-menu-inline {
    height: calc(100vh - 72px);
    padding-top: 72px;
  }
`;

const InfoSite: React.FC<PageProps> = ({ mode }) => {
  const url = useUrl();

  const navigate = useNavigate();

  const userInfo = getUserInfo();

  const { data } = useQuery<GetUser, GetUserVariables>(GET_USER, {
    variables: { _id: userInfo?._id! },
  });

  const user = data?.user?.[0];

  useEffect(() => {
    if (
      userInfo?.role === "user" ||
      !user?.department ||
      !user.email ||
      !user.name ||
      !user.phone ||
      ((!user.id || !user.class) && userInfo?.role !== "teacher")
    ) {
      message.warning("请先补全个人信息，并完成清华邮箱验证");
      navigate(url.link("user", "site"));
    }
  });

  const disclaimer = () => {
    if (localStorage.getItem("disclaimerChecked") !== "true") {
      Modal.warning({
        title: "友情提醒",
        content:
          "本平台建立初衷为方便系内同学共享推研信息，为联络导师提供便利。本平台所有信息非官方数据，均由同学自行上传并对真实性负责，因此平台无法保证信息的真实性、有效性。所有信息以最终推研通知为准，仅供参考。",
        okText: "我已知悉",
      });
      localStorage.setItem("disclaimerChecked", "true");
    }
  };

  return (
    <Layout>
      <FixedSider>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["notices"]}
          selectedKeys={[url.page]}
        >
          <Menu.Item key="notices">
            <Link to={url.link("notices")}>
              <NotificationOutlined />
              公告
            </Link>
          </Menu.Item>
          <Menu.ItemGroup key="mentors" title="新生导师">
            <Menu.Item key="mentor-applications">
              <Link to={url.link("mentor-applications")}>
                <TeamOutlined />
                导师申请
              </Link>
            </Menu.Item>
            <Menu.Item key="mentor-chats">
              <Link to={url.link("mentor-chats")}>
                <ContactsOutlined />
                导师交流
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="honors-scholarships" title="奖助学金">
            <Menu.Item key="honors">
              <Link to={url.link("honors")}>
                <TrophyOutlined />
                荣誉
              </Link>
            </Menu.Item>
            <Menu.Item key="scholarships">
              <Link to={url.link("scholarships")}>
                <ReadOutlined />
                奖学金
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="financial-aid">
              <Link to={url.link("financial-aid")}>
                <PayCircleOutlined />
                助学金
              </Link>
            </Menu.Item> */}
          </Menu.ItemGroup>
          <Menu.ItemGroup key="postgraduate" title="推研信息">
            <Menu.Item key="postgraduate-mentor-info" onClick={disclaimer}>
              <Link to={url.link("postgraduate-mentor-info")}>
                <TeamOutlined />
                博士生招生信息
              </Link>
            </Menu.Item>
            {/* {["root", "counselor", "teacher"].includes(userInfo?.role!) ? (
              <Menu.Item key="mentor-info-verify">
                <Link to={url.link("mentor-info-verify")}>
                  <VerifiedOutlined />
                  导师信息审核
                </Link>
              </Menu.Item>
            ) : null} */}
            {["root", "counselor", "teacher"].includes(userInfo?.role!) ? (
              <Menu.Item key="postgraduate-application">
                <Link to={url.link("postgraduate-application")}>
                  <VerifiedOutlined />
                  学生申请审核
                </Link>
              </Menu.Item>
            ) : null}
          </Menu.ItemGroup>
        </Menu>
      </FixedSider>
      <Content
        css={`
          margin-left: 200px;
          padding: 48px 10vw;
        `}
      >
        <Routes>
          <Route path="/" element={<Navigate to={url.link("notices")} />} />
          <Route path="notices" element={<NoticePage />} />
          <Route
            path="mentor-applications"
            element={<MentorApplicationPage />}
          />
          <Route path="mentor-chats" element={<MentorChatPage />} />
          <Route path="honors" element={<HonorApplicationPage />} />
          <Route path="scholarships" element={<ScholarshipApplicationPage />} />
          {/* <Route path="financial-aid" element={<AidApplicationPage />} /> */}
          <Route
            path="postgraduate-mentor-info"
            element={<PostgraduateMentorPage />}
          />
          <Route path="mentor-info-verify" element={<MentorInfoVerifyPage />} />
          <Route
            path="postgraduate-application"
            element={<PostgraduateApplicationPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default InfoSite;
