import { useLazyQuery } from "@apollo/client";
import { Button, message, PageHeader, Select } from "antd";
import Search from "antd/lib/input/Search";
import Table, { TableProps } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  GetUserByEmail,
  GetUserByEmailVariables,
  GetUserByEmail_user,
} from "../../api/types";
import { GetUserByEmail as GET_USER_BY_EMAIL } from "../../api/user.graphql";

const RolePage: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [role, setRole] = useState<
    "user" | "student" | "EEsenior" | "teacher" | "counselor" | "root"
  >("user");

  const columns: TableProps<GetUserByEmail_user>["columns"] = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ObjectId",
      dataIndex: "_id",
      key: "objectId",
    },
  ];

  const [
    getUsers,
    { data: userData, loading: userLoading, error: userError },
  ] = useLazyQuery<GetUserByEmail, GetUserByEmailVariables>(GET_USER_BY_EMAIL);

  useEffect(() => {
    if (userError) {
      message.error("获取用户失败");
    }
  }, [userError]);

  const rowSelection = {
    selectedRowKeys: selectedUsers,
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: GetUserByEmail_user[]
    ) => {
      setSelectedUsers(selectedRowKeys.map((v) => v.toString()));
    },
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        backIcon={false}
        title="权限管理"
        subTitle="修改用户权限"
        extra={
          <Search
            placeholder="用户邮箱，使用%进行任意匹配"
            enterButton
            onSearch={(value) => {
              getUsers({ variables: { email: value } });
            }}
          />
        }
      />
      <Table
        columns={columns}
        dataSource={userData?.user}
        loading={userLoading}
        rowSelection={rowSelection}
        rowKey={(record: GetUserByEmail_user) => {
          return record._id;
        }}
      ></Table>
      <Select
        value={role}
        style={{ width: 120 }}
        onChange={(value) => setRole(value)}
      >
        <Select.Option value="user">user</Select.Option>
        <Select.Option value="student">student</Select.Option>
        <Select.Option value="teacher">teacher</Select.Option>
        <Select.Option value="counselor">counselor</Select.Option>
        <Select.Option value="EEsenior">EEsenior</Select.Option>
        <Select.Option value="root">root</Select.Option>
      </Select>
      <Button
        type="primary"
        onClick={async () => {
          try {
            await axios.put("/users/role", {
              _ids: selectedUsers,
              role: role,
            });
            message.success("No err");
          } catch (e) {
            const err = e as AxiosError;
            message.error(err.response?.status);
          }
        }}
      >
        test
      </Button>
    </>
  );
};

export default RolePage;
