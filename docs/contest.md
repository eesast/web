---
title: 天梯和比赛逻辑
description: 网站开发接口文档
permalink: /contest
---

> 目标：
>
> - 数据库`room`管理移交给后端执行，避免让前端鉴权
> - 一场比赛分为多个`docker`并行，每个队伍对应一个`docker`
> - 架构的可扩展性和动态性，支持比赛队伍数可变、每个队伍的角色数可变、每支队伍的代码数可变、每个角色可选的技能可变、比赛的地图可变

## 天梯逻辑

### 流程描述

1. 选手在完成队伍和代码准备后，打开`天梯试炼`，向心仪的队伍`开战！`。
   - 谨防战争狂。同一队伍不能同时打多于6场的比赛。前端需要从数据库上查询比赛状态，若有相同配置的比赛已经在开战，则给用户发出提示信息：`已有一场相同的比赛正在开战。是否继续？`。
   - 后端也要检查，限制一支队伍的开战频率。
2. 前端请求后端`/arena/create`路由
   - 前端需要检查数据库上的代码编译状态和角色代码分配状态，若队伍角色未分配代码，或代码未编译，则在页面报错而不请求路由。
   - 后端也要检查数据库上的代码编译状态和角色代码分配状态，还要检查`contest`表中的`arena_switch`是否为`true`，都正常的情况下再继续下一步。
3. 后端在数据表`contest_room`中创建 `room`，更新`status`为`Waiting`，并在`contest_room_team`中绑定`room`和`team`。
4. 选手代码的编译文件在`cos`中，后端需要从`cos`上临时下载队伍的代码（如 python 代码）或编译文件（如 c++ 编译后的可执行文件）到后端服务器上。
   - 后端服务器存储空间有限，需要定期清理下载的队伍代码和文件。
   - 后端服务器与`docker`服务器之间通过`NFS`进行文件共享，因此`docker`服务器自动同步了队伍文件。（备注：建议提前服务器之间组内网减少流量费。）
5. 前两步都执行成功的前提下，后端创建`docker`并入队`docker_queue`，向前端返回创建是否成功的结果。
   - 对于一场比赛（两队参与为例），后端需要先后创建4个`docker`：一个`server`镜像对应的比赛逻辑服务器、两个`client`镜像对应的选手代码执行客户端（每队共用一个），一个`envoy`镜像对应的`grpc-web`与`grpc`转发服务器（用于前端直播，暂不急于实现）。
   - 比赛状态显示。后端创建 `docker` 分为两步：【第一步】是将比赛放入队列`docker_queue`尾，此时`room` -> `status` 为 `Waiting`；【第二步】是`docker_cron` 定时程序从队列中抽取队首的比赛进行，如果比赛启动成功，此时`room` -> `status`为`Running`。
   - 比赛期间，用户可通过特定端口观看直播。后端在上面所述启动比赛的【第二步】时分配好一个端口。如果端口数量不足，则不启动比赛。如果成功分配端口并启动比赛，则应同时更新数据库`contest_room`表中的`port`字段。
   - 前端应当使用`subscription`实时更新比赛状态和直播观看端口。
