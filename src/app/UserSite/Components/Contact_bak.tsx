import { Button, Form, Input, Tooltip, message } from "antd";
import Center from "../../Components/Center";
import { validateEmail, validatePhoneNumber } from "@/api/utils/validator";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as graphql from "@/generated/graphql";

interface ContactProps {
  title: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  isRegister: boolean;
}

const Contact: React.FC<ContactProps> = ({
  title,
  setEmail,
  setPhone,
  isRegister,
}) => {
  const navigate = useNavigate();
  const { refetch: refetchUserByEmail } = graphql.useGetUserByEmailQuery({
    variables: { email: "" },
  });
  const { refetch: refetchUserByPhone } = graphql.useGetUserByPhoneQuery({
    variables: { phone: "" },
  });
  const handleFinish = async (values: any) => {
    try {
      if (values.user.includes("@")) {
        const { data } = await refetchUserByEmail({ email: values.user });
        if (isRegister) {
          if (data.users.length) {
            message.error("邮箱已被注册");
            return;
          }
        } else {
          if (!data.users.length) {
            message.error("邮箱未注册");
            return;
          }
        }
        setEmail(values.user);
      } else {
        const { data } = await refetchUserByPhone({ phone: values.user });
        if (isRegister) {
          if (data.users.length) {
            message.error("手机号已被注册");
            return;
          }
        } else {
          if (!data.users.length) {
            message.error("手机号未注册");
            return;
          }
        }
        setPhone(values.user);
      }
    } catch (e) {
      message.error("未知错误");
      console.log(e);
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
              if (
                !value ||
                validateEmail(value) ||
                validatePhoneNumber(value)
              ) {
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
            isRegister && (
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

export default Contact;
