import { Modal, Descriptions } from "antd";
import { IMentor } from "../Interface";

interface DisplayMentorInfoProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mentor: IMentor;
}

const DisplayMentorInfoModal: React.FC<DisplayMentorInfoProps> = ({
  visible,
  setVisible,
  mentor,
}) => {
  return (
    <Modal
      open={visible}
      centered
      destroyOnClose
      onCancel={() => {
        setVisible(false);
      }}
      footer={null}
      width="60%"
    >
      {mentor.uuid && mentor.name ? (
        <Descriptions title={mentor.name} column={1}>
          <Descriptions.Item label="基本信息">
            {mentor.intr ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="教育背景">
            {mentor.bgnd ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="研究领域">
            {mentor.flds ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="学术成果">
            {mentor.achv ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="联系邮箱">
            {mentor.mail ?? "暂无记录"}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Descriptions title={"导师信息未记录于数据库中"}></Descriptions>
      )}
    </Modal>
  );
};

export default DisplayMentorInfoModal;
