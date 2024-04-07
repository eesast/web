---
title: 队式比赛 NFS 绑定流程
description: 网站开发技术文档
permalink: /nfs
---

# 队式比赛 NFS 绑定流程

> 队式比赛中后端服务器与 Docker 服务器是分离的，文件（代码、编译文件、比赛回放等）从 COS 的下载和上传都在后端服务器上执行，通过 NFS 来实现后端服务器与比赛 Docker 服务器之间的文件共享。本文记录在配置 NFS 过程中遇到的所有坑。

## 配置 NFS Server

### 安装 NFS 服务器

NFS 服务器包提供运行 NFS 内核服务器所需的用户空间支持。要安装软件包，请运行：

```bash
sudo apt update
sudo apt install nfs-kernel-server
```

安装完成后，NFS 服务将自动启动。

在 Ubuntu 20.04 上，NFS 版本 2 被禁用。版本 3 和 4 已启用。您可以通过运行以下命令来验证：

```bash
sudo cat /proc/fs/nfsd/versions
(output) -2 +3 +4 +4.1 +4.2
```

NFSv2 现在已经很老了，没有理由启用它。

NFS 服务器配置在`/etc/default/nfs-kernel-server`和`/etc/default/nfs-common`文件中定义。对于大多数情况，默认设置就足够了。

### 建立文件夹并绑定

上一步已在 Server 上安装好依赖包。

首先建立想要共享的文件夹，假设为`/var/contest`：

```bash
sudo mkdir -p /var/contest
```

然后建立 NFS 的工作文件夹：

```bash
sudo mkdir -p /srv/nfs4/contest
```

接下来在服务器上将想共享的文件夹绑定到 NFS 的文件夹：

```bash
sudo mount --bind /var/contest /srv/nfs4/contest
```

> 注：若要在重新启动后使绑定挂载永久化，请打开/etc/fstab文件
>
> `sudo nano /etc/fstab`
>
> 并添加以下行：
>
> ```bash
> /etc/fstab
> /var/contest     /srv/nfs4/contest      none   bind   0   0
> ```

### 权限控制

接下来设置访问 ip 与权限控制：

```conf
/srv/nfs4         10.242.0.0/16(insecure,rw,sync,no_subtree_check,crossmnt,fsid=0)
/srv/nfs4/contest 10.242.0.0/16(insecure,rw,sync,no_subtree_check,anonuid=0,anongid=0)
```

其中，第二行有必要解说一下。这个`/etc/exports`文件中的行`/srv/nfs4/contest 10.242.0.0/16(insecure,rw,sync,no_subtree_check,anonuid=0,anongid=0)`可以被解读为以下内容：

- `10.242.0.0/16`表示允许访问 NFS 的客户端 ip 范围（16表示子网掩码前16位，在这里就是说只要是`10.242.x.x`形式的 ip 都可以访问。）当然，也可以设置为精确的 ip。

* `/srv/nfs4/contest`: 这是要导出的目录路径，即NFS服务器上的目录路径。
* `10.242.0.0/16`: 这是允许访问该目录的IP地址范围。在这种情况下，允许IP地址范围为`10.242.0.0`到`10.242.255.255`之间的所有主机访问该目录。
* `insecure`: 这个选项允许使用非特权端口（大于1024）来处理NFS请求。这在某些情况下可能会降低安全性，但可以提高兼容性。
* `rw`: 这表示客户端对该目录具有读写权限，即可以读取和写入文件。
* `sync`: 这表示服务器将在数据写入磁盘之前等待确认，以确保数据同步。
* `no_subtree_check`: 这个选项禁用子树检查，以提高性能。子树检查会导致NFS服务器检查整个文件系统的权限，而禁用它可以减少此类开销。
* `anonuid=0`: 这表示匿名用户的UID为0，即root用户。匿名用户是指未经身份验证的用户，他们将以指定的UID访问共享目录。没有 root 权限的话，就无法删除 Docker 服务器生成的文件。
* `anongid=0`: 这表示匿名用户的GID为0，即root用户的组ID。

通过这些选项，该行指定了将`/srv/nfs4/contest`目录导出给IP地址范围为`10.242.0.0/16`的主机，这些主机具有读写权限，并且匿名用户将以root用户的身份访问该目录。同时，服务器会等待数据写入磁盘并禁用子树检查以提高性能。

### 启动 NFS

```bash
sudo /etc/init.d/nfs-kernel-server restart
```

### 修改 `/etc/exports` 之后无需重启 NFS 服务

运行下面的命令就可以了：

应用 ip 设置

```bash
sudo exportfs -ar
```

查看 ip 配置

```bash
sudo exportfs -v
```

## 客户端配置

### ZeroTier 组网

采用 ZeroTier 的原因在于我的电脑没有公网 ip，导致本地的后端无法收到来自 Docker 服务器的回调请求`/code/compile-finish`。如果你的后端和 Docker 服务器都可以通过 ip 直接访问，可以忽略这一步。

这一部分不多说，网上有很多教程。在配置完成后，网络内的每台终端都会有一个虚拟 ip 地址。比如我的后端与Docker 服务器的 ip 地址分别如下：

```
（测试后端）10.242.182.113
（Docker 服务器）10.242.42.186
```

ip 范围在 `10.242.0.0`\~`10.242.255.255` 之间，处于服务端的 ip 权限控制范围之内。由于这个 ip 是虚拟的，没有登入 ZeroTier 的设备无法访问，因此也增强了 NFS 的安全性。

### WSL 网络的坑

> wsl2 的网络经过了微软的魔改，win 可以用 localhost 访问到 wsl2，但是反过来还不行。——xfgg

由于复杂的问题，WSL2 里启动的后端，只有本机的windows可以通过 localhost 访问，其他主机无法访问这个后端，Docker 服务器需要调用后端的`/code/compile-finish`，会面临网络问题。

解决方案：1. 用 Nginx 反向代理，将发给本机 windows 的请求转发到 WSL2 内部；2. 放弃 WSL2，在具有正常网络 ip 地址的地方部署后端服务。

我选择采用一种曲折的方式实现方法 2：把 `api` 的代码绑定到一个 Docker 容器内，在容器内启动后端。容器的网络服务是可以直接通过 ip 访问的。

下载 `node` 的镜像，再 `apt install nfs-common`，就能在 Docker 容器内启动后端并使用 NFS。我配置了一个具有 node v21 和 nfs-common 包的容器：`blitherboom812/api_test`。

docker compose 一下：

```yaml
version: "3"

services:
  runner:
    image: api_test
    container_name: backend
    privileged: true
    ports:
      - "28888:28888"
    volumes:
      - /home/xxxx/eesast/api/:/home/api/ # 后端代码文件的位置
      - ./scripts:/home/scripts
    stdin_open: true
    tty: true
```

`docker exec -it backend bash` 进入 docker 。

接下来 启动 NFS 客户端：

```bash
DIR_NAME=/var/contest
mkdir -p $DIR_NAME
mount -t nfs -o vers=4 10.242.42.186:/contest $DIR_NAME
```

然后进入`/home/api`启动`yarn start`，就大功告成了。
