import {
  Layout,
  Menu,
  Button,
  BackTop,
  Row,
  Col,
  Space,
  Popover,
  Dropdown,
} from "antd";
import { UserOutlined, MenuOutlined, ExportOutlined } from "@ant-design/icons";
import { Route, Link, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import { useWindowSize } from "../api/hooks/windowsize";
import HomeSite from "./HomeSite";
import ContestSite from "./ContestSite";
import InfoSite from "./InfoSite";
import LoginPage from "./UserSite/LoginPage";
import ShareSite from "./ShareSite";
import ProfilePage from "./ProfilePage";
import NotFoundPage from "./NotFoundPage";
import Picture from "./Components/Picture";
import Authenticate, { userRoles } from "./Components/Authenticate";
import { useUrl } from "../api/hooks/url";

// import "antd/dist/antd.dark.css";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale("zh-cn");

const { Header, Footer, Content } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  z-index: 99;
  height: 67px;
  border-bottom: 2px #eee solid;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

const FullRow = styled(Row)`
  width: 100%;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

const UserMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/profile">个人页面</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/login">登录</Link>
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
    >
      退出
    </Menu.Item>
  </Menu>
);

function App() {
  const url = useUrl();
  const { width } = useWindowSize();

  const menu = (
    <Menu
      id="nav"
      key="nav"
      theme="light"
      mode={width < 768 ? "inline" : "horizontal"}
      defaultSelectedKeys={["home"]}
      selectedKeys={[url.site]}
    >
      <Menu.Item key="contest">
        <Link to={url.link("contest", "site")}>赛事互动 CONTEST</Link>
      </Menu.Item>
      <Menu.Item key="info">
        <Link to={url.link("info", "site")}>信息化平台 INFO</Link>
      </Menu.Item>
      <Menu.Item key="share">
        <Link to={url.link("share", "site")}>资源共享 SHARE</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <StyledHeader>
        <FullRow justify="space-between">
          <Col xxl={4} xl={4} lg={7} md={7} sm={19} xs={19}>
            <Space size="large">
              <Logo>
                <Space size="middle">
                  <Link to={url.link("home", "site")}>
                    <Picture
                      src={`${process.env.REACT_APP_STATIC_URL}/public/images/logo.png`}
                      alt="Logo"
                      height="48"
                    />
                  </Link>
                  <Link
                    to={url.link("home", "site")}
                    style={{ color: "black", fontSize: "large" }}
                  >
                    <Title> EESΛST</Title>
                  </Link>
                </Space>
              </Logo>
            </Space>
          </Col>
          <Col xxl={19} xl={19} lg={16} md={16} sm={4} xs={4}>
            {width < 768 ? (
              <Popover placement="bottomRight" content={menu} trigger="click">
                <Button icon={<MenuOutlined />} size="large" type="text" />
              </Popover>
            ) : (
              <div id="menu">{menu}</div>
            )}
          </Col>
          <Col span={1}>
            <Dropdown overlay={UserMenu} placement="bottomRight">
              <Button icon={<UserOutlined />} />
            </Dropdown>
          </Col>
        </FullRow>
      </StyledHeader>
      <Content
        css={`
          margin-top: 67px;
        `}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home/*" element={<HomeSite />} />
          <Route
            path="contest/*"
            element={
              <Authenticate role={userRoles}>
                <ContestSite />
              </Authenticate>
            }
          />
          <Route
            path="info/*"
            element={
              <Authenticate role={userRoles}>
                <InfoSite />
              </Authenticate>
            }
          />
          <Route
            path="share/*"
            element={
              <Authenticate role={userRoles}>
                <ShareSite />
              </Authenticate>
            }
          />
          <Route path="login/*" element={<LoginPage />} />
          {/* <Route path="(login|register|reset|verify)/*" element={<LoginPage />} /> */}
          <Route
            path="profile/*"
            element={
              <Authenticate role={userRoles}>
                <ProfilePage />
              </Authenticate>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Content>
      <StyledFooter>
        <h2>友情链接</h2>
        <p>
          <a href="https://docs.eesast.com">DOCS</a> <ExportOutlined />{" "}
          &nbsp;&nbsp;
          <a href="https://overleaf.eesast.com">
            OVERLEAF
          </a> <ExportOutlined /> &nbsp;&nbsp;
          <a href="https://mc.eesast.com">MINECRAFT</a> <ExportOutlined />
        </p>
        <p>
          <a href="https://beian.miit.gov.cn/">京ICP备2023014732号-1</a> © 2023
          EESAST
        </p>
      </StyledFooter>
      <BackTop />
    </Layout>
  );
}

export default App;
