# nginx配置https转发

# nginx配置https转发
## 下载nginx
- http://nginx.org/en/download.html
```
wget http://nginx.org/download/nginx-1.20.2.tar.gz
```

## 安装nginx
- 参考: https://www.cnblogs.com/-wei/p/15219624.html
```
tar -xzvf nginx-1.20.2.tar.gz
cd nginx-1.20.2
./configure --prefix=/opt/nginx --with-http_ssl_module
make && make install
```

## aliyun申请免费证书
- 这里以www.cfanzp.com为例子，具体申请流程这里就不赘述了。
- 申请成功后得到ngnix配置需要的证书和证书秘钥
```
#证书
5837690_www.cfanzp.com.pem
#证书秘钥
5837690_www.cfanzp.com.key
```

## 将证书秘钥放到配置目录
```
#证书位置
etc/nginx/cert/5837690_www.cfanzp.com.pem
#证书秘钥位置
/etc/nginx/cert/5837690_www.cfanzp.com.key
```

- nginx.conf demo:
```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
        keepalive_timeout  65;

    #gzip  on;

    # HTTPS server
    #

    server {
        listen 443 ssl; #监听的端口
        server_name localhost;
        #开启ssl验证
        #ssl on;
        root html;
        index index.html index.htm;
        #证书位置
        ssl_certificate   /etc/nginx/cert/5837690_www.cfanzp.com.pem;
        #证书秘钥位置
        ssl_certificate_key  /etc/nginx/cert/5837690_www.cfanzp.com.key;
        #ssl会话超时时间
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        #根据项目名称代理跳转具体的项目
        location / {
            #代理跳转地址
            proxy_pass http://127.0.0.1:9000;
            #设置代理的host信息（websocket时因为后面少加了端口，导致wss一直连不上，花了很长时间）
            proxy_set_header Host $host:$server_port;
            proxy_http_version 1.1;
            #设置可以代理websocket
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header X-real-ip $remote_addr;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
    }
}
```


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/nginx-https/  

