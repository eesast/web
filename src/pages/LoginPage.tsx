import React, { useEffect, useRef } from "react";
import { Form, Input, Button, Card, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { History, Location } from "history";
import styled from "styled-components";
import Center from "../components/Center";
import logo from "../assets/logo.png";
import axios, { AxiosError } from "axios";
import { useApolloClient, gql } from "@apollo/client";
import isNumber from "is-number";
import ReCAPTCHA from "react-google-recaptcha";

(window as any).recaptchaOptions = {
  useRecaptchaNet: true,
};

const Background = styled.div`
  height: calc(100vh - 67px);
  width: 100%;
  background-image: url("${process.env.REACT_APP_STATIC_URL}/public/images/tsinghua-background-summer.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const LoginPage: React.FC = () => {
  const client = useApolloClient();

  const history = useHistory();
  const location = useLocation<{ from?: Location<History.PoorMansUnknown> }>();
  const register = location.pathname === "/register";
  const from = location.state?.from;

  useEffect(() => {
    if (from) {
      message.info("请先登录");
    }
  }, [from]);

  const onFinish = async (values: any) => {
    if (register) {
      try {
        await axios.post("/users", values);
        message.success("注册成功");
        form.resetFields();
        history.push("/login");
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 400) {
          message.error("reCAPTCHA 验证已失效，请重新验证");
        } else {
          message.error("该学号已被注册");
        }
        reCaptchaRef.current?.reset();
      }
    } else {
      try {
        const response = await axios.post("/users/login", values);
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
        if (err.response?.status === 401 || err.response?.status === 404) {
          message.error("学号或密码错误");
        } else {
          message.error("未知错误");
        }
      }
    }
  };

  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const [form] = Form.useForm();

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
              width: 360px;
              padding-top: 24px;
              padding-bottom: 12px;
              &.ant-card-bordered {
                cursor: default;
              }
            `}
          >
            {register ? (
              <Form form={form} onFinish={onFinish}>
                <Form.Item>
                  <Center>
                    <img src={logo} alt="Logo" width="40%" />
                  </Center>
                </Form.Item>
                <Form.Item
                  name="id"
                  rules={[
                    { required: true, message: "请输入学号" },
                    () => ({
                      validator(rule, value) {
                        if (!value || isNumber(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject("请输入正确的学号");
                      },
                    }),
                  ]}
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
                  rules={[
                    { required: true, message: "请输入密码" },
                    () => ({
                      validator(rule, value: string) {
                        if (!value || value.length >= 12) {
                          return Promise.resolve();
                        }
                        return Promise.reject("请输入长度至少为 12 位的密码");
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    autoComplete="new-password"
                    spellCheck={false}
                    placeholder="密码"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "请再次输入相同的密码" },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("两次输入的密码不一致");
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    autoComplete="new-password"
                    spellCheck={false}
                    placeholder="确认密码"
                  />
                </Form.Item>
                <Form.Item
                  name="recaptcha"
                  rules={[{ required: true, message: "请通过 reCAPTCHA 验证" }]}
                >
                  <ReCAPTCHA
                    ref={reCaptchaRef}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    注册
                  </Button>
                  <Link
                    css={`
                      margin-left: 16px;
                    `}
                    to="/login"
                  >
                    返回登录
                  </Link>
                </Form.Item>
              </Form>
            ) : (
              <Form form={form} onFinish={onFinish}>
                <Form.Item>
                  <Center>
                    <img src={logo} alt="Logo" width="40%" />
                  </Center>
                </Form.Item>
                <Form.Item
                  name="id"
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
            )}
          </Card>
        </Col>
      </Row>
    </Background>
  );
};

export default LoginPage;
