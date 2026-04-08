# Linux ip route 命令深度详解：路由管理完全指南


# Linux ip route 命令深度详解：路由管理完全指南

## 什么是 ip route

`ip route` 是 Linux 系统中管理路由表的核心命令，属于 `iproute2` 包。它可以显示、添加、删除和修改系统路由表中的条目。

与传统的 `route` 命令相比，`ip route` 功能更强大，语法更规范，是现代 Linux 系统的推荐用法。

## 基本语法

```bash
ip route [选项] <命令> [参数]
```

## 思维导图：ip route 命令体系

```
                         ┌─────────────────────────────────────────┐
                         │         ip route 命令体系              │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│      查看路由        │        │     添加路由        │        │    删除/修改路由    │
│                     │        │                     │        │                     │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─ip route show                  ├─ip route add                    ├─ip route delete
          ├─ip route list                  ├─ip route change               ├─ip route replace
          ├─ip route get                  └─ip route prepend              └─ip route flush
          │
          └─ip r (简写)
                                            ▼
                              ┌─────────────────────────────────┐
                              │        路由类型                │
                              ├─────────────────────────────────┤
                              │ • 默认路由 (default)          │
                              │ • 主机路由 (/32)              │
                              │ • 网络路由 (CIDR)             │
                              │ • 黑洞路由 (blackhole)         │
                              │ • 负载均衡 (multipath)        │
                              │ • 策略路由 (table/rule)        │
                              └─────────────────────────────────┘
```

## 常用场景示例

### 1. 查看当前路由表

```bash
# 查看所有路由（最常用）
ip route show

# 简写形式
ip r

# 更详细的输出
ip route list

# 查看特定网段的路由
ip route show 192.168.1.0/24

# 查看特定网卡的路由
ip route show dev eth0
```

### 2. 添加默认路由

```bash
# 添加默认路由（通过指定网关）
ip route add default via 10.168.27.1

# 添加默认路由（指定出接口）
ip route add default dev eth0

# 添加默认路由（指定网关和出接口）
ip route add default via 10.168.27.1 dev eth0
```

### 3. 添加普通路由

```bash
# 添加到特定网络的路由
ip route add 192.168.1.0/24 via 10.0.0.1

# 添加到特定网络的路由（指定出接口）
ip route add 192.168.1.0/24 dev eth1

# 添加到特定主机的路由
ip route add 192.168.1.100/32 via 10.0.0.1
```

### 4. 删除路由

```bash
# 删除默认路由
ip route del default

# 删除特定网络的路由
ip route del 192.168.1.0/24

# 删除特定网关的路由
ip route del default via 10.168.27.1
```

### 5. 修改路由

```bash
# 替换现有路由
ip route replace 192.168.1.0/24 via 10.0.0.2

# 修改默认路由
ip route change default via 10.168.27.2
```

### 6. 路由度量值（Metric）

```bash
# 添加带度量值的路由（数字越小优先级越高）
ip route add 192.168.1.0/24 via 10.0.0.1 metric 100

# 查看路由的度量值
ip route show
```

### 7. 黑洞路由（Blackhole）

黑洞路由会丢弃数据包，常用于阻止访问特定网段：

```bash
# 添加黑洞路由（数据包被丢弃）
ip route add blackhole 192.168.1.0/24

# 添加 unreachable 路由（返回 ICMP 不可达）
ip route add unreachable 192.168.1.0/24

# 添加 prohibit 路由（返回 ICMP 禁止）
ip route add prohibit 192.168.1.0/24
```

### 8. 持久化路由（重启后生效）

```bash
# 在 Debian/Ubuntu 中配置
# 编辑 /etc/network/interfaces
# 在网卡配置中添加：
up ip route add 192.168.1.0/24 via 10.0.0.1
down ip route del 192.168.1.0/24 via 10.0.0.1

# 在 RHEL/CentOS 中配置
# 编辑 /etc/sysconfig/network-scripts/route-eth0
# 添加：
192.168.1.0/24 via 10.0.0.1
```

### 9. 路由表管理

```bash
# 查看所有路由表
ip route show table all

# 查看特定路由表
ip route show table main

# 查看本地路由表
ip route show table local

# 自定义路由表
ip route add 192.168.1.0/24 via 10.0.0.1 table custom
```

### 10. 追踪路由

```bash
# 模拟路由查询（测试数据包如何路由）
ip route get 192.168.1.100

# 示例输出：
# 192.168.1.100 via 10.168.27.1 dev eth0 src 10.168.27.100
#     cache
```

### 11. 刷新/清空路由缓存

```bash
# 清空路由缓存
ip route flush cache

# 清空特定表的路由
ip route flush table main
```

### 12. 负载均衡（Multipath）

```bash
# 添加负载均衡路由（两条路径轮流使用）
ip route add default scope global nexthop via 10.0.0.1 dev eth0 weight 1 \
nexthop via 10.0.0.2 dev eth1 weight 1

# 基于权重的负载均衡
ip route add 192.168.1.0/24 \
nexthop via 10.0.0.1 dev eth0 weight 3 \
nexthop via 10.0.0.2 dev eth1 weight 1
```

