# [linux命令]lsof


<!--more-->
# [linux命令]lsof
lsof命令是否强大，最近使用这个工具排查出了一个测试阶段发现的bug.
## lsof基础用法
```bash
#查看端口暂用
#查看53端口进程
lsof -i:53
root@VM-8-10-ubuntu:/opt/blog# lsof -i:53
COMMAND     PID    USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
dnsmasq 1280955 dnsmasq    4u  IPv4 21540105      0t0  UDP *:domain 
dnsmasq 1280955 dnsmasq    5u  IPv4 21540106      0t0  TCP *:domain (LISTEN)
dnsmasq 1280955 dnsmasq    6u  IPv6 21540107      0t0  UDP *:domain 
dnsmasq 1280955 dnsmasq    7u  IPv6 21540108      0t0  TCP *:domain (LISTEN)
```

- 加-n参数显示ip,加-P参数显示端口
```bash
root@VM-8-10-ubuntu:/opt/blog# lsof -i:53 -n -P
COMMAND       PID            USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
systemd-r 1306796 systemd-resolve   12u  IPv4 21868306      0t0  UDP 127.0.0.53:53 
systemd-r 1306796 systemd-resolve   13u  IPv4 21868307      0t0  TCP 127.0.0.53:53 (LISTEN)
```
- -p :列出指定pid的文件
```bash
root@ubuntu:/opt/cybershield/agent# ps -ef | grep mysqld
mysql       1157       1  6 Jul11 ?        05:32:37 /usr/sbin/mysqld
root      118830  112405  0 18:17 pts/1    00:00:00 grep --color=auto mysqld

root@ubuntu:/opt/cybershield/agent# lsof -p 1157 | wc -l
72
```

- -u:列出指定用户打开的文件
```bash
lsof -u root
```

- -c:列出指定进程打开的文件
```bash
lsof -c nvim
```
- -d :查看目录被打开情况
```bash
lsof -d /opt
```
- +D :查看目录被占用情况
```bash
lsof +D /tmp
root@VM-8-10-ubuntu:/tmp# lsof +D /opt/blog
COMMAND     PID USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
bash    1295496 root  cwd    DIR  252,2     4096 652942 /tmp
bash    1296856 root  cwd    DIR  252,2     4096 652942 /tmp
bash    1296873 root  cwd    DIR  252,2     4096 652942 /tmp
nvim    1296903 root  cwd    DIR  252,2     4096 652942 /tmp

```


---

> 作者:   
> URL: https://cfanzp.com/linux-cmd-lsof/  

