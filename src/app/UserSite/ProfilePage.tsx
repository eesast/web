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
  validateClass, // 尽管移除了校验逻辑，但保留了导入
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

const ProfilePage: React.FC<UserProps> = ({ mode, user, setUser }) => {
  // 修正位置：所有 Hooks 必须在函数组件的顶层调用
  const { data: classesData, loading: classesLoading } =
    graphql.useGetClasses_NameQuery();

  // =======================================================
  // 【修改后的调试代码】
  useEffect(() => {
    // 1. 打印原始数据对象
    console.log("【DEBUG】班级数据 classesData:", classesData);

    // 假设查询结果的列表字段名为 'classes'
    const classesList = classesData?.classes;

    // 2. 检查数据是否有效，并打印列表长度
    if (classesList) {
      console.log("【DEBUG】班级列表长度:", classesList.length);
      // 3. 打印列表中的第一个元素，以便确认数据结构
      if (classesList.length > 0) {
        console.log("【DEBUG】第一个班级对象:", classesList[0]);
      }
    } else if (classesLoading === false) {
      // 如果不在加载中，但数据还是空的（或列表字段不存在），说明查询失败或权限有问题
      console.log(
        "【DEBUG】班级数据为空，且加载已完成。请检查权限或查询是否正确。",
      );
    }
  }, [classesData, classesLoading]); // 依赖项：当 classesData 或 classesLoading 变化时运行
  // =======================================================

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
          setImageUrl(
            `https://api.dicebear.com/9.x/thumbs/svg?scale=80&backgroundType=gradientLinear&seed=${user.uuid}`,
          ); // 替换为实际的默认头像 URL
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

  // 引入 descKey 状态
  const [descKey, setDescKey] = useState(0);

  // [GitHub 登录相关代码已省略，与主逻辑无关]

  const { refetch: refetchUserByEmail } = graphql.useGetUserByEmailQuery({
    variables: { email: "" },
  });
  const { refetch: refetchUserByTsinghuaEmail } =
    graphql.useGetUserByTsinghuaEmailQuery({
      variables: { tsinghua_email: "" },
    });
  // const { refetch: refetchUserByPhone } = graphql.useGetUserByPhoneQuery({
  //   variables: { phone: "" },
  // });

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

  const currentDepartment = profileData?.users_by_pk?.department;
  const isDiangZiXi = currentDepartment === "电子系";

  const classValueEnum = classesData?.classes?.reduce(
    (target, classItem) => {
      target[classItem.name] = classItem.name;
      return target;
    },
    {} as { [key: string]: string },
  );

  const baseItems = [
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
    // {
    //   key: "phone",
    //   label: "手机号",
    //   span: 2,
    //   children: profileData?.users_by_pk?.phone || "",
    //   editable: () => true,
    // },
    {
      key: "department",
      label: "院系",
      span: 2,
      children: profileData?.users_by_pk?.department || "",
      editable: () => true,
      valueType: "select",
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
      children: classesLoading
        ? "加载中..."
        : profileData?.users_by_pk?.class || "",
      editable: () => !classesLoading, // 加载时禁用编辑

      // ⭐ 根据条件动态设置字段类型：如果是电子系，则为下拉选择 'select'，否则为普通文本输入 'text' (或不设置，但明确写出更清晰)
      valueType: isDiangZiXi ? "select" : "text",

      // ⭐ 只有在 valueType 为 'select' 时才传递 valueEnum 和 fieldProps
      valueEnum: isDiangZiXi ? classValueEnum : undefined,

      fieldProps: isDiangZiXi
        ? {
            // 如果是下拉框，可以禁用搜索，强制用户从列表中选择
            showSearch: false,
          }
        : undefined,
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
    //   key: "github_id",
    //   label: "GitHub用户绑定",
    //   span: 2,
    //   children: profileData.users_by_pk?.github_id || "",
    //   editable: () => true,
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

  const roleVisibleMap = {
    user: [""],
    student: [""],
    teacher: ["class", "student_no"],
    counselor: [
      "department",
      "class",
      "student_no",
      "tsinghua_email",
      "github_id",
    ],
  };

  const items = baseItems
    .filter((item) => {
      const hiddenKeys =
        roleVisibleMap[user.role as keyof typeof roleVisibleMap] || [];
      return !hiddenKeys.includes(item.key);
    })
    .map((item) => {
      if (user.role === "counselor") {
        return {
          ...item,
          editable: () => false,
        };
      }
      return item;
    });

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
      // const { data } = await refetchUserByPhone({ phone: record[key] });
      // if (data.users.length) {
      //   message.error("手机号已被注册");
      //   return Promise.reject();
      // }
      // navigate(url.append("phone", record[key]).link("update"));
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
    // 班级 (class) 字段的格式校验已移除

    if (key === "student_no") {
      if (!validateStudentID(record[key])) {
        message.error("请输入正确的学号");
        return Promise.reject();
      }
    }

    if (key === "department") {
      // 构建一个同时更新 department 和 class 的记录
      const updateRecord = {
        ...record,
        class: "", // 强制将班级字段清空
      };

      try {
        // 执行包含清空 class 字段的 Mutation
        await updateProfileMutation({
          variables: {
            uuid: user.uuid,
            ...profileData?.users_by_pk,
            ...updateRecord, // 使用包含 class: "" 的新记录
          },
        });

        // 弹出 warning 提示：修改院系，已清空班级
        message.warning("修改院系，已清空班级");

        // 成功更新后，刷新组件数据
        await getProfileRefetch();
        setDescKey((prev) => prev + 1); // key 改变，强制 ProDescriptions 重绘
        return Promise.resolve();
      } catch (error) {
        // 错误处理
        console.error(error);
        message.error("更新院系信息失败");
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

  // [头像逻辑代码已省略，与主逻辑无关]
  // ... (handleImageClick, handleBeforeUpload, handleDeleteAvatar, showDeleteConfirm, handleCrop)

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
        <Col xs={24} md={18} order={1}>
          <Card
            hoverable
            styles={{
              body: {
                padding: "12px",
              },
            }}
          >
            <ProDescriptions
              key={descKey}
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
                  // 对 item 进行类型断言，明确告诉 TypeScript item.valueType 是 ProFieldValueType 类型
                  valueType={item.valueType as any}
                  // 对 item 进行类型断言，明确告诉 TypeScript item.fieldProps 是任何类型
                  fieldProps={item.fieldProps as any}
                >
                  {item.children}
                </ProDescriptions.Item>
              ))}
            </ProDescriptions>
          </Card>

          {/* 操作按钮部分 */}
          <Row style={{ marginTop: "2px", marginLeft: "20px" }}>
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
                disabled={user.role === "counselor"}
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
                disabled={user.role === "counselor"}
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
        </Col>
        {/* 头像部分 */}
        <Col
          xs={24}
          md={6}
          order={2}
          style={{ textAlign: "center", position: "relative" }}
        >
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
    </Content>
  );
};

export default ProfilePage;
