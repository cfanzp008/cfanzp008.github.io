# 在centos环境下搭建skynet运行环境


<!--more-->
# 在centos环境下搭建skynet运行环境
## 安装个人偏好软件
### the_silver_searcher,htop
```bash
yum install -y the_silver_searcher
yum install -y epel-release
yum install -y htop
```

### tmux
```Bash
yum install -y tmux
```
- 配置
```bash
[root@server ~]# cat ~/.tmux.conf 
set -g default-terminal "screen-256color"

set-option -g allow-rename off

#-- base settings --#
set -g mode-keys vi
# prefix key (Ctrl+a)
set -g prefix ^a
unbind ^b
bind ^a send-prefix

#up
bind-key k select-pane -U
#down
bind-key j select-pane -D
#left
bind-key h select-pane -L
#right
bind-key l select-pane -R
```
## 安装基础依赖
```bash
yum install -y git
yum install git tmux gcc gcc-c++ openssl-devel autoconf automake
yum install libtool readline-devel zlib-devel unzip
yum install the_silver_searcher lrzsz iptables-services
```

## 安装gcc11
```bash
sudo yum install centos-release-scl
sudo yum install devtoolset-11-gcc*
echo "source /opt/rh/devtoolset-11/enable" >>/etc/profile
source /etc/profile
gcc -v
```

## 安装curl
```bash
yum install openssl-devel
https://curl.haxx.se/download/
wget https://curl.haxx.se/download/curl-7.78.0.tar.gz
或源码文件中获取i
cp tools/curl-7.78.0.tar.gz data/
tar -zxvf curl-7.78.0.tar.gz
./configure --with-openssl
make
make install
```

## 安装protobuf(依赖gtest)
```bash
wget https://github.com/google/googletest/archive/release-1.5.0.zip
wget https://github.com/google/protobuf/archive/v2.6.1.zip
unzip protobuf-2.6.1.zip
cd protobuf-2.6.1
tar zxvf protobuf.tar.gz
cp tools/googletest/googletest-release-1.5.0.zip ./protobuf-2.6.1/
cd protobuf-2.6.1
mv googletest-release-1.5.0 gtest
./autogen.sh
./configure
make -jn //多核编译[n为cpu核数]
make check
make install
```

## 配置git 缩写
```bash
cd tools/git/
cp .gitconfig ~/
```

## 报错解决
- skynet 编译报错
```bash
cc -shared -llua -L../skynet/3rd/lua/ -I/usr/local/include -o ../luaclib/webclient.so -fPIC -O3 -Wall -std=c99 -pedantic -I../skynet/3rd/lua webclient.c -L/usr/local/lib -lcurl 
webclient.c:29:10: fatal error: curl/curl.h: 没有那个文件或目录
   29 | #include <curl/curl.h>
      |          ^~~~~~~~~~~~~
compilation terminated.
make[1]: *** [../luaclib/webclient.so] 错误 1
make[1]: 离开目录“/data/lw_gold/lualib-src”
make: *** [deps] 错误 2
yum install libcurl-dev libcurl-devel
```

## skynet console 依赖安装
```
sudo yum -y install rlwrap
sudo yum -y install nc
```

## redis 安装
- redis5.0.4 gcc11 编译报错
- 参考url: https://github.com/daanx/mimalloc-bench/issues/19
```
redis build fails with multiple definition of SDS_NOINIT #19
更新版本到7.0.8
```

- redis make test报错
```bash
make test
You need tcl 8.5 or newer in order to run the Redis test
wget http://downloads.sourceforge.net/tcl/tcl8.6.1-src.tar.gz
cd  ./tcl8.6.1/unix/
./configure
make
make install
```

## mysql 安装
```
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
sudo yum install mysql-server
service mysqld start
#为root添加远程连接的能力。链接密码为 “aaabbb”（不包括双引号）
mysql> GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "aaabbb";
```


---

> 作者:   
> URL: https://cfanzp.com/skynet-centos/  

