import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "./Components/Background";
import Password from "./Components/Password";
import Verify from "./Components/Verify";
import axios, { AxiosError } from "axios";
import Contact from "./Components/Contact_bak";
import { useUrl } from "../../api/hooks/url";
import { UserProps } from ".";

const ResetPage: React.FC<UserProps> = ({ mode, user, setUser }) => {
  const url = useUrl();
  const navigate = useNavigate();

  const [email, setEmail] = useState(url.query.get("email") ?? "");
  const [phone, setPhone] = useState(url.query.get("phone") ?? "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      const request = {
        password: password,
        verificationCode: otp,
        verificationToken: localStorage.getItem("verificationToken"),
      };
      await axios.post("/user/change-password", request);
      message.success("密码更改成功");
      navigate(url.delete("email").delete("phone").link("profile"));
      return navigate(0);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("验证码错误");
      } else if (err.response?.status === 404) {
        message.error("用户不存在");
      } else {
        console.log(err);
        message.error("未知错误");
      }
    }
  };

  useEffect(() => {
    if (password) {
      handleReset();
    }
  });

  return (
    <Background mode={mode} imageIndex={(Date.now() % 233333) / 233333}>
      {email === "" && phone === "" ? (
        <Contact
          title="已绑定的邮箱/手机号"
          setEmail={setEmail}
          setPhone={setPhone}
          isRegister={false}
        />
      ) : otp === "" ? (
        <Verify
          title={email === "" ? "敏感操作，请验证手机" : "敏感操作，请验证邮箱"}
          email={email}
          phone={phone}
          setter={setOtp}
        />
      ) : (
        <Password title="输入新密码并妥善保存" setter={setPassword} />
      )}
    </Background>
  );
};

export default ResetPage;
