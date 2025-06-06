# nginx正向代理


<!--more-->
# nginx正向代理透传IP实验
## 实验目的
- 验证nginx正向代理能够透传IP

## 实验准备
- nginx: 1.24.0 官网下载
- nginx正向代理插件ngx_http_proxy_connect_module: https://github.com/chobits/ngx_http_proxy_connect_module

## 实验场景
- nginx 通过代理插件进行正向代理，通过proxy_connect_bind实现代理ip透传。

## 实验流程
- https流量通过A转发到B。
- A：负责对https代理进行解密。揭秘后通过http隧道将https流量转发到B服务上。
- B：负责对https流量进行解密，并进行流量的安全检查，后续再转发给目标服务器C。
```
{{< mermaid >}}
graph LR
  https流量-->A:192.168.1.33:8080
  A:192.168.1.33:8080-->B:192.168.1.33:8081
  B:192.168.1.33:8081-->C:目标服务器
{{< /mermaid >}}
```
### 安装nginx,并配置正向代理
- 配置nginx正向代理。

### 数据包打标记忆
```bash
#将源地址为192.168.1.33源端口为8081的数据包做标记
iptables -t mangle -A PREROUTING -p tcp --src 192.168.1.33 --sport 8081 \
         -j MARK --set-xmark 0x1/0xffffffff
```

```bash
# 新增路由表，表id为100，将所有ip数据路由到32机器
# NOTE: 以下两条ip命令设置的route和rule都需要保存到/etc/rc.local中，以便在开机时启动
ip route add local 0.0.0.0/0 dev lo table 100
# 2.3 为标记为1的ip数据使用路由表100
ip rule add fwmark 1 lookup 100
```

### 安装nginx,并配置正向代理
- 配置nginx正向代理。

### 数据包打标记忆
```bash
#将源地址为192.168.1.33源端口为8081的数据包做标记
iptables -t mangle -A PREROUTING -p tcp --src 192.168.1.33 --sport 8081 \
         -j MARK --set-xmark 0x1/0xffffffff
```

```bash
# 新增路由表，表id为100，将所有ip数据路由到32机器
# NOTE: 以下两条ip命令设置的route和rule都需要保存到/etc/rc.local中，以便在开机时启动
ip route add local 0.0.0.0/0 dev lo table 100
# 2.3 为标记为1的ip数据使用路由表100
ip rule add fwmark 1 lookup 100
```

## 实验结果
- 实验最后是成功了。这个实验反复做了很多遍。之前一直不成功。
- 之前不成功的时候，在nginx转发数据时，监听ip地址我用的一直是127.0.0.1，实验一直不通。后面换成内网ip就成功了。


---

> 作者:   
> URL: http://111.230.8.71:8889/nginx-forward-proxy/  

