export const getStatusText = (status: string) =>
  status === "submitted"
    ? "已提交"
    : status === "rejected"
    ? "未通过"
    : "已通过";

export const getStatusValue = (text: string) =>
  text === "已提交" ? "submitted" : text === "未通过" ? "rejected" : "approved";
