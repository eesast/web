import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import React, { useState, useEffect } from "react";
import { Upload, Icon, Modal, Button, message } from "antd";
import "./MultipleUpload.css";
import axios from "axios";
import Clipboard from "clipboard";

export interface IMultipleUploadProps extends UploadProps {
  token: string;
  fileList?: UploadFile[];
  maxUpload?: number;
  uploadPrompt?: string;
  onFileListChange: (fileList: UploadFile[]) => void;
  onRemove: (file: UploadFile) => boolean | Promise<boolean>;
}

const MultipleUpload: React.FC<IMultipleUploadProps> = props => {
  const {
    token,
    fileList,
    maxUpload,
    uploadPrompt,
    onFileListChange,
    onRemove
  } = props;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPictureName, setPreviewPictureName] = useState("");
  const [previewPictureUrl, setPreviewPictureUrl] = useState("");

  const handlePreview: UploadProps["onPreview"] = file => {
    let filename = file.name;
    filename = filename.length > 50 ? `${filename.slice(0, 50)}...` : filename;

    setPreviewPictureName(filename);
    setPreviewPictureUrl(axios.defaults.baseURL + file.response);
    setPreviewVisible(true);
  };

  const handlePreviewClose = () => {
    setPreviewVisible(false);
  };

  const handleFileListChange: UploadProps["onChange"] = change => {
    onFileListChange(change.fileList);
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );

  useEffect(() => {
    const clipboard = new Clipboard("#button", {
      text: () => {
        return `![${previewPictureName}](${previewPictureUrl})`;
      }
    });
    clipboard.on("success", () => message.success("复制成功"));
    clipboard.on("error", () => message.error("复制失败"));
    return () => clipboard.destroy();
  });

  return (
    <div className="MultipleUpload">
      <Upload
        action={axios.defaults.baseURL + "/static/images"}
        headers={{
          Authorization: "Bearer " + token
        }}
        listType="picture-card"
        fileList={fileList}
        onChange={handleFileListChange}
        onPreview={handlePreview}
        onRemove={onRemove as any}
      >
        {maxUpload && fileList && fileList.length >= maxUpload
          ? null
          : uploadButton}
      </Upload>
      <Modal
        centered={true}
        footer={null}
        title={previewPictureName}
        visible={previewVisible}
        onCancel={handlePreviewClose}
      >
        <img style={{ width: "100%" }} alt="preview" src={previewPictureUrl} />
        <Button id="button">复制Markdown语句</Button>
      </Modal>
    </div>
  );
};

export default MultipleUpload;
