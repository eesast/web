import { Button, Form, message } from "antd";
import React, { useEffect } from "react";
import OTPInput from "react-otp-input";
import Center from "../../Components/Center";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { MailOutlined, MobileOutlined } from "@ant-design/icons";

interface VerifyProps {
  title: string;
  email: string;
  phone: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  onFinish?: () => void;
}

const VerifyCard = styled.div`
  width: 100%;
  height: 48px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: rgba(128, 128, 128, 0.25);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
`;

const Verify: React.FC<VerifyProps> = ({
  title,
  email,
  phone,
  setter,
  onFinish,
}) => {
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [pause, setPause] = React.useState(0);
  const [canSubmit, setCanSubmit] = React.useState(false);

  const handleSend = async () => {
    try {
      let request = {};
      if (email) {
        request = { email: email };
      } else if (phone) {
        request = { phone: phone };
      } else {
        message.error("系统错误，请联系管理员");
        return navigate(-1);
      }
      const response = await axios.post("/users/verify", request);
      const data = response.data;
      localStorage.setItem("verificationToken", data.token);
      message.success("发送成功");
      setCanSubmit(true);
      return setPause(60);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("系统繁忙，请稍后再试");
      } else {
        console.log(err);
        message.error("未知错误");
      }
    }
  };

  useEffect(() => {
    if (pause > 0) {
      setTimeout(() => {
        setPause((prev) => prev - 1);
      }, 1000);
    }
  });

  const handleFinish = (values: any) => {
    if (!canSubmit) {
      message.error("请先点击发送验证码");
      return;
    }
    setLoading(true);
    setter(values.code);
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
      {email !== "" && (
        <VerifyCard>
          <MailOutlined
            css={`
              font-size: 20px;
            `}
          />
          <span
            css={`
              margin-left: 8px;
              font-size: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            {email}
          </span>
        </VerifyCard>
      )}
      {phone !== "" && (
        <VerifyCard>
          <MobileOutlined
            css={`
              font-size: 24px;
            `}
          />
          <span
            css={`
              margin-left: 8px;
              font-size: 24px;
              margin-right: 18px;
            `}
          >
            {phone}
          </span>
        </VerifyCard>
      )}
      <Form.Item
        name="code"
        rules={[
          { required: true, message: "请输入验证码" },
          { len: 6, message: "请输入6位有效验证码" },
        ]}
        css={`
          margin-bottom: 36px;
        `}
      >
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={
            <span
              style={{
                marginLeft: "6px",
                marginRight: "6px",
              }}
            >
              {""}
            </span>
          }
          renderInput={(props) => <input {...props} />}
          inputType="number"
          shouldAutoFocus={true}
          inputStyle={{
            width: "38px",
            height: "48px",
            fontSize: "28px",
            marginBottom: "10px",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            backgroundColor: "transparent",
            outline: "none",
          }}
        />
      </Form.Item>
      <Center>
        <Button onClick={() => navigate(-1)}>返回</Button>
        <Button
          onClick={handleSend}
          disabled={pause > 0}
          css={`
            margin-left: 16px;
          `}
        >
          发送验证码 {pause > 0 ? `(${pause})` : ""}
        </Button>
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

export default Verify;
