import {
  // Steps,
  message,
} from "antd";
import React from "react";
import { Navigate } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
// import { LockOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";

// const steps = [
//   {
//     title: 'Email',
//     description: "输入注册邮箱",
//     icon: <UserOutlined />,
//   },
//   {
//     title: 'Verification',
//     description: "输入验证码",
//     icon: <SolutionOutlined />,
//   },
//   {
//     title: 'Password',
//     description: "输入密码",
//     icon: <LockOutlined />,
//   },
//   {
//     title: 'Done',
//     description: "注册完成",
//     icon: <SmileOutlined />,
//   },
// ];

const RegisterPage: React.FC = () => {
  const url = useUrl();
  message.info("系统维护中，暂不开放注册");
  return <Navigate to={url.link("home", "site")} />;
  // return (
  //   <Steps current={2} css={`margin: 72px;`}>
  //     {steps.map(item => (
  //       <Steps.Step title={item.title} icon={item.icon} description={item.description} />
  //     ))}
  //   </Steps>
  // )
};

export default RegisterPage;
