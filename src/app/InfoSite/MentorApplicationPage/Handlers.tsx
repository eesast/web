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
      i.year,
      i.stu?.stid,
      i.stu?.name,
      i.stu?.dept,
      i.stu?.clss,
      i.men?.name,
      i.men?.dept,
      i.is_mem ? "是" : "否",
      getStatusText(i.status),
      i.chat ? "是" : "否",
      i.chat2 ? "是" : "否",
      i.chat_t ? dayjs(i.chat_t).format("YYYY-MM-DD HH:mm:ss") : "无",
      i.mem_chat ? "是" : "否",
      i.mem_chat2 ? "是" : "否",
      i.mem_chat_t ? dayjs(i.mem_chat_t).format("YYYY-MM-DD HH:mm:ss") : "无",
      i.stmt,
    ]);
    const head = [
      "学生学号",
      "学生姓名",
      "学生院系",
      "学生班级",
      "导师姓名",
      "导师院系",
      "积极分子",
      "申请状态",
      "提交谈话记录",
      "确认谈话记录",
      "谈话时间",
      "提交积极分子谈话记录",
      "确认积极分子谈话记录",
      "积极分子谈话时间",
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
    if (result.statusCode !== 200) {
      throw new Error();
    }
    const res = await axios.post(`/application/info/mentor/chat`, {
      id: id,
    });
    if (res.status !== 200) {
      throw new Error();
    }
    await callback();
    message.success("上传成功");
  } catch (err) {
    message.error("上传失败");
  }
};

export const uploadMemberChatRecordHandler = async (
  e: RcCustomRequestOptions,
  id: string,
  callback: () => Promise<void>,
) => {
  try {
    const url = `chat_record/${id}/member/${(e.file as RcFile).name}`;
    const result = await uploadFile(e.file, url);
    if (result.statusCode !== 200) {
      throw new Error();
    }
    const res = await axios.post(`/application/info/mentor/member_chat`, {
      id: id,
    });
    if (res.status !== 200) {
      throw new Error();
    }
    await callback();
    message.success("上传成功");
  } catch (err) {
    message.error("上传失败");
  }
};

export const downloadChatRecordHandler = async (id: any) => {
  try {
    const files = await listFile(`chat_record/${id}/`);
    const url = files
      .filter((item) => !item.Key.includes("/member/"))
      .reduce((max, item) =>
        new Date(item.LastModified) > new Date(max.LastModified) ? item : max,
      ).Key;
    message.info("开始下载");
    downloadFile(url).catch((e) => message.error("下载失败：" + e));
  } catch (err) {
    console.error(err);
    message.error(`下载失败`);
  }
};

export const downloadMemberChatRecordHandler = async (id: any) => {
  try {
    const files = await listFile(`chat_record/${id}/member/`);
    const url = files
      .filter((item) => item.Key.includes("/member/"))
      .reduce((max, item) =>
        new Date(item.LastModified) > new Date(max.LastModified) ? item : max,
      ).Key;
    message.info("开始下载");
    downloadFile(url).catch((e) => message.error("下载失败：" + e));
  } catch (err) {
    console.error(err);
    message.error(`下载失败`);
  }
};
