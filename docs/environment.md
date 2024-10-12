配环境教程v1 zrt 24.9.29

1. 进入eesast仓库，将web、api和hasura仓库fork到本地；2.新建主目录，在目录下敲code . 进入连接wsl的vscode，将目录变成git仓库，在目录下新建web文件夹git remote连接本地fork下来的web仓库，api、hasura同理；（具体命令可以参考git暑培教程）

2. 三个文件夹路径下分别git clone对应内容或者git pull拉取对应内容，结束后应该能在本地看到网站组开发代码；

   //链接使用SSH比HTTPS更容易成功

3. web文件夹下配前端环境，将.env文件拖入，安装yarn，尝试yarn start;

4. api文件夹下配后端环境，尝试yarn start；

5. hasura文件夹是数据库，尝试yarn console；

   //以上步骤中缺什么包就装什么包
   //若nodejs版本不够请先升级：https://blog.csdn.net/qq_22713201/article/details/122486841

6. 都能正常运行：先后端yarn start再前端yarn start，就能启动测试端。
