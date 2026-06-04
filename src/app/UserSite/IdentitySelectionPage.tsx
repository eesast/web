import { FC } from "react";
import { Card, Tooltip, Button } from "antd";
import { QuestionCircleOutlined, LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import Background from "./Components/Background";

interface RegisterContext {
  setIdentity: (identity: string) => void;
  imageIndex: number;
  mode: string;
}

const StyledContainer = styled.div<{ mode?: string }>`
  padding: 24px;
  min-height: 100vh;
  color: ${({ mode }) => (mode === "dark" ? "#ffffffff" : "inherit")};
`;

const StyledCard = styled(Card)<{ mode?: string }>`
  text-align: center;
  border-radius: 16px;
  height: 70px;
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  overflow: hidden;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    background-color 150ms ease;
  backdrop-filter: blur(36px);
  background-color: ${(props) =>
  props.mode === "light"
    ? `rgba(255, 254, 254, 0.5) `
    : `rgba(30, 29, 29, 0.5) `};
  background-size: cover;
  background-position: center;
  border: none;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: ${({ mode }) =>
  mode === "dark"
    ? "0 6px 18px rgba(0, 0, 0, 0.6)"
    : "0 6px 18px rgba(0, 0, 0, 0.2)"};
    background-color: ${({ mode }) =>
  mode === "dark" ? "rgba(20, 19, 22, 0.85)" : "rgba(252, 252, 252, 0.85)"};
    transform: scale(1.03);
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

const IdentitySelectionPage: FC = () => {
  const context = useOutletContext<RegisterContext>();
  const { setIdentity, mode } = context;

  const navigate = useNavigate();

  const handleSelectIdentity = (identity: "teacher" | "student" | "guest") => {
    setIdentity(identity);
    navigate("../information", { state: { selectedIdentity: identity } });
  };

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
    <Background
      mode={mode}
      imageIndex={context.imageIndex}
      width={700}
      height={450}
      blur={36}
    >
      <StyledContainer mode={mode}>
        <Button
          type="link"
          icon={<LeftOutlined />}
          onClick={() => navigate("/")}
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
            justifyContent: "space-around",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <img
            src="./logo.png "
            alt="Logo"
            style={{
              width: "320px",
              height: "320px",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
              paddingBottom: "20px",
              flexShrink: 0,
            }}
          >
            {identities.map((identity) => (
              <div key={identity.key}>
                <StyledCard
                  mode={mode}
                  hoverable
                  onClick={() =>
                    handleSelectIdentity(
                      identity.key as "teacher" | "student" | "guest",
                    )
                  }
                >
                  <div
                    style={{
                      color: mode === "dark" ? "#ffffffff" : "inherit",
                      margin: 0,
                      fontSize: "18px",
                    }}
                  >
                    {identity.title}
                  </div>
                  <Tooltip title={identity.tooltip}>
                    <QuestionCircleOutlined
                      style={{
                        fontSize: "16px",
                        marginTop: "0",
                        color: mode === "dark" ? "#fff" : "inherit",
                      }}
                    />
                  </Tooltip>
                </StyledCard>
              </div>
            ))}
          </div>
        </div>
      </StyledContainer>
    </Background>
  );
};

export default IdentitySelectionPage;
