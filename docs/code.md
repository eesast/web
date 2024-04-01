---
title: 赛事代码管理
description: 网站开发接口文档
permalink: /code
---

> 要点：代码跟队伍走不跟角色走，编译跟代码走不跟比赛走，比赛跟角色走不跟代码走

### 流程描述（分工）

- 代码提交
  1. 选手在代码管理页面点击上传/拖入文件上传`AI.cpp`或`AI.py`
  2. 前端识别编程语言，并在数据库`contest_team_code`表插入新行，返回得`code_id`
  3. 前端根据`${code_id}.${lang}`重命名文件并上传至`cos`，上传路径见[COS存储桶访问路径约定](https://eesast.github.io/web/cos)
  4. 若语言为解释型语言(`py`)，则前端更改数据库`compile_status`为`No Need`（可与第二步合并）
  5. 若语言为编译型语言(`cpp`)，则前端向后端发请求`/code/compile-start`（见后），使后端开始编译代码
  6. 后端下载`cos`上的代码文件，在服务器上启动编译`docker`，并在数据库中更新`compile_status`为`Compiling`
     - 选手代码文件在`cos`中，后端需要从`cos`上临时下载队伍的代码到后端服务器上。后端服务器存储空间有限，需要定期清理下载的队伍代码和文件。
     - 后端服务器和`docker`服务器是分离的，`docker`服务器并不能直接获取队伍代码。因此，后端服务器与`docker`服务器之间通过[NFS](https://eesast.github.io/web/nfs)进行文件共享，`docker`服务器自动同步了队伍文件。（备注：建议提前服务器之间组内网减少流量费。）
  7. `docker`完成编译后，请求后端`/code/compile-finish`路由（见后）。若编译成功无报错，后端在数据库中更新`compile_status`为`Completed`；若编译出错，后端在数据库中更新`compile_status`为`Failed`
  8. 后端将`docker`生成的可执行文件`${code_id}`与`${code_id}.log`上传至`cos`，同代码文件夹
  9. 前端通过`subscription`实时更新`compile_status`
- 代码重命名
  - 前端页面上和数据库中的`code_name`是代码文件上传的原名，仅作展示和下载时的命名之用，与后端和`cos`没有关系。用户可以修改这个名字来做版本管理，仅需前端修改数据库`contest_team_code`表即可。
- 编译日志获取
  - 前端直接下载`cos`上对应`${code_id}.log`
- 代码删除
  1. 用户在前端点击删除某份代码文件后，前端先删除`cos`上的`${code_id}.${lang}`、`${code_id}.log`和`${code_id}`可执行文件
  2. 删除成功后，前端再修改数据库删除行，最后提示删除成功
- 角色代码选择
  - 选手可以选择当时当刻进行天梯和比赛使用的代码，选择好后更新数据库`contest_team_player`表

### 后端路由路径

- `/code/compile-start`：下载代码文件并启动编译镜像。
  - 请求方法：`POST`
  - 请求：`body`中有`{code_id: uuid}`（携带个人信息`token`）
  - 响应：`200`：`200 OK: Create container success`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `404`：`404 Not Found: Code unavailable`（无法成功下载代码）
    - `400`：`400 Bad Request: Interpreted language do not require compilation.`
    - `400`：`400 Bad Request: Unsupported language.`
    - `400`：`400 Bad Request: Code already compiled.`
    - `401`：`401 Unauthorized: User not in team.`
    - `401`：`401 Unauthorized: User and code not in the same team.`
    - `409`：`409 Confilct: Code already in compilation`（代码正在或已编译）
    - `500`：`undefined`（其他内部错误，返回报错信息）
- `/code/compile-finish`：代码完成编译的`hook`，在`docker`结束前调用。更新编译状态并保存可执行文件和`log`。
  - 请求方法：`POST`
  - 请求：`body`中有`{compile_status: string}`，且将启动docker时传入的`token`传回
  - 响应：`200`：`200 OK: Update compile status success`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `400`：`400 Bad Request: Invalid compile status.`
    - `401`：`401 Unauthorized: Missing token.`
    - `401`：`401 Unauthorized: Token expired or invalid.`
    - `500`：`undefined`（返回报错信息）

### 与赛事组的约定

1. 编译代码的`docker`每次启动只编译一份代码，且只需考虑编译型语言（如`cpp`）的代码
2. `docker`启动时代码文件绑定在`/usr/local/code`文件夹下，编译产生的可执行文件和`log`请保存到`/usr/local/output`文件夹（命名与代码文件前缀相同）
3. `docker`启动时会设置环境变量`URL`，`TOKEN`，`LANG`（目前默认是 `cpp`），编译完成后需要请求`URL`（实际上是`/code/compile-finish`），请求时需要在`header`中加上`TOKEN`，请求的`body`中需包括代码编译的状态`compile_status: string`，取值为`Success`或`Failed`
