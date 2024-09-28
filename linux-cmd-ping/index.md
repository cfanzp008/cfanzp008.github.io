# linux ping命令的用法


<!--more-->
# linux ping命令的用法
linux ping命令虽然简单，但是平日里用得多的是直接ping，其实还有很多其它的用法，这里简单记录一下。
## 查看帮助
```bash
root@VM-8-10-ubuntu:/# ping -h

Usage
  ping [options] <destination>

Options:
  <destination>      dns name or ip address
  -a                 use audible ping
  -A                 use adaptive ping
  -B                 sticky source address
  -c <count>         stop after <count> replies
  -D                 print timestamps
  -d                 use SO_DEBUG socket option
  -f                 flood ping
  -h                 print help and exit
  -I <interface>     either interface name or address
  -i <interval>      seconds between sending each packet
  -L                 suppress loopback of multicast packets
  -l <preload>       send <preload> number of packages while waiting replies
  -m <mark>          tag the packets going out
  -M <pmtud opt>     define mtu discovery, can be one of <do|dont|want>
  -n                 no dns name resolution
  -O                 report outstanding replies
  -p <pattern>       contents of padding byte
  -q                 quiet output
  -Q <tclass>        use quality of service <tclass> bits
  -s <size>          use <size> as number of data bytes to be sent
  -S <size>          use <size> as SO_SNDBUF socket option value
  -t <ttl>           define time to live
  -U                 print user-to-user latency
  -v                 verbose output
  -V                 print version and exit
  -w <deadline>      reply wait <deadline> in seconds
  -W <timeout>       time to wait for response

IPv4 options:
  -4                 use IPv4
  -b                 allow pinging broadcast
  -R                 record route
  -T <timestamp>     define timestamp, can be one of <tsonly|tsandaddr|tsprespec>

IPv6 options:
  -6                 use IPv6
  -F <flowlabel>     define flow label, default is random
  -N <nodeinfo opt>  use icmp6 node info query, try <help> as argument

For more details see ping(8).
```

## 检查某个域名是否能够ping通
```bash
root@VM-8-10-ubuntu:~# ping www.baidu.com
PING www.a.shifen.com (183.2.172.185) 56(84) bytes of data.
64 bytes from 183.2.172.185 (183.2.172.185): icmp_seq=1 ttl=52 time=2.73 ms
64 bytes from 183.2.172.185 (183.2.172.185): icmp_seq=2 ttl=52 time=2.72 ms
64 bytes from 183.2.172.185 (183.2.172.185): icmp_seq=3 ttl=52 time=2.75 ms
^C
--- www.a.shifen.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2004ms
rtt min/avg/max/mdev = 2.724/2.733/2.751/0.012 ms
```

## 收到2个ping包后结束
```bash
root@VM-8-10-ubuntu:/# ping -c 2 www.baidu.com
PING www.a.shifen.com (183.2.172.42) 56(84) bytes of data.
64 bytes from 183.2.172.42 (183.2.172.42): icmp_seq=1 ttl=52 time=3.26 ms
64 bytes from 183.2.172.42 (183.2.172.42): icmp_seq=2 ttl=52 time=3.28 ms

--- www.a.shifen.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms
rtt min/avg/max/mdev = 3.264/3.269/3.275/0.005 ms
```

## 每间隔3s发送一个大小为1001的数据包,ttl为200
```bash
root@VM-8-10-ubuntu:~# ping -i 3 -s 1001 -t 200 www.baidu.com
PING www.a.shifen.com (157.148.69.74) 1001(1029) bytes of data.
1009 bytes from 157.148.69.74 (157.148.69.74): icmp_seq=1 ttl=52 time=3.15 ms
1009 bytes from 157.148.69.74 (157.148.69.74): icmp_seq=2 ttl=52 time=3.15 ms
1009 bytes from 157.148.69.74 (157.148.69.74): icmp_seq=3 ttl=52 time=3.15 ms
1009 bytes from 157.148.69.74 (157.148.69.74): icmp_seq=4 ttl=52 time=3.16 ms
1009 bytes from 157.148.69.74 (157.148.69.74): icmp_seq=5 ttl=52 time=3.16 ms
^C
--- www.a.shifen.com ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 12012ms
rtt min/avg/max/mdev = 3.149/3.152/3.157/0.003 ms
```

## ping的复杂使用场景
- 后续补充。。。



---

> 作者:   
> URL: https://cfanzp.com/linux-cmd-ping/  

