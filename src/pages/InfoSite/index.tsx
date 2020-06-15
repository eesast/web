import React from "react";
import {
  useRouteMatch,
  useLocation,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  NotificationOutlined,
  TeamOutlined,
  ContactsOutlined,
  TrophyOutlined,
  ReadOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import NoticePage from "./NoticePage";
import MentorApplicationPage from "./MentorApplicationPage";
import MentorChatPage from "./MentorChatPage";
import HonorApplicationPage from "./HonorApplicationPage";

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

const InfoSite: React.FC = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const page = location.pathname.split("/")[2] ?? "notices";

  return (
    <Layout>
      <FixedSider>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["notices"]}
          selectedKeys={[page]}
        >
          <Menu.Item key="notices">
            <Link to={`${url}/notices`}>
              <NotificationOutlined />
              公告
            </Link>
          </Menu.Item>
          <Menu.ItemGroup key="mentors" title="新生导师">
            <Menu.Item key="mentor-applications">
              <Link to={`${url}/mentor-applications`}>
                <TeamOutlined />
                导师申请
              </Link>
            </Menu.Item>
            <Menu.Item key="mentor-chats">
              <Link to={`${url}/mentor-chats`}>
                <ContactsOutlined />
                导师交流
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="honors-scholarships" title="奖助学金">
            <Menu.Item key="honors">
              <Link to={`${url}/honors`}>
                <TrophyOutlined />
                荣誉
              </Link>
            </Menu.Item>
            <Menu.Item key="scholarships">
              <Link to={`${url}/scholarships`}>
                <ReadOutlined />
                奖学金
              </Link>
            </Menu.Item>
            <Menu.Item key="financial-aid">
              <Link to={`${url}/financial-aid`}>
                <PayCircleOutlined />
                助学金
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </FixedSider>
      <Content
        css={`
          margin-left: 200px;
          padding: 48px 15vw;
        `}
      >
        <Switch>
          <Route exact path="/info">
            <Redirect to="/info/notices" />
          </Route>
          <Route exact path={`${path}/notices`}>
            <NoticePage />
          </Route>
          <Route exact path={`${path}/mentor-applications`}>
            <MentorApplicationPage />
          </Route>
          <Route exact path={`${path}/mentor-chats`}>
            <MentorChatPage />
          </Route>
          <Route exact path={`${path}/honors`}>
            <HonorApplicationPage />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};

export default InfoSite;
