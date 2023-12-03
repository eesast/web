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
import {
  validateClass,
  validateEmail,
  validateNumber,
  validateUsername,
} from "../../api/helpers/validator";
import { PageProps } from "..";

const roleMap: { [key: string]: string } = {
  anonymous: "游客",
  user: "用户",
  student: "学生",
  teacher: "教师",
  counselor: "辅导员",
  admin: "管理员",
};

const ProfilePage: React.FC<PageProps> = ({ mode }) => {
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
      editable: () => true,
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
      valueEnum: {
        电子系: {
          text: "电子系",
        },
        医学院: {
          text: "医学院",
        },
      },
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
      key: "tsinghua_email",
      label: "清华邮箱认证",
      span: 2,
      children: profileData.users_by_pk?.tsinghua_email || "",
      editable: () => true,
    },
    {
      key: "github_id",
      label: "GitHub用户绑定",
      children: profileData.users_by_pk?.github_id || "",
      editable: () => true,
    },
    {
      key: "created_at",
      label: "注册时间",
      children: dayjs(profileData.users_by_pk?.created_at).format(
        "YYYY-MM-DD HH:mm",
      ),
      span: 2,
      editable: () => false,
    },
    {
      key: "updated_at",
      label: "信息更新时间",
      children: dayjs(profileData.users_by_pk?.updated_at).format(
        "YYYY-MM-DD HH:mm",
      ),
      span: 2,
      editable: () => false,
    },
  ];

  const [updateProfileMutation, { error: updateProfileError }] =
    useUpdateProfileMutation();
  useEffect(() => {
    if (updateProfileError) {
      message.error("更新用户信息失败");
      console.log(updateProfileError);
    }
  }, [updateProfileError]);
  const handleEdit = (key: any, record: any) => {
    if (key === "email") {
      if (!validateEmail(record[key])) {
        message.error("请输入正确的邮箱格式");
        return Promise.reject();
      }
      navigate(url.append("email", record[key]).link("update"));
      return Promise.resolve();
    }
    // if (key === "phone") {
    //   if (!validateNumber(record[key])) {
    //     message.error("请输入正确的手机号");
    //     return Promise.reject();
    //   }
    //   navigate(url.append("phone", record[key]).link("update"));
    //   return Promise.resolve();
    // }
    if (key === "tsinghua_email") {
      if (!validateEmail(record[key], true)) {
        message.error("请输入正确的邮箱格式");
        return Promise.reject();
      }
      navigate(
        url
          .append("tsinghua", "true")
          .append("email", record[key])
          .link("update"),
      );
      return Promise.resolve();
    }
    if (key === "github_id") {
      message.info("暂不支持GitHub账户绑定");
      return Promise.reject();
    }
    if (key === "username") {
      if (!validateUsername(record[key])) {
        message.error("请输入仅包含字母与数字的用户名");
        return Promise.reject();
      }
    }
    if (key === "class") {
      if (!validateClass(record[key])) {
        message.error("请输入正确的班级信息，如：无92，计81");
        return Promise.reject();
      }
    }
    if (key === "student_no") {
      if (!validateNumber(record[key])) {
        message.error("请输入正确的学号");
        return Promise.reject();
      }
    }
    return updateProfileMutation({
      variables: {
        uuid: userInfo.uuid,
        ...record,
      },
    });
  };

  return (
    <Content
      css={`
        margin: 72px;
      `}
    >
      <ProDescriptions
        title={<h1>用户信息</h1>}
        bordered
        column={{ xs: 1, sm: 2, md: 3 }}
        editable={{
          onSave: handleEdit,
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
            valueEnum={item.valueEnum}
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