## 高级用法

### 1. 策略路由

```bash
# 添加指定源地址的路由
ip route add 192.168.1.0/24 via 10.0.0.1 src 10.168.27.100

# 基于源地址选择不同路由表
ip rule add from 10.168.27.100 lookup 100
ip route add default via 10.0.0.1 table 100
```

### 2. MTU 设置

```bash
# 添加带 MTU 限制的路由
ip route add 192.168.1.0/24 via 10.0.0.1 mtu 1400
```

### 3. 隧道路由

```bash
# 添加隧道端点路由
ip route add 192.168.2.0/24 dev tun0
```

## 实际应用案例

### 案例 1：添加默认网关

```bash
# 服务器添加默认网关
ip route add default via 192.168.1.1

# 验证
ip route show | grep default
```

### 案例 2：添加静态路由实现双网卡访问

```bash
# eth0: 192.168.10.0/24 网段
# eth1: 192.168.20.0/24 网段

# 添加路由让两个网段互通
ip route add 192.168.20.0/24 via 192.168.10.1 dev eth0
ip route add 192.168.10.0/24 via 192.168.20.1 dev eth1
```

### 案例 3：阻止访问特定 IP

```bash
# 使用黑洞路由阻止访问 1.1.1.1
ip route add blackhole 1.1.1.1/32

# 阻止访问整个网段
ip route add blackhole 10.0.0.0/8

# 查看黑洞路由
ip route show | grep blackhole
```

### 案例 4：临时添加路由（重启失效）

```bash
# 添加临时路由（系统重启后丢失）
ip route add 172.16.0.0/12 via 192.168.1.1

# 使路由永久生效（添加到 /etc/rc.local 或网络配置）
```

## 路由表字段说明

执行 `ip route show` 输出示例：

```
default via 10.168.27.1 dev eth0 proto dhcp src 10.168.27.100 metric 100 
10.168.27.0/24 dev eth0 proto kernel scope link src 10.168.27.100 
192.168.1.0/24 via 10.168.27.1 dev eth0
```

| 字段 | 说明 |
|------|------|
| `default` | 默认路由 |
| `via` | 下一跳网关地址 |
| `dev` | 出接口 |
| `proto` | 路由协议（kernel/static/dhcp） |
| `scope` | 作用范围（link/global/host） |
| `src` | 源地址 |
| `metric` | 优先级（数值越小越高） |

## 常用参数汇总

| 参数 | 说明 |
|------|------|
| `ip route show` | 显示路由表 |
| `ip route add` | 添加路由 |
| `ip route del` | 删除路由 |
| `ip route change` | 修改路由 |
| `ip route replace` | 替换路由 |
| `ip route get` | 测试路由 |
| `ip route flush` | 清空路由缓存 |
| `via` | 下一跳地址 |
| `dev` | 出接口 |
| `metric` | 路由优先级 |
| `blackhole` | 黑洞路由 |

## ip route vs route 命令

| 特性 | ip route | route |
|------|---------|-------|
| 所属包 | iproute2 | net-tools |
| 状态 | 现代推荐 | 已废弃 |
| 语法 | 结构化 | 简单 |
| 功能 | 完整 | 有限 |

## 常见问题

### Q: 添加的路由重启后丢失怎么办？

A: 两种方案：
1. 写入网络配置文件（如 `/etc/network/interfaces` 或 `/etc/sysconfig/network-scripts/`）
2. 写入 `/etc/rc.local`

### Q: 如何查看路由是否生效？

A: 使用 `ip route show` 或 `ip route get <目标IP>`

### Q: 默认路由和网关的区别？

A: 默认路由（0.0.0.0/0）指向网关，是访问任何未知网络的最后手段。

### Q: 如何删除所有路由？

A: 危险操作，仅删除自定义路由：
```bash
ip route flush table main
```

## 总结

`ip route` 是 Linux 网络管理中最重要的命令之一，熟练掌握可以：

- 配置静态路由实现网络互通
- 管理默认网关
- 阻止访问特定地址（黑洞路由）
- 实现网络负载均衡
- 调试网络连接问题

**核心命令模板：**
```bash
# 添加默认路由
ip route add default via <网关IP>

# 添加静态路由
ip route add <目标网段> via <网关IP>

# 查看路由
ip route show
```

## 参考命令汇总

```bash
# 查看路由表
ip route show
ip r

# 添加默认路由
ip route add default via 10.168.27.1

# 添加静态路由
ip route add 192.168.1.0/24 via 10.0.0.1

# 删除路由
ip route del default

# 修改路由
ip route change default via 10.168.27.2

# 测试路由
ip route get 192.168.1.1

# 添加黑洞路由
ip route add blackhole 192.168.1.0/24
```

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/linux-ip-route-command/  

