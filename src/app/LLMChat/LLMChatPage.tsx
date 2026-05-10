import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Layout,
  Input,
  Button,
  Card,
  Typography,
  message,
  Select,
  Avatar,
  Tooltip,
  Modal,
  Checkbox,
  Progress,
} from "antd";
import {
  UserOutlined,
  RobotOutlined,
  SendOutlined,
  BulbOutlined,
  PlusOutlined,
  DeleteOutlined,
  MessageOutlined,
  StopOutlined,
  KeyOutlined,
  CopyOutlined,
  CheckOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import styled from "styled-components";
import * as graphql from "../../generated/graphql";

// Define locally to avoid circular dependency issues
interface JwtPayload {
  uuid: string;
  role: string;
  "https://hasura.io/jwt/claims"?: {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
    "x-hasura-user-id": string;
  };
  isLoggedIn: boolean;
}

interface PageProps {
  mode: string;
  user: JwtPayload;
}

const { Title } = Typography;
const { TextArea } = Input;
const { Sider, Content } = Layout;

interface ModelConfig {
  label: string;
  value: string;
  deepThinkingModel?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: { role: string; content: string; reasoning?: string }[];
  timestamp: number;
  model: string;
}

const PageLayout = styled(Layout)<{ mode: string }>`
  height: calc(100vh - 64px);
  background-color: ${(props) => (props.mode === "dark" ? "#212121" : "#fff")};
  display: flex;
  flex-direction: row;
`;

const MainContent = styled(Content)<{ mode: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: ${(props) => (props.mode === "dark" ? "#212121" : "#fff")};
  position: relative;
`;

const Sidebar = styled(Sider)<{ mode: string }>`
  background-color: ${(props) =>
    props.mode === "dark" ? "#171717" : "#f9f9f9"} !important;
  border-right: 1px solid
    ${(props) => (props.mode === "dark" ? "#303030" : "#e5e5e5")};
  overflow-y: auto;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

const SidebarHeader = styled.div`
  padding: 16px;
`;

const SessionList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
`;

const SessionItem = styled.div<{ active: boolean; mode: string }>`
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => (props.mode === "dark" ? "#ececf1" : "#374151")};
  background-color: ${(props) =>
    props.active
      ? props.mode === "dark"
        ? "#2f2f2f"
        : "#e6f7ff"
      : "transparent"};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.mode === "dark" ? "#2f2f2f" : "#f0f0f0"};
  }

  .title {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }

  .delete-btn {
    opacity: 0;
    transition: opacity 0.2s;
    color: #999;
    &:hover {
      color: #ff4d4f;
    }
  }

  &:hover .delete-btn {
    opacity: 1;
  }
`;

const HeaderContainer = styled.div<{ mode: string }>`
  width: 100%;
  max-width: 800px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.mode === "dark" ? "#212121" : "#fff")};
  z-index: 10;
`;

const ScrollArea = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  scroll-behavior: smooth;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }
`;

const MessageRow = styled.div<{ role: string }>`
  width: 100%;
  max-width: 800px;
  padding: 24px;
  display: flex;
  gap: 16px;
  flex-direction: row;
`;

const MessageContent = styled.div<{ role: string; mode: string }>`
  flex: 1;
  font-size: 16px;
  line-height: 1.6;
  color: ${(props) => (props.mode === "dark" ? "#ececf1" : "#374151")};
  overflow-wrap: break-word;

  p {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }

  pre {
    background: ${(props) => (props.mode === "dark" ? "#2f2f2f" : "#f6f8fa")};
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 16px 0;
  }

  code {
    font-family:
      "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 0.9em;
    background: ${(props) =>
      props.mode === "dark"
        ? "rgba(255,255,255,0.1)"
        : "rgba(175,184,193,0.2)"};
    padding: 0.2em 0.4em;
    border-radius: 6px;
  }

  pre code {
    background: transparent;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
  }

  th,
  td {
    border: 1px solid ${(props) => (props.mode === "dark" ? "#444" : "#ddd")};
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: ${(props) =>
      props.mode === "dark" ? "#2f2f2f" : "#f6f8fa"};
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: ${(props) =>
      props.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"};
  }
`;

