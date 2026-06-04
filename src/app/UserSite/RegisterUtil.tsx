import React, { useState, useMemo, useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { UserProps } from ".";

const RegisterUtil: React.FC<UserProps> = ({ mode }) => {
  const url = useUrl();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [class_, setClass] = useState("");
  const [depart, setDepart] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageIndex] = useState((Date.now() % 233333) / 233333);
  const [identity, setIdentity] = useState(
    localStorage.getItem("registerIdentity") || "",
  );

  const handleRegister = useCallback(async () => {
    try {
      let request = {
        role: identity,
        name: name,
        password: password,
        email,
        verificationEmailCode: otpEmail,
        verificationEmailToken: localStorage.getItem("verificationEmailToken"),
        studentID: studentId,
        depart: depart || undefined,
        class_: class_ || undefined,
      };
      await axios.post("/user/register", request);
      const successMsg =
        identity === "teacher"
          ? "注册成功，请联系管理员验证教师身份"
          : "注册成功，即将跳转";
      message.success(successMsg);
      const delay = identity === "teacher" ? 5000 : 2000;
      localStorage.removeItem("registerIdentity");

      setTimeout(() => {
        navigate(url.link("profile"));
      }, delay);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("验证码错误");
      } else if (err.response?.status === 409) {
        message.error("用户已存在，若忘记密码可转至登录页点击右下角找回");
      } else if (err.response?.status === 400) {
        message.error("不合法的请求");
      } else if (err.response?.status === 422) {
        message.error("注册信息不完整或验证码有误");
      } else {
        console.log(err);
        message.error("未知错误");
      }
    }
  }, [
    identity,
    name,
    password,
    email,
    otpEmail,
    studentId,
    depart,
    class_,
    navigate,
    url,
  ]);

  const setIdentityAndCache = useCallback((newIdentity: string) => {
    setIdentity(newIdentity);
    localStorage.setItem("registerIdentity", newIdentity);
  }, []);

  const contextValue = useMemo(
    () => ({
      email,
      setEmail,
      studentId,
      setStudentId,
      name,
      setName,
      class_,
      setClass,
      depart,
      setDepart,
      otpEmail,
      setOtpEmail,
      password,
      setPassword,
      identity,
      setIdentity: setIdentityAndCache,
      imageIndex,
      mode,
      handleRegister,
    }),
    [
      email,
      studentId,
      name,
      class_,
      depart,
      otpEmail,
      password,
      identity,
      imageIndex,
      mode,
      handleRegister,
      setIdentityAndCache,
    ],
  );

  return <Outlet context={contextValue} />;
};

export default RegisterUtil;
