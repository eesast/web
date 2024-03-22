---
title: 天梯和比赛逻辑
description: 网站开发接口文档
permalink: /contest
---

> 在开启队式之旅前，请先完成队伍创建、代码上传和角色分配流程。
>
> 目标：
>
> - [ ] 数据库`room` 管理移交给后端执行，避免让前端鉴权
> - [ ] 支持一个进程一个容器，每个 `client` 都跑在不同的容器里。
> - [ ] 架构的可扩展性和动态性，支持比赛队伍数可变、每个队伍的角色数可变、每支队伍的代码数可变、每个角色可选的技能可变、比赛的地图可变

## 天梯逻辑

### 流程描述

1. 选手在完成队伍和代码准备后，打开`天梯试炼`，向心仪的队伍`开战！`。

   1. 谨防战争狂。同一队伍不能同时打多于6场的比赛。前端需要从数据库上查询比赛状态，若有相同配置的比赛已经在开战，则给用户发出提示信息：`已有一场相同的比赛正在开战。是否继续？`。
   2. 后端也要检查，限制一支队伍的开战频率。

2. 前端向后端通信，后端首先对队伍进行检查——代码和队伍是否准备完成，若队伍角色未分配代码，或代码未编译，则报错。

   1. 后端首先要检查数据库上的代码编译状态和角色代码分配状态，都正常的情况下再继续下一步。
   2. 选手代码的编译文件在`cos`中。后端需要从`cos`上临时下载队伍的代码或编译文件到后端服务器上。后端服务器存储空间有限，需要定期清理下载的队伍代码和文件。后端服务器与 Docker 服务器之间通过 NFS 进行文件共享，因此 Docker 服务器自动同步了队伍文件。（备注：建议提前服务器之间组内网减少流量费。）

3. 后端在数据表`contest_room`中创建 `room`，更新`status`为`Waiting`，并在`contest_room_team`中绑定`room`和`team`，这场比赛入队`docker_queue`，返回创建是否成功的结果。
4. 创建`room`后，后端与 `docker` 服务器通信，创建比赛`docker`，开启比赛。
   1. 比赛状态显示。后端创建 `docker` 分为两步：【第一步】是将比赛放入队列`docker_queue`尾，此时`room` -> `status` 为 `Waiting`；【第二步】是`docker_cron` 定时程序从队列中抽取队首的比赛进行，如果比赛启动成功，此时`room` -> `status`为`Running`。前端应当根据`status`显示比赛状态。
   2. 比赛期间，用户可通过特定端口观看直播。后端在上面所述启动比赛的【第二步】时分配好一个端口。如果端口数量不足，则不启动比赛。如果成功分配端口并启动比赛，则应更新数据库`contest_room`表中的`port`字段，此时`status`字段已经更新为`Running`，则前端可以查看`port`字段并提供直播观看接口。
