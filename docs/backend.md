---
title: 后端
description: 网站开发接口文档
permalink: /backend
---

# 后端存储访问路径

### 比赛相关文件

- 比赛目录：`${base_directory}/${contest_name}`
  - 编译目录（临时）：`./code/${team_id}/${code_id}`
    - 源文件目录（被绑定）：`./source`
      - 源文件：`./${code_id}.${suffix}`
    - 可执行文件及 log 目录（被绑定）：`./output`
      - 可执行文件：`./${code_id}`
      - 编译 log 文件：`./${code_id}.log`
      - 请求 log 文件：`./${code_id}.curl.log`
  - 可执行文件存放目录：`./code/${team_id}`
    - 可执行文件：`./${code_id}.${suffix}` 或 `./${code_id}` (cpp)
  - 比赛目录（临时）：`./arena/${room_id}`
    - 可执行文件目录（被绑定）：`./source/${team_id}`
      - 可执行文件：`./${player_label}.${suffix}` 或 `./${player_label}` (cpp)
    - 回放文件及 log 目录（被绑定）：`./output`
      - 回放文件：`./${room_id}.thuaipb`
      - log 文件：`./${room_id}.log`
  - 地图存放目录：`./map/${map_id}`
    - 地图文件：`./${map_id}.txt`
