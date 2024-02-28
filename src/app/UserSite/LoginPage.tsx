import { Button, Form, Input, message } from "antd";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Center from "../Components/Center";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useUrl } from "../../api/hooks/url";
import Background from "./Components/Background";
import {
  validateEmail,
  validateNumber,
  validateUsername,
} from "../../api/utils/validator";
import { UserProps } from ".";

const LoginPage: React.FC<UserProps> = ({ mode, user, setUser }) => {
  const navigate = useNavigate();
  const url = useUrl();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const request = {
        user: values.user,
        password: values.password,
      };
      const response = await axios.post("/user/login", request);
      const data = response.data;
      setUser(data.token);
      message.success("登录成功");
      setLoading(false);
      return navigate(-1);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        if (
          (err.response?.data as string | undefined)?.includes(
            "User doesn't exist",
          )
        ) {
          message.error("用户不存在");
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

  return (
    <Background mode={mode} imageIndex={(Date.now() % 233333) / 233333}>
      <Form onFinish={onFinish}>
        <Center>
          <img src="/logo.png" alt="Logo" height="256" />
        </Center>
        <Form.Item
          name="user"
          rules={[
            { required: true, message: "请输入用户名/邮箱/手机号" },
            () => ({
              validator(rule, value) {
                if (
                  !value ||
                  validateEmail(value) ||
                  validateNumber(value) ||
                  validateUsername(value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject("请输入正确的用户名/邮箱/手机号");
              },
            }),
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="用户名/邮箱/手机号"
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
    </Background>
  );
};

export default LoginPage;
