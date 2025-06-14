# 构建自己的centos Docker镜像


<!--more-->
# 构建自己的centos Docker镜像
## 编写Dockerfile
- 注意这里需要把需要的包(protobuf2.6.1)先拷贝到相应的目录tools中去
```Dockerfile
# 基础镜像，这里选用centos
FROM centos:7.9.2009
# 镜像所有者
MAINTAINER cfanzp "cfan.zp@qq.com"
# 1.准备工作创建文件夹
RUN \
    mkdir -p /data/tools \
    && mkdir /data/log

# 复制文件，将要安装的jdk、redis及nginx安装包复制到镜像内
#COPY redis.conf /etc/redis/redis.conf
#COPY supervisord.conf /etc/supervisord.conf

RUN yum -y install epel-release
RUN yum -y install htop
#安装vim编辑器
RUN yum -y install vim

#安装gcc等编译环境
RUN yum -y install automake libtool make
RUN yum -y install git tmux gcc gcc-c++ openssl-devel autoconf automake
RUN yum -y install libtool readline-devel zlib-devel unzip
RUN yum -y install the_silver_searcher lrzsz iptables-services

# skynet console
RUN yum -y install rlwrap nc
#gcc11
RUN yum -y install centos-release-scl
RUN yum -y install devtoolset-11-gcc*

RUN echo "source /opt/rh/devtoolset-11/enable" >>/etc/profile
RUN source /etc/profile

## install protobuf
COPY ./tools/protobuf-2.6.1-test1.5.0.tar.gz /data/tools/
RUN cd /data/tools/ \
        && tar -xzvf protobuf-2.6.1-test1.5.0.tar.gz \
        && cd protobuf-2.6.1-test1.5.0 \
        && ./autogen.sh \
        && ./configure \
        && make && make install

# 安装 sshd 修改密码
RUN \
    yum install passwd openssl openssh-server -y \
    && ssh-keygen -q -t rsa -b 2048 -f /etc/ssh/ssh_host_rsa_key -N '' \
    && ssh-keygen -q -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key -N '' \
    && ssh-keygen -t dsa -f /etc/ssh/ssh_host_ed25519_key  -N '' \
    && sed -i "s/#UsePrivilegeSeparation.*/UsePrivilegeSeparation no/g" /etc/ssh/sshd_config \
    && sed -i "s/UsePAM.*/UsePAM no/g" /etc/ssh/sshd_config \
    && echo 123456 | passwd --stdin root \
    && echo root:123456|chpasswd \
    && rm -rf /var/cache/yum/**

# 安装supervisor,这个工具会提供一个主线程，避免出现由于后台应用无法启动而造成镜像无法启动
#RUN \
#    yum install -y python-setuptools \
#    && easy_install supervisor

#清除yum缓存
#RUN \
#       rm -rdf /var/cache/yum/**

#配置jdk环境变量
#ENV JAVA_HOME=/opt/tools/jdk1.8.0_191
#ENV CLASSPATH=$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
#ENV PATH=$PATH:$JAVA_HOME/bin
#配置系统编码
#ENV LANG en_US.utf8

#CMD /usr/bin/supervisord -c /etc/supervisord.conf
#CMD /usr/sbin/init
```

- Dockerfile demo2
```bash
# 基础镜像，这里选用centos
FROM centos:7.9.2009
# 镜像所有者
MAINTAINER cfanzp "cfan.zp@qq.com"
# 1.准备工作创建文件夹
RUN \
    mkdir -p /data/tools \
    && mkdir /data/log

# 复制文件，将要安装的jdk、redis及nginx安装包复制到镜像内
ADD CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo

RUN yum makecache

RUN yum -y install epel-release
RUN yum -y install htop
#安装vim编辑器
RUN yum -y install vim

# 安装 sshd 修改密码
RUN \
    yum install passwd openssl openssh-server -y \
    && ssh-keygen -q -t rsa -b 2048 -f /etc/ssh/ssh_host_rsa_key -N '' \
    && ssh-keygen -q -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key -N '' \
    && ssh-keygen -t dsa -f /etc/ssh/ssh_host_ed25519_key  -N '' \
    && sed -i "s/#UsePrivilegeSeparation.*/UsePrivilegeSeparation no/g" /etc/ssh/sshd_config \
    && sed -i "s/UsePAM.*/UsePAM no/g" /etc/ssh/sshd_config \
    && echo 123456 | passwd --stdin root \
    && echo root:123456|chpasswd \
    && rm -rf /var/cache/yum/**
```

## 构建镜像
```bash
docker build -t centos_dev:latest .
```

## 启动容器
```bash
docker run -idt --name centos_dev1 centos_dev:latest /bin/bash
```

## 常见问题
### 如何给docker内的centos更换镜像源?
- 思路，先在宿主机器上下载最新的镜像源，再在Dockerfile中使用COPY或ADD命令更换镜像源
```bash
#获取国内源
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
#到/etc/yum.repos.d/目录下查找源
cd /etc/yum.repos.d/
#将源拷贝到你Dockerfile所在目录
```
- Dockerfile修改
```bash
#使用 ADD 命令将 CentOS-Base.repo 拷贝到目标基础镜像的目录下
ADD  CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo
#更新yum源|如果你不需要更新版本，可以不执行此命令（升级后的版本太高可能导致原有软件不能运行）
#RUN yum -y update
#运行yum makecache生成缓存，便于查找
RUN yum makecache
```


## 参考
- [Dockerfile更换centos7yum源](https://blog.csdn.net/jiangjing0623/article/details/108245879)


---

> 作者:   
> URL: http://111.230.8.71:8889/docker-configfile/  

