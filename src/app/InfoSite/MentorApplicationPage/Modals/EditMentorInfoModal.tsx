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

      const achv = values.achv ?? "";
      const bgnd = values.bgnd ?? "";
      const flds = values.flds ?? "";
      const intr = values.intr ?? "";

      if (
        achv.length === 0 &&
        bgnd.length === 0 &&
        flds.length === 0 &&
        intr.length === 0
      ) {
        message.error("介绍不能为空");
        return;
      }

      const res = await axios.post(`/application/info/mentor/intro`, {
        achv: achv,
        bgnd: bgnd,
        flds: flds,
        intr: intr,
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
      </Form>
    </Modal>
  );
};

export default EditMentorInfoModal;
