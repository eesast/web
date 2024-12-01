import { Button, Form, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
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
  useNewToken?: boolean;
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
  useNewToken = false,
}) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [sendLoading, setSendLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [time, setTime] = useState(0);
  const timer = useRef<null | NodeJS.Timeout>(null);

  const handleSend = async () => {
    if (time <= 0) {
      try {
        setSendLoading(true);
        let request = {};
        if (email) {
          request = { email: email };
        } else if (phone) {
          request = { phone: phone };
        } else {
          message.error("系统错误，请联系管理员");
          return navigate(-1);
        }
        const response = await axios.post("/user/send-code", request);
        if (response.status === 500) {
          message.error("邮件发送失败，请检查邮箱是否正确");
          return setSendLoading(false);
        } else if (response.status === 501) {
          message.error("短信发送失败，请检查手机号是否正确");
          return setSendLoading(false);
        }
        const data = response.data;
        // 先 hard code 一波，后续改后端
        if (useNewToken) {
          localStorage.setItem(
            email ? "verificationEmailToken" : "verificationPhoneToken",
            data.token,
          );
        } else {
          localStorage.setItem("verificationToken", data.token);
        }
        message.success("发送成功");
        setTime(60);
        return setSendLoading(false);
      } catch (e) {
        const err = e as AxiosError;
        if (err.response) {
          if (err.response.status === 500) {
            message.error("邮件发送失败，请检查邮箱是否正确");
          } else if (err.response.status === 501) {
            message.error("短信发送失败，请检查手机号是否正确");
          } else {
            message.error("未知错误");
          }
        } else {
          message.error("请求失败，无法连接到服务器");
        }
        console.log(err);
        setSendLoading(false);
      }
    }
  };

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }, []);

  useEffect(() => {
    if (time === 60)
      timer.current = setInterval(() => setTime((time) => --time), 1000);
    else if (time <= 0) timer.current && clearInterval(timer.current);
  }, [time]);

  const handleFinish = async (values: any) => {
    const verifyToken = useNewToken
      ? localStorage.getItem(
          email ? "verificationEmailToken" : "verificationPhoneToken",
        )
      : localStorage.getItem("verificationToken");
    if (!verifyToken) {
      message.error("请先点击发送验证码");
      return;
    }
    setConfirmLoading(true);
    try {
      const request = {
        verificationCode: values.code,
        verificationToken: verifyToken,
      };
      await axios.post("/user/verify", request);
      setter(values.code);
      return setConfirmLoading(false);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("验证码错误");
      } else {
        console.log(err);
        message.error("未知错误");
      }
      return setConfirmLoading(false);
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
          disabled={time > 0}
          loading={sendLoading}
          css={`
            margin-left: 16px;
          `}
        >
          发送验证码 {time > 0 ? `(${time})` : ""}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={confirmLoading}
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
