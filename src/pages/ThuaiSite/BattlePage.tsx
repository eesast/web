import React, { useState } from "react";
import {
  Table,
  Typography,
  Select,
  Row,
  Col,
  Button,
  Modal,
  Upload,
  Radio,
} from "antd";
import styles from "./BattlePage.module.css";
const { Title, Text } = Typography;
const BattlePage: React.FC = () => {
  //   const [codeList, setCodeList] = useState<ICode[]>([]);
  //   const [historyList, setHistoryList] = useState<IRoom[]>([]);
  //   const [pageSize, setPageSize] = useState(5);
  //   const [pageNumber, setPageNumber] = useState(1);
  //  const [selectedTeams, setSelectedTeams] = useState<number[]>([]); // 选中作为对手的teamId，比赛限制四队，0用于表示bot
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showCompileInfoModal, setShowCompileInfoModal] = useState(false);
  const [showCodeContentModal, setShowCodeContentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);
  //   const [forceUpdate, setForceUpdate] = useState(true); // 更改以强制重新获取数据
  //   const [codeRole, setCodeRole] = useState(1); // 代码对应角色
  //   const [selectedCode, setSelectedCode] = useState<ICode[]>([]); // 选择要编译的代码
  //   const [showCompileInfo, setShowCompileInfo] = useState(""); // 查看的编译结果
  //   const [showCodeContent, setShowCodeContent] = useState(""); // 查看的代码内容
  //   const handlePageChange = (currentPage: number, nextPageSize?: number) => {
  //     setPageNumber(currentPage);
  //     if (nextPageSize) setPageSize(nextPageSize);
  //   };

  //   const handlePageSizeChange = (current: number, nextPageSize: number) => {
  //     setPageSize(nextPageSize);
  //     setPageNumber(current);
  //   };

  const handleCodeModal = () => {
    setShowCodeModal(!showCodeModal);
  };

  const handleHistoryModal = () => {
    setShowHistoryModal(!showHistoryModal);
  };

  const handleBattleModal = () => {
    setShowBattleModal(!showBattleModal);
  };

  const handleCompileInfoModal = () => {
    setShowCompileInfoModal(false);
    setShowCodeModal(true);
  };

  //   const handleShowCompileInfo = (compileInfo: string) => {
  //     if (compileInfo) setShowCompileInfo(compileInfo.replace("#", "\n"));
  //     else setShowCompileInfo("暂无编译信息");
  //     setShowCompileInfoModal(true);
  //     setShowCodeModal(false);
  //   };

  const handleCodeContentModal = () => {
    setShowCodeContentModal(false);
    setShowCodeModal(true);
  };

  //   const handleShowCodeContent = (content: string) => {
  //     if (content) setShowCodeContent(content);
  //     else setShowCodeContent("暂无编译信息");
  //     setShowCodeContentModal(true);
  //     setShowCodeModal(false);
  //   };

  return (
    <div className={styles.root}>
      <div style={{ width: "80%" }}>
        {/* 选择比赛用的代码，介绍对战，选择对手 */}
        <Row gutter={16} align="middle" justify="space-between">
          <Col span={12}>
            <Typography>
              <Title level={4}>Tips</Title>
              <Text strong>代码管理</Text>
              <br />
              四个角色，各一份代码。我们只会保留最新的一整份代码供操作。
              <br />
              <Text strong>历史记录</Text>
              <br />
              历次对战的结果和回放文件。
              <br />
              <Text strong>对战</Text>
              <br />
              每场比赛支持最多四支队伍同时对战
            </Typography>
          </Col>
          <Col span={12}>
            <Row gutter={[16, 16]} justify="end">
              <Col span={24}>
                <Button size="large" onClick={handleCodeModal}>
                  代码管理
                </Button>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="end">
              <Col span={24}>
                <Button size="large" onClick={handleHistoryModal}>
                  历史记录
                </Button>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="end">
              <Col span={24}>
                <Button size="large" type="primary" onClick={handleBattleModal}>
                  开始游戏
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Table
        className={styles.list}
        //columns={rankColumns}
        // dataSource={teams.slice(
        //   (pageNumber - 1) * pageSize,
        //   pageNumber * pageSize
        // )}
        // pagination={rankPagination}
        // loading={fetching}
      />
      <Modal
        title="代码管理"
        width="40%"
        visible={showCodeModal}
        closable
        footer={null}
        onCancel={handleCodeModal}
      >
        <Row justify="space-between">
          <Col span={8}>
            <Upload
              fileList={[]} // 暂不考虑文件上传列表展示
              //onChange={handleCodeChange}
              //customRequest={handleCodeUpload}
            >
              <Button>上传代码</Button>
            </Upload>
          </Col>
          <Col span={8}>
            AI角色
            <Radio.Group
            //   value={codeRole}
            //   onChange={(event) => {
            //     setCodeRole(event.target.value);
            //   }}
            >
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
            </Radio.Group>
          </Col>
          <Col span={4}></Col>
          <Col span={4}>
            <Button
              type="primary"
              //   onClick={() => {
              //     handleCodeCompile(selectedCode[0], codeRole);
              //     message.info("编译需要一段时间，请稍后刷新以查看");
              //   }}
            >
              编译
            </Button>
          </Col>
        </Row>
        <Table
        //   columns={codeColumns}
        //   dataSource={codeList}
        //   rowSelection={codeSelctionConfig}
        //   pagination={false}
        />
      </Modal>

      <Modal
        visible={showCompileInfoModal}
        title="编译结果"
        closable
        footer={null}
        onCancel={handleCompileInfoModal}
      >
        {/* <div style={{ whiteSpace: "pre" }}>{showCompileInfo}</div> */}
      </Modal>

      <Modal
        visible={showCodeContentModal}
        title="代码"
        closable
        footer={null}
        onCancel={handleCodeContentModal}
      >
        <Button id="copyButton">复制代码</Button>
        {/* <div style={{ whiteSpace: "pre" }} id="codeContent">
          {showCodeContent}
        </div> */}
      </Modal>

      <Modal
        visible={showHistoryModal}
        title="历史记录"
        width="40%"
        closable
        footer={null}
        onCancel={handleHistoryModal}
      >
        {/* <Table columns={historyColumns} dataSource={historyList} /> */}
      </Modal>

      <Modal
        visible={showBattleModal}
        title="对战准备"
        closable
        footer={null}
        onCancel={handleBattleModal}
      >
        <Row gutter={16}>
          <Col span={20}>
            <Select
              mode="multiple"
              size="large"
              style={{ width: "100%" }}
              //value={selectedTeams}
              //onChange={handleSelectedChange}
            >
              {/* {selectChildren} */}
            </Select>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              size="large"
              //onClick={handleBattleStart}
            >
              Start
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default BattlePage;
