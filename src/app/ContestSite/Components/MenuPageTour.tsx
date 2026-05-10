import React, { useState } from "react";
import { Tour, TourProps } from "antd";
import { MenuGuideRefs } from "./MenuPageSider";

interface MenuPageTourProps {
  contestFullname?: string | null;
  guideRefs: MenuGuideRefs;
  isMobile: boolean;
}

const getTourTarget =
  <T extends HTMLElement>(ref: React.RefObject<T>) =>
  () =>
    ref.current!;

const MenuPageTour: React.FC<MenuPageTourProps> = ({
  contestFullname,
  guideRefs,
  isMobile,
}) => {
  const [open, setOpen] = useState<boolean>(
    localStorage.getItem("tour_contest") !== "true" &&
      process.env.NODE_ENV !== "development",
  );
  const name = contestFullname || "";

  const steps: TourProps["steps"] = [
    {
      title: name,
      description: `欢迎参加${name}比赛！下面让我来帮助你熟悉赛事互动页面，帮助你更好地参加比赛吧！`,
      target: null,
      mask: {
        style: {
          backdropFilter: "blur(8px)",
        },
      },
    },
    {
      title: "带你了解",
      description:
        "在这里，你可以查看比赛的基本介绍、时间安排和比赛公告，请及时关注~",
      placement: "right",
      target: getTourTarget(guideRefs.introRef),
    },
    {
      title: "游玩时刻",
      description:
        "在这里，你可以试玩我们的游戏，还可以观看比赛直播和比赛回放！",
      placement: "right",
      target: getTourTarget(guideRefs.playRef),
    },
    {
      title: "现在报名",
      description: "在这里，你可以选择自己创建队伍或者加入别人的队伍~",
      placement: "right",
      target: getTourTarget(guideRefs.joinRef),
    },
    {
      title: "代码提交",
      description: "比赛的代码在这里提交~",
      placement: "right",
      target: getTourTarget(guideRefs.codeRef),
    },
    {
      title: "天梯试炼",
      description:
        "在这里，你可以查看比赛的积分榜，查看队伍的对战记录，甚至还有专属于你们队伍的数据分析！",
      placement: "right",
      target: getTourTarget(guideRefs.arenaRef),
    },
  ];

  return (
    <Tour
      open={open && !isMobile}
      onClose={() => {
        setOpen(false);
        localStorage.setItem("tour_contest", "true");
      }}
      steps={steps}
    />
  );
};

export default MenuPageTour;
