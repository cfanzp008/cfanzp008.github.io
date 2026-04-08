# Another Redis Desktop Manager：更快更好更稳定的 Redis 桌面客户端


# Another Redis Desktop Manager：更快更好更稳定的 Redis 桌面客户端

## 引言

Redis 作为最流行的内存数据库之一，在现代应用开发中扮演着重要角色。然而，选择一款好用的 Redis 客户端管理工具却并不容易。常见的 Redis 桌面客户端要么功能单一，要么在处理大量数据时容易崩溃。今天给大家介绍一款由国人开发的开源 Redis 桌面管理工具——Another Redis Desktop Manager，它以「更快、更好、更稳定」为目标，在 GitHub 上已收获 **34,000+ 颗星**，广受开发者好评。

## 什么是 Another Redis Desktop Manager

Another Redis Desktop Manager 是一款现代化、轻量级的跨平台 Redis 桌面客户端，由国内开发者 qishibo 开发并维护。该项目最初于 2019 年开源，旨在为开发者提供一个更快、更好、更稳定的 Redis 可视化管理工具。

与传统的 Redis 客户端相比，Another Redis Desktop Manager 具有以下显著优势：

- **跨平台支持**：完美兼容 Linux、Windows 和 macOS 系统
- **稳定可靠**：经过大量实际项目验证，在处理大量数据时也不会轻易崩溃
- **功能丰富**：支持集群、哨兵、SSL 认证等高级特性
- **完全免费**：开源免费，无需付费即可使用全部功能

## 核心功能特性

### 1. 多连接管理

Another Redis Desktop Manager 支持同时管理多个 Redis 连接，你可以：

- 轻松添加、编辑、删除 Redis 连接
- 支持 SSH 隧道连接
- 保存连接密码，下次自动填充
- 支持连接分组，便于项目管理

### 2. 完善的键值操作

支持 Redis 所有数据结构的可视化管理：

- **String**：字符串类型，支持 JSON、XML 等格式化显示
- **Hash**：哈希表，可视化展示字段和值
- **List**：列表，支持列表操作
- **Set**：集合，支持集合操作
- **ZSet**：有序集合，支持分数排序查看
- **Stream**：流类型支持

### 3. 树状视图浏览

采用树状结构展示 Redis 键值，让键值管理更加清晰有序：

- 支持按前缀分组显示
- 支持键值搜索和过滤
- 支持批量操作键值

### 4. 集群和哨兵支持

对企业级应用提供了完善的支持：

- **Redis Cluster**：完整支持集群模式，包括槽查看、节点管理等
- **Redis Sentinel**：支持哨兵模式，自动故障转移
- **主从复制**：支持主从查看和管理

### 5. 安全特性

- **SSL/TLS 加密连接**：支持基于 SSL 的安全连接
- **密码认证**：支持密码认证和 ACL 认证
- **SSH 隧道**：支持通过 SSH 隧道连接 Redis

### 6. 自定义格式化

Another Redis Desktop Manager 允许用户编写自定义格式化脚本：

- 支持 JavaScript 脚本
- 可以自定义 JSON、XML 等数据的展示格式
- 满足个性化需求

### 7. 数据导入导出

- 支持导出 Redis 数据为 JSON 格式
- 支持从文件导入数据到 Redis
- 方便数据备份和迁移

### 8. 控制台命令

内置 Redis 控制台，可以直接执行 Redis 命令：

- 支持命令自动补全
- 支持命令历史记录
- 支持执行结果格式化显示

## 下载安装

### 官方下载（推荐）

从 GitHub Releases 页面下载最新版本：

- **GitHub Releases**：https://github.com/qishibo/AnotherRedisDesktopManager/releases

### Windows 安装

#### MSI 安装包（推荐）

```bash
# 访问以下地址下载 MSI 安装包
https://github.com/qishibo/AnotherRedisDesktopManager/releases/latest
```

#### Winget 安装

如果你使用 Windows 包管理器，可以使用 winget 安装：

```bash
winget install -e --id qishibo.AnotherRedisDesktopManager
```

