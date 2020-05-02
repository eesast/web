import axios from "axios";
import { UploadFile } from "antd/lib/upload/interface";

export const uploadImage = async (img: UploadFile) => {
  let param = new FormData();
  param.append("name", img.name);
  param.append("file", img.originFileObj!);
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  const response = await axios.post(`/static/images`, param, config);
  return response.data as string;
};
