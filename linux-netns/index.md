# linux network namespace用法


<!--more-->
# linux network namespace用法
## linux namespace简介
Linux namespace提供了一种内核级别的隔离系统资源的方法。通过将系统的全局资源放到不同的namespace中，来实现资源隔离的目的。
- 目前linux提供了六类资源隔离机制分别是:
  - Mount 隔离文件系统挂载点
  - UTS 隔离主机名和域名信息
  - IPC 隔离进程间通信
  - PID 隔离进程ID
  - Network 隔离网络资源
  - User 隔离用户和用户组的ID

## linux network namespace用法
- 常用命令
```bash
#添加新的namespace ns_100
ip netns add ns_100
#查看当前的namespace
ip netns list
ip link add veth0 type veth peer name veth1
```

- demo
```bash
root@VM-8-10-ubuntu:/opt/linux_note# ip netns list
root@VM-8-10-ubuntu:/opt/linux_note# ip netns add ns_100
root@VM-8-10-ubuntu:/opt/linux_note# ip netns list
ns_100
root@VM-8-10-ubuntu:/opt/linux_note# ip link add veth0 type veth peer name veth1
root@VM-8-10-ubuntu:/opt/linux_note# ip link list
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 52:54:00:eb:30:e7 brd ff:ff:ff:ff:ff:ff
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default
    link/ether 02:42:d6:51:ba:52 brd ff:ff:ff:ff:ff:ff
4: veth1@veth0: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether a6:20:b1:58:9e:5a brd ff:ff:ff:ff:ff:ff
5: veth0@veth1: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether f6:30:bc:89:e2:8c brd ff:ff:ff:ff:ff:ff
```

- 修改veth1配置后
```bash
root@VM-8-10-ubuntu:/opt/linux_note# ip link set veth1 netns ns_100
root@VM-8-10-ubuntu:/opt/linux_note# ip link list
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 52:54:00:eb:30:e7 brd ff:ff:ff:ff:ff:ff
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default
    link/ether 02:42:d6:51:ba:52 brd ff:ff:ff:ff:ff:ff
5: veth0@if4: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether f6:30:bc:89:e2:8c brd ff:ff:ff:ff:ff:ff link-netns ns_100
```

- 查看ns_100内部配置
```bash
root@VM-8-10-ubuntu:/opt/linux_note# ip netns exec ns_100 ip link list
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
4: veth1@if5: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether a6:20:b1:58:9e:5a brd ff:ff:ff:ff:ff:ff link-netnsid 0
```

### 配置network namespace接口
- 设置接口veth1的ip
```
ip netns exec ns_100 ip addr add 10.0.1.1/16 dev veth1
```

- 启用veth1
```
ip netns exec ns_100 ip link set dev veth1 up
```

- 查看结果
```bash
root@VM-8-10-ubuntu:/opt/linux_note# ip netns exec ns_100 ip addr add 10.0.1.1/16 dev veth1
root@VM-8-10-ubuntu:/opt/linux_note# ip netns exec ns_100 ip link set dev veth1 up
root@VM-8-10-ubuntu:/opt/linux_note# ip netns exec ns_100 ip addr list
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
4: veth1@if5: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state LOWERLAYERDOWN group default qlen 1000
    link/ether a6:20:b1:58:9e:5a brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 10.0.1.1/16 scope global veth1
       valid_lft forever preferred_lft forever
root@VM-8-10-ubuntu:/opt/linux_note# ip route list
default via 10.0.8.1 dev eth0 proto dhcp src 10.0.8.10 metric 100
10.0.8.0/22 dev eth0 proto kernel scope link src 10.0.8.10
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
```

### veth0设置ip
```bash
root@VM-8-10-ubuntu:/opt/linux_note# ip addr add 10.0.1.2/16 dev veth0
root@VM-8-10-ubuntu:/opt/linux_note# ip addr list
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 52:54:00:eb:30:e7 brd ff:ff:ff:ff:ff:ff
    inet 10.0.8.10/22 brd 10.0.11.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::5054:ff:feeb:30e7/64 scope link
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default
    link/ether 02:42:d6:51:ba:52 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
5: veth0@if4: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether f6:30:bc:89:e2:8c brd ff:ff:ff:ff:ff:ff link-netns ns_100
    inet 10.0.1.2/16 scope global veth0
       valid_lft forever preferred_lft forever
root@VM-8-10-ubuntu:/opt/linux_note# ip route list
default via 10.0.8.1 dev eth0 proto dhcp src 10.0.8.10 metric 100
10.0.8.0/22 dev eth0 proto kernel scope link src 10.0.8.10
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown

```
### 启动veth0
```bash
root@VM-8-10-ubuntu:/opt/linux_note# ip link set dev veth0 up
root@VM-8-10-ubuntu:/opt/linux_note# ip addr list
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 52:54:00:eb:30:e7 brd ff:ff:ff:ff:ff:ff
    inet 10.0.8.10/22 brd 10.0.11.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::5054:ff:feeb:30e7/64 scope link
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default
    link/ether 02:42:d6:51:ba:52 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
5: veth0@if4: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether f6:30:bc:89:e2:8c brd ff:ff:ff:ff:ff:ff link-netns ns_100
    inet 10.0.1.2/16 scope global veth0
       valid_lft forever preferred_lft forever
    inet6 fe80::f430:bcff:fe89:e28c/64 scope link
       valid_lft forever preferred_lft forever
``````
### veth0与veth1互ping
```bash
root@VM-8-10-ubuntu:/opt/linux_note# ping 10.0.1.1
PING 10.0.1.1 (10.0.1.1) 56(84) bytes of data.
64 bytes from 10.0.1.1: icmp_seq=1 ttl=64 time=0.054 ms
64 bytes from 10.0.1.1: icmp_seq=2 ttl=64 time=0.041 ms
64 bytes from 10.0.1.1: icmp_seq=3 ttl=64 time=0.040 ms
^C
--- 10.0.1.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2039ms
rtt min/avg/max/mdev = 0.040/0.045/0.054/0.006 ms
root@VM-8-10-ubuntu:/opt/linux_note# ip netns exec ns_100 ping 10.0.1.2
PING 10.0.1.2 (10.0.1.2) 56(84) bytes of data.
64 bytes from 10.0.1.2: icmp_seq=1 ttl=64 time=0.039 ms
64 bytes from 10.0.1.2: icmp_seq=2 ttl=64 time=0.043 ms
^C
--- 10.0.1.2 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1007ms
rtt min/avg/max/mdev = 0.039/0.041/0.043/0.002 ms
```


---

> 作者:   
> URL: https://cfanzp.com/linux-netns/  

