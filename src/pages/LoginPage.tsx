import React, { useEffect } from "react";
import { Form, Input, Button, Card, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { History, Location } from "history";
import styled from "styled-components";
import Center from "../components/Center";
import logo from "../assets/logo.png";
import axios, { AxiosError } from "axios";
import { useApolloClient, gql } from "@apollo/client";

const Background = styled.div`
  height: calc(100vh - 67px);
  width: 100%;
  background-image: url("https://static-cdn.eesast.com/public/images/tsinghua-background-summer.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const LoginPage: React.FC = () => {
  const client = useApolloClient();

  const history = useHistory();
  const location = useLocation<{ from?: Location<History.PoorMansUnknown> }>();
  const from = location.state?.from;

  useEffect(() => {
    if (from) {
      message.info("请先登录");
    }
  }, [from]);

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/v1/users/login", values);
      const { token } = response.data;
      client.writeQuery({
        query: gql`
          {
            token
          }
        `,
        data: { token },
      });
      message.success("登录成功");
      if (from) {
        history.replace(from.pathname + from.search);
      } else {
        history.replace("/");
      }
    } catch (e) {
      const err = e as AxiosError;
      if (err.code === "401") {
        message.error("学号或密码错误");
      } else {
        message.error("网络错误");
      }
    }
  };

  return (
    <Background>
      <Row
        css={`
          height: 100%;
        `}
        align="middle"
      >
        <Col offset={16}>
          <Card
            hoverable
            css={`
              width: 300px;
              padding-top: 24px;
              padding-bottom: 12px;
              &.ant-card-bordered {
                cursor: default;
              }
            `}
          >
            <Form onFinish={onFinish}>
              <Form.Item>
                <Center>
                  <img src={logo} alt="Logo" width="40%" />
                </Center>
              </Form.Item>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入学号" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="学号"
                  autoComplete="username"
                  spellCheck={false}
                  autoFocus
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  autoComplete="current-password"
                  spellCheck={false}
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Link to="/reset">忘记密码？</Link>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Link
                  css={`
                    margin-left: 16px;
                  `}
                  to="/register"
                >
                  注册
                </Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Background>
  );
};

export default LoginPage;
