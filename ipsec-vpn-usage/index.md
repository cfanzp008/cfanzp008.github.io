# IPsec VPN 详解


# IPsec VPN 详解

## 什么是 IPsec

IPsec（Internet Protocol Security）是 IETF 制定的安全协议标准，用于在 IP 层提供安全的数据传输。它是企业网络中最广泛使用的 VPN 技术，也是网络层安全的基石。

IPsec 不是一个单一的协议，而是一个协议套件，包含多个子协议来实现不同安全功能。

## IPsec 组件

### 1. 安全协议

- **AH（Authentication Header）**：提供数据完整性、源认证和防重放攻击
- **ESP（Encapsulating Security Payload）**：提供加密、完整性认证（常用）

### 2. 密钥交换协议

- **IKE（Internet Key Exchange）**：自动密钥协商和管理

### 3. 安全关联（SA）

- 定义通信双方如何保护数据
- 包括加密算法、密钥、生命周期等

## 工作模式

### 1. 传输模式（Transport Mode）

- 只加密数据部分（payload）
- 原始 IP 头保留
- 适用于主机到主机的通信

```
原始 IP 包: [IP Header][TCP][Data]
IPsec 传输: [IP Header][ESP][TCP][Data][ESP Trailer]
```

### 2. 隧道模式（Tunnel Mode）

- 加密整个原始 IP 包
- 加上新的 IP 头
- 适用于网关到网关或网关到主机

```
原始 IP 包: [原始 IP][TCP][Data]
IPsec 隧道: [新 IP Header][ESP][原始 IP][TCP][Data][ESP Trailer]
```

## IKE 阶段

### Phase 1（建立 ISAKMP SA）

- 协商安全参数
- 认证对等体
- 建立第一阶段 SA

两种模式：
- **主模式（Main Mode）**：6 条消息，3 次交换，更安全
- **激进模式（Aggressive Mode）**：3 条消息，速度快但安全性低

### Phase 2（建立 IPsec SA）

- 协商 IPsec 参数
- 生成加密密钥
- 建立第二阶段 SA

- **快速模式（Quick Mode）**：协商 IPsec SA

## 加密算法

### 加密算法

| 算法 | 说明 |
|-----|------|
| DES | 56 位，已不安全 |
| 3DES | 168 位，性能差 |
| AES | 推荐，128/192/256 位 |
| ChaCha20 | 现代算法，性能好 |

### 认证算法

| 算法 | 说明 |
|-----|------|
| MD5 | 不推荐，已破解 |
| SHA-1 | 不推荐 |
| SHA-2 | 推荐（SHA-256） |
| SHA-3 | 最新标准 |

### Diffie-Hellman（DH）组

| 组 | 位数 | 安全性 |
|---|------|-------|
| 1 | 768 | 不安全 |
| 2 | 1024 | 弱 |
| 5 | 1536 | 中等 |
| 14 | 2048 | 推荐 |
| 19-21 | 256-384 | 高 |

## Linux 配置（使用 strongSwan）

### 安装

```bash
# Ubuntu/Debian
sudo apt install strongswan strongswan-pki

# CentOS
sudo yum install strongswan
```

### 生成证书

```bash
# 生成 CA 私钥和证书
ipsec pki --gen --ca --lifetime 3652

# 生成服务器私钥和证书
ipsec pki --gen --server --lifetime 1826

# 生成客户端私钥和证书
ipsec pki --gen --client --lifetime 1826
```

### 服务端配置

编辑 `/etc/ipsec.conf`：

```conf
config setup
    charondebug="all"

# 隧道配置
conn tunnel
    authby=secret          # 使用预共享密钥
    left=203.0.113.1       # 服务端公网 IP
    leftsubnet=10.0.0.0/24  # 服务端内网
    right=203.0.113.2       # 客户端公网 IP
    rightsubnet=192.168.1.0/24  # 客户端内网
    auto=add
    keyexchange=ikev1
    auth=esp
    esp=aes256-sha256
    ike=aes256-sha256-modp2048
    lifetime=28800
    rekeymargin=5400
    rekeyfuzz=100%
```

添加预共享密钥 `/etc/ipsec.secrets`：

```secret
# 格式：PSK "密钥"
: PSK "your_preshared_secret_key"
```

### 客户端配置

```conf
conn tunnel
    authby=secret
    left=203.0.113.2
    leftsubnet=192.168.1.0/24
    right=203.0.113.1
    rightsubnet=10.0.0.0/24
    auto=start
    keyexchange=ikev1
    auth=esp
    esp=aes256-sha256
    ike=aes256-sha256-modp2048
```

### 启动和调试

```bash
# 启动 IPsec
sudo ipsec start

# 查看状态
sudo ipsec status

# 查看详细状态
sudo ipsec statusall

# 重启
sudo ipsec restart
```

## 使用 libreswan 配置

### 安装

```bash
# RHEL/CentOS
sudo yum install libreswan

# Ubuntu
sudo apt install libreswan
```

