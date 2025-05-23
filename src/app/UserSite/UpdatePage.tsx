import React, { useEffect } from "react";
import { useUrl } from "../../api/hooks/url";
import Background from "./Components/Background";
import Verify from "./Components/Verify";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserProps } from ".";

const UpdatePage: React.FC<UserProps> = ({ mode, user, setUser }) => {
  const url = useUrl();
  const navigate = useNavigate();
  const email = url.query.get("email") ?? "";
  // const phone = url.query.get("phone") ?? "";
  const isTsinghua = url.query.get("tsinghua") === "true";
  const [otp, setOtp] = React.useState("");

  const handleUpdate = async () => {
    try {
      const request = {
        verificationCode: otp,
        verificationToken: localStorage.getItem("verificationToken"),
        isTsinghua: isTsinghua,
      };
      const response = await axios.post("/user/edit-profile", request);
      if (isTsinghua) {
        const data = response.data;
        setUser(data.token);
      }
      message.success("信息更新成功");
      navigate(url.delete("email").delete("tsinghua").link("profile"));
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
    if (otp) {
      handleUpdate();
    }
  });

  return (
    <Background mode={mode} imageIndex={(Date.now() % 233333) / 233333}>
      <Verify
        title={"验证需绑定的邮箱"}
        email={email}
        // phone={phone}
        setter={setOtp}
      />
    </Background>
  );
};

export default UpdatePage;
