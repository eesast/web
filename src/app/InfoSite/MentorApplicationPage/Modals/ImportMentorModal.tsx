import { Modal, Typography, Progress, message } from "antd";
import { useState } from "react";
import axios from "axios";

interface ImportMentorProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => Promise<void>;
}

const ImportMentorModal: React.FC<ImportMentorProps> = ({
  visible,
  setVisible,
  loading,
  setLoading,
  callback,
}) => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [progress, setProgress] = useState(0);

  const handler = async () => {
    if (!fileList || fileList.length !== 1) {
      message.info("请选择文件");
      return;
    }
    const file = fileList[0];
    setLoading(true);
    try {
      const reader = new FileReader();
      const data = await new Promise<ArrayBuffer>((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject();
        };
        reader.onload = () => {
          resolve(reader.result as ArrayBuffer);
        };
        reader.readAsBinaryString(file);
      });
      const Xlsx = await import("xlsx");
      const workbook = Xlsx.read(data, { type: "binary" });
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const mentorInfos = (
        Xlsx.utils.sheet_to_json(firstWorksheet, {
          header: 1,
        }) as (string | number)[][]
      ).filter((i) => i.length !== 0);
      const head = mentorInfos.shift();
      if (!head || head.length < 5) {
        throw new Error("Parse error");
      }

      let count = 0;
      await Promise.all(
        mentorInfos.map(async (info) => {
          try {
            const name = info[0].toString();
            const intr = info[1].toString();
            const bgnd = info[2].toString();
            const flds = info[3].toString();
            const achv = info[4].toString();

            const res = await axios.put(`/application/info/mentor/intro`, {
              name: name,
              intr: intr,
              bgnd: bgnd,
              flds: flds,
              achv: achv,
            });
            if (res.status !== 200) {
              throw new Error();
            }

            count++;
            setProgress(Math.round((count / mentorInfos.length) * 100));
          } catch (err) {
            throw err;
          }
        }),
      );
      await callback();
      message.success("导入成功");
    } catch (err) {
      message.error("导入失败");
    } finally {
      setLoading(false);
      setVisible(false);
      setProgress(0);
      setFileList(null);
    }
  };

  return (
    <Modal
      open={visible}
      title="导入导师信息"
      centered
      onOk={handler}
      onCancel={() => setVisible(false)}
      maskClosable={false}
      confirmLoading={loading}
      okText="导入"
    >
      <Typography.Paragraph>
        上传 Excel 文件以更新申请状态。Excel
        的格式应为：导师姓名、简要信息、教育背景、研究领域、学术成果
      </Typography.Paragraph>
      <div
        css={`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <input
          id="upload-file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          name="file"
          onChange={(e) => setFileList(e.target.files)}
        />
        <label htmlFor="upload-file"></label>
        {progress > 0 && (
          <Progress type="circle" percent={progress} status="active" />
        )}
      </div>
    </Modal>
  );
};

export default ImportMentorModal;