const CopyButton = ({ content, mode }: { content: string; mode: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      message.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      message.error("Failed to copy");
    }
  };

  return (
    <Tooltip title="Copy">
      <Button
        type="text"
        size="small"
        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
        onClick={handleCopy}
        style={{
          color: mode === "dark" ? "#aaa" : "#666",
          marginLeft: 8,
        }}
      />
    </Tooltip>
  );
};

const InputContainer = styled.div<{ mode: string }>`
  width: 100%;
  max-width: 800px;
  padding: 0 24px 24px 24px;
  background-color: ${(props) => (props.mode === "dark" ? "#212121" : "#fff")};
`;

const InputWrapper = styled.div<{ mode: string }>`
  position: relative;
  border: 1px solid
    ${(props) => (props.mode === "dark" ? "#424242" : "#e5e5e5")};
  border-radius: 16px;
  background-color: ${(props) => (props.mode === "dark" ? "#2f2f2f" : "#fff")};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 8px 12px;
  display: flex;
  align-items: flex-end;

  &:focus-within {
    border-color: ${(props) => (props.mode === "dark" ? "#666" : "#ccc")};
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StyledTextArea = styled(TextArea)<{ mode: string }>`
  && {
    border: none;
    box-shadow: none;
    background: transparent;
    resize: none;
    padding: 8px 0;
    color: ${(props) => (props.mode === "dark" ? "#fff" : "#000")};

    &:focus {
      box-shadow: none;
    }

    &::placeholder {
      color: ${(props) => (props.mode === "dark" ? "#888" : "#aaa")};
    }
    flex: 1;
  }
`;

const SendButton = styled(Button)`
  && {
    border: none;
    background: ${(props) => (props.disabled ? "transparent" : "#1890ff")};
    color: ${(props) => (props.disabled ? "rgba(0,0,0,0.25)" : "#fff")};
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-bottom: 4px;
    margin-left: 8px;

    &:hover {
      background: ${(props) => (props.disabled ? "transparent" : "#40a9ff")};
    }
  }
`;

const ReasoningBlock = styled.div<{ mode: string }>`
  margin-bottom: 16px;
  padding: 12px;
  border-left: 3px solid ${(props) => (props.mode === "dark" ? "#444" : "#ddd")};
  background-color: ${(props) =>
    props.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"};
  border-radius: 0 8px 8px 0;
  font-size: 0.9em;
  color: ${(props) => (props.mode === "dark" ? "#aaa" : "#666")};

  summary {
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;
  }
`;

const DeepThinkButton = styled.div<{ active: boolean; mode: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 18px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-right: 8px;
  margin-bottom: 5px;
  user-select: none;
  flex-shrink: 0;

  background-color: ${(props) =>
    props.active
      ? props.mode === "dark"
        ? "rgba(24, 144, 255, 0.2)"
        : "#e6f7ff"
      : "transparent"};

  color: ${(props) =>
    props.active ? "#1890ff" : props.mode === "dark" ? "#888" : "#999"};

  border: 1px solid
    ${(props) =>
      props.active ? "#1890ff" : props.mode === "dark" ? "#424242" : "#d9d9d9"};

  &:hover {
    color: #1890ff;
    border-color: #1890ff;
  }
`;

const preprocessLaTeX = (content: string) => {
  // Replace \[ ... \] with $$ ... $$
  let processed = content.replace(/\\\[([\s\S]*?)\\\]/g, "$$$$$1$$$$");
  // Replace \( ... \) with $ ... $
  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, "$$$1$$");

  // Heuristic to fix model outputting math in backticks
  processed = processed.replace(/`([^`\n]+)`/g, (match, code) => {
    const isMath =
      /(_\{|\^\{)/.test(code) ||
      /\\[a-zA-Z]+/.test(code) ||
      (/[\u2200-\u22FF\u0391-\u03C9]/.test(code) && code.includes("="));

    if (isMath) {
      return `$${code}$`;
    }
    return match;
  });

  return processed;
};

const decodeJwtPayload = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const getAuthUuidFromToken = (authToken: string | null) => {
  if (!authToken) return null;
  const decoded = decodeJwtPayload(authToken);
  if (!decoded) return null;
  return decoded.uuid || decoded.sub || null;
};

const getSessionStorageKey = (uuid: string | null) =>
  uuid ? `llm_chat_sessions:${uuid}` : "llm_chat_sessions";

const getApiBaseUrl = () => {
  const baseUrl =
    (process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_API_DEV_URL) || "";

  if (!baseUrl) {
    throw new Error(
      "未配置后端 API 地址，请检查 REACT_APP_API_URL / REACT_APP_API_DEV_URL",
    );
  }

  return baseUrl;
};

const fetchLlmStatus = async (authToken: string) => {
  const response = await fetch(`${getApiBaseUrl()}/llm/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  const raw = await response.text();
  let data: any = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch (e) {
    if (!response.ok) {
      throw new Error(`认证失败(${response.status})，返回内容不是 JSON`);
    }
    throw new Error("认证接口返回了非 JSON 内容，请检查网关或 API 地址配置");
  }

  if (!response.ok) {
    throw new Error(data?.error || `Verification failed (${response.status})`);
  }

  return data;
};

