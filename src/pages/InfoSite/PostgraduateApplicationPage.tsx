import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Table, PageHeader, message, Alert } from "antd";
import { TableProps, TablePaginationConfig } from "antd/lib/table";
import {
  VerifyPostgraduateApplication as VERIFY_POSTGRADUATE_APPLICATION,
  DeletePostgraduateApplication as DELETE_POSTGRADUATE_APPLICATION,
  GetPostgraudateApplicationFeeds as GET_POSTGRADUATE_APPLICATON_FEEDS,
} from "../../api/postgraduate.graphql";
import {
  GetPostgraudateApplicationFeeds_postgraduate_application as applicationInfo,
  GetId,
  GetEmail,
  GetRole,
  VerifyPostgraduateApplication,
  VerifyPostgraduateApplicationVariables,
  DeletePostgraduateApplication,
  DeletePostgraduateApplicationVariables,
  GetPostgraudateApplicationFeeds,
  GetPostgraudateApplicationFeedsVariables,
} from "../../api/types";

const PostgraduateApplicationPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: userData } = useQuery<GetId & GetEmail & GetRole>(gql`
    {
      _id @client
      email @client
      role @client
    }
  `);

  const [verifyApplication, { error: verifyError }] = useMutation<
    VerifyPostgraduateApplication,
    VerifyPostgraduateApplicationVariables
  >(VERIFY_POSTGRADUATE_APPLICATION);

  const [deleteApplication, { error: deleteError }] = useMutation<
    DeletePostgraduateApplication,
    DeletePostgraduateApplicationVariables
  >(DELETE_POSTGRADUATE_APPLICATION);

  const { data, loading, error, refetch: refetchFeeds } = useQuery<
    GetPostgraudateApplicationFeeds,
    GetPostgraudateApplicationFeedsVariables
  >(GET_POSTGRADUATE_APPLICATON_FEEDS, {
    variables: { limit: pageSize, offset: offset },
  });

  useEffect(() => {
    if (error) {
      message.error("申请信息加载失败");
    }
  }, [error]);

  useEffect(() => {
    if (verifyError) {
      message.error("审核失败");
    }
  }, [verifyError]);

  useEffect(() => {
    if (deleteError) {
      message.error("删除失败");
    }
  }, [deleteError]);

  const handlePageChange = (page: number, size?: number) => {
    if (size !== pageSize) setPageSize(size || 10);
    setOffset((page - 1) * (size || 10));
    setCurrent(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setOffset(Math.ceil((current * pageSize) / size - 1) * size);
    setCurrent(Math.ceil((current * pageSize) / size));
  };

  const columns: TableProps<applicationInfo>["columns"] = [
    {
      title: "申请时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return new Date(text).toDateString();
      },
    },
    {
      title: "学生",
      dataIndex: "user",
      key: "user",
      render: (user) => {
        return user.name;
      },
    },
    {
      title: "导师",
      dataIndex: "mentor",
      key: "mentor",
      render: (mentor) => {
        return mentor.mentor;
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return text === "intend"
          ? "有意向"
          : text === "in_contact"
          ? "联络中"
          : "已确认";
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                verifyApplication({
                  variables: {
                    mentor_info_id: record.mentor_info_id,
                    user_id: record.user_id,
                  },
                });
                refetchFeeds();
              }}
            >
              审核通过
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                deleteApplication({
                  variables: {
                    mentor_info_id: record.mentor_info_id,
                    user_id: record.user_id,
                  },
                });
                refetchFeeds();
              }}
            >
              删除申请
            </Button>
          </>
        );
      },
    },
  ];

  const pageConfig: TablePaginationConfig = {
    current: current,
    total: data?.postgraduate_application_aggregate.aggregate?.count!,
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
    hideOnSinglePage: true,
    onChange: handlePageChange,
    onShowSizeChange: handlePageSizeChange,
  };

  return !["root", "counselor"].includes(userData?.role!) ? (
    <>
      <Alert
        message="Warning"
        description="本页面仅限管理人员查看"
        type="warning"
        showIcon
        closable
      />
    </>
  ) : (
    <div>
      <PageHeader
        title="电子系推研信息平台"
        subTitle="学生申请审核"
      ></PageHeader>
      <Table
        columns={columns}
        dataSource={data?.postgraduate_application}
        loading={loading}
        pagination={pageConfig}
        rowKey={(record) => {
          return `${record.mentor_info_id}${record.user_id}`;
        }}
      />
    </div>
  );
};

export default PostgraduateApplicationPage;
