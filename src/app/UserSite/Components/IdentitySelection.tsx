import React from "react";
import { Card, Tooltip, Typography, Button, Row, Col } from "antd";
import { QuestionCircleOutlined, LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

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
`;

const StyledCard = styled(Card)<{ mode?: string }>`
  text-align: center;
  border-radius: 16px;
  //height: 500px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 24px;
  overflow: hidden;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    background-color 150ms ease;
  backdrop-filter: blur(36px);
  background-color: ${(props) =>
    props.mode === "light"
      ? `rgba(255, 255, 255, 0.6)`
      : `rgba(30, 29, 29, 0.6)`};
  background-size: cover;
  background-position: center;
  border: none;

  &:hover {
    box-shadow: ${({ mode }) =>
      mode === "dark"
        ? "0 6px 18px rgba(0, 0, 0, 0.6)"
        : "0 6px 18px rgba(0, 0, 0, 0.12)"};
    background-color: ${({ mode }) =>
      mode === "dark" ? "rgba(20, 19, 22, 0.7)" : "rgba(252, 252, 252, 0.7)"};
    transform: scale(1.03);
  }

  .ant-card-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
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
      title: "我是老师",
      image: "the-fool.jpeg",
      tooltip:
        "适用于清华大学教职工，需完成清华邮箱验证，注册后联系管理员验证教师身份。",
    },
    {
      key: "student",
      title: "我是学生",
      image: "the-sistine.jpg",
      tooltip: "适用于清华大学学生，需完成清华邮箱验证，自动完成注册。",
    },
    {
      key: "guest",
      title: "我是访客",
      image: "the-anonymous.png",
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
          marginBottom: "16px",
          color: mode === "dark" ? "#ffffffff" : "inherit",
        }}
      >
        返回
      </Button>
      <Row gutter={50} justify="center">
        {identities.map((identity) => (
          <Col span={8} key={identity.key} style={{ marginBottom: "16px" }}>
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
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: "30px",
                  marginTop: "30px",
                }}
              >
                <img
                  src={identity.image}
                  alt={identity.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Title
                level={3}
                style={{ color: mode === "dark" ? "#ffffffff" : "inherit" }}
              >
                {identity.title}
              </Title>
              <Tooltip title={identity.tooltip}>
                <QuestionCircleOutlined
                  style={{
                    fontSize: "20px",
                    marginTop: "110px",
                    color: mode === "dark" ? "#fff" : "inherit",
                  }}
                />
              </Tooltip>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </StyledContainer>
  );
};

export default IdentitySelection;
