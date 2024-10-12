---
title: 团队逻辑
description: 网站开发接口文档
permalink: /team
---

## 团队逻辑

用户在前端进行团队相关的操作

- 添加团队

  - 权限控制：不是学生/管理员
  - leader_uuid不存在
  - contest_id不可用

- 加入团队

  - 权限控制：不是学生/管理员
  - team_id不存在

- 添加代码

- 添加玩家

- 更新团队

- 重命名代码

- 更新团队玩家

- 删除团队代码

- 删除团队成员

- 删除团队

### 接口描述

团队接口的前缀为`/team`。

- `/team/add_team`：添加团队。向数据库中加入团队

  - 请求方法：`POST`
    - 请求：`body`中有`{team_name: string, team_intro: string, team_leader_uuid: uuid, invited_code: string, contest_id:string}`，
  - 响应：`200`: `Team Add Successfully`并返回`team_id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `400`：`400 Bad Request: Missing Team Leader UUID`
    - `401`：`401 Unauthorized: Authentication failed`（未登录）
    - `500`：`undefined`（其他内部错误）

- `/team/add_team_member`：添加团队成员(参与比赛同学)

  - 请求方法：`POST`
    - 请求：`body`中有`{team_id: uuid, user_uuid: uuid}`
  - 响应：`200`: `Team Member Added Successfully`并返回`team_id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `400`：`400 Bad Request: Players label not found`
    - `401`：`401 Unauthorized: Authentication failed`（未登录）
    - `500`：`undefined`（其他内部错误）

- `/team/add_team_player`：添加团队玩家(队式游戏内人物)

  - 请求方法：`POST`
    - 请求：`body`中有`{team_id: string, player: string}`
  - 响应：`200`: `Team Player Added Successfully`以及`player`(一个String)
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`（未登录）
    - `500`：`undefined`（其他内部错误）

- `/team/add_team_code`：添加团队代码

  - 请求方法：`POST`
    - 请求：`body`中有`{team_id: uuid, code_name: String, language: String, compile_status: String}`
  - 响应：`200`: `message:Code added successfully`以及`code_id:code_id`(返回的代码id)
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`（未登录）
    - `500`：`undefined`（其他内部错误）

- `/team/update_team`：更新团队

  - 请求方法：`POST`
    - 请求：`body`中有` { team_id:uuid, team_name:string, team_intro :string}`
  - 响应：`200`: `message:Team Updated Successfully`以及`team_id:team_id`(更新后的team_id)
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/team/update_team_code_name`：改变代码名字

  - 请求方法：`POST`
    - 请求：`body`中有` { code_id:uuid, code_name:string}`
  - 响应：`200`: `message:Code Name Updated Successfully`以及`code_id:code_id`(更新后的code_id)
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/team/update_team_player`：更新团队玩家

  - 请求方法：`POST`
    - 请求：`body`中有` { team_id:uuid, player:string, code_id:uuid, role:string}`
  - 响应：`200`: `message:Player Updated Successfully`以及`player:player`(更新后的player)
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/team/delete_team_code`：删除团队代码

  - 请求方法：`POST`
    - 请求：`body`中有` { team_id:uuid, team_name:string, team_intro :stirng}`
  - 响应：`200`: `message:Code Deleted Successfully`以及`code_id:code_id`(删除的code_id)
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/team/delete_team`：删除团队

  - 请求方法：`POST`
    - 请求：`body`中有` { team_id:uuid}`
  - 响应：`200`: `message:Team Deleted Successfully`以及`team_id:team_id`(删除的team_id)
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

- `/team/delete_team_member`：删除团队成员
  - 请求方法：`POST`
    - 请求：`body`中有` { user_uuid:uuid, team_id:uuid}`
  - 响应：`200`: `message:Team Member Deleted Successfully`以及`team_id:team_id`
  - 工作过程：
    暂无
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`
    - `401`：`401 Unauthorized: Authentication failed`
    - `500`：`undefined`（其他内部错误）

## 附录

### 数据结构定义

(暂未应用)

```javascript
interface TeamInfo {
  status: string;
  scores: number[];
}

```
