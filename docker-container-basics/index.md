# Docker 容器化入门完全指南


## 前言

在现代软件开发和部署中，Docker 已成为不可或缺的核心技术。它通过容器化技术，让应用程序的打包、分发和运行变得前所未有的简单。本文将带你从零开始，系统学习 Docker 的安装、基础命令和实战应用。

<!--more-->

## 一、Docker 简介

### 1.1 什么是 Docker

Docker 是一个开源的容器化平台，允许开发者将应用程序及其依赖打包到一个轻量级、可移植的容器中。与传统虚拟机相比，Docker 容器共享宿主机的操作系统内核，启动更快、占用资源更少。

### 1.2 Docker 的核心概念

- **镜像（Image）**：只读的模板，用于创建容器
- **容器（Container）**：镜像的运行实例
- **仓库（Repository）**：存储和分发镜像的场所
- **Dockerfile**：定义镜像构建规则的脚本

## 二、Docker 安装

### 2.1 Ubuntu/Debian 系统安装

```bash
# 更新软件源
sudo apt update

# 安装依赖包
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 验证安装
docker --version
```

### 2.2 CentOS/RHEL 系统安装

```bash
# 安装依赖
sudo yum install -y yum-utils

# 添加 Docker 仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动并设置开机自启
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
```

### 2.3 macOS 安装

对于 macOS 用户，推荐使用 Docker Desktop：

