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
} from "antd";
import { useQuery } from "@apollo/client";
import Linkify from "react-linkify";
import {
  EditOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { GetNotices as GET_NOTICES } from "../../api/info_notice.graphql";
import { GetNotices } from "../../api/types";
import { CardProps } from "antd/lib/card";
import dayjs from "dayjs";
import { UploadFile, RcCustomRequestOptions } from "antd/lib/upload/interface";

const { Text } = Typography;

interface File {
  filename: string;
  url: string;
}

const NoticePage: React.FC = () => {
  const {
    data: noticeData,
    loading: noticeLoading,
    error: noticeError,
  } = useQuery<GetNotices>(GET_NOTICES);

  useEffect(() => {
    if (noticeError) {
      message.error("公告加载失败");
    }
  }, [noticeError]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingNotice, setEditingNotice] = useState();
  const [noticeUpdating, setNoticeUpdating] = useState(false);
  const [form] = Form.useForm();

  const handleNoticeEdit = () => {
    setEditingNotice(undefined);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload = (a: RcCustomRequestOptions) => {
    setNoticeUpdating(true);
  };

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>
          <Typography.Title level={2}>公告</Typography.Title>
        </Col>
        <Col>
          <Button onClick={() => setModalVisible(true)}>新公告</Button>
        </Col>
      </Row>
      <List
        dataSource={noticeData?.info_notice}
        renderItem={(item) => (
          <NoticeCard
            css={`
              margin-top: 24px;
              margin-bottom: 24px;
            `}
            // onEditPress={
            //   user.role === "counselor" || user.role === "root"
            //     ? () => {
            //         setFormData(item);
            //         setFormVisible(true);
            //       }
            //     : undefined
            // }
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
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={handleNoticeEdit}
        maskClosable={false}
        confirmLoading={noticeUpdating}
      >
        <Form
          form={form}
          name="notice"
          onFinish={handleNoticeEdit}
          initialValues={editingNotice}
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
              onRemove={(file) => {}}
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
}

const NoticeCard: React.FC<NoticeCardProps> = (props) => {
  const { title, content, files, updatedAt, onEditPress, ...restProps } = props;

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
                // FileSaver.saveAs(
                //   axios.defaults.baseURL + file.url,
                //   file.filename
                // );
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
        {onEditPress && (
          <EditOutlined
            css={`
              marginright: 5;
            `}
            onClick={onEditPress}
          />
        )}
        <Text
          css={`
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
