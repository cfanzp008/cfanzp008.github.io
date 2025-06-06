# docker基础


<!--more-->
# docker基础
## docker常见命令
```
docker run 创建并运行一个容器， -d让容器后台运行
docker inspect 查看容器信息
docker pull 拉取镜像
docker build构建镜像
docker images 查看当前下载的镜像
docker rmi 删除镜像
docker save -o nginx.tar nginx:latest  镜像保存为nginx.tar
docker load -i nginx.tar  加载镜像nginx.tar

docker run 创建并运行容器
--name:容器名
- p 8000:3306 前面是宿主机端口，后面是容器的端口
-e MYSQL_ROOT_PASSWORD=123 -e 环境变量
docker ps 查看当前运行的容器
docker stop 停止容器
exit 或ctrl + d推出容器
docker exec -it containerId或containerName /bin/bash进入容器
docker cp /opt/tools/nvim.tar.gz nginx1:/opt/tools/  将宿主机中的nvim.tar.gz拷贝到容器nginx1的/opt/tools/目录中
```

## docker怎么使用？
### 查看docker版本
```
docker --version
```



---

> 作者:   
> URL: http://111.230.8.71:8889/docker-question/  

