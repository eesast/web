import React, { useEffect, useState, Suspense } from "react";
import {
  Typography,
  Button,
  List,
  Card,
  message,
  Modal,
  Input,
  Form,
  Upload,
  Space,
  Spin,
  Layout,
  Col,
  Row,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { CardProps } from "antd/lib/card";
import dayjs from "dayjs";
import type { UploadFile } from "antd/lib/upload/interface";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { uploadFile, downloadFile, deleteFile } from "../../api/cos";
import { Content } from "antd/lib/layout/layout";
import { useUrl } from "../../api/hooks/url";
import { RcFile } from "rc-upload/lib/interface";
import Markdown from "react-markdown";
import * as graphql from "@/generated/graphql";
import styled from "styled-components";
import { ContestProps } from ".";

const { Text } = Typography;
const { confirm } = Modal;

interface File {
  filename: string;
  url: string;
}

const NoticePage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");

  const { data: contestData, error: contestError } =
    graphql.useGetContestInfoSuspenseQuery({
      variables: {
        contest_id: Contest_id,
      },
    });
  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);

  const {
    data: noticeData,
    //loading: noticeLoading,
    error: noticeError,
    refetch: refetchNotices,
  } = graphql.useGetContestNoticesSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const [updateNotice, { loading: noticeUpdating, error: noticeUpdateError }] =
    graphql.useUpdateContestNoticeMutation();

  const [addNotice, { loading: noticeAdding, error: noticeAddError }] =
    graphql.useAddContestNoticeMutation();

  const [deleteNotice, { error: noticeDeleteError }] =
    graphql.useDeleteContestNoticeMutation();

  const { data: isContestManagerData, error: isContestManagerError } =
    graphql.useQueryContestManagerSuspenseQuery({
      variables: {
        contest_id: Contest_id,
        user_uuid: user?.uuid,
      },
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
      console.log(isContestManagerError.message);
    }
  }, [isContestManagerError]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingNotice, setEditingNotice] =
    useState<graphql.GetContestNoticesQuery["contest_notice"][0]>();
  const [form] = Form.useForm();

  const handleNoticeEdit = async () => {
    try {
      form.validateFields();
    } catch {}

    const values = form.getFieldsValue();
    const files = fileList.map((f) => ({
      filename: f.name,
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
    try {
      const url = `${contestData?.contest_by_pk?.contest_name}/notice/${
        (e.file as RcFile).name
      }`;
      const result = await uploadFile(e.file, url);
      const xhr = new XMLHttpRequest();
      e.onSuccess!(result, xhr);
    } catch (err) {
      e.onError!(new Error("上传失败"));
    }
  };

  const handleRemove = async (file: UploadFile) => {
    try {
      let fileList_ = fileList;
      // Please don't delete the line below
      console.log(
        fileList_.splice(
          fileList_.findIndex((item) => item.uid === file.uid),
          1,
        ),
      );
      setFileList(
        fileList_.splice(
          fileList_.findIndex((item) => item.uid === file.uid),
          1,
        ),
      );
      // const files = fileList.map((f) => ({
      //   filename: f.name,
      //   url: "/contest_upload/" + f.name,
      // }));
      // const values = form.getFieldsValue();
      // if (editingNotice) {
      //   await updateNotice({
      //     variables: {
      //       id: editingNotice.id,
      //       title: values.title,
      //       content: values.content,
      //       files: JSON.stringify(files),
      //       contest_id: Contest_id,
      //     },
      //   });
      // }
      // else throw (Error("error"));
      if (file.response?.status === 200) {
        await deleteFile(
          `${contestData?.contest_by_pk?.contest_name}/notice/${file.name}`,
        );
      }
      // refetchNotices();
    } catch (err) {
      console.log(err);
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

  const Container = styled.div`
    height: calc(100vh - 72px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Loading = () => {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  };

  return (
    <Layout>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Button
            hidden={isContestManagerData?.contest_manager.length !== 1}
            onClick={() => setModalVisible(true)}
          >
            编辑新公告
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Suspense fallback={<Loading />}>
            <List
              dataSource={noticeData?.contest_notice}
              renderItem={(item) => (
                <Content>
                  <NoticeCard
                    onEditPress={
                      isContestManagerData?.contest_manager.length === 1
                        ? () => {
                            setEditingNotice(
                              item as graphql.GetContestNoticesQuery["contest_notice"][0],
                            );
                            setFileList(
                              JSON.parse(item.files ?? "[]").map((f: File) => ({
                                response: { status: 200 },
                                status: "done",
                                size: 0,
                                name: f.filename,
                                type: "",
                              })),
                            );
                            setModalVisible(true);
                          }
                        : undefined
                    }
                    onDeletePress={
                      isContestManagerData?.contest_manager.length === 1
                        ? () => {
                            handleNoticeDelete(item.id);
                          }
                        : undefined
                    }
                    contest={contestData?.contest_by_pk?.contest_name!}
                    title={item.title}
                    content={item.content}
                    updatedAt={item.updated_at}
                    files={JSON.parse(item.files ?? "[]") as File[]}
                  />
                  <br />
                  <br />
                </Content>
              )}
              //loading={noticeLoading }
            />
          </Suspense>
        </Col>
      </Row>
      <Modal
        open={modalVisible}
        title={editingNotice ? "编辑公告" : "新公告"}
        centered
        okText="发布"
        onCancel={() => {
          const files = fileList.map((f) => ({
            filename: f.name,
          }));
          if (editingNotice && editingNotice.files !== JSON.stringify(files)) {
            message.info("请先移除新上传的文件");
            return;
          }
          if (!editingNotice && fileList.length > 0) {
            message.info("请先移除新上传的文件");
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
    </Layout>
  );
};

export default NoticePage;

interface NoticeCardProps extends CardProps {
  contest: string;
  title: string;
  content: string;
  files?: File[];
  updatedAt: Date;
  onEditPress?: () => void;
  onDeletePress?: () => void;
}

const NoticeCard: React.FC<NoticeCardProps> = (props) => {
  const {
    contest,
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
      <Markdown
        css={`
          margin: 12px 0 12px 0;
          white-space: pre-wrap;
        `}
      >
        {content}
      </Markdown>
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
              key={file.filename}
              css={`
                margin: 6px;
                margin-left: 0px;
              `}
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => {
                message.info("开始下载：" + file.filename);
                downloadFile(`${contest}/notice/${file.filename}`);
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
        <Space size={"middle"}>
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
