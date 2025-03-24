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
import type { CardProps } from "antd/lib/card";
import dayjs from "dayjs";
import type { UploadFile } from "antd/lib/upload/interface";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { uploadFile, downloadFile, deleteFile } from "../../api/cos";
import { RcFile } from "rc-upload/lib/interface";
import Markdown from "react-markdown";
import * as graphql from "@/generated/graphql";
import { PageProps } from "..";

/*----- 不依赖于 props 和 hooks 的定义 -----*/
const { Text } = Typography;
const { confirm } = Modal;

/*----- 文件接口定义 -----*/
interface File {
  filename: string; //文件名
  url: string; //文件地址
}

/*----- 公告接口定义 -----*/
interface NoticeCardProps extends CardProps {
  title: string; //标题
  content: string; //内容
  files?: File[]; //文件
  updatedAt: Date; //更新时间
  onEditPress?: () => void; //编辑按钮点击事件
  onDeletePress?: () => void; //删除按钮点击事件
}

/*----- 主组件 NoticePage -----*/
const NoticePage: React.FC<PageProps> = ({ mode, user }) => {
  /*----- states 和 引入 hooks -----*/
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNotice, setEditingNotice] =
    useState<graphql.GetNoticesQuery["info_notice"][0]>();
  const [noticeType, setNoticeType] = useState<string>("all");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  /*----- 数据获取 hook -----*/
  const {
    data: noticeData,
    loading: noticeLoading,
    error: noticeError,
    refetch: refetchNotices,
  } = graphql.useGetNoticesQuery({
    variables: {
      notice_type: ["奖助学金", "推研信息", "就业信息", "实习信息", "赛事信息"],
    },
  });

  // 更新、发布、删除公告的 hooks
  const [updateNotice, { loading: noticeUpdating, error: noticeUpdateError }] =
    graphql.useUpdateNoticeMutation();
  const [addNotice, { loading: noticeAdding, error: noticeAddError }] =
    graphql.useAddNoticeMutation();
  const [deleteNotice, { error: noticeDeleteError }] =
    graphql.useDeleteNoticeMutation();

  /*----- useEffect 部分 -----*/
  // 公告加载失败时提示
  useEffect(() => {
    if (noticeError) {
      message.error("公告加载失败");
      console.log(noticeError);
    }
  }, [noticeError]);

  // 公告更新失败时提示
  useEffect(() => {
    if (noticeUpdateError) {
      message.error("公告更新失败");
    }
  }, [noticeUpdateError]);

  // 公告发布失败时提示
  useEffect(() => {
    if (noticeAddError) {
      message.error("公告发布失败");
    }
  }, [noticeAddError]);

  // 公告删除失败时提示
  useEffect(() => {
    if (noticeDeleteError) {
      message.error("公告删除失败");
    }
  }, [noticeDeleteError]);

  /*----- 其他函数和处理逻辑 -----*/
  // 处理公告编辑
  const handleNoticeEdit = async () => {
    try {
      form.validateFields();
      const values = form.getFieldsValue();
      const files = fileList.map((f) => ({
        filename: f.name,
        url: "/upload/" + f.name,
      }));
      if (editingNotice) {
        await updateNotice({
          // 更新公告
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
          // 发布公告
          variables: {
            title: values.title,
            content: values.content,
            files: JSON.stringify(files),
            notice_type: values.type,
          },
        });
      }
      // 关闭模态框，清空表单，重载公告
      setModalVisible(false);
      setEditingNotice(undefined);
      form.resetFields();
      refetchNotices();
    } catch (err) {
      console.log(err);
    }
  };

  // 处理文件上传
  const handleUpload = async (e: RcCustomRequestOptions) => {
    try {
      const url = "upload/" + (e.file as RcFile).name;
      const result = await uploadFile(e.file, url);
      const xhr = new XMLHttpRequest();
      e.onSuccess!(result, xhr);
    } catch (err) {
      e.onError!(new Error("上传失败"));
    }
  };

  // 处理文件删除
  const handleRemove = async (file: UploadFile) => {
    try {
      let fileList_ = fileList;
      setFileList(
        fileList_.splice(
          fileList_.findIndex((item) => item.uid === file.uid),
          1,
        ),
      );
      const files = fileList.map((f) => ({
        filename: f.name,
        url: "/upload/" + f.name,
      }));
      const values = form.getFieldsValue();
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
      } else throw Error("error");
      if (file.response?.status === 200) {
        await deleteFile("upload/" + file.name); //删除文件
      }
      refetchNotices();
    } catch (err) {
      console.log(err);
    }
  };

  // 处理公告删除
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

  // 处理公告类别点击
  const handleTypeClick = async (e: any) => {
    setNoticeType(e.key);
    await refetchNotices({
      notice_type:
        e.key !== "all"
          ? e.key
          : ["奖助学金", "推研信息", "就业信息", "实习信息", "赛事信息"],
    });
  };

  /*----- 组件渲染 -----*/
  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>
          <Typography.Title level={2}>公告</Typography.Title>
        </Col>
        <Col>
          <Button
            style={{
              display:
                user.role !== "counselor" && user.role !== "root"
                  ? "none"
                  : "inline-block",
            }}
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
              user.role === "counselor" || user.role === "root"
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
                      })),
                    );
                    setModalVisible(true);
                  }
                : undefined
            }
            onDeletePress={
              user.role === "counselor" || user.role === "root"
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
        open={modalVisible}
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

/*----- NoticeCard 组件 -----*/
const NoticeCard: React.FC<NoticeCardProps> = (props) => {
  /*----- props -----*/
  const {
    title,
    content,
    files,
    updatedAt,
    onEditPress,
    onDeletePress,
    ...restProps
  } = props;

  /*----- 组件渲染 -----*/
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
      // css={`
      //   margin: 12px 0 12px 0;
      //   white-space: pre-wrap;
      // `}
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
              key={file.url}
              css={`
                margin: 6px;
                margin-left: 0px;
              `}
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() =>
                downloadFile(file.url).catch((e) =>
                  message.error("下载失败：" + e),
                )
              }
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
