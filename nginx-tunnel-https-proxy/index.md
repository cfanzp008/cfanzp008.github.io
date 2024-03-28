# nginx隧道模式使用SNI进行流量分流


<!--more-->
# nginx隧道模式使用SNI进行流量分流
## 通过SNI实现代理
- nginx配置
```nginx
stream {
    #resolver 114.114.114.114;
    server {
        listen 443;
        ssl_preread on;
        proxy_connect_timeout 5s;
        proxy_pass $ssl_preread_server_name:$server_port;
    }
}

```

## 通过SNI实现分流
- nginx配置
```nginx
map $ssl_preread_server_name $sni_port {
    default                  $server_port;
    backend.example.com      8130;
 }

map $ssl_preread_server_name $sni_server {
    default                  $$ssl_preread_server_name;
    backend.example.com      127.0.0.1;
 }



 upstream backend {
     server 127.0.0.1:3129;
 }

 upstream backend2 {
     server 192.168.0.1:12345;
 }

stream {
    #resolver 114.114.114.114;
    server {
        listen 443;
        ssl_preread on;
        proxy_connect_timeout 5s;
        #proxy_pass $ssl_preread_server_name:$server_port;
        proxy_pass $sni_server:$sni_port;
    }
}

```

## 参考
- https://zhuanlan.zhihu.com/p/70459013


---

> 作者:   
> URL: https://cfanzp.com/nginx-tunnel-https-proxy/  

