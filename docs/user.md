---
layout: default
permalink: /user
---

# 用户逻辑

### 前后端接口

```typescript
// 原先为JwtPayload
interface JwtUserPayload {
  uuid: string;
  role: string;
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
    "x-hasura-user-id": string;
  };
}

interface JwtVerifyPayload {
  email: string;
  phone: string;
  code: string; // hash加密后的验证码
}
```

### 前端页面逻辑

- 登录：`/login（输入邮箱密码） -> login之前的页面（如果直接点登录就到/profile）`
  - 账户不存在
  - 账户存在但密码错误
- 注册：`/register VerifyPage（输入邮箱、验证码） -> /register PasswordPage（输入密码） -> /profile（引导修改个人资料）`
  - 邮箱/手机号已存在（冲突）
  - 验证码错误
  - 引导学生添加清华邮箱
- 忘记密码：`/login -> /reset VerifyPage（输入邮箱、验证码） -> /reset PasswordPage（输入密码） -> login之前的页面（如果直接点登录就到/profile）`
  - 邮箱/手机号不存在
  - 验证码错误
- 更改密码：`/profile -> /reset VerifyPage（输入邮箱、验证码） -> /reset PasswordPage（输入密码） -> /profile（引导修改个人资料）`
  - 选择邮箱/手机进行验证
  - 验证码错误
- 更改/添加验证邮箱：`/profile（输入邮箱） -> /update VerifyPage（输入验证码） -> /profile`
  - 邮箱/手机号已存在（冲突）
  - 验证码错误
- 删除账户：`/profile -> /delete VerifyPage（输入验证码） -> /home`
  - 选择邮箱/手机进行验证
  - 验证码错误

### 后端路由路径

- `/user/login`：处理用户登录。根据`username/email/phone/student_no`从`hasura`的`users`表查找用户，并验证密码是否匹配，若验证成功，则返回`token`
  - 请求方法：`POST`
  - 请求：`body`中有`{user: string, password: string}`，其中`user`可以是`username/email/phone/student_no`中任一形式（可以先支持其中一两种）
  - 响应：`data`中有`{token: string}`，为`JwtUserPayload`形式
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `404`：`404 Not Found: User does not exist`（数据库找不到用户）
    - `401`：`401 Unauthorized: Password does not match`（密码错误）
    - `500`：`undefined`（其他内部错误）
- `/user/send-code`：发送验证码。向提供的`email/phone`发送验证码（不需要验证是否在`users`表中），同时返回一个包含`hash`之后的验证码的、生存时间更短的`token`
  - 请求方法：`POST`
  - 请求：`body`中有`{email: string}`或`{phone: string}`
  - 响应：`data`中有`{token: string}`，为`JwtVerifyPayload`形式
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `500`：`500 Internal Server Error: Email failed to send`（邮件发送错误）
    - `501： 501 Internal Server Error: Short message failed to send`（短信发送错误）
  - 备注：需思考如何防止高频请求（前端会有倒计时，但不够）
- `/user/verify`：仅校验验证码，不做实际操作。验证请求中的验证码与`verificationToken`中的是否一致。
  - 请求方法：`POST`
  - 请求：`body`中有`{verificationCode: string, verificationToken: string}`，`verificationCode`是6位明文验证码，`verificationToken`是`/user/send-code`返回的
  - 响应：无
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `401`：`401 Unauthorized: Verification code does not match`（验证码错误）
    - `500`：`undefined`（其他内部错误）
- `/user/register`：创建用户。先验证请求中的验证码与`verificationToken`中的是否一致，再根据`email/phone`和`password`在`hasura`的`users`表中插入新行，并返回`token`
  - 请求方法：`POST`
  - 请求：`body`中有`{password: string, verificationCode: string, verificationToken: string}`，`verificationCode`是6位明文验证码，`verificationToken`是`/user/send-code`返回的
  - 响应：`data`中有`{token: string}`，为`JwtUserPayload`形式，初始`role`应为`user`
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `422`：`422 Unprocessable Entity: Missing email or phone`（`verficationToken`中手机邮箱均无）
    - `409`：`409 Conflict: User already exists`（数据库中相同邮箱/手机的用户已存在）
    - `401`：`401 Unauthorized: Verification code does not match`（验证码错误）
    - `500`：`undefined`（其他内部错误）
- `/user/change-password`：修改密码。先验证请求中的验证码与`verificationToken`中的是否一致，再更新`hasura`中的密码
  - 请求方法：`POST`
  - 请求：`body`中有`{password: string, verificationCode: string, verificationToken: string}`，`password`是新密码，`verificationCode`是6位明文验证码，`verificationToken`是`/user/send-code`返回的
  - 响应：无
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `400`：`400 Bad Request: Invalid password format`（`password`正则规则不通过）
    - `401`：`401 Unauthorized: Verification code does not match`（验证码错误）
    - `404`：`404 Not Found: User does not exist`（用户不存在）
    - `500`：`undefined`（其他内部错误）
- `/user/edit-profile`：更改通过验证的`email/phone`。先验证请求中的验证码与`verificationToken`中的是否一致，再更新`hasura`中的`email/phone`，如果`isTsinghua=True`那么校验邮箱为清华邮箱后更新`role`并重新返回`token`
  - 请求方法：`POST`
  - 请求：`body`中有`{verificationCode: string, verificationToken: string, isTsinghua: bool}`，`verificationCode`是6位明文验证码，`verificationToken`是`/user/send-code`返回的
  - 响应：无（若`isTsinghua=True`返回`token`）
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `401`：`401 Unauthorized: Verification code does not match`（验证码错误）
    - `422`：`422 Unprocessable Entity: Missing email`（是清华但缺邮箱）
    - `421`：`421 Authority Limited: Invalid Tsinghua email`（不是清华邮箱）
    - `422`：`422 Unprocessable Entity: Missing email or phone`（不是清华但缺邮箱和手机号）
    - `500`：`undefined`（其他内部错误）
- `/user/delete`：删除用户。先验证请求中的验证码与`verificationToken`中的是否一致，再删除`hasura`中的数据列
  - 请求方法：`POST`
  - 请求：`body`中有`{verificationCode: string, verificationToken: string}`，`verificationCode`是6位明文验证码，`verificationToken`是`/user/send-code`返回的
  - 响应：无
  - 错误：
    - `422`：`422 Unprocessable Entity: Missing credentials`（请求缺失参数）
    - `401`：`401 Unauthorized: Verification code does not match`（验证码错误）
    - `500`：`undefined`（其他内部错误）

### 数据库用户组权限

- 注册前默认为`anonymous`，不能查询所有与用户有关的信息（但能查询比赛介绍、公告等）
- 经过注册后的新用户为`user`，校外用户也应停留在这一用户组，能够参与比赛，但不能在信息化平台进行操作
- `user`在`Profile Page`添加清华邮箱后自动升级为`student`，具有大部分数据查询和删改权限
- `teacher`和`counselor`由我们在生产环境数据库中手动添加和维护（由`user`升级或批量创建新用户），暂不提供前端开关
