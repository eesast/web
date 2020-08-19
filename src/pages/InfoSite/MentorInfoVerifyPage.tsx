import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Form,
  Input,
  Button,
  Result,
  Table,
  message,
  Descriptions,
  InputNumber,
  PageHeader,
} from "antd";
import { TableProps, TablePaginationConfig } from "antd/lib/table";
import {
  GetUnverifiedMentorInfo as GET_UNVERIFIED_MENTOR_INFO,
  UpdatePostgraduateInfo as UPDATE_POSTGRADUATE_INFO,
  DeletePostgraduateInfo as DELETE_POSTGRADUATE_INFO,
  VerifyMentorInfo as VERIFY_MENTOR_INFO,
} from "../../api/postgraduate.graphql";
import {
  GetUnverifiedMentorInfo,
  GetUnverifiedMentorInfoVariables,
  GetUnverifiedMentorInfo_postgraduate_mentor_info as mentorInfo,
  UpdatePostgraduateInfo,
  UpdatePostgraduateInfoVariables,
  DeletePostgraduateInfo,
  DeletePostgraduateInfoVariables,
  VerifyMentorInfo,
  VerifyMentorInfoVariables,
  GetId,
  GetEmail,
  GetRole,
} from "../../api/types";
import Modal from "antd/lib/modal/Modal";
import Center from "../../components/Center";
import { Link } from "react-router-dom";

const MentorInfoVerifyPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState<mentorInfo>();
  const [form] = Form.useForm();
  const [showManage, setShowManage] = useState(false);
  const [infoId, setInfoId] = useState(0);

  const { data: userData } = useQuery<GetId & GetEmail & GetRole>(gql`
    {
      _id @client
      email @client
      role @client
    }
  `);

  const [updateInfo, { error: updateError }] = useMutation<
    UpdatePostgraduateInfo,
    UpdatePostgraduateInfoVariables
  >(UPDATE_POSTGRADUATE_INFO);

  const [deleteInfo, { error: deleteError }] = useMutation<
    DeletePostgraduateInfo,
    DeletePostgraduateInfoVariables
  >(DELETE_POSTGRADUATE_INFO);

  const [verifyInfo, { error: verifyError }] = useMutation<
    VerifyMentorInfo,
    VerifyMentorInfoVariables
  >(VERIFY_MENTOR_INFO);

  const columns: TableProps<mentorInfo>["columns"] = [
    {
      title: "发布时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return new Date(text).toDateString();
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
      dataIndex: "phd_quota",
      key: "phd_quota",
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
                  userData?.role === "counselor" ||
                  userData?.role === "root" ||
                  (userData?.role === "teacher" &&
                    userData?._id === record.user_id)
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
                  userData?.role === "counselor" ||
                  userData?.role === "root" ||
                  (userData?.role === "teacher" &&
                    userData?._id === record.user_id)
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
                !(userData?.role === "counselor" || userData?.role === "root")
              }
            >
              审核通过
            </Button>
          </>
        );
      },
    },
  ];

  const { data, loading, error, refetch: refetchFeeds } = useQuery<
    GetUnverifiedMentorInfo,
    GetUnverifiedMentorInfoVariables
  >(GET_UNVERIFIED_MENTOR_INFO, {
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

  return userData?.role === "counselor" ||
    userData?.role === "root" ||
    userData?.role === "teacher" ? (
    <div>
      <PageHeader
        title="电子系推研信息平台"
        subTitle="导师发布信息审核"
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
            {detail?.phd_quota}
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
            <Link to="/home"> 返回主页</Link>
          </Button>
        }
      />
    </Center>
  );
};

export default MentorInfoVerifyPage;
