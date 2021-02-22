import { useLazyQuery } from "@apollo/client";
import { Button, PageHeader } from "antd";
import Search from "antd/lib/input/Search";
import Table, { TableProps } from "antd/lib/table";
import React, { useState } from "react";
import {
  GetUserByEmail,
  GetUserByEmailVariables,
  GetUserByEmail_user,
} from "../../api/types";
import { GetUserByEmail as GET_USER_BY_EMAIL } from "../../api/user.graphql";

const RolePage: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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
      <Button onClick={() => console.log(selectedUsers)}>test</Button>
    </>
  );
};

export default RolePage;
