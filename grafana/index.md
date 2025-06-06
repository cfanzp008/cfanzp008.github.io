# Grafana


<!--more-->
# grafana
## 简介
grafana是监控的一个前端展示工具可以通过docker来部署

## grafana的展示模板
通过导入模板的json或输入模板的ID就可以导入模板，但是输入ID的方式有时候会不成功。
- windows_exporter的模板推荐下面这个
  - [windows_exporter for Prometheus Dashboard CN v20201012](https://grafana.com/grafana/dashboards/10467-1-windows-exporter-for-prometheus-dashboard-cn-v20201012/)


## docker 启动
### 使用docker-compose
- 首次登录地址: http://127.0.0.1:3000/,帐号密码admin,admin
```
[root@dev127 cig]# cat docker-compose.yml
version: '3.1'
volumes:
  grafana_data: {}
 
services:
 influxdb:
  image: tutum/influxdb:0.9
  restart: always
  environment:
    - PRE_CREATE_DB=cadvisor
  ports:
    - "8083:8083"
    - "8086:8086"
  volumes:
    - /data/influxdb:/data

 cadvisor:
  image: google/cadvisor
  restart: always
  ports:
    - "8082:8080"
  volumes:
    - /:/rootfs:ro
    - /var/run:/var/run:rw
    - /sys:/sys:ro
    - /var/lib/docker/:/var/lib/docker:ro
 
 grafana:
  user: "104"
  image: grafana/grafana
  user: "104"
  restart: always
  links:
    - influxdb:influxsrv
  ports:
    - "3000:3000"
  volumes:
    - grafana_data:/var/lib/grafana
  environment:
    - HTTP_USER=admin
    - HTTP_PASS=admin
    - INFLUXDB_HOST=influxsrv
    - INFLUXDB_PORT=8086
    - INFLUXDB_NAME=cadvisor
    - INFLUXDB_USER=root
    - INFLUXDB_PASS=root
```

### 直接通过命令来启动
```
#!/bin/bash
basedir=$(cd `dirname $0`;pwd)

docker stop grafana
docker rm grafana
docker run \ 
       -d --name grafana  -p 3000:3000 \ 
       -e "GF_SERVER_ROOT_URL=http://grafana.server.name" \
       -e "GF_SECURITY_ADMIN_PASSWORD=123456" \
       grafana/grafana grafana
```


---

> 作者:   
> URL: http://111.230.8.71:8889/grafana/  

