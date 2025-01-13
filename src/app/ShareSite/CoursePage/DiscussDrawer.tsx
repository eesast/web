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
import * as graphql from "@/generated/graphql";
import dayjs from "dayjs";
import styled from "styled-components";
import { listFile, getAvatarUrl } from "../../../api/cos";
// import { courseAdminRoles } from "../../Components/Authenticate";
/* ---------------- 接口和类型定义 ---------------- */
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
  display: boolean;
  deleted: boolean;
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
}: any) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const drawerContentRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<Comment[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [randomSeed, setRandomSeed] = useState(0);
  const [comments, setComments] = useState<Comment[]>(commentsRef.current);
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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteCommentUuid, setDeleteCommentUuid] = useState("");
  const [commentsRepliesAvatars, setCommentsRepliesAvatars] = useState<
    string[]
  >([]);
  const [avatarSource1, setAvatarsSource1] = useState<string[]>([]);
  const [avatarSource2, setAvatarsSource2] = useState<string[]>([]);
  const [avatarSource3, setAvatarsSource3] = useState<string[]>([]);
  const avatarCacheRef = useRef<{ [key: string]: string }>({});

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
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
  const { data: courseManagerData } = graphql.useGetCourseManagerQuery({
    variables: {
      user_uuid: user.uuid,
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
  const [displayCourseComment] = graphql.useDisplayCourseCommentOneMutation();
  const [batchDisplayCourseComments] =
    graphql.useDisplayCourseCommentsMutation();

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    handleSortComments(sortMode, sortTrend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode, sortTrend]);

  useEffect(() => {
    if (course_uuid) {
      handleGetCourseComment(false);
    } else {
      console.error("course_uuid is null or undefined");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course_uuid]);

  useEffect(() => {
    const fetchAvatar = async (userId: string | null | undefined) => {
      if (userId && avatarCacheRef.current && avatarCacheRef.current[userId]) {
        return avatarCacheRef.current[userId];
      }
      try {
        const files = await listFile(`avatar/${userId}/`);
        const imageFiles = files.filter((file) =>
          /\.(jpe?g|png)$/i.test(file.Key),
        );
        let avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?scale=80&backgroundType=gradientLinear&seed=${userId}`;
        if (imageFiles.length > 0) {
          const firstImage = imageFiles[0];
          avatarUrl = await getAvatarUrl(firstImage.Key);
        }
        if (userId) {
          avatarCacheRef.current[userId] = avatarUrl;
        }
        return avatarUrl;
      } catch (error) {
        console.error("Failed to load avatar:", error);
        return `https://api.dicebear.com/9.x/thumbs/svg?scale=80&backgroundType=gradientLinear&seed=${userId}`;
      }
    };

    const fetchRepliesAvatars = async () => {
      const replies = commentsReplies[currentComment?.uuid ?? ""] ?? [];
      const avatars: string[] = [];

      for (let i = 0; i < replies.length; i++) {
        const item = replies[i];
        if (item) {
          if (item.user_uuid) {
            const avatar = await fetchAvatar(item.user_uuid);
            avatars.push(avatar);
          } else {
            avatars.push("/UserOutlined.png");
          }
        } else {
          avatars.push("/UserOutlined.png");
        }
      }
      setCommentsRepliesAvatars(avatars);
    };
    fetchRepliesAvatars();

    const fetchAvatarsSource1 = async () => {
      const replies = commentsSorted;
      const avatars: string[] = [];

      for (let i = 0; i < replies.length; i++) {
        const item = replies[i];
        if (item) {
          if (item.user_uuid) {
            const avatar = await fetchAvatar(item.user_uuid);
            avatars.push(avatar);
          } else {
            avatars.push("/UserOutlined.png");
          }
        } else {
          avatars.push("/UserOutlined.png");
        }
      }
      setAvatarsSource1(avatars);
    };
    fetchAvatarsSource1();

    const fetchAvatarsSource2 = async () => {
      const replies = commentsSorted.filter((item) => !item.parent_uuid);
      const avatars: string[] = [];

      for (let i = 0; i < replies.length; i++) {
        const item = replies[i];
        if (item) {
          if (item.user_uuid) {
            const avatar = await fetchAvatar(item.user_uuid);
            avatars.push(avatar);
          } else {
            avatars.push("/UserOutlined.png");
          }
        } else {
          avatars.push("/UserOutlined.png");
        }
      }
      setAvatarsSource2(avatars);
    };
    fetchAvatarsSource2();

    const fetchAvatarsSource3 = async () => {
      const replies = commentsSorted.filter((item) =>
        commentsStared.includes(item.uuid),
      );
      const avatars: string[] = [];

      for (let i = 0; i < replies.length; i++) {
        const item = replies[i];
        if (item) {
          if (item.user_uuid) {
            const avatar = await fetchAvatar(item.user_uuid);
            avatars.push(avatar);
          } else {
            avatars.push("/UserOutlined.png");
          }
        } else {
          avatars.push("/UserOutlined.png");
        }
      }
      setAvatarsSource3(avatars);
    };
    fetchAvatarsSource3();
  }, [currentComment, commentsReplies, commentsSorted, commentsStared]);

  /* ---------------- 业务逻辑函数 ---------------- */
  const handleToggleDisplay = async (uuid: string, shouldDisplay: boolean) => {
    try {
      await displayCourseComment({
        variables: {
          uuid,
          shouldDisplay,
        },
      });

      // 更新本地状态
      commentsRef.current = commentsRef.current.map((item) =>
        item.uuid === uuid
          ? {
              ...item,
              display: shouldDisplay,
            }
          : item,
      );

      // 更新过滤后的评论列表
      setComments(
        commentsRef.current.filter(
          (item) =>
            !item.deleted &&
            (courseManagerData?.course_manager_by_pk ||
              item.display ||
              item.user_uuid === user.uuid),
        ),
      );

      // 重新排序评论
      handleSortComments(sortMode, sortTrend);

      // 显示操作成功提示
      message.success(shouldDisplay ? "评论已精选" : "已取消精选");
    } catch (error) {
      console.error("切换评论显示状态时出错:", error);
    }
  };

  const handleGetCourseComment = async (loadAncillary: boolean = true) => {
    setIsRotating(true);
    setRotateDegree(0);
    const intervalId = setInterval(() => {
      setRotateDegree((prev) => prev + 7.2);
    }, 10);
    {
      const { data, error } = await getCourseCommentRefetch();
      if (error) {
        console.error("Error fetching comments: ", error);
        return;
      }
      commentsRef.current = data?.course_comment ?? [];
    }
    if (loadAncillary) {
      {
        const { data, error } = await getCourseCommentStaredRefetch();
        if (error) {
          console.error("Error fetching comments stared: ", error);
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
          return;
        }
        setCommentsLiked(
          data?.course_comment_likes.map((item) => item.course_comment.uuid) ??
            [],
        );
      }
      await handleGetCourseCommentStars();
      await handleGetCourseCommentLikes();
      await handleGetCommentReplies();
    }
    // 在 handleGetCourseComment 函数中
    setComments(
      commentsRef.current.filter(
        (item) =>
          !item.deleted &&
          (courseManagerData?.course_manager_by_pk ||
            item.display ||
            item.user_uuid === user.uuid),
      ),
    );
    handleSortComments(sortMode, sortTrend);

    setTimeout(() => {
      clearInterval(intervalId);
      setIsRotating(false);
    }, 450);
  };

  const handleGetCourseCommentStars = async () => {
    commentsRef.current.forEach(async (comment) => {
      if (comment.deleted || !comment.display) {
        return;
      }
      const { data, error } = await getCourseCommentStarsRefetch({
        comment_uuid: comment.uuid,
      });
      if (error) {
        console.error("Error fetching comments stars: ", error);
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
    commentsRef.current.forEach(async (comment) => {
      if (comment.deleted || !comment.display) {
        return;
      }
      const { data, error } = await getCourseCommentLikesRefetch({
        comment_uuid: comment.uuid,
      });
      if (error) {
        console.error("Error fetching comments likes: ", error);
        return;
      }
      setCommentsLikes((prev) => ({
        ...prev,
        [comment.uuid]:
          data?.course_comment_likes_aggregate.aggregate?.count ?? 0,
      }));
    });
  };

  const handleGetCommentReplies = () => {
    commentsRef.current.forEach((comment) => {
      if (comment.deleted || !comment.display) {
        return;
      }
      setCommentsReplies((prev) => ({
        ...prev,
        [comment.uuid]: commentsRef.current.filter(
          (item) =>
            item.parent_uuid === comment.uuid && !item.deleted && item.display,
        ),
      }));
    });
  };

  const handleToggleCommentStar = async (uuid: string) => {
    try {
      console.log("Toggling star for comment", uuid);
      const comment =
        commentsRef.current.find((item) => item.uuid === uuid) ?? undefined;
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
      const comment =
        commentsRef.current.find((item) => item.uuid === uuid) ?? undefined;
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
      await handleGetCourseComment();
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
      commentsRef.current = commentsRef.current.map((item) =>
        item.uuid === updateCommentUuid
          ? {
              ...item,
              comment: updateComment,
              updated_at: new Date().toISOString(),
            }
          : item,
      );
      setUpdateComment("");
      setUpdateCommentModalVisible(false);
      setComments(
        commentsRef.current.filter(
          (item) =>
            !item.deleted &&
            (courseManagerData?.course_manager_by_pk ||
              item.display ||
              item.user_uuid === user.uuid),
        ),
      );
      handleSortComments(sortMode, sortTrend);
      handleGetCommentReplies();
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
      commentsRef.current = commentsRef.current.map((item) =>
        item.uuid === uuid
          ? {
              ...item,
              deleted: true,
            }
          : item,
      );
      setComments(commentsRef.current.filter((item) => !item.deleted));
      setCommentsReplies((prev) => {
        const newReplies = { ...prev };
        for (const key in newReplies) {
          newReplies[key] = newReplies[key].filter(
            (item) => item.uuid !== uuid,
          );
        }
        return newReplies;
      });
      handleSortComments(sortMode, sortTrend);
      message.success("评论已经删除");
    } catch (error) {
      console.error("Error deleting comments: ", error);
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
    console.log("Scrolling from", index_from, "to", index_to);
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
    const sorted = [
      ...commentsRef.current.filter(
        (item) =>
          !item.deleted &&
          (courseManagerData?.course_manager_by_pk ||
            item.display ||
            item.user_uuid === user.uuid),
      ),
    ];
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

  const handleBatchDisplay = async () => {
    try {
      await batchDisplayCourseComments({
        variables: {
          course_uuid: course_uuid,
          shouldDisplay: true,
        },
      });

      // 更新本地状态
      commentsRef.current = commentsRef.current.map((item) => ({
        ...item,
        display: true,
      }));

      // 更新显示的评论列表
      setComments(
        commentsRef.current.filter(
          (item) =>
            !item.deleted &&
            (courseManagerData?.course_manager_by_pk ||
              item.display ||
              item.user_uuid === user.uuid),
        ),
      );

      // 重新排序评论
      handleSortComments(sortMode, sortTrend);

      message.success("已精选全部评论");
    } catch (error) {
      console.error("批量精选评论时出错:", error);
      message.error("操作失败，请重试");
    }
  };
  const handleBatchUnDisplay = async () => {
    try {
      await batchDisplayCourseComments({
        variables: {
          course_uuid: course_uuid,
          shouldDisplay: false,
        },
      });

      // 更新本地状态
      commentsRef.current = commentsRef.current.map((item) => ({
        ...item,
        display: false,
      }));

      // 更新显示的评论列表
      setComments(
        commentsRef.current.filter(
          (item) =>
            !item.deleted &&
            (courseManagerData?.course_manager_by_pk ||
              item.display ||
              item.user_uuid === user.uuid),
        ),
      );

      // 重新排序评论
      handleSortComments(sortMode, sortTrend);

      message.success("已取消全部精选");
    } catch (error) {
      console.error("批量取消精选评论时出错:", error);
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
      <Badge count={comments?.length ?? 0}>
        <Button
          type="primary"
          onClick={() => {
            setOpenDrawer(true);
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
              {courseManagerData?.course_manager_by_pk && (
                <Space size={4}>
                  <Tooltip title="全部精选">
                    <Button
                      type="link"
                      icon={
                        <CheckCircleOutlined
                          style={{ fontSize: "1.4em", color: "#52c41a" }}
                        />
                      }
                      onClick={handleBatchDisplay}
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
                      onClick={handleBatchUnDisplay}
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
                  : commentsSorted.filter((item) =>
                      commentsStared.includes(item.uuid),
                    )
            }
            footer={
              <div>
                <center>
                  <b>
                    {commentsRef.current.filter(
                      (item) => !item.deleted && item.display,
                    ).length ?? 0}{" "}
                  </b>{" "}
                  条精选评论
                  {courseManagerData?.course_manager_by_pk && (
                    <>
                      {" / "}
                      <b>
                        {commentsRef.current.filter((item) => !item.deleted)
                          .length ?? 0}
                      </b>{" "}
                      条总评论
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
                      (commentsRef.current?.indexOf(item) ?? 0 + randomSeed) %
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
                  <>
                    {courseManagerData?.course_manager_by_pk && (
                      <IconText
                        icon={() => (
                          <Badge
                            status={item.display ? "success" : "default"}
                            text={item.display ? "已精选" : "精选"}
                          />
                        )}
                        text=""
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleDisplay(item.uuid, !item.display);
                        }}
                      />
                    )}
                    {(user.role === "admin" ||
                      item.user_uuid === user.uuid) && (
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
                            (commentsRef.current?.indexOf(item) ??
                              0 + randomSeed) % COMMENT_COLORS.length
                          ],
                        fontSize: "1.3em",
                        lineHeight: "44px",
                        width: "40px",
                        height: "40px",
                      }}
                      src={
                        displayOption === "1"
                          ? avatarSource1[index]
                          : displayOption === "2"
                            ? avatarSource2[index]
                            : avatarSource3[index]
                      }
                    ></Avatar>
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
                              onClick={async (e) => {
                                e.stopPropagation();
                                setDisplayOption("1");
                                await new Promise((resolve) =>
                                  setTimeout(resolve, 200),
                                );
                                await handleGotoComment(
                                  item,
                                  commentsRef.current.find(
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
                              {commentsRef.current.find(
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
            dataSource={commentsReplies[currentComment?.uuid ?? ""] ?? []}
            renderItem={(item, index) => (
              <List.Item
                key={item.user_uuid}
                style={{
                  backgroundColor:
                    COMMENT_COLORS[
                      (commentsRef.current?.indexOf(item) ?? 0 + randomSeed) %
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
                    {courseManagerData?.course_manager_by_pk && (
                      <IconText
                        icon={() => (
                          <Badge
                            status={item.display ? "success" : "default"}
                            text={item.display ? "已精选" : "精选"}
                          />
                        )}
                        text=""
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleDisplay(item.uuid, !item.display);
                        }}
                      />
                    )}
                    {(user.role === "admin" ||
                      item.user_uuid === user.uuid) && (
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
                            (commentsRef.current?.indexOf(item) ??
                              0 + randomSeed) % COMMENT_COLORS.length
                          ],
                        fontSize: "1.3em",
                        lineHeight: "44px",
                        width: "40px",
                        height: "40px",
                      }}
                      src={commentsRepliesAvatars[index]}
                    ></Avatar>
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
