import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import {
  Typography,
  Row,
  // Col,
  Button,
  List,
  Card,
  message,
  Modal,
  Input,
  Form,
  Upload,
  Space,
} from "antd";
import { useQuery, useMutation } from "@apollo/client";
import Linkify from "react-linkify";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  GetContestNotices as GET_NOTICES,
  UpdateContestNotice as UPDATE_NOTICE,
  AddContestNotice as ADD_NOTICE,
  DeleteContestNotice as DELETE_NOTICE,
} from "../../api/contest_info.graphql";
import {
  QueryContestManager as QUERY_CONTEST_MANAGER
} from "../../api/contest.graphql";
import {
  GetContestNotices,
  UpdateContestNotice,
  AddContestNotice,
  DeleteContestNotice,
  GetContestNotices_contest_info,
  AddContestNoticeVariables,
  UpdateContestNoticeVariables,
  DeleteContestNoticeVariables,
  GetContestNoticesVariables,
  QueryContestManager,
  QueryContestManagerVariables,
} from "../../api/types";
import type { CardProps } from "antd/lib/card";
import dayjs from "dayjs";
import type {
  UploadFile,
  RcCustomRequestOptions
} from "antd/lib/upload/interface";
import { getOSS, downloadFile } from "../../helpers/oss";
import { getUserInfo } from "../../helpers/auth";


const { Text } = Typography;
const { confirm } = Modal;

interface File {
  filename: string;
  url: string;
}

