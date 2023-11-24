import { message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "./Components/Background";
import Password from "./Components/Password";
import Verify from "./Components/Verify";
import axios, { AxiosError } from "axios";
import Start from "./Components/Start";

const ResetPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleReset = async () => {
    try {
      const request = {
        password: password,
        verificationCode: otp,
        verificationToken: localStorage.getItem("verificationToken"),
      };
      await axios.post("/user/change-password", request);
      message.success("密码更改成功");
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
          message.error("验证码错误");
        }
      } else {
        console.log(err);
        message.error("未知错误");
      }
    }
  };

  return (
    <Background imageIndex={0}>
      {email === "" && phone === "" ? (
        <Start
          title="输入已通过验证的邮箱"
          setEmail={setEmail}
          setPhone={setPhone}
          hasTooltip={true}
        />
      ) : otp === "" ? (
        <Verify
          title={email === "" ? "敏感操作，请验证手机" : "敏感操作，请验证邮箱"}
          email={email}
          phone={phone}
          setter={setOtp}
        />
      ) : (
        <Password
          title="输入新密码并妥善保存"
          setter={setPassword}
          onFinish={handleReset}
        />
      )}
    </Background>
  );
};

export default ResetPage;