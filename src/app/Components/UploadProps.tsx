import { useEffect, useState } from "react";
import { UploadFile, UploadProps, message } from "antd";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { deleteFile, existFile, listFile, uploadFile } from "@/api/cos";

export const useUploadProps = (url: string, fetchFiles: boolean) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const fetchFileList = async (url: string) => {
    try {
      const result = await listFile(`${url}/`);
      setFileList(
        result.map((item) => ({
          uid: item.ETag,
          name: item.Key.split("/").pop() as string,
          status: "done",
          url: `${process.env.REACT_APP_STATIC_URL!}/${item.Key}`,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!fetchFiles) return;
    fetchFileList(url);
  }, [fetchFiles, url]);

  const handleUpload = async (e: RcCustomRequestOptions) => {
    const file = e.file as File;
    try {
      message.info(`正在上传 ${file.name}`);
      const existed = await existFile(`${url}/${file.name}`);
      if (existed) {
        message.warning(`${file.name} 已存在，正在覆盖`);
      }
      const result = await uploadFile(file, `${url}/${file.name}`);
      if (result.statusCode !== 200) throw new Error("上传失败");
      message.success(`${file.name} 上传成功`);
      setFileList([
        ...fileList,
        {
          uid: result.ETag,
          name: file.name,
          status: "done",
          url: `${process.env.REACT_APP_STATIC_URL!}/${url}/${file.name}`,
        },
      ]);
    } catch (err) {
      message.error(`${file.name} 上传失败`);
      if (uploadErrorCallback) uploadErrorCallback();
      console.log(err);
    } finally {
      if (fetchFiles) return await fetchFileList(url);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    try {
      const result = await deleteFile(`${url}/${file.name}`);
      if (result.statusCode !== 204) throw new Error("删除失败");
      message.success(`${file.name} 删除成功`);
      setFileList(fileList.filter((item) => item.uid !== file.uid));
    } catch (err) {
      message.error(`${file.name} 删除失败`);
      if (removeErrorCallback) removeErrorCallback();
      console.log(err);
    } finally {
      if (fetchFiles) return await fetchFileList(url);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    fileList: fileList,
    customRequest: handleUpload,
    onRemove: handleRemove,
  };
  return { uploadProps, setFileList };
};
