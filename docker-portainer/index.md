# docker安装portainer


<!--more-->
# docker安装portainer
portainner的安装非常简单，拉取镜像，创建容器，运行容器就搞定了。
## 测试环境
- docker版本
```
docker version
Docker version 20.10.7, build f0df350
```
## portainer 安装使用
```
docker run -d -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

## 首选回顾一下docker的基本命令
### docker基本命令
```
查看docker版本: docker version
查看docker基本信息: docker info
```

### 镜像命令
```
搜索镜像: docker search portainer
拉取镜像: docker pull portainer/portainer
```

### 容器命令
```
查看容器: docker ps -a | grep
进入容器: docker exec -it containerId(容器id)/containerName(容器名称) /bin/bash
退出容器: exit或ctrl+d
停止容器: docker stop containerId/containerName
启动容器: docker start containerId/containerName
删除容器: docker rm containerId/containerName
复制宿主机文件到容器：docker cp 宿主机目录及文件 容器名称:容器目录
创建容器:docker run -d -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
查看启动成功的容器: docker ps
查看所有容器: docker ps -a
```

## 修改docker源
```
vim /etc/docker/daemon.json

{
    "registry-mirrors": [
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com"
    ]
}
```

## 使用docker-compose启动nginx
### docker-compose安装
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#
sudo chmod +x /usr/local/bin/docker-compose
# 检查是否安装成功
docker-compose --version
```

### 启动默认实例后删除容器(目的是获取配置文件)
```
sudo docker run --name nginx -p 8080:80 -d nginx

cd /
sudo mkdir /data/dockerrun/nginx8080
cd /data/dockerrrun/nginx8080/
sudo docker cp nginx:/etc/nginx/nginx.conf .
sudo docker cp nginx:/etc/nginx/conf.d .
sudo docker cp nginx:/usr/share/nginx/html .

sudo docker stop nginx
sudo docker rm nginx
```

### 配置创建docker-compose-nginx.yml文件
```
sudo touch docker-compose-nginx.yml
vim docker-compose-nginx.yml
version: '3'
services:
  nginx:
    container_name: nginx8080
    image: nginx
    restart: always
    ports:
      - 8080:80
    privileged: true
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /data/dockerrun/nginx8080/log/:/var/log/nginx
      - /data/dockerrun/nginx8080/conf.d:/etc/nginx/conf.d
      - /data/dockerrun/nginx8080/nginx.conf:/etc/nginx/nginx.conf:ro
      - /data/dockerrun/nginx8080/html:/usr/share/nginx/html
```

### 编写启动脚本
```
sudo touch start_nginx8080.sh
sudo chmod +x start_nginx8080.sh
vim start_nginx8080.sh
sudo docker-compose -f docker-compose-nginx.yml up -d
```

### 启动脚本
```
./start_nginx8080.sh
```

## 参考文档
- docker 官方文档: https://docs.docker.com/reference/
- docker 构建开发环境: https://zhuanlan.zhihu.com/p/440325928
- docker中使用mysql: https://zhuanlan.zhihu.com/p/266534015


## 扩展
- k8s集群单机部署: https://www.hyhblog.cn/2021/02/17/deployment-manual-k8s-for-newbee/
- k8s集群搭建: https://zhuanlan.zhihu.com/p/363978095
- docker与podman对比
- podman: https://github.com/containers/podman

## docker私有仓库方案
- aliyun仓库
- coding: https://coding.net/help/docs/artifacts/quick-start/docker.html
- docker registry: https://cloud.tencent.com/developer/article/1676761


---

> 作者:   
> URL: https://cfanzp.com/docker-portainer/  

