# Tailscale 使用详解


# Tailscale 使用详解

## 什么是 Tailscale

Tailscale 是一款基于 WireGuard 协议的零信任网络访问工具，由 Google 前员工创立。它简化了 VPN 的配置和管理，让用户可以轻松地在任意设备之间建立安全的点对点连接。

Tailscale 不需要复杂的服务器配置，它使用 Tailscale 提供的免费中继服务器（称为「DERP」）来帮助设备建立连接，在某些场景下也可以直接端到端连接。

## 核心特性

### 1. 零信任网络

- 基于设备身份认证
- 不再依赖传统 VPN 的网络边界
- 每个设备都需要独立认证

### 2. WireGuard 底层

- 继承 WireGuard 的高性能
- 端到端加密
- 快速连接

### 3. 简单易用

- 支持多平台（Windows、macOS、Linux、iOS、Android）
- 一键安装，自动配置
- 不需要专业知识

### 4. 内网穿透

- 可以在任意网络环境下访问设备
- 突破 NAT 和防火墙
- 支持 UDP 打洞

### 5. ACL 访问控制

- 基于用户和设备的细粒度控制
- 可以限制哪些设备可以互相访问
- 支持分组管理

## 应用场景

### 1. 远程办公

- 安全的远程访问公司电脑
- 访问公司内网资源
- 无需配置复杂 VPN 服务器

### 2. 家庭网络

- 远程访问家中设备（NAS、路由器、智能家居）
- 不需要公网 IP
- 安全的远程管理

### 3. 开发测试

- 访问测试环境服务器
- 团队成员间安全互联
- 快速搭建开发网络

### 4. 物联网

- 安全的设备远程管理
- 嵌入式设备远程调试
- IoT 设备安全组网

### 5. 多云互联

- 连接不同云服务商的服务器
- 简化混合云网络
- 统一管理多节点

## 安装配置

### 安装

```bash
# Linux (Debian/Ubuntu)
curl -fsSL https://tailscale.com/install.sh | sh

# macOS
brew install tailscale

# Windows
# 从官网下载安装：https://tailscale.com/download

# Android/iOS
# 应用商店搜索 Tailscale
```

### 首次登录

```bash
# 启动 Tailscale
sudo tailscale up

# 会自动打开浏览器进行 OAuth 登录
# 登录 Google/Microsoft 账号即可
```

### 常用命令

```bash
# 启动 Tailscale
tailscale up

# 停止 Tailscale
tailscale down

# 查看状态
tailscale status

# 查看 IP 地址
tailscale ip -4

# 添加子网路由（需要 --accept-routes）
tailscale up --accept-routes

# 允许节点访问
tailscale up --accept-dns
```

### 高级选项

```bash
# 指定出口节点（需要 Tailscale 商业版）
tailscale up --exit-node=exit-node-ip

# 指定 Tailscale DNS
tailscale up --advertise-exit-node

# 强制使用特定网络接口
tailscale up --operator=root
```

## 核心概念

### 1. Tailscale IP

每个设备都会获得一个 100.x.x.x 格式的虚拟 IP 地址，用于在 Tailscale 网络中通信。

### 2. 节点（Node）

Tailscale 网络中的每个设备都是一个节点，包括：
- 个人设备
- 服务器
- 共享设备

### 3. ACL（访问控制列表）

Tailscale 提供基于 JSON 的 ACL 配置，可以控制：
- 哪些用户可以访问哪些设备
- 设备之间如何通信
- 哪些端口可以访问

### 4. DERP

Tailscale 部署的中继服务器，用于：
- NAT 穿透失败时的回退
- 帮助建立连接
- 不参与数据加密

### 5. 尾路由（Tailnet）

Tailscale 用户创建的私有网络，包含该用户所有认证的设备。

## 进阶功能

### 1. 子网路由

将局域网网段暴露给其他 Tailscale 设备：

```bash
# 在服务端启用
sudo tailscale up --advertise-routes=192.168.1.0/24

# 在客户端启用接收
tailscale up --accept-routes
```

### 2. 出口节点

通过其他 Tailscale 设备上网：

