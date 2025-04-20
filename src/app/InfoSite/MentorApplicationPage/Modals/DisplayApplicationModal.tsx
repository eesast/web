import { Modal, Descriptions, Typography } from "antd";
import { IApplication } from "../Interface";

const { Paragraph } = Typography;

interface DisplayApplicationProps {
  visible: boolean; // 是否显示
  setVisible: React.Dispatch<React.SetStateAction<boolean>>; // 设置是否显示
  appl: IApplication; // 该导师被申请的信息
  detail: boolean; // 是否显示详细信息
}

const DisplayApplicationModal: React.FC<DisplayApplicationProps> = ({
  visible,
  setVisible,
  appl,
  detail,
}) => {
  return (
    <Modal
      open={visible}
      title={
        detail
          ? `申请详情`
          : appl.stu?.name
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
      {detail ? (
        <Descriptions column={2}>
          <Descriptions.Item label="学生姓名">
            {appl.stu?.name ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="学生学号">
            {appl.stu?.stid ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="学生院系">
            {appl.stu?.dept ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="学生班级">
            {appl.stu?.clss ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="学生邮箱">
            {appl.stu?.mail ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="学生手机">
            {appl.stu?.phon ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="导师姓名">
            {appl.men?.name ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="导师院系">
            {appl.men?.dept ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="导师邮箱">
            {appl.men?.mail ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="导师电话">
            {appl.men?.phon ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="谈话时间" span={2}>
            {appl.chat_t ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="申请陈述" span={2}>
            <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "展开" }}>
              {appl.stmt}
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Descriptions column={2}>
          <Descriptions.Item label="姓名">
            {appl.stu?.name ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="学号">
            {appl.stu?.stid ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="院系">
            {appl.stu?.dept ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="班级">
            {appl.stu?.clss ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {appl.stu?.mail ?? "暂无记录"}
          </Descriptions.Item>
          <Descriptions.Item label="电话">
            {appl.stu?.phon ?? "暂无记录"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default DisplayApplicationModal;
