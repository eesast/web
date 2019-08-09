import { IAppState } from "./types/state";

const mockStore: IAppState = {
  auth: {
    token: "",
    loggedIn: false,
    loggingIn: false,
    user: {
      id: 2016011000,
      name: "张三",
      username: "zhangsan",
      department: "电子系",
      class: "无60",
      group: "admin",
      role: "root",
      email: "zhangsan@mails.tsinghua.edu.cn",
      phone: 15600000000,
      iat: 100000,
      exp: 100010
    }
  },
  weekly: {
    articles: {
      fetching: false,
      hasMore: false,
      items: [
        {
          id: 1,
          title: "Weekly 简介",
          alias: "weekly-introduction",
          author: "张三",
          authorId: 2016011000,
          abstract: "简单介绍 SAST Weekly",
          image: "https://www.google.com",
          content: "Hello World!",
          views: 20,
          likers: [2016011000],
          tags: ["Weekly"],
          createdAt: new Date().toDateString()
        }
      ]
    },
    comments: {
      fetching: false,
      items: [
        {
          id: 1,
          authorId: 2016011000,
          author: "张三",
          articleId: 1,
          content: "好赞",
          replyTo: -1,
          likers: []
        }
      ]
    }
  },
  teams: {
    fetching: false,
    contestId: 1,
    items: [
      {
        id: 1,
        contestId: 1,
        name: "张三队",
        description: "这是一个队伍",
        leader: 2016011000,
        members: [2016011000],
        leaderUsername: "zhangsan",
        membersUsername: ["zhangsan"],
        inviteCode: "123abcde",
        createdAt: new Date().toDateString()
      }
    ]
  }
};

export default mockStore;
