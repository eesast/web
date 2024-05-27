import React, { useEffect, useState } from "react";
import { useUrl } from "../../api/hooks/url";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Button, Result, message } from "antd";
import Background from "./Components/Background";
import Verify from "./Components/Verify";
import { UserProps } from ".";

const DeletePage: React.FC<UserProps> = ({ mode, user, setUser }) => {
  const navigate = useNavigate();
  const url = useUrl();

  const email = url.query.get("email") ?? "";
  const phone = url.query.get("phone") ?? "";
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    try {
      const request = {
        verificationCode: otp,
        verificationToken: localStorage.getItem("verificationToken"),
      };
      await axios.post("/user/delete", request);
      setUser(null);
      return setSuccess(true);
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
    if (user && otp) {
      handleDelete();
    }
  });

  return (
    <Background mode={mode} imageIndex={0}>
      {success ? (
        <Result
          status="success"
          title="已成功删除账户"
          subTitle="感谢您的一路相伴"
          extra={[
            <Button
              type="primary"
              onClick={() =>
                navigate(
                  url.delete("email").delete("phone").link("home", "site"),
                )
              }
            >
              返回主页
            </Button>,
          ]}
        />
      ) : (
        <Verify
          title={email === "" ? "敏感操作，请验证手机" : "敏感操作，请验证邮箱"}
          email={email}
          phone={phone}
          setter={setOtp}
        />
      )}
    </Background>
  );
};

export default DeletePage;
