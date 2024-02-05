# 常见的路由命令


<!--more-->
# 常见的路由命令
## ip route
### 查看路由信息
```bash
ip route show
#或
ip r show
```

### 查路由表
```bash
ip route show table 100
```

### 添加一条路默认路由
- 如果机器缺少默认路由，就无法上网，添加一条路由就可以解决。
- 其中 192.168.1.1为网关地址
```bash
ip route add default via 192.168.1.1 dev eth0
#或
ip r add default via 192.168.1.1 dev eth0
#在1号表中添加默认路由
ip route add default via 192.168.1.1 table 1
```

### 删除一条路默认路由
```bash
ip route del default via 192.168.1.1 dev eth0
#或
ip r del default via 192.168.1.1 dev eth0
```
## ip rule
- 使用ip rule来修改路由策略数据库
### 设置路由策略，被打标记1的数据使用table 100路由表
```bash
ip rule add fwmark 1 lookup 100
```

## 实验
### 公司内网192.168.0.100以内的ip使用10.0.1网管上（电信），其它ip使用20.0.0.1（移动）上网
- 在网管服务器上添加一个默认路由
```bash
ip route add default gw 20.0.0.1
```
- 添加3号路由表
```bash
# eth0 是10.0.0.1所在的网卡
ip route add table 3 via 10.0.0.1 dev eth1
```
- 添加ip rule规则
```bash
ip rule add fwmark 3 table 3
```

- 给相应的数据包打标记
```bash
iptables -A PREROUTING -t mangle -i eth0 -s 192.168.0.1 - 192.168.0.100 -j MARK  --set-mark 3
```


## 参考
- https://www.cnblogs.com/sudochen/p/15992994.html


---

> 作者:   
> URL: https://cfanzp.com/ip-route/  

