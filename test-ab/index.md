# 使用ab做压力测试


<!--more-->
# 使用ab做压力测试
## 介绍
- 最近在使用ab做http/https的压力测试，遇到了不少的问题。在做压力测试的时候遇到了不少问题。
  - 使用单个客户端链接不到20000 ab客户端就退出了。
  - ab报各种错误。
  - 20000个连接测试满足不了需求。
  - 操作系统限制了压力测试。

## ab install
### centos
```bash
yum -y install httpd-tools
```

### ubuntu20.04
```bash
apt install apache2-utils
```

## mac
- 自带

## Windows
- https://www.apachehaus.com/cgi-bin/download.plx

## ab常用命令
```bash
ab -V
ab -h
```

## ab测试的用法
- demo:对网站进行并发10000的测试，总共发送50000个请求
```bash
ab -r -c 10000 -n 50000 http://192.168.2.100
```


## linux 客户端配置
```bash
nvim /etc/sysctl.conf
sysctl -p
```

## ab如何支持超过2万个请求？
- https://blog.csdn.net/qq_42279077/article/details/105933089

## FAQ
- nginx如何配置高并发？参考：https://blog.csdn.net/qq_42279077/article/details/105935620
- socket: Too many open files (24)
```bash
ulimit -n  1000000
```
### 报错reset by peer
- 报错信息
```bash
apr_socket_recv: Connection reset by peer (104)
```
- server 修改配置
```bash
ulimit -n  1000000
```

## 相关命令
```bash
#查看tcp建立连接情况
watch -n 0.5 ss -s
#查看端口监听情况
netstat -tunlp | grep 8000

```


# 参考
- ab下载：https://www.cnblogs.com/liuyu2014/p/11855681.html


---

> 作者:   
> URL: https://cfanzp.com/test-ab/  

