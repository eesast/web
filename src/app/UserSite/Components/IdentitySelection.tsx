import React from "react";
import { Card, Tooltip, Button } from "antd";
import { QuestionCircleOutlined, LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface IdentitySelectionProps {
  onSelectIdentity: (identity: "teacher" | "student" | "guest") => void;
  onBack: () => void;
  mode?: string;
}

// 仿照 Background 组件的样式定义方式
const StyledContainer = styled.div<{ mode?: string }>`
  padding: 24px;
  min-height: 100vh;
  color: ${({ mode }) => (mode === "dark" ? "#ffffffff" : "inherit")};

  .ant-btn {
    transition: color 0.2s;
    &:hover {
      color: #1677ff !important;
    }
  }
`;

const StyledCard = styled(Card)<{ mode?: string }>`
  text-align: center;
  border-radius: 16px;
  height: 70px;
  width: 220px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  overflow: hidden;
  transition:
    box-shadow 150ms ease,
    background-color 150ms ease;
  backdrop-filter: blur(36px);

  /* 背景渐变 */
  background: ${(props) =>
    props.mode === "light"
      ? `linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%)`
      : `linear-gradient(135deg, rgba(40, 40, 40, 0.6) 0%, rgba(20, 20, 20, 0.4) 100%)`};

  background-size: cover;
  background-position: center;

  /* 描边 */
  border: 1px solid
    ${({ mode }) =>
      mode === "dark"
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(136, 136, 136, 0.6)"};

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  /* 字体和图标颜色过渡 */
  .identity-title {
    color: ${({ mode }) => (mode === "dark" ? "#ffffffff" : "inherit")};
    transition: color 150ms ease;
  }

  .identity-icon {
    color: ${({ mode }) => (mode === "dark" ? "#fff" : "inherit")};
    transition: color 150ms ease;
  }

  &:hover {
    box-shadow: ${({ mode }) =>
      mode === "dark"
        ? "0 6px 18px rgba(0, 0, 0, 0.6)"
        : "0 6px 18px rgba(0, 0, 0, 0.2)"};

    /* Hover 时的背景渐变 */
    background: ${({ mode }) =>
      mode === "dark"
        ? "linear-gradient(135deg, rgba(43, 42, 42, 0.7) 0%, rgba(25, 24, 24, 0.5) 100%)"
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)"};

    /* 悬停时加深边框，保持原有色系 */
    border-color: ${({ mode }) =>
      mode === "dark"
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(136, 136, 136, 0.9)"};
  }

  .ant-card-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0;
    gap: 10px;
  }
`;

const IdentitySelection: React.FC<IdentitySelectionProps> = ({
  onSelectIdentity,
  onBack,
  mode = "dark",
}) => {
  const identities = [
    {
      key: "teacher",
      title: "我是教师",
      tooltip:
        "适用于清华大学教职工，需完成清华邮箱验证，注册后联系管理员验证教师身份。",
    },
    {
      key: "student",
      title: "我是学生",
      tooltip: "适用于清华大学学生，需完成清华邮箱验证，自动完成注册。",
    },
    {
      key: "guest",
      title: "我是访客",
      tooltip:
        "适用于非清华用户，无需验证清华邮箱，支持所有公开内容浏览，注册后可升级为学生或老师。",
    },
  ];

  return (
    <StyledContainer mode={mode}>
      <Button
        type="link"
        icon={<LeftOutlined />}
        onClick={onBack}
        style={{
          marginBottom: "0px",
          color: mode === "dark" ? "#ffffffff" : "inherit",
        }}
      >
        返回
      </Button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <img
          src="./logo.png "
          alt="Logo"
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            paddingBottom: "10px",
          }}
        >
          {identities.map((identity) => (
            <div key={identity.key}>
              <StyledCard
                mode={mode}
                hoverable
                onClick={() =>
                  onSelectIdentity(
                    identity.key as "teacher" | "student" | "guest",
                  )
                }
              >
                <div
                  className="identity-title"
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    //fontFamily: '"Georgia", "Times New Roman", "Songti SC", "SimSun", serif',
                  }}
                >
                  {identity.title}
                </div>
                <Tooltip title={identity.tooltip}>
                  <QuestionCircleOutlined
                    className="identity-icon"
                    style={{
                      fontSize: "16px",
                      marginTop: "0",
                    }}
                  />
                </Tooltip>
              </StyledCard>
            </div>
          ))}
        </div>
      </div>
    </StyledContainer>
  );
};

export default IdentitySelection;
