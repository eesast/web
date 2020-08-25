import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Form,
  Input,
  Button,
  Table,
  message,
  Descriptions,
  InputNumber,
  PageHeader,
  Select,
  Modal,
  Tag,
} from "antd";
import { TableProps, TablePaginationConfig } from "antd/lib/table";
import {
  GetPostgraduateFeeds as GET_POSTGRADUATE_FEEDS,
  GetSelfPostgraduateApplications as GET_SELF_POSTGRADUATE_APPLICATIONS,
  InsertPostgraduateInfo as INSERT_POSTGRADUATE_INFO,
  UpdatePostgraduateInfo as UPDATE_POSTGRADUATE_INFO,
  DeletePostgraduateInfo as DELETE_POSTGRADUATE_INFO,
  InsertApplication as INSERT_APPLICATION,
  DeletePostgraduateApplication as DELETE_POSTGRADUATE_APPLICATION,
  SetPostAppHistory as SET_POST_APP_HISTORY,
} from "../../api/postgraduate.graphql";
import {
  GetPostgraduateFeeds,
  GetPostgraduateFeedsVariables,
  GetPostgraduateFeeds_postgraduate_mentor_info as mentorInfo,
  GetSelfPostgraduateApplications,
  GetSelfPostgraduateApplicationsVariables,
  GetSelfPostgraduateApplications_postgraduate_application as selfApplication,
  InsertPostgraduateInfo,
  InsertPostgraduateInfoVariables,
  UpdatePostgraduateInfo,
  UpdatePostgraduateInfoVariables,
  DeletePostgraduateInfo,
  DeletePostgraduateInfoVariables,
  InsertApplication,
  InsertApplicationVariables,
  GetId,
  GetEmail,
  GetRole,
  DeletePostgraduateApplication,
  DeletePostgraduateApplicationVariables,
  SetPostAppHistory,
  SetPostAppHistoryVariables,
} from "../../api/types";

const PostgraduateMentorPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState<mentorInfo>();
  const [form] = Form.useForm();
  const [showManage, setShowManage] = useState(false);
  const [infoId, setInfoId] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [showSelfApplications, setShowSelfApplications] = useState(false);
  const [selfApplicationPagination, setSelfApplicationPagination] = useState<{
    current: number;
    offset: number;
    pageSize: number;
    selfApplications: selfApplication[];
  }>({
    current: 1,
    offset: 0,
    pageSize: 10,
    selfApplications: [],
  });

  const { data: userData } = useQuery<GetId & GetEmail & GetRole>(gql`
    {
      _id @client
      email @client
      role @client
    }
  `);

  const [insertInfo, { error: insertError }] = useMutation<
    InsertPostgraduateInfo,
    InsertPostgraduateInfoVariables
  >(INSERT_POSTGRADUATE_INFO);

  const [updateInfo, { error: updateError }] = useMutation<
    UpdatePostgraduateInfo,
    UpdatePostgraduateInfoVariables
  >(UPDATE_POSTGRADUATE_INFO);

  const [deleteInfo, { error: deleteError }] = useMutation<
    DeletePostgraduateInfo,
    DeletePostgraduateInfoVariables
  >(DELETE_POSTGRADUATE_INFO);

  const [insertApplication, { error: insertApplicationError }] = useMutation<
    InsertApplication,
    InsertApplicationVariables
  >(INSERT_APPLICATION);

  const [
    deleteSelfApplication,
    { error: deleteSelfApplicationError },
  ] = useMutation<
    DeletePostgraduateApplication,
    DeletePostgraduateApplicationVariables
  >(DELETE_POSTGRADUATE_APPLICATION);

  const [setAppHistory, { error: setAppHistoryError }] = useMutation<
    SetPostAppHistory,
    SetPostAppHistoryVariables
  >(SET_POST_APP_HISTORY);

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
      title: "报名情况",
      children: [
        {
          title: "有意向",
          key: "intend",
          render: (_, record) => {
            return <>{record.intend.aggregate?.count || 0}</>;
          },
        },
        {
          title: "联络中",
          key: "in_contact",
          render: (_, record) => {
            return <>{record.in_contact.aggregate?.count || 0}</>;
          },
        },
        {
          title: "已确认",
          key: "confirmed",
          render: (_, record) => {
            return <>{record.confirmed.aggregate?.count || 0}</>;
          },
        },
      ],
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
                  userData?.role === "teacher" ||
                  userData?.role === "counselor" ||
                  userData?.role === "root"
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
                  (userData?.role === "teacher" &&
                    userData?._id === record.user_id) ||
                  userData?.role === "counselor" ||
                  userData?.role === "root"
                )
              }
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const selfApplicationColumns: TableProps<selfApplication>["columns"] = [
    {
      title: "申请时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return new Date(text).toDateString();
      },
    },
    {
      title: "审核状态",
      dataIndex: "verified",
      key: "verified",
      render: (verified) => {
        return verified ? (
          <Tag color="green">通过</Tag>
        ) : (
          <Tag color="red">未通过</Tag>
        );
      },
    },
    {
      title: "导师",
      key: "mentor",
      render: (_, record) => {
        return record.mentor.mentor;
      },
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <>
            {/* <Button type="link">修改</Button> */}
            <Button
              type="link"
              danger
              onClick={() => {
                deleteSelfApplication({
                  variables: {
                    mentor_info_id: record.mentor_info_id,
                    user_id: record.user_id,
                  },
                });
                setAppHistory({
                  variables: {
                    mentor_info_id: record.mentor_info_id,
                    user_id: record.user_id,
                    status: "delete",
                  },
                });
                refetchSelfApplications();
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const { data, loading, error, refetch: refetchFeeds } = useQuery<
    GetPostgraduateFeeds,
    GetPostgraduateFeedsVariables
  >(GET_POSTGRADUATE_FEEDS, { variables: { limit: pageSize, offset: offset } });

  const {
    data: selfApplicationData,
    loading: selfApplicationLoading,
    error: selfApplicationError,
    refetch: refetchSelfApplications,
  } = useQuery<
    GetSelfPostgraduateApplications,
    GetSelfPostgraduateApplicationsVariables
  >(GET_SELF_POSTGRADUATE_APPLICATIONS, {
    variables: {
      user_id: userData?._id!,
      limit: selfApplicationPagination.pageSize,
      offset: selfApplicationPagination.offset,
    },
  });

  useEffect(() => {
    if (error) {
      message.error("招收信息加载失败");
    }
  }, [error]);

  useEffect(() => {
    if (insertError || updateError) {
      message.error("添加/更新信息失败");
    }
  }, [insertError, updateError]);

  useEffect(() => {
    if (deleteError || deleteSelfApplicationError) {
      message.error("删除信息失败");
    }
  }, [deleteError, deleteSelfApplicationError]);

  useEffect(() => {
    if (insertApplicationError) {
      message.error("提交申请情况失败");
    }
  }, [insertApplicationError]);

  useEffect(() => {
    if (selfApplicationError) {
      message.error("申请信息加载失败");
    }
  }, [selfApplicationError]);

  useEffect(() => {
    if (setAppHistoryError) {
      message.error("记录操作历史失败");
    }
  }, [setAppHistoryError]);

  const handlePageChange = (page: number, size?: number) => {
    if (size !== pageSize) setPageSize(size || 10);
    setOffset((page - 1) * (size || 10));
    setCurrent(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setOffset(Math.ceil((current * pageSize) / size - 1) * size);
    setCurrent(Math.ceil((current * pageSize) / size));
  };

  const handleSelfApplicationPageChange = (page: number, size?: number) => {
    if (size !== pageSize)
      setSelfApplicationPagination({
        ...selfApplicationPagination,
        pageSize: size || 10,
      });
    setSelfApplicationPagination({
      ...selfApplicationPagination,
      offset: (page - 1) * (size || 10),
      current: page,
    });
  };

  const handleSelfApplicationPageSizeChange = (
    current: number,
    size: number
  ) => {
    setSelfApplicationPagination({
      ...selfApplicationPagination,
      offset: Math.ceil((current * pageSize) / size - 1) * size,
      current: Math.ceil((current * pageSize) / size),
    });
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

  const selfApplicationPageConfig: TablePaginationConfig = {
    current: selfApplicationPagination.current,
    total: selfApplicationData?.postgraduate_application_aggregate.aggregate
      ?.count!,
    pageSize: selfApplicationPagination.pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
    hideOnSinglePage: true,
    onChange: handleSelfApplicationPageChange,
    onShowSizeChange: handleSelfApplicationPageSizeChange,
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }
    const values = form.getFieldsValue([
      "mentor",
      "field",
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
    } else {
      await insertInfo({
        variables: {
          mentor: values["mentor"],
          field: values["field"],
          phd_quota: values["phd_quota"],
          contact: values["contact"],
          alternate_contact: values["alternate_contact"],
          home_page: values["home_page"],
          detail_info: values["detail_info"],
          user_id: userData?._id!,
        },
      });
    }
    setShowManage(false);
    message.info("已提交信息，请等待辅导员审核");
    refetchFeeds();
  };

  return (
    <div>
      <PageHeader
        title="电子系推研信息平台"
        subTitle="信息仅供参考 名额数量0.5代表竞争名额"
        extra={
          <>
            <Button
              onClick={() => {
                refetchFeeds();
                refetchSelfApplications();
              }}
            >
              刷新
            </Button>
            <Button
              hidden={!(userData?.role === "EEsenior")}
              onClick={() => {
                setShowSelfApplications(true);
              }}
            >
              我的申请
            </Button>
            <Button
              type="primary"
              hidden={
                !(
                  userData?.role === "teacher" ||
                  userData?.role === "counselor" ||
                  userData?.role === "root"
                )
              }
              onClick={() => {
                form.resetFields();
                setShowManage(true);
                setInfoId(0);
              }}
            >
              发布信息
            </Button>
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
          <Descriptions.Item label="研究所">{detail?.field}</Descriptions.Item>
          <Descriptions.Item label="博士名额">
            {detail?.phd_quota}
          </Descriptions.Item>
          <Descriptions.Item label="联系方式">
            {detail?.contact}
          </Descriptions.Item>
          <Descriptions.Item label="课题组联系方式">
            {detail?.alternate_contact}
          </Descriptions.Item>
          <Descriptions.Item label="课题组主页">
            <a href={detail?.home_page!}>{detail?.home_page}</a>
          </Descriptions.Item>
          <Descriptions.Item label="详细说明">
            {detail?.detail_info}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions column={2}>
          <Descriptions.Item label="有意向学生">
            {detail?.intend.aggregate?.count}人
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {new Date(detail?.intend.aggregate?.max?.updated_at).toDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="联络中学生">
            {detail?.in_contact.aggregate?.count}人
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {new Date(
              detail?.in_contact.aggregate?.max?.updated_at
            ).toDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="已确认学生">
            {detail?.confirmed.aggregate?.count}人
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {new Date(
              detail?.confirmed.aggregate?.max?.updated_at
            ).toDateString()}
          </Descriptions.Item>
        </Descriptions>
        {/* {userData?.role === "EEsenior" ? ( */}
        <div>
          <Select
            style={{ width: 120 }}
            onSelect={(value: string) => {
              setApplicationStatus(value);
            }}
            disabled={!(userData?.role === "EEsenior")}
          >
            <Select.Option value="intend">有意向</Select.Option>
            <Select.Option value="in_contact">联络中</Select.Option>
            <Select.Option value="confirmed">已确认</Select.Option>
          </Select>
          <Button
            type="primary"
            onClick={() => {
              insertApplication({
                variables: {
                  mentor_info_id: detail?.id!,
                  user_id: userData?._id!,
                  status: applicationStatus,
                  verified: applicationStatus === "confirmed" ? false : true,
                },
              });
              setAppHistory({
                variables: {
                  mentor_info_id: detail?.id!,
                  user_id: userData?._id!,
                  status:
                    applicationStatus === "confirmed"
                      ? "confirmed_unverified"
                      : applicationStatus,
                },
              });
              applicationStatus === "confirmed"
                ? message.info("已提交申请情况，请等待辅导员审核")
                : message.success("提交成功");
            }}
            disabled={!(userData?.role === "EEsenior")}
          >
            提交申请
          </Button>
        </div>
        {/* ) : null} */}
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
          <Form.Item name="phd_quota" label="博士名额">
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
      <Modal
        title="我的申请"
        visible={showSelfApplications}
        footer={null}
        width="60%"
        onCancel={() => {
          setShowSelfApplications(false);
        }}
      >
        <Table
          columns={selfApplicationColumns}
          dataSource={selfApplicationData?.postgraduate_application}
          loading={selfApplicationLoading}
          pagination={selfApplicationPageConfig}
          rowKey={(record) => {
            return record.created_at;
          }}
        />
      </Modal>
    </div>
  );
};

export default PostgraduateMentorPage;
