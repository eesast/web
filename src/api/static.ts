import axios from "axios";
import { UploadFile } from "antd/lib/upload/interface";

// 队式类比赛的代码上传
export const uploadCode = async (teamId: number, code: UploadFile) => {
  let param = new FormData();
  param.append("name", code.name);
  param.append("file", code.originFileObj!);
  const config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  const response = await axios.post(`/static/code`, param, config);
  return response.data as string;
};
