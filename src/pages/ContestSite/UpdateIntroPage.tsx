import { useEffect } from "react";
import styles from "./UpdateIntroPage.module.css";
import { message, Layout, Form, Input, Button } from "antd";
import { GetIntroContent as GET_INTRO_CONTENT } from "../../api/contest.graphql";
import { GetIntroContentVariables, GetIntroContent } from "../../api/types";
import { useQuery, useMutation } from "@apollo/client";
//-----------更新队伍名称、队伍简介----------------
import { UpdateIntro as UPDATEINTRO } from "../../api/contest.graphql";
import { UpdateIntro, UpdateIntroVariables } from "../../api/types";
const { TextArea } = Input;
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
          name="form"
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
            label="队式介绍"
            name="content"
            rules={[
              {
                required: true,
                message: "Please input the content!",
              },
            ]}
          >
            <TextArea
              defaultValue={introData?.article[0].content}
              autoSize={true}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </div>
  );
};

export default UpdateIntroPage;
