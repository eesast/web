import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Modal,
  Select,
  Typography,
  message,
} from "antd";
import { ContestProps } from "..";
import axios from "axios";
import { ForwardOutlined } from "@ant-design/icons";
import * as graphql from "@/generated/graphql";
import { useUrl } from "@/api/hooks/url";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;

const Competition: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [runForm] = Form.useForm();
  const { Option } = Select;

  const { data: contestMapData, error: contestMapError } =
    graphql.useGetContestMapsQuery({
      variables: {
        contest_id: Contest_id,
      },
    });

  const [addContestRound, { error: addRoundError }] =
    graphql.useAddContestRoundMutation();

  useEffect(() => {
    if (addRoundError) {
      message.error("比赛轮次添加失败");
      console.log(addRoundError.message);
    }
  }, [addRoundError]);

  useEffect(() => {
    if (contestMapError) {
      message.error("比赛地图加载失败");
      console.log(contestMapError.message);
    }
  }, [contestMapError]);

  //运行比赛
  const runContest = async (round_name: string, map_uuid: string) => {
    try {
      const response = await addContestRound({
        variables: {
          contest_id: Contest_id,
          name: round_name,
          map_id: map_uuid,
        },
      });

      await axios.post("/competition/start-all", {
        round_id: response.data?.insert_contest_round_one?.round_id,
      });

      message.info("正在运行比赛:" + round_name);
    } catch (e) {
      message.error("运行比赛失败!");
      console.log(e);
    }
  };

  const handleRunContest = () => {
    runForm
      .validateFields()
      .then((values) => {
        const roundName = values.round_name;
        const contestMapId = values.map_id;
        runContest(roundName, contestMapId);
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          开赛情况
        </Title>
        <Button
          type="primary"
          icon={<ForwardOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          运行比赛
        </Button>
        <Modal
          open={isModalVisible}
          title="运行比赛"
          centered
          okText="运行"
          maskClosable={false}
          onCancel={() => {
            setIsModalVisible(false);
            runForm.resetFields();
          }}
          onOk={handleRunContest}
          destroyOnClose
        >
          <Form
            form={runForm}
            name="battle"
            onFinishFailed={(errorInfo: any) => {
              console.log("Failed:", errorInfo);
            }}
            preserve={false}
          >
            <Form.Item
              name="round_name"
              label="本轮比赛名称"
              rules={[{ required: true, message: "请输入比赛名称" }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="map_id"
              label="比赛地图"
              rules={[{ required: true, message: "请选择比赛地图" }]}
            >
              <Select style={{ width: "40%" }} allowClear>
                {contestMapData?.contest_map.map((map) => (
                  <Option key={map.map_id} value={map.map_id}>
                    {map.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </Layout>
  );
};

export default Competition;
