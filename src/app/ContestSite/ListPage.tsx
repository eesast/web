import React, { useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import Card, { CardProps } from "antd/lib/card";
import { Col, Divider, List, message, Layout, Row, Typography } from "antd";
//以下为分页面，用以没登陆会跳转到登陆页面
import dayjs from "dayjs";
//import utc from 'dayjs/plugin/utc';
import { Content } from "antd/lib/layout/layout";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import { ContestProps } from ".";
import Loading from "../Components/Loading";

/* ---------------- 接口和类型定义 ---------------- */
interface ContestInfoCardProps extends CardProps {
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  mode: string;
}

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Text } = Typography;
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

/* ---------------- 不随渲染刷新的组件 ---------------- */

/* ---------------- 主页面 ---------------- */
const ListPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const { data: contestData, error: contestError } =
    graphql.useGetContestsSuspenseQuery();

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);

  /* ---------------- 业务逻辑函数 ---------------- */

  /* ---------------- 随渲染刷新的组件 ---------------- */

  /* ---------------- 页面组件 ---------------- */
  return (
    <Layout>
      <br />
      <br />
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <Suspense fallback={<Loading />}>
            <List
              dataSource={contestData?.contest}
              renderItem={(item) => (
                <Content>
                  <ContestInfoCard
                    key={item.id}
                    name={item.fullname}
                    description={item.description as string | null}
                    startDate={item.start_date}
                    endDate={item.end_date}
                    id={item.id}
                    mode={mode}
                  />
                  <br />
                  <br />
                </Content>
              )}
            />
          </Suspense>
        </Col>
      </Row>
    </Layout>
  );
};

/* ---------------- 比赛信息卡片组件 ---------------- */
const ContestInfoCard: React.FC<ContestInfoCardProps> = (props) => {
  const { id, name, description, startDate, endDate, mode, ...restProps } =
    props;

  const url = useUrl();

  const state = dayjs(endDate).isAfter(dayjs().format())
    ? dayjs(startDate).isBefore(dayjs().format())
      ? "正在进行"
      : "未开始"
    : "已结束";

  return (
    <Link to={url.append("contest", id).link("intro")}>
      <Card
        css={`
          padding: 20px;
          padding-bottom: 10px;
          background-color: ${mode === "light" ? `white` : `#141414`};
          border: 1px solid
            ${mode === "light"
              ? `rgba(5, 5, 5, 0.06)`
              : `rgba(253, 253, 253, 0.12)`};
        `}
        title={
          <Text
            css={`
              font-size: x-large;
              font-weight: bold;
            `}
          >
            {name}
          </Text>
        }
        hoverable
        {...restProps}
      >
        {description && (
          <>
            <Text
              css={`
                margin: 12px 0 12px 0;
                white-space: pre-wrap;
                font-size: 15px;
              `}
            >
              {description.replace(/#+ [^\r\n]*[\r\n]/g, "")}
            </Text>
            <Divider />
          </>
        )}
        <Row>
          <Col span={8}>
            <Text
              css={`
                margin-left: 5px;
                font-style: italic;
                font-size: 14px;
              `}
            >
              {"开始时间:" + dayjs(startDate).format("YYYY-MM-DD")}
            </Text>
          </Col>
          <Col span={8}>
            <Text
              css={`
                margin-left: 5px;
                font-style: italic;
                font-size: 14px;
              `}
            >
              {"结束时间:" + dayjs(endDate).format("YYYY-MM-DD")}
            </Text>
          </Col>
          <Col span={8}>
            <Text
              css={`
                margin-left: 5px;
                font-style: italic;
                font-size: 14px;
              `}
            >
              状态:
            </Text>
            <Text
              css={`
                margin-left: 5px;
                font-style: italic;
                font-size: 14px;
              `}
              style={{
                color:
                  state === "正在进行"
                    ? "green"
                    : state === "已结束"
                      ? "red"
                      : "black",
              }}
            >
              {state}
            </Text>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ListPage;
