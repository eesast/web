import React, { useEffect } from "react";
import {
  useRouteMatch,
  useLocation,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Layout, Menu, message } from "antd";
import {
  NotificationOutlined,
  TeamOutlined,
  ContactsOutlined,
  TrophyOutlined,
  ReadOutlined,
  PayCircleOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import NoticePage from "./NoticePage";
import MentorApplicationPage from "./MentorApplicationPage";
import MentorChatPage from "./MentorChatPage";
import MentorInfoVerifyPage from "./MentorInfoVerifyPage";
import HonorApplicationPage from "./HonorApplicationPage";
import NotFoundPage from "../NotFoundPage";
import ScholarshipApplicationPage from "./ScholarshipApplicationPage";
import AidApplicationPage from "./AidApplicationPage";
import PostgraduateMentorPage from "./PostgraduateMentorPage";
import PostgraduateApplicationPage from "./PostgraduateApplicationPage";
import { gql, useQuery } from "@apollo/client";
import { GetId, GetRole, GetUserVariables, GetUser } from "../../api/types";
import { GetUser as GET_USER } from "../../api/user.graphql";

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
  const history = useHistory();
  const page = location.pathname.split("/")[2] ?? "notices";

  const { data: userData } = useQuery<GetId & GetRole>(gql`
    {
      _id @client
      role @client
    }
  `);

  const { data } = useQuery<GetUser, GetUserVariables>(GET_USER, {
    variables: { _id: userData?._id! },
  });

  const user = data?.user?.[0];

  useEffect(() => {
    if (
      userData?.role === "user" ||
      !user?.class ||
      !user.department ||
      !user.email ||
      !user.id ||
      !user.name ||
      !user.phone
    ) {
      message.warning("请先补全个人信息，并完成清华邮箱验证");
      history.push("/profile");
    }
  }, [history, user, userData]);

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
          <Menu.ItemGroup key="postgraduate" title="推研信息">
            <Menu.Item key="postgraduate-mentor-info">
              <Link to={`${url}/postgraduate-mentor-info`}>
                <TeamOutlined />
                博士生招生信息
              </Link>
            </Menu.Item>
            {["root", "counselor", "teacher"].includes(userData?.role!) ? (
              <Menu.Item key="mentor-info-verify">
                <Link to={`${url}/mentor-info-verify`}>
                  <VerifiedOutlined />
                  导师信息审核
                </Link>
              </Menu.Item>
            ) : null}
            {["root", "counselor"].includes(userData?.role!) ? (
              <Menu.Item key="postgraduate-application">
                <Link to={`${url}/postgraduate-application`}>
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
          <Route exact path={`${path}/scholarships`}>
            <ScholarshipApplicationPage />
          </Route>
          <Route exact path={`${path}/financial-aid`}>
            <AidApplicationPage />
          </Route>
          <Route exact path={`${path}/postgraduate-mentor-info`}>
            <PostgraduateMentorPage />
          </Route>
          <Route exact path={`${path}/mentor-info-verify`}>
            <MentorInfoVerifyPage />
          </Route>
          <Route exact path={`${path}/postgraduate-application`}>
            <PostgraduateApplicationPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};

export default InfoSite;
