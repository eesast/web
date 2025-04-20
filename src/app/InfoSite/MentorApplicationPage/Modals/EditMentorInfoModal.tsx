import { Modal, Form, message, Input } from "antd";
import { IMentor } from "../Interface";
import { FormInstance } from "antd/lib";
import axios from "axios";

interface EditMentorInfoProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mentor: IMentor;
  form: FormInstance;
  callback: () => Promise<void>;
}

const EditMentorInfoModal: React.FC<EditMentorInfoProps> = ({
  visible,
  setVisible,
  mentor,
  form,
  callback,
}) => {
  const handler = async () => {
    try {
      const values = await form.validateFields().catch(() => {
        message.error(`表单验证失败`);
        throw new Error();
      });

      const achv = values.achv;
      const bgnd = values.bgnd;
      const flds = values.flds;
      const intr = values.intr;
      const dig_type = values.dig_type;

      const res = await axios.post(`/application/info/mentor/intro`, {
        mentor_uuid: mentor.uuid,
        achv: achv,
        bgnd: bgnd,
        flds: flds,
        intr: intr,
        dig_type: dig_type,
      });
      if (res.status !== 200) {
        throw new Error();
      }
      await callback();
      message.info(`更新成功`);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(`更新失败`);
    }
  };

  return (
    <Modal
      open={visible}
      centered
      destroyOnClose
      onCancel={() => {
        setVisible(false);
      }}
      okText="更新"
      cancelText="取消"
      onOk={handler}
      width="70%"
    >
      <Form
        form={form}
        layout="vertical"
        name="form"
        initialValues={{
          intr: mentor.intr ?? "",
          bgnd: mentor.bgnd ?? "",
          flds: mentor.flds ?? "",
          achv: mentor.achv ?? "",
        }}
      >
        <Form.Item
          name="intr"
          label="基本信息"
          rules={[{ required: true, message: "请输入导师的基本信息" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="bgnd" label="教育背景">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="flds" label="研究领域">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="achv" label="学术成果">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="dig_type" label="交流形式">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMentorInfoModal;
