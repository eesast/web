import { useEffect } from "react";
import styles from "./UpdateIntroPage.module.css";
<<<<<<< HEAD:src/pages/ThuaiSite/UpdateIntroPage.tsx
import { Layout, message,  Form,Input, Button, Select,Space, Typography} from "antd";
import { UserOutlined,BranchesOutlined} from '@ant-design/icons';
import { GetIntroContent as GET_INTRO_CONTENT } from "../../api/contest.graphql";
import { GetAllContest as GET_ALL_CONTEST } from "../../api/contest.graphql";
import {GetAllContest} from "../../api/types";
=======
import { message, Layout, Form, Input, Button } from "antd";
import { GetIntroContent as GET_INTRO_CONTENT } from "../../api/contest.graphql";
>>>>>>> 8e8660e6fa5746c69d5bc5041e94a554b31e28b6:src/pages/ContestSite/UpdateIntroPage.tsx
import { GetIntroContentVariables, GetIntroContent } from "../../api/types";
import { useQuery, useMutation } from "@apollo/client";
//-----------更新队伍名称、队伍简介----------------
import { UpdateIntro as UPDATEINTRO } from "../../api/contest.graphql";
import { UpdateIntro, UpdateIntroVariables } from "../../api/types";
import React from "react";
const { TextArea } = Input;
//const {Content} = Layout;
const { Text } = Typography;
//const style = {padding: '8px 0', width: '20%'};
const UpdateIntroPage = () => {
const [form] = Form.useForm();
  const {
    data: introData,
    error: introError,
    refetch: refetchintro,
  } = useQuery<GetIntroContent, GetIntroContentVariables>(GET_INTRO_CONTENT, {
    variables: {
      id: 3,
    },
  });

  // 获取所有比赛
  const {
    data: contestData,
    //loading: getContestLoading,
    error: getContestError,
  } = useQuery<GetAllContest>(GET_ALL_CONTEST);

  useEffect(() => {
    if (getContestError) {
      message.error("信息获取失败");
      console.log(getContestError.message);
    }
  }, [getContestError]);

  //const contestNum = contestData?.contest.length;
  const {Option} = Select;

  function handleChange(value:String){
    console.log(value);
  }

  const ContestInput :React.FC = () =>(
    <Input.Group>
      <Select defaultValue = {contestData?.contest[0].contest_name}
      notFoundContent="当前无比赛"
      size = "middle"
      onChange = {handleChange}
      >
      {
        contestData?.contest.map((item,index)=>{
          return (<Option value={item.contest_name}>{item.contest_name}</Option>)
        })
      }
      </Select>
    </Input.Group>
  )


  //更新队伍信息
  const [
    UpdateIntro,
    { data: UpdateIntroData, error: UpdateIntroError },
  ] = useMutation<UpdateIntro, UpdateIntroVariables>(UPDATEINTRO);
  useEffect(() => {
    if (introError) {
      message.error("加载失败");
    }
  }, [introError]);
  useEffect(() => {
    console.log("intro", introData);
  }, [introData]);
  useEffect(() => {
    if (UpdateIntroData && !UpdateIntroError) {
      message.success("更新成功");
    }
  }, [UpdateIntroData, UpdateIntroError]);
  const onFinish = async (record: any) => {
    const newinfo = {
      id: 3,
      content: record.content,
    };
    UpdateIntro({
      variables: newinfo,
    });
    await refetchintro();
  };
  return (
    <div className={styles.root}>
      <Layout>
        <Form
          name="complex-form"
          form={form} //表单名字绑定
          layout="vertical"
          onFinish={onFinish}
          css={`
            width: 500px;
            padding-top: 24px;
            padding-bottom: 12px;
            &.ant-card-bordered {
              cursor: default;
            }
          `}
        >
          <Form.Item
            label = "当前比赛"
            name = "content"
            rules={[
              {
                required: true,
                message: "Please select the contest!",
              }]}
            >
            <Space>
              <ContestInput/>
              <Button type = "primary">修改当前比赛</Button>
            </Space>

          </Form.Item>
          <Form.Item
            label="比赛介绍"
            name="content"
            rules={[
              {
                required: true,
                message: "Please input the content!",
              },
            ]}
            required tooltip="将在网站比赛介绍页面上显示"
          >
            <Space>
            <TextArea
              defaultValue={introData?.article[0].content}
              autoSize={true}
            />

            <Button type="primary" htmlType="submit">
              修改介绍
            </Button>
            </Space>
          </Form.Item>
          <Form.Item
          label = "添加队员"
          required tooltip="比赛管理员可以通过这种方式手动为队伍添加队员">
            <Input style={{ width: '25%' } } prefix={<UserOutlined />} placeholder = "队员学号"/>
            <Space />
            <Text>加入到 </Text>
            <Input style={{ width: '30%' }} prefix = {<BranchesOutlined />} placeholder = "队伍名称"/>
            <Text>当中。</Text>
          </Form.Item>
          <Form.Item>
          <Button type="primary">
              确认加入
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </div>
  // <div className={styles.root}>
  //   <Layout className="layout">
  //   <Content style={{
  //   width : "800px",
  //   padding:"12px 24px 12px 24px",
  //   margin:"0 0 0 0",
  //   backgroundColor:"LightGray",
  //   }}>
  //   <Divider orientation = "left">
  //     <Text editable={{
  //       icon:<QuestionCircleOutlined />,
  //       tooltip:'更改当前比赛'
  //   }}>当前比赛</Text>
  //   </Divider>
  //   <Row justify="start" align="middle">

  //   <Col span = {4}>
  //         <ContestInput/>
  //   </Col>

  //     <Col  span={4} offset={15}>
  //       <div style={style}><Button type = "primary">修改比赛</Button></div>
  //     </Col>
  //   </Row>
  //   <Divider orientation = "left">
  //     <Text editable={{
  //       icon:<QuestionCircleOutlined />,
  //       tooltip:'比赛介绍将在比赛介绍页面显示'
  //   }}>比赛介绍</Text>
  //   </Divider>
  //   <Row  align="middle" justify = "start">
  //     <Space/>
  //     <Col  span={16} >
  //            <TextArea
  //              defaultValue={introData?.article[0].content}
  //             autoSize={true}
  //           />
  //     </Col>
  //     <Col  span={4} offset={2} >
  //           <Button type="primary" htmlType="submit" onClick = {onFinish}>
  //             修改介绍
  //           </Button>
  //     </Col>
  //   </Row>
  //   <Divider orientation = "left">
  //     <Text editable={{
  //       icon:<QuestionCircleOutlined />,
  //       tooltip:'管理员手动添加队员'
  //   }}>添加队员</Text>
  //   </Divider>
  //   <Row justify="start" align="middle">
  //     <Col className="gutter-row" span = {4}>
  //       <Input prefix={<UserOutlined />} placeholder = "队员学号"/>
  //     </Col>
  //     <Col className="gutter-row" span={2}>
  //       加入到
  //     </Col>
  //     <Col className="gutter-row" span={8}>
  //       <Input  prefix = {<BranchesOutlined />} placeholder = "队伍名称"/>
  //     </Col>
  //     <Col className="gutter-row" span={2}>
  //       当中。
  //     </Col>
  //     <Col offset={3}>
  //       <Button type="primary">
  //         确认添加
  //       </Button>
  //     </Col>
  //   </Row>
  //   <Divider orientation = "left">
  //     <Text copyable={{
  //       icon:<QuestionCircleOutlined />,
  //       tooltips:"管理员手动编译选手代码"
  //   }}>上传代码</Text>
  //   </Divider>
  //   <Row justify="start">
  //   <Col  span = {4}>
  //       <Input prefix={<UserOutlined />} placeholder = "选手学号"/>
  //     </Col>
  //     <Col className="gutter-row" span={2}/>
  //     <Col  span={10}>
  //       <Input  prefix = {<BranchesOutlined />} placeholder = "队伍名称"/>
  //     </Col>
  //     <Col  span={2}/>
  //     <br/><br/>
  //   </Row>
  //   <Row justify="start">
  //     <Col span = {16}>
  //     <TextArea  placeholder="输入选手代码" showCount={true} allowClear={true}/>
  //     </Col>
  //     <Col span = {4} offset={2}>
  //         <Button type="primary">
  //              上传代码
  //         </Button>
  //     </Col>

  //   </Row>
  //   </Content>
  //   </Layout>
  // </div>
    );
};
export default UpdateIntroPage;
