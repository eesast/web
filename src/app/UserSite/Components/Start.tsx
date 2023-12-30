import { Button, Form, Input, Tooltip } from "antd";
import React from "react";
import Center from "../../Components/Center";
import { validateEmail, validateNumber } from "@/api/helpers/validator";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface StartProps {
  title: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  hasTooltip: boolean;
}

const Start: React.FC<StartProps> = ({
  title,
  setEmail,
  setPhone,
  hasTooltip,
}) => {
  const navigate = useNavigate();
  const handleFinish = (values: any) => {
    if (values.user.includes("@")) {
      setEmail(values.user);
    } else {
      setPhone(values.user);
    }
    return;
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
        name="user"
        rules={[
          { required: true, message: "请输入邮箱/手机号" },
          () => ({
            validator(rule, value) {
              if (!value || validateEmail(value) || validateNumber(value)) {
                return Promise.resolve();
              }
              return Promise.reject("请输入正确的邮箱/手机号");
            },
          }),
        ]}
        css={`
          margin-bottom: 48px;
        `}
      >
        <Input
          prefix={<UserOutlined />}
          suffix={
            hasTooltip && (
              <Tooltip title="不推荐使用清华邮箱">
                <QuestionCircleOutlined />
              </Tooltip>
            )
          }
          placeholder="邮箱/手机号"
          autoComplete="email"
          spellCheck={false}
          autoFocus
        />
      </Form.Item>
      <Center>
        <Button onClick={() => navigate(-1)}>返回</Button>
        <Button
          type="primary"
          htmlType="submit"
          css={`
            margin-left: 16px;
          `}
        >
          去验证邮箱/手机
        </Button>
      </Center>
    </Form>
  );
};

export default Start;
