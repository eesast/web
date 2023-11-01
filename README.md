# EESAST WEB

[![Build Status](https://travis-ci.com/eesast/web.svg?branch=master)](https://travis-ci.com/eesast/web)

EESAST 网页前端

## 开发

### 环境

- Node 16 / NPM
- Yarn
- TypeScript
- Chrome / Firefox

#### 环境变量

本地开发时在 `.env.local` 中添加 `HASURA_GRAPHQL_ADMIN_SECRET`

### 工具

- VSCode 扩展

  - Prettier
  - ESLint
  - vscode-styled-component
  - Apollo GraphQL

- Chrome 扩展

  - React DevTools

- Postman

### 脚本

#### `yarn install`

安装所有 `dependencies` 和 `devDependencies`

#### `yarn start`

启动开发服务器，监听源文件更改，并自动刷新网页

#### `yarn build`

使用 `tsc` 编译打包源文件

#### `yarn test`

进行测试

#### `yarn lint`

使用 ESLint 进行代码风格检查

#### `yarn typecheck`

检查类型错误

#### `yarn analyze`

对 `build` 内的打包进行构成分析

#### `yarn codegen`

根据后端 GraphQL 定义自动生成 TypeScript 类型文件

### Node >16 适配

请使用`yarn start:new`启动项目

建议先安装`yarn i node_gyp -g`避免报错

可安装`yarn i rimraf -g`来用`rimraf node_modules`命令快速推掉重来

#### TODO:升级依赖

- react-scripts
- less-loader
- styled-components

（都被`antd`卡住了）

#### TODO:毒瘤

- md2wx: Deprecated && Size too large
- xlsx: Size too large
- subscriptions-transport-ws: Deprecated
