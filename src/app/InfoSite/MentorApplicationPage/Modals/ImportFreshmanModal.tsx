import { Modal, Typography, Progress, message } from "antd";
import { useState } from "react";
import axios from "axios";

interface ImportFreshmanProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => Promise<void>;
}

const ImportFreshmanModal: React.FC<ImportFreshmanProps> = ({
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
      const studentInfos = (
        Xlsx.utils.sheet_to_json(firstWorksheet, {
          header: 1,
        }) as (string | number)[][]
      ).filter((i) => i.length !== 0);
      const head = studentInfos.shift();
      if (!head || head.length < 2) {
        throw new Error("Parse error");
      }

      let count = 0;
      await Promise.all(
        studentInfos.map(async (info) => {
          try {
            const stid = info[0].toString();
            const name = info[1].toString();

            const res = await axios.put(`/application/info/mentor/freshman`, {
              stid: stid,
              name: name,
            });
            if (res.status !== 200) {
              throw new Error();
            }

            count++;
            setProgress(Math.round((count / studentInfos.length) * 100));
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
      title="导入新生信息"
      centered
      onOk={handler}
      onCancel={() => setVisible(false)}
      maskClosable={false}
      confirmLoading={loading}
      okText="导入"
    >
      <Typography.Paragraph>
        上传 Excel 文件以更新申请状态。Excel 的格式应为：学号、姓名
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

export default ImportFreshmanModal;