1. 访问 [Docker Desktop 官网](https://www.docker.com/products/docker-desktop)
2. 下载 Docker Desktop for Mac
3. 双击下载的 `.dmg` 文件
4. 将 Docker 图标拖拽到 Applications 文件夹
5. 启动 Docker Desktop，等待系统托盘显示鲸鱼图标

### 2.4 验证安装

```bash
# 运行测试容器
sudo docker run hello-world

# 查看 Docker 信息
docker info

# 查看 Docker Compose 版本
docker-compose --version
```

## 三、Docker 基础命令

### 3.1 镜像管理命令

```bash
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest

# 查看本地镜像
docker images
# 或
docker image ls

# 删除镜像
docker rmi nginx:latest

# 构建镜像（通过 Dockerfile）
docker build -t myapp:1.0 .

# 导出镜像为 tar 文件
docker save -o myapp.tar myapp:1.0

# 导入 tar 文件为镜像
docker load -i myapp.tar
```

### 3.2 容器管理命令

```bash
# 创建并启动容器
docker run -it --name mycontainer nginx:latest /bin/bash

# 常用参数说明：
# -i: 交互式模式
# -t: 分配伪终端
# -d: 后台运行
# --name: 指定容器名称
# -p: 端口映射（宿主机端口:容器端口）
# -v: 卷挂载（宿主机路径:容器路径）
# -e: 设置环境变量
# --rm: 容器退出后自动删除

# 后台运行容器
docker run -d --name webserver -p 8080:80 nginx:latest

# 查看运行中的容器
docker ps

# 查看所有容器（包括已停止）
docker ps -a

# 启动已停止的容器
docker start mycontainer

# 停止容器
docker stop mycontainer

# 重启容器
docker restart mycontainer

# 进入运行中的容器
docker exec -it mycontainer /bin/bash

# 删除容器
docker rm mycontainer

# 查看容器日志
docker logs -f mycontainer

# 查看容器详细信息
docker inspect mycontainer

# 查看容器资源使用
docker stats mycontainer
```

### 3.3 数据卷命令

```bash
# 创建数据卷
docker volume create myvolume

# 查看数据卷列表
docker volume ls

# 查看数据卷详情
docker volume inspect myvolume

# 删除未使用的数据卷
docker volume prune

# 使用数据卷启动容器
docker run -d -v myvolume:/app/data nginx:latest
```

### 3.4 网络命令

```bash
# 创建网络
docker network create mynetwork

# 查看网络列表
docker network ls

# 查看网络详情
docker network inspect mynetwork

# 连接容器到网络
docker network connect mynetwork mycontainer

# 断开容器网络连接
docker network disconnect mynetwork mycontainer

# 删除网络
docker network rm mynetwork
```

## 四、Dockerfile 详解

Dockerfile 是用于构建 Docker 镜像的脚本文件。以下是一个完整的示例：

```dockerfile
# 基于官方镜像
FROM python:3.11-slim

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY requirements.txt .

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 8000

# 设置环境变量
ENV APP_ENV=production

# 定义启动命令
CMD ["python", "main.py"]
```

### Dockerfile 常用指令

| 指令 | 说明 |
|------|------|
| FROM | 指定基础镜像 |
| RUN | 执行命令 |
| COPY | 复制文件 |
| ADD | 复制文件（支持 URL 和解压） |
| WORKDIR | 设置工作目录 |
| EXPOSE | 声明端口 |
| ENV | 设置环境变量 |
| CMD | 容器启动命令 |
| ENTRYPOINT | 入口点 |
| VOLUME | 定义卷 |
| ARG | 构建参数 |

## 五、Docker Compose 实战

### 5.1 Docker Compose 简介

Docker Compose 是一个用于定义和运行多容器应用的工具，通过 YAML 文件配置应用服务。

### 5.2 安装 Docker Compose

```bash
# 下载最新版本
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
```

### 5.3 实战案例：部署 Web 应用

创建一个完整的 LEMP（Linux + Nginx + MySQL + PHP）环境：

```yaml
# docker-compose.yml
version: '3.8'

services:
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./html:/usr/share/nginx/html
    depends_on:
      - php
    networks:
      - app-network

  php:
    image: php:8.2-fpm
    volumes:
      - ./html:/var/www/html
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: myapp
      MYSQL_USER: app_user
      MYSQL_PASSWORD: app_password
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
```

启动应用：

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 停止并删除数据卷
docker-compose down -v
```

## 六、综合实战案例

### 6.1 案例一：Node.js 应用容器化

项目结构：

```
my-node-app/
├── Dockerfile
├── package.json
├── src/
│   └── index.js
└── .dockerignore
```

**package.json：**

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**src/index.js：**

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Dockerfile：**

```dockerfile
# 多阶段构建
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build 2>/dev/null || true

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
EXPOSE 3000
CMD ["node", "src/index.js"]
```

**构建并运行：**

```bash
# 构建镜像
docker build -t my-node-app:1.0 .

# 运行容器
docker run -d -p 3000:3000 --name my-node-app my-node-app:1.0

# 测试访问
curl http://localhost:3000
```

### 6.2 案例二：Python 数据分析容器化

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 运行分析脚本
CMD ["python", "analyze.py"]
```

### 6.3 案例三：MySQL 数据库容器化

```bash
# 运行 MySQL 容器
docker run -d \
  --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -e MYSQL_DATABASE=myapp \
  -e MYSQL_USER=appuser \
  -e MYSQL_PASSWORD=apppass \
  -p 3306:3306 \
  -v mysql-data:/var/lib/mysql \
  mysql:8.0

# 连接 MySQL
docker exec -it mysql-server mysql -u root -p

# 备份数据库
docker exec mysql-server mysqldump -u root -p myapp > backup.sql
```

## 七、常见问题与解决方案

### 7.1 权限问题

```bash
# 将当前用户加入 docker 组，避免每次使用 sudo
sudo usermod -aG docker $USER
newgrp docker

# 验证当前用户是否有 docker 权限
docker ps
```

### 7.2 镜像构建失败

```bash
# 清理未使用的镜像
docker image prune -a

# 清理构建缓存
docker builder prune

# 强制清理所有未使用资源
docker system prune -a
```

### 7.3 容器无法访问外网

```bash
# 检查 Docker 网络
docker network ls

# 创建自定义网络
docker network create mynetwork

# 重新运行容器加入该网络
docker run -d --network mynetwork nginx
```

### 7.4 端口冲突

```bash
# 查看端口占用
sudo netstat -tlnp | grep 80

# 或者使用 lsof
sudo lsof -i :80

# 修改容器端口映射
docker run -d -p 8080:80 nginx
```

## 八、最佳实践

### 8.1 镜像优化

- 使用多阶段构建减小镜像体积
- 使用 alpine 等轻量级基础镜像
- 合理利用构建缓存
- 合并 RUN 指令减少层数

### 8.2 安全建议

- 定期更新基础镜像
- 不在镜像中存储敏感信息
- 使用非 root 用户运行容器
- 限制容器资源使用

### 8.3 日志管理

```bash
# 限制日志文件大小
docker run -d --log-opt max-size=10m --log-opt max-file=3 nginx

# 清空容器日志
truncate -s 0 /var/lib/docker/containers/*/*-json.log
```

## 九、总结

本文系统介绍了 Docker 容器化技术，包括安装配置、基础命令、Dockerfile 编写和 Docker Compose 使用。通过三个实战案例，展示了如何容器化 Node.js 应用、Python 应用和 MySQL 数据库。

Docker 是现代云原生应用的基础，掌握它将为你的 DevOps 之旅打下坚实基础。建议读者多加练习，在实际项目中应用所学知识。

## 参考资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/docker-container-basics/  

