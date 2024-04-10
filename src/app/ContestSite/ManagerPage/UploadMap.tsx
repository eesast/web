import React, { useEffect, useState } from "react";
import {
  Card,
  Layout,
  Typography,
  Upload,
  message,
  List,
  theme,
  Collapse,
  Button,
  Modal,
  Form,
  Input,
  Row,
} from "antd";
import {
  InboxOutlined,
  CaretRightOutlined,
  EditOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ContestProps } from "..";
import * as graphql from "@/generated/graphql";
import { useUploadProps } from "@/app/Components/UploadProps";
import { useUrl } from "@/api/hooks/url";
import { useWindowSize } from "@/api/hooks/windowsize";
import { deleteFile, downloadFile } from "@/api/cos";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;
const { Dragger } = Upload;

const UploadMap: React.FC<ContestProps> = ({ mode, user }) => {
  const windowSize = useWindowSize();
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const { data: contestNameData } = graphql.useGetContestNameSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  const contestName = contestNameData?.contest_by_pk?.name;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    data: contestMapsData,
    error: getContestMapsError,
    refetch: refetchContestMaps,
  } = graphql.useGetContestMapsSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });

  useEffect(() => {
    if (getContestMapsError) {
      message.error("比赛地图加载失败");
      console.log(getContestMapsError.message);
    }
  }, [getContestMapsError]);

  const [addContestMap, { error: addContestMapError }] =
    graphql.useAddContestMapMutation();
  useEffect(() => {
    if (addContestMapError) {
      message.error("比赛地图添加失败");
      console.log(addContestMapError.message);
    }
  }, [addContestMapError]);

  // const [ updateContestMap, {error: updateContestMapError} ] = graphql.useUpdateContestMapMutation();
  // useEffect(() => {
  //   if (updateContestMapError) {
  //     message.error("比赛地图更新失败");
  //     console.log(updateContestMapError.message);
  //   }
  // }, [updateContestMapError]);

  const [deleteContestMap, { error: deleteContestMapError }] =
    graphql.useDeleteContestMapMutation();
  useEffect(() => {
    if (deleteContestMapError) {
      message.error("比赛地图删除失败");
      console.log(deleteContestMapError.message);
    }
  }, [deleteContestMapError]);

  const { uploadProps } = useUploadProps(`${contestName}/map`, false);
  const [addMapForm] = Form.useForm();
  const handleAdd = async () => {
    try {
      const values = await addMapForm.validateFields();
      if (uploadProps.fileList?.length === 0) {
        message.error("请上传地图文件");
        return;
      }
      await addContestMap({
        variables: {
          contest_id: Contest_id,
          name: values.name,
          filename: uploadProps.fileList![0].name,
        },
      });
      if (addContestMapError) throw new Error(addContestMapError.message);
      message.success("地图添加成功");
      refetchContestMaps();
      addMapForm.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  const prepareFile = (file: File) => {
    const filenameSplit = file.name.split(".");
    const suffix = filenameSplit.pop();
    if (suffix !== "txt") {
      message.error("文件类型错误，仅支持txt格式地图文件");
      return false;
    }
    return true;
  };

  const handleEdit = (map_id: string) => {
    message.info("编辑功能暂未开放");
  };

  const handleDownload = async (filename: string) => {
    try {
      message.loading(`即将下载 ${filename}`);
      await downloadFile(`${contestName}/map/${filename}`);
    } catch (err) {
      message.error(`${filename} 下载失败`);
      console.log(err);
    }
  };

  const handleDelete = async (map_id: string, filename: string) => {
    try {
      const result = await deleteFile(`${contestName}/map/${filename}`);
      if (result.statusCode !== 204) throw new Error("删除失败");
      await deleteContestMap({
        variables: {
          map_id,
        },
      });
      if (deleteContestMapError) throw new Error(deleteContestMapError.message);
      message.success("地图删除成功");
    } catch (e) {
      message.error("地图删除失败");
      console.log(e);
    }
  };

  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const maps = contestMapsData?.contest_map.map((item) => ({
    key: item.map_id,
    label: item.name,
    style: panelStyle,
    children: (
      <List size="small" split={false}>
        <List.Item style={{ padding: "8px" }}>
          <Typography.Text>文件名：{item.filename}</Typography.Text>
        </List.Item>
        <List.Item style={{ padding: "8px" }}>
          <Typography.Text>参赛队伍：{item.team_labels}</Typography.Text>
        </List.Item>
        <List.Item style={{ padding: "16px 8px 8px 8px" }}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(item.map_id)}
          >
            {windowSize.width > 1260 && "编辑"}
          </Button>
          <Button
            type="link"
            size="small"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(item.filename)}
          >
            {windowSize.width > 1260 && "下载"}
          </Button>
          <Button
            type="text"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(item.map_id, item.filename)}
          >
            {windowSize.width > 1260 && "删除"}
          </Button>
        </List.Item>
      </List>
    ),
  }));

  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          地图管理
        </Title>
        <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={maps}
        />
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "36px",
          }}
        >
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            添加新地图
          </Button>
        </Row>
      </Card>
      <Modal
        open={isModalVisible}
        title="添加新地图"
        centered
        okText="录入"
        maskClosable={false}
        onCancel={() => {
          setIsModalVisible(false);
          addMapForm.resetFields();
        }}
        onOk={handleAdd}
        destroyOnClose
      >
        <Form form={addMapForm} name="addMap" preserve={false}>
          <Form.Item
            name="name"
            label="地图名称（展示用）"
            rules={[{ required: true, message: "请输入地图名称" }]}
          >
            <Input allowClear placeholder="例：决赛地图" />
          </Form.Item>
          <Form.Item
            name="team_labels"
            label="参战队伍（字符串数组格式）"
            rules={[{ required: true, message: "请输入参战队伍" }]}
          >
            <Input allowClear placeholder='例：["Student", "Tricker"]' />
          </Form.Item>
          <Dragger maxCount={1} beforeUpload={prepareFile} {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">拖拽上传地图文件</p>
            <p className="ant-upload-hint">
              只上传一份最新的文件，默认覆盖旧文件
            </p>
          </Dragger>
        </Form>
      </Modal>
    </Layout>
  );
};

export default UploadMap;
