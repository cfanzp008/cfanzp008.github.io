# RustDesk：开源远程桌面解决方案


# RustDesk：开源远程桌面解决方案

## 什么是 RustDesk

RustDesk 是一个用 Rust 语言编写的开源远程桌面软件，旨在为用户提供一个安全、可靠且可自托管的远程访问解决方案。它可以完美替代 TeamViewer、AnyDesk、Splashtop 等商业远程桌面工具。

该项目在 GitHub 上已获得 106,000+ 颗星，拥有超过 3000 万次客户端下载和 1000 万次 Docker 下载，是目前最受欢迎的开源远程桌面项目之一。

## 核心特性

### 1. 开源免费

- 完全开源，可以免费使用
- 代码透明，无后门
- 社区活跃，持续更新

### 2. 自托管部署

- 可以部署自己的服务器
- 数据完全可控
- 无需依赖第三方服务

### 3. 跨平台支持

- Windows
- macOS
- Linux
- Android
- iOS（通过 Web 客户端）

### 4. 高性能

- 使用 Rust 编写，性能优异
- 低延迟、高帧率
- 支持多种编码器

### 5. 企业级功能（Pro 版本）

- 用户级 ACL
- 设备分组管理
- 自定义品牌
- 90+ 配置选项

## 快速开始

### 方式一：直接使用（无需自托管）

如果你只是需要远程访问，可以直接下载客户端：

1. 访问 [GitHub Releases](https://github.com/rustdesk/rustdesk/releases/latest)
2. 下载对应平台的安装包
3. 安装并运行

客户端会自动连接到 RustDesk 的公共服务器，可以直接通过 ID 进行连接。

### 方式二：自托管服务器

如果你需要更好的隐私和可控性，可以部署自己的服务器。

#### 步骤 1：安装 Docker

```bash
bash <(wget -qO- https://get.docker.com)
```

#### 步骤 2：下载配置文件

```bash
# 开源版
wget rustdesk.com/oss.yml -O compose.yml

# Pro 版
wget rustdesk.com/pro.yml -O compose.yml
```

#### 步骤 3：启动服务

```bash
docker compose up -d
```

服务器默认监听以下端口：

- 21116：TCP - ID/Rendezvous 服务器
- 21117：TCP - NAT 类型测试
- 21118：TCP - 中继服务器
- 21119：TCP - WebSocket
- 21115：UDP - 局域网发现

### 客户端配置

修改客户端的设置，指向你的自托管服务器：

```
设置 → 网络 → 自定义服务器
```

输入你的服务器地址即可。

## 基本使用方法

### 1. 获取设备 ID

安装并运行 RustDesk 后，每个设备都有一个唯一的 ID。

### 2. 远程连接

```bash
# 方式一：使用 ID 直接连接
rustdesk://123456789

# 方式二：通过客户端界面
# 输入对方 ID → 点击连接 → 输入密码
```

### 3. 传输文件

- 左侧菜单点击"文件"
- 选择要传输的文件
- 支持拖拽上传

### 4. 远程打印

配置后可以直接使用本地打印机。

### 5. 语音通话

支持低延迟语音通话。

## 命令行参数

```bash
# 指定自定义服务器
rustdesk --server 192.168.1.100:21116

# 指定中继服务器
rustdesk --relay 192.168.1.100:21118

# 静默启动
rustdesk --silent

# 查看帮助
rustdesk --help
```

## 安全配置

### 1. 设置密码

```
设置 → 安全 → 设备密码
```

### 2. IP 白名单

在服务器配置中设置允许的 IP 列表。

### 3. 加密连接

RustDesk 默认使用加密传输，确保数据安全。

## 性能优化

### 1. 编码器选择

- **AV1**：最高画质，最低带宽（推荐）
- **H.264**：兼容性最好
- **RAW**：最低延迟

### 2. 帧率设置

根据网络状况调整帧率：

- 网络良好：60 FPS
- 网络一般：30 FPS
- 网络较差：15 FPS

### 3. 分辨率

可以手动调整远程桌面分辨率以优化性能。

## 常见问题

### 1. 连接不上

- 检查防火墙是否放行相应端口
- 确认服务器是否正常运行
- 检查网络是否可达

### 2. 延迟高

- 尝试使用中继服务器
- 选择更靠近的服务器
- 检查网络质量

### 3. 无法发现设备

- 确保在同一网络或通过 ID 连接
- 检查 NAT 类型

### 4. 需要获得管理员权限

Linux 上运行：

```bash
sudo rustdesk
```

## 使用场景

根据 RustDesk 官方调查，自托管用户的使用场景分布：

| 场景 | 占比 |
|-----|------|
| IT 支持 | 37% |
| 远程办公 | 29% |
| IT 运维 | 25% |
| 工业及其他 | 9% |

## 对比商业方案

| 特性 | RustDesk | TeamViewer | AnyDesk |
|-----|----------|------------|---------|
| 价格 | 免费/开源 | 昂贵 | 中等 |
| 自托管 | ✅ | ❌ | ❌ |
| 跨平台 | ✅ | ✅ | ✅ |
| 开源 | ✅ | ❌ | ❌ |
| 隐私 | ✅ | ⚠️ | ⚠️ |

## 总结

RustDesk 是一个功能强大且完全免费的开源远程桌面解决方案。它适合：

- **个人用户**：需要远程协助或远程办公
- **中小企业**：需要安全可控的远程支持方案
- **IT 专业人员**：需要灵活的工具进行远程维护

如果你厌倦了商业远程桌面软件的各种限制和高昂费用，RustDesk 是一个值得尝试的选择。

## 参考链接

- GitHub：https://github.com/rustdesk/rustdesk
- 官网：https://rustdesk.com/
- 官方文档：https://rustdesk.com/docs/
- 论坛：https://github.com/rustdesk/rustdesk/discussions
- Discord：https://discord.gg/nDceKgxnkV
- Reddit：https://www.reddit.com/r/rustdesk/

> ⚠️ 注意：请仅从 rustdesk.com 和 GitHub 官方仓库下载软件，谨防仿冒站点。

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/rustdesk-introduction/  

