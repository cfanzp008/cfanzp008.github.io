# iptables SNAT的用法


<!--more-->
# iptables SNAT的用法
## 什么是SNAT?
1. SNAT,源网络地址转换，Source Network Address Translation。

## iptables设置SNAT
1. 下面的例子将从192.168.1.0/24网段的请求的源地址转换为10.168.26.155
```bash
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.1.0/24 -j SNAT --to-source 10.168.26.155
```

## MASQUERADE
- MASQUERADE 是SNAT的一个特例,不用设置--to-source
```bash
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.1.0/24 -j MASQUERADE
#对比MASQUERADE
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.1.0/24 -j SNAT --to-source 10.168.26.155
#对比DNAT
iptables -t nat -A PREROUTING -i eth0 - p tcp -dport 1194 -j DNAT --to-destination 192.168.1.5
```


## 参考
- https://cloud.tencent.com/developer/article/2289797


---

> 作者:   
> URL: https://cfanzp.com/iptables-snat/  

