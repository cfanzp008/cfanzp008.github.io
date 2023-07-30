# 常见的路由命令


<!--more-->
# 常见的路由命令
## ubuntu20.04
### 查看路由信息
```
ip route show
```
### 添加一条路默认路由
- 如果机器缺少默认路由，就无法上网，添加一条路由就可以解决。
- 其中 192.168.1.1为网关地址
```
ip route add default via 192.168.1.1
```


---

> 作者:   
> URL: https://cfanzp.com/ip-route/  

