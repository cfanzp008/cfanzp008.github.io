# CC-Switch CLI - AI CLI 工具统一管理工具


# CC-Switch CLI - AI CLI 工具统一管理工具

## 简介

CC-Switch CLI 是一个跨平台的命令行工具，用于统一管理 Claude Code、Codex、Gemini CLI、OpenCode 和 OpenClaw 的配置。它让用户可以轻松地在不同 AI CLI 工具和提供商之间切换。

> GitHub: https://github.com/farion1231/cc-switch
> Stars: 40,000+ | Forks: 2,500+

## 支持的 CLI 工具

- **Claude Code** - Anthropic AI 编程助手
- **Codex** - OpenAI Codex
- **Gemini CLI** - Google Gemini 命令行
- **OpenCode** - 国产 AI 编程助手
- **OpenClaw** - OpenCode 桌面版

## 核心功能

### Provider 管理

- 50+ 预设提供商
- 一键复制 API Key 导入
- 自定义 API 端点配置
- 代理设置支持

### MCP 服务器管理

- MCP 服务器同步
- 一键安装/卸载
- 自定义配置

### Skills 管理

- 从 GitHub 仓库一键安装
- ZIP 文件安装
- 自定义仓库管理

### 提示词库

- 提示词保存和复用
- 跨工具同步

## 安装

### 一键安装（推荐）

```bash
curl -fsSL https://github.com/farion1231/cc-switch/releases/latest/download/install.sh | bash
```

### Homebrew 安装

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

### 手动下载

从 [Releases](https://github.com/farion1231/cc-switch/releases) 下载对应平台的压缩包。

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/farion1231/cc-switch.git
cd cc-switch/src-tauri

# 构建
cargo build --release

# 安装
cp target/release/cc-switch /usr/local/bin/
```

## 使用

### 交互模式

直接运行打开交互式界面：

```bash
cc-switch
```

### 命令行模式

```bash
# 列出所有提供商
cc-switch provider list

# 切换提供商
cc-switch provider switch <id>

# 同步 MCP 服务器
cc-switch mcp sync

# 检查环境中的 CLI 工具
cc-switch env tools

# 生成 Shell 补全
cc-switch completions bash
```

## 配置文件

- 数据存储：`~/.cc-switch/cc-switch.db`
- 配置文件：`~/.cc-switch/config.json`
- MCP 配置：`~/.cc-switch/mcp-servers/`
- Skills 配置：`~/.cc-switch/skills/`

## 特色功能

### 代理支持

- 反向代理配置
- 支持 GitHub Copilot、Claude、Codex OAuth

### 主题切换

- 浅色/深色/跟随系统

### 多语言

- 英文 / 中文 / 日文

### 自动备份

- 切换前自动备份
- 保留最近 20 个备份

## 总结

CC-Switch 是管理 AI CLI 工具的利器，特别适合需要同时使用多个 AI 编程助手的开发者。通过统一界面，可以轻松地在不同工具和配置之间切换。

**项目地址：** https://github.com/farion1231/cc-switch

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/cc-switch-cli-usage-guide/  

