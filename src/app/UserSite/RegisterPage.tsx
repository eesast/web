import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import Background from "./Components/Background";
import axios, { AxiosError } from "axios";
import Verify from "./Components/Verify";
import Password from "./Components/Password";
import { message } from "antd";
import Start from "./Components/Start";
import { UserProps } from ".";

const RegisterPage: React.FC<UserProps> = ({ mode, user, setUser }) => {
  const url = useUrl();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const request = {
        password: password,
        verificationCode: otp,
        verificationToken: localStorage.getItem("verificationToken"),
      };
      const response = await axios.post("/user/register", request);
      const data = response.data;
      setUser(data.token);
      message.success("注册成功");
      navigate(url.link("profile"));
      return navigate(0);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("验证码错误");
      } else {
        console.log(err);
        message.error("未知错误");
      }
    }
  };

  useEffect(() => {
    if (password) {
      handleRegister();
    }
  });

  return (
    <Background mode={mode} imageIndex={(Date.now() % 233333) / 233333}>
      {email === "" && phone === "" ? (
        <Start
          title="填写注册信息"
          setEmail={setEmail}
          setPhone={setPhone}
          hasTooltip={true}
        />
      ) : otp === "" ? (
        <Verify
          title={email === "" ? "验证注册手机号" : "验证注册邮箱"}
          email={email}
          phone={phone}
          setter={setOtp}
        />
      ) : (
        <Password title="请输入密码并妥善保存" setter={setPassword} />
      )}
    </Background>
  );
};

export default RegisterPage;
