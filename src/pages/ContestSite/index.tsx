import React, { useEffect, useState } from "react";
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { useQuery, useMutation, } from "@apollo/client";
import {
  GetContests as GET_CONTESTS,
  DeleteContest as DELETE_CONTEST,
  AddContest as ADD_CONTEST,
  UpdateContest as UPDATE_CONTEST,
  GetContestManager as GET_CONTEST_MANAGER,
  DeleteContestAllManager as DELETE_CONTEST_MANAGER,
  AddContestManager as ADD_CONTEST_MANAGER,
  GetUser_Id as GET_USER_ID,
  DeleteContestAllTeams as DELETE_CONTEST_TEAMS,
  DeleteContestAllInfo as DELETE_CONTEST_INFO,
  DeleteContestAllRooms as DELETE_CONTEST_ROOMS
} from "../../api/contest_manager.graphql"
import {
  GetContests,
  AddContest,
  AddContestVariables,
  UpdateContest,
  UpdateContestVariables,
  DeleteContest,
  DeleteContestVariables,
  GetContestManager,
  GetContestManagerVariables,
  DeleteContestAllManager,
  DeleteContestAllManagerVariables,
  AddContestManager,
  AddContestManagerVariables,
  GetUser_Id,
  GetUser_IdVariables,
  GetContestManager_contest_manager_user,
  DeleteContestAllTeams,
  DeleteContestAllTeamsVariables,
  DeleteContestAllInfo,
  DeleteContestAllInfoVariables,
  DeleteContestAllRooms,
  DeleteContestAllRoomsVariables,
} from "../../api/types";
import { getUserInfo } from "../../helpers/auth";
//导入antd的包
import Card, { CardProps } from "antd/lib/card";
import { Button, Col, DatePicker, Divider, Form, Input, List, message, Modal, Row, Select, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
//以下为分页面
import MenuPage from "./MenuPage";

//用以没登陆会跳转到登陆页面
import dayjs, { Dayjs } from "dayjs";



const { Text } = Typography;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
const { Option } = Select;

var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);


