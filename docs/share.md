---
title: 资源共享逻辑
description: 网站开发接口文档
permalink: /share
---

## 资源共享逻辑

### 课程评价

- `/add_course_comment`：添加一条课程评论

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{comment: string, user_uuid: string, course_uuid: string, parent_uuid?: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Course not found`（课程未找到）
    - `500`：`Internal Server Error`（其他内部错误）

- `/add_course_comment_stars`：为课程评论添加星标
  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{comment_uuid: string, user_uuid: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）
- `/add_course_comment_likes`：为课程评论添加点赞

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{comment_uuid: string, user_uuid: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

- `/update_course_comment`：更新一条课程评论

  - 请求方法：`PUT`
  - 权限：`student`
  - 请求：`body`中有`{comment: string, uuid: string}`
  - 响应：返回`uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

- `/delete_course_comment`：删除一条课程评论

  - 请求方法：`DELETE`
  - 权限：`student`
  - 请求：`body`中有`{uuid: string}`
  - 响应：返回`uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

- `/delete_course_comment_stars`：删除课程评论的星标

  - 请求方法：`DELETE`
  - 权限：`student`
  - 请求：`body`中有`{comment_uuid: string, user_uuid: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

- `/delete_course_comment_likes`：删除课程评论的点赞
  - 请求方法：`DELETE`
  - 权限：`student`
  - 请求：`body`中有`{comment_uuid: string, user_uuid: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）
