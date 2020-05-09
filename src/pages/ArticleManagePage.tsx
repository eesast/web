import { IUser, IArticle, IAppState } from "../redux/types/state";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";
import {
  Tag,
  Divider,
  Table,
  Descriptions,
  Switch,
  Form,
  Icon,
  message,
  Modal,
  Button,
} from "antd";
import api from "../api";
import md2wx from "md2wx";
import { PaginationConfig } from "antd/lib/table";
import styles from "./ArticleManagePage.module.css";

interface IArticleManagePageStateProps {
  user: IUser;
}

interface IArticleManagePageDispatchProps {}

type IArticleManagePageProps = IArticleManagePageStateProps &
  IArticleManagePageDispatchProps;

const ArticleManagePage: React.FC<IArticleManagePageProps> = (props) => {
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
  const [review, setReview] = useState(false);
  const initialUnderReviewArticle: Partial<IArticle> = {
    id: 0,
    title: "待审阅文章标题",
    alias: "under-review-article",
    author: "待审阅文章作者",
    authorId: 0,
    content: "# under-review-article",
    abstract: "under-review-article",
  };
  const [previewArticle, setPreviewArticle] = useState<Partial<IArticle>>(
    initialUnderReviewArticle
  );
  const [showPreview, setShowPreview] = useState(false);

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

  const handleApprove = async (record: IArticle) => {
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
          {tags.map((tag) => {
            let color = tag === "underReview" ? "red" : "blue";
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Edit Time",
      key: "editTime",
      dataIndex: showCreatedAt ? "createdAt" : "updatedAt",
    },
    {
      title: "Action",
      key: "action",
      render: (record: IArticle) => (
        <span>
          {review ? (
            <Button
              onClick={() => {
                setShowPreview(true);
              }}
            >
              View
            </Button>
          ) : (
            <Button>
              <Link to={`/weekly/articles/${record.alias}`}>View</Link>
            </Button>
          )}

          <Divider type="vertical" />
          <Button>
            <Link to={`/weekly/edit/${record.alias}`}>Edit</Link>
          </Button>

          <Divider type="vertical" />
          {visible ? (
            <Button
              onClick={() => {
                handlePrivate(record);
              }}
            >
              Make Private
            </Button>
          ) : (
            <Button
              onClick={() => {
                handlePublic(record);
              }}
            >
              Make Public
            </Button>
          )}
          <Divider type="vertical" />
          <Button
            onClick={() => {
              handleDelete(record);
            }}
          >
            Delete
          </Button>
          <Divider type="vertical" />
          {review ? (
            <Button
              onClick={() => {
                handleApprove(record);
              }}
            >
              Approve
            </Button>
          ) : null}
        </span>
      ),
    },
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
    ),
  };

  useEffect(() => {
    // 获取文章总数
    const fetchData = async () => {
      if (category === "author") {
        const response = await api.getSelfArticleNum(user.id, visible);
        setTotalArticles(response);
      }
    };

    const fetchReviewData = async () => {
      const response = await api.getUnderReviewArticlesNum();
      setTotalArticles(response);
    };

    review ? fetchReviewData() : fetchData();
  }, [category, review, visible, user]);

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

    const fetchReviewData = async () => {
      const response = await api.getUnderReviewArticles(
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize
      );
      setData(response);
    };

    review ? fetchReviewData() : fetchData();
  }, [pageNumber, pageSize, visible, user, operation, review]);

  const handleClick = (record: IArticle) => {
    if (activeRow === String(record.id)) {
      setActiveRow("");
      setPreviewArticle(initialUnderReviewArticle);
    } else {
      setActiveRow(String(record.id));
      setPreviewArticle(record);
    }
  };

  const handleExpand = (expanded: boolean, record: IArticle) => {
    if (activeRow === String(record.id)) {
      setActiveRow("");
      setPreviewArticle(initialUnderReviewArticle);
    } else {
      setActiveRow(String(record.id));
      setPreviewArticle(record);
    }
  };

  let controlPanel = [
    <Form.Item>
      <b>控制面板</b>
    </Form.Item>,
    <Form.Item label={category === "author" ? "我写的文章" : "我发布的文章"}>
      <Switch
        checked={category === "author"}
        onChange={() => {
          if (category === "author") {
            setCategory("promulgator");
          } else {
            setCategory("author");
          }
        }}
        checkedChildren={"点击查看发布的文章"}
        unCheckedChildren={"点集查看我写的文章"}
      />
    </Form.Item>,
    <Form.Item label="已公开">
      <Switch
        checked={visible}
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        onChange={() => {
          setVisible(!visible);
        }}
      />
    </Form.Item>,
    <Form.Item label="查看发布/更新时间">
      <Switch
        checked={showCreatedAt}
        onChange={() => {
          setShowCreatedAt(!showCreatedAt);
        }}
        checkedChildren={"发布时间"}
        unCheckedChildren={"更新时间"}
      />
    </Form.Item>,
  ];

  if (user.role === "root" || user.role === "editor") {
    controlPanel = [
      ...controlPanel,
      <Form.Item label="审阅">
        <Switch
          checked={review}
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          onChange={() => {
            setReview(!review);
          }}
        />
      </Form.Item>,
    ];
  }

  const html = useMemo(() => md2wx.renderHtml(previewArticle.content!, true), [
    previewArticle.content,
  ]);

  return (
    <div className={styles.root}>
      <Form layout="inline">{controlPanel}</Form>
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
      <Modal
        title={previewArticle?.title}
        width="80%"
        visible={showPreview}
        footer={null}
        onCancel={() => {
          setShowPreview(false);
          // setActiveRow("");
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Modal>
    </div>
  );
};

function mapStateToProps(state: IAppState): IArticleManagePageStateProps {
  return {
    user: state.auth.user!,
  };
}

const mapDispatchToProps: IArticleManagePageDispatchProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleManagePage)
);
