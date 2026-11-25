import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Layout,
  List,
  Pagination,
  Popover,
  Radio,
  Row,
  Typography,
  message,
  Tooltip,
  Image,
  Modal,
  Switch,
  InputNumber,
} from "antd";
import { Form as WebForm } from "antd";
import React, { useEffect, useState } from "react";
import * as graphql from "@/generated/graphql";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { PageProps } from "..";
import { useNarrow } from "@/api/hooks/narrow";

/* ---------------- 封面图缓存（模块级，整个页面生命周期内共享） ---------------- */
// Im / MyCard 定义在 WeeklyPage 内部，父组件每渲染一次它们就会被重建、重挂载一次，
// 挂载类副作用会跟着重跑。所以把「同一个链接只请求一次」这件事放到模块级缓存里做：
// 搜索框每敲一个字、翻页、切列数，都不会再重复请求已经取过的封面。
// 取失败也记一个 null，避免同一个坏链接被反复重试（比如后端一直 500 的那些）。
const coverCache = new Map<string, string | null>();

const fetch_img = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.get("/weekly/cover", {
      params: {
        url: url,
      },
    });
    return response.data as string;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const WeeklyPage: React.FC<PageProps> = ({ mode, user }) => {
  const { Meta } = Card;
  const { Content, Footer } = Layout;
  const { Text } = Typography;
  const pageSizes = ["8", "12", "16", "20", "32"];
  const isNarrow = useNarrow();
  const { data: weekly_data, refetch } = graphql.useGetWeeklySuspenseQuery();
  const [showSize, setShowSize] = useState(12);
  const [page, setPage] = useState(1);
  const [showMode, setShowMode] = useState("browse");
  const [associatedValue, setAssociatedValue] = useState("");
  const [filterParamList, setFilterParamList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = WebForm.useForm<FieldType>();
  type FieldType = {
    cookie?: string;
    userAgent?: string;
    token?: string;
    full_scan?: boolean;
    start_i?: number;
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    RenewWeekly();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    let weekly_sorted: any;
    if (weekly_data) {
      weekly_sorted = [...weekly_data.weekly];
      // weekly_sorted.sort((a: any, b: any) => {
      //   return b.id - a.id;
      // });
    }
    if (associatedValue !== "") {
      setFilterParamList([]);
      setFilterParamList(
        weekly_sorted?.filter((item: { title: string | any[] }) => {
          return item.title?.slice(14).indexOf(associatedValue) !== -1;
        }),
      );
    } else {
      setFilterParamList(weekly_sorted);
    }
  }, [associatedValue, weekly_data]);
  const RenewWeekly = async () => {
    try {
      form.submit();
      const paramSet: FieldType = form.getFieldsValue();
      const cookie: string | undefined = paramSet.cookie;
      const userAgent: string | undefined = paramSet.userAgent;
      const token: string | undefined = paramSet.token;
      const full_scan: boolean = paramSet.full_scan || false;
      const start_i: number = paramSet.start_i || 0;
      if (!cookie || !userAgent || !token) throw Error("请填写完整信息");
      const response = await axios.post("/weekly/renew", {
        cookie: cookie,
        useragent: userAgent,
        token: token,
        full_scan: full_scan,
        start_i: start_i,
      });
      if (response.status === 200) message.success("spider start");
      else throw Error("start failed");
      const filename: string = response.data["filename"];
      let count = 0;
      let success: boolean = false;
      //const limit = 10;
      while (count < 60) {
        const response = await axios.post("/weekly/check", {
          filename: filename,
        });
        if (response.data.finished === true) {
          message.success("spider finished");
          success = true;
          refetch();
          setPage(1);
          break;
        }
        if (response.data.failed === true) {
          throw Error("spider failed");
        }
        count++;
        //per second
        await new Promise((resolve) => setTimeout(resolve, 30000));
      }
      if (!success) throw Error("spider timeout");
      else console.log("success");
    } catch (err) {
      message.error(String(err));
    }
  };
  const onChange = (pageNumber: number, pageSize?: number) => {
    setPage(pageNumber);
    if (pageSize) setShowSize(pageSize);
  };
  const MyCard = (props: any) => {
    const [visibleInsert, setVisibleInsert] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    return (
      <Tooltip title={props.item.title.split("|")[1]}>
        <Card
          hoverable={true}
          cover={<Im src={props.item.url} />}
          // 三列布局下 24px 的默认内边距太占地方
          styles={isNarrow ? { body: { padding: 8 } } : undefined}
          actions={showAction(
            setVisibleInsert,
            setVisibleDelete,
            visibleInsert,
            visibleDelete,
            props.item,
          )}
        >
          <Meta
            avatar={
              isNarrow ? undefined : (
                <Avatar src={`/android-chrome-192x192.png`} />
              )
            }
            title={
              <Text
                style={
                  isNarrow
                    ? {
                        fontSize: 12,
                        lineHeight: 1.35,
                        wordBreak: "break-word",
                      }
                    : undefined
                }
              >
                {props.item.title.split("|")[0]} <br />{" "}
                {props.item.title.split("|")[1]}
              </Text>
            }
          />
        </Card>
      </Tooltip>
    );
  };
  const Im = (props: any) => {
    // 初值直接读缓存，命中时不会先闪一下占位图
    const [url, setUrl] = useState(
      () => coverCache.get(props.src) || "/android-chrome-192x192.png",
    );
    useEffect(() => {
      const src = props.src;
      if (!src) return;
      if (coverCache.has(src)) {
        const cached = coverCache.get(src);
        if (cached) setUrl(cached);
        return;
      }
      let cancelled = false;
      fetch_img(src).then((cover) => {
        coverCache.set(src, cover);
        if (cover && !cancelled) setUrl(cover);
      });
      return () => {
        cancelled = true;
      };
    }, [props.src]);
    return (
      <Image
        alt="weekly cover"
        src={url}
        referrerPolicy="no-referrer"
        preview={false}
        style={
          isNarrow
            ? {
                // 三列时给固定高度，各张卡封面才等高（宽度由栅格撑满）
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 8,
              }
            : {
                objectFit: "cover",
                minHeight: 256,
                borderRadius: "10px",
              }
        }
        onClick={() => {
          const w = window.open("loading");
          if (w != null) w.location.href = props.src;
        }}
      />
    );
  };
  const InsertPop = (props: any) => {
    const [inputURL, setInputURL] = useState("");
    return (
      <Layout>
        <Input
          placeholder="请输入要添加的推送链接"
          style={{ marginBottom: 10 }}
          value={inputURL}
          onChange={(e) => setInputURL(e.target.value)}
        />
        <table style={{ margin: "0 auto" }}>
          <tbody>
            <tr>
              <td>
                <Button
                  type="primary"
                  size="small"
                  onClick={async () => {
                    try {
                      const response = await axios.post("/weekly/insert", {
                        id: props.id,
                        url: inputURL,
                      });
                      if (response.status === 200)
                        message.success("推送添加成功！");
                      else throw Error("Insert failed");
                    } catch (err) {
                      console.log(err);
                      message.error("推送添加失败！");
                    }
                  }}
                >
                  提交
                </Button>
              </td>
              <td>
                <Button
                  style={{ marginLeft: 10 }}
                  size="small"
                  onClick={() => {
                    props.setVisibleInsert(false);
                  }}
                >
                  取消
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Layout>
    );
  };
  const DeletePop = (props: any) => {
    return (
      <Layout>
        <table style={{ margin: "0 auto" }}>
          <tbody>
            <tr>
              <td>
                <Button
                  type="primary"
                  size="small"
                  onClick={async () => {
                    try {
                      const response = await axios.post("/weekly/delete", {
                        id: props.id,
                      });
                      if (response.status === 200)
                        message.success("推送删除成功！");
                      else throw Error("Delete failed");
                    } catch (err) {
                      console.log(err);
                      message.error("推送删除失败！");
                    }
                  }}
                >
                  删除
                </Button>
              </td>
              <td>
                <Button
                  style={{ marginLeft: 10 }}
                  size="small"
                  onClick={() => {
                    props.setVisibleDelete(false);
                  }}
                >
                  取消
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Layout>
    );
  };
  const showAction = (
    setVisibleInsert: any,
    setVisibleDelete: any,
    visibleInsert: any,
    visibleDelete: any,
    item: any,
  ) => {
    if (showMode === "edit") {
      return [
        <Popover
          content={
            <InsertPop setVisibleInsert={setVisibleInsert} id={item.id} />
          }
          title="添加新推送到本条推送前"
          trigger="click"
          open={visibleInsert}
          onOpenChange={(newVisible: boolean) => {
            setVisibleInsert(newVisible);
          }}
          arrow={{ pointAtCenter: true }}
        >
          <PlusCircleOutlined
            onClick={() => {
              setVisibleInsert(true);
            }}
          />
        </Popover>,
        <Popover
          content={
            <DeletePop setVisibleDelete={setVisibleDelete} id={item.id} />
          }
          title="删除本条推送"
          trigger="click"
          open={visibleDelete}
          onOpenChange={(newVisible: boolean) => {
            setVisibleDelete(newVisible);
          }}
          arrow={{ pointAtCenter: true }}
        >
          <MinusCircleOutlined
            onClick={() => {
              setVisibleDelete(true);
            }}
          />
        </Popover>,
      ];
    } else return undefined;
  };
  return (
    <Layout>
      <Content
        style={{
          marginLeft: isNarrow ? 12 : 50,
          marginTop: isNarrow ? 16 : 50,
          marginRight: isNarrow ? 12 : 50,
          minHeight: 380,
        }}
      >
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Input
              style={{ marginBottom: isNarrow ? 16 : 50 }}
              value={associatedValue}
              onChange={(e) => {
                setAssociatedValue(e.target.value?.trim());
              }}
              placeholder="  Weekly Title"
              allowClear
              prefix={<SearchOutlined />}
            ></Input>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row>
          <List
            // 外层 Row 是 flex，List 不显式给宽度会按内容收缩，三列时容易溢出
            style={{ width: isNarrow ? "100%" : undefined }}
            grid={{
              gutter: isNarrow ? 8 : 16,
              xs: isNarrow ? 3 : 1,
              sm: isNarrow ? 3 : 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 6,
            }}
            dataSource={filterParamList?.slice(
              showSize * (page - 1),
              showSize * page,
            )}
            renderItem={(item: any) => (
              <List.Item>
                <MyCard item={item} />
              </List.Item>
            )}
          />
        </Row>
      </Content>
      {user?.role === "counselor" && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Button
            //onClick={RenewWeekly}
            //disabled={user?.role !== "counselor" && user?.role !== "admin"}
            onClick={showModal}
          >
            刷新weekly内容
          </Button>
          <Modal
            title="刷新 weekly 内容"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <WebForm
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              form={form}
            >
              <WebForm.Item<FieldType>
                label="Cookie"
                name="cookie"
                rules={[{ required: true, message: "请输入内容" }]}
              >
                <Input />
              </WebForm.Item>

              <WebForm.Item<FieldType>
                label="UserAgent"
                name="userAgent"
                rules={[{ required: true, message: "请输入内容" }]}
              >
                <Input />
              </WebForm.Item>

              <WebForm.Item<FieldType>
                label="Token"
                name="token"
                rules={[{ required: true, message: "请输入内容" }]}
              >
                <Input />
              </WebForm.Item>

              <WebForm.Item<FieldType>
                label="全量扫描"
                name="full_scan"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </WebForm.Item>

              <WebForm.Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  if (getFieldValue("full_scan") === true) {
                    return (
                      <WebForm.Item<FieldType>
                        label="起始索引 (start_i)"
                        name="start_i"
                        initialValue={0}
                      >
                        <InputNumber min={0} />
                      </WebForm.Item>
                    );
                  }
                  return null;
                }}
              </WebForm.Item>

              <WebForm.Item label={null}></WebForm.Item>
            </WebForm>
          </Modal>
        </div>
      )}
      <Footer>
        <table style={{ margin: "0 auto" }}>
          <tbody>
            <tr className="view-and-admin-mode">
              <td title="仅系统管理员在登录后可进入编辑模式">
                <Radio.Group
                  defaultValue={"browse"}
                  value={showMode}
                  onChange={(e) => setShowMode(e.target.value)}
                >
                  <Radio.Button value="browse">浏览模式</Radio.Button>
                  <Radio.Button
                    value="edit"
                    disabled={user.role !== "counselor"}
                  >
                    编辑模式
                  </Radio.Button>
                </Radio.Group>
              </td>
              <td>
                <Pagination
                  showQuickJumper={!isNarrow}
                  current={page}
                  total={weekly_data?.weekly.length}
                  defaultPageSize={12}
                  showSizeChanger={!isNarrow}
                  showLessItems={isNarrow}
                  size={isNarrow ? "small" : undefined}
                  pageSizeOptions={pageSizes}
                  pageSize={showSize}
                  onChange={onChange}
                  style={{ marginLeft: isNarrow ? 8 : 20 }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Footer>
    </Layout>
  );
};
export default WeeklyPage;
