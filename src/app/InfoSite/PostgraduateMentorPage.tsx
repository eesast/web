import React, { useState, useEffect } from "react";
import { PageHeader } from "@ant-design/pro-components";
import {
  Form,
  Input,
  Button,
  Table,
  Typography,
  Space,
  message,
  Descriptions,
  InputNumber,
  Select,
  Modal,
  Tag,
} from "antd";
import { TableProps, TablePaginationConfig } from "antd/lib/table";
import { getUserInfo } from "../../api/helpers/auth";
import dayjs from "dayjs";
import * as graphql from "@/generated/graphql";

const { Text } = Typography;

const PostgraduateMentorPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] =
    useState<
      graphql.GetPostgraduateFeedsQuery["postgraduate_mentor_info"][0]
    >();
  const [form] = Form.useForm();
  const [showManage, setShowManage] = useState(false);
  const [infoId, setInfoId] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [showSelfApplications, setShowSelfApplications] = useState(false);
  const [selfApplicationPagination, setSelfApplicationPagination] = useState<{
    current: number;
    offset: number;
    pageSize: number;
    selfApplications: graphql.GetSelfPostgraduateApplicationsQuery["postgraduate_application"];
  }>({
    current: 1,
    offset: 0,
    pageSize: 10,
    selfApplications: [],
  });

  const userInfo = getUserInfo();

  const [insertInfo, { error: insertError }] =
    graphql.useInsertPostgraduateInfoMutation();

  const [updateInfo, { error: updateError }] =
    graphql.useUpdatePostgraduateInfoMutation();

  const [deleteInfo, { error: deleteError }] =
    graphql.useDeletePostgraduateInfoMutation();

  const [insertApplication, { error: insertApplicationError }] =
    graphql.useInsertApplicationMutation();

  const [deleteSelfApplication, { error: deleteSelfApplicationError }] =
    graphql.useDeletePostgraduateApplicationMutation();

  const [setAppHistory, { error: setAppHistoryError }] =
    graphql.useSetPostAppHistoryMutation();

  const columns: TableProps<
    graphql.GetPostgraduateFeedsQuery["postgraduate_mentor_info"][0]
  >["columns"] = [
    {
      title: "发布时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD");
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
        return (
          <>{`${record.phd_quota}~${
            record.phd_quota + record.phd_quota_unfixed
          }`}</>
        );
      },
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
                  userInfo?.role === "teacher" ||
                  userInfo?.role === "counselor" ||
                  userInfo?.role === "root"
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
                  (userInfo?.role === "teacher" &&
                    userInfo?._id === record.user_id) ||
                  userInfo?.role === "counselor" ||
                  userInfo?.role === "root"
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

  const selfApplicationColumns: TableProps<
    graphql.GetSelfPostgraduateApplicationsQuery["postgraduate_application"][0]
  >["columns"] = [
    {
      title: "申请时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "审核状态",
      key: "verified",
      render: (_, record) => {
        return record.verified ? (
          <Tag color="green">通过</Tag>
        ) : record.history[0].status === "confirmed_unverified" ? (
          <Tag color="lime">审核中</Tag>
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

  const {
    data,
    loading,
    error,
    refetch: refetchFeeds,
  } = graphql.useGetPostgraduateFeedsQuery({
    variables: { limit: pageSize, offset: offset },
  });

  const {
    data: selfApplicationData,
    loading: selfApplicationLoading,
    error: selfApplicationError,
    refetch: refetchSelfApplications,
  } = graphql.useGetSelfPostgraduateApplicationsQuery({
    variables: {
      user_id: userInfo?._id!,
      limit: selfApplicationPagination.pageSize,
      offset: selfApplicationPagination.offset,
    },
  });

  const {
    data: selfConfirmedApplicationData,
    error: selfConfirmedApplicationError,
    refetch: getSelfConfirmedApplication,
  } = graphql.useGetSelfConfirmedApplicationQuery({
    variables: {
      user_id: userInfo?._id!,
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
    if (selfApplicationError || selfConfirmedApplicationError) {
      message.error("申请信息加载失败");
    }
  }, [selfApplicationError, selfConfirmedApplicationError]);

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
    size: number,
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
    total:
      selfApplicationData?.postgraduate_application_aggregate.aggregate?.count!,
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
    } else {
      await insertInfo({
        variables: {
          mentor: values["mentor"],
          field: values["field"],
          phd_quota: values["phd_quota"],
          phd_quota_unfixed: values["phd_quota_unfixed"],
          contact: values["contact"],
          alternate_contact: values["alternate_contact"],
          home_page: values["home_page"],
          detail_info: values["detail_info"],
          user_id: userInfo?._id!,
        },
      });
    }
    setShowManage(false);
    message.info("已提交信息");
    refetchFeeds();
  };

  return (
    <div>
      <PageHeader
        title="电子系推研信息平台"
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
              hidden={!(userInfo?.role === "EEsenior")}
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
                  userInfo?.role === "teacher" ||
                  userInfo?.role === "counselor" ||
                  userInfo?.role === "root"
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
      <Space direction="vertical" size={1}>
        <Text type="secondary">
          注意：导师名额信息仅供参考，以最终推研通知为准
        </Text>
        <Text type="secondary">
          导师博士名额初始值为-1~-1，分别为固定名额和竞争名额，未更新导师可参考往年招生情况
        </Text>
      </Space>
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
        open={showDetail}
        onCancel={() => setShowDetail(false)}
        footer={null}
        width="80%"
      >
        <Descriptions>
          <Descriptions.Item label="导师">{detail?.mentor}</Descriptions.Item>
          <Descriptions.Item label="研究所">{detail?.field}</Descriptions.Item>
          <Descriptions.Item label="博士名额">
            {`${detail?.phd_quota}~${
              detail?.phd_quota + detail?.phd_quota_unfixed
            }`}
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
            {dayjs(
              detail?.intend.aggregate?.max?.updated_at || undefined,
            ).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="联络中学生">
            {detail?.in_contact.aggregate?.count}人
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {dayjs(
              detail?.in_contact.aggregate?.max?.updated_at || undefined,
            ).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="已确认学生">
            {detail?.confirmed.aggregate?.count}人
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {dayjs(
              detail?.confirmed.aggregate?.max?.updated_at || undefined,
            ).format("YYYY-MM-DD")}
          </Descriptions.Item>
        </Descriptions>
        {/* {userData?.role === "EEsenior" ? ( */}
        <div>
          <Select
            style={{ width: 120 }}
            onSelect={(value: string) => {
              setApplicationStatus(value || "intend");
            }}
            disabled={!(userInfo?.role === "EEsenior")}
          >
            <Select.Option value="intend">有意向</Select.Option>
            <Select.Option value="in_contact">联络中</Select.Option>
            <Select.Option value="confirmed">已确认</Select.Option>
          </Select>
          <Button
            type="primary"
            onClick={async () => {
              console.log("提交");
              console.log(selfConfirmedApplicationData);
              if (
                applicationStatus === "confirmed" &&
                selfConfirmedApplicationData?.postgraduate_application
                  .length !== 0
              ) {
                console.log("有已确认");
                await deleteSelfApplication({
                  variables: {
                    mentor_info_id:
                      selfConfirmedApplicationData?.postgraduate_application[0]
                        .mentor_info_id!,
                    user_id: userInfo?._id!,
                  },
                });
              }
              console.log("尝试插入");
              await insertApplication({
                variables: {
                  mentor_info_id: detail?.id!,
                  user_id: userInfo?._id!,
                  status: applicationStatus,
                  verified: applicationStatus === "confirmed" ? false : true,
                },
              });
              await setAppHistory({
                variables: {
                  mentor_info_id: detail?.id!,
                  user_id: userInfo?._id!,
                  status:
                    applicationStatus === "confirmed"
                      ? "confirmed_unverified"
                      : applicationStatus,
                },
              });
              await getSelfConfirmedApplication();
              applicationStatus === "confirmed"
                ? message.info("已提交申请情况，请等待辅导员和老师审核")
                : message.success("提交成功");
            }}
            disabled={!(userInfo?.role === "EEsenior")}
          >
            提交申请
          </Button>
        </div>
        {/* ) : null} */}
      </Modal>
      <Modal
        title="添加/更新信息"
        open={showManage}
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
            label="固定博士名额"
            initialValue={-1}
            help={
              <>
                教师可根据<b>往年名额信息</b>填写，该信息<b>仅供同学参考</b>
                <br />
                若已经确定
                <b>外校同学</b>
                或者<b>存在教师间名额协商</b>，请在<b>详细信息</b>中注明
              </>
            }
          >
            <InputNumber min={-1} />
          </Form.Item>
          <Form.Item
            name="phd_quota_unfixed"
            label="非固定博士名额"
            initialValue={0}
            help={
              <>
                学生端显示效果为<b>固定博士名额~总名额</b>，本项为两者差值
              </>
            }
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
      <Modal
        title="我的申请"
        open={showSelfApplications}
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
