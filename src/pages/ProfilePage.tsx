import React, { useEffect } from "react";
import { message, Form, Input, Button } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import {
  GetUser as GET_USER,
  UpdateUser as UPDATE_USER,
} from "../api/user.graphql";
import { GetUser, UpdateUser } from "../api/types";
import Loading from "../components/Loading";

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
  const { data, loading, error } = useQuery<GetUser>(GET_USER);
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

  if (loading) {
    return <Loading />;
  }

  const onFinish = (values: any) => {
    const { password, ...rest } = values;
    updateUser({
      variables: rest,
    });
  };

  const user = data?.user[0];

  return (
    <Container>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        initialValues={user}
        scrollToFirstError
      >
        <Form.Item name="id" label="学号">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="password" label="更新密码">
          <Input.Password
            minLength={12}
            placeholder="留空则不更改密码"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: "请输入用户名", whitespace: false },
          ]}
        >
          <Input placeholder="仅包含字母与数字" pattern="^[a-zA-Z0-9]*$" />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: "请输入姓名", whitespace: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[{ required: true, message: "请输入邮箱" }]}
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
          rules={[{ required: true, message: "请输入班级" }]}
        >
          <Input placeholder="如：无64，计80" />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button loading={updating} type="primary" htmlType="submit">
            更新
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default ProfilePage;
