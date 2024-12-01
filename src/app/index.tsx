import React, { Suspense, lazy, useRef, useState, useEffect } from "react";
import {
  Button,
  ConfigProvider,
  FloatButton,
  Layout,
  Menu,
  Popover,
  Switch,
  Tour,
  TourProps,
  message,
  theme,
  Avatar,
} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {
  MenuOutlined,
  ExportOutlined,
  NotificationTwoTone,
  NotificationOutlined,
} from "@ant-design/icons";
import { Route, Link, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import { useWindowSize } from "../api/hooks/windowsize";
import NotFoundPage from "./Components/NotFound";
import Authenticate, { tsinghuaRoles } from "./Components/Authenticate";
import { useUrl } from "../api/hooks/url";
import { useUser, JwtPayload } from "../api/hooks/user";
import { subscribe, unsubscribe } from "../api/notification";
import Loading from "./Components/Loading";
import { getAvatarUrl, listFile } from "../api/cos";
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale("zh-cn");

export interface PageProps {
  mode: string;
  user: JwtPayload;
}

const HomeSite = lazy(() => import("./HomeSite"));
const ContestSite = lazy(() => import("./ContestSite"));
const InfoSite = lazy(() => import("./InfoSite"));
const ShareSite = lazy(() => import("./ShareSite"));
const UserSite = lazy(() => import("./UserSite"));

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  const url = useUrl();
  const [user, setUser] = useUser();
  const userAgent = navigator.userAgent;
  const isMobile = userAgent.match(
    /(iPhone|iPod|Android|ios|iPad|AppleWebKit.*Mobile.*)/i,
  );
  // 初始化状态
  const [mode, setMode] = useState<"light" | "dark">(() => {
    // 优先使用 localStorage 中保存的主题
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    // 否则使用系统主题
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    let isMounted = true; // 防止组件卸载后更新状态

    const fetchAvatar = () => {
      listFile(`avatar/${user.uuid}/`)
        .then((files) => {
          const imageFiles = files.filter((file) =>
            /\.(jpe?g|png)$/i.test(file.Key),
          );
          if (imageFiles.length > 0) {
            const firstImage = imageFiles[0];
            return getAvatarUrl(firstImage.Key);
          } else {
            setImageUrl("/UserOutlined.png"); // 替换为默认头像 URL
            return null;
          }
        })
        .then((url) => {
          if (url && isMounted) {
            setImageUrl(url);
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("Failed to load avatar:", error);
            message.error("加载头像失败");
          }
        })
        .finally(() => {
          // 调用下次请求
          if (isMounted) {
            setTimeout(fetchAvatar, 500); // 请求完成后延迟0.5秒再发起下一个请求
          }
        });
    };
    // 初次请求
    fetchAvatar();
    // 清理函数，避免组件卸载时执行更新操作
    return () => {
      isMounted = false;
    };
  }, [user.uuid]);

  const contestRef = useRef(null);
  const infoRef = useRef(null);
  const shareRef = useRef(null);
  const themeRef = useRef(null);

  const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    height: 72px;
    width: 100%;
    min-width: 465px;
    background-color: ${mode === "light" ? `white` : `#141414`};
    border-bottom: 1px solid
      ${mode === "light" ? `rgba(5, 5, 5, 0.06)` : `rgba(253, 253, 253, 0.12)`};
    position: sticky;
    top: 0;
  `;

  const StyledContent = styled(Content)`
    min-height: calc(100vh - 72px);
    min-width: 465px;
  `;

  const StyledFooter = styled(Footer)`
    min-width: 465px;
    text-align: center;
  `;

  const Logo = ({ title }: { title: string }) => {
    return (
      <>
        <img
          src="./logo.png"
          alt="Logo"
          css={`
            display: inline-block;
            height: 60px;
            width: 60px;
          `}
        />
        <h1
          css={`
            display: inline-block;
            height: 60px;
            width: 108px;
            margin-left: 6px;
            margin-top: 16px;
            font-size: 32px;
            font-weight: 600;
            color: ${mode === "light"
              ? `rgba(0, 0, 0, 0.88)`
              : `rgba(255, 255, 255, 0.85)`};
          `}
        >
          {title}
        </h1>
      </>
    );
  };

  const Home = () => {
    return (
      <Link
        to={url.link("home", "site")}
        css={`
          display: flex;
          align-items: center;
          height: 72px;
          width: 180px;
          position: absolute;
          left: 24px;
        `}
      >
        <Logo title="EESΛST" />
      </Link>
    );
  };

  const Navigation = () => {
    const items = [
      {
        key: "contest",
        label: (
          <Link to={url.link("contest", "site")} ref={contestRef}>
            赛事互动 CONTEST
          </Link>
        ),
      },
      {
        key: "info",
        label: (
          <Link to={url.link("info", "site")} ref={infoRef}>
            信息化平台 INFO
          </Link>
        ),
      },
      {
        key: "share",
        label: (
          <Link to={url.link("share", "site")} ref={shareRef}>
            资源共享 SHARE
          </Link>
        ),
      },
    ];

    const { width } = useWindowSize();
    if (width > 888) {
      return (
        <Menu
          css={`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 72px;
            width: 960px;
            font-size: 18px;
          `}
          mode="horizontal"
          selectedKeys={[url.site]}
          items={items}
        />
      );
    } else {
      return (
        <Popover
          placement="bottom"
          content={<Menu mode="inline" items={items} />}
          trigger="click"
        >
          <Button icon={<MenuOutlined />} size="large" type="text" />
        </Popover>
      );
    }
  };

  const ThemeSwitch = () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const [isOverridden, setIsOverridden] = useState(false);

    useEffect(() => {
      // 检查是否有保存的主题设置
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setMode(savedTheme as "light" | "dark");
        setIsOverridden(true);
      } else {
        // 否则跟随系统
        setMode(prefersDark.matches ? "dark" : "light");
      }

      const handleChange = (e: any) => {
        if (!isOverridden) {
          setMode(e.matches ? "dark" : "light");
        }
      };

      prefersDark.addEventListener("change", handleChange);
      return () => prefersDark.removeEventListener("change", handleChange);
    }, [isOverridden, prefersDark]);

    return (
      <Switch
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 120px;
        `}
        ref={themeRef}
        checked={mode === "light"}
        onChange={() => {
          const newMode = mode === "dark" ? "light" : "dark";
          setMode(newMode);
          setIsOverridden(true);
          localStorage.setItem("theme", newMode);
        }}
        checkedChildren="日"
        unCheckedChildren="夜"
      />
    );
  };

  const NotificationSwitch = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(
      !!localStorage.getItem("subscription"),
    );
    const handleNotificationChange = async () => {
      if (isSubscribed) {
        await unsubscribe(localStorage.getItem("subscription")!);
        localStorage.removeItem("subscription");
        setIsSubscribed(false);
        message.info("已取消订阅");
      } else {
        const result = await subscribe();
        if (result === "Not Supported") {
          message.warning("您的浏览器暂不支持消息推送");
        } else if (result === "Permission Denied") {
          message.warning("您的隐私设置阻止了消息推送，请在地址栏更改设置");
        } else if (result === "Timeout") {
          message.warning("订阅超时，暂不支持Google消息服务");
        } else if (result === "Failed to Subscribe") {
          message.error("订阅失败");
        } else {
          localStorage.setItem("subscription", result);
          setIsSubscribed(true);
          message.success("已订阅来自EESAST的消息");
        }
      }
    };
    return user.isLoggedIn ? (
      <Button
        type="link"
        icon={
          isSubscribed ? (
            <NotificationTwoTone
              style={{ fontSize: "20px" }}
              twoToneColor="#52c41a"
            />
          ) : (
            <NotificationOutlined style={{ fontSize: "20px" }} />
          )
        }
        onClick={handleNotificationChange}
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
          position: absolute;
          right: 80px;
          color: ${mode === "light"
            ? `rgba(0, 0, 0, 0.88)`
            : `rgba(255, 255, 255, 0.85)`};
        `}
      />
    ) : (
      <></>
    );
  };

  const User = () => {
    return (
      <Link
        to={url.link("user", "site")}
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: ${user.isLoggedIn ? `32px` : `64px`};
          position: absolute;
          right: 32px;
        `}
      >
        {user.isLoggedIn ? (
          <Avatar style={{ fontSize: "16px" }} src={imageUrl} />
        ) : (
          <Button>登录</Button>
        )}
      </Link>
    );
  };

  const steps: TourProps["steps"] = [
    {
      title: "2024 新版来袭！",
      description:
        "科协官网全新改版，更现代的UI，更丰富的功能，更好的用户体验。新版官网分为三个子站，下面让我们分别介绍它们：",
      target: null,
      cover: <img src="/backgrounds/2024new.jpg" alt="2024New" />,
      mask: {
        style: {
          backdropFilter: "blur(8px)",
        },
      },
    },
    {
      title: "赛事互动站",
      description:
        "新版官网致力于为所有选手和赛事组织者提供更好的参赛体验，包括试玩功能、数据透视功能、以及全新设计的页面布局，让您轻松上手，玩转比赛！",
      placement: "bottom",
      target: () => contestRef.current,
    },
    {
      title: "信息化平台",
      description:
        "信息化平台是与院系合作建设的学生操作平台，目前囊括了新生导师和奖学金申请功能，未来将覆盖学习生活的更多方面，敬请期待！",
      placement: "bottom",
      target: () => infoRef.current,
    },
    {
      title: "资源共享站",
      description:
        "资源共享站是新版官网整合而成的全新子站，希望为同学们接入更多有趣的资源，包括课程资料、技术分享、以及娱乐活动等，让您的大学生活更加丰富多彩！",
      placement: "bottom",
      target: () => shareRef.current,
    },
    {
      title: "暗色模式",
      description: "此外还有炫酷的暗色模式，即护眼又极客，快来体验一下吧！",
      placement: "bottom",
      target: () => themeRef.current,
    },
  ];

  const TourGuide = () => {
    const [open, setOpen] = useState<boolean>(
      localStorage.getItem("tour") !== "true" &&
        process.env.NODE_ENV !== "development",
    );
    return (
      <Tour
        open={open && !isMobile}
        onClose={() => {
          setOpen(false);
          localStorage.setItem("tour", "true");
        }}
        steps={steps}
      />
    );
  };

  useEffect(() => {
    let isMounted = true; // 防止组件卸载后更新状态

    const fetchAvatar = () => {
      listFile(`avatar/${user.uuid}/`)
        .then((files) => {
          const imageFiles = files.filter((file) =>
            /\.(jpe?g|png)$/i.test(file.Key),
          );
          if (imageFiles.length > 0) {
            const firstImage = imageFiles[0];
            return getAvatarUrl(firstImage.Key);
          } else {
            setImageUrl("/UserOutlined.png"); // 替换为默认头像 URL
            return null;
          }
        })
        .then((url) => {
          if (url && isMounted) {
            setImageUrl(url);
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("Failed to load avatar:", error);
            message.error("加载头像失败");
          }
        })
        .finally(() => {
          // 这里调用下次请求
          if (isMounted) {
            setTimeout(fetchAvatar, 500); // 请求完成后 1 秒再发起下一个请求
          }
        });
    };

    // 初次请求
    fetchAvatar();

    // 清理函数，避免组件卸载时执行更新操作
    return () => {
      isMounted = false;
    };
  }, [user.uuid]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm:
          mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <TourGuide />
      <Layout>
        <StyledHeader>
          <Home />
          <Navigation />
          <ThemeSwitch />
          <NotificationSwitch />
          <User />
        </StyledHeader>
        <StyledContent>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route
                path="home/*"
                element={<HomeSite mode={mode} user={user} />}
              />
              <Route
                path="contest/*"
                element={<ContestSite mode={mode} user={user} />}
              />
              <Route
                path="info/*"
                element={
                  <Authenticate role={tsinghuaRoles} user={user}>
                    <InfoSite mode={mode} user={user} />
                  </Authenticate>
                }
              />
              <Route
                path="share/*"
                element={<ShareSite mode={mode} user={user} />}
              />
              <Route
                path="user/*"
                element={<UserSite mode={mode} user={user} setUser={setUser} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </StyledContent>
        <StyledFooter>
          <h2>友情链接</h2>
          <p>
            <a href="https://www.tsinghua.edu.cn/">
              清华大学官网 <ExportOutlined />
            </a>
            &nbsp;&nbsp;
            <a href="https://www.ee.tsinghua.edu.cn/">
              电子工程系官网 <ExportOutlined />
            </a>
            &nbsp;&nbsp;
            <a href="https://github.com/eesast">
              科协GitHub仓库 <ExportOutlined />
            </a>
          </p>
          <p>
            <a href="https://beian.miit.gov.cn/">京ICP备2023014732号-1</a> ©
            2024 EESAST
          </p>
        </StyledFooter>
        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
