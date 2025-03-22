import { Modal, Form, message, Input } from "antd";
import { IApplication, IMentor } from "../Interface";
import { FormInstance } from "antd/lib";
import axios from "axios";

interface EditApplicationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cur_appls: IApplication[];
  mentor: IMentor;
  form: FormInstance;
  callback: () => Promise<void>;
}

const EditApplicationModal: React.FC<EditApplicationProps> = ({
  visible,
  setVisible,
  cur_appls,
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

      if (values.stmt.length === 0) {
        message.error("陈述不能为空");
        return;
      }

      const cur_appl = cur_appls.find((i) => i.men?.uuid === mentor.uuid);
      if (cur_appl) {
        if (cur_appl.status === "approved") {
          message.error("已通过的申请无法修改");
          return;
        }
        const res = await axios.post(`/application/info/mentor/application`, {
          id: cur_appl.id,
          statement: values.stmt,
        });
        if (res.status !== 200) {
          throw new Error();
        }
      } else {
        const res = await axios.put(`/application/info/mentor/application`, {
          mentor_uuid: mentor.uuid,
          statement: values.stmt,
        });
        if (res.status !== 200) {
          throw new Error();
        }
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
      title={
        cur_appls.filter((i) => i.men?.uuid === mentor.uuid).length > 0
          ? "编辑申请"
          : "新申请"
      }
      centered
      destroyOnClose
      okText="提交"
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
      onOk={handler}
      maskClosable={false}
    >
      <Form form={form} name="form" onFinish={handler}>
        <Form.Item name={["men", "name"]} label="导师姓名">
          <Input readOnly />
        </Form.Item>
        <Form.Item name={["men", "dept"]} label="导师院系">
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="stmt"
          label="申请陈述"
          rules={[{ required: true, message: "请输入申请陈述" }]}
        >
          <Input.TextArea
            style={{ resize: "none" }}
            autoSize={{ minRows: 5 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditApplicationModal;
