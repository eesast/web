export interface IMentor {
  uuid: string; // 导师uuid
  name: string; // 导师姓名
  dept: string; // 导师院系
  mail: string; // 导师邮箱
  phon?: string; // 导师电话
  intr?: string; // 导师简介
  bgnd?: string; // 导师背景
  flds?: string; // 导师领域
  achv?: string; // 导师成就
  avail?: boolean; // 导师是否可用
  is_mem?: boolean; // 导师是否参与积极分子谈话
  dig_type?: string; // 导师谈话类型
  max_apl?: number; // 导师最大申请人数
  tot_apl?: number; // 导师总申请人数
  mat_apl?: number; // 导师已匹配人数
}

export interface IStudent {
  uuid: string; // 学生uuid
  name: string; // 学生姓名
  stid: string; // 学生学号
  dept: string; // 学生院系
  clss: string; // 学生班级
  mail: string; // 学生邮箱
  phon: string; // 学生电话
}

export interface IApplication {
  id: string; // 申请id
  stmt: string; // 申请陈述
  created: string; // 申请时间
  year: number; // 申请年份
  status: string; // 申请状态
  is_mem: boolean; // 是否参与积极分子谈话
  chat: boolean; // 申请聊天状态，由学生发起
  chat2: boolean; // 申请聊天状态，由导师确认
  chat_t?: string; // 申请聊天时间
  mem_chat: boolean; // 积极分子谈话状态，由学生发起
  mem_chat2: boolean; // 积极分子谈话状态，由导师确认
  mem_chat_t?: string; // 积极分子谈话时间
  men?: IMentor; // 申请导师
  stu?: IStudent; // 申请学生
}

export interface IFreshman {
  name: string; // 学生姓名
  stid: string; // 学生学号
  is_mem: boolean; // 是否参与积极分子谈话
  uuid?: string; // 学生uuid
}

export interface ISchedulePeriod {
  beg: Date; // 开始时间
  end: Date; // 结束时间
  roles?: string[]; // 参与角色（显示用）
  prompt?: string; // 提示信息（显示用）
}

export interface ISchedule {
  A: ISchedulePeriod; // 预备阶段：导师更新个人信息
  B: ISchedulePeriod; // 预备阶段：学生了解导师信息
  C: ISchedulePeriod; // 第一阶段：自由申请与匹配
  D: ISchedulePeriod; // 第二阶段：未匹配同学补选
  E: ISchedulePeriod; // 第三阶段：系统随机分配
}
