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
    currentArticle: {
      fetching: false,
      item: {
        id: 0,
        title: "No Article",
        alias: "No_Article",
        author: "anonymity",
        authorId: 0,
        abstract: "No Article",
        image: "",
        content: "No Article",
        views: 0,
        likers: [],
        tags: [],
        createdAt: ""
      }
    },
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
        leaderInfo: {
          id: 2016011000,
          name: "张三",
          username: "zhangsan",
          department: "电子系",
          class: "无60",
          group: "admin",
          role: "root",
          email: "zhangsan@mails.tsinghua.edu.cn",
          phone: 15600000000
        },
        membersInfo: [
          {
            id: 2016011000,
            name: "张三",
            username: "zhangsan",
            department: "电子系",
            class: "无60",
            group: "admin",
            role: "root",
            email: "zhangsan@mails.tsinghua.edu.cn",
            phone: 15600000000
          }
        ],
        inviteCode: "123abcde",
        createdAt: new Date().toDateString()
      }
    ],
    selfTeam: {
      id: 1,
      contestId: 1,
      name: "张三队",
      description: "这是一个队伍",
      leader: 2016011000,
      members: [2016011000],
      leaderInfo: {
        id: 2016011000,
        name: "张三",
        username: "zhangsan",
        department: "电子系",
        class: "无60",
        group: "admin",
        role: "root",
        email: "zhangsan@mails.tsinghua.edu.cn",
        phone: 15600000000
      },
      membersInfo: [
        {
          id: 2016011000,
          name: "张三",
          username: "zhangsan",
          department: "电子系",
          class: "无60",
          group: "admin",
          role: "root",
          email: "zhangsan@mails.tsinghua.edu.cn",
          phone: 15600000000
        }
      ],
      inviteCode: "123abcde",
      createdAt: new Date().toDateString()
    },
    totalTeams: 1
  }
};

export default mockStore;
