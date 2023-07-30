# 使用nginx搭建一个简单的下载服务


<!--more-->
# 使用nginx搭建一个简单的下载服务
有时候为了方便局域网内共享下载一些工具可以搭建一个ftp服务器，也可以用nginx搭建一个简单的下载网站。
## nginx相关配置
- 添加如下配置
```
    server {
        listen       80;
        server_name  localhost;

        location /{
               root /data/soft/;
               autoindex on; # 打开目录浏览功能
               autoindex_localtime on; # 显示文件时间
               autoindex_exact_size on; # 显示文件确切大小
        }
    }

```

-  检查配置
```
nginx -t
```

-  重新加载配置
```
nginx -s reload
```


---

> 作者:   
> URL: https://cfanzp.com/nginx-download-server/  

