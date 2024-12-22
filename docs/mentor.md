---
title: 新生导师逻辑
description: 网站开发接口文档
permalink: /manage
---

## 新生导师逻辑

### 新生导师信息

- `/mentor/insert/info`：将一个已经在数据库中的`User`添加到`mentor_info`列表中
  - 请求方法：`POST`
  - 权限：`counselor`或`teacher`
  - 请求：`body`中有`{uuid: string}`，`uuid`需要是数据库中已存在的`User`
  - 响应：返回更新时间
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `500`：`Internal Server Error`（其他内部错误）
- `/mentor/update/available`：更改新生导师接受申请的状态，`true`为可接受申请，`false`为不可接受申请
  - 请求方法：`POST`
  - 权限：`counselor`或`teacher`
  - 请求：`body`中有`{uuid: string, available: boolean}`
  - 响应：`data`中返回一个json，内容为：`{mentor_available: boolean}`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `500`：`Internal Server Error`（其他内部错误）
- `/mentor/update/description`：更改新生导师的详细信息
  - 请求方法：`POST`
  - 权限：`counselor`或`teacher`
  - 请求：`body`中有`{uuid: string, description: string, achievement: string, background: string, field: string, intro: string}`，其中除了`uuid`外其他参数可以为空，但至少要有一项不为空
  - 响应：返回`mentor_uuid`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `500`：`Internal Server Error`（其他内部错误）

### 新生导师申请

- `/application/mentor/insert_one`：将一个新生导师申请插入数据库

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{mentor_uuid: string, student_uuid: string, year: string, statement: string}`
  - 响应：返回`insert_id`（插入的申请的id）
  - 错误：
    - `456`：`456 Error: Invalid year provided`（参数不全或不合法）
    - `451`：`451 Error: Error: Invalid year provided`（年份输入不合法）
    - `452`：`452 Error: No mentor info found`（找不到导师信息）
    - `453`：`453 Error: Exceeds max_applicants`（申请人数超出限制）
    - `454`：`454 Error: Error: Insert mentor application failed`（添加申请失败）
    - `500`：`Internal Server Error`（其他内部错误）

- `/application/update/status`：更改新生导师申请的状态

  - 请求方法：`POST`
  - 权限：`counselor` TODO：修改权限
  - 请求：`body`中有`{applyid: string, status: string}`，`status`应为`"approved"`或`"rejected"`或`"processing"`
  - 响应：返回`application_status`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `455`：`455 Error: Application does not exist`（找不到申请）
    - `500`：`Internal Server Error`（其他内部错误）

- `/application/update/statement`：更改新生导师申请的陈述

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{applyid: string, statement: string}`
  - 响应：返回`application_statement`
  - 错误：
    - `456`：`456 Error: Invalid statement provided`（参数不全或不合法）
    - `455`：`455 Error: Application does not exist`（找不到申请）
    - `500`：`Internal Server Error`（其他内部错误）

- `/application/update/delete`：删除新生导师申请

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{applyid: string}`
  - 响应：返回`delete_id`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `456`：`456 Error: Invalid applyid provided`（参数不全或不合法）
    - `455`：`455 Error: Application does not exist`（找不到申请）
    - `500`：`Internal Server Error`（其他内部错误）

- `/application/chat/update/status`：更改新生导师谈话记录提交的状态

  - 请求方法：`POST`
  - 权限：`counselor`, `teacher`
  - 请求：`body`中有`{applyid: string, status: boolean}`
  - 响应：返回`chat_status`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `456`：`456 Error: Invalid status provided`（参数不全或不合法）
    - `455`：`455 Error: Application does not exist`（找不到申请）
    - `500`：`Internal Server Error`（其他内部错误）

- `/application/update/schedule`：更新新生导师申请的时间安排
  `start_A`和`end_A`为预备阶段：导师更新个人信息，学生提交申请；
  `start_B`和`end_B`为预备阶段：学生了解导师信息
  `start_C`和`end_C`为第一阶段：自由申请与匹配
  `start_D`和`end_D`为第二阶段：未匹配同学补选
  `start_E`和`end_E`为第三阶段：系统随机分配

  - 请求方法：`POST`
  - 权限：`counselor`, `root`
  - 响应：返回`activateIn`
  - 错误：
    - `456`：`456 Error: Invalid time provided`（参数不全或不合法）
    - `500`：`Internal Server Error`（其他内部错误）

- `/freshman/update/info_list`
  - 请求方法：`POST`
  - 权限：`counselor`, `root`
  - 请求：`body`包括一个数组，其中每个元素的组成为`{uuid: string, realname: string,student_no: string, year: number}`
  - 响应：返回`update_time`
  - 错误
    - `456`：`456 Error: Invalid time provided`（参数不全或不合法）
    - `500`：`Internal Server Error`（其他内部错误）

### 新生导师聊天窗口

- `/chat/send`：发送聊天消息
  - 请求方法：`POST`
  - 权限：仅进行authenticate
  - 请求：`body`中有`{receiver_id: string, content: string}`
  - 响应：返回`message_id`
  - 错误：
    - `400`: `400 Bad Request: Missing receiver_id or content`（缺少参数）
    - `500`: `Internal Server Error`（其他内部错误）
