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
      "申请年份",
      "学生学号",
      "学生姓名",
      "学生院系",
      "学生班级",
      "导师姓名",
      "导师院系",
      "积极分子",
      "申请状态",
      "提交普通谈话记录(旧系统)",
      "确认普通谈话记录(旧系统)",
      "谈话时间(旧系统)",
      "提交积极分子谈话记录(旧系统)",
      "确认积极分子谈话记录(旧系统)",
      "积极分子谈话时间(旧系统)",
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

// ===== 普通谈话记录系统（基于 mentor_talk_record 表）=====
// 存储路径: chat_record/{user_uuid}/talk/{semester}/{filename}

export const uploadMentorTalkHandler = async (
  e: RcCustomRequestOptions,
  user_uuid: string,
  semester: string,
  callback: () => Promise<void>,
) => {
  try {
    const cosPath = `chat_record/${user_uuid}/talk/${semester}/${(e.file as RcFile).name}`;
    const result = await uploadFile(e.file, cosPath);
    if (result.statusCode !== 200) {
      throw new Error("COS upload failed");
    }
    const res = await axios.post(`/application/info/mentor/talk_submit`);
    if (res.status !== 200) {
      throw new Error("Backend submit failed");
    }
    e.onSuccess?.({});
    await callback();
    message.success("上传成功");
  } catch (err) {
    e.onError?.(err as Error);
    message.error("上传失败");
  }
};

export const downloadMentorTalkHandler = async (
  user_uuid: string,
  semester: string,
  applicationId?: string, // 可选：用于回退到旧系统路径
) => {
  try {
    // 优先尝试新系统路径 (按学期)
    const newPath = `chat_record/${user_uuid}/talk/${semester}/`;
    let files = await listFile(newPath);

    // 如果新路径没有文件且提供了 applicationId，尝试旧系统路径
    if ((!files || files.length === 0) && applicationId) {
      const oldPath = `chat_record/${applicationId}/`;
      const oldFiles = await listFile(oldPath);
      // 旧系统普通谈话：排除 /member/ 目录下的文件
      files = oldFiles?.filter((item) => !item.Key.includes("/member/"));
    }

    if (!files || files.length === 0) {
      message.warning("暂无文件");
      return;
    }
    const url = files.reduce((max, item) =>
      new Date(item.LastModified) > new Date(max.LastModified) ? item : max,
    ).Key;
    message.info("开始下载");
    downloadFile(url).catch((e) => message.error("下载失败：" + e));
  } catch (err) {
    console.error(err);
    message.error("下载失败");
  }
};

// ===== 新积极分子谈话记录系统（基于 member_chat_record 表）=====
// 存储路径: chat_record/{user_uuid}/member/{semester}/{filename}

export const uploadNewMemberChatHandler = async (
  e: RcCustomRequestOptions,
  user_uuid: string,
  semester: string,
  callback: () => Promise<void>,
) => {
  try {
    const cosPath = `chat_record/${user_uuid}/member/${semester}/${(e.file as RcFile).name}`;
    const result = await uploadFile(e.file, cosPath);
    if (result.statusCode !== 200) {
      throw new Error("COS upload failed");
    }
    // 通知后端创建/更新 member_chat_record 数据库记录
    const res = await axios.post(`/application/info/mentor/member_chat_submit`);
    if (res.status !== 200) {
      throw new Error("Backend submit failed");
    }
    e.onSuccess?.({});
    await callback();
    message.success("上传成功");
  } catch (err) {
    e.onError?.(err as Error);
    message.error("上传失败");
  }
};

export const downloadNewMemberChatHandler = async (
  user_uuid: string,
  semester: string,
  applicationId?: string, // 可选：用于回退到旧系统路径
) => {
  try {
    // 优先尝试新系统路径 (按学期)
    const newPath = `chat_record/${user_uuid}/member/${semester}/`;
    let files = await listFile(newPath);

    // 如果新路径没有文件且提供了 applicationId，尝试旧系统路径
    if ((!files || files.length === 0) && applicationId) {
      const oldPath = `chat_record/${applicationId}/member/`;
      files = await listFile(oldPath);
    }

    if (!files || files.length === 0) {
      message.warning("暂无文件");
      return;
    }
    const url = files.reduce((max, item) =>
      new Date(item.LastModified) > new Date(max.LastModified) ? item : max,
    ).Key;
    message.info("开始下载");
    downloadFile(url).catch((e) => message.error("下载失败：" + e));
  } catch (err) {
    console.error(err);
    message.error("下载失败");
  }
};
