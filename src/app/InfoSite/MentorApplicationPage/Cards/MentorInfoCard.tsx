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

  return (
    <Card>
      <Row>
        <Col span={8}>
          <Switch
            checkedChildren="正在接收申请"
            unCheckedChildren="停止接收申请"
            checked={mentor.avail ?? false}
            onChange={availHandler}
          />
        </Col>
        <Col span={8}>
          <Typography.Text>申请人数上限： </Typography.Text>
          <InputNumber
            min={1}
            max={5}
            defaultValue={mentor.max_apl}
            onChange={(value) => maxAppHandler(value)}
          />
        </Col>
        <Col span={8}>
          <Button
            type="primary"
            onClick={async () => {
              setEditMentorInfoVisible(true);
              form.setFieldsValue({
                intr: mentor.intr ?? "",
                bgnd: mentor.bgnd ?? "",
                flds: mentor.flds ?? "",
                achv: mentor.achv ?? "",
              });
            }}
          >
            我的信息
          </Button>
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
