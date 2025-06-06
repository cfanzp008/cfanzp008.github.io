# Nginx性能测试


<!--more-->
# Nginx性能测试
## FAQ
### 为什么Nginx反向代理建立28231个连接就不能再创建连接了？
- 默认能够分配的端口为28231个
```bash
root@VM-8-10-ubuntu:/# cat /proc/sys/net/ipv4/ip_local_port_range
32768   60999
```

### 突破反向代理单机最多支持65535个端口的限制
- https://blog.csdn.net/weixin_40872468/article/details/105164127
- 添加多个端口配置
```bash
ifconfig eth0:1 192.168.2.3 netmask 255.255.255.0 up
ifconfig eth0:2 192.168.2.4 netmask 255.255.255.0 up
ifconfig eth0:3 192.168.2.5 netmask 255.255.255.0 up
ifconfig eth0:4 192.168.2.6 netmask 255.255.255.0 up
```

- nginx配置
```nginx
#user  nobody;
worker_processes  8;
error_log  logs/error.log  info;

pid        logs/nginx.pid;


events {
    use epoll;
    worker_connections  1024;
}


stream {
    split_clients "$remote_addr$remote_port" $split_ip {
        50% 192.168.2.3;
        *   192.168.2.4;
    }
    upstream tcp_proxy {
        server 192.168.1.100:8000;
    }
    server {
        listen 10000;// 监听8998端口
        proxy_pass tcp_proxy;
        proxy_bind $split_ip;
    }
}
```
## 常用命令
```bash
#kill nginx
ps -ef | grep nginx
root 10800 1 0 02:27 ? 00:00:00 nginx: master process ./nginx
root 10801 10800 0 02:27 ? 00:00:00 nginx: worker process
kill -s SIGTERM 10800
#或者
kill -s SIGINT 10800
#优雅地关闭Nginx
/opt/nginx/sbin/nginx -s quit
```

## 测试工具
- ab
- wrk
- webbench

## 相关书籍
- 深入理解Nginx：模块开发与架构解析（第2版）


---

> 作者:   
> URL: http://111.230.8.71:8889/test-nginx/  

