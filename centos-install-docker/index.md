# centos install Docker


<!--more-->

# centos install Docker
## 卸载之前的docker
```bash
sudo yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine

```

## 安装依赖
```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

## 添加源
```bash
sudo yum-config-manager  --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

- 报错改为使用阿里源
```bash
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

## 安装docker
```bash
sudo yum install docker-ce docker-ce-cli containerd.io
依赖关系解决

============================================================================================================================================================================================================================================
 Package                                                         架构                                         版本                                                             源                                                      大小
============================================================================================================================================================================================================================================
正在安装:
 containerd.io                                                   x86_64                                       1.6.33-3.1.el7                                                   docker-ce-stable                                        35 M
 docker-ce                                                       x86_64                                       3:26.1.4-1.el7                                                   docker-ce-stable                                        27 M
 docker-ce-cli                                                   x86_64                                       1:26.1.4-1.el7                                                   docker-ce-stable                                        15 M
为依赖而安装:
 audit-libs-python                                               x86_64                                       2.8.5-4.el7                                                      base                                                    76 k
 checkpolicy                                                     x86_64                                       2.5-8.el7                                                        base                                                   295 k
 container-selinux                                               noarch                                       2:2.119.2-1.911c772.el7_8                                        extras                                                  40 k
 docker-buildx-plugin                                            x86_64                                       0.14.1-1.el7                                                     docker-ce-stable                                        14 M
 docker-ce-rootless-extras                                       x86_64                                       26.1.4-1.el7                                                     docker-ce-stable                                       9.4 M
 docker-compose-plugin                                           x86_64                                       2.27.1-1.el7                                                     docker-ce-stable                                        13 M
 fuse-overlayfs                                                  x86_64                                       0.7.2-6.el7_8                                                    extras                                                  54 k
 fuse3-libs                                                      x86_64                                       3.6.1-4.el7                                                      extras                                                  82 k
 libcgroup                                                       x86_64                                       0.41-21.el7                                                      base                                                    66 k
 libseccomp                                                      x86_64                                       2.3.1-4.el7                                                      base                                                    56 k
 libsemanage-python                                              x86_64                                       2.5-14.el7                                                       base                                                   113 k
 policycoreutils-python                                          x86_64                                       2.5-34.el7                                                       base                                                   457 k
 python-IPy                                                      noarch                                       0.75-6.el7                                                       base                                                    32 k
 setools-libs                                                    x86_64                                       3.3.8-4.el7                                                      base                                                   620 k
 slirp4netns                                                     x86_64                                       0.4.3-4.el7_8                                                    extras                                                  81 k

事务概要
============================================================================================================================================================================================================================================
安装  3 软件包 (+15 依赖软件包)

总下载量：116 M
安装大小：407 M
Is this ok [y/d/N]: y
```

## 启动docker
```bash
#启动docker
sudo systemctl start docker
#查看docker服务状态 running 就是启动成功
sudo systemctl status docker
#设置 docker 开机自启
sudo systemctl enable docker
```

## 配置docker镜像源
```bash
root@VM-8-10-ubuntu:~# cat /etc/docker/daemon.json
{
    "registry-mirrors": [
        "https://docker.unsee.tech",
        "https://dockerpull.org",
        "https://docker.1panel.live",
        "https://dockerhub.icu"
    ]
}
```

## 参考
- [centos7 install docker](https://blog.csdn.net/qq_58141314/article/details/131020932)
- [解决centos7 docker源问题](https://blog.csdn.net/qq_58141314/article/details/131020932)
- [ubuntu 安装docker](https://blog.csdn.net/u011278722/article/details/137673353)
- [国内能用的Docker镜像源【2024最新持续更新】](https://blog.csdn.net/u014390502/article/details/143472743)


---

> 作者:   
> URL: http://111.230.8.71:8889/centos-install-docker/  

