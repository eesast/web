import { Button, Form, Input, message } from "antd";
import Center from "../../Components/Center";
import { UserOutlined } from "@ant-design/icons";
import { IValidateRealTime } from "./ValidateRealTime";
import { IValidateOnSubmit } from "./ValidateOnSubmit";

/*
  参数
  1. 标题 title
  2. 输入提示词 info
  3. 实时检查函数，如验证格式是否正确 validateRealTime  返回布尔值、错误信息
  4. 仅在提交时检查函数，如验证是否重复注册 validateOnSubmit  参数、返回值同上
  5. 捎带填写内容的函数 setter
  6. 点击返回按钮的函数 onBack
  7. 自动填充类型 autoComp，可以是 email 或 tel
*/

// function partial<T extends (...args: any[]) => any>(
//   fn: T,
//   ...presetArgs: Parameters<T>
// ): (...remainingArgs: Parameters<T>) => ReturnType<T> {
//   return (...remainingArgs: Parameters<T>) => fn(...presetArgs, ...remainingArgs);
// }

interface ContactProps {
  title: string;
  info: string;
  validRealTime?: IValidateRealTime;
  validOnSubmit?: IValidateOnSubmit;
  setter: React.Dispatch<React.SetStateAction<string>>;
  onBack?: () => void;
  autoComp?: "email" | "tel";
}

const Contact: React.FC<ContactProps> = ({
  title,
  info,
  validRealTime,
  validOnSubmit,
  setter,
  onBack = () => {},
  autoComp,
}) => {
  const handleFinish = async (values: any) => {
    try {
      if (!validOnSubmit) {
        setter(values.user);
      } else {
        const [valid, msg] = await validOnSubmit(values.user);
        if (valid) {
          setter(values.user);
        } else {
          message.error(msg);
        }
      }
    } catch (e) {
      message.error("Unknown error");
      console.log(e);
    }
    return;
  };

  return (
    <Form onFinish={handleFinish}>
      <Center>
        <h1
          css={`
            margin-top: 48px;
            margin-bottom: 48px;
            font-size: 28px;
            font-weight: 600;
          `}
        >
          {title}
        </h1>
      </Center>
      <Form.Item
        name="user"
        rules={[
          // { required: true, message: `请填写${info}` },
          () => ({
            validator(rule, value) {
              if (!validRealTime) {
                return Promise.resolve();
              } else {
                const [valid, msg] = validRealTime(value);
                if (valid) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(msg);
                }
              }
            },
          }),
        ]}
        css={`
          margin-bottom: 48px;
        `}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={info}
          autoComplete={autoComp}
          spellCheck={false}
          autoFocus
        />
      </Form.Item>
      <Center>
        <Button onClick={onBack}>返回</Button>
        <Button
          type="primary"
          htmlType="submit"
          css={`
            margin-left: 16px;
          `}
        >
          下一步
        </Button>
      </Center>
    </Form>
  );
};

export default Contact;
