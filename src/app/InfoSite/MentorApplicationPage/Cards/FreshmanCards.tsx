import { Col, Card, Row, Typography, Table } from "antd";
import { IApplication, IFreshman } from "../Interface";
import { useEffect, useState } from "react";

interface FreshmanProps {
  freshmen: IFreshman[];
  applications: IApplication[];
}

const FreshmanCards: React.FC<FreshmanProps> = ({ freshmen, applications }) => {
  const [unmatchedFreshmen, setUnmatchedFreshmen] = useState<IFreshman[]>([]); // 已注册但未匹配学生
  const [unregisteredFreshmen, setUnregisteredFreshmen] = useState<IFreshman[]>(
    [],
  ); // 未注册学生

  useEffect(() => {
    setUnmatchedFreshmen(
      freshmen.filter(
        (freshman) =>
          freshman.uuid &&
          !applications.some(
            (application) => application.stu?.uuid === freshman.uuid,
          ),
      ),
    );
  }, [freshmen, applications]);

  useEffect(() => {
    setUnregisteredFreshmen(freshmen.filter((freshman) => !freshman.uuid));
  }, [freshmen]);

  return (
    <Row>
      <Col style={{ width: "47.5%" }}>
        <Card hoverable>
          <Typography.Title level={2} style={{ margin: "8px 8px 0 8px" }}>
            未匹配学生
          </Typography.Title>
          <Table
            style={{ margin: "16px 8px 0 8px" }}
            dataSource={unmatchedFreshmen}
            columns={[
              { title: "学号", dataIndex: "stid", key: "stid" },
              { title: "姓名", dataIndex: "name", key: "name" },
            ]}
          />
        </Card>
      </Col>

      <Col style={{ width: "47.5%", marginLeft: "5%" }}>
        <Card hoverable>
          <Typography.Title level={2} style={{ margin: "8px 8px 0 8px" }}>
            未注册学生
          </Typography.Title>
          <Table
            style={{ margin: "16px 8px 0 8px" }}
            dataSource={unregisteredFreshmen}
            columns={[
              { title: "学号", dataIndex: "stid", key: "stid" },
              { title: "姓名", dataIndex: "name", key: "name" },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default FreshmanCards;
