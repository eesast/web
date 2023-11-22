import { Button, Form, Input, message } from "antd";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Center from "../Components/Center";
import { validateEmail } from "../../api/helpers/validator";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useUrl } from "../../api/hooks/url";

const Background = styled.div<{ url: string }>`
  height: calc(100vh - 67px);
  width: 100%;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;

const LoginCard = styled.div`
  width: 360px;
  padding-top: 12px;
  padding-bottom: 36px;
  padding-left: 36px;
  padding-right: 36px;
  border-radius: 6px;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(36px);
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const url = useUrl();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post("/users/login", values);
      const data = response.data;
      localStorage.setItem("token", data.token);
      message.success("登录成功");
      setLoading(false);
      return navigate(-1);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401 || err.response?.status === 404) {
        // TODO: Change email verification process
        if (
          (err.response?.data as string | undefined)?.includes(
            "Email not verified",
          )
        ) {
          message.error(
            "注册邮箱未验证，请前往邮箱进行验证或重新申请发送验证邮件",
          );
        } else {
          message.error("邮箱或密码错误");
        }
      } else {
        console.log(err);
        message.error("未知错误");
      }
    }
    setLoading(false);
  };

  const backgrounds = [
    `/backgrounds/tsinghua-fall.jpg`,
    `/backgrounds/integrated-circuits.jpg`,
    `/backgrounds/signals.jpg`,
    `/backgrounds/cognition.jpg`,
  ];
  const background =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

  return (
    <Background url={background}>
      <Center>
        <LoginCard>
          <Center>
            <img src="/logo.png" alt="Logo" height="256" />
          </Center>
          <Form onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "请输入邮箱" },
                () => ({
                  validator(rule, value) {
                    if (!value || validateEmail(value)) {
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
              css={`
                margin-bottom: 48px;
              `}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                autoComplete="current-password"
                spellCheck={false}
                placeholder="密码"
              />
            </Form.Item>
            <Center>
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
              <Link
                css={`
                  margin-left: 16px;
                `}
                to={url.link("register")}
              >
                <Button>注册</Button>
              </Link>
              <Link
                css={`
                  margin-left: 16px;
                `}
                to={url.link("reset")}
              >
                忘记密码？
              </Link>
            </Center>
          </Form>
        </LoginCard>
      </Center>
    </Background>
  );
};

export default LoginPage;
