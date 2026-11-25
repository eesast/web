import { Col, Card, Row, Switch, Space, Typography } from "antd";
import { IFreshman } from "../Interface";
import { PageProps } from "../../..";

interface StudentInfoProps extends PageProps {
  freshmen: IFreshman[];
}

const StudentInfoCard: React.FC<StudentInfoProps> = ({ freshmen, user }) => {
  return (
    <Card>
      <Row align={"middle"}>
        <Col xs={24}>
          <Space>
            <Switch
              checked={
                freshmen.find((i) => i.uuid === user.uuid)?.is_mem ?? false
              }
              disabled={true} // Disable this switch for now
            />
            <Typography.Text>
              {freshmen.find((i) => i.uuid === user.uuid)?.is_mem
                ? "参与积极分子谈话"
                : "不参与积极分子谈话"}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default StudentInfoCard;
