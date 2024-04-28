---
title: COS存储桶访问路径
description: 网站开发接口文档
permalink: /cos
---

# COS存储访问路径

前端访问相关文件时，需先向后端 `/static` 下对应的**同名路由**请求COS访问权限，请求所需参数可到对应文档中寻找或直接查看API接口。

### 比赛相关文件

下方 `${name}` 指代比赛名称，形如 `THUAI7`，对应数据库 `contest` 表中的 `name`

- 代码：`${name}/code/${team_id}/${code_id}.${suffix}`
- 编译后的可执行文件：`${name}/code/${team_id}/${code_id}`
- 编译产生的日志文件：`${name}/code/${team_id}/${code_id}.log` 以及 `${name}/code/${team_id}/${code_id}.curl.log`
- 公告文件：`${name}/notice/${notice_id}/${filename}`
- 天梯回放：`${name}/arena/${room_id}/${room_id}.thuaipb`
- 天梯日志：`${name}/arena/${room_id}/${room_id}.log`
- 后台比赛回放：`${name}/competition/${round_id}/${room_id}/${room_id}.thuaipb`
- 后台比赛日志：`${name}/competition/${round_id}/${room_id}/${room_id}.log`
- 地图：`${name}/map/${filename}`

### Info页面相关文件

- 新生导师谈话记录：`chat_record/${application_id}/${filename}`
- 公告文件：`upload/${filename}`

### 公开静态资源文件

这部分文件前端可直接通过 `https://static.eesast.com/` 解析到存储桶访问。

- 展示图片：`public/images/${filename}`
- WebGL资源：`public/WebGL/${name}/${filename}`
- 其他可公开文件：`public/files/${filename}`