const LLMChatPage: React.FC<PageProps> = ({ mode }) => {
  useEffect(() => {
    console.log("[LLMChatPage] mounted");
    return () => {
      console.log("[LLMChatPage] unmounted");
    };
  }, []);
  const { data: llmData } = graphql.useGetLlmListQuery();
  const models: ModelConfig[] = useMemo(
    () =>
      llmData?.llm_list.map((item: any) => ({
        label: item.name,
        value: item.value,
        deepThinkingModel: item.deepthinkingmodel || undefined,
      })) || [],
    [llmData],
  );

  const [authUuid, setAuthUuid] = useState<string | null>(null);
  const [authUuidReady, setAuthUuidReady] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [enableDeepThinking, setEnableDeepThinking] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(() => {
    return localStorage.getItem("llm_usage_instructions_hidden") !== "true";
  });
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [quotaSnapshot, setQuotaSnapshot] = useState<{
    totalTokensUsed: number;
    tokenLimit: number;
  } | null>(null);

  const sessionStorageKey = useMemo(
    () => getSessionStorageKey(authUuid),
    [authUuid],
  );

  const autoVerifyRef = useRef(false);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    const uuid = getAuthUuidFromToken(authToken);
    setAuthUuid(uuid);
    setAuthUuidReady(true);
  }, []);

  useEffect(() => {
    autoVerifyRef.current = false;
  }, [authUuid]);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { role: string; content: string; reasoning?: string }[]
  >([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    if (!authUuidReady) return;
    const savedSessions = localStorage.getItem(sessionStorageKey);
    let parsedSessions: ChatSession[] = [];
    if (savedSessions) {
      try {
        parsedSessions = JSON.parse(savedSessions);
      } catch (e) {
        console.error("Failed to parse sessions", e);
      }
    }

    if (parsedSessions.length === 0) {
      parsedSessions = [
        {
          id: Date.now().toString(),
          title: "New Chat",
          messages: [],
          timestamp: Date.now(),
          model: "",
        },
      ];
    }

    setSessions(parsedSessions);
    setCurrentSessionId(parsedSessions[0].id);
    setMessages(parsedSessions[0].messages);
    setSelectedModel(parsedSessions[0].model || "");
    setEnableDeepThinking(false);
  }, [authUuidReady, sessionStorageKey]);

  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      const nextModel = models[0].value;
      setSelectedModel(nextModel);
      if (currentSessionId) {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId && !s.model
              ? { ...s, model: nextModel }
              : s,
          ),
        );
      }
    }
  }, [models, selectedModel, currentSessionId]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Save sessions to local storage whenever they change
  useEffect(() => {
    if (!authUuidReady) return;
    if (sessions.length > 0) {
      localStorage.setItem(sessionStorageKey, JSON.stringify(sessions));
    }
  }, [authUuidReady, sessionStorageKey, sessions]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      timestamp: Date.now(),
      model: models[0]?.value || "",
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
    setSelectedModel(models[0]?.value || "");
    setEnableDeepThinking(false);
  };

  const loadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setSelectedModel(session.model || models[0]?.value || "");
    setEnableDeepThinking(false);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSessions = sessions.filter((s) => s.id !== id);
    setSessions(newSessions);
    if (authUuidReady) {
      localStorage.setItem(sessionStorageKey, JSON.stringify(newSessions));
    }

    if (currentSessionId === id) {
      if (newSessions.length > 0) {
        loadSession(newSessions[0]);
      } else {
        createNewSession();
      }
    }
  };

  const updateCurrentSession = (
    newMessages: typeof messages,
    title?: string,
  ) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: newMessages,
            title: title || s.title,
            timestamp: Date.now(),
            model: selectedModel,
          };
        }
        return s;
      }),
    );
  };

  const currentModelConfig = models.find((m) => m.value === selectedModel);
  const canDeepThink = !!currentModelConfig?.deepThinkingModel;

  // Reset deep thinking toggle when model changes if not supported
  useEffect(() => {
    if (!canDeepThink) {
      setEnableDeepThinking(false);
    }
  }, [selectedModel, canDeepThink]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleVerify = useCallback(async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      message.error("请先登录主站账号后再使用 LLM");
      setIsVerified(false);
      setQuotaSnapshot(null);
      return;
    }

    const currentAuthUuid = getAuthUuidFromToken(authToken);
    if (!currentAuthUuid) {
      message.error("登录信息无效，请重新登录后再使用 LLM");
      setIsVerified(false);
      setQuotaSnapshot(null);
      return;
    }

    setAuthUuid(currentAuthUuid);

    setVerifying(true);
    try {
      const data = await fetchLlmStatus(authToken);
      setIsVerified(true);
      setQuotaSnapshot({
        totalTokensUsed: data?.quota?.totalTokensUsed || 0,
        tokenLimit: data?.quota?.tokenLimit || 0,
      });

      message.success("认证成功");
    } catch (error: any) {
      setIsVerified(false);
      setQuotaSnapshot(null);
      message.error(error.message);
    } finally {
      setVerifying(false);
    }
  }, []);

  useEffect(() => {
    if (!isVerified && !verifying && !autoVerifyRef.current) {
      autoVerifyRef.current = true;
      handleVerify();
    }
  }, [isVerified, verifying, handleVerify]);

  const handleResetKey = () => {
    setIsVerified(false);
    setQuotaSnapshot(null);
    autoVerifyRef.current = false;
    message.info("认证状态已重置");
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const authToken = localStorage.getItem("token");
    if (!authToken) {
      setIsVerified(false);
      setQuotaSnapshot(null);
      message.error("请先登录主站账号后再使用 LLM");
      return;
    }

    const userMessage = { role: "user", content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    // Update session immediately with user message
    // Generate title if it's the first message
    let newTitle = undefined;
    if (messages.length === 0) {
      newTitle =
        inputValue.slice(0, 30) + (inputValue.length > 30 ? "..." : "");
    }
    updateCurrentSession(newMessages, newTitle);

    // Create new AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    let currentText = "";
    let currentReasoning = "";
    // Remove the placeholder
    const messagesWithPlaceholderRemoved = newMessages;

    try {
      // Add a placeholder for the assistant response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", reasoning: "" },
      ]);

      // If deep thinking is enabled in DB (deepThinkingModel === 'enabled'),
      // we just use the model value itself, and the backend will handle the enable_thinking flag.
      // If deepThinkingModel is a specific model name (e.g. 'deepseek-reasoner'), we switch to that model.
      let modelToUse = selectedModel;
      if (enableDeepThinking && currentModelConfig?.deepThinkingModel) {
        if (currentModelConfig.deepThinkingModel !== "enabled") {
          modelToUse = currentModelConfig.deepThinkingModel;
        }
      }

      const response = await fetch(`${getApiBaseUrl()}/llm/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          messages: newMessages,
          model: modelToUse,
        }),
        signal: controller.signal,
      });

      if (response.status === 401) {
        handleResetKey();
        throw new Error("登录状态失效，请重新登录后再试。");
      }

      if (response.status === 402) {
        throw new Error("Token quota exceeded.");
      }

      if (response.status === 403) {
        throw new Error("当前账号没有 LLM 使用权限。");
      }

      if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment.");
      }

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) currentText += parsed.content;
              if (parsed.reasoning) currentReasoning += parsed.reasoning;

              // Update state
              setMessages([
                ...messagesWithPlaceholderRemoved,
                {
                  role: "assistant",
                  content: currentText,
                  reasoning: currentReasoning,
                },
              ]);
            } catch (e) {
              console.error("Error parsing SSE data", e);
            }
          }
        }
      }

      // Final update to session
      updateCurrentSession([
        ...messagesWithPlaceholderRemoved,
        {
          role: "assistant",
          content: currentText,
          reasoning: currentReasoning,
        },
      ]);

      try {
        const data = await fetchLlmStatus(authToken);
        setQuotaSnapshot({
          totalTokensUsed: data?.quota?.totalTokensUsed || 0,
          tokenLimit: data?.quota?.tokenLimit || 0,
        });
      } catch (e) {
        console.warn("Failed to refresh LLM quota:", e);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Generation stopped by user");
        // Save the partial response
        updateCurrentSession([
          ...messagesWithPlaceholderRemoved,
          {
            role: "assistant",
            content: currentText,
            reasoning: currentReasoning,
          },
        ]);
      } else {
        console.error(error);
        message.error("Failed to send message: " + error.message);
        // Remove the placeholder if error
        setMessages(newMessages);
        updateCurrentSession(newMessages);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  if (!isVerified) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: mode === "dark" ? "#000" : "#f0f2f5",
        }}
      >
        <Card title="正在认证" style={{ width: 420 }}>
          <p style={{ marginBottom: 12 }}>
            正在使用当前登录身份接入 LLM 服务...
          </p>
          <Button
            type="primary"
            block
            onClick={handleVerify}
            loading={verifying}
          >
            重新认证
          </Button>
        </Card>
      </Layout>
    );
  }

  const usage = quotaSnapshot?.totalTokensUsed || 0;
  const limit = quotaSnapshot?.tokenLimit || 0;
  const displayLimit = limit > 0 ? limit : 5000000;
  const percent = Math.min(100, Math.round((usage / displayLimit) * 100));

  return (
    <PageLayout mode={mode}>
      <Sidebar width={260} mode={mode}>
        <SidebarHeader>
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={createNewSession}
            style={{
              borderColor: mode === "dark" ? "#444" : "#d9d9d9",
              color: mode === "dark" ? "#ececf1" : "rgba(0, 0, 0, 0.88)",
            }}
          >
            New Chat
          </Button>
        </SidebarHeader>
        <SessionList>
          {sessions.map((session) => (
            <SessionItem
              key={session.id}
              active={session.id === currentSessionId}
              mode={mode}
              onClick={() => loadSession(session)}
            >
              <MessageOutlined style={{ fontSize: "14px" }} />
              <div className="title">{session.title}</div>
              <DeleteOutlined
                className="delete-btn"
                onClick={(e) => deleteSession(e, session.id)}
              />
            </SessionItem>
          ))}
        </SessionList>
      </Sidebar>
      <MainContent mode={mode}>
        <Modal
          title="用户指南"
          open={isModalOpen}
          onOk={() => {
            if (dontShowAgain) {
              localStorage.setItem("llm_usage_instructions_hidden", "true");
            }
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button
              key="ok"
              type="primary"
              onClick={() => {
                if (dontShowAgain) {
                  localStorage.setItem("llm_usage_instructions_hidden", "true");
                }
                setIsModalOpen(false);
              }}
            >
              Got it
            </Button>,
          ]}
        >
          <p>欢迎来到 EESAST 大模型平台</p>
          <p>请仔细阅读下面的使用说明：</p>
          <ul>
            <li>对话记录存储在本地，无法跨设备同步。</li>
            <li>LLM 服务会直接使用当前主站登录身份进行认证。</li>
            <li>每个用户初始有50M token的使用额度，请勿滥用。</li>
            <li>如果遇到问题或者需要扩容，请联系管理员。</li>
          </ul>
          <div style={{ marginTop: 16 }}>
            <Checkbox
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            >
              Don't show again
            </Checkbox>
          </div>
        </Modal>
        <HeaderContainer mode={mode}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Title
              level={4}
              style={{
                margin: 0,
                color: mode === "dark" ? "#ececf1" : "#202123",
              }}
            >
              EESAST AI
            </Title>
            <Select
              value={selectedModel}
              onChange={(val) => {
                setSelectedModel(val);
                // Update session model
                setSessions((prev) =>
                  prev.map((s) =>
                    s.id === currentSessionId ? { ...s, model: val } : s,
                  ),
                );
              }}
              options={models}
              style={{
                width: 180,
                boxShadow:
                  mode === "dark"
                    ? "0 2px 8px rgba(0,0,0,0.5)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
              }}
              bordered={false}
            />
          </div>
          {authUuid && (
            <div
              style={{
                flex: 1,
                maxWidth: 200,
                margin: "0 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Tooltip title={`Usage: ${usage} / ${displayLimit} tokens`}>
                <div style={{ flex: 1 }}>
                  <Progress
                    percent={percent}
                    size="small"
                    showInfo={false}
                    strokeColor={percent > 90 ? "#ff4d4f" : "#1890ff"}
                    trailColor={mode === "dark" ? "#424242" : "#f5f5f5"}
                  />
                </div>
              </Tooltip>
              <ThunderboltOutlined
                style={{ color: percent > 90 ? "#ff4d4f" : "#faad14" }}
              />
            </div>
          )}
          <Tooltip title="重新检查认证状态">
            <Button
              icon={<KeyOutlined />}
              onClick={handleVerify}
              loading={verifying}
              style={{
                color: mode === "dark" ? "#ececf1" : "#374151",
                borderColor: mode === "dark" ? "#424242" : "#d9d9d9",
                backgroundColor: mode === "dark" ? "transparent" : "#fff",
              }}
            >
              刷新认证
            </Button>
          </Tooltip>
        </HeaderContainer>

        <ScrollArea>
          {messages.length === 0 && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.5,
              }}
            >
              <RobotOutlined
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                  color: mode === "dark" ? "#fff" : "#000",
                }}
              />
              <Title
                level={4}
                style={{ color: mode === "dark" ? "#fff" : "#000" }}
              >
                How can I help you today?
              </Title>
            </div>
          )}

          {messages.map((msg, index) => (
            <MessageRow key={index} role={msg.role}>
              <Avatar
                icon={
                  msg.role === "user" ? <UserOutlined /> : <RobotOutlined />
                }
                style={{
                  backgroundColor: msg.role === "user" ? "#1890ff" : "#19c37d",
                  flexShrink: 0,
                }}
              />
              <MessageContent role={msg.role} mode={mode}>
                <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {msg.role === "user" ? "You" : "Assistant"}
                </div>
                {msg.reasoning && (
                  <ReasoningBlock mode={mode}>
                    <details>
                      <summary>
                        <BulbOutlined /> 深度思考过程
                      </summary>
                      <div style={{ marginTop: "8px", whiteSpace: "pre-wrap" }}>
                        {msg.reasoning}
                      </div>
                    </details>
                  </ReasoningBlock>
                )}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {preprocessLaTeX(msg.content)}
                </ReactMarkdown>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 4,
                  }}
                >
                  <CopyButton content={msg.content} mode={mode} />
                </div>
              </MessageContent>
            </MessageRow>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <InputContainer mode={mode}>
          <InputWrapper mode={mode}>
            {canDeepThink && (
              <Tooltip
                title={
                  enableDeepThinking ? "深度思考已开启" : "开启深度思考 (R1)"
                }
              >
                <DeepThinkButton
                  active={enableDeepThinking}
                  mode={mode}
                  onClick={() => setEnableDeepThinking(!enableDeepThinking)}
                >
                  <BulbOutlined />
                  <span>深度思考</span>
                </DeepThinkButton>
              </Tooltip>
            )}
            <StyledTextArea
              mode={mode}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message EESAST AI..."
              autoSize={{ minRows: 1, maxRows: 6 }}
              disabled={loading}
            />
            <SendButton
              type="primary"
              onClick={loading ? handleStop : handleSend}
              disabled={!loading && !inputValue.trim()}
              icon={loading ? <StopOutlined /> : <SendOutlined />}
            />
          </InputWrapper>
          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              color: mode === "dark" ? "#666" : "#999",
              marginTop: 8,
            }}
          >
            AI can make mistakes. Consider checking important information.
          </div>
        </InputContainer>
      </MainContent>
    </PageLayout>
  );
};
export default LLMChatPage;
