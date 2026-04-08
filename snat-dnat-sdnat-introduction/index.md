# SNAT、DNAT 与 SDNAT：网络地址转换详解


# SNAT、DNAT 与 SDNAT：网络地址转换详解

## 什么是 NAT

NAT（Network Address Translation，网络地址转换）是一种在网络中修改 IP 地址信息的技术。它的主要作用是：

- **解决 IP 地址短缺问题**：让多个设备共享一个公网 IP 上网
- **保护内部网络**：隐藏内部私有 IP 地址
- **实现网络隔离**：在防火墙或路由器上实现内外网隔离

## 思维导图：NAT 类型总览

```
                         ┌─────────────────────────────────────────┐
                         │        网络地址转换（NAT）              │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│      SNAT           │        │      DNAT            │        │     SDNAT           │
│   源地址转换        │        │   目的地址转换       │        │   动态源地址转换     │
│                     │        │                     │        │                     │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─出站流量                         ├─入站流量                        ├─SNAT 扩展
          ├─伪装（MASQUERADE）               ├─端口转发                        ├─自动选择公网IP
          └─静态源地址转换                   └─DNAT 映射                       └─节省公网IP
                                           │
                                           └─SNAT vs DNAT 对比
                                              • 修改源 IP → SNAT
                                              • 修改目的 IP → DNAT
                                              • 双向流量处理

         ┌────────────────────────────────────────────────────────────┐
         │                     典型应用场景                          │
         ├────────────────────────────────────────────────────────────┤
         │ • 家庭/企业共享上网（SNAT）                               │
         │ • 端口映射/内网服务暴露（DNAT）                            │
         │ • 负载均衡/透明代理（SDNAT）                                │
         └────────────────────────────────────────────────────────────┘
```

## SNAT（Source NAT）

### 概念

SNAT 修改数据包的**源 IP 地址**。主要应用于**出站流量**，即内部网络访问外部网络时的地址转换。

### 工作原理

当内部私有网络的用户访问互联网时：
1. 数据包从内部网络发送到网关
2. 网关将数据包的**源 IP**（私有 IP）转换为**公网 IP**
3. 数据包发送到目标服务器
4. 响应数据包返回时，再将公网 IP 转换回私有 IP

### 典型应用场景

- **共享上网**：让局域网内多台电脑通过一个公网 IP 访问互联网
- **企业出口网关**：公司内网访问外部网络时统一使用公网 IP
- **IP 伪装**：隐藏内部网络结构

### 配置示例（Linux iptables）

```bash
# SNAT 静态转换
# 将 192.168.1.0/24 网段的出站流量源地址转换为 203.0.113.10
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -j SNAT --to-source 203.0.113.10

# MASQUERADE（动态伪装）- 适用于公网 IP 不固定的情况
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE

# 查看 NAT 规则
iptables -t nat -L -n -v
```

### 图示：SNAT 工作流程

```
客户端 A (192.168.1.10) ──►  ──►  ──►  互联网服务器
                         │      │        │
                         ▼      ▼        ▼
                      网关 (SNAT)    转换后
                   192.168.1.10 → 203.0.113.10
                   
返回时：互联网服务器 ──► 网关 ──► 客户端 A
                     203.0.113.10 → 192.168.1.10
```

## DNAT（Destination NAT）

### 概念

DNAT 修改数据包的**目的 IP 地址**。主要应用于**入站流量**，即外部网络访问内部网络时的地址转换。

### 工作原理

当外部用户访问内部服务时：
1. 数据包到达网关（公网 IP）
2. 网关将数据包的目的 IP（公网 IP）转换为**内网私有 IP**
3. 数据包转发到内网服务器
4. 响应数据包返回时，进行相反转换

### 典型应用场景

- **端口映射**：将外部端口映射到内网服务器
- **内网服务暴露**：让外部用户访问内部 Web 服务
- **负载均衡**：将外部请求分发到多台内网服务器

### 配置示例（Linux iptables）

```bash
# DNAT 端口转发 - 将 80 端口流量转发到内网 192.168.1.100:80
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.100:80

# 将访问本机 8080 端口的流量转发到 192.168.1.50:9000
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.50:9000

# 本地端口转发（DNAT + 路由）
iptables -t nat -A PREROUTING -p tcp -d 203.0.113.10 --dport 2222 -j DNAT --to-destination 192.168.1.100:22

# 配合 SNAT 确保返回流量正常（针对本地发起的连接）
iptables -t nat -A POSTROUTING -d 192.168.1.100 -p tcp --dport 80 -j SNAT --to-source 192.168.1.1
```

### 图示：DNAT 工作流程

```
互联网客户端 ──► ──► ──► 内网服务器 (192.168.1.100:80)
               │      │        │
               ▼      ▼        ▼
            网关 (DNAT)    转换后
          203.0.113.10 → 192.168.1.100
          
返回时：内网服务器 ──► 网关 ──► 互联网客户端
                 192.168.1.100 → 203.0.113.10
```

## SNAT vs DNAT 对比

