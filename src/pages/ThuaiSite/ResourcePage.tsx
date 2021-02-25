import React from "react";
import { List, Button, Empty } from "antd";
import styles from "./ResourcePage.module.css";
const ResourcePage = () => {
  return (
    <div className={styles.root}>
      <List
        //loading={loading}
        itemLayout="horizontal"
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"暂无公告"}
            />
          ),
        }}
        split={false}
        //dataSource={announcements}
        //className={styles.list}
        renderItem={() => <List.Item></List.Item>}
      />
      <Button type={"primary"}>查看更多公告</Button>
    </div>
  );
};
export default ResourcePage;
