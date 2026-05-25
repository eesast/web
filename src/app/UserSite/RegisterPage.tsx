import React, {
  FC,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import {
  useOutletContext,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Form, Button, Input, Typography, Row, Col, message } from "antd";
import {
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
  ArrowLeftOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import styled from "styled-components";

import Background from "./Components/Background";
import ContactAdmin from "../Components/ContactAdmin";
import { validatePassword } from "../../api/utils/validator";
import * as RealTimeValidator from "./Components/ValidateRealTime";

const { Text } = Typography;

const StyledContainer = styled.div<{ mode?: string }>`
  padding: 20px 20px 24px 24px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: ${({ mode }) => (mode === "dark" ? "#ffffffff" : "inherit")};

  .ant-form-item {
    margin-bottom: 20px;
  }

  .ant-form-item-explain {
    display: block;
    margin-top: 2px;
    padding-left: 4px;
    font-size: 12px;
    line-height: 1.2;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 50000s ease-in-out 0s;
    -webkit-text-fill-color: ${({ mode }) =>
      mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.88)"} !important;
    caret-color: ${({ mode }) =>
      mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.88)"};
  }
`;

interface RegisterContext {
  identity: string;
  setIdentity: (identity: string) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  otpEmail: string;
  setOtpEmail: Dispatch<SetStateAction<string>>;
  studentId: string;
  setStudentId: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  imageIndex: number;
  mode: string;
  handleRegister: () => Promise<void>;
}

const InformationPage: FC = () => {
  const context = useOutletContext<RegisterContext>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const identityFromState = location.state?.selectedIdentity || "";
  const currentIdentity = context.identity || identityFromState;

  useEffect(() => {
    if (context.identity === "" && identityFromState) {
      context.setIdentity(identityFromState);
    }
  }, [context, identityFromState]);

  const identity = currentIdentity;
  const {
    email,
    setEmail,
    otpEmail,
    setOtpEmail,
    studentId,
    setStudentId,
    name,
    setName,
    password,
    setPassword,
    imageIndex,
    mode,
    handleRegister,
  } = context;

  const [sendLoading, setSendLoading] = useState(false);
  const [time, setTime] = useState(0);
  const timer = useRef<null | NodeJS.Timeout>(null);
  const [studentIdError, setStudentIdError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (time === 60)
      timer.current = setInterval(() => setTime((t) => --t), 1000);
    else if (time <= 0 && timer.current) clearInterval(timer.current);
  }, [time]);

  const emailValidate = useMemo(() => {
    if (identity === "student") return RealTimeValidator.__ValidateStudentEmail;
    if (identity === "teacher") return RealTimeValidator.__ValidateTeacherEmail;
    return RealTimeValidator.__ValidateEmail;
  }, [identity]);

  const handleSend = async () => {
    if (time > 0) return;
    if (!email) {
      message.error("请输入邮箱地址");
      return;
    }
    const [isValid, errMsg] = emailValidate(email);
    if (!isValid) {
      message.error(errMsg || "邮箱格式不正确");
      return;
    }
    try {
      setSendLoading(true);
      const response = await axios.post("/user/send-code", { email });
      localStorage.setItem("verificationEmailToken", response.data.token);
      message.success("验证码已发送");
      setTime(60);
    } catch (e) {
      message.error("发送失败，请重试");
    } finally {
      setSendLoading(false);
    }
  };

  const handleSubmitRegister = async () => {
    if (!otpEmail || otpEmail.length !== 6) {
      message.error("请输入6位验证码");
      return;
    }
    const verifyToken = localStorage.getItem("verificationEmailToken");
    if (!verifyToken) {
      message.error("请先获取验证码");
      return;
    }

    try {
      await axios.post("/user/verify", {
        verificationCode: otpEmail,
        verificationToken: verifyToken,
      });
      await handleRegister();
    } catch (e) {
      message.error("验证失败，请重试");
    }
  };

  const isAllRequiredFieldsFilled = useMemo(() => {
    if (!email || !otpEmail || !name || !password || emailError) return false;
    if (identity === "student" && (!studentId || studentIdError)) return false;
    return true;
  }, [
    identity,
    email,
    otpEmail,
    name,
    password,
    studentId,
    emailError,
    studentIdError,
  ]);

  const themeColor = mode === "dark" ? "#ffffff" : "#000000";
  const subColor =
    mode === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";

  if (currentIdentity === "")
    return <Navigate to="../identityselection" replace />;
  if (identity === "teacher") return <ContactAdmin />;

  return (
    <Background
      mode={mode}
      imageIndex={imageIndex}
      width={500}
      height={520}
      blur={36}
    >
      <StyledContainer mode={mode}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("../identityselection")}
            style={{ color: themeColor, fontSize: "18px" }}
          />
          <div style={{ marginLeft: 12 }}>
            <Text
              strong
              style={{ fontSize: 18, color: themeColor, display: "block" }}
            >
              {identity === "student" ? "学生账号注册" : "访客账号注册"}
            </Text>
          </div>
        </div>

        <div style={{ overflow: "hidden", flex: 1, paddingRight: 10 }}>
          <Form layout="vertical" requiredMark={false} form={form}>
            <Row gutter={12}>
              <Col span={identity === "student" ? 12 : 24}>
                <Form.Item
                  label={
                    <Text style={{ fontSize: 13, color: themeColor }}>
                      姓名
                    </Text>
                  }
                >
                  <Input
                    prefix={<UserOutlined style={{ color: subColor }} />}
                    placeholder="如：张三"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </Form.Item>
              </Col>
              {identity === "student" && (
                <Col span={12}>
                  <Form.Item
                    label={
                      <Text style={{ fontSize: 13, color: themeColor }}>
                        学号
                      </Text>
                    }
                    validateStatus={studentIdError ? "error" : ""}
                    help={studentIdError}
                  >
                    <Input
                      prefix={<IdcardOutlined style={{ color: subColor }} />}
                      placeholder="10位数字"
                      value={studentId}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setStudentId(val);
                        const [isValid, msg] =
                          RealTimeValidator.__ValidateStudentID(val);
                        setStudentIdError(isValid ? "" : msg);
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label={
                    <Text style={{ fontSize: 13, color: themeColor }}>
                      登录密码
                    </Text>
                  }
                  name="password"
                  rules={[
                    { required: true, message: "请输入密码" },
                    () => ({
                      validator(_, value) {
                        if (!value || validatePassword(value))
                          return Promise.resolve();
                        return Promise.reject("需8位以上大小写字母及数字");
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: subColor }} />}
                    placeholder="密码"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Text style={{ fontSize: 13, color: themeColor }}>
                      确认密码
                    </Text>
                  }
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "请确认密码" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value)
                          return Promise.resolve();
                        return Promise.reject("密码不一致");
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: subColor }} />}
                    placeholder="再次输入"
                    autoComplete="new-password"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={
                <Text style={{ fontSize: 13, color: themeColor }}>
                  邮箱地址
                </Text>
              }
              validateStatus={emailError ? "error" : ""}
              help={emailError}
            >
              <Input
                prefix={<MailOutlined style={{ color: subColor }} />}
                suffix={
                  <Button
                    type="primary"
                    size="small"
                    onClick={handleSend}
                    disabled={time > 0}
                    loading={sendLoading}
                    style={{ fontSize: "12px", height: "24px" }}
                  >
                    {time > 0 ? `${time}s` : "发送验证码"}
                  </Button>
                }
                placeholder="邮箱地址"
                value={email}
                autoComplete="email"
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setEmail(val);
                  const [isValid, msg] = emailValidate(val);
                  setEmailError(isValid ? "" : msg);
                }}
              />
            </Form.Item>

            <Form.Item
              label={
                <Text style={{ fontSize: 13, color: themeColor }}>验证码</Text>
              }
            >
              <Input
                prefix={<MailOutlined style={{ color: subColor }} />}
                placeholder="6位验证码"
                maxLength={6}
                value={otpEmail}
                onChange={(e) => setOtpEmail(e.target.value)}
              />
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <Button
                type="primary"
                onClick={handleSubmitRegister}
                disabled={!isAllRequiredFieldsFilled}
                style={{
                  width: "75%",
                  height: 40,
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                提交注册
              </Button>
            </div>
          </Form>
        </div>
      </StyledContainer>
    </Background>
  );
};

export default InformationPage;
