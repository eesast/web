import { Avatar, Card, List, Pagination, Layout } from 'antd';
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetWeekly } from "../api/types";
import { GetWeekly as GETWEEKLY } from "../api/weekly.graphql";
import "./WeeklyPage.css";
import axios from 'axios';

const { Meta } = Card;
const { Content, Footer } = Layout;
const pageSizes = ['8', '12', '16', '20', '32'];

const WeeklyPage: React.FC = () => {

  const { data: weekly_data } = useQuery<GetWeekly>(
    GETWEEKLY
  );
  const [showSize, setShowSize] = useState(12);
  const [page, setPage] = useState(1);
  let data_show: any;

  data_show = weekly_data?.weekly.slice(showSize * (page - 1), showSize * page);

  const onChange = (pageNumber: number, pageSize?: number) => {
    setPage(pageNumber);
    if (pageSize) setShowSize(pageSize);
  };

  const Im = (props: any) => {
    const [url, setUrl] = useState("/android-chrome-192x192.png");
    fetch_img(props.src, setUrl);
    return <img
      alt="weekly cover"
      src={url}
      referrerPolicy="no-referrer"
    />
  }

  const fetch_img = async (url: string, setUrl: any) => {
    try {
      const response = await axios.get("/weekly", {
        params: {
          url: url
        }
      });
      setUrl(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>

      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data_show}
          renderItem={(item: any) => (
            <List.Item>
              <Card style={{ width: 300 }}
                hoverable={true}
                onClick={() => {
                  const w = window.open('loading');
                  if (w != null) w.location.href = item.url;
                }}
                cover={
                  <Im src={item.url} />
                }
              >
                <Meta
                  avatar={<Avatar src={`/android-chrome-192x192.png`} />}
                  title={<text> {item.title.slice(4, 15)} <br/> {item.title.slice(22)} </text>}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        <Pagination showQuickJumper current={page} total={weekly_data?.weekly.length}
        defaultPageSize={12} showSizeChanger={true} pageSizeOptions={pageSizes}
        pageSize={showSize} onChange={onChange}/>
      </Footer>

    </Layout>
  );
};

export default WeeklyPage;
