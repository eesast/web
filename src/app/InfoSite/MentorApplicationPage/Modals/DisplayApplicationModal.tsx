import { Modal, Descriptions, Radio, message } from "antd";
import { IApplication } from "../Interface";
import dayjs from "dayjs";
import { RadioChangeEvent } from "antd/lib/radio";
import axios from "axios";

interface DisplayApplicationProps {
  visible: boolean; // 是否显示
  setVisible: React.Dispatch<React.SetStateAction<boolean>>; // 设置是否显示
  appl: IApplication; // 该导师被申请的信息
  callback: () => Promise<void>; // 更新申请状态的回调函数
}

const DisplayApplicationModal: React.FC<DisplayApplicationProps> = ({
  visible,
  setVisible,
  appl,
  callback,
}) => {
  const handler = async (e: RadioChangeEvent) => {
    try {
      const res = await axios.post(`/application/info/mentor/status`, {
        id: appl.id,
        status: e.target.value,
      });
      if (res.status !== 200) {
        throw new Error();
      }
      await callback();
      message.info("更新成功");
      setVisible(false);
    } catch (err) {
      message.error("更新失败");
    }
  };

  return (
    <Modal
      open={visible}
      title={
        appl.stu?.name ? `${appl.stu.name}的信息` : "学生信息未记录于数据库中"
      }
      centered
      destroyOnClose
      onCancel={() => {
        setVisible(false);
      }}
      footer={null}
      width="60%"
    >
      <Descriptions column={3}>
        <Descriptions.Item label="姓名">
          {appl.stu?.name ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item label="院系">
          {appl.stu?.dept ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item label="邮箱">
          {appl.stu?.mail ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item label="手机">
          {appl.stu?.phon ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item label="申请时间" span={2}>
          {dayjs(appl.created).format("YYYY-MM-DD HH:mm") ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item label="申请陈述" span={3}>
          {appl.stmt ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item span={3}>{""}</Descriptions.Item> 占位
        <Descriptions.Item span={1}>
          <Radio.Group
            disabled={!appl.id}
            value={appl.status}
            onChange={handler}
          >
            <Radio value="approved">接收</Radio>
            <Radio value="submitted">待处理</Radio>
            <Radio value="rejected">拒绝</Radio>
          </Radio.Group>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default DisplayApplicationModal;
