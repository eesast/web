import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Pagination, Layout, Image } from 'antd';
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetWeekly } from "../api/types";
import { GetWeekly as GETWEEKLY } from "../api/weekly.graphql";
import "./WeeklyPage.css";
import axios from 'axios';

const { Meta } = Card;
const { Content, Footer } = Layout;
const pageSizes = ['8', '12', '16', '20', '32'];
const url: string[] = [];

const fetch_cover_img = async (data_show: any) => {
  try {
    if (data_show) {
      for (let i = 0; i < data_show.length; i++) {
        const response = await axios.get("/weekly", {
          params: {
            url: data_show[i].url
          }
        });
        const data: string = response.data[0];
        url[i] = data;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

const WeeklyPage: React.FC = () => {

  const { data: weekly_data } = useQuery<GetWeekly>(
    GETWEEKLY
  );
  const [showSize, setShowSize] = useState(12);
  const [page, setPage] = useState(1);
  let data_show;

  data_show = weekly_data?.weekly.slice(showSize * (page - 1), showSize * page);
  fetch_cover_img(data_show);

  const onChange = (pageNumber: number, pageSize?: number) => {
    setPage(pageNumber);
    if (pageSize) setShowSize(pageSize);
  };

  return (
    <Layout>

      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data_show}
          renderItem={(item, id) => (
            <List.Item>
              <Card style={{ width: 300 }}
                hoverable={true}
                onClick={() => {
                  const w = window.open('loading');
                  if (w != null) w.location.href = item.url;
                }}
                cover={
                  <Image
                    alt="cover image"
                    src={url[id]}
                    referrerPolicy="no-referrer"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src={`/android-chrome-192x192.png`} />}
                  title={<p className='title'> {item.title.slice(4, 15)} <br/> {item.title.slice(22)} </p>}
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
