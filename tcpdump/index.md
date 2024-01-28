# tcpdump的基础用法


<!--more-->
# tcpdump的基础用法
## tcpdump简介
- tcpdump是一个抓包的命令工具，个人感觉还是十分好用的，能够分析目前的数据包情况。

## tcpdump用法举例
### 将抓包结果保存到demo.cap
```bash
tcpdump -i any -w ~/demo.cap
```

### 选择网卡抓包
- 抓所有网卡的包
```bash
tcpdump -i any -w ~/demo.cap
```
- 抓lo网卡的包
```bash
tcpdump -i lo -w ~/demo.cap
```

- 抓lo网卡的端口为8080的包
```bash
tcpdump -i lo port 8080 -w ~/demo.cap
```


- 抓lo网卡的源端口为8080目的端口为8081的包
```bash
tcpdump -i lo src port 8080 and dst port 8081 -w ~/demo.cap
```

- 抓10个包后退出
```bash
tcpdump -c 10 -q
```

- 抓ip为192.168.1.33的包
```bash
tcpdump host 192.168.1.33
```

- 抓源ip为192.168.1.33的包
```bash
tcpdump src host 192.168.1.33
```

- 抓目的ip为192.168.1.33的包
```bash
tcpdump dst host 192.168.1.33
```


- 抓tcp的包
```bash
tcpdump tcp dst host 192.168.1.33
```

- 抓udp的包
```bash
tcpdump udp dst host 192.168.1.33
```

- 抓除了192.168.1.33以外的包
```bash
tcpdump tcp and ! 192.168.1.33
```

- 组合抓包
```
tcpdump tcp -i ens18 -v -nn -t -A -s 0 -c 50 and dst port ! 22 and src net 192.168.1.0/24 -w ./cby.cap

(1)tcp: ip icmp arp rarp 和 tcp、udp、icmp这些选项等都要放到第一个参数的位置，用来过滤数据报的类型
(2)-i eth1 : 只抓经过接口eth1的包
(3)-t : 不显示时间戳
(4)-s 0 : 抓取数据包时默认抓取长度为68字节。加上-S 0 后可以抓到完整的数据包
(5)-c 50 : 只抓取50个数据包
(6)dst port ! 22 : 不抓取目标端口是22的数据包
(7)src net 192.168.1.0/24 : 数据包的源网络地址为192.168.1.0/24
(8)-w ./cby.cap : 保存成cap文件，方便用ethereal(即wireshark)分析
(9)-v 使用 -v，-vv 和 -vvv 来显示更多的详细信息，通常会显示更多与特定协议相关的信息。
(10)-nn 单个 n 表示不解析域名，直接显示 IP；两个 n 表示不解析域名和端口。
(11)-A 表示使用 ASCII 字符串打印报文的全部数据
```

## 参考
- https://cloud.tencent.com/developer/article/1934416


---

> 作者:   
> URL: https://cfanzp.com/tcpdump/  

