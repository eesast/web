import {
  Button,
  Modal,
  Upload,
  message,
  Row,
  Col,
  Spin,
  Typography,
  Card,
} from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState, useRef } from "react";
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
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { UserProps } from ".";
import { uploadFile, listFile, deleteFile, getAvatarUrl } from "../../api/cos";
//import axios from 'axios';
import styled from "styled-components";

const defaultAvatar = "/UserOutlined.png";

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
`;

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
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState<string>("");
  const cropperRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(() => {
    // 在初始化时执行异步操作
    listFile(`avatar/${user.uuid}/`)
      .then((files) => {
        const imageFiles = files.filter((file) =>
          /\.(jpe?g|png)$/i.test(file.Key),
        );
        if (imageFiles.length > 0) {
          const firstImage = imageFiles[0];
          getAvatarUrl(firstImage.Key)
            .then((url) => {
              setImageUrl(url);
            })
            .catch((error) => {
              console.error("Failed to load avatar URL:", error);
              message.error("加载头像失败");
            });
        } else {
          setImageUrl("/UserOutlined.png"); // 替换为实际的默认头像 URL
        }
      })
      .catch((error) => {
        console.error("Failed to list files:", error);
        message.error("加载头像失败");
      });

    // 返回初始值
    return "";
  });

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
  const { refetch: refetchUserByTsinghuaEmail } =
    graphql.useGetUserByTsinghuaEmailQuery({
      variables: { tsinghua_email: "" },
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
      span: 2,
      children: profileData?.users_by_pk?.username || "",
      editable: () => true,
    },
    {
      key: "email",
      label: "注册邮箱",
      span: 4,
      children: profileData?.users_by_pk?.email || "",
      editable: () => true,
    },
    {
      key: "role",
      label: "用户组",
      span: 2,
      tooltip:
        "新用户注册后默认为【用户】，添加清华邮箱后升级为【学生】。信息化平台要求用户组为【学生】。【教师】、【辅导员】身份请联系网站管理员认证。",
      children: roleMap[user.role],
      editable: () => false,
    },
    {
      key: "realname",
      label: "姓名",
      span: 2,
      children: profileData?.users_by_pk?.realname || "",
      editable: () => true,
    },
    {
      key: "phone",
      label: "手机号",
      span: 2,
      children: profileData?.users_by_pk?.phone || "",
      editable: () => true,
    },
    {
      key: "department",
      label: "院系",
      span: 2,
      children: profileData?.users_by_pk?.department || "",
      editable: () => true,
      valueEnum: departmentsData?.department.reduce(
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
      span: 2,
      children: profileData?.users_by_pk?.class || "",
      editable: () => true,
    },
    {
      key: "student_no",
      label: "学号",
      span: 2,
      children: profileData?.users_by_pk?.student_no || "",
      editable: () => true,
    },
    {
      key: "tsinghua_email",
      label: "清华邮箱认证",
      span: 4,
      children: profileData?.users_by_pk?.tsinghua_email || "",
      editable: () => true,
    },
    {
      key: "updated_at",
      label: "信息更新时间",
      children: dayjs(profileData?.users_by_pk?.updated_at).format(
        "YYYY-MM-DD HH:mm",
      ),
      span: 2,
      editable: () => false,
    },
    // {
    //   key: "github_id",
    //   label: "GitHub用户绑定",
    //   span: 2,
    //   children: profileData.users_by_pk?.github_id || "",
    //   editable: () => true,
    // },
    {
      key: "created_at",
      label: "注册时间",
      children: dayjs(profileData?.users_by_pk?.created_at).format(
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
      const { data } = await refetchUserByTsinghuaEmail({
        tsinghua_email: record[key],
      });
      if (data.users.length) {
        message.error("清华邮箱已被注册");
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
        ...profileData?.users_by_pk,
        ...record,
      },
    });
    return getProfileRefetch();
  };

  // useEffect(() => {
  //   return () => {
  //     if (imageUrl.startsWith('blob:')) {
  //       URL.revokeObjectURL(imageUrl);
  //     }
  //   };
  // }, [imageUrl]);

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg, image/png";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        handleBeforeUpload(file);
      }
    };
    input.click();
  };

  // 处理文件选择
  const handleBeforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传 JPG/PNG 格式的图片！");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error("图片大小必须小于 1MB！");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result as string);
      setVisible(true);
    };
    reader.readAsDataURL(file);
    return false; // 阻止自动上传
  };

  const handleDeleteAvatar = async () => {
    try {
      const files = await listFile(`avatar/${user.uuid}/`);
      const deletePromises = files.map((file) => deleteFile(file.Key));
      await Promise.all(deletePromises);
      setImageUrl("");
      message.success("头像删除成功");
    } catch (error) {
      console.error("Failed to delete avatar:", error);
      message.error("删除头像失败");
    }
  };
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "确定要删除头像吗？",
      content: "删除后您将无法恢复头像。",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: handleDeleteAvatar,
    });
  };

  // 处理裁剪并上传

  const handleCrop = async () => {
    if (cropperRef.current) {
      setLoading(true);
      try {
        const cropper = (cropperRef.current as any).cropper;
        const canvas = cropper.getCroppedCanvas({
          width: 200,
          height: 200,
        });
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob: any) => {
            resolve(blob);
          }, "image/png");
        });

        if (blob) {
          const file = new File([blob], `avatar_${Date.now()}.png`, {
            type: "image/png",
          });

          // 以下部分与您现有的上传逻辑整合
          const files = await listFile(`avatar/${user.uuid}/`);
          console.log("Files:", files);
          const deletePromises = files.map((file) => deleteFile(file.Key));
          await Promise.all(deletePromises);

          const fileName = `avatar/${user.uuid}/${file.name}`;
          await uploadFile(file, fileName);
          const url = await getAvatarUrl(fileName);
          setImageUrl(url);
          message.success("头像上传成功");
          setVisible(false);
        } else {
          message.error("裁剪失败，请重试。");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        message.error("上传失败，请重试。");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Content
      css={`
        margin: 48px;
      `}
    >
      <Typography.Title level={2}>用户信息</Typography.Title>
      <br />
      <Row gutter={24} align="top">
        {/* 用户信息表格部分 */}
        <Col span={18}>
          <Card
            hoverable
            styles={{
              body: {
                padding: "12px",
              },
            }}
          >
            <ProDescriptions
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
          </Card>
        </Col>
        {/* 头像部分 */}
        <Col span={6} style={{ textAlign: "center", position: "relative" }}>
          <Card
            hoverable
            style={{
              padding: "12px", // 去除内边距，使图片充满卡片
            }}
            cover={
              <img
                src={imageUrl || defaultAvatar}
                alt="头像"
                onClick={handleImageClick}
                style={{ width: "100%", cursor: "pointer" }}
              />
            }
          >
            {loading && (
              <LoadingOverlay>
                <Spin size="large" />
              </LoadingOverlay>
            )}
            <div
              style={{
                marginTop: "0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="primary"
                onClick={handleImageClick}
                style={{
                  marginRight: "10px",
                  width: "80%",
                  height: "36px", // 调整按钮高度
                  whiteSpace: "nowrap", // 允许文字换行
                  // wordBreak: 'break-word', // 控制单词换行行为
                  textAlign: "center", // 文本居中
                }}
              >
                更换头像
              </Button>
              <Button
                danger
                onClick={showDeleteConfirm}
                style={{
                  width: "80%",
                  height: "36px", // 调整按钮高度
                  whiteSpace: "pre", // 允许文字换行
                  wordBreak: "break-word", // 控制单词换行行为
                  textAlign: "center", // 文本居中
                }}
              >
                删除头像
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 操作按钮部分 */}
      <Row style={{ marginTop: "2px" }}>
        <Col>
          <Button
            type="primary"
            css={`
              margin-top: 36px;
            `}
            onClick={() =>
              navigate(
                url
                  .append("email", profileData?.users_by_pk?.email)
                  .link("reset"),
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
                      .append("email", profileData?.users_by_pk?.email)
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
        </Col>
      </Row>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={handleCrop}
        confirmLoading={loading}
        okText="确定"
        cancelText="取消"
      >
        <Cropper
          src={src}
          style={{ height: 400, width: "100%" }}
          aspectRatio={1}
          guides={false}
          ref={cropperRef}
          viewMode={1}
          dragMode="move"
          scalable={true}
          cropBoxResizable={true}
          cropBoxMovable={true}
        />
      </Modal>

      {/* GitHub 登录部分（可选） */}
      {/*
      {usergithub ? (
        <div>
          <h2>Welcome, {usergithub?.login}</h2>
          <img src={usergithub?.avatar_url} alt="avatar" width="50" />
        </div>
      ) : (
        <button onClick={handleLogin}>Login with GitHub</button>
      )}
      */}
    </Content>
  );
};

export default ProfilePage;
