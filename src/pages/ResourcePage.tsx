import { message, List, Button } from "antd";
import React, { useState, useEffect } from "react";
import { IAnnouncement, getAnnouncements } from "../api/announcements";
import { getContestId } from "../redux/actions/teams";
import { connect } from "react-redux";
import { IAppState } from "../redux/types/state";
import { stat } from "fs";

interface IResourcePageStateProps {
  contestId?: number;
  error?: Error | null;
}

interface IResourcePageDispatchProps {
  getContestId: (type: string, year: number) => void;
}

type IResourcePageProps = IResourcePageStateProps & IResourcePageDispatchProps;

const ResourcePage: React.FC<IResourcePageProps> = props => {
  const { contestId, error } = props;

  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (error) {
      message.error("公告加载失败");
    }
  }, [error]);

  const getMoreAnnouncements = async () => {
    setLoading(true);
    let newAnnouncements: IAnnouncement[] = [];
    try {
      if (!contestId) {
        props.getContestId("电设", 2019);
      }
      newAnnouncements = await getAnnouncements(
        page * 5,
        (page + 1) * 5 - 1,
        contestId!
      );
    } catch {
      message.error("公告加载失败");
    }

    setLoading(false);

    if (newAnnouncements.length === 0) {
      message.info("无更多公告");
      return;
    }

    setAnnouncements(announcements => announcements.concat(newAnnouncements));
    setPage(page + 1);
  };

  useEffect(() => {
    getMoreAnnouncements();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <List
        loading={loading}
        itemLayout="horizontal"
        loadMore={true}
        dataSource={announcements}
        renderItem={(item: IAnnouncement) => (
          <List.Item>
            <List.Item.Meta title={item.title} />
            <div>{item.content}</div>
          </List.Item>
        )}
      />
      <Button onClick={getMoreAnnouncements}>查看更多公告</Button>
    </div>
  );
};

function mapStateToProps(state: IAppState): IResourcePageStateProps {
  return {
    contestId: state.teams.contestId,
    error: state.teams.error
  };
}

const mapDispatchToProps: IResourcePageDispatchProps = {
  getContestId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcePage);
