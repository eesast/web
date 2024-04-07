import React, { useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import Card, { CardProps } from "antd/lib/card";
import {
  //Button,
  Col,
  // DatePicker,
  Divider,
  // Form,
  // Input,
  List,
  message,
  // Modal,
  Layout,
  Row,
  // Select,
  Space,
  Spin,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  // ExclamationCircleOutlined,
  // MinusCircleOutlined,
  // PlusOutlined,
} from "@ant-design/icons";
//以下为分页面，用以没登陆会跳转到登陆页面
import dayjs from "dayjs";
//import utc from 'dayjs/plugin/utc';
import { Content } from "antd/lib/layout/layout";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "@/generated/graphql";
import styled from "styled-components";
import { ContestProps } from ".";

/* ---------------- 接口和类型定义 ---------------- */
// 表单数据格式
// interface FormValues {
//   fullname: string;
//   contest_type: string;
//   description: string | undefined | null;
//   time: Dayjs[];
//   managers_list: graphql.GetContestManagerQuery["contest_manager"][0]["userByUserUuid"][];
// }

interface ContestInfoCardProps extends CardProps {
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  mode: string;
  onEditPress?: () => void;
  onDeletePress?: () => void;
}

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Text } = Typography;
// const { confirm } = Modal;
// const RangePicker: any = DatePicker.RangePicker;
// const { Option } = Select;
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

