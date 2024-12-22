---
title: 资源共享逻辑
description: 网站开发接口文档
permalink: /share
---

## 资源共享逻辑

### 添加课程

- `/add_course`：添加一门课程

  - 请求方法：`POST`
  - 权限：`admin`
  - 请求：`body`中有`{year: number, type: string, semester: string, professor: string, name: string, language: string, fullname: string, code: string}`
  - 响应：返回`course_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Failed to add course`（添加课程失败）
    - `500`：`Internal Server Error`（其他内部错误）

### 添加课程信息

- `/add_course_info`：添加课程信息

  - 请求方法：`POST`
  - 权限：`admin`
  - 请求：`body`中有`{key: string, value: string, course_id: string}`
  - 响应：返回`course_info_id`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Failed to add course info`（添加课程信息失败）
    - `500`：`Internal Server Error`（其他内部错误）

### 添加课程评分

- `/add_course_rating`：添加课程评分

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{dim1: number, dim2: number, dim3: number, dim4: number, dim5: number, dim6: number, course_id: string, user_uuid: string}`
  - 响应：返回`created_at`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Failed to add course rating`（添加课程评分失败）
    - `500`：`Internal Server Error`（其他内部错误）

### 添加课程评论

- `/add_course_comment`：添加一条课程评论

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{comment: string, user_uuid: string, course_uuid: string, parent_uuid?: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Course not found`（课程未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 添加课程评论星标

- `/add_course_comment_stars`：添加课程评论星标

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{comment_uuid: string, user_uuid: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 添加课程评论点赞

- `/add_course_comment_likes`：添加课程评论点赞

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{comment_uuid: string, user_uuid: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 更新课程

- `/update_course`：更新课程

  - 请求方法：`POST`
  - 权限：`admin`, `professor`
  - 请求：`body`中有`{code: string, uuid: string, fullname: string, language: string, name: string, professor: string, semester: string, type: string, year: number}`
  - 响应：返回`uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Course not found`（课程未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 更新课程信息

- `/update_course_info`：更新课程信息

  - 请求方法：`POST`
  - 权限：`admin`, `professor`
  - 请求：`body`中有`{course_id: string, key: string, value: string}`
  - 响应：返回`course_id`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Course info not found`（课程信息未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 更新课程评分

- `/update_course_rating`：更新课程评分

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{course_id: string, user_uuid: string, dim1: number, dim2: number, dim3: number, dim4: number, dim5: number, dim6: number}`
  - 响应：返回`updated_at`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Course rating not found`（课程评分未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 更新课程评论

- `/update_course_comment`：更新课程评论

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{comment: string, uuid: string}`
  - 响应：返回`uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 删除课程

- `/delete_course`：删除课程

  - 请求方法：`POST`
  - 权限：`admin`, `professor`
  - 请求：`body`中有`{uuid: string}`
  - 响应：返回`uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Course not found`（课程未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 删除课程信息

- `/delete_course_info`：删除课程信息

  - 请求方法：`POST`
  - 权限：`admin`, `professor`
  - 请求：`body`中有`{course_id: string, key: string}`
  - 响应：返回`course_id`和`key`以及成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Course info not found`（课程信息未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 删除课程评分

- `/delete_course_rating`：删除课程评分

  - 请求方法：`POST`
  - 权限：`student`
  - 请求：`body`中有`{course_id: string, user_uuid: string}`
  - 响应：返回`course_id`和`user_uuid`以及成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Course rating not found`（课程评分未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 删除课程评论

- `/delete_course_comment`：删除课程评论

  - 请求方法：`DELETE`
  - 权限：`student`
  - 请求：`body`中有`{uuid: string}`
  - 响应：返回`uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 删除课程评论星标

- `/delete_course_comment_stars`：删除课程评论星标

  - 请求方法：`DELETE`
  - 权限：`student`
  - 请求：`body`中有`{comment_uuid: string, user_uuid: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）

### 删除课程评论点赞

- `/delete_course_comment_likes`：删除课程评论点赞

  - 请求方法：`DELETE`
  - 权限：`student`
  - 请求：`body`中有`{comment_uuid: string, user_uuid: string}`
  - 响应：返回`comment_uuid`和成功消息
  - 错误：
    - `400`：`400 Bad Request: Missing required parameters`（请求缺失参数）
    - `404`：`Comment not found`（评论未找到）
    - `500`：`Internal Server Error`（其他内部错误）
