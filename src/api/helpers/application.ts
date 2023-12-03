import Docxtemplater from "docxtemplater";
import {
  GetScholarshipApplications_scholarship_application,
  GetAidApplications_aid_application,
} from "../types";
import FileSaver from "file-saver";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";

export const getStatusText = (status: string) =>
  status === "submitted"
    ? "已提交"
    : status === "rejected"
      ? "未通过"
      : "已通过";

export const getStatusValue = (text: string) =>
  text === "已提交" ? "submitted" : text === "未通过" ? "rejected" : "approved";

const formatDate = (date: Date) => {
  const month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  return year + "年" + month + "月" + day + "日";
};

export const generateThankLetter = async (
  application:
    | GetScholarshipApplications_scholarship_application
    | GetAidApplications_aid_application,
  salutation: string | null,
) => {
  const templateData = await new Promise<any>((resolve) =>
    PizZipUtils.getBinaryContent(
      `${process.env.REACT_APP_STATIC_URL}/public/files/thankletter-template.docx`,
      (err: any, content: any) => resolve(content),
    ),
  );
  const zipFile = new PizZip(templateData);

  const doc = new Docxtemplater();
  doc.loadZip(zipFile);

  const content = application.thank_letter ?? "";
  const paras = content.split("\n");
  let contents = [];
  for (let index = 0; index < paras.length; index++) {
    const text = paras[index];
    contents.push({
      content: text.trim(),
    });
  }

  const prizeName = (
    application as GetScholarshipApplications_scholarship_application
  ).scholarship
    ? (application as GetScholarshipApplications_scholarship_application)
        .scholarship
    : (application as GetAidApplications_aid_application).aid;

  const info = {
    title: prizeName + "感谢信",
    salutation: salutation,
  };

  const data = {
    ...info,
    contents,
    department: "清华大学电子工程系",
    class: application.student.class,
    date: formatDate(new Date()),
  };

  doc.setData(data);
  doc.render();
  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  FileSaver.saveAs(
    out,
    `${prizeName}_${application.student.department}_${application.student.name}.docx`,
  );
};
