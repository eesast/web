# EESAST WEB

![CD](https://github.com/eesast/web/actions/workflows/cd.yml/badge.svg?branch=master)

EESAST 网页前端

## 开发

### 1. 配置环境

- `NodeJS 20` (官网下载安装包)
- `NPM` (`Node`自带)
- `Yarn` (`npm i yarn -g`)

### 2. 编辑环境变量（默认已添加）

- `REACT_APP_API_URL`：生产环境后端地址，默认为 `https://api.eesast.com`
- `REACT_APP_API_DEV_URL`：测试环境后端地址，默认为 `https://api-dev.eesast.com`
- `REACT_APP_HASURA_HTTPLINK`/`REACT_APP_HASURA_WSLINK`：生产环境`Hasura`数据库地址，默认为 `api.eesast.com/v1/graphql`
- `REACT_APP_HASURA_DEV_HTTPLINK`/`REACT_APP_HASURA_DEV_WSLINK`：测试环境`Hasura`数据库`WebSocket`地址，默认为 `api-dev.eesast.com/v1/graphql`
- 若需使用`GraphQL CodeGen`，要创建`.env.local`文件，并添加`HASURA_GRAPHQL_ADMIN_SECRET`

### 3. 安装依赖和启动

```bash
yarn install // 如果Node版本低于20，可能会报错，需要添加参数--ignore-engines
yarn start // 如果Node版本低于20，可能会报错，需要添加参数--openssl-legacy-provider
```

### 4. 推荐的工具和包

#### VSCode 扩展

- **`GitHub Copilot & GitHub Copilot Chat`**
- `Prettier`
- `ESLint`
- `vscode-styled-component`
- `GraphQL: Language Feature Support`

#### 浏览器插件

- `React DevTools`：调试`React`组件

#### NPM 包

- `rimraf`：在`Windows`上删除`node_modules`文件夹时更高效，类似于`Linux`中的`rm -rf`

## 测试（维护）

### 脚本

- `yarn start`：支持热更新，保存文件后自动刷新页面
- `yarn generate`：根据数据库自动生成类型文件
- `yarn build`：编译打包源文件
- `yarn analyze`：对`build`内的打包进行构成分析
- `yarn test`：使用`Jest`进行测试
- `yarn lint`：使用`ESLint`进行语法检查
- `yarn typecheck`：使用`tsc`进行类型检查

### CI/CD

- `Commit`之前自动使用`husky & lint-staged & prettier`工具链进行代码风格美化
  - 相关配置见`.husky/*`和`package.json`
- `Commit`之后使用`Github Actions`进行自动化测试，包含`Jest`测试、`ESLint`语法检查、`tsc`类型检查
  - 相关配置见`.github/workflows/*`

### 依赖管理

- 使用`Renovate Bot`和`Mergify`进行依赖自动更新
  - 相关配置见`.github/renovate.json`和`.github/mergify.yml`
- 依赖引入原则
  - 能用`Plain HTML`、`CSS`、正则表达式解决的问题，不额外引入依赖
  - 优先使用`React`、`antd`官方推荐的、或社区活跃度高（star）的包
  - 优先使用自带`TypeScript`类型系统的包
  - 不引入过于庞大的包（如`lodash`），可以用其旗下的子包（如`lodash-es`）替代
  - 不引入过时（最近一次更新时间超过一年、或官网说明`Deprecated`）的包
  - 区分`dependencies`和`devDependencies`（后者用`yarn add -D`添加）
  - 指定版本号，不使用`^`和`~`（为了`Renovate Bot`能够自动更新）
- 依赖管理方法
  - `yarn outdated`：查看过时的依赖
  - `depcheck`：查看未被使用的依赖（需要先安装`depcheck`）
- 依赖手动更新原则
  - 使用`yarn upgrade-interactive`进行交互式更新
  - 了解`Sementic Versioning`语义化版本规范，先更新到最新的`patch`版本，再逐步更新`minor`版本，更新`major`版本时需要谨慎，可以查阅网上已有教程或更新脚本
  - 更新前`commit`所有更改，更新后测试无报错后立即`commit`
  - 若发现有依赖长期未更新或显示`Deprecated`，可以考虑替换同类依赖

## 生产

### Docker

- 对主分支的`push`会触发自动化生产，相关配置见`.github/workflows/*`
- 使用`Dockerfile`进行构建，并上传到`Docker Hub`
  - 与`yarn build`相同，优点是跨平台

## 部署

### Docker-compose

```bash
docker pull eesast/web:latest // 下载Docker-Hub镜像
docker-compose up -d
```

### Nginx

`server_name eesast.com`, 反向代理到`27776`端口
