# nginx web负载均衡配置

# nginx web负载均衡配置

## 下载nginx
- http://nginx.org/en/download.html
```bash
wget http://nginx.org/download/nginx-1.20.2.tar.gz
```

## 安装nginx
- 参考: https://www.cnblogs.com/-wei/p/15219624.html
```bash
./configure --prefix=/opt/nginx
或
./configure --prefix=/opt/nginx --with-http_ssl_module
make
make install
```

## 报错
- ./configure: error: the HTTP rewrite module requires the PCRE library
```bash
yum -y install pcre-devel
```

- ./configure: error: the HTTP gzip module requires the zlib library.
```bash
yum -y install zlib-devel
```

- ./configure: error: SSL modules require the OpenSSL library.
```bash
yum -y install openssl openssl-devel
```

## nginx限制请求数据包大小
```
client_max_body_size 1000m;
```

## 负载均衡配置
- 参考: https://www.cnblogs.com/telwanggs/p/14977290.html
```
upstream test_group {
# If there is no specific strategy, round-robin
#     would be the default strategy.
# least_conn;
# ip_hash;
    server 172.16.217.109:8501 weight=1 max_fails=2 fail_timeout=30s;
    server 172.16.217.109:8502 weight=1 max_fails=2 fail_timeout=30s;
}

location / {
#root   html;
#index  index.html index.htm;
    client_max_body_size 3m;
    proxy_pass http://test_group;
}
```

## nginx负载均衡策略
- 轮询：将客户端发起的请求，平均分配给每一台服务器
- 权重：将客户的的请求，根据服务器的权重值不同，分配不同的数量
- ip_hash：基于发起请求的客户端的ip地址不同，他始终会将请求发送到指定的服务器上，客户端ip地址不变，就会一直发送到一个服务器上。

### 轮询
```
upstream my_server{
    server IP:8080;
    server IP:8081;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://my_server/;   #Tomcat首页
    }
}
```

### 权重
```
upstream my_server{
    server IP:8080 weight=10;
    server IP:8081 weight=2;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://my_server/;   #Tomcat首页
    }
}
```


### ip_hash
```
upstream my_server{
    ip_hash;
    server IP:8080 weight=10;
    server IP:8081 weight=2;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://my_server/;
    }
}
```


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/nginx-web-balance/  