/* ---------------- 不随渲染刷新的组件 ---------------- */
const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ---------------- 主页面 ---------------- */
const ListPage: React.FC<ContestProps> = ({ mode, user }) => {
  /* ---------------- States 和常量 Hooks ---------------- */
  // const [modalVisible, setModalVisible] = useState(false);
  // const [editingContest, setEditingContest] = useState<boolean>(false); //编辑or添加比赛
  // const [contestID, setContestID] = useState<string>(); //编辑比赛时的比赛ID
  // const [form] = Form.useForm();

  /* ---------------- 从数据库获取数据的 Hooks ---------------- */
  const {
    data: contestData,
    //loading: contestLoading,
    error: contestError,
    // refetch: refetchContests,
  } = graphql.useGetContestsSuspenseQuery();

  // const {
  //   /* data: userData,
  //   loading: userLoading, */
  //   error: userError,
  //   refetch: refetchUserId,
  // } = graphql.useGetUser_IdSuspenseQuery({
  //   variables: {
  //     email: "",
  //     realname: "",
  //   },
  // });

  // const {
  //   /* data: contestManagerData,
  //   loading: contestManagerLoading, */
  //   error: contestManagerError,
  //   refetch: refetchContestManager,
  // } = graphql.useGetContestManagerSuspenseQuery({
  //   variables: { contest_id: "3b74b9d3-1955-42d1-954a-ef86b25ca6b7" }, // TODO
  // });

  // const [
  //   updateContest,
  //   { loading: contestUpdating, error: contestUpdatingError },
  // ] = graphql.useUpdateContestMutation();

  // const [addContest, { loading: contestAdding, error: contestAddingError }] =
  //   graphql.useAddContestMutation();

  // const [deleteContest, { error: contestDeleteError }] =
  //   graphql.useDeleteContestMutation();

  // const [deleteContestTeams, { error: teamDeleteError }] =
  //   graphql.useDeleteContestAllTeamsMutation();

  // const [
  //   addContestManager,
  //   { /*loading: managerAdding,*/ error: managerAddError },
  // ] = graphql.useAddContestManagerMutation();

  // const [deleteContestManager, { error: managerDeleteError }] =
  //   graphql.useDeleteContestAllManagerMutation();

  // const [deleteContestInfo, { error: infoDeleteError }] =
  //   graphql.useDeleteContestAllInfoMutation();

  // const [deleteContestRooms, { error: roomsDeleteError }] =
  //   graphql.useDeleteContestAllRoomsMutation();

  /* ---------------- useEffect ---------------- */
  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);

  // useEffect(() => {
  //   if (contestUpdatingError) {
  //     message.error("比赛更新失败");
  //     console.log(contestUpdatingError.message);
  //   }
  // }, [contestUpdatingError]);

  // useEffect(() => {
  //   if (contestAddingError) {
  //     message.error("比赛发布失败");
  //     console.log(contestAddingError.message);
  //   }
  // }, [contestAddingError]);

  // useEffect(() => {
  //   if (contestDeleteError) {
  //     message.error("比赛删除失败");
  //     console.log(contestDeleteError.message);
  //   }
  // }, [contestDeleteError]);

  // useEffect(() => {
  //   if (managerAddError) {
  //     message.error("管理员添加失败");
  //     console.log(managerAddError.message);
  //   }
  // }, [managerAddError]);

  // useEffect(() => {
  //   if (managerDeleteError) {
  //     message.error("管理员删除失败");
  //     console.log(managerDeleteError.message);
  //   }
  // }, [managerDeleteError]);

  // useEffect(() => {
  //   if (teamDeleteError) {
  //     message.error("比赛队伍删除失败");
  //     console.log(teamDeleteError.message);
  //   }
  // }, [teamDeleteError]);

  // useEffect(() => {
  //   if (infoDeleteError) {
  //     message.error("比赛公告删除失败");
  //     console.log(infoDeleteError.message);
  //   }
  // }, [infoDeleteError]);

  // useEffect(() => {
  //   if (roomsDeleteError) {
  //     message.error("比赛房间删除失败");
  //     console.log(roomsDeleteError.message);
  //   }
  // }, [roomsDeleteError]);

  // useEffect(() => {
  //   if (userError) {
  //     message.error("用户信息查询失败");
  //     console.log(userError.message);
  //   }
  // }, [userError]);

  // useEffect(() => {
  //   if (contestManagerError) {
  //     message.error("管理员加载失败");
  //     console.log(contestManagerError.message);
  //   }
  // }, [contestManagerError]);
  /* ---------------- 业务逻辑函数 ---------------- */
  // const handleContestEdit = async () => {
  //   try {
  //     form.validateFields();
  //   } catch {}
  //   const values = form.getFieldsValue();
  //   if (
  //     values.fullname === undefined ||
  //     values.fullname === "" ||
  //     values.time === undefined ||
  //     values.contest_type === undefined
  //   ) {
  //     return;
  //   }

  //   if (editingContest) {
  //     await updateContest({
  //       variables: {
  //         id: contestID,
  //         fullname: values.fullname,
  //         contest_type: values.contest_type,
  //         description: values.description ? values.description : "",
  //         start_date: values.time[0],
  //         end_date: values.time[1],
  //       },
  //     });

  //     if (values?.managers_list?.length > 0) {
  //       //已添加管理员
  //       await deleteContestManager({ variables: { contest_id: contestID } });
  //       values.managers_list.forEach(async (item: any) => {
  //         try {
  //           const newUserData = await refetchUserId({
  //             email: item.email,
  //             realname: item.fullname,
  //           });
  //           const user_uuid = newUserData.data.users[0]?.uuid;
  //           if (user_uuid) {
  //             addContestManager({
  //               variables: {
  //                 contest_id: contestID,
  //                 user_uuid: user_uuid,
  //               },
  //             });
  //           }
  //         } catch (userError: any) {
  //           if (userError) {
  //             message.error("用户信息查询失败");
  //             console.log(userError.message);
  //           }
  //         }
  //       });
  //     }
  //     setContestID("");
  //     setEditingContest(false);
  //     if (!contestUpdatingError && !managerAddError) {
  //       message.success("比赛修改成功");
  //     }
  //   } else {
  //     //id:添加的比赛的id
  //     const id = (
  //       await addContest({
  //         variables: {
  //           fullname: values.fullname,
  //           contest_type: values.contest_type,
  //           description: values.description,
  //           start_date: values.time[0],
  //           end_date: values.time[1],
  //         },
  //       })
  //     ).data?.insert_contest?.returning[0].id;
  //     if (values?.managers_list?.length > 0) {
  //       //已添加管理员
  //       await deleteContestManager({ variables: { contest_id: id } });
  //       values.managers_list.forEach(async (item: any) => {
  //         try {
  //           const newUserData = await refetchUserId({
  //             email: item.email,
  //             realname: item.name,
  //           });
  //           const user_uuid = newUserData.data.users[0]?.uuid;
  //           if (user_uuid) {
  //             addContestManager({
  //               variables: {
  //                 contest_id: id,
  //                 user_uuid: user_uuid,
  //               },
  //             });
  //           }
  //         } catch {}
  //       });
  //     }
  //     if (!contestAddingError && !managerAddError) {
  //       message.success("比赛添加成功");
  //     }
  //   }

  //   setModalVisible(false);
  //   form.resetFields();

  //   refetchContests();
  // };

  // const handleContestDelete = async (id: string) => {
  //   confirm({
  //     title: "确定要删除此比赛吗？",
  //     icon: <ExclamationCircleOutlined />,
  //     content: "这样做会删除此比赛的所有数据，此操作不可恢复。",
  //     onOk: async () => {
  //       await deleteContestInfo({ variables: { contest_id: id } });
  //       await deleteContestTeams({ variables: { contest_id: id } });
  //       await deleteContestRooms({ variables: { contest_id: id } });
  //       await deleteContestManager({ variables: { contest_id: id } });
  //       await deleteContest({ variables: { id } });
  //       await refetchContests();
  //     },
  //   });
  // };

  /* ---------------- 随渲染刷新的组件 ---------------- */
  const Loading = () => {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  };

  /* ---------------- 页面组件 ---------------- */
  return (
    <Layout>
      <br />
      {/* <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <Button>添加新比赛</Button>
        </Col>
      </Row> */}
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
                    // onEditPress={
                    //   user?.role === "counselor" || user?.role === "root"
                    //     ? async () => {
                    //         setEditingContest(true);
                    //         try {
                    //           const managerData = await refetchContestManager({
                    //             contest_id: item.id,
                    //           });
                    //           const data: FormValues = {
                    //             fullname: item?.fullname,
                    //             contest_type: item?.contest_type,
                    //             description: item?.description,
                    //             time: [
                    //               dayjs(item?.start_date),
                    //               dayjs(item?.end_date),
                    //             ],
                    //             managers_list:
                    //               managerData.data.contest_manager.map(
                    //                 (value) =>
                    //                   value.userByUserUuid as graphql.GetContestManagerQuery["contest_manager"][0]["userByUserUuid"],
                    //               ),
                    //           };
                    //           setContestID(item?.id);
                    //           form.setFieldsValue(data);
                    //         } catch {}
                    //         setModalVisible(true);
                    //       }
                    //     : undefined
                    // }
                    // onDeletePress={
                    //   user?.role === "counselor" || user?.role === "root"
                    //     ? () => {
                    //         handleContestDelete(item.id);
                    //       }
                    //     : undefined
                    // }
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
              //loading={contestLoading}
            />
          </Suspense>
        </Col>
      </Row>
      {/* <Modal
        open={modalVisible}
        title={editingContest ? "编辑比赛" : "新比赛"}
        centered
        okText="提交"
        onCancel={() => {
          setModalVisible(false);
          setEditingContest(false);
          form.resetFields();
        }}
        onOk={handleContestEdit}
        maskClosable={false}
        confirmLoading={contestAdding || contestUpdating}
        destroyOnClose
      >
        <Form
          form={form}
          name="contest"
          onFinish={handleContestEdit}
          preserve={false}
        >
          <Form.Item
            name="fullname"
            label="名称"
            rules={[{ required: true, message: "请输入比赛名称" }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="contest_type"
            label="类型"
            rules={[{ required: true, message: "请输入比赛类型" }]}
          >
            <Select style={{ width: "40%" }} allowClear>
              <Option value="THUAI">THUAI</Option>
              <Option value="Electronic-design">电子设计大赛</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: false, message: "请输入比赛描述" }]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }} allowClear />
          </Form.Item>
          <Form.Item
            name="time"
            label="比赛时间"
            rules={[{ required: true, message: "请输入比赛时间" }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item name="managers" label="管理员">
            <Form.List name="managers_list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "请输入管理员姓名或删除该栏",
                          },
                        ]}
                        style={{
                          width: "100px",
                        }}
                      >
                        <Input placeholder="姓名" allowClear />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "email"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "请输入管理员邮箱或删除该栏",
                          },
                          {
                            type: "email",
                            message: "请输入合法邮箱",
                          },
                        ]}
                        style={{
                          width: "250px",
                        }}
                      >
                        <Input placeholder="邮箱" allowClear />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      添加管理员
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal> */}
    </Layout>
  );
};

/* ---------------- 比赛信息卡片组件 ---------------- */
const ContestInfoCard: React.FC<ContestInfoCardProps> = (props) => {
  const {
    id,
    name,
    description,
    startDate,
    endDate,
    mode,
    onEditPress,
    onDeletePress,
    ...restProps
  } = props;

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
          <Col span={6}>
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
          <Col span={6}>
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
          <Col span={6}>
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
          <Col span={6}>
            <Space size={"large"}>
              {onEditPress && <EditOutlined onClick={onEditPress} />}
              {onDeletePress && <DeleteOutlined onClick={onDeletePress} />}
            </Space>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ListPage;
