import React, { useState, useEffect, FC } from "react";
import {
  Badge,
  Button,
  Drawer,
  message,
  List,
  Avatar,
  Space,
  Modal,
  Input,
} from "antd";
import {
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
  StarOutlined,
  StarFilled,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { CourseProps } from ".";
import * as graphql from "@/generated/graphql";
import dayjs from "dayjs";

interface Comment {
  comment: string;
  created_at: string;
  updated_at: string;
  uuid: string;
  user_uuid: string;
  parent_uuid?: string;
  user: {
    username?: any;
  };
}

const COMMENT_COLORS = [
  "#9400d3", // 深紫罗兰色
  "#00bfff", // 深海蓝
  "#556b2f", // 深橄榄绿色
  "#daa520", // 深金色
  "#dc143c", // 深红色
  "#00ced1", // 深湖蓝
  "#ff1493", // 深玫瑰红
  "#008b8b", // 深青色
  "#4682b4", // 深钢蓝
  "#ff8c00", // 深橙色
  "#8b0000", // 深红色 (DarkRed)
  "#2f4f4f", // 深灰色 (DarkSlateGray)
  "#483d8b", // 暗石蓝 (DarkSlateBlue)
  "#8b4513", // 沙褐色 (SaddleBrown)
  "#191970", // 午夜蓝 (MidnightBlue)
  "#006400", // 深绿色 (DarkGreen)
  "#b22222", // 耐火砖红 (Firebrick)
  "#5f9ea0", // 军蓝 (CadetBlue)
  "#4b0082", // 靛青 (Indigo)
  "#800080", // 紫色 (Purple)
  "#708090", // 暗灰蓝 (SlateGray)
  "#6b8e23", // 橄榄褐色 (OliveDrab)
  "#9acd32", // 黄绿色 (YellowGreen)
  "#ff4500", // 橙红色 (OrangeRed)
  "#cd5c5c", // 印第安红 (IndianRed)
];

interface IconTextProps {
  icon: FC;
  text: string;
  onClick?: () => void;
}

const IconText: FC<IconTextProps> = ({ icon, text, onClick }) => (
  <Space onClick={onClick}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const DiscussDrawer: React.FC<CourseProps> = ({
  course_uuid,
  mode,
  user,
}: any) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsStared, setCommentsStared] = useState<string[]>([]);
  const [commentsLiked, setCommentsLiked] = useState<string[]>([]);
  const [commentsStars, setCommentsStars] = useState<{ [key: string]: number }>(
    {},
  );
  const [commentsLikes, setCommentsLikes] = useState<{ [key: string]: number }>(
    {},
  );
  const [commentsReplies, setCommentsReplies] = useState<{
    [key: string]: string[];
  }>({});
  const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
  const [updateCommentModalVisible, setUpdateCommentModalVisible] =
    useState(false);
  const [newComment, setNewComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [updateCommentUuid, setUpdateCommentUuid] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const [selectedCommentUuid, setSelectedCommentUuid] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { refetch: getCourseCommentRefetch } =
    graphql.useGetCourseCommentsQuery({
      variables: {
        course_uuid: course_uuid,
      },
    });
  const { refetch: getCourseCommentStaredRefetch } =
    graphql.useGetCourseCommentsStaredQuery({
      variables: {
        course_uuid: course_uuid,
        user_uuid: user.uuid,
      },
    });
  const { refetch: getCourseCommentLikedRefetch } =
    graphql.useGetCourseCommentsLikedQuery({
      variables: {
        course_uuid: course_uuid,
        user_uuid: user.uuid,
      },
    });
  const { refetch: getCourseCommentStarsRefetch } =
    graphql.useGetCourseCommentStarsQuery({
      variables: {
        comment_uuid: selectedCommentUuid,
      },
    });
  const { refetch: getCourseCommentLikesRefetch } =
    graphql.useGetCourseCommentLikesQuery({
      variables: {
        comment_uuid: selectedCommentUuid,
      },
    });
  const [addCourseComment] = graphql.useAddCourseCommentOneMutation();
  const [updateCourseComment] = graphql.useUpdateCourseCommentMutation();
  const [deleteCourseComment] = graphql.useDeleteCourseCommentOneMutation();
  const [addCourseCommentStars] = graphql.useAddCourseCommentStarsMutation();
  const [deleteCourseCommentStars] =
    graphql.useDeleteCourseCommentStarsMutation();
  const [deleteCourseCommentStarsByComment] =
    graphql.useDeleteCourseCommentStarsByCommentMutation();
  const [addCourseCommentLikes] = graphql.useAddCourseCommentLikesMutation();
  const [deleteCourseCommentLikes] =
    graphql.useDeleteCourseCommentLikesMutation();
  const [deleteCourseCommentLikesByComment] =
    graphql.useDeleteCourseCommentLikesByCommentMutation();
  const [deleteCourseCommentByFather] =
    graphql.useDeleteCourseCommentByFatherMutation();

  const handleGetCourseComment = async () => {
    setIsRotating(true);
    {
      const { data, error } = await getCourseCommentRefetch();
      if (error) {
        console.error("Error fetching comments: ", error);
        message.error("获取评论失败");
        return;
      }
      setComments(data?.course_comment ?? []);
    }
    {
      const { data, error } = await getCourseCommentStaredRefetch();
      if (error) {
        console.error("Error fetching comments stared: ", error);
        message.error("获取收藏失败");
        return;
      }
      setCommentsStared(
        data?.course_comment_stars.map((item) => item.course_comment.uuid) ??
          [],
      );
    }
    {
      const { data, error } = await getCourseCommentLikedRefetch();
      if (error) {
        console.error("Error fetching comments liked: ", error);
        message.error("获取点赞失败");
        return;
      }
      setCommentsLiked(
        data?.course_comment_likes.map((item) => item.course_comment.uuid) ??
          [],
      );
    }

    comments.forEach(async (comment) => {
      const { data, error } = await getCourseCommentStarsRefetch({
        comment_uuid: comment.uuid,
      });
      if (error) {
        console.error("Error fetching comments stars: ", error);
        message.error("获取收藏数失败");
        return;
      }
      setCommentsStars((prev) => ({
        ...prev,
        [comment.uuid]:
          data?.course_comment_stars_aggregate.aggregate?.count ?? 0,
      }));
    });

    comments.forEach(async (comment) => {
      const { data, error } = await getCourseCommentLikesRefetch({
        comment_uuid: comment.uuid,
      });
      if (error) {
        console.error("Error fetching comments likes: ", error);
        message.error("获取点赞数失败");
        return;
      }
      setCommentsLikes((prev) => ({
        ...prev,
        [comment.uuid]:
          data?.course_comment_likes_aggregate.aggregate?.count ?? 0,
      }));
    });

    setTimeout(() => setIsRotating(false), 500);
  };

  const handelToggleCommentStar = async (uuid: string) => {
    try {
      console.log("Toggling star for comment", uuid);
      const comment = comments.find((item) => item.uuid === uuid) ?? undefined;
      if (comment === undefined) {
        console.error("Comment not found");
        return;
      }

      if (commentsStared.includes(uuid)) {
        await deleteCourseCommentStars({
          variables: {
            comment_uuid: uuid,
            user_uuid: user.uuid,
          },
        });
        message.success("已取消收藏");

        setCommentsStars((prev) => ({
          ...prev,
          [uuid]: prev[uuid] ? prev[uuid] - 1 : 0,
        }));
      } else {
        await addCourseCommentStars({
          variables: {
            comment_uuid: uuid,
            user_uuid: user.uuid,
          },
        });
        message.success("评论已收藏");

        setCommentsStars((prev) => ({
          ...prev,
          [uuid]: prev[uuid] ? prev[uuid] + 1 : 1,
        }));
      }

      setCommentsStared((prev) =>
        prev.includes(uuid)
          ? prev.filter((item) => item !== uuid)
          : [...prev, uuid],
      );
    } catch (error) {
      console.error("Error toggling star for comments: ", error);
    }
  };

  const handelToggleCommentLike = async (uuid: string) => {
    try {
      console.log("Toggling like for comment", uuid);
      const comment = comments.find((item) => item.uuid === uuid) ?? undefined;
      if (comment === undefined) {
        console.error("Comment not found");
        return;
      }

      if (commentsLiked.includes(uuid)) {
        await deleteCourseCommentLikes({
          variables: {
            comment_uuid: uuid,
            user_uuid: user.uuid,
          },
        });
        message.success("已取消点赞");

        setCommentsLikes((prev) => ({
          ...prev,
          [uuid]: prev[uuid] ? prev[uuid] - 1 : 0,
        }));
      } else {
        await addCourseCommentLikes({
          variables: {
            comment_uuid: uuid,
            user_uuid: user.uuid,
          },
        });
        message.success("评论已点赞");

        setCommentsLikes((prev) => ({
          ...prev,
          [uuid]: prev[uuid] ? prev[uuid] + 1 : 1,
        }));
      }

      setCommentsLiked((prev) =>
        prev.includes(uuid)
          ? prev.filter((item) => item !== uuid)
          : [...prev, uuid],
      );
    } catch (error) {
      console.error("Error toggling like for comments: ", error);
    }
  };

  const handleAddCourseComment = async (parent_uuid?: string) => {
    try {
      console.log("Adding comment for course: ", course_uuid);
      await addCourseComment({
        variables: {
          comment: newComment,
          user_uuid: user.uuid,
          course_uuid: course_uuid,
          parent_uuid: parent_uuid,
        },
      });
      setNewComment("");
      setAddCommentModalVisible(false);
      message.success("评论已经添加");
      handleGetCourseComment();
    } catch (error) {
      console.error("Error adding comments: ", error);
    }
  };

  const handleUpdateCourseComment = async () => {
    try {
      console.log("Updating comment", updateCommentUuid);
      await updateCourseComment({
        variables: {
          comment: updateComment,
          uuid: updateCommentUuid,
        },
      });
      setComments((prev) =>
        prev.map((item) =>
          item.uuid === updateCommentUuid
            ? { ...item, comment: updateComment }
            : item,
        ),
      );

      setUpdateComment("");
      setUpdateCommentModalVisible(false);
      message.success("评论已经更新");
    } catch (error) {
      console.error("Error updating comments: ", error);
    }
  };

  const handleDeleteCourseComment = async (uuid: string) => {
    try {
      console.log("Deleting comment", uuid);
      const replies = commentsReplies[uuid] ?? [];
      replies.forEach(async (reply) => {
        await handleDeleteCourseComment(reply);
      });
      await deleteCourseCommentStarsByComment({
        variables: {
          comment_uuid: uuid,
        },
      });
      await deleteCourseCommentLikesByComment({
        variables: {
          comment_uuid: uuid,
        },
      });
      await deleteCourseComment({
        variables: {
          uuid,
        },
      });
      message.success("评论已经删除");
      handleGetCourseComment();
    } catch (error) {
      console.error("Error deleting comments: ", error);
    }
  };

  useEffect(() => {
    if (course_uuid) {
      handleGetCourseComment();
    } else {
      console.error("course_uuid is null or undefined");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course_uuid]);

  const { confirm } = Modal;
  const showDeleteConfirm = (uuid: string) => {
    confirm({
      title: "确认删除?",
      icon: <ExclamationCircleOutlined />,
      content: "删除后将无法恢复",
      okText: "是的",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        handleDeleteCourseComment(uuid);
      },
      onCancel() {
        console.log("取消删除操作");
      },
    });
  };

  return (
    <>
      <Badge count={comments?.length}>
        <Button
          type="primary"
          onClick={() => {
            showDrawer();
            handleGetCourseComment();
          }}
        >
          讨论
        </Button>
      </Badge>
      <Drawer
        key="course_discuss"
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>评论</span>
            <Space>
              <Button
                type="link"
                icon={
                  <ReloadOutlined
                    style={{
                      fontSize: "20px",
                      color: "#1890ff",
                      transition: "transform 0.5s ease",
                      transform: isRotating ? "rotate(360deg)" : "rotate(0deg)",
                    }}
                  />
                }
                onClick={handleGetCourseComment}
              />
              <Button
                type="link"
                icon={
                  <PlusOutlined
                    style={{ fontSize: "20px", color: "#1890ff" }}
                  />
                }
                onClick={() => setAddCommentModalVisible(true)}
              />
            </Space>
          </div>
        }
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={comments}
          footer={
            <div>
              <center>
                <b>{comments.length} </b> 条评论
              </center>
            </div>
          }
          renderItem={(item, index) => (
            <List.Item
              key={item.user_uuid}
              style={{
                backgroundColor: COMMENT_COLORS[index % COMMENT_COLORS.length],
                color: "white",
                fontWeight: "bold",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                // 透明度
                opacity: 0.8,
              }}
              actions={[
                <IconText
                  icon={
                    commentsStared.includes(item.uuid)
                      ? StarFilled
                      : StarOutlined
                  }
                  text={commentsStars[item.uuid]?.toString() ?? "0"}
                  onClick={() => handelToggleCommentStar(item.uuid)}
                />,
                <IconText
                  icon={
                    commentsLiked.includes(item.uuid)
                      ? LikeFilled
                      : LikeOutlined
                  }
                  text={commentsLikes[item.uuid]?.toString() ?? "0"}
                  onClick={() => {
                    handelToggleCommentLike(item.uuid);
                  }}
                />,
                <IconText
                  icon={MessageOutlined}
                  text={commentsReplies[item.uuid]?.length.toString() ?? "0"}
                />,
                item.user_uuid === user.uuid && (
                  <>
                    <IconText
                      icon={EditOutlined}
                      text=""
                      onClick={() => {
                        setUpdateCommentModalVisible(true);
                        setUpdateCommentUuid(item.uuid);
                        setUpdateComment(item.comment);
                      }}
                    />
                  </>
                ),
                item.user_uuid === user.uuid && (
                  <>
                    <IconText
                      icon={DeleteOutlined}
                      text=""
                      // 点击并确认删除评论
                      onClick={() => showDeleteConfirm(item.uuid)}
                    />
                  </>
                ),
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "white",
                      color: COMMENT_COLORS[index % COMMENT_COLORS.length],
                      fontSize: "1.3em",
                      lineHeight: "44px",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    {item.user.username?.slice(-2) ?? "匿名"}
                  </Avatar>
                }
                title={item.user.username ?? "anonymous"}
                description={
                  <div>
                    <span
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.2em",
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        maxWidth: "90%",
                        display: "inline-block",
                      }}
                    >
                      {item.comment}
                    </span>
                    <br />
                    <span
                      style={{
                        color: "rgba(245, 245, 245, 0.5)",
                        fontSize: "0.8em",
                      }}
                    >
                      Updated at:{" "}
                      {dayjs(item.updated_at).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <div></div>
      </Drawer>
      <Modal
        title="发布评论"
        centered
        open={addCommentModalVisible}
        onOk={() => handleAddCourseComment()}
        onCancel={() => setAddCommentModalVisible(false)}
      >
        <Input.TextArea
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </Modal>
      <Modal
        title="修改评论"
        centered
        open={updateCommentModalVisible}
        onOk={handleUpdateCourseComment}
        onCancel={() => setUpdateCommentModalVisible(false)}
      >
        <Input.TextArea
          rows={4}
          value={updateComment}
          onChange={(e) => setUpdateComment(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default DiscussDrawer;
