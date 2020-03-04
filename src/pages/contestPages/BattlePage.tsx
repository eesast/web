import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Icon,
  Select,
  Row,
  Col,
  Button,
  Modal,
  Upload
} from "antd";
import styles from "./BattlePage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { IAppState, ITeam } from "../../redux/types/state";
import { getTeams, getSelfTeam, getContestId } from "../../redux/actions/teams";
import { ColumnProps, PaginationConfig } from "antd/lib/table";

const { Title, Text } = Typography;

const BattlePage: React.FC = props => {
  // redux 数据
  const { user, teams, selfTeam, contestId, error, fetching } = useSelector(
    (state: IAppState) => {
      return {
        user: state.auth.user,
        teams: state.teams.items,
        selfTeam: state.teams.selfTeam,
        contestId: state.teams.contestId,
        error: state.teams.error,
        fetching: state.teams.fetching,
        totalTeams: state.teams.totalTeams
      };
    }
  );
  const dispatch = useDispatch();

  // 本页面的state
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedTeams, setSelectedTeams] = useState([0, 0, 0]); // 选中作为对手的teamId，比赛限制四队，0用于表示bot
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);

  // Table列
  const rankColumns: ColumnProps<ITeam>[] = [
    {
      title: "队伍",
      dataIndex: "name",
      key: "teamName"
    },
    {
      title: "分数",
      key: "score"
    }
  ];

  // 也可以考虑滚动加载的列表展示历史记录
  const historyColumns = [
    {
      title: "比赛结果",
      dataIndex: "result",
      key: "result"
    },
    {
      title: "对战成员",
      dataIndex: "teams",
      key: "teams"
    },
    {
      title: "回放文件",
      dataIndex: "file",
      key: "file"
    }
  ];

  const handlePageChange = (currentPage: number, nextPageSize?: number) => {
    setPageNumber(currentPage);
    if (nextPageSize) setPageSize(nextPageSize);
  };

  const handlePageSizeChange = (current: number, nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPageNumber(current);
  };

  const handleCodeModal = () => {
    setShowCodeModal(!showCodeModal);
  };

  const handleHistoryModal = () => {
    setShowHistoryModal(!showHistoryModal);
  };

  const handleBattleModal = () => {
    setShowBattleModal(!showBattleModal);
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(getTeams(false, "队式", 2020));
      dispatch(getSelfTeam("队式", 2020));
    };

    if (contestId) {
      fetchData();
    } else {
      dispatch(getContestId("队式", 2020));
    }
  }, [contestId]);

  const selectChildren = teams.map((team: ITeam) => (
    <Select.Option key={team.id}>{team.name}</Select.Option>
  ));

  const rankPagination: PaginationConfig = {
    total: teams.length,
    current: pageNumber,
    pageSize: pageSize,
    showSizeChanger: true,
    onChange: handlePageChange,
    onShowSizeChange: handlePageSizeChange,
    pageSizeOptions: ["5", "10", "20"]
  };

  return (
    <div className={styles.root}>
      <div style={{ width: "80%" }}>
        {/* 选择比赛用的代码，介绍对战，选择对手 */}
        <Row gutter={16} align="middle" type="flex" justify="space-between">
          <Col span={12}>
            <Typography>
              <Title level={4}>Tips</Title>
              <Text strong>代码管理</Text>
              <br />
              两个角色，各一份代码。我们只会保留最新的一整份代码。
              <br />
              <Text strong>历史记录</Text>
              <br />
              历次对战的结果和回放文件。
              <br />
              <Text strong>对战</Text>
              <br />
              每场比赛支持最多四支队伍（包括Bot）同时对战
            </Typography>
          </Col>
          <Col span={12}>
            <Row gutter={[16, 16]} justify="end">
              <Col span={24}>
                <Button icon="code" size="large" onClick={handleCodeModal}>
                  代码管理
                </Button>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="end">
              <Col span={24}>
                <Button
                  icon="history"
                  size="large"
                  onClick={handleHistoryModal}
                >
                  历史记录
                </Button>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="end">
              <Col span={24}>
                <Button
                  icon="thunderbolt"
                  size="large"
                  type="primary"
                  onClick={handleBattleModal}
                >
                  开始游戏
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Table
        className={styles.list}
        columns={rankColumns}
        dataSource={teams.slice(
          (pageNumber - 1) * pageSize,
          pageNumber * pageSize
        )}
        pagination={rankPagination}
      />
      <Modal
        title="代码管理"
        visible={showCodeModal}
        closable
        footer={null}
        onCancel={handleCodeModal}
      >
        {/* 代码上传的细节尚未实现，需考虑限制两份代码，上传使用的api等 */}
        <Upload>
          <Button>
            <Icon type="upload" theme="outlined" /> 上传代码
          </Button>
        </Upload>
      </Modal>

      <Modal
        visible={showHistoryModal}
        title="历史记录"
        closable
        footer={null}
        onCancel={handleHistoryModal}
      >
        <Table className={styles.list} columns={historyColumns} />
      </Modal>

      <Modal
        visible={showBattleModal}
        title="对战准备"
        closable
        footer={null}
        onCancel={handleBattleModal}
      >
        <Select
          mode="multiple"
          size="large"
          style={{ width: "100%" }}
          value={selectedTeams}
          onSelect={(value: number) => {
            setSelectedTeams([...selectedTeams, value]);
          }}
          onDeselect={(value: number) => {}}
        >
          {selectChildren}
        </Select>
      </Modal>
    </div>
  );
};

export default BattlePage;
