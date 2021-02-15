import React, { useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Button,
  List,
  Card,
  message,
  Modal,
  Input,
  Form,
  Upload,
  Radio,
  Menu,
} from "antd";
import { useQuery, useMutation } from "@apollo/client";
import Linkify from "react-linkify";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
  ReadOutlined,
  TeamOutlined,
  LaptopOutlined,
  FundProjectionScreenOutlined,
  TrophyOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import {
  GetNotices as GET_NOTICES,
  UpdateNotice as UPDATE_NOTICE,
  AddNotice as ADD_NOTICE,
  DeleteNotice as DELETE_NOTICE,
} from "../../api/info_notice.graphql";
import {
  GetNotices,
  UpdateNotice,
  AddNotice,
  DeleteNotice,
  GetNotices_info_notice,
  AddNoticeVariables,
  UpdateNoticeVariables,
  DeleteNoticeVariables,
} from "../../api/types";
import type { CardProps } from "antd/lib/card";
import dayjs from "dayjs";
import type {
  UploadFile,
  RcCustomRequestOptions,
} from "antd/lib/upload/interface";
import { getOSS, downloadFile } from "../../helpers/oss";
import { getUserInfo } from "../../helpers/auth";

const { Text } = Typography;
const { confirm } = Modal;

interface File {
  filename: string;
  url: string;
}

const NoticePage: React.FC = () => {
  const userInfo = getUserInfo();

  const {
    data: noticeData,
    loading: noticeLoading,
    error: noticeError,
    refetch: refetchNotices,
  } = useQuery<GetNotices>(GET_NOTICES);

  const [
    updateNotice,
    { loading: noticeUpdating, error: noticeUpdateError },
  ] = useMutation<UpdateNotice, UpdateNoticeVariables>(UPDATE_NOTICE);
  const [
    addNotice,
    { loading: noticeAdding, error: noticeAddError },
  ] = useMutation<AddNotice, AddNoticeVariables>(ADD_NOTICE);
  const [deleteNotice, { error: noticeDeleteError }] = useMutation<
    DeleteNotice,
    DeleteNoticeVariables
  >(DELETE_NOTICE);

  useEffect(() => {
    if (noticeError) {
      message.error("公告加载失败");
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

  const [modalVisible, setModalVisible] = useState(false);
  const [editingNotice, setEditingNotice] = useState<GetNotices_info_notice>();
  const [noticeType, setNoticeType] = useState<string>("all");
  const [form] = Form.useForm();

  const handleNoticeEdit = async () => {
    try {
      form.validateFields();
    } catch {}

    const values = form.getFieldsValue();
    const files = fileList.map((f) => ({
      filename: f.name,
      url: "/upload/" + f.name,
    }));

    if (editingNotice) {
      await updateNotice({
        variables: {
          id: editingNotice.id,
          title: values.title,
          content: values.content,
          files: JSON.stringify(files),
          notice_type: editingNotice.notice_type,
        },
      });
    } else {
      await addNotice({
        variables: {
          title: values.title,
          content: values.content,
          files: JSON.stringify(files),
          notice_type: values.type,
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
      "upload/" + encodeURI(e.file.name),
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
      await oss.delete("upload/" + encodeURI(file.name));
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

  const handleTypeClick = async (e: any) => {
    setNoticeType(e.key);
    await refetchNotices({ notice_type: e.key === "all" ? null : e.key });
  };

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>
          <Typography.Title level={2}>公告</Typography.Title>
        </Col>
        <Col>
          <Button
            hidden={userInfo?.role !== "counselor" && userInfo?.role !== "root"}
            onClick={() => setModalVisible(true)}
          >
            新公告
          </Button>
        </Col>
      </Row>
      <Menu
        mode="horizontal"
        selectedKeys={[noticeType]}
        onClick={handleTypeClick}
      >
        <Menu.Item key="all" icon={<BarsOutlined />}>
          全部公告
        </Menu.Item>
        <Menu.Item key="奖助学金" icon={<ReadOutlined />}>
          奖助学金
        </Menu.Item>
        <Menu.Item key="推研信息" icon={<TeamOutlined />}>
          推研信息
        </Menu.Item>
        <Menu.Item key="就业信息" icon={<LaptopOutlined />}>
          就业信息
        </Menu.Item>
        <Menu.Item key="实习信息" icon={<FundProjectionScreenOutlined />}>
          实习信息
        </Menu.Item>
        <Menu.Item key="赛事信息" icon={<TrophyOutlined />}>
          赛事信息
        </Menu.Item>
      </Menu>
      <List
        dataSource={noticeData?.info_notice}
        renderItem={(item) => (
          <NoticeCard
            css={`
              margin-top: 24px;
              margin-bottom: 24px;
            `}
            onEditPress={
              userInfo?.role === "counselor" || userInfo?.role === "root"
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
              userInfo?.role === "counselor" || userInfo?.role === "root"
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
            name="type"
            rules={[{ required: !editingNotice, message: "请选择公告类别" }]}
          >
            <Radio.Group
              disabled={!!editingNotice}
              defaultValue={editingNotice?.notice_type}
            >
              <Radio.Button value="奖助学金">奖助学金</Radio.Button>
              <Radio.Button value="推研信息">推研信息</Radio.Button>
              <Radio.Button value="就业信息">就业信息</Radio.Button>
              <Radio.Button value="实习信息">实习信息</Radio.Button>
              <Radio.Button value="赛事信息">赛事信息</Radio.Button>
            </Radio.Group>
          </Form.Item>
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

export default NoticePage;

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
              onClick={() => downloadFile(file)}
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
      </div>
    </Card>
  );
};
