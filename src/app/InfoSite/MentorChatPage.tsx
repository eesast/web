import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  message,
  Spin,
  Result,
  Button,
  Space,
  Typography,
  Menu,
  List,
  Input,
} from "antd";
import Center from "../Components/Center";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Scrollbars from "react-custom-scrollbars";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { PageProps } from "..";

/*----- 不依赖于 props 和 hooks 的定义 -----*/
const { TextArea } = Input;
const { Text } = Typography;
const { Item } = List;

/*----- 主组件 MentorChatPage -----*/
const MentorChatPage: React.FC<PageProps> = ({ mode, user }) => {
  /*----- states 和 引入 hooks -----*/
  //保存年份、学生信息，以及刚输入的文本
  const url = useUrl();
  const [selectedYear] = useState<number>(new Date().getFullYear());
  const [selectedStudent, setSelectedStudent] =
    useState<
      graphql.GetApprovedMentorApplicationsQuery["mentor_application"][0]["student"]
    >();
  const [text, setText] = useState("");

  /*----- 获取数据 hook -----*/
  // 查询获取导师已批准的申请信息
  const {
    loading: approvedApplicationsLoading,
    error: approvedApplicationsError,
    data: approvedApplicationsData,
  } = graphql.useGetApprovedMentorApplicationsQuery({
    variables: {
      uuid: user.uuid!,
      year: selectedYear!,
    },
    skip: user.role === "counselor",
  });

  // 发送信息 hook
  const [addMessage, { loading: addMessageLoading, error: addMessageError }] =
    graphql.useAddMessageMutation();

  /*----- useEffect 部分 -----*/
  // 申请数据加载失败时提示
  useEffect(() => {
    if (approvedApplicationsError) {
      message.error("申请加载失败");
    }
  }, [approvedApplicationsError]);

  // 发送信息失败时提示
  useEffect(() => {
    if (addMessageError) {
      message.error("信息发送失败");
    }
  }, [addMessageError]);

  // 自动选择列表中的第一个学生
  useEffect(() => {
    if (
      !approvedApplicationsLoading &&
      approvedApplicationsData &&
      !selectedStudent
    ) {
      setSelectedStudent(
        approvedApplicationsData?.mentor_application.map((i) => i.student)?.[0],
      );
    }
  }, [approvedApplicationsData, approvedApplicationsLoading, selectedStudent]);

  /*----- 其他函数和处理逻辑 -----*/
  // 获取当前用户的导师信息和学生信息
  const mentor = approvedApplicationsData?.mentor_application?.[0]?.mentor;
  const students = useMemo(
    () =>
      approvedApplicationsData?.mentor_application.map((i) => i.student) ?? [],
    [approvedApplicationsData?.mentor_application],
  );

  // 获取当前用户UUID
  const from = user.uuid;
  const to = user.role === "student" ? mentor?.uuid : selectedStudent?.uuid;

  // 发送信息的处理函数
  const handleMessageSend = async () => {
    if (!text.trim()) {
      return;
    }

    await addMessage({
      variables: {
        from_uuid: from!,
        to_uuid: to!,
        payload: JSON.stringify({
          text: text.trim(),
        }),
      },
    });

    setText(""); //清空文本框
  };

  /*----- 渲染逻辑 -----*/
  if (approvedApplicationsLoading) {
    return (
      <Center>
        <Spin />
      </Center>
    );
  }

  // 如果用户角色不是学生或教师，或者是学生但没有导师，或者是教师但没有学生，则提示用户尚未配对
  if (
    (user.role !== "student" && user.role !== "teacher") ||
    (user.role === "student" && !mentor) ||
    (user.role === "teacher" && students?.length === 0)
  ) {
    return (
      <Result
        status="info"
        title="您尚未配对"
        extra={
          <Button type="primary">
            <Link to={url.link("mentor-applications")}>查看申请</Link>
          </Button>
        }
      />
    );
  }

  /*----- 组件渲染 -----*/
  return (
    <Space
      direction="vertical"
      css={`
        width: 100%;
      `}
    >
      {/* 根据用户角色展示不同标题 */}
      {user.role === "student" && (
        <Typography.Title
          level={2}
        >{`与导师 ${mentor?.realname} 的聊天`}</Typography.Title>
      )}
      {user.role === "teacher" && (
        <Typography.Title
          level={2}
        >{`与 ${selectedStudent?.realname} 的聊天`}</Typography.Title>
      )}

      <div>
        {/* 教师选择学生聊天 */}
        {user.role === "teacher" && (
          <Menu
            mode="horizontal"
            selectedKeys={selectedStudent ? [selectedStudent.uuid] : undefined}
            onClick={(e) => {
              setSelectedStudent(
                students.find((item) => item?.uuid === e.key)!,
              );
            }}
          >
            {students.map((item) => (
              <Menu.Item key={item?.uuid}>{item?.realname}</Menu.Item>
            ))}
          </Menu>
        )}

        {/* 聊天区域 */}
        {from && to && (
          <div
            css={`
              display: flex;
              flex-direction: column;
            `}
          >
            <ChatFeed from={user.uuid!} to={to} />
            <TextArea
              css={`
                resize: none;
                padding: 12px;
                margin: auto;
                margin-top: 24px;
              `}
              autoSize={{ minRows: 4, maxRows: 4 }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              css={`
                align-self: flex-end;
                margin: 12px 0px 24px auto;
              `}
              loading={addMessageLoading}
              onClick={handleMessageSend}
            >
              发送
            </Button>
          </div>
        )}
      </div>
    </Space>
  );
};

export default MentorChatPage;

/*----- ChatFeed 组件 -----*/
const ChatFeed: React.FC<{ from: string; to: string }> = ({ from, to }) => {
  /*----- 引用 hook -----*/
  const scrollBarRef = useRef<Scrollbars>(null);

  /*----- 获取数据 hook -----*/
  const { data, loading, error } = graphql.useSubscribeToMessagesSubscription({
    variables: {
      from_uuid: from,
      to_uuid: to,
    },
  });

  /*----- useEffect 部分 -----*/
  // 加载聊天记录失败时提示
  useEffect(() => {
    if (error) {
      message.error("聊天记录加载失败");
      message.error(error.message);
    }
  }, [error]);

  // 当有新消息时滚动到底部
  useEffect(() => {
    if (
      !loading &&
      data &&
      data.mentor_message.length !== 0 &&
      scrollBarRef.current
    ) {
      scrollBarRef.current.scrollToBottom();
    }
  }, [loading, data]);

  /*----- 组件渲染 -----*/
  return (
    <div
      css={`
        height: 50vh;
      `}
    >
      <Scrollbars
        ref={scrollBarRef}
        css={`
          margin-bottom: -20px;
        `}
      >
        <List
          css={`
            padding: 0px 20px;
          `}
          split={false}
          dataSource={data?.mentor_message}
          renderItem={(item) => (
            <Item
              key={item.id}
              css={`
                padding: 6px 0px;
              `}
            >
              <ChatBubble
                position={from === item.from_uuid ? "right" : "left"}
                text={JSON.parse(item.payload).text}
                date={item.created_at}
              />
            </Item>
          )}
        >
          {loading && (
            <Center>
              <Spin />
            </Center>
          )}
        </List>
      </Scrollbars>
    </div>
  );
};

/*----- ChatBubble 组件 -----*/
const ChatBubble: React.FC<{
  /*----- props -----*/
  text: string; // text: 聊天内容
  date: Date; // date: 发送时间
  position: "left" | "right"; // position: 文字对齐位置
}> = ({ text, position, date }) => {
  /*----- 组件渲染 -----*/
  return (
    <div
      css={`
        display: flex;
        flex-direction: row;
        width: 100%;
      `}
      style={{
        justifyContent: position === "left" ? "flex-start" : "flex-end",
      }}
    >
      <div
        css={`
          display: flex;
          max-width: 70%;
          flex-direction: column;
        `}
        style={{ alignItems: position === "left" ? "flex-start" : "flex-end" }}
      >
        <Text
          css={`
            width: 100%;
            word-wrap: break-word;
            background-color: #eee;
            border-radius: 15px;
            padding: 10px;
          `}
        >
          {text}
        </Text>
        <div
          css={`
            color: gray;
            font-size: 10px;
            margin: 5px;
          `}
        >
          {dayjs(date).calendar()}
        </div>
      </div>
    </div>
  );
};
