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
import { Layout, Menu } from "antd";
import { ControlOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GetUserVariables, GetUser } from "../../api/types";
import { GetUser as GET_USER } from "../../api/user.graphql";
import { getUserInfo } from "../../helpers/auth";
import NotFoundPage from "../NotFoundPage";
import RolePage from "./RolePage";

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

const AdminSite: React.FC = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const page = location.pathname.split("/")[2] ?? "role";

  const userInfo = getUserInfo();

  const { data } = useQuery<GetUser, GetUserVariables>(GET_USER, {
    variables: { _id: userInfo?._id! },
  });

  const user = data?.user?.[0];

  useEffect(() => {
    // if (userInfo?.role !== "root") {
    //   message.warning("无使用权限");
    //   history.push("/");
    // }
  }, [history, user, userInfo]);

  return (
    <Layout>
      <FixedSider>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["role"]}
          selectedKeys={[page]}
        >
          <Menu.Item key="role">
            <Link to={`${url}/role`}>
              <ControlOutlined />
              权限
            </Link>
          </Menu.Item>
        </Menu>
      </FixedSider>
      <Content
        css={`
          margin-left: 200px;
          padding: 48px 10vw;
        `}
      >
        <Switch>
          <Route exact path="/admin">
            <Redirect to="/admin/role" />
          </Route>
          <Route exact path={`${path}/role`}>
            <RolePage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};

export default AdminSite;
