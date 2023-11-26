import { Button, Modal, message } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import {
  useGetProfileSuspenseQuery,
  useUpdateProfileMutation,
} from "../../generated/graphql";
import { getUserInfo } from "../../api/helpers/auth";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import dayjs from "dayjs";

const roleMap: { [key: string]: string } = {
  anonymous: "游客",
  user: "用户",
  student: "学生",
  teacher: "教师",
  counselor: "辅导员",
  admin: "管理员",
};

const ProfilePage: React.FC = () => {
  const url = useUrl();
  const navigate = useNavigate();
  const userInfo = getUserInfo()!;
  const { data: profileData, error: getProfileError } =
    useGetProfileSuspenseQuery({
      variables: {
        uuid: userInfo.uuid,
      },
    });
  useEffect(() => {
    if (getProfileError) {
      message.error("获取用户信息失败");
      console.log(getProfileError);
    }
  }, [getProfileError]);

  const handleQuit = () => {
    localStorage.removeItem("token");
    navigate(url.link("home", "site"));
  };

  const items = [
    {
      key: "username",
      label: "用户名",
      children: profileData.users_by_pk?.username || "",
      editable: () => true,
    },
    {
      key: "email",
      label: "注册邮箱",
      span: 2,
      children: profileData.users_by_pk?.email || "",
      editable: () => false,
    },
    {
      key: "role",
      label: "用户组",
      children: roleMap[userInfo.role],
      editable: () => false,
    },
    {
      key: "realname",
      label: "姓名",
      children: profileData.users_by_pk?.realname || "",
      editable: () => true,
    },
    {
      key: "phone",
      label: "电话",
      children: profileData.users_by_pk?.phone || "",
      editable: () => true,
    },
    {
      key: "department",
      label: "院系",
      children: profileData.users_by_pk?.department || "",
      editable: () => true,
    },
    {
      key: "class",
      label: "班级",
      children: profileData.users_by_pk?.class || "",
      editable: () => true,
    },
    {
      key: "student_no",
      label: "学号",
      children: profileData.users_by_pk?.student_no || "",
      editable: () => true,
    },
    {
      key: "created_at",
      label: "注册时间",
      children: dayjs(profileData.users_by_pk?.created_at).format(
        "YYYY-MM-DD HH:mm",
      ),
      editable: () => false,
    },
    {
      key: "updated_at",
      label: "信息更新时间",
      children: dayjs(profileData.users_by_pk?.updated_at).format(
        "YYYY-MM-DD HH:mm",
      ),
      editable: () => false,
    },
  ];

  const [updateProfileMutation, { error }] = useUpdateProfileMutation();
  useEffect(() => {
    if (error) {
      message.error("更新用户信息失败");
      console.log(error);
    }
  }, [error]);

  return (
    <Content
      css={`
        margin: 72px;
      `}
    >
      <ProDescriptions
        title={<h1>用户信息</h1>}
        bordered
        editable={{
          onSave: (key, record) =>
            updateProfileMutation({
              variables: {
                uuid: userInfo.uuid,
                ...record,
              },
            }),
        }}
      >
        {items.map((item) => (
          <ProDescriptions.Item
            key={item.key}
            dataIndex={item.key}
            label={item.label}
            span={item.span}
            ellipsis={true}
            editable={item.editable}
          >
            {item.children}
          </ProDescriptions.Item>
        ))}
      </ProDescriptions>
      <Button
        type="primary"
        css={`
          margin-top: 36px;
        `}
        onClick={() =>
          navigate(
            url.append("email", profileData.users_by_pk?.email).link("reset"),
          )
        }
      >
        修改密码
      </Button>
      <Button
        type="primary"
        danger
        css={`
          margin-top: 36px;
          margin-left: 24px;
        `}
        onClick={() => {
          Modal.confirm({
            title: "确认删除账号？",
            content: "删除后将无法恢复",
            okText: "确认",
            cancelText: "取消",
            onOk: () =>
              navigate(
                url
                  .append("email", profileData.users_by_pk?.email)
                  .link("delete"),
              ),
          });
        }}
      >
        删除账号
      </Button>
      <Button
        css={`
          margin-top: 36px;
          margin-left: 24px;
        `}
        onClick={handleQuit}
      >
        退出登录
      </Button>
    </Content>
  );
};

export default ProfilePage;
