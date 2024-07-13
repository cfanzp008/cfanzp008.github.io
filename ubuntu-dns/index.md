# ubuntu dns


<!--more-->
# ubuntu dns服务
在使用ubuntu做防火墙服务的时候，之前经常遇到域名无法解析的问题，原因有很多种情况，其中一种主要的原因时dns服务配置的问题
## systemd-resolved
systemd-resolved是ubuntu自带的dns管理工具
- /etc/resolv.conf例子
```bash
root@ubuntu:~# cat /etc/resolv.conf 
# This file is managed by man:systemd-resolved(8). Do not edit.#
# This is a dynamic resolv.conf file for connecting local clients to the
# internal DNS stub resolver of systemd-resolved. This file lists all# configured search domains.#
# Run "resolvectl status" to see details about the uplink DNS servers
# currently in use.
#
# Third party programs must not access this file directly, but only through the
# symlink at /etc/resolv.conf. To manage man:resolv.conf(5) in a different way,
# replace this symlink by a static file or a different symlink.
#
# See man:systemd-resolved.service(8) for details about the supported modes of
# operation for /etc/resolv.conf.

nameserver 127.0.0.53
options edns0 trust-ad
```

- systemd-resolved的基本操作
```bash
## 配置文件/etc/resolv.conf

## 查看后台是否有systemd-resolved进程
root@ubuntu:~# ps -ef | grep systemd-resolved
systemd+   98859       1  0 19:37 ?        00:00:00 /lib/systemd/systemd-resolved
root      100365  100240  0 20:27 pts/2    00:00:00 grep --color=auto systemd-resolved
## 查看53端口占用情况
root@VM-8-10-ubuntu:/opt/blog# lsof -i:53
COMMAND   PID            USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
systemd-r 627 systemd-resolve   12u  IPv4  20393      0t0  UDP localhost:domain 
systemd-r 627 systemd-resolve   13u  IPv4  20394      0t0  TCP localhost:domain (LISTEN)
```

- 抓包53端口查看dns请求情况
```bash
# ping www.sina.com
ping www.sina.com

# tpcdump抓包
tcpdump port 53
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
20:35:37.696150 IP VM-8-10-ubuntu.46341 > 183.60.83.19.domain: 50880+ A? www.sina.com. (30)
20:35:37.696286 IP VM-8-10-ubuntu.48920 > 183.60.83.19.domain: 4393+ AAAA? www.sina.com. (30)
20:35:37.696425 IP 183.60.83.19.domain > VM-8-10-ubuntu.46341: 50880 10/0/0 CNAME spool.grid.sinaedge.com., CNAME ww1.sinaimg.cn.w.alikunlun.com., A 59.36.226.220, A 59.36.226.221, A 59.36.226.226, A 59.36.226.223, A 59.36.226.224, A 59.36.226.225, A 59.36.226.222, A 59.36.226.219 (233)
20:35:37.705390 IP 183.60.83.19.domain > VM-8-10-ubuntu.48920: 4393 4/0/0 CNAME spool.grid.sinaedge.com., CNAME ww1.sinaimg.cn.w.alikunlun.com., AAAA 240e:97d:4:903:3::3f0, AAAA 240e:97d:4:903:3::3f1 (161)
20:35:37.708566 IP VM-8-10-ubuntu.46842 > 183.60.83.19.domain: 13311+ PTR? 19.83.60.183.in-addr.arpa. (43)
20:35:37.709004 IP 183.60.83.19.domain > VM-8-10-ubuntu.46842: 13311 NXDomain 0/1/0 (107)
20:35:37.709320 IP VM-8-10-ubuntu.53217 > 183.60.83.19.domain: 44943+ PTR? 10.8.0.10.in-addr.arpa. (40)
20:35:37.711136 IP VM-8-10-ubuntu.33533 > 183.60.83.19.domain: 23364+ PTR? 219.226.36.59.in-addr.arpa. (44)
20:35:37.714576 IP 183.60.83.19.domain > VM-8-10-ubuntu.53217: 44943 NXDomain* 0/1/0 (99)
20:35:37.721224 IP 183.60.83.19.domain > VM-8-10-ubuntu.33533: 23364 1/0/0 PTR 219.226.36.59.broad.jm.gd.dynamic.163data.com.cn. (106)
```

## dnsmasq
```bash
# install
apt install dnsmasq
sudo systemctl stop systemd-resolved
sudo systemctl start dnsmasq

# 修改相关配置/etc/resolv.conf
nameserver 127.0.0.1

# 查看相关进程
root@VM-8-10-ubuntu:/etc/dnsmasq.d# lsof -i:53 -n -P
COMMAND     PID    USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
dnsmasq 1280955 dnsmasq    4u  IPv4 21540105      0t0  UDP *:53 
dnsmasq 1280955 dnsmasq    5u  IPv4 21540106      0t0  TCP *:53 (LISTEN)
dnsmasq 1280955 dnsmasq    6u  IPv6 21540107      0t0  UDP *:53 
dnsmasq 1280955 dnsmasq    7u  IPv6 21540108      0t0  TCP *:53 (LISTEN)
# lsof -n:不解析主机名，-P:不解析端口
```

## 相关命令
- lsof
```bash
- 查看53端口的进程
lsof -i:53
lsof -i:53 -n -P
```
- tcpdump
```bash
tcpdump port 53
```


---

> 作者:   
> URL: https://cfanzp.com/ubuntu-dns/  