const ResourcePage: React.FC = () => {
  const userInfo = getUserInfo();
  const location = useLocation()
  const Contest_id = location.pathname.split("/")[2].replace('}', '')

  const {
    data: noticeData,
    loading: noticeLoading,
    error: noticeError,
    refetch: refetchNotices,
  } = useQuery<GetContestNotices, GetContestNoticesVariables>(GET_NOTICES, {
    variables: {
      contest_id: Contest_id,
    }
  });

  const [
    updateNotice,
    { loading: noticeUpdating, error: noticeUpdateError },
  ] = useMutation<UpdateContestNotice, UpdateContestNoticeVariables>(UPDATE_NOTICE);

  const [
    addNotice,
    { loading: noticeAdding, error: noticeAddError },
  ] = useMutation<AddContestNotice, AddContestNoticeVariables>(ADD_NOTICE);

  const [deleteNotice, { error: noticeDeleteError }] = useMutation<
    DeleteContestNotice,
    DeleteContestNoticeVariables
  >(DELETE_NOTICE);

  const {
    data: isContestManagerData,
    error: isContestManagerError
  } = useQuery<QueryContestManager, QueryContestManagerVariables>(QUERY_CONTEST_MANAGER, {
    variables: {
      contest_id: Contest_id,
      user_id: userInfo?._id
    }
  });

  useEffect(() => {
    if (noticeError) {
      message.error("公告加载失败");
      console.log(noticeError.message);
    }
  }, [noticeError]);

  useEffect(() => {
    if (noticeUpdateError) {
      message.error("公告更新失败");
    }
  }, [noticeUpdateError]);

  useEffect(() => {
    if (noticeAddError) {
      message.error("公告发布失败");
    }
  }, [noticeAddError]);

  useEffect(() => {
    if (noticeDeleteError) {
      message.error("公告删除失败");
    }
  }, [noticeDeleteError]);

  useEffect(() => {
    if (isContestManagerError) {
      message.error("管理员加载失败");
      console.log(isContestManagerError.message)
    }
  }, [isContestManagerError]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingNotice, setEditingNotice] = useState<GetContestNotices_contest_info>();
  const [form] = Form.useForm();

  const handleNoticeEdit = async () => {
    try {
      form.validateFields();
    } catch { }

    const values = form.getFieldsValue();
    const files = fileList.map((f) => ({
      filename: f.name,
      url: "/contest_upload/" + f.name,
    }));

    if (editingNotice) {
      await updateNotice({
        variables: {
          id: editingNotice.id,
          title: values.title,
          content: values.content,
          files: JSON.stringify(files),
          contest_id: Contest_id,
        },
      });
    } else {
      await addNotice({
        variables: {
          title: values.title,
          content: values.content,
          files: JSON.stringify(files),
          contest_id: Contest_id,
        },
      });
    }

    setModalVisible(false);
    setEditingNotice(undefined);
    form.resetFields();

    refetchNotices();
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload = async (e: RcCustomRequestOptions) => {
    const oss = await getOSS();
    const result = await oss.multipartUpload(
      "contest_upload/" + encodeURI(e.file.name),
      e.file,
      {
        progress: (progress) =>
          e.onProgress({ percent: progress * 100 }, e.file),
      }
    );
    if (result.res.status === 200) {
      e.onSuccess(result.res, e.file);
    } else {
      e.onError(new Error());
    }
  };

  const handleRemove = async (file: UploadFile) => {
    if (file.response?.status === 200) {
      const oss = await getOSS();
      await oss.delete("contest_upload/" + encodeURI(file.name));
    }
  };

  const handleNoticeDelete = async (id: string) => {
    confirm({
      title: "确定要删除此公告吗？",
      icon: <ExclamationCircleOutlined />,
      content: "此操作不可恢复。",
      onOk: async () => {
        await deleteNotice({ variables: { id } });
        await refetchNotices();
      },
    });
  };

  return (
    <>
      <Row align="middle" justify="end">
        <Button
          css={`
            margin-top: 12px;
            margin-right: 24px;
          `}
          hidden={!(["root", "counselor"].includes(userInfo?.role!) || isContestManagerData?.contest_manager.length === 1)}
          onClick={() => setModalVisible(true)}
        >
          编辑新公告
        </Button>
      </Row>
      <List
        dataSource={noticeData?.contest_info}
        renderItem={(item) => (
          <NoticeCard
            css={`
              margin-top: 12px;
              margin-bottom: 24px;
              margin-left: 192px;
              margin-right:192px;
            `}
            onEditPress={
              (["root", "counselor"].includes(userInfo?.role!) || isContestManagerData?.contest_manager.length === 1)
                ? () => {
                  setEditingNotice(item);
                  setFileList(
                    JSON.parse(item.files ?? "[]").map((f: File) => ({
                      response: { status: 200 },
                      status: "done",
                      uid: f.url,
                      size: 0,
                      name: f.filename,
                      type: "",
                    }))
                  );
                  setModalVisible(true);
                }
                : undefined
            }
            onDeletePress={
              (["root", "counselor"].includes(userInfo?.role!) || isContestManagerData?.contest_manager.length === 1)
                ? () => {
                  handleNoticeDelete(item.id);
                }
                : undefined
            }
            title={item.title}
            content={item.content}
            updatedAt={item.updated_at}
            files={JSON.parse(item.files ?? "[]") as File[]}
          />
        )}
        loading={noticeLoading}
      />
      <Modal
        visible={modalVisible}
        title={editingNotice ? "编辑公告" : "新公告"}
        centered
        okText="发布"
        onCancel={() => {
          if (fileList.length !== 0) {
            message.info("请先移除已上传文件");
            return;
          }
          setModalVisible(false);
          form.resetFields();
          setEditingNotice(undefined);
        }}
        onOk={handleNoticeEdit}
        maskClosable={false}
        confirmLoading={noticeUpdating || noticeAdding}
        destroyOnClose
      >
        <Form
          form={form}
          name="notice"
          onFinish={handleNoticeEdit}
          initialValues={editingNotice}
          preserve={false}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: "请输入公告标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="正文"
            rules={[{ required: true, message: "请输入公告正文" }]}
          >
            <Input.TextArea autoSize={{ minRows: 6 }} />
          </Form.Item>
          <Form.Item>
            <Upload
              customRequest={handleUpload}
              onChange={(info) => setFileList(info.fileList)}
              onRemove={handleRemove}
              multiple
              fileList={fileList}
            >
              <Button>
                <UploadOutlined /> 上传附件
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ResourcePage;

interface NoticeCardProps extends CardProps {
  title: string;
  content: string;
  files?: File[];
  updatedAt: Date;
  onEditPress?: () => void;
  onDeletePress?: () => void;
}

const NoticeCard: React.FC<NoticeCardProps> = (props) => {
  const {
    title,
    content,
    files,
    updatedAt,
    onEditPress,
    onDeletePress,
    ...restProps
  } = props;

  return (
    <Card
      css={`
        padding: 20px;
        padding-bottom: 10px;
        &.ant-card-bordered {
          cursor: default;
        }
      `}
      title={title}
      hoverable
      {...restProps}
    >
      <Text
        css={`
          margin: 12px 0 12px 0;
          white-space: pre-wrap;
        `}
      >
        <Linkify
          componentDecorator={(
            decoratedHref: string,
            decoratedText: string,
            key: number
          ) => (
            <a
              href={decoratedHref}
              key={key}
              target="_blank"
              rel="noopener noreferrer"
            >
              {decoratedText}
            </a>
          )}
        >
          {content}
        </Linkify>
      </Text>
      <div
        css={`
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          width: 100%;
          margin: 12px auto 12px 0px;
        `}
      >
        {files &&
          files.map((file) => (
            <Button
              key={file.url}
              css={`
                margin: 6px;
                margin-left: 0px;
              `}
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => {
                message.info("开始下载："+file.filename)
                downloadFile(file)
              }}
            >
              {file.filename}
            </Button>
          ))}
      </div>
      <div
        css={`
          display: flex;
          justify-content: flex-end;
          align-items: center;
        `}
      >
        <Space size={'middle'}>
          {onEditPress && <EditOutlined onClick={onEditPress} />}
          {onDeletePress && <DeleteOutlined onClick={onDeletePress} />}
          <Text
            css={`
            margin-left: 5px;
            font-style: italic;
            font-size: 12px;
            color: gray;
          `}
          >
            {"编辑于 " + dayjs(updatedAt).fromNow()}
          </Text>
        </Space>


      </div>
    </Card>
  );
};
