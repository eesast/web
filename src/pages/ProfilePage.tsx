import React, { useEffect, useState, useRef } from "react";
import { message, Form, Input, Button, Alert, Modal } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import {
  GetUser as GET_USER,
  UpdateUser as UPDATE_USER,
  UpdateUserForTeacher as UPDATE_USER_FOR_TEACHER,
  DeleteUser as DELETE_USER,
} from "../api/user.graphql";
import {
  GetUser,
  UpdateUser,
  UpdateUserForTeacher,
  DeleteUser,
  GetUserVariables,
  UpdateUserVariables,
  UpdateUserForTeacherVariables,
  DeleteUserVariables,
} from "../api/types";
import Loading from "../components/Loading";
import axios, { AxiosError } from "axios";
import IsEmail from "isemail";
import ReCAPTCHA from "react-google-recaptcha";
import { getUserInfo } from "../helpers/auth";
import { validateClass, validatePassword } from "../helpers/validate";

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
  const userInfo = getUserInfo();

  const { data, loading, error } = useQuery<GetUser, GetUserVariables>(
    GET_USER,
    {
      variables: { _id: userInfo?._id! },
    }
  );

  const [
    updateUser,
    { data: updateData, loading: updating, error: updateError },
  ] = useMutation<UpdateUser, UpdateUserVariables>(UPDATE_USER);

  const [
    updateUserForTeacher,
    {
      data: updateForTeacherData,
      loading: updatingForTeacher,
      error: updateForTeacherError,
    },
  ] = useMutation<UpdateUserForTeacher, UpdateUserForTeacherVariables>(
    UPDATE_USER_FOR_TEACHER
  );

  const [
    deleteUser,
    { data: deleteData, loading: deleting, error: deleteError },
  ] = useMutation<DeleteUser, DeleteUserVariables>(DELETE_USER);

  useEffect(() => {
    if (error) {
      message.error("加载失败");
    }
  }, [error]);

  useEffect(() => {
    if (updateError) {
      if (
        updateError.graphQLErrors?.[0]?.extensions?.code ===
        "constraint-violation"
      ) {
        message.error("更新失败：学号已存在");
      } else {
        message.error("更新失败");
      }
    }
    if (updateForTeacherError) {
      if (
        updateForTeacherError.graphQLErrors?.[0]?.extensions?.code ===
        "constraint-violation"
      ) {
        message.error("更新失败：工号已存在");
      } else {
        message.error("更新失败");
      }
    }
  }, [updateError, updateForTeacherError]);

  useEffect(() => {
    if (
      (updateData && !updateError) ||
      (updateForTeacherData && !updateForTeacherError)
    ) {
      message.success("更新成功");
    }
  }, [updateData, updateError, updateForTeacherData, updateForTeacherError]);

  useEffect(() => {
    if (deleteError) {
      message.error("删除失败");
    }
  }, [deleteError]);

  useEffect(() => {
    if (deleteData && !deleteError) {
      message.success("删除成功");
    }
  }, [deleteData, deleteError]);

  const [modalVisible, setModalVisible] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [userDeleting, setUserDeleting] = useState(false);
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
      } else if (err.response?.status === 401) {
        message.error("当前会话已失效，请重新登录");
      } else {
        message.error("未知错误");
      }
      reCaptchaRef.current?.reset();
      setVerifyLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    const { password, registeredEmail, ...rest } = values;

    if (userInfo?.role === "teacher") {
      updateUserForTeacher({
        variables: {
          _id: userInfo?._id!,
          ...rest,
        },
      });
    } else {
      updateUser({
        variables: {
          _id: userInfo?._id!,
          ...rest,
        },
      });
    }

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

  const onDelete = async () => {
    deleteUser({
      variables: {
        _id: userInfo?._id!,
      },
    });

    setUserDeleting(true);
    try {
      await axios.put("/users/delete", { _id: userInfo?._id! });
      message.success("用户删除成功");
      window.location.href = "/login";
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        message.error("当前会话已失效，请重新登录");
      } else {
        message.error("未知错误");
      }
    }
  };

  const user = { ...data?.user[0], LregisteredEmail: userInfo?.email };

  return (
    <Container>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        initialValues={user}
        scrollToFirstError
      >
        <Form.Item name="registeredEmail" label="注册邮箱">
          <Input readOnly type="email" />
        </Form.Item>
        <Form.Item
          name="id"
          label="学号"
          rules={[
            { required: userInfo?.role !== "teacher", message: "请输入学号" },
          ]}
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
          name="email"
          label="联系邮箱"
          rules={[
            {
              required: true,
              message: "请输入用于联系的邮箱；可与注册邮箱不同",
            },
            () => ({
              validator(rule, value) {
                if (!value || IsEmail.validate(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("请输入正确的邮箱");
              },
            }),
          ]}
        >
          <Input type="email" />
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
          rules={[
            { required: userInfo?.role !== "teacher", message: "请输入班级" },
          () => ({
            validator(rule, value: string) {
              if (!value || validateClass(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                "请输入正确班级信息，如：无92，计81"
              );
            },
          })
        ]}
        >
          <Input placeholder="如：无64，计80" />
        </Form.Item>
        <Form.Item name="tsinghuaVerified" label="清华邮箱验证">
          {userInfo?.role === "user" ? (
            <Button onClick={() => setModalVisible(true)}>申请验证</Button>
          ) : (
            <Alert message="已通过邮箱验证" type="success" showIcon />
          )}
        </Form.Item>
        <Form.Item
          name="password"
          label="更新密码"
          rules={[
            // 必填阻止了下面对于空值的判断
            // { required: true, message: "请输入新密码" },
            () => ({
              validator(rule, value: string) {
                if (!value || validatePassword(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "请输入长度至少为 8，需包含大小写字母及数字的密码"
                );
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
            loading={updating || passwordUpdating || updatingForTeacher}
            type="primary"
            htmlType="submit"
            style={{ marginRight: 16 }}
          >
            更新
          </Button>
          <Button
          loading={deleting || userDeleting}
            type="default"
            style={{
              color: "#f5222d",
              borderColor: "#f5222d",
            }}
            onClick={() => {
              Modal.confirm({
                title: "确认删除账号？",
                content: "删除后将无法恢复",
                okText: "确认",
                cancelText: "取消",
                onOk: onDelete,
              });
            }}
          >
            注销
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
