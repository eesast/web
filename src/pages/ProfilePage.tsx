import React, { useEffect, useState, useRef } from "react";
import { message, Form, Input, Button, Alert, Modal } from "antd";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import {
  GetUser as GET_USER,
  UpdateUser as UPDATE_USER,
} from "../api/user.graphql";
import { GetUser, UpdateUser, GetId, GetEmail, GetRole } from "../api/types";
import Loading from "../components/Loading";
import axios, { AxiosError } from "axios";
import IsEmail from "isemail";
import ReCAPTCHA from "react-google-recaptcha";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Container = styled.div`
  margin: auto;
  padding: 48px 24px;
  width: 90vw;
  max-width: 400px;
`;

const ProfilePage: React.FC = () => {
  const { data: idData } = useQuery<GetId>(gql`
    {
      _id @client
    }
  `);
  const { data: emailData } = useQuery<GetEmail>(gql`
    {
      email @client
    }
  `);
  const { data: roleData } = useQuery<GetRole>(gql`
    {
      role @client
    }
  `);
  const { data, loading, error } = useQuery<GetUser>(GET_USER, {
    variables: { _id: idData?._id },
  });

  const [
    updateUser,
    { data: updateData, loading: updating, error: updateError },
  ] = useMutation<UpdateUser>(UPDATE_USER);

  useEffect(() => {
    if (error) {
      message.error("加载失败");
    }
  }, [error]);

  useEffect(() => {
    if (updateError) {
      message.error("更新失败");
    }
  }, [updateError]);

  useEffect(() => {
    if (updateData && !updateError) {
      message.success("更新成功");
    }
  }, [updateData, updateError]);

  const [modalVisible, setModalVisible] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const [form] = Form.useForm();

  if (loading) {
    return <Loading />;
  }

  const handleTsinghuaVerification = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    setVerifyLoading(true);

    const values = form.getFieldsValue();
    try {
      await axios.post("/users/verify", {
        ...values,
        action: "request",
        type: "tsinghua",
      });
      message.success("邮箱验证邮件已发送，请注意查收");
      form.resetFields();
      setVerifyLoading(false);
      setModalVisible(false);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 400) {
        message.error("reCAPTCHA 验证已失效，请重新验证");
      } else {
        message.error("未知错误");
      }
      reCaptchaRef.current?.reset();
      setVerifyLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    const { password, email, ...rest } = values;

    updateUser({
      variables: { ...rest, _id: idData?._id },
    });

    if (password) {
      setPasswordUpdating(true);
      try {
        await axios.put("/users", {
          password,
        });
        message.success("密码更改成功");
      } catch (e) {
        const err = e as AxiosError;
        if (err.response?.status === 401) {
          message.error("当前会话已失效，请重新登录");
        } else {
          message.error("未知错误");
        }
      } finally {
        setPasswordUpdating(false);
      }
    }
  };

  const user = { ...data?.user[0], email: emailData?.email };

  return (
    <Container>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        initialValues={user}
        scrollToFirstError
      >
        <Form.Item name="email" label="注册邮箱">
          <Input readOnly type="email" />
        </Form.Item>
        <Form.Item
          name="id"
          label="学号"
          rules={[{ required: true, message: "请输入学号" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: "请输入用户名" },
            () => ({
              validator(rule, value) {
                if (!value || /^[a-zA-Z0-9]*$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("请输入仅包含字母与数字的用户名");
              },
            }),
          ]}
        >
          <Input placeholder="仅包含字母与数字" />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: "请输入姓名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机"
          rules={[{ required: true, message: "请输入手机" }]}
        >
          <Input type="tel" />
        </Form.Item>
        <Form.Item
          name="department"
          label="院系"
          rules={[{ required: true, message: "请输入院系" }]}
        >
          <Input placeholder="院系简写，如：电子系、计算机系" />
        </Form.Item>
        <Form.Item
          name="class"
          label="班级"
          rules={[{ required: true, message: "请输入班级" }]}
        >
          <Input placeholder="如：无64，计80" />
        </Form.Item>
        <Form.Item name="tsinghuaVerified" label="清华邮箱验证">
          {roleData?.role === "user" ? (
            <Button onClick={() => setModalVisible(true)}>申请验证</Button>
          ) : (
            <Alert message="已通过邮箱验证" type="success" showIcon />
          )}
        </Form.Item>
        <Form.Item
          name="password"
          label="更新密码"
          rules={[
            () => ({
              validator(rule, value) {
                if (!value || value.length >= 12) {
                  return Promise.resolve();
                }
                return Promise.reject("请输入长度至少为 12 位的新密码");
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="留空则不更改密码"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            loading={updating || passwordUpdating}
            type="primary"
            htmlType="submit"
          >
            更新
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="验证清华邮箱"
        visible={modalVisible}
        onOk={handleTsinghuaVerification}
        confirmLoading={verifyLoading}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item
            name="tsinghuaEmail"
            rules={[
              { required: true, message: "请输入清华邮箱" },
              () => ({
                validator(rule, value: string) {
                  if (
                    !value ||
                    (IsEmail.validate(value) &&
                      value.endsWith("@mails.tsinghua.edu.cn"))
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject("请输入正确的清华邮箱");
                },
              }),
            ]}
          >
            <Input
              placeholder="清华邮箱"
              autoComplete="email"
              spellCheck={false}
              autoFocus
            />
          </Form.Item>
          <Form.Item
            name="recaptcha"
            rules={[{ required: true, message: "请通过 reCAPTCHA 验证" }]}
          >
            <ReCAPTCHA
              ref={reCaptchaRef}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
