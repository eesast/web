import { Col, Card, Row, Switch } from "antd";
import { IFreshman } from "../Interface";
import { PageProps } from "../../..";

interface StudentInfoProps extends PageProps {
  freshmen: IFreshman[];
}

const StudentInfoCard: React.FC<StudentInfoProps> = ({ freshmen, user }) => {
  return (
    <Card>
      <Row align={"middle"}>
        <Col style={{ width: "20%" }}>
          <Switch
            checkedChildren="参与积极分子谈话"
            unCheckedChildren="不参与积极分子谈话"
            checked={
              freshmen.find((i) => i.uuid === user.uuid)?.is_mem ?? false
            }
            disabled={true} // Disable this switch for now
          />
        </Col>
      </Row>
    </Card>
  );
};

export default StudentInfoCard;
