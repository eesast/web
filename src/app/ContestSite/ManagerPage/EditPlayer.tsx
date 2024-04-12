import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Typography,
  message,
  theme,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { ContestProps } from "..";
import { useUrl } from "@/api/hooks/url";
import * as graphql from "@/generated/graphql";

/* ---------------- 不随渲染刷新的常量 ---------------- */
const { Title } = Typography;

const EditPlayer: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const {
    data: contestPlayersData,
    error: getContestPlayersError,
    refetch: refetchContestPlayers,
  } = graphql.useGetContestPlayersSuspenseQuery({
    variables: {
      contest_id: Contest_id,
    },
  });
  useEffect(() => {
    if (getContestPlayersError) {
      message.error("比赛加载失败");
    }
  }, [getContestPlayersError]);

  // const [addContestPlayer, { error: addPlayerError }] =
  //   graphql.useAddContestPlayerMutation();
  // useEffect(() => {
  //   if (addPlayerError) {
  //     message.error("添加角色失败");
  //   }
  // }, [addPlayerError]);

  const handleAdd = async () => {
    try {
      message.warning("暂不支持添加角色");
      // const values = await addPlayerForm.validateFields();
      // await addContestPlayer({
      //   variables: {
      //     contest_id: Contest_id,
      //     team_label: values.team_label,
      //     player_label: values.player_label,
      //     roles_available: values.roles_available,
      //   },
      // });
      // if (addPlayerError) throw new Error(addPlayerError.message);
      // message.success("角色添加成功");
      refetchContestPlayers();
      setIsModalVisible(false);
      addPlayerForm.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [addPlayerForm] = Form.useForm();

  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const players = contestPlayersData?.contest_player.map((item) => ({
    key: item.team_label + " / " + item.player_label,
    label: item.team_label + " / " + item.player_label,
    style: panelStyle,
    children: <>可选属性：{item.roles_available}</>,
  }));

  return (
    <Layout>
      <Card
        hoverable
        style={{
          padding: "2vh 1vw",
        }}
      >
        <Title level={2} style={{ margin: `0 0 24px` }}>
          战队角色编辑
        </Title>
        <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={players}
        />
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "36px",
          }}
        >
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            添加新角色
          </Button>
        </Row>
      </Card>
      <Modal
        open={isModalVisible}
        title="添加新角色"
        centered
        onCancel={() => {
          setIsModalVisible(false);
          addPlayerForm.resetFields();
        }}
        onOk={handleAdd}
        destroyOnClose
      >
        <Form form={addPlayerForm} name="addMap" preserve={false}>
          <Form.Item
            name="team_label"
            label="战队名称"
            rules={[{ required: true, message: "请输入战队名称" }]}
          >
            <Input allowClear placeholder="例：Tricker" />
          </Form.Item>
          <Form.Item
            name="player_label"
            label="角色名称"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input allowClear placeholder="例：Ship1" />
          </Form.Item>
          <Form.Item
            name="roles_available"
            label="可选属性"
            rules={[{ required: true, message: "请输入可选属性" }]}
          >
            <Input allowClear placeholder='例：["Attacker", "Healer"]' />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default EditPlayer;
