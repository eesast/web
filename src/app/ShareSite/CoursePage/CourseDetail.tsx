// 课程详情页面只有课程管理员可以编辑，普通学生只能查看
import React, { useState, useRef } from "react";
import Markdown from "react-markdown";
import {
  Badge,
  Button,
  Card,
  Drawer,
  Space,
  Modal,
  message,
  Typography,
  Input,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { CourseProps } from ".";
import * as graphql from "@/generated/graphql";
import { ProColumns, ProTable } from "@ant-design/pro-components";

/* ---------------- 接口和类型定义 ---------------- */
/* ---------------- 不随渲染刷新的常量 ---------------- */
/* ---------------- 不随渲染刷新的组件 ---------------- */
/* ---------------- 主页面 ---------------- */
const CourseDetail: React.FC<CourseProps> = ({
  course_uuid,
  mode,
  user,
  isManager,
}: any) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  const actionRef = useRef<any>("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [addInfoModalVisible, setAddInfoModalVisible] = useState(false);
  const [updateInfoModalVisible, setUpdateInfoModalVisible] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [currentRow, setCurrentRow] = useState<any>();

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { refetch: refetchCourseInfo } = graphql.useGetCourseInfoQuery({
    variables: {
      course_uuid: course_uuid,
    },
  });
  const [addCourseInfo] = graphql.useAddCourseInfoMutation();
  const [deleteCourseInfo] = graphql.useDeleteCourseInfoMutation(); // 这个函数名字后续可以改一下

  const columns: ProColumns<graphql.GetCourseInfoQuery["course_info"][0]>[] = [
    {
      title: "项目",
      dataIndex: "key",
      key: "key",
      render: (dom: React.ReactNode, entity: any) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          <Markdown>{entity.key}</Markdown>
        </div>
      ),
    },
    {
      title: "内容",
      dataIndex: "value",
      key: "value",
      render: (dom: React.ReactNode, entity: any) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {entity.value && entity.value.startsWith("http") ? (
            <a href={entity.value} target="_blank" rel="noopener noreferrer">
              {entity.value}
            </a>
          ) : (
            <Markdown>{entity.value || ""}</Markdown>
          )}
        </div>
      ),
    },
    {
      title: "操作",
      valueType: "option",
      width: "20%",
      key: "option",
      hideInTable: !isManager,
      render: (_, row) => {
        return isManager ? (
          <Space size="middle">
            <Button
              type="link"
              onClick={() => {
                setCurrentRow(row);
                setNewKey(row.key);
                setNewValue(String(row.value));
                setUpdateInfoModalVisible(true);
              }}
            >
              修改
            </Button>
            <Button type="link" onClick={() => showDeleteConfirm(row)}>
              删除
            </Button>
          </Space>
        ) : null;
      },
    },
  ];

  /* ---------------- 业务逻辑函数 ---------------- */

  const dataRequest = async (params: {
    pageSize?: number;
    current?: number;
    [key: string]: any;
  }): Promise<{
    data: graphql.GetCourseInfoQuery["course_info"];
    success: boolean;
    total?: number;
  }> => {
    //console.log(params);
    const { data, error } = await refetchCourseInfo();
    if (error) {
      message.error("课程加载失败");
      console.log(error.message);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
    const filteredData = data.course_info.filter((course_info) => {
      return (
        (!params.key ||
          course_info.key.toLowerCase().includes(params.key.toLowerCase())) &&
        (!params.value ||
          (course_info.value &&
            course_info.value
              .toLowerCase()
              .includes(params.professor.toLowerCase())))
      );
    });

    // 处理分页
    const startIndex = (params.current! - 1) * params.pageSize!;
    const endIndex = startIndex + params.pageSize!;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      success: true,
      total: filteredData.length,
    };
  };

  const handleUpdateCourseInfo = async (row: any) => {
    try {
      await deleteCourseInfo({
        variables: {
          course_id: course_uuid,
          key: row?.key,
        },
      });
      await addCourseInfo({
        variables: {
          key: newKey,
          value: newValue,
          course_id: course_uuid,
        },
      });
      setNewKey("");
      setNewValue("");
      setUpdateInfoModalVisible(false);
      handleGetCourseDetail();
      message.success("详情已更新");
    } catch (error) {
      message.error("详情更新失败");
      console.log(error);
    }
  };
  const { confirm } = Modal;
  const showDeleteConfirm = (row: any) => {
    confirm({
      title: "确认删除?",
      icon: <ExclamationCircleOutlined />,
      content: "删除后将无法恢复",
      okText: "是的",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        handleDelete(row);
      },
      onCancel() {
        console.log("取消删除操作");
      },
    });
  };

  const handleDelete = async (row: any) => {
    try {
      await deleteCourseInfo({
        variables: {
          course_id: course_uuid,
          key: row.key,
        },
      });
      message.success("删除成功");
      handleGetCourseDetail();
    } catch (error) {
      message.error("删除失败");
      console.log(error);
    }
  };

  const handleAddCourseInfo = async (parent_uuid?: string) => {
    try {
      await addCourseInfo({
        variables: {
          key: newKey,
          value: newValue,
          course_id: course_uuid,
        },
      });
      setNewKey("");
      setNewValue("");
      setAddInfoModalVisible(false);
      handleGetCourseDetail();
      message.success("详情已经添加");
    } catch (error) {
      console.error("Error adding comments: ", error);
    }
  };

  const handleGetCourseDetail = async () => {
    setIsRotating(true);
    const { data, error } = await refetchCourseInfo({ course_uuid });
    setTimeout(() => setIsRotating(false), 500);
    if (error) {
      message.error("获取详情失败");
      console.log(error);
      return;
    }
    if (data) {
      actionRef.current?.reload();
    } else {
      message.error("获取详情失败");
    }
  };

  /* ---------------- 页面组件 ---------------- */
  return (
    <>
      <Badge>
        <Button
          type="primary"
          onClick={() => setOpenDrawer(true)}
          className="action-button"
        >
          详情
        </Button>
      </Badge>
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "26px" }}>课程详情</span>
            <Space>
              <Button
                size="large"
                type="link"
                icon={
                  <ReloadOutlined
                    style={{
                      fontSize: "20px",
                      color: "#1890ff",
                      transition: "transform 0.5s ease",
                      transform: isRotating ? "rotate(360deg)" : "rotate(0deg)",
                    }}
                  />
                }
                onClick={handleGetCourseDetail}
              />
              {isManager ? (
                <Button
                  type="link"
                  icon={
                    <PlusOutlined
                      style={{ fontSize: "1.5em", color: "#1890ff" }}
                    />
                  }
                  onClick={() => setAddInfoModalVisible(true)}
                />
              ) : null}
            </Space>
          </div>
        }
        width={600}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        key="course_info"
      >
        <Card
          hoverable
          title={
            <span style={{ fontSize: "23px", fontWeight: "bold" }}>
              详情说明
            </span>
          }
          style={{
            padding: "15px",
          }}
        >
          <Typography.Text>
            <span style={{ fontSize: "18px", lineHeight: 1.8 }}>
              课程详情旨在帮助同学们更好地了解课程情况，为选课提供参考，内容具体到上课是否签到以及该课程的云盘链接等等...
            </span>
          </Typography.Text>
          <ProTable<graphql.GetCourseInfoQuery["course_info"][0]>
            columns={columns}
            request={dataRequest}
            rowKey="uuid"
            actionRef={actionRef}
            pagination={{
              showQuickJumper: true,
            }}
            search={{
              labelWidth: "auto",
            }}
            dateFormatter="string"
            headerTitle="详情列表"
          />
        </Card>
      </Drawer>
      <Modal
        title="添加详情"
        centered
        open={addInfoModalVisible}
        onOk={() => {
          if (newKey && newValue) handleAddCourseInfo();
        }}
        onCancel={() => setAddInfoModalVisible(false)}
      >
        项目:
        <Input.TextArea
          placeholder="请输入"
          rows={2}
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        内容:
        <Input.TextArea
          placeholder="请输入"
          rows={2}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      </Modal>
      <Modal
        title="修改详情"
        centered
        open={updateInfoModalVisible}
        onOk={() => handleUpdateCourseInfo(currentRow)}
        onCancel={() => setUpdateInfoModalVisible(false)}
      >
        项目:
        <Input.TextArea
          placeholder="项目"
          rows={2}
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        内容:
        <Input.TextArea
          placeholder="内容"
          rows={2}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default CourseDetail;
