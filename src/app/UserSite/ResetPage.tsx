import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "./Components/Background";
import Password from "./Components/Password";
import Verify from "./Components/Verify";
import axios, { AxiosError } from "axios";
import Start from "./Components/Start";
import { useUrl } from "../../api/hooks/url";
import { PageProps } from "..";

const ResetPage: React.FC<PageProps> = ({ mode }) => {
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
      return navigate(url.delete("email").delete("phone").link("profile"));
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

  useEffect(() => {
    if (password) {
      handleReset();
    }
  });

  return (
    <Background mode={mode} imageIndex={0}>
      {email === "" && phone === "" ? (
        <Start
          title="已绑定的邮箱/手机号"
          setEmail={setEmail}
          setPhone={setPhone}
          hasTooltip={false}
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
