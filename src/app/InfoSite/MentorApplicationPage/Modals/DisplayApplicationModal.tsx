import { Modal, Descriptions } from "antd";
import { IApplication } from "../Interface";

interface DisplayApplicationProps {
  visible: boolean; // 是否显示
  setVisible: React.Dispatch<React.SetStateAction<boolean>>; // 设置是否显示
  appl: IApplication; // 该导师被申请的信息
}

const DisplayApplicationModal: React.FC<DisplayApplicationProps> = ({
  visible,
  setVisible,
  appl,
}) => {
  return (
    <Modal
      open={visible}
      title={
        appl.stu?.name
          ? `${appl.stu.name}的联系方式`
          : "学生信息未记录于数据库中"
      }
      centered
      destroyOnClose
      onCancel={() => {
        setVisible(false);
      }}
      footer={null}
      width="60%"
    >
      <Descriptions column={2}>
        <Descriptions.Item label="姓名">
          {appl.stu?.name ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item label="学号">
          {appl.stu?.stid ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item label="邮箱">
          {appl.stu?.mail ?? "暂无记录"}
        </Descriptions.Item>
        <Descriptions.Item label="手机">
          {appl.stu?.phon ?? "暂无记录"}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default DisplayApplicationModal;
