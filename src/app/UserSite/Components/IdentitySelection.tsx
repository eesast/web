import React from "react";
import { Card, Tooltip, Typography, Button, Row, Col } from "antd";
import { QuestionCircleOutlined, LeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface IdentitySelectionProps {
  onSelectIdentity: (identity: "teacher" | "student" | "guest") => void;
  onBack: () => void;
}

const IdentitySelection: React.FC<IdentitySelectionProps> = ({
  onSelectIdentity,
  onBack,
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
    <div style={{ padding: "24px" }}>
      <Button
        type="link"
        icon={<LeftOutlined />}
        onClick={onBack}
        style={{ marginBottom: "16px" }}
      >
        返回
      </Button>
      <Row gutter={50} justify="center">
        {identities.map((identity) => (
          <Col span={8} key={identity.key} style={{ marginBottom: "16px" }}>
            <Card
              hoverable
              onClick={() =>
                onSelectIdentity(
                  identity.key as "teacher" | "student" | "guest",
                )
              }
              style={{
                textAlign: "center",
                borderRadius: "16px",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "24px",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.55)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.7)";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.55)";
                e.currentTarget.style.transform = "scale(1)";
              }}
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
              <Title level={3}>{identity.title}</Title>
              <Tooltip title={identity.tooltip}>
                <QuestionCircleOutlined
                  style={{ fontSize: "20px", marginTop: "110px" }}
                />
              </Tooltip>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default IdentitySelection;
