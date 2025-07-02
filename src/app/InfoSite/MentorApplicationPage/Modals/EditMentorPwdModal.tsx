import { Modal, Form, message, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { IMentor } from "../Interface";
import { FormInstance } from "antd/lib";
import axios from "axios";
import { validatePassword } from "../../../../api/utils/validator";

interface EditMentorPwdProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mentor: IMentor;
  form: FormInstance;
  callback: () => Promise<void>;
}

const EditMentorPwdModal: React.FC<EditMentorPwdProps> = ({
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

      const password = values.password;
      const confirm = values.confirm;

      if (password !== confirm) {
        message.error("两次输入的密码不一致");
        return;
      }
      if (!validatePassword(password)) {
        message.error("请输入长度至少为 8，需包含大小写字母及数字的密码");
        return;
      }

      const res = await axios.post(`/application/info/mentor/password`, {
        mentor_uuid: mentor.uuid,
        password: password,
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
      width="30%"
    >
      <Form form={form} layout="vertical" name="form">
        <Form.Item
          style={{ marginTop: 30 }}
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            () => ({
              validator(rule, value: string) {
                if (!value || validatePassword(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "请输入长度至少为 8，需包含大小写字母及数字的密码",
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="新密码"
            type="password"
            autoComplete="new-password"
            spellCheck={false}
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请确认密码" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("两次输入的密码不一致");
              },
            }),
          ]}
          css={`
            margin-bottom: 48px;
          `}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="确认密码"
            type="password"
            autoComplete="new-password"
            spellCheck={false}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMentorPwdModal;
