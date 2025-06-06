# IPV4数据包


<!--more-->
# IPV4数据包
## IPV4包格式

```bash
|以太网头部｜IP头部｜TCP头部｜用户数据｜以太网尾部｜


| Version | Header Length | Type of Service | Total Length    |
| Identification          | Flags           | Fragment Offset |
| TTL                     | Protocol        | Header Checksum |
| Source IP Address(4byte)                                    |
| Destination IP Address(4byte)                               |
| Options                                   | Padding         |
```

### Version
```bash
v4
v6
```

### Header Length
```bash
20-60
```

### TTL
- TTL: Time To Live,生存周期，每经过一个路由器减1
```bash
0-255
```

### Protocol
```bash
1:ICMP
6:TCP(TELNET)
17:UDP
```


---

> 作者:   
> URL: http://111.230.8.71:8889/ipv4-package/  

