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
  }
  // weekly: {
  //   articles: {
  //     fetching: false,
  //     items: [
  //       {
  //         id: 1,
  //         title: "Weekly 简介",
  //         alias: "weekly-introduction",
  //         author: "张三",
  //         authorId: 2016011000,
  //         abstract: "简单介绍 SAST Weekly",
  //         image: "https://www.google.com",
  //         content: "Hello World!",
  //         views: 20,
  //         likers: [2016011000],
  //         tags: ["Weekly"],
  //         visible: true
  //       }
  //     ]
  //   },
  //   comments: {
  //     fetching: false,
  //     items: [
  //       {
  //         id: 1,
  //         authorId: 2016011000,
  //         author: "张三",
  //         articleId: 1,
  //         content: "好赞",
  //         replyTo: -1,
  //         likers: []
  //       }
  //     ]
  //   }
  // }
};

export default mockStore;