### 配置示例

编辑 `/etc/ipsec.conf`：

```conf
# 基本配置
config setup
    nat_traversal=yes
    virtual_private=%v4:10.0.0.0/8,%v4:192.168.0.0/16,%v4:172.16.0.0/12

# VPN 隧道
conn myvpn
    authby=secret
    auto=start
    left=203.0.113.1
    leftsubnet=10.0.0.0/24
    right=203.0.113.2
    rightsubnet=192.168.1.0/24
    phase2=esp
    phase2alg=aes256-sha1
    ike=aes256-sha1
    dpdaction=restart
```

添加密钥 `/etc/ipsec.secrets`：

```secret
203.0.113.1 203.0.113.2 : PSK "secret_key"
```

### 启动服务

```bash
# 启动
sudo systemctl start ipsec

# 开机自启
sudo systemctl enable ipsec

# 检查状态
sudo ipsec status
```

## Windows 路由器配置

### Windows Server

1. 安装「路由和远程访问」角色
2. 配置输入接口
3. 配置 VPN
4. 配置 IPsec 策略

### Cisco 路由器

```cisco
! 创建 ACL 定义感兴趣流量
ip access-list extended VPN_ACL
 permit ip 10.0.0.0 0.0.0.255 192.168.1.0 0.0.0.255

! 配置 IKE 策略
crypto isakmp policy 10
 encryption aes
 hash sha
 authentication pre-share
 group 14
 lifetime 28800

! 配置预共享密钥
crypto isakmp key cisco123 address 203.0.113.2

! 配置变换集
crypto ipsec transform-set TS esp-aes esp-sha-hmac

! 创建加密映射
crypto map MAP 10 ipsec-isakmp
 set peer 203.0.113.2
 set transform-set TS
 match address VPN_ACL

! 应用到接口
interface GigabitEthernet0/0
 crypto map MAP
```

### Juniper

```junos
# 配置安全关联
set security ipsec proposal PROPOSAL1 protocol esp
set security ipsec proposal PROPOSAL1 authentication-algorithm hmac-sha1-96-encryption
set security ipsec proposal PROPOSAL1 encryption-algorithm aes-256-cbc

# 配置 IKE
set security ike proposal IKE_PROPOSAL1 authentication-method pre-shared-keys
set security ike proposal IKE_PROPOSAL1 dh-group group14
set security ike proposal IKE_PROPOSAL1 authentication-algorithm sha1
set security ike proposal IKE_PROPOSAL1 encryption-algorithm aes-256-cbc
```

## 故障排查

### 常见问题

1. **IKE 协商失败**
   - 检查端口 500（UDP）和 4500（NAT-T）
   - 验证防火墙规则
   - 检查日志

2. **SA 建立失败**
   - 验证加密算法和认证方法匹配
   - 检查 DH 组配置
   - 确认预共享密钥正确

3. **流量不通**
   - 检查路由
   - 验证 ACL
   - 检查 NAT 配置

### 调试命令

```bash
# Linux 查看日志
sudo journalctl -u strongswan -f

# 查看 SA
ip xfrm state

# 查看策略
ip xfrm policy

# 抓包分析
tcpdump -i any port 500 or port 4500 -nn
```

## 与其他 VPN 对比

| 特性 | IPsec | WireGuard | OpenVPN |
|-----|-------|-----------|---------|
| 标准化 | RFC 标准 | 新兴标准 | 开源方案 |
| 性能 | 中等 | 高 | 中等 |
| 配置 | 复杂 | 简单 | 复杂 |
| 兼容性 | 极好 | 较好 | 好 |
| 穿透性 | 好 | 需协助 | 好 |
| 适用场景 | 企业 | 轻量 | 灵活 |

## 安全最佳实践

1. **使用强加密算法**
   - AES-256
   - SHA-256 或更高
   - DH 组 14 或更高

2. **定期轮换密钥**
   - IKE SA 生命周期不超过 24 小时
   - IPsec SA 生命周期不超过 8 小时

3. **使用证书认证**
   - 比预共享密钥更安全
   - 便于管理和撤销

4. **启用 NAT-T**
   - 支持 NAT 环境
   - 需要 UDP 4500 端口

5. **记录和监控**
   - 监控连接状态
   - 记录安全事件

## 总结

IPsec 是企业网络安全的基石，提供了：
- ✅ 标准化的安全架构
- ✅ 广泛的网络设备支持
- ✅ 完善的认证和加密机制
- ✅ 强大的兼容性

虽然配置相对复杂，但其安全性和可靠性使其在企业环境中仍然不可或缺。对于需要高安全性、广泛兼容性的场景，IPsec 仍然是首选方案。

## 参考资料

- RFC 4301：IPsec 架构
- RFC 4302：AH 协议
- RFC 4303：ESP 协议
- RFC 4306：IKEv2
- strongSwan 文档：https://www.strongswan.org/

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/ipsec-vpn-usage/  

