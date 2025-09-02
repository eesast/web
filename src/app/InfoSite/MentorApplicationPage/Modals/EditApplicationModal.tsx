import { Modal, Form, message, Input, Radio } from "antd";
import { IApplication, IFreshman, IMentor } from "../Interface";
import { FormInstance } from "antd/lib";
import axios from "axios";
import { useEffect, useState } from "react";
import { PageProps } from "../../..";

interface EditApplicationProps extends PageProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cur_appls: IApplication[];
  mentor: IMentor;
  freshmen: IFreshman[];
  form: FormInstance;
  callback: () => Promise<void>;
}

const EditApplicationModal: React.FC<EditApplicationProps> = ({
  visible,
  setVisible,
  cur_appls,
  mentor,
  freshmen,
  form,
  callback,
  user,
}) => {
  const [newAppl, setNewAppl] = useState(false);

  useEffect(() => {
    setNewAppl(
      cur_appls.filter((i) => i.men?.uuid === mentor.uuid).length === 0,
    );
  }, [cur_appls, mentor.uuid]);

  const handler = async () => {
    try {
      const values = await form.validateFields().catch(() => {
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
        if (values.is_mem === undefined) {
          message.error("请选择是否为积极分子");
          return;
        }
        const res = await axios.put(`/application/info/mentor/application`, {
          mentor_uuid: mentor.uuid,
          statement: values.stmt,
          is_member: values.is_mem,
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
      title={newAppl ? "新申请" : "编辑申请"}
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
        {newAppl &&
          (mentor.is_mem &&
          freshmen.find((i) => i.uuid === user.uuid)?.is_mem ? (
            <Form.Item
              name={["is_mem"]}
              label="积极分子"
              rules={[{ required: true, message: "请选择是否为积极分子" }]}
            >
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          ) : (
            // <Form.Item name={["is_mem"]} label="积极分子" initialValue={true}>
            //   <Radio.Group>
            //     <Radio value={true}>是</Radio>
            //   </Radio.Group>
            // </Form.Item>
            <Form.Item name={["is_mem"]} label="积极分子" initialValue={false}>
              <Radio.Group>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          ))}
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
