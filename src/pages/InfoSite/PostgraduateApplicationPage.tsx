import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button, Table, PageHeader, message, Alert, Switch, Tag } from "antd";
import { TableProps, TablePaginationConfig } from "antd/lib/table";
import {
  VerifyPostgraduateApplication as VERIFY_POSTGRADUATE_APPLICATION,
  DeletePostgraduateApplication as DELETE_POSTGRADUATE_APPLICATION,
  GetPostgraduateApplicationFeeds as GET_POSTGRADUATE_APPLICATON_FEEDS,
  GetPostAppHistory as GET_POST_APP_HISTORY,
  SetPostAppHistory as SET_POST_APP_HISTORY,
} from "../../api/postgraduate.graphql";
import {
  GetPostgraduateApplicationFeeds_postgraduate_application as applicationInfo,
  GetPostAppHistory_postgraduate_application_history as applicationHistory,
  VerifyPostgraduateApplication,
  VerifyPostgraduateApplicationVariables,
  DeletePostgraduateApplication,
  DeletePostgraduateApplicationVariables,
  GetPostgraduateApplicationFeeds,
  GetPostgraduateApplicationFeedsVariables,
  GetPostAppHistory,
  GetPostAppHistoryVariables,
  SetPostAppHistory,
  SetPostAppHistoryVariables,
} from "../../api/types";
import { getUserInfo } from "../../helpers/auth";

const PostgraduateApplicationPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [history, setHistory] = useState(false);

  const userInfo = getUserInfo();

  const [verifyApplication, { error: verifyError }] = useMutation<
    VerifyPostgraduateApplication,
    VerifyPostgraduateApplicationVariables
  >(VERIFY_POSTGRADUATE_APPLICATION);

  const [deleteApplication, { error: deleteError }] = useMutation<
    DeletePostgraduateApplication,
    DeletePostgraduateApplicationVariables
  >(DELETE_POSTGRADUATE_APPLICATION);

  const [setAppHistory, { error: setAppHistoryError }] = useMutation<
    SetPostAppHistory,
    SetPostAppHistoryVariables
  >(SET_POST_APP_HISTORY);

  const { data, loading, error, refetch: refetchFeeds } = useQuery<
    GetPostgraduateApplicationFeeds,
    GetPostgraduateApplicationFeedsVariables
  >(GET_POSTGRADUATE_APPLICATON_FEEDS, {
    variables: { limit: pageSize, offset: offset },
  });

  const {
    data: historyData,
    loading: historyLoading,
    error: historyError,
    refetch: refetchHistory,
  } = useQuery<GetPostAppHistory, GetPostAppHistoryVariables>(
    GET_POST_APP_HISTORY,
    { variables: { limit: pageSize, offset: offset } }
  );

  useEffect(() => {
    if (error || historyError) {
      message.error("申请信息加载失败");
    }
  }, [error, historyError]);

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

  const handleHistorySwitchChange = (checked: boolean, event: Event) => {
    setHistory(checked);
    setOffset(0);
    setPageSize(10);
    setCurrent(1);
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
        return text === "intend" ? (
          <Tag>有意向</Tag>
        ) : text === "in_contact" ? (
          <Tag>联络中</Tag>
        ) : text === "confirmed_unverified" ? (
          <Tag color="lime">已确认（未审核）</Tag>
        ) : (
          <Tag color="green">已确认（通过）</Tag>
        );
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
                setAppHistory({
                  variables: {
                    mentor_info_id: record.mentor_info_id,
                    user_id: record.user_id,
                    status: "confirmed_verified",
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
                setAppHistory({
                  variables: {
                    mentor_info_id: record.mentor_info_id,
                    user_id: record.user_id,
                    status: "delete",
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

  const historyColumns: TableProps<applicationHistory>["columns"] = [
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
        return text === "intend" ? (
          <Tag>有意向</Tag>
        ) : text === "in_contact" ? (
          <Tag>联络中</Tag>
        ) : text === "confirmed_unverified" ? (
          <Tag color="lime">已确认（未审核）</Tag>
        ) : (
          <Tag color="green">已确认（通过）</Tag>
        );
      },
    },
  ];

  const pageConfig: TablePaginationConfig = {
    current: current,
    total: history
      ? historyData?.postgraduate_application_history_aggregate.aggregate
          ?.count!
      : data?.postgraduate_application_aggregate.aggregate?.count!,
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
    hideOnSinglePage: true,
    onChange: handlePageChange,
    onShowSizeChange: handlePageSizeChange,
  };

  return !["root", "counselor"].includes(userInfo?.role!) ? (
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
        extra={
          <>
            <Switch
              checkedChildren="查看申请历史"
              unCheckedChildren="查看待审核者"
              checked={history}
              onChange={handleHistorySwitchChange}
            />
            <Button
              onClick={() => {
                if (history) refetchHistory();
                else refetchFeeds();
              }}
            >
              刷新
            </Button>
          </>
        }
      ></PageHeader>
      {history ? (
        <Table
          columns={historyColumns}
          dataSource={historyData?.postgraduate_application_history}
          loading={historyLoading}
          pagination={pageConfig}
          rowKey={(record) => {
            return `${record.mentor_info_id}${record.user_id}${record.created_at}`;
          }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={data?.postgraduate_application}
          loading={loading}
          pagination={pageConfig}
          rowKey={(record) => {
            return `${record.mentor_info_id}${record.user_id}`;
          }}
        />
      )}
    </div>
  );
};

export default PostgraduateApplicationPage;
