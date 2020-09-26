import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  message,
  Tooltip,
  Spin,
  Result,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Location } from "history";
import styled from "styled-components";
import Center from "../components/Center";
import axios, { AxiosError } from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import IsEmail from "isemail";
import Picture from "../components/Picture";

(window as any).recaptchaOptions = {
  useRecaptchaNet: true,
};

const Background = styled.div`
  height: calc(100vh - 67px);
  width: 100%;
  background-image: url("${process.env
    .REACT_APP_STATIC_URL}/public/images/tsinghua-background-fall.jpg/compressed");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Logo = () => (
  <Picture
    src={`${process.env.REACT_APP_STATIC_URL}/public/images/logo.png`}
    alt="Logo"
    width="40%"
  />
);

const LoginPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ from?: Location<unknown> }>();
  const register = location.pathname === "/register";
  const reset = location.pathname.startsWith("/reset");
  const urlParams = new URLSearchParams(location.search);
  const resetToken = urlParams.get("token");
  const verify = location.pathname.startsWith("/verify");
  const verifyToken = urlParams.get("token");
  const verifyType = urlParams.get("type");
  const from = location.state?.from;

  const [loading, setLoading] = useState(false);

  const [verifySuccess, setVerifySuccess] = useState<boolean | null>(null);
  useEffect(() => {
    if (verifyType && verifyToken) {
      (async () => {
        try {
          await axios.post("/users/verify", {
            action: "fulfill",
            type: verifyType,
            token: verifyToken,
          });
          setVerifySuccess(true);
        } catch (e) {
          const err = e as AxiosError;
          if (err.response?.status === 401) {
            message.error("邮箱验证链接已失效，请重新申请发送验证邮件");
          } else {
            message.error("未知错误");
          }
          setVerifySuccess(false);
        }
      })();
    }
  }, [verifyToken, verifyType]);

  useEffect(() => {
    if (from) {
      message.info("请先登录");
    }
  }, [from]);

  const onFinish = async (values: any) => {
    setLoading(true);
    if (verify) {
      try {
        await axios.post("/users/verify", {
          ...values,
          action: "request",
          type: "regular",
        });
        message.success("邮箱验证邮件已发送，请注意查收");
        form.resetFields();
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 400) {
          message.error("reCAPTCHA 验证已失效，请重新验证");
        } else {
          message.error("未知错误");
        }
        reCaptchaRef.current?.reset();
      }
    } else if (resetToken) {
      try {
        await axios.post("/users/reset", {
          ...values,
          action: "fulfill",
          token: resetToken,
        });
        message.success("密码更改成功");
        form.resetFields();
        return history.replace("/login");
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 401) {
          message.error("密码重置链接已失效，请重新申请发送重置邮件");
        } else {
          message.error("未知错误");
        }
      }
    } else if (reset) {
      try {
        await axios.post("/users/reset", { ...values, action: "request" });
        message.success("重置密码邮件已发送，请注意查收");
        form.resetFields();
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 400) {
          message.error("reCAPTCHA 验证已失效，请重新验证");
        } else {
          message.error("未知错误");
        }
        reCaptchaRef.current?.reset();
      }
    } else if (register) {
      try {
        await axios.post("/users", values);
        message.success("注册成功");
        form.resetFields();
        return history.replace("/login");
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
        const data = response.data;
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
        localStorage.setItem("token", data.token);
        message.success("登录成功");
        if (from) {
          return history.replace(from.pathname + from.search);
        } else {
          return history.replace("/");
        }
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 401 || err.response?.status === 404) {
          if (
            (err.response?.data as string | undefined)?.includes(
              "Email not verified"
            )
          ) {
            message.error(
              "注册邮箱未验证，请前往邮箱进行验证或重新申请发送验证邮件"
            );
          } else {
            message.error("学号或密码错误");
          }
        } else {
          message.error("未知错误");
        }
      }
    }
    setLoading(false);
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
            {verifyToken && verifyType ? (
              <Center>
                {verifySuccess === true ? (
                  <Result
                    status="success"
                    title="成功验证此邮箱"
                    extra={[
                      <Link key="login" to="/login" replace>
                        返回登录
                      </Link>,
                    ]}
                  />
                ) : verifySuccess === false ? (
                  <Result
                    status="error"
                    title="验证邮箱失败"
                    subTitle="请重新申请发送验证邮件"
                    extra={[
                      <Link key="login" to="/login" replace>
                        返回登录
                      </Link>,
                    ]}
                  />
                ) : (
                  <Spin />
                )}
              </Center>
            ) : verify ? (
              <Form form={form} onFinish={onFinish}>
                <Form.Item>
                  <Center>
                    <Logo />
                  </Center>
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "请输入注册时所用邮箱" },
                    () => ({
                      validator(rule, value) {
                        if (!value || IsEmail.validate(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject("请输入正确的邮箱");
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="注册时所用邮箱"
                    autoComplete="email"
                    spellCheck={false}
                    autoFocus
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
                  <Button type="primary" htmlType="submit" loading={loading}>
                    发送验证邮件
                  </Button>
                  <Link
                    css={`
                      margin-left: 16px;
                    `}
                    to="/login"
                    replace
                  >
                    返回登录
                  </Link>
                </Form.Item>
              </Form>
            ) : resetToken ? (
              <Form form={form} onFinish={onFinish}>
                <Form.Item>
                  <Center>
                    <Logo />
                  </Center>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "请输入新密码" },
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
                    placeholder="新密码"
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
                    placeholder="确认新密码"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    更改密码
                  </Button>
                  <Link
                    css={`
                      margin-left: 16px;
                    `}
                    to="/reset"
                    replace
                  >
                    重发邮件
                  </Link>
                </Form.Item>
              </Form>
            ) : reset ? (
              <Form form={form} onFinish={onFinish}>
                <Form.Item>
                  <Center>
                    <Logo />
                  </Center>
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "请输入注册时所用邮箱" },
                    () => ({
                      validator(rule, value) {
                        if (!value || IsEmail.validate(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject("请输入正确的邮箱");
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="注册时所用邮箱"
                    autoComplete="email"
                    spellCheck={false}
                    autoFocus
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
                  <Button type="primary" htmlType="submit" loading={loading}>
                    发送重置邮件
                  </Button>
                  <Link
                    css={`
                      margin-left: 16px;
                    `}
                    to="/login"
                    replace
                  >
                    返回登录
                  </Link>
                </Form.Item>
              </Form>
            ) : register ? (
              <Form form={form} onFinish={onFinish}>
                <Form.Item>
                  <Center>
                    <Logo />
                  </Center>
                </Form.Item>
                <Form.Item
                  name="email"
                  label={
                    <span>
                      邮箱&nbsp;
                      <Tooltip title="推荐使用非清华邮箱">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    { required: true, message: "请输入邮箱" },
                    () => ({
                      validator(rule, value) {
                        if (!value || IsEmail.validate(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject("请输入正确的邮箱");
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="邮箱"
                    autoComplete="email"
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
                  <Button type="primary" htmlType="submit" loading={loading}>
                    注册
                  </Button>
                  <Link
                    css={`
                      margin-left: 16px;
                    `}
                    to="/login"
                    replace
                  >
                    返回登录
                  </Link>
                </Form.Item>
              </Form>
            ) : (
              <Form form={form} onFinish={onFinish}>
                <Form.Item>
                  <Center>
                    <Logo />
                  </Center>
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "请输入邮箱" },
                    () => ({
                      validator(rule, value) {
                        if (!value || IsEmail.validate(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject("请输入正确的邮箱");
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="邮箱"
                    autoComplete="email"
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
                  <Link to="/reset" replace>
                    忘记密码？
                  </Link>{" "}
                  <Link to="/verify" replace>
                    注册邮箱未验证？
                  </Link>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    登录
                  </Button>
                  <Link
                    css={`
                      margin-left: 16px;
                    `}
                    to="/register"
                    replace
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
