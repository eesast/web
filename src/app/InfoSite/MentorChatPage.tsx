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

const { TextArea } = Input;

const MentorChatPage: React.FC<PageProps> = ({ mode, user }) => {
  const url = useUrl();

  const {
    loading: approvedApplicationsLoading,
    error: approvedApplicationsError,
    data: approvedApplicationsData,
  } = graphql.useGetApprovedMentorApplicationsQuery({
    variables: {
      _id: user?.uuid!,
    },
    skip: user?.role === "counselor",
  });

  useEffect(() => {
    if (approvedApplicationsError) {
      message.error("申请加载失败");
    }
  }, [approvedApplicationsError]);

  const mentor = approvedApplicationsData?.mentor_application?.[0]?.mentor;
  const students = useMemo(
    () =>
      approvedApplicationsData?.mentor_application.map((i) => i.student) ?? [],
    [approvedApplicationsData?.mentor_application],
  );

  const [selectedStudent, setSelectedStudent] =
    useState<
      graphql.GetApprovedMentorApplicationsQuery["mentor_application"][0]["student"]
    >();

  useEffect(() => {
    if (
      !approvedApplicationsLoading &&
      approvedApplicationsData &&
      !selectedStudent
    ) {
      setSelectedStudent(students[0]);
    }
  }, [
    approvedApplicationsData,
    approvedApplicationsLoading,
    selectedStudent,
    students,
  ]);

  const from = user?.uuid;
  const to = user?.role === "student" ? mentor?._id : selectedStudent?._id;

  const [text, setText] = useState("");

  const [addMessage, { loading: addMessageLoading, error: addMessageError }] =
    graphql.useAddMessageMutation();

  useEffect(() => {
    if (addMessageError) {
      message.error("信息发送失败");
    }
  }, [addMessageError]);

  const handleMessageSend = async () => {
    if (!text.trim()) {
      return;
    }

    await addMessage({
      variables: {
        from_id: from!,
        to_id: to!,
        payload: JSON.stringify({
          text: text.trim(),
        }),
      },
    });

    setText("");
  };

  if (approvedApplicationsLoading) {
    return (
      <Center>
        <Spin />
      </Center>
    );
  }

  if (
    (user?.role !== "student" && user?.role !== "teacher") ||
    (user?.role === "student" && !mentor) ||
    (user?.role === "teacher" && students?.length === 0)
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

  return (
    <Space
      direction="vertical"
      css={`
        width: 100%;
      `}
    >
      {user.role === "student" && (
        <Typography.Title
          level={2}
        >{`与导师 ${mentor?.name} 的聊天`}</Typography.Title>
      )}
      {user.role === "teacher" && (
        <Typography.Title
          level={2}
        >{`与学生 ${selectedStudent?.name} 的聊天`}</Typography.Title>
      )}
      <div>
        {user.role === "teacher" && (
          <Menu
            mode="horizontal"
            selectedKeys={selectedStudent ? [selectedStudent._id] : undefined}
            onClick={(e) => {
              setSelectedStudent(students.find((item) => item._id === e.key)!);
            }}
          >
            {students.map((item) => (
              <Menu.Item key={item._id}>{item.name}</Menu.Item>
            ))}
          </Menu>
        )}
        {from && to && (
          <div
            css={`
              flex: 1;
              display: flex;
              flex-direction: column;
            `}
          >
            <ChatFeed
              from={user.uuid!}
              to={user.role === "student" ? mentor!._id : selectedStudent!._id}
            />
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

const { Text } = Typography;

const ChatBubble: React.FC<{
  text: string;
  date: Date;
  position: "left" | "right";
}> = ({ text, position, date }) => {
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

const { Item } = List;

const ChatFeed: React.FC<{
  from: string;
  to: string;
}> = ({ from, to }) => {
  const scrollBarRef = useRef<Scrollbars>(null);

  const { data, loading, error } = graphql.useSubscribeToMessagesSubscription({
    variables: {
      from_id: from,
      to_id: to,
    },
  });

  useEffect(() => {
    if (error) {
      message.error("聊天记录加载失败");
    }
  }, [error]);

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
                position={from === item.from_id ? "right" : "left"}
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
