import { Button, Modal, message } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import * as graphql from "@/generated/graphql";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import dayjs from "dayjs";
import {
  validateClass,
  validateEmail,
  validateStudentID,
  validatePhoneNumber,
  validateUsername,
} from "../../api/utils/validator";
import { UserProps } from ".";
//import axios from 'axios';

const roleMap: { [key: string]: string } = {
  anonymous: "游客",
  user: "用户",
  student: "学生",
  teacher: "教师",
  counselor: "辅导员",
  admin: "管理员",
};

// const CLIENT_ID = 'Ov23liTd9x0uVEeGwGO4';
// const REDIRECT_URI = 'http://localhost:3000';

// interface GitHubUser {
//   login: string;
//   avatar_url: string;
// }

const ProfilePage: React.FC<UserProps> = ({ mode, user, setUser }) => {
  // const [usergithub, setUsergithub] = useState<GitHubUser | null>(null);
  const url = useUrl();
  const navigate = useNavigate();
  const {
    data: profileData,
    error: getProfileError,
    refetch: getProfileRefetch,
  } = graphql.useGetProfileSuspenseQuery({
    variables: {
      uuid: user.uuid,
    },
  });

  // useEffect(() => {
  //   const code = new URLSearchParams(window.location.search).get('code');
  //   if (code) {
  //     getAccessToken(code);
  //   }
  // });

  // const getAccessToken = async (code: string) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/github/callback?code=${code}`);
  //     const accessToken = response.data.accessToken;
  //     if (accessToken) {
  //       console.log('Access Token:', accessToken); // 调试输出
  //       getUserInfo(accessToken);
  //     } else {
  //       console.error('Access token is missing');
  //     }
  //   } catch (error) {
  //     console.error('Error getting access token:', error);
  //   }
  // };

  // const getUserInfo = async (accessToken: string) => {
  //   try {
  //     const response = await axios.get<GitHubUser>(`http://localhost:3001/github/user?access_token=${accessToken}`);
  //     setUsergithub(response.data);
  //   } catch (error) {
  //     console.error('Error getting user info:', error);
  //   }
  // };

  // const handleLogin = () => {
  //   window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  // };
  const { refetch: refetchUserByEmail } = graphql.useGetUserByEmailQuery({
    variables: { email: "" },
  });
  const { refetch: refetchUserByPhone } = graphql.useGetUserByPhoneQuery({
    variables: { phone: "" },
  });

  useEffect(() => {
    if (getProfileError) {
      message.error("获取用户信息失败");
      console.log(getProfileError);
    }
  }, [getProfileError]);

  const { data: departmentsData, error: getDepartmentsError } =
    graphql.useGetDepartmentsSuspenseQuery({
      variables: {},
    });

  useEffect(() => {
    if (getDepartmentsError) {
      message.error("获取院系信息失败");
      console.log(getDepartmentsError);
    }
  }, [getDepartmentsError]);

  const handleQuit = () => {
    setUser(null);
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
      tooltip:
        "新用户注册后默认为【用户】，添加清华邮箱后升级为【学生】。信息化平台要求用户组为【学生】。【教师】、【辅导员】身份请联系网站管理员认证。",
      children: roleMap[user.role],
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
      label: "手机号",
      children: profileData.users_by_pk?.phone || "",
      editable: () => true,
    },
    {
      key: "department",
      label: "院系",
      children: profileData.users_by_pk?.department || "",
      editable: () => true,
      valueEnum: departmentsData.department.reduce(
        (target, key, _) => {
          target[key.name] = key.name;
          return target;
        },
        {} as { [key: string]: any },
      ),
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
    graphql.useUpdateProfileMutation();

  useEffect(() => {
    if (updateProfileError) {
      if (
        updateProfileError.graphQLErrors.some((graphQLError) => {
          return graphQLError.message.includes("Uniqueness violation");
        })
      ) {
        message.error("该项已被其他用户使用");
        return;
      }
      message.error("更新用户信息失败");
      console.log(updateProfileError);
    }
  }, [updateProfileError]);

  const handleEdit = async (key: any, record: any) => {
    if (key === "email") {
      if (!validateEmail(record[key])) {
        message.error("请输入正确的邮箱格式");
        return Promise.reject();
      }
      const { data } = await refetchUserByEmail({ email: record[key] });
      if (data.users.length) {
        message.error("邮箱已被注册");
        return Promise.reject();
      }
      navigate(url.append("email", record[key]).link("update"));
      return Promise.resolve();
    }
    if (key === "phone") {
      if (!validatePhoneNumber(record[key])) {
        message.error("请输入正确的手机号");
        return Promise.reject();
      }
      const { data } = await refetchUserByPhone({ phone: record[key] });
      if (data.users.length) {
        message.error("手机号已被注册");
        return Promise.reject();
      }
      navigate(url.append("phone", record[key]).link("update"));
      return Promise.resolve();
    }
    if (key === "tsinghua_email") {
      if (!validateEmail(record[key], true)) {
        message.error("请输入正确的邮箱格式");
        return Promise.reject();
      }
      const { data } = await refetchUserByEmail({ email: record[key] });
      if (data.users.length) {
        message.error("邮箱已被注册");
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
        message.error("请输入以字母开头，仅包含字母与数字的用户名");
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
      if (!validateStudentID(record[key])) {
        message.error("请输入正确的学号");
        return Promise.reject();
      }
    }
    await updateProfileMutation({
      variables: {
        uuid: user.uuid,
        ...profileData.users_by_pk,
        ...record,
      },
    });
    return getProfileRefetch();
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
            tooltip={item.tooltip}
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
      {/* {usergithub ? (
          <div>
            <h2>Welcome, {usergithub?.login}</h2>
            <img src={usergithub?.avatar_url} alt="avatar" width="50" />
          </div>
        ) : (
          <button onClick={handleLogin}>Login with GitHub</button>
        )} */}
    </Content>
  );
};

export default ProfilePage;
