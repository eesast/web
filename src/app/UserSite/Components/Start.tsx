import { Button, Form, Input, Tooltip } from "antd";
import React from "react";
import Center from "../../Components/Center";
import { validateEmail } from "../../../api/helpers/validator";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface StartProps {
  title: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  hasTooltip: boolean;
  onFinish?: () => void;
}

const Start: React.FC<StartProps> = ({
  title,
  setEmail,
  setPhone,
  hasTooltip,
  onFinish,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const handleFinish = (values: any) => {
    setLoading(true);
    if (values.user.includes("@")) {
      setEmail(values.user);
    } else {
      setPhone(values.user);
    }
    setLoading(false);
    return onFinish && onFinish();
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
        css={`
          margin-bottom: 48px;
        `}
      >
        <Input
          prefix={<UserOutlined />}
          suffix={
            hasTooltip && (
              <Tooltip title="推荐使用非清华邮箱">
                <QuestionCircleOutlined />
              </Tooltip>
            )
          }
          placeholder="邮箱"
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
          loading={loading}
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
