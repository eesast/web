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
  ConfigProvider,
  Tooltip,
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
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { CourseProps } from ".";
import dayjs from "dayjs";
import styled from "styled-components";
import axios from "axios";

// import { courseAdminRoles } from "../../Components/Authenticate";
/* ---------------- 接口和类型定义 ---------------- */
interface Comment {
  comment: string;
  created_at: string;
  updated_at: string;
  uuid: string;
  user_uuid: string;
  parent_uuid?: string;
  username?: string;
  display: boolean;
  // deleted: boolean;
  stars: number;
  likes: number;
  stared: boolean;
  liked: boolean;
  replies: string[];
  avatar_url: string;
}

interface IconTextProps {
  icon: FC;
  text: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

interface CustomMenuProp {
  items: MenuProps["items"];
  onClick?: MenuProps["onClick"];
  text?: string;
}
/* ---------------- 不随渲染刷新的常量和组件 ---------------- */
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

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    transition: transform 0.8s ease !important;
  }
`;

const IconText: FC<IconTextProps> = ({ icon, text, onClick }) => (
  <Space onClick={onClick} style={{ cursor: "pointer" }}>
    {React.createElement(icon)}
    {text}
  </Space>
);

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

/* ---------------- 主页面 ---------------- */
const DiscussDrawer: React.FC<CourseProps> = ({
  course_uuid,
  mode,
  user,
  isManager,
}: any) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const [comments, setComments] = useState<Comment[]>([]);

  const [commentsSorted, setCommentsSorted] = useState<Comment[]>([]);
  const [sortMode, setSortMode] = useState("1");
  const [sortTrend, setSortTrend] = useState("1");
  const [displayOption, setDisplayOption] = useState("1");

  const drawerContentRef = useRef<HTMLDivElement>(null);
  // const commentsRef = useRef<Comment[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [randomSeed, setRandomSeed] = useState(0);

  const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
  const [updateCommentModalVisible, setUpdateCommentModalVisible] =
    useState(false);
  const [newComment, setNewComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [updateCommentUuid, setUpdateCommentUuid] = useState("");
  const [currentComment, setCurrentComment] = useState<Comment>();
  const [highlightedComment, setHighlightedComment] = useState<Comment>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteCommentUuid, setDeleteCommentUuid] = useState("");

  const [isRotating, setIsRotating] = useState(false);
  const [rotateDegree, setRotateDegree] = useState(0);

  /* ---------------- useEffect ---------------- */
  const fetchComments = async (course_uuid: string) => {
    try {
      const response = await axios.get(`/course/comments/${course_uuid}`);
      if (response.status !== 200) throw new Error(response.data.error);

      return response.data.course_comments;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  useEffect(() => {
    if (!course_uuid) {
      return;
    }
    const fetchData = async () => {
      const data = await fetchComments(course_uuid);
      if (data.length > 0) {
        setComments(data);
      }
    };

    fetchData();
  }, [course_uuid]);

  useEffect(() => {
    handleSortComments(sortMode, sortTrend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode, sortTrend, comments, isManager]);

  /* ---------------- 业务逻辑函数 ---------------- */

  const handleGetCourseComment = async () => {
    // return;
    setIsRotating(true);
    setRotateDegree(0);
    const intervalId = setInterval(() => {
      setRotateDegree((prev) => prev + 7.2);
    }, 10);
    const data = await fetchComments(course_uuid);
    setComments(data);

    setTimeout(() => {
      clearInterval(intervalId);
      setIsRotating(false);
    }, 450);
  };

  const handleToggleCommentStar = async (comment: Comment) => {
    try {
      const stared = !comment.stared;

      const response = await axios.post(`/course/comments/stars/toggle`, {
        comment_uuid: comment.uuid,
        stared: stared,
      });

      if (response.status !== 200 && response.status !== 201)
        throw new Error(response.data.error);

      setComments(
        comments.map((item) =>
          item.uuid === comment.uuid
            ? {
                ...item,
                stared: stared,
                stars: stared ? item.stars + 1 : item.stars - 1,
              }
            : item,
        ),
      );

      message.success(stared ? "已收藏评论" : "已取消收藏");
    } catch (e) {
      console.error("Error toggling star for comments: ", e);
    }
  };

  const handleToggleCommentLike = async (comment: Comment) => {
    try {
      const liked = !comment.liked;

      const response = await axios.post(`/course/comments/likes/toggle`, {
        comment_uuid: comment.uuid,
        liked: liked,
      });

      if (response.status !== 200 && response.status !== 201)
        throw new Error(response.data.error);

      setComments(
        comments.map((item) =>
          item.uuid === comment.uuid
            ? {
                ...item,
                liked: liked,
                likes: liked ? item.likes + 1 : item.likes - 1,
              }
            : item,
        ),
      );

      message.success(liked ? "已点赞评论" : "已取消点赞");
    } catch (e) {
      console.error("Error toggling like for comments: ", e);
    }
  };

  const handleAddCourseComment = async (parent_uuid?: string) => {
    try {
      if (!newComment || !newComment.trim()) {
        message.warning("评论内容不能为空");
        return;
      }

      const isDuplicate = comments.some(
        (comment) =>
          comment.comment === newComment && comment.user_uuid === user.uuid,
      );

      if (isDuplicate) {
        message.warning("请勿重复发布相同评论");
        return;
      }

      const response = await axios.post(`/course/comments/add`, {
        comment: newComment,
        course_uuid: course_uuid,
        parent_uuid: parent_uuid,
      });

      if (response.status !== 200) throw new Error(response.data.error);

      setComments([...comments, response.data.comment]);

      setNewComment("");
      setAddCommentModalVisible(false);

      message.success("评论已经添加");
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateCourseComment = async () => {
    try {
      if (!updateComment || !updateComment.trim()) {
        message.warning("评论内容不能为空");
        return;
      }

      // 获取原评论内容
      const originalComment = comments.find(
        (item) => item.uuid === updateCommentUuid,
      );

      // 检查内容是否有变化
      if (originalComment && originalComment.comment === updateComment.trim()) {
        message.info("评论内容未发生变化");
        return;
      }

      const response = await axios.post(`/course/comments/update`, {
        comment: updateComment,
        comment_uuid: updateCommentUuid,
      });

      if (response.status !== 200) throw new Error(response.data.error);

      setComments(
        comments.map((item) =>
          item.uuid === updateCommentUuid
            ? {
                ...item,
                comment: updateComment,
                updated_at: response.data.updated_at,
                display: response.data.display,
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
      const response = await axios.post(`/course/comments/delete`, {
        comment_uuid: uuid,
      });

      if (response.status !== 200) throw new Error(response.data.error);

      setComments(comments.filter((item) => item.uuid !== uuid));

      message.success("评论已经删除");
    } catch (e) {
      console.error("Error deleting comments: ", e);
    }
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
    const index_from = commentsSorted.findIndex(
      (comment) => comment.uuid === from_item.uuid,
    );
    const index_to = commentsSorted.findIndex(
      (comment) => comment.uuid === to_item.uuid,
    );
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
    const sorted = isManager
      ? comments
      : comments.filter((item) => {
          return item.display || item.user_uuid === user.uuid;
        });
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
          return a.stars === b.stars
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : a.stars - b.stars;
        });
        break;
      case "4":
        sorted.sort((b, a) => {
          return a.likes === b.likes
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : a.likes - b.likes;
        });
        break;
      case "5":
        sorted.sort((b, a) => {
          return a.replies.length === b.replies.length
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : a.replies.length - b.replies.length;
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

  const handleDisplay = async (comment_uuid: string, display: boolean) => {
    try {
      const response = await axios.post(`/course/comments/display`, {
        comment_uuid: comment_uuid,
        display: display,
      });

      if (response.status !== 200) throw new Error(response.data.error);

      setComments(
        comments.map((item) =>
          item.uuid === comment_uuid ? { ...item, display: display } : item,
        ),
      );

      message.success(display ? "已精选评论" : "已取消精选");
    } catch (e) {
      console.error(e);
      message.error("操作失败，请重试");
    }
  };

  const handleBatchDisplay = async (display: boolean) => {
    try {
      const response = await axios.post(`/course/comments/batch_display`, {
        course_uuid: course_uuid,
        display: display,
      });

      if (response.status !== 200) throw new Error(response.data.error);

      setComments(
        comments.map((item) => ({
          ...item,
          display: display,
        })),
      );

      message.success(display ? "已精选全部评论" : "已取消全部精选");
    } catch (e) {
      console.error(e);
      message.error("操作失败，请重试");
    }
  };

  // const showDeleteConfirm = (uuid: string) => {
  //   Modal.confirm({
  //     title: "确认删除?",
  //     icon: <ExclamationCircleOutlined />,
  //     content: "删除后将无法恢复",
  //     okText: "是的",
  //     okType: "danger",
  //     cancelText: "取消",
  //     onOk() {
  //       handleDeleteCourseComment(uuid);
  //     },
  //     onCancel() {
  //       console.log("取消删除操作");
  //     },
  //   });
  // };

  /* ---------------- 页面组件 ---------------- */
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Badge count={comments.length ?? 0}>
        <Button
          type="primary"
          className="action-button"
          onClick={() => {
            setOpenDrawer(true);
            setRandomSeed(
              course_uuid
                .split("")
                .reduce((acc: any, char: any) => acc + char.charCodeAt(0), 0),
            );
            // handleGetCourseComment();
          }}
        >
          讨论
        </Button>
      </Badge>
      <Drawer
        styles={{
          body: {
            overflow: "hidden",
          },
        }}
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
              {(comments?.length ?? 0) === 0 ? (
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
              {isManager && (
                <Space size={4}>
                  <Tooltip title="全部精选">
                    <Button
                      type="link"
                      icon={
                        <CheckCircleOutlined
                          style={{ fontSize: "1.4em", color: "#52c41a" }}
                        />
                      }
                      onClick={async () => {
                        await handleBatchDisplay(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="取消全部精选">
                    <Button
                      type="link"
                      icon={
                        <StopOutlined
                          style={{ fontSize: "1.4em", color: "#ff4d4f" }}
                        />
                      }
                      onClick={async () => {
                        await handleBatchDisplay(false);
                      }}
                    />
                  </Tooltip>
                </Space>
              )}
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
                onClick={() => handleGetCourseComment()}
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
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
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
                  : commentsSorted.filter((item) => item.stared)
            }
            footer={
              <div>
                <center>
                  <b>{comments.filter((item) => item.display).length ?? 0} </b>{" "}
                  条精选评论
                  {isManager && (
                    <>
                      {" / "}
                      <b>{comments.length ?? 0}</b> 条总评论
                    </>
                  )}
                </center>
              </div>
            }
            renderItem={(item, index) => (
              <List.Item
                id={item.uuid}
                style={{
                  backgroundColor:
                    COMMENT_COLORS[
                      (comments.indexOf(item) ?? 0 + randomSeed) %
                        COMMENT_COLORS.length
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
                  setCurrentComment(item);
                  handleGotoComment(item, item, true);
                }}
                actions={[
                  <IconText
                    icon={item.stared ? StarFilled : StarOutlined}
                    text={item.stars.toString()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCommentStar(item);
                    }}
                  />,
                  <IconText
                    icon={item.liked ? LikeFilled : LikeOutlined}
                    text={item.likes.toString()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCommentLike(item);
                    }}
                  />,
                  <IconText
                    icon={
                      user.uuid &&
                      item.replies.some(
                        (reply_uuid) => reply_uuid === user.uuid,
                      )
                        ? MessageFilled
                        : MessageOutlined
                    }
                    text={item.replies.length.toString() ?? "0"}
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
                  <>
                    {isManager ? (
                      <IconText
                        icon={() => (
                          <Badge
                            status={item.display ? "success" : "default"}
                            text={item.display ? "已精选" : "精选"}
                          />
                        )}
                        text=" "
                        onClick={async (e) => {
                          e.stopPropagation();
                          await handleDisplay(item.uuid, !item.display);
                        }}
                      />
                    ) : (
                      item.user_uuid === user.uuid && (
                        <IconText
                          icon={() => (
                            <Badge
                              status={item.display ? "success" : "processing"}
                              text={item.display ? "已精选" : "未精选"}
                            />
                          )}
                          text=" "
                        />
                      )
                    )}
                    {item.user_uuid === user.uuid && (
                      <IconText
                        icon={DeleteOutlined}
                        text=""
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModalVisible(true);
                          setDeleteCommentUuid(item.uuid);
                        }}
                      />
                    )}
                  </>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "white",
                        color:
                          COMMENT_COLORS[
                            (comments.indexOf(item) ?? 0 + randomSeed) %
                              COMMENT_COLORS.length
                          ],
                        fontSize: "1.3em",
                        lineHeight: "44px",
                        width: "40px",
                        height: "40px",
                      }}
                      src={item.avatar_url}
                    ></Avatar>
                  }
                  title={
                    <>
                      {item.user_uuid === user.uuid
                        ? "Me"
                        : (item.username ?? "anonymous")}
                    </>
                  }
                  description={
                    <div>
                      <span
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1.3em",
                          wordWrap: "break-word",
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          maxWidth: "90%",
                          display: "inline-block",
                        }}
                      >
                        {item.parent_uuid ? (
                          <>
                            {"Re"}
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                setDisplayOption("1");
                                await new Promise((resolve) =>
                                  setTimeout(resolve, 200),
                                );
                                await handleGotoComment(
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
                              )?.username ?? ""}
                            </button>
                            {":  "}
                            {item.comment}
                          </>
                        ) : (
                          item.comment
                        )}
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
            dataSource={comments.filter((item) => {
              return currentComment && item.parent_uuid === currentComment.uuid;
            })}
            renderItem={(item, index) => (
              <List.Item
                key={item.user_uuid}
                style={{
                  backgroundColor:
                    COMMENT_COLORS[
                      (comments.indexOf(item) ?? 0 + randomSeed) %
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
                    icon={item.stared ? StarFilled : StarOutlined}
                    text={item.stars.toString()}
                    onClick={() => {
                      handleToggleCommentStar(item);
                    }}
                  />,
                  <IconText
                    icon={item.liked ? LikeFilled : LikeOutlined}
                    text={item.likes.toString()}
                    onClick={() => {
                      handleToggleCommentLike(item);
                    }}
                  />,
                  <IconText
                    icon={
                      user.uuid &&
                      item.replies.some(
                        (reply_uuid) => reply_uuid === user.uuid,
                      )
                        ? MessageFilled
                        : MessageOutlined
                    }
                    text={item.replies.length.toString() ?? "0"}
                    onClick={async () => {
                      setDisplayOption("1");
                      await new Promise((resolve) => setTimeout(resolve, 200));

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
                          await new Promise((resolve) =>
                            setTimeout(resolve, 200),
                          );
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
                  <>
                    {isManager ? (
                      <IconText
                        icon={() => (
                          <Badge
                            status={item.display ? "success" : "default"}
                            text={item.display ? "已精选" : "精选"}
                          />
                        )}
                        text=""
                        onClick={async (e) => {
                          e.stopPropagation();
                          await handleDisplay(item.uuid, !item.display);
                        }}
                      />
                    ) : (
                      item.user_uuid === user.uuid && (
                        <IconText
                          icon={() => (
                            <Badge
                              status={item.display ? "success" : "processing"}
                              text={item.display ? "已精选" : "未精选"}
                            />
                          )}
                          text=" "
                        />
                      )
                    )}
                    {item.user_uuid === user.uuid && (
                      <IconText
                        icon={DeleteOutlined}
                        text=""
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModalVisible(true);
                          setDeleteCommentUuid(item.uuid);
                        }}
                      />
                    )}
                  </>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "white",
                        color:
                          COMMENT_COLORS[
                            (comments.indexOf(item) ?? 0 + randomSeed) %
                              COMMENT_COLORS.length
                          ],
                        fontSize: "1.3em",
                        lineHeight: "44px",
                        width: "40px",
                        height: "40px",
                      }}
                      src={item.avatar_url}
                      key={item.avatar_url}
                    ></Avatar>
                  }
                  title={
                    <>
                      {item.user_uuid === user.uuid
                        ? "Me"
                        : (item.username ?? "anonymous")}
                    </>
                  }
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
          <div style={{ marginBottom: 1 }}>
            <Input.TextArea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="primary"
              style={{
                marginTop: 10,
              }}
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
      <Modal
        title="确认删除?"
        centered
        open={deleteModalVisible}
        onOk={() => {
          handleDeleteCourseComment(deleteCommentUuid);
          setDeleteModalVisible(false);
        }}
        onCancel={() => setDeleteModalVisible(false)}
        okText="是的"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        <ExclamationCircleOutlined
          style={{ color: "#faad14", marginRight: "8px" }}
        />
        删除后将无法恢复
      </Modal>
    </ConfigProvider>
  );
};

export default DiscussDrawer;
