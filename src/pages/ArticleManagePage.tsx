import { IUser, IArticle, IAppState } from "../redux/types/state";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  Tag,
  Divider,
  Table,
  Descriptions,
  Switch,
  Form,
  Icon,
  message
} from "antd";
import api from "../api";
import { PaginationConfig } from "antd/lib/table";
import styles from "./ArticleManagePage.module.css";

interface IArticleManagePageStateProps {
  user: IUser;
}

interface IArticleManagePageDispatchProps {}

type IArticleManagePageProps = IArticleManagePageStateProps &
  IArticleManagePageDispatchProps;

const ArticleManagePage: React.FC<IArticleManagePageProps> = props => {
  const { user } = props;

  const [showCreatedAt, setShowCreatedAt] = useState(false);

  const [data, setData] = useState<IArticle[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [visible, setVisible] = useState(true); // 文章可见性 true | false 全都显示 | 部分显示
  const [activeRow, setActiveRow] = useState("");
  const [operation, setOperation] = useState(true); // 用来起到刷新页面的作用
  const [category, setCategory] = useState<"author" | "promulgator">("author");
  const [totalArticles, setTotalArticles] = useState(0);

  const handleDelete = async (record: IArticle) => {
    await api.deleteArticle(record.id);
    message.success("删除成功");
    setOperation(!operation);
  };

  const handlePrivate = async (record: IArticle) => {
    await api.updateArticleVisibility(record.id, false);
    setOperation(!operation);
  };

  const handlePublic = async (record: IArticle) => {
    if (record.tags.includes("underReview")) {
      message.error("文章正在审核中，无法公开");
      return;
    }
    await api.updateArticleVisibility(record.id, true);
    setOperation(!operation);
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: string[]) => (
        <span>
          {tags.map(tag => {
            let color = tag === "underReview" ? "red" : "blue";
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: "Edit Time",
      key: "editTime",
      dataIndex: showCreatedAt ? "createdAt" : "updatedAt"
    },
    {
      title: "Action",
      key: "action",
      render: (record: IArticle) => (
        <span>
          <Link to={`/weekly/articles/${record.alias}`}>View</Link>
          <Divider type="vertical" />
          {visible ? (
            <a
              onClick={() => {
                handlePrivate(record);
              }}
            >
              Make Private
            </a>
          ) : (
            <a
              onClick={() => {
                handlePublic(record);
              }}
            >
              Make Public
            </a>
          )}
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleDelete(record);
            }}
          >
            Delete
          </a>
        </span>
      )
    }
  ];

  const changePage = (currentPage: number, nextPageSize?: number) => {
    setPageNumber(currentPage);
    if (nextPageSize) setPageSize(nextPageSize);
  };

  const changePageSize = (current: number, nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPageNumber(current);
  };

  const pagination: PaginationConfig = {
    total: totalArticles,
    current: pageNumber,
    pageSize: pageSize,
    showSizeChanger: true,
    onChange: changePage,
    onShowSizeChange: changePageSize,
    pageSizeOptions: ["5", "10", "20"],
    showTotal: (total: number) => (
      <div style={{ display: "inline-block" }}>{`总共${total}篇文章`}</div>
    )
  };

  useEffect(() => {
    // 获取文章总数
    const fetchData = async () => {
      if (category === "author") {
        const response = await api.getSelfArticleNum(user.id, visible);
        setTotalArticles(response);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    // 获取文章
    const fetchData = async () => {
      const response = await api.getSelfArticles(
        user.id,
        visible,
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize
      );
      setData(response);
    };

    fetchData();
  }, [pageNumber, pageSize, visible, operation]);

  const handleClick = (record: IArticle) => {
    if (activeRow === String(record.id)) setActiveRow("");
    else setActiveRow(String(record.id));
  };

  const handleExpand = (expanded: boolean, record: IArticle) => {
    if (activeRow === String(record.id)) setActiveRow("");
    else setActiveRow(String(record.id));
  };

  return (
    <div className={styles.root}>
      <Form layout="inline">
        <Form.Item>控制面板</Form.Item>
        <Form.Item label="已公开">
          <Switch
            checked={visible}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            onChange={() => {
              setVisible(!visible);
            }}
          />
        </Form.Item>
        <Form.Item label="查看发布/更新时间">
          <Switch
            checked={showCreatedAt}
            onChange={() => {
              setShowCreatedAt(!showCreatedAt);
            }}
            checkedChildren={"发布时间"}
            unCheckedChildren={"更新时间"}
          />
        </Form.Item>
      </Form>
      <Table
        className={styles.list}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey={(record: IArticle) => String(record.id)}
        expandedRowKeys={[activeRow]}
        //onChange={handleChange}
        expandRowByClick
        onExpand={handleExpand}
        onRowClick={handleClick}
        expandedRowRender={(record: IArticle) => {
          return (
            <Descriptions>
              <Descriptions.Item label="摘要">
                {record.abstract}
              </Descriptions.Item>
            </Descriptions>
          );
        }}
      />
    </div>
  );
};

function mapStateToProps(state: IAppState): IArticleManagePageStateProps {
  return {
    user: state.auth.user!
  };
}

const mapDispatchToProps: IArticleManagePageDispatchProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleManagePage)
);
