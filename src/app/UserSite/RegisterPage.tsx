import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import Background from "./Components/Background";
import axios, { AxiosError } from "axios";
import Verify from "./Components/Verify";
import Password from "./Components/Password";
import { message } from "antd";
import Contact from "./Components/Contact";
import IdentitySelection from "./Components/IdentitySelection";
import { UserProps } from ".";
import * as RealTimeValidator from "./Components/ValidateRealTime";
import * as OnSubmitValidator from "./Components/ValidateOnSubmit";

const RegisterPage: React.FC<UserProps> = ({ mode, user, setUser }) => {
  const url = useUrl();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [class_, setClass] = useState("");
  const [depart, setDepart] = useState("");
  const [phone, setPhone] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpPhone, setOtpPhone] = useState("");
  const [password, setPassword] = useState("");
  const [imageIndex] = useState((Date.now() % 233333) / 233333);
  const [identity, setIdentity] = useState("");

  const handleRegister = async () => {
    try {
      let request = {
        role: identity,
        name: name,
        password: password,
        verificationEmailCode: otpEmail,
        verificationEmailToken: localStorage.getItem("verificationEmailToken"),
        verificationPhoneCode: otpPhone,
        verificationPhoneToken: localStorage.getItem("verificationPhoneToken"),
        studentID: studentId,
        depart: depart,
        class_: class_,
      };
      await axios.post("/user/register-new", request);
      message.success("注册成功，即将跳转登录界面");
      setTimeout(() => {
        navigate(url.link("profile"));
        return navigate(0);
      }, 2000);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("验证码错误");
      } else if (err.response?.status === 409) {
        message.error("用户已存在，若忘记密码可转至登录页点击右下角找回");
      } else if (err.response?.status === 400) {
        message.error("不合法的请求");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const IdentitySelectionProp: React.FC = () => (
    <Background
      mode={mode}
      imageIndex={imageIndex}
      width={1200}
      height={650}
      blur={0}
    >
      <IdentitySelection
        onSelectIdentity={(identity) => {
          setIdentity(identity);
        }}
        onBack={() => {
          navigate(-1);
        }}
      />
    </Background>
  );

  const EmailProp: React.FC<{
    register: boolean;
    mailType: "student" | "teacher" | "guest";
  }> = ({ register, mailType }) => (
    <Background mode={mode} imageIndex={imageIndex}>
      <Contact
        title={
          mailType === "student" || mailType === "teacher"
            ? "填写清华邮箱"
            : "填写邮箱"
        }
        info={
          mailType === "student"
            ? "@mails.tsinghua.edu.cn"
            : mailType === "teacher"
              ? "@tsinghua.edu.cn"
              : "邮箱"
        }
        validRealTime={
          mailType === "student"
            ? RealTimeValidator.__ValidateStudentEmail
            : mailType === "teacher"
              ? RealTimeValidator.__ValidateTeacherEmail
              : RealTimeValidator.__ValidateEmail
        }
        validOnSubmit={async (value) => {
          const [registered, msg] =
            await OnSubmitValidator.__ValidateEmailRegistered(value);
          return [registered !== register, registered === register ? msg : ""];
        }}
        setter={setEmail}
        autoComp="email"
        onBack={() => {
          navigate(-1);
        }}
      />
    </Background>
  );

  const StudentIDProp: React.FC<{
    register: boolean;
  }> = ({ register }) => (
    <Background mode={mode} imageIndex={imageIndex}>
      <Contact
        title="填写学号"
        info="xxxxxxxxxx"
        validRealTime={RealTimeValidator.__ValidateStudentID}
        validOnSubmit={async (value) => {
          const [registered, msg] =
            await OnSubmitValidator.__ValidateStudentIDRegistered(value);
          return [registered !== register, registered === register ? msg : ""];
        }}
        setter={setStudentId}
        onBack={() => {
          navigate(-1);
        }}
      />
    </Background>
  );

  const PhoneProp: React.FC<{
    register: boolean;
  }> = ({ register }) => (
    <Background mode={mode} imageIndex={imageIndex}>
      <Contact
        title="填写手机号 (+86)"
        info="xxxxxxxxxxx"
        validRealTime={RealTimeValidator.__ValidatePhone}
        validOnSubmit={async (value) => {
          const [registered, msg] =
            await OnSubmitValidator.__ValidatePhoneRegistered(value);
          return [registered !== register, registered === register ? msg : ""];
        }}
        setter={setPhone}
        autoComp="tel"
        onBack={() => {
          navigate(-1);
        }}
      />
    </Background>
  );

  const NameProp: React.FC = () => (
    <Background mode={mode} imageIndex={imageIndex}>
      <Contact
        title="填写姓名"
        info="姓名"
        validRealTime={RealTimeValidator.__ValidateName}
        setter={setName}
        onBack={() => {
          navigate(-1);
        }}
      />
    </Background>
  );

  const ClassProp: React.FC = () => (
    <Background mode={mode} imageIndex={imageIndex}>
      <Contact
        title="填写班级"
        info="无xx / 无研xx / ..."
        validRealTime={RealTimeValidator.__ValidateClass}
        setter={setClass}
        onBack={() => {
          navigate(-1);
        }}
      />
    </Background>
  );

  const DepartProp: React.FC = () => (
    <Background mode={mode} imageIndex={imageIndex}>
      <Contact
        title="填写院系"
        info="电子工程系 / ..."
        setter={setDepart}
        onBack={() => {
          navigate(-1);
        }}
      />
    </Background>
  );

  const VerifyProp: React.FC<{
    email: string;
    phone: string;
  }> = ({ email, phone }) => (
    <Background mode={mode} imageIndex={imageIndex}>
      <Verify
        title={email === "" ? "验证手机号" : "验证邮箱"}
        email={email}
        phone={phone}
        setter={email === "" ? setOtpPhone : setOtpEmail}
        useNewToken={true}
      />
    </Background>
  );

  const PasswordProp: React.FC = () => (
    <Background mode={mode} imageIndex={imageIndex}>
      <Password title="请输入密码并妥善保存" setter={setPassword} />
    </Background>
  );

  return (
    <>
      {identity === "student" ? (
        email === "" ? (
          <EmailProp register={true} mailType="student" />
        ) : otpEmail === "" ? (
          <VerifyProp email={email} phone="" />
        ) : phone === "" ? (
          <PhoneProp register={true} />
        ) : otpPhone === "" ? (
          <VerifyProp email="" phone={phone} />
        ) : studentId === "" ? (
          <StudentIDProp register={true} />
        ) : name === "" ? (
          <NameProp />
        ) : class_ === "" ? (
          <ClassProp />
        ) : depart === "" ? (
          <DepartProp />
        ) : (
          <PasswordProp />
        )
      ) : identity === "teacher" ? (
        email === "" ? (
          <EmailProp register={true} mailType="teacher" />
        ) : otpEmail === "" ? (
          <VerifyProp email={email} phone="" />
        ) : phone === "" ? (
          <PhoneProp register={true} />
        ) : otpPhone === "" ? (
          <VerifyProp email="" phone={phone} />
        ) : name === "" ? (
          <NameProp />
        ) : depart === "" ? (
          <DepartProp />
        ) : (
          <PasswordProp />
        )
      ) : identity === "guest" ? (
        email === "" ? (
          <EmailProp register={true} mailType="guest" />
        ) : otpEmail === "" ? (
          <VerifyProp email={email} phone="" />
        ) : phone === "" ? (
          <PhoneProp register={true} />
        ) : otpPhone === "" ? (
          <VerifyProp email="" phone={phone} />
        ) : name === "" ? (
          <NameProp />
        ) : (
          <PasswordProp />
        )
      ) : (
        <IdentitySelectionProp />
      )}
    </>
  );
};

export default RegisterPage;

/*
学生
1. 清华邮箱、手机号
2. 学号、姓名、班级、院系
3. 密码
4. 用户名、头像 TODO

教师
1. 清华邮箱、手机号
2. 姓名、院系
3. 密码
4. 用户名、头像 TODO
5. info 联系管理员 TODO

访客
1. 邮箱、手机号
2. 姓名
3. 密码
4. 用户名、头像 TODO
*/
