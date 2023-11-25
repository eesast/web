import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { hash } from "../../../api/helpers/hash";
import Center from "../../Components/Center";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../../api/helpers/validator";

interface PasswordProps {
  title: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  onFinish?: () => void;
}

const Password: React.FC<PasswordProps> = ({ title, setter, onFinish }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const password = await hash(values.password);
      setter(password);
      return onFinish && onFinish();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onFinish={handleFinish}>
      <Center>
        <h1
          css={`
            margin-top: 48px;
            margin-bottom: 48px;
            font-size: 28px;
            font-weight: 600;
          `}
        >
          {title}
        </h1>
      </Center>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码" },
          () => ({
            validator(rule, value: string) {
              if (!value || validatePassword(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                "请输入长度至少为 8，需包含大小写字母及数字的密码",
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="密码"
          type="password"
          autoComplete="new-password"
          spellCheck={false}
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请确认密码" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("两次输入的密码不一致");
            },
          }),
        ]}
        css={`
          margin-bottom: 48px;
        `}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="确认密码"
          type="password"
          autoComplete="new-password"
          spellCheck={false}
        />
      </Form.Item>
      <Center>
        <Button onClick={() => navigate(-1)}>返回</Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          css={`
            margin-left: 16px;
          `}
        >
          确认
        </Button>
      </Center>
    </Form>
  );
};

export default Password;