| 特性 | SNAT | DNAT |
|------|------|------|
| **转换目标** | 源 IP 地址 | 目的 IP 地址 |
| **流量方向** | 出站（内网→外网） | 入站（外网→内网） |
| **主要用途** | 共享上网、IP 伪装 | 端口映射、服务暴露 |
| **典型命令** | `SNAT --to-source` | `DNAT --to-destination` |
| **使用链** | POSTROUTING | PREROUTING/OUTPUT |
| **返回流量** | 自动反向转换 | 需要配合 SNAT |

## SDNAT（Source and Destination NAT）

### 概念

SDNAT 是 SNAT 和 DNAT 的结合，同时修改数据包的源 IP 和目的 IP。这种情况通常出现在更复杂的网络场景中。

### 工作原理

当数据包经过 SDNAT 处理时：
1. 先修改目的 IP（类似 DNAT）
2. 再修改源 IP（类似 SNAT）
3. 实现双向流量的透明转发

### 典型应用场景

- **透明代理**：客户端无感知地转发流量
- **负载均衡**：将请求分发到后端服务器
- **VPN 隧道**：在隧道两端进行地址转换
- **双向 NAT**：内外网需要双向地址转换的场景

### 配置示例（Linux iptables）

```bash
# SDNAT 示例：同时修改源和目的地址
# 将 192.168.1.10 访问 10.0.0.50 的流量转换为 203.0.113.10 访问 192.168.1.100
iptables -t nat -A PREROUTING -s 192.168.1.10 -d 10.0.0.50 \
  -j DNAT --to-destination 192.168.1.100

iptables -t nat -A POSTROUTING -s 192.168.1.10 -d 192.168.1.100 \
  -j SNAT --to-source 192.168.1.1

# 更常见的 SDNAT 场景：HAProxy 透明模式
# 在 HAProxy 服务器上进行双向地址转换
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.10
iptables -t nat -A POSTROUTING -s 192.168.1.10 -o eth0 -j MASQUERADE
```

### 图示：SDNAT 工作流程

```
客户端 A ──► ──► ──► ──► 服务器 B
(192.168.1.10)    (SDNAT)    (192.168.1.100)
                │
                ▼
         DNAT: 目的 10.0.0.50 → 192.168.1.100
         SNAT: 源 192.168.1.10 → 192.168.1.1
```

## 实际应用案例

### 案例 1：家庭路由器共享上网

```
家庭网络拓扑：
[电脑1: 192.168.1.10] ─┐
[电脑2: 192.168.1.11] ─┼──► [路由器] ──► [互联网]
[手机: 192.168.1.12] ──┘              (公网 IP: 203.0.113.10)

配置命令：
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -j MASQUERADE

效果：所有设备共享路由器的一个公网 IP 上网
```

### 案例 2：发布内网 Web 服务

```
需求：将内网 192.168.1.100:80 的 Web 服务通过公网 IP 暴露

配置命令：
# DNAT 端口映射
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.100:80

# 确保返回流量正常
iptables -t nat -A POSTROUTING -d 192.168.1.100 -p tcp --dport 80 -j SNAT --to-source 192.168.1.1

效果：外部访问 公网IP:80 即可访问内网 Web 服务
```

### 案例 3：双向服务访问

```
需求：内网服务器需要访问自己通过 DNAT 暴露的服务

配置命令：
# DNAT 映射
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.100:80

# 本地转发（解决"发夹"效应）
iptables -t nat -A OUTPUT -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.100:80

效果：内网其他机器通过 192.168.1.1:8080 也能访问内网服务
```

## 注意事项

### 安全考虑

1. **IP 伪装并不能完全隐藏内部网络**：可通过 TTL、IP ID 等特征识别
2. **DNAT 可能带来安全风险**：确保内网服务不暴露不必要的端口
3. **双向 NAT 需要仔细配置**：确保返回流量正确路由

### 性能影响

1. **NAT 会增加延迟**：每个数据包都需要修改 IP 头
2. **连接跟踪表**：大量并发连接会消耗内存
3. **CPU 开销**：复杂的 NAT 规则会影响性能

### 常见问题

**Q: 为什么 DNAT 后返回流量不通？**
A: 需要确保返回路径可以正确转换，可能需要配合 SNAT。

**Q: SNAT 和 MASQUERADE 有什么区别？**
A: SNAT 需要指定固定公网 IP，MASQUERADE 会自动使用出接口 IP，更适合动态 IP 场景。

**Q: 如何查看 NAT 转换状态？**
A: 使用 `conntrack -L` 或 `cat /proc/net/nf_conntrack` 查看连接跟踪表。

## 总结

- **SNAT**：修改源 IP，用于内网访问外网（共享上网）
- **DNAT**：修改目的 IP，用于外网访问内网（端口映射）
- **SDNAT**：同时修改源和目的 IP，用于复杂转发场景

理解这三种 NAT 类型的区别和应用场景，对于网络管理和安全防护非常重要。

## 参考命令汇总

```bash
# SNAT 静态转换
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -j SNAT --to-source 203.0.113.10

# SNAT 动态伪装
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE

# DNAT 端口映射
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.100:80

# 查看 NAT 规则
iptables -t nat -L -n -v

# 查看连接跟踪
conntrack -L

# 删除 NAT 规则
iptables -t nat -D POSTROUTING 1
```

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/snat-dnat-sdnat-introduction/  

