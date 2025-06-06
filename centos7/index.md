# centos7基础用法


<!--more-->
# centos7基础用法

## 基础软件安装
```bash
sudo yum install lsof -y
sudo yum install net-tools -y
sudo yum install openssl-server -y
```

## ssh允许密码登录
```bash
# /etc/ssh/sshd_config
PasswordAuthentication Yes
```

## 网络配置
- 修改网络配置，改dhcp为static
```bash
[root@localhost ~]# cat /etc/sysconfig/network-scripts/ifcfg-enp0s3 
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
#BOOTPROTO=dhcp
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s3
UUID=2fe53786-7f72-4dd6-a3db-e8a48bf73562
DEVICE=enp0s3
#ONBOOT=no
ONBOOT=yes

IPADDR=192.168.2.210
GATEWAY=192.168.2.1
DNS1=192.168.2.1
DNS2=233.5.5.5
```

- 重启网络服务
```bash
systemctl restart NetworkManager
```


---

> 作者:   
> URL: http://111.230.8.71:8889/centos7/  

