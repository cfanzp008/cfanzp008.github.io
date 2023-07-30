# 在ubuntu环境下搭建skynet运行环境


<!--more-->
# 在ubuntu环境下搭建skynet运行环境
## 安装相关依赖
```
sudo apt-get install libtool
sudo apt-get install zlib1g-dev
```

## 安装protobufv2.6.1

## 安装curl
```
./configure --with-openssl
```


## 相关错误
```
fatal error: zlib.h: No such file or directory
```

- 找不到链接库
```sshll
protoc: error while loading shared libraries: libprotoc.so.9: cannot open shared object file: No such file or directory
```

- 解决方法
```shell
sudo ldconfig
```


---

> 作者:   
> URL: https://cfanzp.com/skynet-ubuntu/  