#### 便携版

也可以下载便携版（ZIP 格式），解压后直接运行：

```bash
# 下载后解压到任意目录，运行 .exe 文件即可
```

### macOS 安装

#### Homebrew 安装

```bash
brew install another-redis-desktop-manager
```

#### DMG 安装包

从 Releases 页面下载 .dmg 文件，拖入应用程序目录即可。

### Linux 安装

#### DEB 包（Debian/Ubuntu）

```bash
# 下载 DEB 包后执行
sudo dpkg -i Another-Redis-Desktop-Manager-x.x.x.deb
```

#### RPM 包（CentOS/RHEL）

```bash
# 下载 RPM 包后执行
sudo rpm -ivh Another-Redis-Desktop-Manager-x.x.x.rpm
```

#### AppImage（通用）

```bash
# 下载 AppImage 文件，添加执行权限后运行
chmod +x Another-Redis-Desktop-Manager-x.x.x.AppImage
./Another-Redis-Desktop-Manager-x.x.x.AppImage
```

### 其他下载渠道

- **SourceForge**：https://sourceforge.net/projects/another-redis-desktop.mirror/
- **Softonic**：https://another-redis-desktop-manager.en.softonic.com/

## 使用教程

### 首次连接 Redis

1. 点击左侧「连接」面板的「+」按钮
2. 填写连接信息：
   - 连接名称（自定义）
   - Host（Redis 服务器地址）
   - Port（默认 6379）
   - 密码（如有）
   - 数据库编号（默认 0）
3. 点击「测试连接」确认配置正确
4. 点击「确定」保存连接

### 浏览键值

连接成功后，在左侧会显示键值列表：

- 点击数据库节点展开键值树
- 支持搜索框过滤键值
- 点击键值查看详情

### 编辑键值

在键值详情面板可以：

- 查看键值的类型和 TTL
- 编辑键值内容
- 设置键值的过期时间
- 删除键值

### 执行 Redis 命令

点击顶部的「控制台」按钮，打开命令执行面板：

- 输入 Redis 命令
- 点击执行或按 Enter
- 查看返回结果

## 与其他 Redis 客户端对比

| 特性 | Another Redis Desktop Manager | Redis Desktop Manager | RedisInsight |
|-----|-------------------------------|----------------------|--------------|
| 开源免费 | ✅ | ❌（部分功能收费） | ✅ |
| 跨平台 | ✅ | ✅ | ✅ |
| 集群支持 | ✅ | 有限 | ✅ |
| 哨兵支持 | ✅ | 有限 | ✅ |
| SSL 支持 | ✅ | ✅ | ✅ |
| 自定义格式化 | ✅ | ❌ | 有限 |
| 树状视图 | ✅ | ✅ | ❌ |
| SSH 隧道 | ✅ | ❌ | ❌ |
| GitHub Stars | 34K+ | 28K+ | 12K+ |

## 适用场景

Another Redis Desktop Manager 适用于以下场景：

1. **开发调试**：开发过程中快速查看和修改 Redis 数据
2. **运维管理**：运维人员管理生产环境 Redis
3. **数据分析**：查看和分析 Redis 中的缓存数据
4. **教学演示**：用于 Redis 学习和教学
5. **企业使用**：企业级 Redis 集群管理

## 总结

Another Redis Desktop Manager 是一款功能强大、稳定可靠的 Redis 桌面客户端。它由国人开发，中文界面友好，文档完善，社区活跃。无论是个人开发者还是企业用户，都能从中获得良好的使用体验。

如果你正在寻找一款好用的 Redis 管理工具，Another Redis Desktop Manager 绝对值得一试。它不仅完全免费，而且功能完全不逊色于商业软件，甚至还支持一些商业软件都没有的功能（如 SSH 隧道、自定义格式化等）。

## 参考链接

- GitHub 仓库：https://github.com/qishibo/AnotherRedisDesktopManager
- Releases 下载：https://github.com/qishibo/AnotherRedisDesktopManager/releases

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/another-redis-desktop-manager/  

