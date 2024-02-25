import React, { useState, useEffect } from "react";
import { PageHeader } from "@ant-design/pro-components";
import {
  Form,
  Input,
  Button,
  Result,
  Table,
  message,
  Descriptions,
  InputNumber,
} from "antd";
import { TableProps, TablePaginationConfig } from "antd/lib/table";
import Modal from "antd/lib/modal/Modal";
import Center from "../Components/Center";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../api/helpers/auth";
import dayjs from "dayjs";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";

const MentorInfoVerifyPage: React.FC = () => {
  const url = useUrl();
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] =
    useState<
      graphql.GetUnverifiedMentorInfoQuery["postgraduate_mentor_info"][0]
    >();
  const [form] = Form.useForm();
  const [showManage, setShowManage] = useState(false);
  const [infoId, setInfoId] = useState(0);

  const userInfo = getUserInfo();

  const [updateInfo, { error: updateError }] =
    graphql.useUpdatePostgraduateInfoMutation();

  const [deleteInfo, { error: deleteError }] =
    graphql.useDeletePostgraduateInfoMutation();

  const [verifyInfo, { error: verifyError }] =
    graphql.useVerifyMentorInfoMutation();

  const columns: TableProps<
    graphql.GetUnverifiedMentorInfoQuery["postgraduate_mentor_info"][0]
  >["columns"] = [
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "修改者",
      key: "editor",
      render: (_, record) => {
        return record.userEditor.name;
      },
    },
    {
      title: "导师",
      dataIndex: "mentor",
      key: "mentor",
    },
    {
      title: "研究所",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "博士名额",
      key: "phd_quota",
      render: (_, record) => {
        return `${record.phd_quota}~${
          record.phd_quota + record.phd_quota_unfixed
        }`;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => {
                setDetail(record);
                setShowDetail(true);
              }}
              type="link"
            >
              详细信息
            </Button>
            <Button
              onClick={() => {
                setShowManage(true);
                setInfoId(record.id);
                form.setFieldsValue(record);
              }}
              hidden={
                !(
                  userInfo?.role === "counselor" ||
                  userInfo?.role === "root" ||
                  userInfo?.role === "teacher"
                )
              }
              type="link"
            >
              更新
            </Button>
            <Button
              onClick={async () => {
                await deleteInfo({ variables: { id: record.id } });
                refetchFeeds();
              }}
              type="link"
              danger
              hidden={
                !(
                  userInfo?.role === "counselor" ||
                  userInfo?.role === "root" ||
                  (userInfo?.role === "teacher" &&
                    userInfo?._id === record.user_id)
                )
              }
            >
              删除
            </Button>
            <Button
              onClick={async () => {
                await verifyInfo({ variables: { id: record.id } });
                refetchFeeds();
              }}
              type="link"
              hidden={
                !(
                  userInfo?.role === "counselor" ||
                  userInfo?.role === "root" ||
                  userInfo?.role === "teacher"
                )
              }
            >
              审核通过
            </Button>
          </>
        );
      },
    },
  ];

  const {
    data,
    loading,
    error,
    refetch: refetchFeeds,
  } = graphql.useGetUnverifiedMentorInfoQuery({
    variables: { limit: pageSize, offset: offset },
  });

  useEffect(() => {
    if (error) {
      message.error("招收信息加载失败");
    }
  }, [error]);

  useEffect(() => {
    if (updateError) {
      message.error("更新信息失败");
    }
  }, [updateError]);

  useEffect(() => {
    if (deleteError) {
      message.error("删除信息失败");
    }
  });

  useEffect(() => {
    if (verifyError) {
      message.error("审核信息失败");
    }
  });

  const handlePageChange = (page: number, size?: number) => {
    if (size !== pageSize) setPageSize(size || 10);
    setOffset((page - 1) * (size || 10));
    setCurrent(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setOffset(Math.ceil((current * pageSize) / size - 1) * size);
    setCurrent(Math.ceil((current * pageSize) / size));
  };

  const pageConfig: TablePaginationConfig = {
    current: current,
    total: data?.postgraduate_mentor_info_aggregate.aggregate?.count!,
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
    hideOnSinglePage: true,
    onChange: handlePageChange,
    onShowSizeChange: handlePageSizeChange,
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }
    const values = form.getFieldsValue([
      "mentor",
      "school",
      "department",
      "field",
      "master_quota",
      "phd_quota",
      "phd_quota_unfixed",
      "contact",
      "alternate_contact",
      "home_page",
      "detail_info",
    ]);

    if (infoId) {
      await updateInfo({
        variables: {
          id: infoId,
          mentor: values["mentor"],
          field: values["field"],
          phd_quota: values["phd_quota"],
          phd_quota_unfixed: values["phd_quota_unfixed"],
          contact: values["contact"],
          alternate_contact: values["alternate_contact"],
          home_page: values["home_page"],
          detail_info: values["detail_info"],
        },
      });
    }
    setShowManage(false);
    refetchFeeds();
  };

  return userInfo?.role === "counselor" ||
    userInfo?.role === "root" ||
    userInfo?.role === "teacher" ? (
    <div>
      <PageHeader
        title="电子系推研信息平台"
        subTitle="导师发布信息审核"
        extra={
          <>
            <Button onClick={() => refetchFeeds()}>刷新</Button>
          </>
        }
      ></PageHeader>
      <Table
        columns={columns}
        dataSource={data?.postgraduate_mentor_info}
        loading={loading}
        pagination={pageConfig}
        rowKey={(record) => {
          return record.id;
        }}
      />
      <Modal
        title="详细信息"
        visible={showDetail}
        onCancel={() => setShowDetail(false)}
        footer={null}
        width="80%"
      >
        <Descriptions>
          <Descriptions.Item label="导师">{detail?.mentor}</Descriptions.Item>
          <Descriptions.Item label="博士名额">
            {`${detail?.phd_quota}-${
              detail?.phd_quota + detail?.phd_quota_unfixed
            }`}
          </Descriptions.Item>
          <Descriptions.Item label="联系方式">
            {detail?.contact}
          </Descriptions.Item>
          <Descriptions.Item label="课题组联系方式">
            {detail?.alternate_contact}
          </Descriptions.Item>
          <Descriptions.Item label="课题组主页" span={2}>
            <a href={detail?.home_page!}>{detail?.home_page}</a>
          </Descriptions.Item>
          <Descriptions.Item label="详细说明" span={3}>
            {detail?.detail_info}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <Modal
        title="添加/更新信息"
        visible={showManage}
        width="60%"
        footer={null}
        onCancel={() => {
          setShowManage(false);
          setInfoId(0);
        }}
      >
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
          <Form.Item
            name="mentor"
            label="导师"
            rules={[{ required: true, message: "请输入导师信息" }]}
          >
            <Input placeholder="导师姓名" />
          </Form.Item>
          <Form.Item
            name="field"
            label="研究所"
            rules={[{ required: true, message: "请输入研究所" }]}
          >
            <Input placeholder="研究所名称，详细信息（研究方向）建议填写在下方“详细信息”处" />
          </Form.Item>
          <Form.Item
            name="phd_quota"
            label="博士名额"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="phd_quota_unfixed"
            label="非固定博士名额"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="contact"
            label="联系方式"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="home_page" label="课题组主页">
            <Input />
          </Form.Item>
          <Form.Item name="alternate_contact" label="课题组联系方式">
            <Input />
          </Form.Item>
          <Form.Item name="detail_info" label="详细信息">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button type="primary" htmlType="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  ) : (
    <Center>
      <Result
        status="403"
        title="403"
        subTitle="您没有权限访问此页面"
        extra={
          <Button type="primary">
            <Link to={url.link("home", "site")}> 返回主页</Link>
          </Button>
        }
      />
    </Center>
  );
};

export default MentorInfoVerifyPage;
