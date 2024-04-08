import React, { Suspense, useEffect, useState } from "react";
import { Route, Link, Routes, Navigate, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, MenuProps, message } from "antd";
import {
  TrophyOutlined,
  // ReadOutlined,
  MenuOutlined,
  InfoCircleOutlined,
  SolutionOutlined,
  CommentOutlined,
  BankOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import NoticePage from "./NoticePage";
import MentorApplicationPage from "./MentorApplicationPage";
import MentorChatPage from "./MentorChatPage";
// import MentorInfoVerifyPage from "./MentorInfoVerifyPage";
import HonorApplicationPage from "./HonorApplicationPage";
import NotFoundPage from "../Components/NotFound";
// import ScholarshipApplicationPage from "./ScholarshipApplicationPage";
// import AidApplicationPage from "./AidApplicationPage";
// import PostgraduateMentorPage from "./PostgraduateMentorPage";
// import PostgraduateApplicationPage from "./PostgraduateApplicationPage";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";
import * as graphql from "@/generated/graphql";
import Loading from "../Components/Loading";

/* ---------------- 不随渲染刷新的组件 ---------------- */
const { Content, Sider } = Layout;

const InfoSite: React.FC<PageProps> = ({ mode, user }) => {
  const url = useUrl();
  const navigate = useNavigate();

  const userAgent = navigator.userAgent;
  const isMobile = userAgent.match(
    /(iPhone|iPod|Android|ios|iPad|AppleWebKit.*Mobile.*)/i,
  );
  const [collapsed, setCollapsed] = React.useState(isMobile ? true : false);
  const [openKeys, setOpenKeys] = useState([""]);

  const { data } = graphql.useGetProfileQuery({
    variables: { uuid: user?.uuid! },
  });

  const profile = data?.users_by_pk;

  useEffect(() => {
    if (
      profile &&
      (user?.role === "user" ||
        !profile?.department ||
        !profile.email ||
        !profile.realname ||
        !profile.phone ||
        ((!profile.student_no || !profile.class) && user?.role !== "teacher"))
    ) {
      message.warning({
        content: "请先补全个人信息，并完成清华邮箱验证",
        key: "profileMessage",
      });
      navigate(url.link("user", "site"));
    }
  });

  // const disclaimer = () => {
  //   if (localStorage.getItem("disclaimerChecked") !== "true") {
  //     Modal.warning({
  //       title: "友情提醒",
  //       content:
  //         "本平台建立初衷为方便系内同学共享推研信息，为联络导师提供便利。本平台所有信息非官方数据，均由同学自行上传并对真实性负责，因此平台无法保证信息的真实性、有效性。所有信息以最终推研通知为准，仅供参考。",
  //       okText: "我已知悉",
  //     });
  //     localStorage.setItem("disclaimerChecked", "true");
  //   }
  // };

  const items = [
    {
      key: "notices",
      label: <Link to={url.link("notices")}>公告</Link>,
      icon: <InfoCircleOutlined />,
    },
    {
      key: "mentors",
      label: "新生导师",
      icon: <CoffeeOutlined />,
      children: [
        {
          key: "mentor-applications",
          label: <Link to={url.link("mentor-applications")}>导师申请</Link>,
          icon: <SolutionOutlined />,
        },
        {
          key: "mentor-chats",
          label: <Link to={url.link("mentor-chats")}>导师交流</Link>,
          icon: <CommentOutlined />,
        },
      ],
    },
    {
      key: "honors-scholarships",
      label: "奖学金申请",
      icon: <TrophyOutlined />,
      children: [
        {
          key: "honors",
          label: <Link to={url.link("honors")}>荣誉</Link>,
          icon: <BankOutlined />,
        },
        // {
        //   key: "scholarships",
        //   label: <Link to={url.link("scholarships")}>奖学金</Link>,
        //   icon: <ReadOutlined />,
        // },
        // {
        //   key: "financial-aid",
        //   label: <Link to={url.link("financial-aid")}>助学金</Link>,
        // },
      ],
    },
    // {
    //   key: "postgraduate",
    //   label: "推研信息",
    //   icon: <ReadOutlined />,
    //   children: [
    //     {
    //       key: "postgraduate-mentor-info",
    //       label: <Link to={url.link("postgraduate-mentor-info")}>博士生招生信息</Link>,
    //     },
    //     {
    //       key: "mentor-info-verify",
    //       label: <Link to={url.link("mentor-info-verify")}>导师信息审核</Link>,
    //     },
    //     {
    //       key: "postgraduate-application",
    //       label: <Link to={url.link("postgraduate-application")}>学生申请审核</Link>,
    //     },
    //   ],
    // },
  ];

  const submenuKeys = ["mentors", "honors-scholarships"];

  const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && submenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        collapsible={true}
        collapsed={collapsed}
        collapsedWidth={50}
        trigger={
          <div
            css={`
              width: 100%;
              border-inline-end: 1px solid
                ${mode === "light"
                  ? `rgba(5, 5, 5, 0.06)`
                  : `rgba(253, 253, 253, 0.12)`};
            `}
          >
            <Button
              type="link"
              icon={<MenuOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          </div>
        }
        style={{
          height: "100%",
          position: "fixed",
          left: 0,
          top: "72px",
          bottom: 0,
          zIndex: 98,
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[url.page]}
          defaultSelectedKeys={["notices"]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          items={items}
          css={`
            height: 100%;
          `}
        />
      </Sider>
      <Content
        css={`
          margin-left: ${collapsed ? `50px` : `200px`};
          padding: 50px;
        `}
      >
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={url.link("notices")} />} />
            <Route
              path="notices"
              element={<NoticePage mode={mode} user={user} />}
            />
            <Route
              path="mentor-applications"
              element={<MentorApplicationPage mode={mode} user={user} />}
            />
            <Route
              path="mentor-chats"
              element={<MentorChatPage mode={mode} user={user} />}
            />
            <Route
              path="honors"
              element={<HonorApplicationPage mode={mode} user={user} />}
            />
            {/* <Route
              path="scholarships"
              element={<ScholarshipApplicationPage mode={mode} user={user} />}
            /> */}
            {/* <Route path="financial-aid" element={<AidApplicationPage mode={mode} user={user} />} /> */}
            {/* <Route
              path="postgraduate-mentor-info"
              element={<PostgraduateMentorPage mode={mode} user={user} />}
            />
            <Route
              path="mentor-info-verify"
              element={<MentorInfoVerifyPage mode={mode} user={user} />}
            />
            <Route
              path="postgraduate-application"
              element={<PostgraduateApplicationPage mode={mode} user={user} />}
            /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default InfoSite;
