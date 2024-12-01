import React, { useEffect, Suspense, useState, useRef } from "react";
import {
  Input,
  Table,
  Card,
  Row,
  Col,
  Button,
  Form,
  message,
  Modal,
  Typography,
  Space,
  Statistic,
  Spin,
  Upload,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  FireOutlined,
  ArrowUpOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { TableProps } from "antd/lib/table";
import Cropper from "react-cropper";
import { useUrl } from "../../../api/hooks/url";
import {
  uploadFile,
  listFile,
  deleteFile,
  getAvatarUrl,
} from "../../../api/cos";
import * as graphql from "@/generated/graphql";
import { TeamProps } from ".";
import Loading from "@/app/Components/Loading";
import NotJoined from "../Components/NotJoined";
import styled from "styled-components";
/* ---------------- 不随渲染刷新的常量 ---------------- */
const { TextArea } = Input;
const { confirm } = Modal;
const { Paragraph, Title } = Typography;
const defaultAvatar = "/TeamOutlined.png";
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
/* ---------------- 不随渲染刷新的组件 ---------------- */
/* ---------------- 主页面 ---------------- */
const ManagePage: React.FC<TeamProps> = ({ mode, user, refresh }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const cropperRef = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const { data: teamData } = graphql.useGetTeamQuery({
    variables: {
      user_uuid: user.uuid,
      contest_id: Contest_id,
    },
  });
  const team_id = teamData?.contest_team_member[0]?.contest_team.team_id;
  const { data: teamInfoData, refetch: refetchTeamInfo } =
    graphql.useGetTeamInfoSuspenseQuery({
      variables: {
        team_id: team_id,
      },
    });

  const { data: teamStatData } = graphql.useGetTeamStatSuspenseQuery({
    variables: {
      team_id: team_id,
    },
  });

  useEffect(() => {
    // 在useEffect中进行异步操作
    listFile(`avatar/${team_id}/`)
      .then((files) => {
        const imageFiles = files.filter((file) =>
          /\.(jpe?g|png)$/i.test(file.Key),
        );
        if (imageFiles.length > 0) {
          const firstImage = imageFiles[0];
          getAvatarUrl(firstImage.Key)
            .then((url) => {
              setImageUrl(url); // 更新头像 URL
            })
            .catch((error) => {
              console.error("Failed to load avatar URL:", error);
              message.error("加载头像失败");
            });
        } else {
          setImageUrl("/TeamOutlined.png"); // 设置默认头像
        }
      })
      .catch((error) => {
        console.error("Failed to list files:", error);
        message.error("加载头像失败");
      });
  }, [team_id]); // 依赖 team_id，当 team_id 改变时重新获取头像

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  //更新队伍信息
  const [UpdateTeam, { data: UpdateTeamData, error: UpdateTeamError }] =
    graphql.useUpdateTeamMutation();
  //删除队伍信息
  const [DeleteTeam, { error: DeleteTeamError }] =
    graphql.useDeleteTeamMutation();

  const [DeleteTeamMember, { error: DeleteTeamMemberError }] =
    graphql.useDeleteTeamMemberMutation();

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (UpdateTeamData && !UpdateTeamError) {
      message.success("更新成功");
    }
  }, [UpdateTeamData, UpdateTeamError]);

  useEffect(() => {
    if (DeleteTeamMemberError) {
      message.error("退出队伍失败");
    }
  }, [DeleteTeamMemberError]);

  useEffect(() => {
    if (DeleteTeamError) {
      message.error("解散队伍失败");
    }
  }, [DeleteTeamError]);

  if (!team_id) {
    return <NotJoined />;
  }
  const team = teamInfoData?.contest_team_by_pk;
  const isLeader = user.uuid === team?.team_leader?.uuid;

  /* ---------------- 业务逻辑函数 ---------------- */
  const onFinish = async (record: any) => {
    const newinfo = {
      team_id: team_id,
      team_name: record.team_name,
      team_intro: record.team_intro,
    };
    await UpdateTeam({
      variables: newinfo,
    });
    await refetchTeamInfo();
  };

  const deleteTeamMember = async (user_id: string) => {
    confirm({
      title: "确定要退出队伍吗？",
      icon: <ExclamationCircleOutlined />,
      content: "若不在任何队伍中无法参加比赛!",
      onOk: async () => {
        const result = await DeleteTeamMember({
          variables: { user_uuid: user_id, team_id: team_id },
        });
        if (!result.errors) {
          Modal.success({
            title: "已退出队伍",
            content: "请重新加入队伍",
          });
          return refresh();
        }
      },
    });
  };
  const deleteTeamMemberByLeader = async (user_id: string) => {
    confirm({
      title: "确定要移除该同学吗？",
      icon: <ExclamationCircleOutlined />,
      content: "若不在任何队伍中无法参加比赛!",
      onOk: async () => {
        const result = await DeleteTeamMember({
          variables: { user_uuid: user_id, team_id: team_id },
        });
        if (!result.errors) {
          message.success("移除成功");
          return refetchTeamInfo();
        }
      },
    });
  };

  const deleteWholeTeam = async (team_id: string) => {
    confirm({
      title: "确定要解散队伍吗？",
      icon: <ExclamationCircleOutlined />,
      content: "会移除队伍以及所有队伍成员，若不在队伍中无法参加比赛!",
      onOk: async () => {
        const result = await DeleteTeam({ variables: { team_id: team_id } });
        if (!result.errors) {
          Modal.success({
            title: "队伍已解散",
            content: "请重新加入队伍",
          });
          return refresh();
        }
      },
    });
  };

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
      const files = await listFile(`avatar/${team_id}/`);
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
          const files = await listFile(`avatar/${team_id}/`);
          console.log("Files:", files);
          const deletePromises = files.map((file) => deleteFile(file.Key));
          await Promise.all(deletePromises);

          const fileName = `avatar/${team_id}/${file.name}`;
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

  /* ---------------- 随渲染刷新的组件 ---------------- */

  const memberListColumns: TableProps["columns"] = [
    {
      title: "姓名",
      key: "name",
      render: (text, record) => record.user.realname,
    },
    {
      title: "学号",
      key: "id",
      render: (text, record) => record.user.student_no,
    },
    {
      title: "管理",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            onClick={async () => {
              await deleteTeamMemberByLeader(record.user.uuid);
              await refetchTeamInfo();
            }}
            disabled={!isLeader || record.user.uuid === user.uuid}
          >
            移除
          </Button>
        );
      },
    },
  ];

  /* ---------------- 页面组件 ---------------- */

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        display: "flex",
        border: "0px solid #ccc",
        padding: "4vh 4vw",
        color: mode === "dark" ? "white" : "initial",
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
        <Col span={8}>
          <Card hoverable bordered={false}>
            <Statistic
              title="已提交代码"
              value={
                teamStatData?.contest_team_by_pk?.contest_team_codes_aggregate
                  ?.aggregate?.count || 0
              }
              prefix={<UploadOutlined />}
              suffix="份"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable bordered={false}>
            <Statistic
              title="共参与了"
              value={
                teamStatData?.contest_team_by_pk?.contest_team_rooms_aggregate
                  ?.aggregate?.count || 0
              }
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="场对战"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable bordered={false}>
            <Statistic
              title="天梯积分"
              value={
                teamStatData?.contest_team_by_pk?.contest_team_rooms_aggregate
                  ?.aggregate?.sum?.score || 0
              }
              valueStyle={{ color: "#cf1322" }}
              prefix={<FireOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={true}>
        <Col span={16}>
          <Card hoverable bordered={false}>
            <Title level={3} style={{ margin: `0 0 24px` }}>
              队伍信息
            </Title>
            <Suspense fallback={<Loading />}>
              <Form
                name="form"
                layout="vertical"
                initialValues={team!}
                onFinish={onFinish}
              >
                <Form.Item
                  name="team_name"
                  label="队伍名称"
                  rules={[{ required: true, message: "队伍名不能为空" }]}
                >
                  <Input
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="on"
                  />
                </Form.Item>
                <Form.Item
                  name="team_intro"
                  label="队伍简介"
                  rules={[{ required: true, message: "队伍简介不能为空" }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item style={{ textAlign: "end" }}>
                  <Button type="primary" htmlType="submit">
                    确认修改
                  </Button>
                </Form.Item>
              </Form>
            </Suspense>
            <Title level={3} style={{ margin: `0 0 12px` }}>
              成员管理
            </Title>
            <Title level={5}>邀请码</Title>
            <Paragraph copyable>{team?.invited_code}</Paragraph>
            <Suspense fallback={<Loading />}>
              <Table
                columns={memberListColumns}
                dataSource={
                  (teamInfoData as graphql.GetTeamInfoQuery)?.contest_team_by_pk
                    ?.contest_team_members
                }
                rowKey={(record) => record.user.uuid}
              />
            </Suspense>
            <Row justify="end">
              <Button
                danger
                style={{ marginRight: "12px" }}
                onClick={
                  isLeader
                    ? () => deleteWholeTeam(team_id)
                    : () => deleteTeamMember(user.uuid!)
                }
              >
                {isLeader ? "解散队伍" : "退出队伍"}
              </Button>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable bordered={false}>
            <Title level={3} style={{ margin: `0 0 24px` }}>
              队伍头像
            </Title>
            <Col
              span={24}
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
            <br />
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
    </Space>
  );
};
export default ManagePage;
