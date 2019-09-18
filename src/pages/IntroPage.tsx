import { Divider, Typography } from "antd";
import React from "react";
import styles from "./IntroPage.module.css";
const { Title, Paragraph } = Typography;

const IntroPage: React.FC<{}> = () => {
  return (
    <Typography className={styles.content}>
      <div>
        <Title>第二十一届电子设计大赛</Title>
        <img
          src="https://api.eesast.com/static/images/2019edclogo-background.png"
          alt="edclogo"
        />
        <Title level={2}>宗旨</Title>
        <Paragraph>
          清华大学电子设计大赛旨在提高理论联系实际能力，鼓励团结协作，培养创新精神和动手能力，强调“软硬结合”，通过解决实际问题来检验和提高同学们的综合素质。
        </Paragraph>
        <Title level={2}>概况</Title>
        <p>
          以学科竞赛促进学科建设、以学科竞赛促进学生动手和创新能力的提高，“赛课结合”在清华逐渐流行。结构设计大赛、程序设计大赛、学生创业大赛等精彩赛事与相应课程结合，成为学生培养才能的乐土、展示才华的舞台。
        </p>
        <p>
          作为校级三星级比赛，电工电子实验教学中心主办的电子设计大赛也在其中占有重要位置。事实上，电子学在国外的发展非常迅猛，在国内也有迫切的需求。在这样的背景下，利用一些集成芯片和分立元件设计一些电子电路，利用一些可编程逻辑器件设计一些专用电路，利用功能强大的单片机或FPGA开发一些电子产品从而实现通讯、控制等各种丰富实用的功能，这些形式多样、层次不一的活动，将会极大地激发同学们的求知兴趣与创造能力，将课堂上所学的知识与课外的科技制作有机的结合起来，营造出良好的学习、科研氛围。
        </p>
        <p>
          前20届大赛的成功举办，在校内引起了良好的反响，很大程度上激发了同学们的求知欲和创造性，也为本届大赛的举办打下了良好的基础，积累了丰富的经验。本届大赛同时也是一门3学分的全校性选修课程《电子系统设计综合实践》，这将进一步扩大赛事规模与影响力，提高竞赛水平。
        </p>
        <p>
          大赛由教务处、校团委和校学生科协共同指导，由电工电子实验教学中心和清华大学电子工艺实习基地主办，由清华大学基础工业训练中心协办，本届赛事由电子系、自动化系两系学生科协承办。在历届大赛的组织和竞赛过程中，很多领导和老师亲临现场提出了许多关键性的指导和精辟的点评意见，使参赛选手受益匪浅。
        </p>
        <Title level={2}>本届赛事介绍</Title>
        <p>本次电子设计大赛主题为“火线救援”。</p>
        <br />
        {/* --- */}
        <h3>赛题简介</h3>
        <p>
          本次比赛以自然灾害后的救援任务为背景，以人员搜救、物资运输为主要任务。参赛选手需要在比赛规定的时间内自行组织各任务的执行顺序，并按要求完成任务，最后根据各任务的完成情况进行评分。比赛分上下半场，比赛时间结束后，根据基础得分、得分倍率和犯规惩罚计算选手总分，总分较高者胜出，若两者总分相同，则加赛半场，直到两者分出胜负。
        </p>
        {/* --- */}
        <h3>赛题特点</h3>
        <p>具体来说，本次电子设计大赛有以下特点：</p>
        <ol>
          <li>竞技性与趣味性并重。</li>
          <p>
            <br />
            本次比赛采用弱对抗性的1v1模式，主要包含两个任务。选手需要根据实际情况安排这两个任务做不做、做多久、怎么做的问题。这既是一次选手在赛场上下不断博弈的挑战，也是一次比赛双方硬件设计与软件实力的综合比拼。不仅体现了比赛竞技性的特点，也增加了选手可以自由发挥的空间，富有趣味性。
          </p>
          <li>参赛门槛低但有区分度。</li>
          <p>
            <br />
            <p>
              本次大赛希望能够吸引更多的同学来参赛，所以在赛题的设计上充分考虑到难度的梯度设置，组委会提供集成度较高的模块，并在每次讲座后提供详细的开发文档，帮助选手解决遇到的问题。参赛队伍只需通过各次调试所需的验收环节即视为通过预审；在初赛和决赛中，地图也会事先发布，作为已知的常量提供给选手，为参赛队伍设计算法提供方便。
            </p>
            <p>
              另外，本次大赛首次开放Arduino开发平台作为选手可以选择的控制器。一方面，Arduino平台具有开源资源丰富、底层封装好的特点，对新手更加友好；另一方面，如果想充分使用Arduino的性能，选手需要学习大量的相关知识。总而言之，开放Arduino开发平台有助于使本次比赛更加切合让新手和高手都能充分发挥自己的实力的宗旨。
            </p>
          </p>
          <li>场地设计创新。</li>
          <p>
            <br />
            本届大赛既继承了上一届大赛不可进入区域和道路通行方向的设计，又设计了无上位机定位区域的创新。在场地中央的无上位机引导区域，选手需要利用红外循迹、雷达等模块实现自主定位和避障的功能并最终抵达人员被困位置获得加分，这样的设计极大的增加了比赛的观赏性和挑战性，也给选手更多自由发挥的空间和需要考虑的问题。
          </p>
          <li>软硬件平衡的命题方向。</li>
          <p>
            <br />
            本次电子设计大赛在硬件部分要求选手对抓取、避障等功能进行一定的自主设计，在软件策略部分延续了上一届比赛重视策略性的特点。这是本届组委会综合往届比赛、暑期硬件设计大赛等因素做出的决定。期望通过本届比赛，重新平衡电子设计大赛的硬件设计和软件设计，更好地践行“软硬结合”的大赛宗旨。
          </p>
        </ol>
        {/* --- */}
        <h2>参赛对象</h2>
        <p>
          大赛参赛对象为清华大学本科生或研究生。本科生参赛可以通过选课系统选课获得相应学分（根据教务要求，已经参加过往届比赛并获得过相应学分的同学不能再次选课）。每支参赛队有一名队长，每队成员不超过4人（包括队长在内），队员可以是其他兄弟院校学生，但不建议全队均为非清华学生。
        </p>
        <Divider />
        <Title level={2}>历届赛题回顾</Title>
        <h3>（1999—2018）</h3>
        <p>
          <ul>
            <li>第一届 折返跑赛车</li>
            <li>
              第二届
              <br /> 闲亭漫步——模型车变速竞速
              <br /> 爱心礼物——电子饰物设计制作
            </li>
            <li>第三届 赤色要塞</li>
            <li>第四届 运筹帷幄</li>
            <li>第五届 飞火流星</li>
            <li>第六届 乾坤挪移</li>
            <li>第七届 夺宝奇兵</li>
            <li>第八届 七面埋伏</li>
            <li>第九届 星空堡垒</li>
            <li>第十届 凌波微步</li>
            <li>第十一届 步步为赢</li>
            <li>第十二届 热力追踪</li>
            <li>第十三届 Treasures!</li>
            <li>第十四届 沐光之城</li>
            <li>第十五届 装甲精英</li>
            <li>第十六届 危机四伏</li>
            <li>第十七届 命悬一线</li>
            <li>第十八届 天赐良机</li>
            <li>第十九届 绿茵荣耀</li>
            <li>第二十届 智圆行方</li>
          </ul>
        </p>
        <Divider />
        <h2>大赛组织</h2>
        <h3>指导单位</h3>
        <ul>
          <li>清华大学教务处</li>
          <li>清华大学团委</li>
          <li>清华大学学生科学技术协会</li>
        </ul>
        <h3>主办单位</h3>
        <ul>
          <li>清华大学电工电子实验教学中心</li>
          <li>清华大学电子工艺实习基地</li>
        </ul>
        <h3>协办单位</h3>
        <ul>
          <li>清华大学基础工业训练中心</li>
        </ul>
        <h3>承办单位</h3>
        <ul>
          <li>清华大学自动化系学生科协</li>
          <li>清华大学电子工程系学生科协</li>
        </ul>
        <h3>独家冠名赞助商</h3>{" "}
        <ul>
          <li>商汤科技有限公司</li>
        </ul>
      </div>
      <div className={styles.logos}>
        <div className={styles.logo1}>
          <img
            alt="eesast"
            src="https://api.eesast.com/static/images/eesast-logo-black.png"
          />
        </div>
        <div className={styles.logo2}>
          <img
            alt="asta"
            src="https://api.eesast.com/static/images/asta-logo-black.png"
          />
        </div>
        <div className={styles.logo3}>
          <img
            alt="sensetime"
            src="https://api.eesast.com/static/images/sensetime-logo.png"
          />
        </div>
      </div>
      {/* <Row
        type="flex"
        justify="space-around"
        align="middle"
        className={styles.logos}
      >
        <Col span={2}></Col>
        <Col span={6}></Col>
        <Col span={7}></Col>
      </Row> */}
    </Typography>
  );
};

export default IntroPage;
