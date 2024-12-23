import React, { useEffect, useState } from "react";
import { Tabs, Typography, Divider, Image } from "antd";
import styled from "styled-components";
import Center from "../Components/Center";
import { PageProps } from "..";
import { useLocation } from "react-router-dom";

const { Title } = Typography;

const StyledTypography = styled(Typography)`
  padding: 48px 10vw;
`;
const Bold = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin: 12px 0;
`;
const P = styled.p`
  font-size: 20px;
  margin: 12px 0;
`;
const ListItem = styled(P)`
  list-style-type: disc;
  padding-left: 40px;
`;

const Contest1 = () => (
  <StyledTypography>
    <Title level={2}>队式程序设计大赛（THUAI）</Title>
    <Title level={3}>赛事时间</Title>
    <P>
      队式程序设计大赛在【春季学期】举行。在激烈的赛程之前，会有电子系科协举办的培训讲座，帮助选手们快速上手，参与进紧张有趣的赛程中，感受
      AI 的编程之美。
    </P>
    <Divider />
    <Title level={3}>赛事简介</Title>
    <P>
      “队式程序设计大赛”是由清华大学电子系科协举办的一项经典赛事，是一个组队参加的对抗性策略程序设计比赛。比赛主题往往基于某款经典电子游戏，设计出的全新规则，邀请选手组队设计出更加完善和智能的游戏策略，并用高效的程序代码实现。比赛往往以双方
      AI
      对战的形式进行，决赛时还会使用3D界面向全场播送比赛实况，对抗性和观赏性极强，为清华大学内一年一度的程序设计盛事。
    </P>
    <Title level={3}>精彩回顾</Title>
    <Bold></Bold>
    <Center direction="column">
      <Image
        alt="THUAI_7_cover"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_THUAI_7.png`}
        width={800}
      />
      <P>THUAI7——星际指挥官：AI 前线</P>
      <P></P>
      <Image
        alt="THUAI_6_cover"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_THUAI_6.jpg`}
        width={800}
      />
      <P>THUAI6——毕业吧少女</P>
      <P></P>
      <Image
        alt="THUAI_5_cover"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_THUAI_5.jpg`}
        width={800}
      />
      <P>THUAI5——机算夺魁</P>
      <P></P>
      <Image
        alt="THUAI_4_cover"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_THUAI_4.png`}
        width={800}
      />
      <P>THUAI4——清彩无限</P>
      <P></P>
    </Center>
  </StyledTypography>
);
const Contest2 = () => (
  <StyledTypography>
    <Title level={2}>硬件设计大赛</Title>
    <Title level={3}>赛事时间</Title>
    <P>硬件设计大赛在每年【暑假小学期】举办，大概持续两周时间。</P>
    <Divider />
    <Title level={3}>赛事简介</Title>
    <P>
      硬件设计大赛是清华大学电子系主办的一个比赛，主要面向电子系零基础的同学，赛前有若干次培训讲座，现场发放相应的模块，带领大家从零开始接触、学习单片机的基本操作，旨在激发同学们对硬件的热情。
    </P>
    <Title level={3}>精彩回顾</Title>
    <Bold></Bold>
    <Center direction="column">
      <Image
        alt="hardware_2024_cover_1"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_hardware_2024_1.jpg`}
        width={600}
      />
      <P>2024 特等奖——Deskbot 桌宠机器人</P>
      <P></P>
      <Image
        alt="hardware_2023_cover_1"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_hardware_2023_1.jpg`}
        width={600}
      />
      <P>2023 特等奖——全自动饮品制作机</P>
      <P></P>
      <Image
        alt="hardware_2023_cover_2"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_hardware_2023_2.jpg`}
        width={600}
      />
      <P>2023 一等奖——多功能蓝牙手套</P>
      <P></P>
      <Image
        alt="hardware_2022_cover_1"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_hardware_2022_1.jpg`}
        width={600}
      />
      <P>2022 特等奖——FPS 体感射击手枪</P>
      <P></P>
      <Image
        alt="hardware_2023_cover_2"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_hardware_2022_2.jpg`}
        width={600}
      />
      <P>2022 一等奖——遥控航拍无人机</P>
    </Center>
  </StyledTypography>
);
const Contest3 = () => (
  <StyledTypography>
    <Title level={2}>软件设计大赛</Title>
    <Title level={3}>赛事时间</Title>
    <P>
      软件设计大赛在每年【寒假前后】举办。软件设计大赛要求参赛者使用当今主流的技术栈，面向某个特定需求，完成一套具备一定可用性和美观性的软件程序。对于“软件”的定义十分宽泛，游戏、网站、APP
      都可以作为作品提交。
    </P>
    <Divider />
    <Title level={3}>参赛要求</Title>
    <P>
      <ListItem>
        参赛者以个人为单位参加比赛。每名同学也可提交不超过 2 个作品。
      </ListItem>
      <ListItem>参赛选手应当是清华大学在校学生。</ListItem>
      <ListItem>
        参赛者应当在指定时间内以指定的方式完成队伍报名和程序提交。
      </ListItem>
    </P>
    <Divider />
    <Title level={3}>作品要求</Title>
    <ListItem>
      美观性：提交作品需要对 UI 有基本的设计，具有一定的美观性。
    </ListItem>
    <ListItem>功能性：提交作品需要针对某一类需求，提供一种解决方案。</ListItem>
    <ListItem>原创性：提交作品应当为选手的原创作品。</ListItem>
    <ListItem>
      稳定性：提交作品需要具有一定的稳定性，尽可能的减少异常和出错的概率。
    </ListItem>
    <Title level={3}>精彩回顾</Title>
    <Center direction="column">
      <Bold></Bold>
      <Image
        alt="software_cover_2024"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_software_2024.jpg`}
        width={800}
      />
      <P>2024 特等奖——如果光有声音</P>
      <P></P>
      <Image
        alt="software_cover_2023"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_software_2023.jpg`}
        width={800}
      />
      <P>2023 特等奖——Dimland: Midnight Traverse</P>
      <P></P>
      <Image
        alt="software_cover_2022"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_software_2022.jpg`}
        width={800}
      />
      <P>2022 特等奖——Galaxy</P>
      <P></P>
      <Image
        alt="software_cover_2021"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_software_2021.jpg`}
        width={800}
      />
      <P>2021 特等奖——Not Quite Accurate Battle Simulator</P>
      <P></P>
    </Center>
  </StyledTypography>
);
const Contest4 = () => (
  <StyledTypography>
    <Title level={2}>智能无人机挑战赛</Title>
    <Title level={3}>赛事介绍</Title>
    <P>
      清华大学智能无人机挑战赛（全校本科生编程类赛事）由清华大学团委、清华大学电子工程系和基础工业训练中心主办，旨在鼓励对无人机智能操控感兴趣的同学发展兴趣爱好。本赛事会提供相关课程学习以便选手掌握相关理论知识，参与创新实践。
    </P>
    <P></P>
    <Divider />
    <Title level={3}>赛事特点</Title>
    <P>
      智能无人机挑战赛是“赛课结合”的典型案例，与本学期开设的2学分课程《智能无人机技术设计实践》相联动。通过参加理论教学和实验辅导，选手将从中获得有针对性的备赛辅导，有效提高参赛竞争力。
      大赛选用Python为主要编程语言，以地空协同为赛题背景，希望引导同学们从所学知识出发，关注实际问题，在团队合作中大胆创新，将科技与现实有效结合，做出优秀作品。选手们可以在课程中学习到ROS系统、无人机路径规划、图像识别等知识，并用理论指导实践，在老师和助教的帮助下得到有针对性的备赛辅导，增强软硬件协同编程的能力，有效提高选手的参赛竞争力。
    </P>
    <P></P>
    <Divider />
    <Title level={3}>赛事风采</Title>
    <Center direction="column">
      <Bold></Bold>
      <Image
        alt="uav_cover_1"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_uav_1.jpg`}
        width={800}
      />
      <P>第四届智能无人机挑战赛决赛现场</P>
      <P></P>
      <Image
        alt="uav_cover_2"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_uav_2.jpg`}
        width={800}
      />
      <P>第四届智能无人机挑战赛选手风采</P>
      <P></P>
    </Center>
  </StyledTypography>
);
const Contest5 = () => (
  <StyledTypography>
    <Title level={2}>新生信息知识竞赛</Title>
    <Title level={3}>赛事时间</Title>
    <P>
      ADI
      杯新生信息知识竞赛在【秋季学期】举行，在新生入学后会有相关的宣传工作，通常期中考试前结束所有工作。
    </P>
    <Divider />
    <Title level={3}>赛事简介</Title>
    <P>
      清华大学 ADI 杯新生信息知识竞赛至今已成功举办 20
      届。该活动是由清华大学信息学院四系科协（电子系，计算机系，自动化系，软件学院）合办的一年一届的全校活动。活动旨在向新生普及信息知识，发现人才。这项活动面向全校
      3000 多名新生，尤其是 1000
      多名信息学院的新同学，已在校内产生了良好而广泛的影响。
    </P>
    <P>
      全校初赛采取统一笔试环节，选取五到七支队伍进入决赛。电子系系内初赛及全校决赛试题以
      PowerPoint
      形式，有必答题、抢答题、视频题、女生题、人气题、你说我猜题、渐进抢答题和风险题等环节，均为现场作答。
    </P>
    <Divider />
    <Title level={3}>往年情况</Title>
    <P>
      往年奖品包括小米手环、极路由、蓝牙音箱、扫地机器人、打印机、移动硬盘等等，同时观赛亦有机会获得观众奖。
    </P>
    <Center direction="column">
      <Image
        alt="freshman_knowledge_cover_2"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_freshman_knowledge_2.jpg`}
        width={800}
      />
      <P>第二十届新生信息知识竞赛规则</P>
      <P></P>
      <Image
        alt="freshman_knowledge_cover_3"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_freshman_knowledge_3.jpg`}
        width={800}
      />
      <P>第二十届新生信息知识竞赛初赛</P>
      <P></P>
      <Image
        alt="freshman_knowledge_cover_1"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_freshman_knowledge_1.jpg`}
        width={800}
      />
      <P>第二十届新生信息知识竞赛决赛</P>
      <P></P>
    </Center>
  </StyledTypography>
);
const Contest6 = () => (
  <StyledTypography>
    <Title level={2}>挑战杯</Title>
    <Title level={3}>赛事时间</Title>
    <P>11 月中旬：开始报名；次年 3 月：进行初审；4 月：进行二审和终审。</P>
    <Divider />
    <Title level={3}>赛事简介</Title>
    <P>
      清华大学“挑战杯”学生课外学术科技作品竞赛是由教务处、科研院、研究生院、校团委和校学生科协共同主办的全校性学生课外学术科技作品竞赛。挑战杯是清华大学历史最长、规模最大、水平最高的综合性学生课外科技作品竞赛，在电子系承办的诸多赛事中对参赛者的综合能力要求最高，能够显著提升参赛者的创新能力和创新意识。
    </P>
    <P>
      参赛流程如下：
      <ListItem>
        选题：一个好的选题能大大提升获奖几率，鼓励大家选择创新性强、实用性佳且技术难度不过于高的项目。
      </ListItem>
      <ListItem>
        展开研究或制作：确定题目后，应在指导老师的指导下展开调查与分析，勇于尝试并精心完成题目研究或发明制作。
      </ListItem>
      <ListItem>
        送审：3
        月会要求选手提交作品初稿并进行系内评审，一般采取现场展示答辩的形式。通过初审的作品会送到校科协参加第二轮评审。二审和终审均安排在四月。
      </ListItem>
      <ListItem>
        参加科展：学校将于 4
        月末校庆期间将参赛作品统一布展，在全校内进行展评。其间，在电子系的展区内，选手可以通过展板、作品实物和讲解来展示自己的作品。
      </ListItem>
      <ListItem>
        参加全国赛/申请专利等：如果你的项目足够牛，就可以代表清华大学参加全国的挑战杯；或者也可以申请专利，投入商业应用。
      </ListItem>
    </P>
    <Divider />
    {/* <Title level={3}>往年情况</Title>
    <Title level={4}>32 届挑战杯获奖情况</Title>
    <P>
      一等奖
      <ListItem>超高精度的自然手势获取与识别技术研究</ListItem>
    </P>
    <P>
      三等奖
      <ListItem>知了——基于 SNS 的校园活动信息推送系统</ListItem>
      <ListItem>基于数字图像处理的机械臂自动校准技术</ListItem>
      <ListItem>基于红外光通信的智能车远距离对抗平台</ListItem>
      <ListItem>搭建在树莓派上基于人脸识别的自动录播系统</ListItem>
      <ListItem>基于深度学习的人脸表情处理系统</ListItem>
    </P>
    <Title level={4}>34 届挑战杯获奖情况</Title>
    <P>
      一等奖
      <ListItem>千里眼——基于虚拟现实技术的全景视频拼接编码传输系统</ListItem>
    </P>
    <P>
      三等奖
      <ListItem>基于 real sense 智能交互平台的识别系统研究</ListItem>
      <ListItem>多目标跟踪算法通用平台的设计与实现</ListItem>
    </P>
    <Title level={4}>35 届挑战杯获奖情况</Title>
    <P>
      三等奖
      <ListItem>高能效手写文字识别系统设计</ListItem>
    </P>
    <Title level={4}>36 届挑战杯获奖情况</Title>
    <P>
      二等奖
      <ListItem>基于多注意力语义表示机制的医考问答系统</ListItem>
      <ListItem>社交媒体噪声文本的维度情感分析系统</ListItem>
      <ListItem>基于 sEMG 信号的便携式帕金森病诊断仪</ListItem>
      <ListItem>智能自主协同编队系统</ListItem>
    </P>
    <P>
      三等奖
      <ListItem>基于高精度室内定位技术的无人车导航编队系统</ListItem>
      <ListItem>基于面部表情与动作的唇语识别与语音合成系统</ListItem>
      <ListItem>基于上转换原理的高性能植入式光电子器件</ListItem>
    </P>
    <Divider /> */}
    <Title level={3}>学长经验</Title>
    <ListItem>
      知识要求：一般来讲挑战杯所需知识与本科所学课程不会有太大的关系，无论是大三参加还是大二参加都会学习一些课外的知识。
    </ListItem>
    <ListItem>
      时间安排：一般来讲挑战杯主力在大三，但是对于电子系同学而言大三上是课业最重的一个学期，所以推荐同学们大二参加。在时间安排合理的情况下，是可以在学业顺利进行的同时好好做挑战杯的。
    </ListItem>
    <ListItem>
      选题建议：一般来讲实用性强、展示性强的项目更有可能会得到好成绩，建议同学们多多观察周边事物，可能就会有好点子冒出来。此外，对于重心放在科研、发论文上面的同学，可以考虑顺手也报一个挑战杯，往年也有一些选手靠纯科研成果拿到较好成绩。
    </ListItem>
    <ListItem>
      团队合作：很少有一个人做项目做到最后的；一般来说组一个小队，联系实验室指导老师会减轻一些做项目的压力。
    </ListItem>
    <Divider />
    <Title level={3}>精彩回顾</Title>
    <Center direction="column">
      <Bold></Bold>
      <Image
        alt="challenge_cover_1"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_challenge_1.jpg`}
        width={800}
      />
      <P>基于波函数的全光神经网络研究</P>
      <P></P>
      <Image
        alt="challenge_cover_2"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_challenge_2.jpg`}
        width={800}
      />
      <P>感知超表面辅助的 6G 无限通信</P>
      <P></P>
      <Image
        alt="challenge_cover_3"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_challenge_3.jpg`}
        width={800}
      />
      <P>土豆服务器</P>
      <P></P>
      <Image
        alt="challenge_cover_4"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_challenge_4.jpg`}
        width={800}
      />
      <P>基于听觉识别与定位的鸟类检测系统</P>
      <P></P>
    </Center>
  </StyledTypography>
);
const Contest7 = () => (
  <StyledTypography>
    <Title level={2}>电子设计大赛</Title>
    <Title level={3}>赛事时间</Title>
    <P>
      电子设计大赛在每年的【秋季学期】举行，从报名领取元件到决赛整个过程大概会持续半个学期，包括赛前培训，预赛初赛决赛等阶段，让同学们从机械结构到电路设计，从控制逻辑到上层策略，一步步完成作品。
    </P>
    <Divider />
    <Title level={3}>赛事简介</Title>
    <P>
      “电子设计大赛”是由清华大学电子系和自动化系合办的面向全校的比赛，选手可以组成不多于四人的队伍报名参加比赛。比赛一般是要求选手设计一辆智能车，根据赛题内容设计机械结构，编写单片机代码，实现自动控制。比赛形式是让两支队伍的智能车进行对抗，根据规则，胜者晋级，比赛过程中智能车除了根据传感器检测场地情况之外，还可以通过官方提供的通信模块从上位机处获取信息或者给上位机发送指令；决赛在罗姆楼进行，每年都会吸引大批观众，一边欣赏紧张激烈的比赛，一边听着激情洋溢的解说，见证冠军的诞生。
    </P>
    <Title level={3}>精彩回顾</Title>
    <Bold></Bold>
    <Center direction="column">
      <Image
        alt="electric_25_cover"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_electric_25.jpg`}
        width={400}
      />
      <P>第 25 届电子设计大赛——起床战争</P>
      <P></P>
      <Image
        alt="electric_24_cover"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_electric_24.jpg`}
        width={800}
      />
      <P>第 24 届电子设计大赛——配送大师</P>
      <P></P>
      <Image
        alt="electric_23_cover"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_electric_23.jpg`}
        width={800}
      />
      <P>第 23 届电子设计大赛——资源保卫战</P>
      <P></P>
      <Image
        alt="electric_22_cover"
        src={`${process.env.REACT_APP_STATIC_URL!}/public/images/2024/2024_electric_22.jpg`}
        width={800}
      />
      <P>第 22 届电子设计大赛——火线救援</P>
      <P></P>
    </Center>
  </StyledTypography>
);

const ContestPage: React.FC<PageProps> = ({ mode, user }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("1");
  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const StyledTabs = styled(Tabs)`
    background-color: ${mode === "light" ? `white` : `#141414`};
    .ant-tabs-nav {
      white-space: nowrap;
      display: flex;
    }
    .ant-tabs-nav .ant-tabs-tab {
      justify-content: center;
      font-size: 18px;
      width: clamp(150px, 15vw, 300px);
      margin: 0;
    }
  `;

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div style={{ width: "100%", maxWidth: "90vw", margin: "0 auto" }}>
      <StyledTabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          { key: "1", label: "队式程序设计大赛", children: <Contest1 /> },
          { key: "2", label: "硬件设计大赛", children: <Contest2 /> },
          { key: "3", label: "软件设计大赛", children: <Contest3 /> },
          { key: "4", label: "智能无人机挑战赛", children: <Contest4 /> },
          { key: "5", label: "新生知识竞赛", children: <Contest5 /> },
          { key: "6", label: "挑战杯", children: <Contest6 /> },
          { key: "7", label: "电子设计大赛", children: <Contest7 /> },
        ]}
      />
    </div>
  );
};

export default ContestPage;
