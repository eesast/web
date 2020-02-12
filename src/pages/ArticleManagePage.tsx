import { IUser, IArticle, IAppState } from "../redux/types/state";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Tag, Divider, Table, message, Descriptions, Switch, Form } from "antd";
import api from "../api";

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

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: string[]) => (
        <span>
          {tags.map(tag => {
            let color = "blue";
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
          <Link to={`/weekly/articles/${record.alias}`}>
            View {record.title}
          </Link>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      )
    }
  ];

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
  }, [pageNumber, pageSize, visible]);

  const handleClick = (record: IArticle) => {
    if (activeRow === String(record.id)) setActiveRow("");
    else setActiveRow(String(record.id));
  };

  const handleExpand = (expanded: boolean, record: IArticle) => {
    if (activeRow === String(record.id)) setActiveRow("");
    else setActiveRow(String(record.id));
  };

  return (
    <div>
      <Form layout="inline">
        <Form.Item label="审阅中?">
          <Switch
            checked={visible}
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
        columns={columns}
        dataSource={data}
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
