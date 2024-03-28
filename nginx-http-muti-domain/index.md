# http一个端口如何配置多个域名？


<!--more-->
# http一个端口如何配置多个域名？
```
server {
    listen 80;
    server_name test2.hbusy.com www.test2.hbusy.com;

    location / {
        proxy_pass http://$host;
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size 2000m;

        proxy_connect_timeout 3600;
        proxy_send_timeout 3600;
        proxy_read_timeout 3600;
    }
}
```


---

> 作者:   
> URL: https://cfanzp.com/nginx-http-muti-domain/  