6. `docker` 服务器结束比赛后请求后端`/arena/finish`路由。
   - 后端更新数据库，更新`contest_room`表中的`status`为`Finished`、更新`port`为`NULL`；更新`contest_room_team`表中的`score`字段，为这场比赛的每个队伍记录分数
   - 后端将比赛回放文件以及日志文件（如有）上传至 `cos`，具体路径参考[COS存储桶访问路径](https://eesast.github.io/web/cos)。
   - 后端向参与这场比赛的队伍队员发送`Web Push`订阅通知（暂不急于实现）。
7. 比赛结束后，前端提供下载和在线观看回放的功能，直接按照[COS存储桶访问路径](https://eesast.github.io/web/cos)中约定的路径从`cos`下载对应的文件即可。

### 接口描述

新版天梯接口的前缀为`/arena`。

- `/arena/create`：创建比赛。数据库中插入`room`，并将比赛加入队列中。
  - 请求方法：`POST`
  - 请求：`body`中有`{contest_name: string, team_labels: TeamLabelBind[], map_id: uuid}`，其中`contest_name`是数据库中的`name`、用于确定用于执行比赛的镜像，`team_labels`的类型定义见下方附录、包含了参加比赛的队伍`uuid`、队伍顺序和队伍执方（如`Student`或`Tricker`，见`contest_player`表），`map_id`代表选择的地图`uuid`。（请求同时携带了包含用户信息的`token`）
  - 响应：`200`: `Arena created!`
  - 工作过程：
    1.  鉴权。检查登录状态，及用户是否在队伍中。
    2.  限制开战频率。同一队伍不能同时打多于6场的比赛。
    3.  接下来检查代码和队伍是否准备完成，若队伍角色未分配代码，或代码未编译，则报错。
    4.  后端需要从`cos`上临时下载队伍的代码或编译文件到服务器上。文件路径参考[COS存储桶访问路径](https://eesast.github.io/web/cos)。服务器存储空间有限，需要定期清理下载的队伍代码和文件。如果`cos`上找不到对应的编译文件，则报错。
    5.  后端在数据表`contest_room`中创建 `room`，更新`status`为`Waiting`，并在`contest_room_team`中绑定`room`和`team`，并返回创建是否成功的结果，以及`room_id`。
    6.  后端将比赛数据存入`docker_queue`中，等待`docker_cron`发起比赛。
  - 错误：
    - `400`：`400 Bad Request: Contest not found`
    - `400`：`400 Bad Request: Players_label not found`
    - `401`：`401 Unauthorized: Missing token`（未登录）
    - `403`：`403 Forbidden: User not in team`（用户不在队伍中）
    - `403`：`403 Forbidden: Arena is not open`
    - `403`：`403 Forbidden: Team player not assigned `（队伍角色未分配代码）
    - `403`：`403 Forbidden: Team code not compiled`（代码未通过编译）
    - `403`：`403 Forbidden: Team code language not supported`
    - `422`：`422 Unprocessable Entity: Duplicate team labels`（ `team labels` 不能重复的原因在于会与 docker 内文件命名规则冲突 ）
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `423`：`423 Locked: Request arena too frequently`（比赛次数过多）
    - `500`：`undefined`（其他内部错误）
- `/arena/get-score`：`docker`服务器比赛结束后，用于查询参战队伍现有天梯分数的路由，拿来计算本场对战的得分。后端查询数据库即可。
  - 请求方法：`POST`
  - 请求：在`headers`里传回创建`docker`时设置的`TOKEN`。
  - 响应：`{result: ContestResult[]}`。顺序与 `TOKEN.team_label_binds` 中的顺序一致。
  - 错误：`500`：`undefined`，返回报错信息
- `/arena/finish`：`docker`服务器比赛结束的`hook`。更新比赛结果，更新天梯分数，将比赛回放和日志文件上传至`COS`。
  - 请求方法：`POST`
  - 请求：`{result: ContestResult[]}`，类型定义见下方附录。同时在`headers`里传回创建`docker`时设置的`TOKEN`。
  - 响应：`200`：`Update OK!`
  - 错误：`500`：`undefined`，返回报错信息
- `注意`：除此之外，后端需要在`docker_cron`中更新数据库比赛状态和端口信息（异步、非请求内）。

## 比赛逻辑

### 流程描述

比赛的流程与天梯非常相近，几大区别在于：

- 比赛由前端先写入数据库的`contest_round`表，用于记录这轮比赛的一些基本设置和`uuid`。一轮比赛（round）指的是所有队伍全循环一次的比赛之总和，一轮比赛包含多场对战。
- 后端需要对比赛队伍、队伍执方、地图进行全循环，每个循环体发起一场对战，流程和天梯中的一场对战大致相同。
- 后端需要在插入`contest_room`表时额外写入`round_id`从而与天梯区分。
- 比赛暂时默认不暴露端口，不需要更新`port`字段。
- 比赛结束时不向选手发送`Web Push`订阅通知。

具体流程如下：

1. 比赛管理员在前端页面上发起比赛。
2. 前端在数据库`contest_round`里插入一行，包含了这轮比赛的名称（仅展示用）和使用的地图`map_id`。
3. 前端请求后端路由`/competition/start-all`。
4. 后端获取所有队伍数据。检查队伍代码是否完整，角色是否分配，如果不完整则跳过此队伍。
5. 后端对于正常队伍开启循环赛，将比赛全部加入`docker_queue`中。
6. `docker`比赛结束后向后端通信，后端在数据表上更新比赛分数。

### 接口描述

新版比赛接口的前缀为`/competition`。

- `/competition/start-all`：管理员专用。后端可以按`contest_round`表中的信息设置所有队伍之间的完整比赛，全部队伍的比赛合起来称为一个`round`，对应一个`round_id`。设置`room`发起对战的流程跟天梯逻辑类似，需要在`contest_room`里额外加`round_id`标识。
  - 请求方法：`POST`
  - 请求：`{round_id: uuid}`。（请求同时携带了包含用户信息的`token`）
  - 响应：`200`：`Competition Created!`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `403`：`403 Forbidden: Not a manager`
    - `500`：`undefined`，返回报错信息
- `/competition/start-one`：管理员专用，用于重新发起`round`中某一场特定的比赛。后端需要先删除这场比赛的已有记录（包括数据库中、`cos`中），然后将比赛加入队列中。设置`room`发起对战的过程跟天梯逻辑一致，只需要在`contest_room`里额外加`round_id`标识即可。
  - 请求方法：`POST`
  - 请求：`{team_labels: TeamLabelBind[], round_id: uuid}`。（请求同时携带了包含用户信息的`token`）
  - 响应：`200`：`Room Created!`
  - 错误：
    - `400`：`400 Bad Request: Contest not found`
    - `400`：`400 Bad Request: Players_label not found`
    - `401`：`401 Unauthorized: Missing token`（未登录）
    - `403`：`403 Forbidden: Not a manager`
    - `403`：`403 Forbidden: Team player not assigned `（队伍角色未分配代码）
    - `403`：`403 Forbidden: Team code not compiled`（代码未通过编译）
    - `403`：`403 Forbidden: Team code language not supported`
    - `422`：`422 Unprocessable Entity: Duplicate team labels`
    - `422`：`422 Unprocessable Entity: Missing credentials`
    - `500`：`undefined`，返回报错信息
- `/competition/get-score`：`docker`服务器比赛结束后，用于查询参战队伍现有比赛分数的路由，拿来计算本场对战的得分。后端查询数据库即可。
  - 请求方法：`POST`
  - 请求：在`headers`里传回创建`docker`时设置的`TOKEN`（内部包含`round_id`）。
  - 响应：`{result: ContestResult[]}`。顺序与 `TOKEN.team_label_binds` 中的顺序一致。
  - 错误：`500`：`undefined`，返回报错信息
- `/competition/finish-one`：`docker`服务器比赛结束的`hook`。更新比赛结果，更新比赛分数，将比赛回放和日志文件上传至`COS`。
  - 请求方法：`POST`
  - 请求：`{result: ContestResult[]}` ，类型定义见下方附录。同时在`headers`里传回创建`docker`时设置的`TOKEN`。
  - 响应：`200`：`Update OK!`
  - 错误：`500`：`undefined`，返回报错信息

## 与赛事组的约定

1. 一场比赛对应两个`docker`镜像、多个`docker`并行。其中`server`镜像为比赛逻辑服务器，`client`镜像为选手代码执行客户端（一队共用）。
2. 队式应当关注上面的`/arena/finish`、`/arena/get-score`和`/competition/finish-one`、`/competition/get-score`路由参数信息。

- `server`镜像启动时会设置环境变量`SCORE_URL`（即`/arena/get-score`或`/competition/get-score`）、`FINISH_URL`（即`/arena/finish`或`/competition/finish-one`）、`TOKEN`。
  - 比赛结束后先请求`SCORE_URL`，获取参战队伍在天梯/比赛中的现有分数，请求时需要在`headers`中加上`TOKEN`。
  - 获得现有分数后，`docker` 应当据此计算出本场对战的得分（增量，而非更新后的总分）
  - 完成后再请求`FINISH_URL`，在请求的`body`中传回`result`（即上面计算出的增量得分），请求时需要在`headers`中加上`TOKEN`。
- `client`镜像启动时会设置环境变量`TEAM_LABEL` 和 `TEAM_SEQ_ID`，供容器得知该队比赛执方和序号。
- 队式 docker 不需要关注 `team_uuid`，这对于队式而言是不可见的，队式 docker 可见的只有 `TEAM_LABELS` 和 `TEAM_SEQ_ID`，并且分数信息须与传入的 `TEAM_SEQ_ID` 的顺序相同。

3. 后端提供的环境变量说明。

- 客户端：
  - `TERMINAL`: 取值为 `SERVER` 或者 `CLIENT`，表明当前比赛 docker 是客户端还是服务器。
  - `TEAM_LABEL`: 客户端队伍标签。对应 `TeamLabelBind` 中的 `label` 字段。
  - `TEAM_SEQ_ID`: 客户端使用，当前客户端的队伍序号，所有队伍从 0 开始顺序编号，与服务端 `TEAM_LABELS` 的顺序对应。
- 服务端：
  - `TERMINAL`: 取值为 `SERVER` 或者 `CLIENT`，表明当前比赛 docker 是客户端还是服务器。
  - `TOKEN`: 服务端验证身份的 token。发送请求时需带上。
  - `TEAM_LABELS`: 全局信息。本场比赛的所有队伍标签。用 `:` 分隔，其中的每个元素对应 `TeamLabelBind` 中的 `label` 字段，位序对应客户端 `TEAM_SEQ_ID` 的顺序，也对应 `SCORE_URL` 和 `FINISH_URL` 的分数信息 `ContestResult[]` 的顺序。
  - `TIME`: 比赛持续的时间，单位为秒。
  - `MAP_ID`: 地图 id。
  - `SCORE_URL`: 获取当前天梯分数的 url 路径。请求时需带上 `TOKEN`。
  - `FINISH_URL`: 结束比赛时更新分数的 url 路径。请求时需带上 `TOKEN`。

4. `docker`目录绑定。

- 对于`server`镜像，地图文件在`/usr/local/map`下，命名为`${map_id}.txt`，回放文件请放在在`/usr/local/output`下，命名为`playback.thuaipb`。如果需要上传日志文件，同样放在此目录下，命名为 `xxx.log` 。`TEAM_LABELS`中传入了所有队伍的`label`。
- 对于`client`镜像，队伍代码在`/usr/local/code`下，命名为`${player_label}.${suffix}`（`player_label`为在数据库存储的字符串标签，可供赛事组预先定义，如`Student1`）。对于 `suffix` 的说明：对于 `python` 代码，`suffix` 为 `py`；对于 `cpp` 代码，没有 `suffix`，文件命名就是 `${player_label}`。`TEAM_LABEL` 中传入了当前队伍的`label`，`TEAM_SEQ_ID`是当前队伍的序号，编号从 0 开始。

## 附录

### 数据结构定义

```javascript
interface ContestResult {
  score: number; // 最新的 score
};

interface TeamLabelBind {
  team_id: uuid;
  label: string;
}

interface ServerToken {
  contest_id: string;
  round_id: string?;
  room_id: string;
  team_label_binds: TeamLabelBind[];
}
```