const ContestSite: React.FC = () => {
  const userInfo = getUserInfo();

  const { path } = useRouteMatch();
  //console.log(path);

  const {
    data: contestData,
    loading: contestLoading,
    error: contestError,
    refetch: refetchContests,
  } = useQuery<GetContests, {}>(GET_CONTESTS);

  const [
    updateContest,
    {
      loading: contestUpdating,
      error: contestUpdatingError
    },
  ] = useMutation<UpdateContest, UpdateContestVariables>(UPDATE_CONTEST);

  const [
    addContest,
    {
      loading: contestAdding,
      error: contestAddingError
    },
  ] = useMutation<AddContest, AddContestVariables>(ADD_CONTEST);

  const [deleteContest,
    { error: contestDeleteError }
  ] = useMutation<DeleteContest, DeleteContestVariables>(DELETE_CONTEST);

  const [deleteContestTeams,
    { error: teamDeleteError }
  ] = useMutation<DeleteContestAllTeams, DeleteContestAllTeamsVariables>(DELETE_CONTEST_TEAMS);

  const [
    addContestManager,
    { /*loading: managerAdding,*/ error: managerAddError }
  ] = useMutation<AddContestManager, AddContestManagerVariables>(ADD_CONTEST_MANAGER);

  const [
    deleteContestManager,
    { error: managerDeleteError },
  ] = useMutation<DeleteContestAllManager, DeleteContestAllManagerVariables>(DELETE_CONTEST_MANAGER);

  const [
    deleteContestInfo,
    { error: infoDeleteError },
  ] = useMutation<DeleteContestAllInfo, DeleteContestAllInfoVariables>(DELETE_CONTEST_INFO);

  const [
    deleteContestRooms,
    { error: roomsDeleteError },
  ] = useMutation<DeleteContestAllRooms, DeleteContestAllRoomsVariables>(DELETE_CONTEST_ROOMS);


  useEffect(() => {
    if (contestError) {
      message.error("比赛加载失败");
      console.log(contestError.message);
    }
  }, [contestError]);

  useEffect(() => {
    if (contestUpdatingError) {
      message.error("比赛更新失败");
      console.log(contestUpdatingError.message);
    }
  }, [contestUpdatingError]);

  useEffect(() => {
    if (contestAddingError) {
      message.error("比赛发布失败");
      console.log(contestAddingError.message);
    }
  }, [contestAddingError]);

  useEffect(() => {
    if (contestDeleteError) {
      message.error("比赛删除失败");
      console.log(contestDeleteError.message);
    }
  }, [contestDeleteError]);

  useEffect(() => {
    if (managerAddError) {
      message.error("管理员添加失败");
      console.log(managerAddError.message);
    }
  }, [managerAddError]);

  useEffect(() => {
    if (managerDeleteError) {
      message.error("管理员删除失败");
      console.log(managerDeleteError.message);
    }
  }, [managerDeleteError]);

  useEffect(() => {
    if (teamDeleteError) {
      message.error("比赛队伍删除失败");
      console.log(teamDeleteError.message);
    }
  }, [teamDeleteError]);

  useEffect(() => {
    if (infoDeleteError) {
      message.error("比赛公告删除失败");
      console.log(infoDeleteError.message);
    }
  }, [infoDeleteError]);

  useEffect(() => {
    if (roomsDeleteError) {
      message.error("比赛房间删除失败");
      console.log(roomsDeleteError.message);
    }
  }, [roomsDeleteError]);

  const {
    /* data: userData,
    loading: userLoading, */
    error: userError,
    refetch: refetchUserId
  } = useQuery<GetUser_Id, GetUser_IdVariables>(GET_USER_ID, {
    variables: {
      email: "",
      name: ""
    }
  });

  useEffect(() => {
    if (userError) {
      message.error("用户信息查询失败");
      console.log(userError.message);
    }
  }, [userError]);

  const {
    /* data: contestManagerData,
    loading: contestManagerLoading, */
    error: contestManagerError,
    refetch: refetchContestManager
  } = useQuery<GetContestManager, GetContestManagerVariables>(GET_CONTEST_MANAGER, {
    variables: { contest_id: "3b74b9d3-1955-42d1-954a-ef86b25ca6b7" } // TODO
  });

  useEffect(() => {
    if (contestManagerError) {
      message.error("管理员加载失败");
      console.log(contestManagerError.message);
    }
  }, [contestManagerError]);

  //表单数据格式
  interface FormValues {
    contest_name: string,
    contest_type: string,
    description: string | undefined | null,
    time: Dayjs[],
    managers_list: GetContestManager_contest_manager_user[]
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [editingContest, setEditingContest] = useState<boolean>(false);//编辑or添加比赛
  const [contestID, setContestID] = useState<string>();//编辑比赛时的比赛ID
  const [form] = Form.useForm();

  const handleContestEdit = async () => {
    try {
      form.validateFields();
    } catch { }
    const values = form.getFieldsValue();
    //console.log(values);
    if (values.contest_name === undefined || values.contest_name === "" || values.time === undefined || values.contest_type === undefined) {
      return;
    }

    if (editingContest) {
      await updateContest({
        variables: {
          id: contestID,
          contest_name: values.contest_name,
          contest_type: values.contest_type,
          description: values.description ? values.description : "",
          start_date: values.time[0],
          end_date: values.time[1]
        }
      });

      if (values?.managers_list?.length > 0) {//已添加管理员
        await deleteContestManager({ variables: { contest_id: contestID } });
        values.managers_list.forEach(async (item: any) => {
          //console.log(item);

          try {
            const newUserData = await refetchUserId({ email: item.email, name: item.name });
            const user_id = newUserData.data.user[0]?._id;
            if (user_id) {
              addContestManager({
                variables: {
                  contest_id: contestID,
                  user_id: user_id,
                }
              });
            }
          } catch (userError: any) {
            if (userError) {
              message.error("用户信息查询失败");
              console.log(userError.message);
            }
          }
        });
      }
      setContestID("");
      setEditingContest(false);
      if (!contestUpdatingError && !managerAddError) {
        message.success("比赛修改成功");
      }
    } else {
      //id:添加的比赛的id
      const id = (await addContest({
        variables: {
          contest_name: values.contest_name,
          contest_type: values.contest_type,
          description: values.description,
          start_date: values.time[0],
          end_date: values.time[1]
        }
      })).data?.insert_contest?.returning[0].id;
      if (values?.managers_list?.length > 0) {//已添加管理员
        await deleteContestManager({ variables: { contest_id: id } });
        values.managers_list.forEach(async (item: any) => {
          console.log(item);

          try {
            const newUserData = await refetchUserId({ email: item.email, name: item.name });
            const user_id = newUserData.data.user[0]?._id;
            if (user_id) {
              addContestManager({
                variables: {
                  contest_id: id,
                  user_id: user_id,
                }
              });
            }
          } catch {

          }
        });
      }
      if (!contestAddingError && !managerAddError) {
        message.success("比赛添加成功");
      }
    }

    setModalVisible(false);
    form.resetFields();

    refetchContests();
  };

  const handleContestDelete = async (id: string) => {
    confirm({
      title: "确定要删除此比赛吗？",
      icon: <ExclamationCircleOutlined />,
      content: "这样做会删除此比赛的所有数据，此操作不可恢复。",
      onOk: async () => {
        await deleteContestInfo({ variables: { contest_id: id } });
        await deleteContestTeams({ variables: { contest_id: id } });
        await deleteContestRooms({ variables: { contest_id: id } });
        await deleteContestManager({ variables: { contest_id: id } });
        await deleteContest({ variables: { id } });
        await refetchContests();
      }
    });
  };

  //console.log(contestData?.contest);

  const index =
    <>
      <Row align="middle" justify="end">
        <Button
          css={`
            margin-top: 12px;
            margin-right: 24px;
          `}
          hidden={userInfo?.role !== "counselor" && userInfo?.role !== "root"}
          onClick={() => setModalVisible(true)}
        >
          添加新比赛
        </Button>
      </Row>

      <List
        dataSource={contestData?.contest}
        renderItem={(item) => (
          <ContestInfoCard
            key={item.id}
            css={`
            margin-top: 12px;
            margin-bottom: 24px;
            margin-left: 192px;
            margin-right:192px;
            `}
            onEditPress={userInfo?.role === "counselor" || userInfo?.role === "root"
              ? async () => {
                setEditingContest(true);
                try {
                  const managerData = await refetchContestManager({ contest_id: item.id });
                  const data: FormValues = {
                    contest_name: item?.contest_name,
                    contest_type: item?.contest_type,
                    description: item?.description,
                    time: [dayjs(item?.start_date), dayjs(item?.end_date)],
                    managers_list: managerData.data.contest_manager.map((value) => value.user)
                  };
                  setContestID(item?.id);
                  form.setFieldsValue(data);
                } catch {
                }
                setModalVisible(true);
              } : undefined}
            onDeletePress={userInfo?.role === "counselor" || userInfo?.role === "root"
              ? () => {
                handleContestDelete(item.id);
              } : undefined}
            name={item.contest_name}
            description={item.description}
            startDate={item.start_date}
            endDate={item.end_date}
            id={item.id} />
        )}
        loading={contestLoading}
      >
      </List>
      <Modal
        visible={modalVisible}
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
            name="contest_name"
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
            <Select
              style={{ width: '40%' }}
              allowClear
            >
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
          {/* 添加管理员 */}
          <Form.Item name="managers" label="管理员">
            <Form.List name="managers_list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "请输入管理员姓名或删除该栏",
                          },
                        ]}
                        style={{
                          width: "100px"
                        }}
                      >
                        <Input placeholder="姓名" allowClear />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'email']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "请输入管理员邮箱或删除该栏",
                          },
                          {
                            type: "email",
                            message: "请输入合法邮箱"
                          }
                        ]}
                        style={{
                          width: "250px"
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
                      style={{ width: '60%' }}
                      icon={<PlusOutlined />}>
                      添加管理员
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

        </Form>
      </Modal>
    </>;

  return (

    <>
      <Switch>
        <Route exact path={path}>
          {index}
        </Route>
        <Route path={path + "/:contestID"}>
          <MenuPage />
        </Route>
      </Switch>
    </>

  );

};

export default ContestSite;

export interface contestProps {
  contestID: string;
}

interface ContestInfoCardProps extends CardProps {
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  onEditPress?: () => void;
  onDeletePress?: () => void;
}

const ContestInfoCard: React.FC<ContestInfoCardProps> = (props) => {
  const {
    id,
    name,
    description,
    startDate,
    endDate,
    onEditPress,
    onDeletePress,
    ...restProps
  } = props;

  const { url } = useRouteMatch();

  const state = dayjs(endDate).isAfter(dayjs().format()) ? (dayjs(startDate).isBefore(dayjs().format()) ? "正在进行" : "未开始") : "已结束";

  return (
    <Card
      css={`
        padding: 20px;
        padding-bottom: 10px;
        &.ant-card-bordered {
        cursor: default;}
        `}
      title={<Text css={`
      font-size:x-large;
      font-weight:bold;
      `}>
        {name}
      </Text>}
      hoverable
      extra={
        <p><Link to={`${url}/${id}}`}>
          <Button size={"large"}>查看详情</Button>
        </Link>

        </p>
      }
      {...restProps}
    >
      {description &&
        <>
          <Text
            css={`
        margin: 12px 0 12px 0;
        white-space: pre-wrap;
        font-size:15px;
      `}>
            {description.replace(/#+ [^\r\n]*[\r\n]/g, "")}
          </Text>
          <Divider />
        </>}
      <Row>
        <Col span={6}>
          <Text
            css={`
            margin-left: 5px;
            font-style: italic;
            font-size: 14px;
          `}
          >
            {"开始时间:" + dayjs(startDate).format('YYYY-MM-DD')}
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
            {"结束时间:" + dayjs(endDate).format('YYYY-MM-DD')}
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
            style={{ color: (state === "正在进行") ? "green" : (state === "已结束") ? "red" : "black" }}
          >
            {state}
          </Text>
        </Col>
        <Col span={6}>
          <Space size={'large'}>
            {onEditPress && <EditOutlined onClick={onEditPress} />}
            {onDeletePress && <DeleteOutlined onClick={onDeletePress} />}
          </Space>
        </Col>
      </Row>

    </Card>
  )
};
