# WireGuard VPN 使用详解


# WireGuard VPN 使用详解

## 什么是 WireGuard

WireGuard 是一款现代、快速、安全的 VPN 隧道协议，由 Jason A. Donenfeld 于 2015 年开发。它设计简洁、代码量极小（约 4000 行），同时提供了卓越的安全性和性能。

WireGuard 被认为是传统 VPN 协议（如 OpenVPN、IPsec）的理想替代品，已被纳入 Linux 内核主线，并在多个操作系统中得到支持。

## WireGuard 的特点

### 1. 简洁高效

- 代码量极小，仅约 4000 行
- 配置简单，易于理解和维护
- 运行时资源占用低

### 2. 高速性能

- 采用最新的加密原语
- 内核级实现，数据处理效率高
- 比传统 VPN 协议快 3-4 倍

### 3. 安全可靠

- 使用 Curve25519 进行密钥交换
- ChaCha20-Poly1305 用于数据加密
- 现代化加密设计，避免传统协议的已知问题

### 4. 跨平台支持

- Linux（内核原生支持）
- macOS、Windows、iOS、Android
- 路由器（OpenWrt 等）

## 工作原理

WireGuard 基于以下核心技术：

1. **密钥交换**：使用 Curve25519 DH 算法
2. **加密**：使用 ChaCha20-Poly1305 AEAD
3. **认证**：基于公钥密码学
4. **隧道**：基于 UDP 协议

### 数据流过程

```
客户端 → 公钥加密 → WireGuard 隧道 → UDP 传输 → 公钥解密 → 服务器
```

## 安装配置

### Linux 安装

```bash
# Ubuntu/Debian
sudo apt install wireguard

# CentOS/RHEL
sudo yum install wireguard-tools

# Arch Linux
sudo pacman -S wireguard-tools
```

### 生成密钥对

```bash
# 生成私钥
wg genkey > privatekey

# 生成公钥
wg pubkey < privatekey > publickey

# 查看密钥
cat privatekey
cat publickey
```

### 服务端配置

创建配置文件 `/etc/wireguard/wg0.conf`：

```ini
[Interface]
# 服务端私钥
PrivateKey = SERVER_PRIVATE_KEY
# 监听端口
ListenPort = 51820
# VPN 网段
Address = 10.0.0.1/24
# 启动后自动配置 iptables
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT
PostUp = iptables -A FORWARD -o wg0 -j ACCEPT
PostUp = iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
# 关闭时恢复
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT
PostDown = iptables -D FORWARD -o wg0 -j ACCEPT
PostDown = iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
# 客户端公钥
PublicKey = CLIENT_PUBLIC_KEY
# 允许的客户端 IP
AllowedIPs = 10.0.0.2/32
```

### 客户端配置

```ini
[Interface]
# 客户端私钥
PrivateKey = CLIENT_PRIVATE_KEY
# 客户端 VPN IP
Address = 10.0.0.2/24
# DNS 服务器
DNS = 8.8.8.8

[Peer]
# 服务端公钥
PublicKey = SERVER_PUBLIC_KEY
# 服务端地址和端口
Endpoint = server.example.com:51820
# 允许的网段（0.0.0.0/0 表示所有流量）
AllowedIPs = 0.0.0.0/0
# 保持连接（可选）
PersistentKeepalive = 25
```

### 启动 WireGuard

```bash
# 启动 WireGuard 接口
sudo wg-quick up wg0

# 停止 WireGuard 接口
sudo wg-quick down wg0

# 查看状态
sudo wg

# 开机自启
sudo systemctl enable wg-quick@wg0
```

## 进阶配置

### 多个客户端

在服务端配置中添加多个 `[Peer]` 段：

```ini
[Peer]
PublicKey = CLIENT1_PUBLIC_KEY
AllowedIPs = 10.0.0.2/32

[Peer]
PublicKey = CLIENT2_PUBLIC_KEY
AllowedIPs = 10.0.0.3/32

[Peer]
PublicKey = CLIENT3_PUBLIC_KEY
AllowedIPs = 10.0.0.4/32
```

### 网关模式

让客户端通过服务端访问互联网：

```ini
# 客户端配置 AllowedIPs
AllowedIPs = 0.0.0.0/0  # 全部流量

# 服务端需要开启 IP 转发
echo 1 > /proc/sys/net/ipv4/ip_forward
```

### 动态分配 IP

可以使用 wg-genconf 等工具实现动态 IP 分配。

### 防火墙规则

```bash
# 开放 WireGuard 端口
sudo ufw allow 51820/udp

# 限制来源 IP（可选）
sudo ufw allow from 192.168.1.0/24 to any port 51820 proto udp
```

## 性能对比

| 指标 | WireGuard | OpenVPN | IPsec |
|-----|-----------|---------|-------|
| 代码行数 | ~4000 | ~70000 | ~50000 |
| 吞吐量 | 最高 | 中等 | 中等 |
| CPU 占用 | 极低 | 高 | 高 |
| 连接时间 | <100ms | >1000ms | >500ms |
| 安全等级 | 现代 | 传统 | 现代 |

## 适用场景

### 1. 远程办公

- 安全的远程访问公司内网
- 访问内部系统和服务

### 2. 跨区域组网

- 多数据中心互联
- 跨国企业网络

### 3. 隐私保护

- 加密网络流量
- 隐藏真实 IP

### 4. 物联网

- 安全的设备远程管理
- 嵌入式设备 VPN 连接

## 与其他 VPN 对比

### WireGuard vs OpenVPN

- WireGuard 更轻量、更快
- OpenVPN 更成熟、兼容更好
- WireGuard 配置更简单

### WireGuard vs IPsec

- WireGuard 配置更简单
- IPsec 兼容性更好
- WireGuard 安全性相当但性能更好

## 常见问题

### 1. 连接成功但无法访问

检查服务端是否开启了 IP 转发：

```bash
cat /proc/sys/net/ipv4/ip_forward
# 如果是 0，执行：
echo 1 > /proc/sys/net/ipv4/ip_forward
```

### 2. DNS 泄漏

确保客户端配置了正确的 DNS：

```ini
DNS = 8.8.8.8
```

### 3. NAT 穿透问题

WireGuard 使用 UDP，在某些严格 NAT 环境下可能无法连接：

- 使用 NAT 穿透技术（WireGuard 原生支持）
- 或在服务端使用 TCP 模式（需要额外配置）

### 4. 密钥管理

生产环境中建议：
- 定期轮换密钥
- 使用配置文件管理多个客户端
- 记录客户端公钥和对应用户

## 总结

WireGuard 是一款革命性的 VPN 协议，它以极简的设计实现了出色的安全性和性能。对于需要快速部署、简单管理的 VPN 场景，WireGuard 是的理想选择。

其优势总结：
- ✅ 配置简单，代码量小
- ✅ 性能卓越，速度快
- ✅ 安全可靠，现代加密
- ✅ 跨平台支持
- ✅ 内核原生，性能好

如果你正在寻找替代传统 VPN 的解决方案，WireGuard 绝对值得一试。

## 参考资料

- WireGuard 官方网站：https://www.wireguard.com/
- WireGuard 文档：https://docs.wireguard.com/

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/wireguard-vpn-usage/  

