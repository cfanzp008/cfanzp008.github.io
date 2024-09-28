# Filebeat入门


<!--more-->
# Filebeat入门
之前有项目已经用过filebeat了,最近想记录一下filebeat的基本用法。
## Filebeat的功能和作用有哪些？
1. 日志文件收集
2. 日志转发
3. 内置处理功能
4. 模块化支持。
   支持常用的日志格式：Nginx,MySQL, Apache等

## Filebeat的特点
1. 轻量级，占用系统资源少，高效。

## Filebeat安装
- 安装包下载地址：https://www.elastic.co/cn/downloads/beats/filebeat
```bash
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.15.0-linux-x86_64.tar.gz
```

## Filebeat如何配置？
Filebeat的配置主要分为以下几个部分：
1. 输入部分
2. 输出部分
3. Processsors处理器
4. Logging(日志配置)
5. 模块
6. Setup(设置)

### Filebeat配置文件demo
```yml
filebeat.inputs:
  - type: log
    paths:
      - /var/log/*.log

filebeat.modules:
  - module: nginx
    access:
      enabled: true
      var.paths: ["/var/log/nginx/access.log"]
    error:
      enabled: true
      var.paths: ["/var/log/nginx/error.log"]

output.elasticsearch:
  hosts: ["localhost:920
```

## Filebeat安装测试
```bash
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.15.0-linux-x86_64.tar.gz
tar -xzvf filebeat-8.15.0-linux-x86_64.tar.gz
mv filebeat-8.15.0-linux-x86_64 /usr/local/filebeat
```

### 服务文件
```bash
[Unit]
Description=Filebeat sends logs to Logstash or directly to Elasticsearch
Documentation=https://www.elastic.co/guide/en/beats/filebeat/current/index.html
After=network-online.target
Wants=network-online.target

[Service]
User=filebeat
Group=filebeat
ExecStart=/usr/bin/filebeat/bin/filebeat -c /etc/filebeat/filebeat.yml -d "publish"
Restart=always
RestartSec=10
LimitMEMLOCK=infinity

[Install]
WantedBy=multi-user.target
```

## 安装服务
```bash
sudo cp filebeat.systemd /etc/systemd/system/filebeat.service
sudo systemctl daemon-reload
sudo systemctl enable filebeat
```

## 注意事项
1. `/etc/systemd/system`目录中的服务优先比`/lib/systemd/system`目录中的服务优先级高。
2. 一般自己创建的服务放在/etc/systemd/system目录中。


---

> 作者:   
> URL: https://cfanzp.com/filebeat/  

