import React, { useState, useEffect, FC, useRef } from "react";
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
  Dropdown,
  MenuProps,
  Typography,
} from "antd";
import {
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
  MessageFilled,
  StarOutlined,
  StarFilled,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { CourseProps } from ".";
import * as graphql from "@/generated/graphql";
import dayjs from "dayjs";
import styled from "styled-components";

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
  deleted: boolean;
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

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    transition: transform 0.8s ease !important;
  }
`;

interface IconTextProps {
  icon: FC;
  text: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

const IconText: FC<IconTextProps> = ({ icon, text, onClick }) => (
  <Space onClick={onClick} style={{ cursor: "pointer" }}>
    {React.createElement(icon)}
    {text}
  </Space>
);

interface CustomMenuProp {
  items: MenuProps["items"];
  onClick?: MenuProps["onClick"];
  text?: string;
}

const DropdownMenu: FC<CustomMenuProp> = ({ items, onClick, text }) => (
  <Dropdown
    menu={{
      items: items,
      selectable: true,
      defaultSelectedKeys: ["1"],
      onClick: onClick,
    }}
  >
    <Typography.Link>
      <Space>
        <span
          style={{
            fontSize: "1.1em",
          }}
        >
          {text}
        </span>
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);

const sortModeMenuOptions: { [key: string]: string } = {
  "1": "按创建时间",
  "2": "按修改时间",
  "3": "按收藏数",
  "4": "按点赞数",
  "5": "按回复数",
};
const sortModeMenu: MenuProps["items"] = Object.entries(
  sortModeMenuOptions,
).map(([key, label]) => ({
  key,
  label,
}));

const sortTrendMenuOptions: { [key: string]: string } = {
  "1": "降序",
  "2": "升序",
};
const sortTrendMenu: MenuProps["items"] = Object.entries(
  sortTrendMenuOptions,
).map(([key, label]) => ({
  key,
  label,
}));

const displayOptionMenuOptions: { [key: string]: string } = {
  "1": "显示全部",
  "2": "隐藏回复",
  "3": "显示收藏",
};
const displayOptionMenu: MenuProps["items"] = Object.entries(
  displayOptionMenuOptions,
).map(([key, label]) => ({
  key,
  label,
}));

const DiscussDrawer: React.FC<CourseProps> = ({
  course_uuid,
  mode,
  user,
}: any) => {
  const [open, setOpen] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [randomSeed, setRandomSeed] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsSorted, setCommentsSorted] = useState<Comment[]>([]);
  const [commentsStared, setCommentsStared] = useState<string[]>([]);
  const [commentsLiked, setCommentsLiked] = useState<string[]>([]);
  const [commentsStars, setCommentsStars] = useState<{ [key: string]: number }>(
    {},
  );
  const [commentsLikes, setCommentsLikes] = useState<{ [key: string]: number }>(
    {},
  );
  const [commentsReplies, setCommentsReplies] = useState<{
    [key: string]: Comment[];
  }>({});
  const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
  const [updateCommentModalVisible, setUpdateCommentModalVisible] =
    useState(false);
  const [newComment, setNewComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [updateCommentUuid, setUpdateCommentUuid] = useState("");
  const [currentComment, setCurrentComment] = useState<Comment>();
  const [highlightedComment, setHighlightedComment] = useState<Comment>();
  const [isRotating, setIsRotating] = useState(false);
  const [rotateDegree, setRotateDegree] = useState(0);
  const [sortMode, setSortMode] = useState("1");
  const [sortTrend, setSortTrend] = useState("1");
  const [displayOption, setDisplayOption] = useState("1");
  const drawerContentRef = useRef<HTMLDivElement>(null);

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
        comment_uuid: "",
      },
    });
  const { refetch: getCourseCommentLikesRefetch } =
    graphql.useGetCourseCommentLikesQuery({
      variables: {
        comment_uuid: "",
      },
    });
  const [addCourseComment] = graphql.useAddCourseCommentOneMutation();
  const [updateCourseComment] = graphql.useUpdateCourseCommentMutation();
  const [deleteCourseComment] = graphql.useDeleteCourseCommentOneMutation();
  const [addCourseCommentStars] = graphql.useAddCourseCommentStarsMutation();
  const [deleteCourseCommentStars] =
    graphql.useDeleteCourseCommentStarsMutation();
  const [addCourseCommentLikes] = graphql.useAddCourseCommentLikesMutation();
  const [deleteCourseCommentLikes] =
    graphql.useDeleteCourseCommentLikesMutation();

  const handleGetCourseComment = async () => {
    setIsRotating(true);
    setRotateDegree(0);
    const intervalId = setInterval(() => {
      setRotateDegree((prev) => prev + 7.2);
    }, 10);
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

    setTimeout(() => {
      clearInterval(intervalId);
      setIsRotating(false);
    }, 450);
  };

  const handleGetCourseCommentStars = async () => {
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
  };

  const handleGetCourseCommentLikes = async () => {
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
  };

  const handleGetCommentReplies = async () => {
    comments.forEach((comment) => {
      setCommentsReplies((prev) => ({
        ...prev,
        [comment.uuid]: comments.filter(
          (item) => item.parent_uuid === comment.uuid && !item.deleted,
        ),
      }));
    });
  };

  const handleToggleCommentStar = async (uuid: string) => {
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

  const handleToggleCommentLike = async (uuid: string) => {
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
      setSortMode("1");
      setSortTrend("1");
      handleGetCourseComment();
      message.success("评论已经添加");
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
            ? {
                ...item,
                comment: updateComment,
                updated_at: new Date().toISOString(),
              }
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
      await deleteCourseComment({
        variables: {
          uuid,
        },
      });
      message.success("评论已经删除");
    } catch (error) {
      console.error("Error deleting comments: ", error);
    }
  };

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

  const handleScrollToComment = (uuid: string) => {
    const element = document.getElementById(uuid);
    if (element && drawerContentRef.current) {
      drawerContentRef.current.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleGotoComment = async (
    from_item: Comment,
    to_item: Comment,
    openReply: boolean,
  ) => {
    const index_from = commentsSorted.indexOf(from_item);
    const index_to = commentsSorted.indexOf(to_item);
    if (index_from === -1 || index_to === -1) {
      message.error("评论已删除");
      return;
    }
    setOpenReply(false);
    handleScrollToComment(to_item.uuid);
    const waitTime =
      from_item === to_item ? 0 : Math.abs((index_from - index_to) * 25) + 300;

    await new Promise((resolve) => setTimeout(resolve, waitTime));
    setCurrentComment(to_item);
    setOpenReply(openReply);
  };

  const handleSelectSortMode: MenuProps["onClick"] = (e) => {
    setSortMode(e.key);
  };
  const handleSelectSortTrend: MenuProps["onClick"] = (e) => {
    setSortTrend(e.key);
  };
  const handleSelectDisplayOption: MenuProps["onClick"] = (e) => {
    setDisplayOption(e.key);
  };

  const handleSortComments = (mode: string, trend: string) => {
    const sorted = [...comments.filter((item) => !item.deleted)];
    switch (mode) {
      case "1":
        sorted.sort(
          (b, a) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      case "2":
        sorted.sort(
          (b, a) =>
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
        );
        break;
      case "3":
        sorted.sort((b, a) => {
          const aStars = commentsStars[a.uuid] ?? 0;
          const bStars = commentsStars[b.uuid] ?? 0;
          return aStars === bStars
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : aStars - bStars;
        });
        break;
      case "4":
        sorted.sort((b, a) => {
          const aLikes = commentsLikes[a.uuid] ?? 0;
          const bLikes = commentsLikes[b.uuid] ?? 0;
          return aLikes === bLikes
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : aLikes - bLikes;
        });
        break;
      case "5":
        sorted.sort((b, a) => {
          const aReplies = commentsReplies[a.uuid]?.length ?? 0;
          const bReplies = commentsReplies[b.uuid]?.length ?? 0;
          return aReplies === bReplies
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : aReplies - bReplies;
        });
        break;
      default:
        break;
    }

    if (trend === "2") {
      sorted.reverse();
    }

    setCommentsSorted(sorted);
  };

  useEffect(() => {
    handleSortComments(sortMode, sortTrend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode, sortTrend]);
  useEffect(() => {
    if (sortMode === "3") {
      handleSortComments(sortMode, sortTrend);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsStars]);
  useEffect(() => {
    if (sortMode === "4") {
      handleSortComments(sortMode, sortTrend);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsLikes]);
  useEffect(() => {
    if (sortMode === "5") {
      handleSortComments(sortMode, sortTrend);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsReplies]);
  useEffect(() => {
    if (course_uuid) {
      handleGetCourseComment();
    } else {
      console.error("course_uuid is null or undefined");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course_uuid]);

  useEffect(() => {
    handleGetCourseCommentStars();
    handleGetCourseCommentLikes();
    handleGetCommentReplies();
    if (sortMode === "1" || sortMode === "2") {
      handleSortComments(sortMode, sortTrend);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  return (
    <>
      <Badge count={comments?.filter((item) => !item.deleted).length}>
        <Button
          type="primary"
          onClick={() => {
            showDrawer();
            setRandomSeed(
              course_uuid
                .split("")
                .reduce((acc: any, char: any) => acc + char.charCodeAt(0), 0),
            );
            handleGetCourseComment();
          }}
        >
          讨论
        </Button>
      </Badge>
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Space>
              {"    "}
              {comments.length === 0 ? (
                <Typography.Text>
                  <span
                    style={{
                      fontSize: "1.2em",
                    }}
                  >
                    暂无评论
                  </span>
                </Typography.Text>
              ) : (
                <>
                  <DropdownMenu
                    items={sortModeMenu}
                    onClick={handleSelectSortMode}
                    text={sortModeMenuOptions[sortMode] ?? "按创建时间"}
                  ></DropdownMenu>
                  <DropdownMenu
                    items={sortTrendMenu}
                    onClick={handleSelectSortTrend}
                    text={sortTrendMenuOptions[sortTrend] ?? "显示全部"}
                  ></DropdownMenu>
                  <DropdownMenu
                    items={displayOptionMenu}
                    onClick={handleSelectDisplayOption}
                    text={displayOptionMenuOptions[displayOption] ?? "显示全部"}
                  ></DropdownMenu>
                </>
              )}
            </Space>

            <Space>
              <Button
                type="link"
                icon={
                  <ReloadOutlined
                    style={{
                      fontSize: "1.4em",
                      color: "#1890ff",
                      transition: "transform 0.01s ease",
                      transform: isRotating
                        ? `rotate(${rotateDegree}deg)`
                        : `rotate(${rotateDegree + (360 - (rotateDegree % 360))}deg)`,
                    }}
                  />
                }
                onClick={handleGetCourseComment}
              />
              <Button
                type="link"
                icon={
                  <PlusOutlined
                    style={{ fontSize: "1.5em", color: "#1890ff" }}
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
        <div
          ref={drawerContentRef}
          style={{ maxHeight: "calc(100vh - 108px)", overflowY: "auto" }}
        >
          <List
            itemLayout="vertical"
            size="large"
            dataSource={
              displayOption === "1"
                ? commentsSorted
                : displayOption === "2"
                  ? commentsSorted.filter((item) => !item.parent_uuid)
                  : commentsSorted.filter((item) =>
                      commentsStared.includes(item.uuid),
                    )
            }
            footer={
              <div>
                <center>
                  <b>{comments.length} </b> 条评论
                </center>
              </div>
            }
            renderItem={(item, index) => (
              <List.Item
                id={item.uuid}
                style={{
                  backgroundColor:
                    COMMENT_COLORS[
                      (index + randomSeed) % COMMENT_COLORS.length
                    ],
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  opacity:
                    item === highlightedComment
                      ? 1
                      : item.parent_uuid
                        ? 0.65
                        : 0.8,
                }}
                onMouseEnter={() => {
                  setHighlightedComment(item);
                }}
                onMouseLeave={() => {
                  setHighlightedComment(undefined);
                }}
                onClick={() => {
                  handleGotoComment(item, item, true);
                }}
                actions={[
                  <IconText
                    icon={
                      commentsStared.includes(item.uuid)
                        ? StarFilled
                        : StarOutlined
                    }
                    text={commentsStars[item.uuid]?.toString() ?? "0"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCommentStar(item.uuid);
                    }}
                  />,
                  <IconText
                    icon={
                      commentsLiked.includes(item.uuid)
                        ? LikeFilled
                        : LikeOutlined
                    }
                    text={commentsLikes[item.uuid]?.toString() ?? "0"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCommentLike(item.uuid);
                    }}
                  />,
                  <IconText
                    icon={
                      commentsReplies[item.uuid] &&
                      user?.uuid &&
                      commentsReplies[item.uuid].some(
                        (reply) => reply.user_uuid === user.uuid,
                      )
                        ? MessageFilled
                        : MessageOutlined
                    }
                    text={commentsReplies[item.uuid]?.length.toString() ?? "0"}
                  />,
                  item.user_uuid === user.uuid && (
                    <>
                      <IconText
                        icon={EditOutlined}
                        text=""
                        onClick={(e) => {
                          e.stopPropagation();
                          setUpdateCommentModalVisible(true);
                          setUpdateCommentUuid(item.uuid);
                          setUpdateComment(item.comment);
                        }}
                      />
                    </>
                  ),
                ]}
                extra={[
                  (user.role === "admin" || item.user_uuid === user.uuid) && (
                    <>
                      <IconText
                        icon={DeleteOutlined}
                        text=""
                        onClick={(e) => {
                          e.stopPropagation();
                          showDeleteConfirm(item.uuid);
                        }}
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
                        color:
                          COMMENT_COLORS[
                            (index + randomSeed) % COMMENT_COLORS.length
                          ],
                        fontSize: "1.3em",
                        lineHeight: "44px",
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      {item.user.username?.slice(-2) ?? "匿名"}
                    </Avatar>
                  }
                  title={<>{item.user.username ?? "anonymous"}</>}
                  description={
                    <div>
                      <span
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1.3em",
                          wordWrap: "break-word",
                          whiteSpace: "pre-wrap",
                          maxWidth: "90%",
                          display: "inline-block",
                        }}
                      >
                        {item.parent_uuid ? (
                          <>
                            {"Re"}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDisplayOption("1");
                                handleGotoComment(
                                  item,
                                  comments.find(
                                    (comment) =>
                                      comment.uuid === item.parent_uuid,
                                  ) ?? item,
                                  false,
                                );
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "rgba(245, 245, 245)",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "1em",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.color = "black")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.color =
                                  "rgba(245, 245, 245)")
                              }
                            >
                              {comments.find(
                                (comment) => comment.uuid === item.parent_uuid,
                              )?.user.username ?? ""}
                            </button>
                            {":  "}
                            {item.comment}
                          </>
                        ) : (
                          item.comment
                        )}
                        <br />
                        <br />
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
        </div>
        <StyledDrawer
          title="回复"
          width={420}
          closable={false}
          onClose={() => setOpenReply(false)}
          open={openReply}
        >
          <List
            itemLayout="vertical"
            size="large"
            dataSource={comments.filter(
              (item) => item.parent_uuid === currentComment?.uuid ?? "",
            )}
            renderItem={(item, index) => (
              <List.Item
                key={item.user_uuid}
                style={{
                  backgroundColor:
                    COMMENT_COLORS[
                      (comments.indexOf(item) + randomSeed) %
                        COMMENT_COLORS.length
                    ],
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  opacity: 0.8,
                }}
                onMouseEnter={() => {
                  setHighlightedComment(item);
                }}
                onMouseLeave={() => {
                  setHighlightedComment(undefined);
                }}
                actions={[
                  <IconText
                    icon={
                      commentsStared.includes(item.uuid)
                        ? StarFilled
                        : StarOutlined
                    }
                    text={commentsStars[item.uuid]?.toString() ?? "0"}
                    onClick={() => {
                      handleToggleCommentStar(item.uuid);
                    }}
                  />,
                  <IconText
                    icon={
                      commentsLiked.includes(item.uuid)
                        ? LikeFilled
                        : LikeOutlined
                    }
                    text={commentsLikes[item.uuid]?.toString() ?? "0"}
                    onClick={() => {
                      handleToggleCommentLike(item.uuid);
                    }}
                  />,
                  <IconText
                    icon={
                      commentsReplies[item.uuid] &&
                      user?.uuid &&
                      commentsReplies[item.uuid].some(
                        (reply) => reply.user_uuid === user.uuid,
                      )
                        ? MessageFilled
                        : MessageOutlined
                    }
                    text={commentsReplies[item.uuid]?.length.toString() ?? "0"}
                    onClick={async () => {
                      setDisplayOption("1");
                      await handleGotoComment(
                        currentComment ?? item,
                        item,
                        true,
                      );
                    }}
                  />,
                  item.user_uuid === user.uuid && (
                    <>
                      <IconText
                        icon={EditOutlined}
                        text=""
                        onClick={async () => {
                          setDisplayOption("1");
                          await handleGotoComment(
                            currentComment ?? item,
                            item,
                            false,
                          );
                          setUpdateCommentModalVisible(true);
                          setUpdateCommentUuid(item.uuid);
                          setUpdateComment(item.comment);
                        }}
                      />
                    </>
                  ),
                ]}
                extra={[
                  (user.role === "admin" || item.user_uuid === user.uuid) && (
                    <>
                      <IconText
                        icon={DeleteOutlined}
                        text=""
                        onClick={() => {
                          showDeleteConfirm(item.uuid);
                        }}
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
                        color:
                          COMMENT_COLORS[
                            (comments.indexOf(item) + randomSeed) %
                              COMMENT_COLORS.length
                          ],
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
          <div style={{ marginBottom: 1 }}>
            <Input.TextArea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="primary"
              onClick={() => {
                handleAddCourseComment(currentComment?.uuid);
              }}
            >
              回复
            </Button>
          </div>
        </StyledDrawer>
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