5. `docker` 服务器结束比赛后向后端通信，后端更新数据库，更新`contest_room`表中的`status`为`Finished`，更新`contest_room_team`表中的`score`字段，为这场比赛的每个队伍记录分数，更新比赛结果，并更新`contest_team`表中的天梯积分`arena_score`。后端将比赛回放文件上传至 `cos`。具体路径参考[COS存储桶访问路径 | EESAST](https://eesast.github.io/web/cos)。
6. 比赛结束后，前端提供下载回放接口。前端按照[COS存储桶访问路径 | EESAST](https://eesast.github.io/web/cos)中约定的路径从`cos`下载对应的文件。

### 接口描述

新版天梯接口的前缀为`/arena`。

- `/arena/create`：创建比赛。数据库中插入`room`，并将比赛加入队列中。
  - 请求方法：`POST`
  - 请求：`body`中有`{contest_name: string, team_label_bind: TeamLabelBind[], map_id: uuid}`，其中`contest_name`是数据库中的`name`、用于确定用于编译的镜像，`team_ids`为参加比赛的队伍 id，`labels`表示队伍的标签（例如Student Team/Tricker Team），`map_id`代表选择的地图id。`TOKEN`中包含用户的`uuid`。
  - 响应：`200`: `Arena created!`。
  - 工作过程：
    1.  鉴权。检查登录状态，及用户是否在队伍中。
    2.  限制开战频率。同一队伍不能同时打多于6场的比赛。
    3.  接下来检查代码和队伍是否准备完成，若队伍角色未分配代码，或代码未编译，则报错。
    4.  后端需要从`cos`上临时下载队伍的代码或编译文件到服务器上。文件路径参考[COS存储桶访问路径 | EESAST](https://eesast.github.io/web/cos)。服务器存储空间有限，需要定期清理下载的队伍代码和文件。如果`cos`上找不到对应的编译文件，则报错。
    5.  后端在数据表`contest_room`中创建 `room`，更新`status`为`Waiting`，并在`contest_room_team`中绑定`room`和`team`，并返回创建是否成功的结果，以及`room_id`。
    6.  后端将比赛数据存入`docker_queue`中，等待`docker_cron`发起比赛。
  - 错误：
    - `401`：`401 Unauthorized: Missing token`（未登录）
    - `403`：`403 Forbidden: User not in team`（用户不在队伍中）
    - `403`：`403 Forbidden: Team player not assigned `（队伍角色未分配代码）
    - `403`：`403 Forbidden: Team code not compiled`（代码未编译）
    - `404`：`404 Not Found: Team code not found in cos `（`cos`上找不到文件）
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `423`：`423 Locked: Request arena too frequently`（比赛次数过多）
    - `500`：`undefined`（其他内部错误）
- `/arena/finish`：`docker`服务器比赛结束的`hook`。更新比赛结果，更新天梯分数。
  - 请求方法：`POST`
  - 请求：`{result: ContestResult[]}`。`TOKEN`包含的信息：`{room_id: uuid}`
  - 响应：`200`：`Update OK!`
  - 错误：`500`：`undefined`，返回报错信息

注：此外，后端需要在`docker_cron`中更新数据库比赛状态和端口信息。

## 比赛逻辑

### 流程描述

比赛的流程就简洁多了。

1. 管理员用户发起比赛。前端管理员点击启动之后，前端数据库`contest_round`里插一行，然后请求后端路由。
2. 后端获取所有队伍数据。检查队伍代码是否完整，角色是否分配，如果不完整则跳过此队伍。
3. 后端对于正常队伍开启循环赛，将比赛加入`docker_queue`中。
4. `docker`比赛结束后向后端通信，后端在数据表上更新比赛分数`competition_score`。

### 接口描述

新版比赛接口的前缀为`/competition`。

- `/competition/create`：管理员专用。后端可以按`contest_round`表中的信息设置所有队伍之间的完整比赛，全部队伍的比赛合起来称为一个`round`，对应一个`round_id`。设置`room`发起对战的流程跟天梯逻辑一致，只需要在`contest_room`里额外加`round_id`标识即可。
  - 请求方法：`POST`
  - 请求：`{round_id: uuid}`。`TOKEN`包含`user_uuid`。
  - 响应：`200`：`Competition Created!`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `500`：`undefined`，返回报错信息

- `/competition/assign`：管理员专用。发起`round`中某一场特定的比赛，然后将比赛加入队列中。设置`room`发起对战的过程跟天梯逻辑一致，只需要在`contest_room`里额外加`round_id`标识即可。
  - 请求方法：`POST`
  - 请求：`{team_label_bind: TeamLabelBind[], map_id: uuid, round_id: uuid}`。`TOKEN`包含`user_uuid`。
  - 响应：`200`：`Competition Created!`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `500`：`undefined`，返回报错信息

- `/competition/finish`：`docker`服务器比赛结束的`hook`。更新比赛结果。
  - 请求方法：`POST`
  - 请求：`{result: ContestResult[]}` 。`TOKEN`包含的信息：`{room_id: uuid}`
  - 响应：`200`：`Update OK!`
  - 错误：`500`：`undefined`，返回报错信息

## 与赛事组的约定

1. 一场比赛的对应一个`docker`容器。
2. 队式应当关注上面的`/arena/finish`和`/competition/finish`路由参数信息。`docker`镜像启动时会设置环境变量`URL`（对应`/arena/finish`和`/competition/finish`）和`TOKEN`，编译完成后需要请求`URL`，请求时需要在header中加上`TOKEN`，在body中加上每个队的分数`result`。
3. `docker`目录绑定：回放文件在`/usr/local/playback`下，地图文件在`/usr/local/map`下，队伍代码应在`/usr/local/team<xxx>`下，具体格式根据比赛规则商定。

## 附录

数据结构定义

~~~javascript
interface ContestResult {
   team_id: number;
   score: number;
};

interface TeamLabelBind{
   team_id: uuid;
   label: string;
}
~~~
