---
title: 管理逻辑
description: 网站开发接口文档
permalink: /manage
---

## 管理逻辑

管理员对于比赛进行管理(暂未实现鉴权和查询不存在报错)

- 添加新的比赛地图`/manage/add_contest_map`
  - 权限控制：不是管理员
  - 地图查询：filename不存在
- 添加比赛通知`/manage/add_contest_notice`
  - 权限控制：不是管理员
- 添加比赛轮数`/manage/add_contest_round`
  - 权限控制：不是管理员
  - uuid错误或比赛不存在
- 添加比赛时间`/manage/add_contest_time`
  - 权限控制：不是管理员
  - uuid错误或比赛不存在
- 更新比赛信息`/manage/update_contest_info`
  - 权限控制：不是管理员
  - uuid错误或比赛不存在
- 更新比赛开关`/manage/update_contest_switch`
  - 权限控制：不是管理员
- 更新比赛通知`/manage/update_contest_notice`
  - 权限控制：不是管理员
- 删除比赛地图`/manage/delete_contest_map`
  - 权限控制：不是管理员
  - 请求的contest_map不存在
- 删除比赛通知`/manage/delete_contest_notice`
  - 权限控制：不是管理员
  - 请求的contest_notice不存在

### 接口描述

管理接口的前缀为`/manage`

- `/manage/add_contest_map`：添加新的比赛地图

  - 请求方法：`POST`
    - 请求：`body`中有`{contest_id:uuid, name:string, filename:string, team_labels:string}`，
  - 响应：`200`: `Contest Map Added Successfully`并返回`map_id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/manage/add_contest_notice`：添加比赛通知

  - 请求方法：`POST`
    - 请求：`body`中有`{title:string, content:string, files:string, contest_id:uuid}`，
  - 响应：`200`: `Contest Notice Added Successfully`并返回`id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/manage/add_contest_round`：添加比赛轮数

  - 请求方法：`POST`
    - 请求：`body`中有`{contest_id:uuid, name:string, map_id:uuid}`，
  - 响应：`200`: `Contest Round Added Successfully`并返回`round_id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/manage/add_contest_time`：添加比赛时间

  - 请求方法：`POST`
    - 请求：`body`中有`{contest_id:uuid, event:string, start:timestamptz, end:timestamptz, description:string}`，
  - 响应：`200`: `Contest Time Added Successfully`并返回`event: event_result`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/manage/update_contest_info`：更新比赛信息

  - 请求方法：`POST`
    - 请求：`body`中有`{contest_id:uuid, fullname:string, description:string, start_date:timestamptz, end_date:timestamptz}`，
  - 响应：`200`: `Contest Info Added Successfully`并返回`id: update_contest_info.id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/manage/update_contest_switch`：更新比赛开关(?)

  - 请求方法：`POST`
    - 请求：`body`中有`{contest_id:uuid, team_switch:boolean, code_upload_switch:boolean, arena_switch:boolean, playground_switch:boolean, stream_switch:boolean, playback_switch:boolean }`，
  - 响应：`200`: `Contest Switch Updated Successfully`并返回`id: update_contest_switch.id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/manage/update_contest_notice`：更新比赛通知

  - 请求方法：`POST`
    - 请求：`body`中有`{id:uuid, title:string, content:string, files:string }`，
  - 响应：`200`: `Contest Notice Updated Successfully`并返回` id: update_contest_notice.id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/manage/delete_contest_map`：删除比赛地图

  - 请求方法：`POST`
    - 请求：`body`中有`{map_id:uuid}`，
  - 响应：`200`: `Contest Map Deleted Successfully`并返回`  map_id: delete_contest_map`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/manage/delete_contest_notice`：删除比赛通知
  - 请求方法：`POST`
    - 请求：`body`中有`{id:uuid}`，
  - 响应：`200`: `Contest Notice Deleted Successfully`并返回`   id: delete_contest_notice`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）
