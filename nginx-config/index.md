# nginx基本用法与配置笔记

# nginx配置笔记
## 基本概念
- 惊群现象：一个网路连接到来，多个睡眠的进程被同时叫醒，但只有一个进程能获得链接，这样会影响系统性能。

## 全局块
- nginx服务器用户组
- nginx进程pid
- 日志存放路径
- 配置文件引入
- 允许生成worker process数

## event块
- 配置影响nginx服务器或与用户的网络连接。包括:
- 每个进程的最大连接数
- 选取那种事件驱动模型处理连接请求
- 是否允许同时接受多个网路连接
- 开启多个网络连接序列化等。


## http块
- 可以嵌套多个server
- 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。
- 文件引入
- mime-type定义
- 日志定义
- 是否使用sendfile传输文件
- 连接超时时间
- 单连接请求数


## server块
- 配置虚拟主机的相关参数，一个http中可以有多个server块


## location 块
- 配置请求的路由，以及各种页面的请求情况

## nginx文件结构
```
...  #全局块

events {         #events块
    ...
}

http      #http块
{
    ...   #http全局块
    server        #server块
    {
        ...       #server全局块
            location [PATTERN]   #location块
            {
                ...
            }
        location [PATTERN] 
        {
            ...
        }
    }
    server
    {
        ...
    }
    ...     #http全局块
}
```

## 一个nginx 配置文件的拆解分析
```
########### 每个指令必须有分号结束。#################
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
        include       mime.types;   #文件扩展名与文件类型映射表
        default_type  application/octet-stream; #默认文件类型，默认为text/plain
        #access_log off; #取消服务日志
        log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
        access_log log/access.log myFormat;  #combined为日志格式的默认值
        sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
        sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
        keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

        upstream mysvr {
                server 127.0.0.1:7878;
                server 192.168.10.121:3333 backup;  #热备
        }
        error_page 404 https://www.baidu.com; #错误页
        server {
            keepalive_requests 120; #单连接请求上限次数。
            listen       4545;   #监听端口
            server_name  127.0.0.1;   #监听地址
            location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
                #root path;  #根目录
                #index vv.txt;  #设置默认页
                proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
                deny 127.0.0.1;  #拒绝的ip
                allow 172.18.5.54; #允许的ip
        }
    }
}
```

## 参考
- https://www.runoob.com/w3cnote/nginx-setup-intro.html
- https://www.jianshu.com/p/96d3b1fba09b
- https://www.jianshu.com/p/96d3b1fba09b



---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/nginx-config/  