```bash
# 将某设备设为出口节点
tailscale up --advertise-exit-node

# 其他设备使用该出口节点
tailscale up --exit-node=exit-node-ip
```

### 3. 节点共享

分享设备给其他 Tailscale 用户：

```bash
# 生成共享链接
tailscale share-level-host --name "我的服务器" --expires 24h

# 或者直接共享节点
tailscale share 100.64.1.1
```

### 4. MagicDNS

自动为设备分配 DNS 名称：

```bash
# 启用 MagicDNS
tailscale up --magic-dns

# 访问设备
ssh hostname.tail-scale-ts-d.ts.net
```

### 5. Funnel（实验功能）

将本地服务暴露到公网：

```bash
# 启用 Funnel
tailscale funnel enable

# 暴露端口
tailscale funnel 8080
```

## ACL 配置示例

创建 `acl.json` 文件：

```json
{
  "acls": [
    // 允许同一用户的所有设备互访
    { "action": "accept", "src": ["group:default"], "dst": ["group:default"] },
    
    // 允许特定设备访问
    { "action": "accept", "src": ["client@example.com"], "dst": ["*:22", "*:80", "*:443"] },
    
    // 允许访问特定服务
    { "action": "accept", "src": ["group:developers"], "dst": ["tag:server:80"] }
  ],
  "groups": {
    "group:default": ["user@example.com"],
    "group:developers": ["dev1@example.com", "dev2@example.com"]
  },
  "tagOwners": {
    "tag:server": ["user@example.com"]
  }
}
```

应用 ACL：

```bash
tailscale ACL apply acl.json
```

## 与传统 VPN 对比

| 特性 | Tailscale | 传统 VPN |
|-----|----------|---------|
| 部署难度 | 极简 | 复杂 |
| 客户端 | 轻量 | 笨重 |
| 连接速度 | 快 | 慢 |
| NAT 穿透 | 自动 | 需配置 |
| 零信任 | 原生 | 附加 |
| 费用 | 免费/订阅 | 商业软件 |

## 安全特性

### 1. 端到端加密

- 使用 WireGuard 加密
- 数据仅在两端解密
- DERP 服务器无法看到数据内容

### 2. 设备认证

- 基于 OpenID Connect
- 每次登录都需要认证
- 支持 MFA

### 3. ACL 细粒度控制

- 基于身份而非网络位置
- 可精确控制到端口级别
- 支持审计日志

### 4. 密钥管理

- 密钥自动轮换
- 设备注销即时生效
- 无需手动管理证书

## 常见问题

### 1. 连接慢

可能原因：
- DERP 服务器距离远
- 网络环境复杂

解决方法：
- 手动指定更近的 DERP
- 检查网络环境

### 2. 无法连接

可能原因：
- NAT/防火墙阻止 UDP
- 被对称 NAT 限制

解决方法：
- 使用 DERP 回退
- 联系网络管理员

### 3. 设备离线

可能原因：
- 设备网络变化
- Tailscale 服务未运行

解决方法：
- 检查设备网络
- 重启 Tailscale 服务

### 4. DNS 不工作

可能原因：
- MagicDNS 未启用
- DNS 冲突

解决方法：
- `tailscale up --magic-dns`
- 检查系统 DNS 设置

## 价格

### 个人版（免费）

- 最多 3 个设备
- 基本功能
- 适合个人使用

### 家庭版（$12/月）

- 最多 20 个设备
- 更多高级功能
- 家庭共享

### 商业版

- 无限设备
- ACL 管理
- 优先支持

## 总结

Tailscale 将复杂的 VPN 技术简化为人人可用的工具，特别适合：

- 技术爱好者快速搭建私人网络
- 中小企业安全互联
- 远程办公场景
- 开发者协作环境

它让「安全的设备互联」变得像安装一个 App 一样简单，是现代网络不可或缺的工具。

## 参考资料

- Tailscale 官网：https://tailscale.com/
- Tailscale 文档：https://tailscale.com/kb/
- WireGuard 官网：https://www.wireguard.com/

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/tailscale-usage/  

