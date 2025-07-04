import {
  Col,
  Card,
  Row,
  Typography,
  Switch,
  InputNumber,
  Button,
  Form,
  message,
} from "antd";
import { IMentor } from "../Interface";
import EditMentorInfoModal from "../Modals/EditMentorInfoModal";
import { useState } from "react";
import axios from "axios";

interface MentorInfoProps {
  mentor: IMentor;
  callback: () => Promise<void>;
}

const MentorInfoCard: React.FC<MentorInfoProps> = ({ mentor, callback }) => {
  const [editMentorInfoVisible, setEditMentorInfoVisible] = useState(false);
  const [form] = Form.useForm();

  const availHandler = async () => {
    try {
      const res = await axios.post(`/application/info/mentor/avail`, {
        available: !mentor.avail,
      });
      if (res.status !== 200) {
        throw new Error();
      }
      await callback();
      message.info("更新成功");
    } catch (err) {
      message.error("更新失败");
    }
  };

  const maxAppHandler = async (value: number | null) => {
    if (value === null) return;
    try {
      const res = await axios.post(`/application/info/mentor/max_app`, {
        max_applicants: value,
      });
      if (res.status !== 200) {
        throw new Error();
      }
      await callback();
      message.info("更新成功");
    } catch (err) {
      message.error("更新失败");
    }
  };

  const memberHandler = async () => {
    try {
      const res = await axios.post(`/application/info/mentor/member`, {
        is_member: !mentor.is_mem,
      });
      if (res.status !== 200) {
        throw new Error();
      }
      await callback();
      message.info("更新成功");
    } catch (err) {
      message.error("更新失败");
    }
  };

  return (
    <Card>
      <Row align={"middle"}>
        <Col style={{ width: "20%" }}>
          <Switch
            checkedChildren="正在接收申请"
            unCheckedChildren="停止接收申请"
            checked={mentor.avail ?? false}
            onChange={availHandler}
          />
        </Col>
        <Col style={{ width: "30%" }}>
          <Typography.Text>申请人数上限： </Typography.Text>
          <InputNumber
            min={5}
            max={10}
            defaultValue={mentor.max_apl}
            onChange={(value) => maxAppHandler(value)}
          />
        </Col>
        <Col style={{ width: "20%" }}>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue(mentor);
              setEditMentorInfoVisible(true);
            }}
          >
            我的信息
          </Button>
        </Col>
        <Col style={{ width: "20%" }}>
          <Switch
            checkedChildren="参与积极分子谈话"
            unCheckedChildren="不参与积极分子谈话"
            checked={mentor.is_mem ?? false}
            onChange={memberHandler}
            disabled={true} // Disable this switch for now
          />
        </Col>
      </Row>
      <EditMentorInfoModal
        visible={editMentorInfoVisible}
        setVisible={setEditMentorInfoVisible}
        mentor={mentor}
        form={form}
        callback={callback}
      />
    </Card>
  );
};

export default MentorInfoCard;
