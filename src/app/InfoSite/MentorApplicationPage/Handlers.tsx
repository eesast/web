import { getStatusText } from "../../../api/utils/application";
import { IApplication } from "./Interface";
import dayjs from "dayjs";
import { message } from "antd";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { RcFile } from "rc-upload/lib/interface";
import { uploadFile, downloadFile, listFile } from "../../../api/cos";
import axios from "axios";

export const exportApplicationHandler = async (
  applications: IApplication[],
  setExporting: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setExporting(true);
  try {
    const data = applications.map((i) => [
      i.stu?.stid,
      i.stu?.name,
      i.stu?.dept,
      i.stu?.clss,
      i.men?.name,
      i.men?.dept,
      getStatusText(i.status),
      i.stmt,
    ]);
    const head = [
      "学生学号",
      "学生姓名",
      "学生院系",
      "学生班级",
      "导师姓名",
      "导师院系",
      "申请状态",
      "申请陈述",
    ];
    data.unshift(head);
    const Xlsx = await import("xlsx");
    const worksheet = Xlsx.utils.aoa_to_sheet(data);
    const workbook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(workbook, worksheet, "新生导师");
    const current_time = dayjs().format("YYYY:MM:DD-HH:mm:ss");
    Xlsx.writeFile(workbook, `新生导师申请记录-${current_time}.xlsx`);
    message.success("申请导出成功");
  } catch {
    message.error("申请导出失败");
  } finally {
    setExporting(false);
  }
};

export const uploadChatRecordHandler = async (
  e: RcCustomRequestOptions,
  id: string,
  callback: () => Promise<void>,
) => {
  try {
    const url = `chat_record/${id}/${(e.file as RcFile).name}`;
    const result = await uploadFile(e.file, url);
    const xhr = new XMLHttpRequest();
    e.onSuccess!(result, xhr);

    const res = await axios.post(`/application/info/mentor/chat`, {
      id: id,
    });
    if (res.status !== 200) {
      throw new Error();
    }
    await callback();
    message.success("上传成功");
  } catch (err) {
    e.onError!(new Error("上传失败"));
  }
};

export const downloadChatRecordHandler = async (id: any) => {
  try {
    const files = await listFile(`chat_record/${id}/`);
    const url = files.reduce((max, item) => {
      return new Date(item.LastModified) > new Date(max.LastModified)
        ? item
        : max;
    }).Key;
    message.info("开始下载");
    downloadFile(url).catch((e) => message.error("下载失败：" + e));
  } catch (err) {
    console.error(err);
    message.error(`下载失败`);
  }
};
