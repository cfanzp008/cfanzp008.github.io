# iptables SNAT的用法


<!--more-->
# iptables SNAT的用法
## 什么是SNAT?
1. SNAT,源网络地址转换，Source Network Address Translation。

## iptables设置SNAT
1. demo 将从192.168.1.0/24网断的请求的源地址转换为10.168.26.155
```bash
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.1.0/24 -j SNAT --to-source 10.168.26.155
```


## 参考
- https://cloud.tencent.com/developer/article/2289797


---

> 作者:   
> URL: https://cfanzp.com/iptables-snat/  

