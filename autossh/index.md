# autossh


<!--more-->
# autossh
## autossh安装
- 安装方法
```bash
apt install autossh
```

## ssh反向隧道脚本
```bash
root@aaa:/opt/ssh_manager# cat autossh.sh
#!/bin/bash
autossh -M 7000 \
        -o "ServerAliveInterval 60" \
        -o "ServerAliveCountMax 3" \
        -N -R 8000:127.0.0.1:22 \
        root@internet-ip -p 22 \
        -i /root/.ssh/id_rsa
```
- 远程连接
```bash
ssh root@internet-ip -p 8000

```

## 配置开机自启动
```bash
# Ubuntu
# 配置文件地址
# /etc/systemd/system/remote-autossh.service
[Unit]
Description=AutoSSH service for remote tunnel
After=network-online.target

[Service]
User=root
ExecStart=/opt/autossh.sh

[Install]
WantedBy=multi-user.target
```

## 启动服务
```bash
systemctl daemon-reload
systemctl enable remote-autossh
systemctl start remote-autossh

```

## 查看服务状态
```bash
root@test:/opt/ssh_manager# systemctl status remote-autossh
● remote-autossh.service - AutoSSH service for remote tunnel
     Loaded: loaded (/etc/systemd/system/remote-autossh.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2025-01-04 14:38:52 CST; 1min 0s ago
   Main PID: 23567 (autossh.sh)
      Tasks: 3 (limit: 2225)
     Memory: 720.0K
     CGroup: /system.slice/remote-autossh.service
             ├─23567 /bin/bash /opt/ssh_manager/autossh.sh
             ├─23568 /usr/lib/autossh/autossh -M 7000 -o ServerAliveInterval 60 -o ServerAliveCountMax 3 -N -R 8000:127.0.0.1:22 root@192.168.3.71 -p 22 -i /root/.ssh/id_rsa
             └─23571 /usr/bin/ssh -L 7000:127.0.0.1:7000 -R 7000:127.0.0.1:7778 -o ServerAliveInterval 60 -o ServerAliveCountMax 3 -N -R 8000:127.0.0.1:22 -p 22 -i /root/.ssh/id_rsa root@192.168.3.71

Jan 04 14:38:52 test systemd[1]: Started AutoSSH service for remote tunnel.
Jan 04 14:38:52 test autossh[23568]: starting ssh (count 1)
Jan 04 14:38:52 test autossh[23568]: ssh child pid is 23571
```


---

> 作者:   
> URL: http://111.230.8.71:8889/autossh/  

