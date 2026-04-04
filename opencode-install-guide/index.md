# OpenCode AI 编程助手安装指南


# OpenCode AI 编程助手安装指南

## 背景

OpenCode 是一个开源的 AI 编程助手，可以在终端、桌面应用或 IDE 扩展中使用。它支持多种 LLM 提供商，包括 Claude、GPT、Gemini 等，也可以使用免费的内置模型。

OpenCode 拥有超过 12 万 GitHub Star、800 位贡献者和超过 1 万次提交，每月被超过 500 万开发者使用。

本文将详细介绍 OpenCode 在不同操作系统上的安装方法。

## 系统要求

### 前置条件

使用 OpenCode 终端版本需要满足以下条件：

1. **终端模拟器**：推荐使用现代终端，如：
   - [WezTerm](https://wezterm.org) - 跨平台
   - [Alacritty](https://alacritty.org) - 跨平台
   - [Ghostty](https://ghostty.org) - Linux 和 macOS
   - [Kitty](https://sw.kovidgoyal.net/kitty/) - Linux 和 macOS

2. **LLM 提供商的 API Key**：根据你选择的模型提供商，需要准备相应的 API Key

## Linux/macOS 安装

### 方式一：一键安装脚本（推荐）

这是最简单的安装方式，运行以下命令即可：

```bash
curl -fsSL https://opencode.ai/install | bash
```

### 方式二：使用 Node.js 包管理器

如果你已经安装了 Node.js，可以使用以下任意一个包管理器：

```bash
# 使用 npm 安装
npm install -g opencode-ai

# 使用 bun 安装
bun install -g opencode-ai

# 使用 pnpm 安装
pnpm install -g opencode-ai

# 使用 yarn 安装
yarn global add opencode-ai
```

### 方式三：使用 Homebrew（macOS/Linux）

```bash
brew install anomalyco/tap/opencode
```

> 注意：推荐使用 OpenCode 的官方 Homebrew tap 以获取最新版本。官方 `brew install opencode` formula 更新频率较低。

### 方式四：Arch Linux

Arch Linux 用户可以使用 pacman 或 AUR 安装：

```bash
# 稳定版
sudo pacman -S opencode

# AUR 最新版
paru -S opencode-bin
```

## Windows 安装

### 方式一：使用 WSL（推荐）

对于 Windows 用户，推荐使用 **Windows Subsystem for Linux (WSL)**，可以获得最佳体验和完全的兼容性。

首先安装 WSL：

```powershell
wsl --install
```

然后在 WSL 中按照 Linux 安装方式安装 OpenCode。

### 方式二：使用 Chocolatey

```bash
choco install opencode
```

### 方式三：使用 Scoop

```bash
scoop install opencode
```

### 方式四：使用 NPM

```bash
npm install -g opencode-ai
```

### 方式五：使用 Mise

```bash
mise use -g github:anomalyco/opencode
```

### 方式六：使用 Docker

如果你有 Docker 环境，也可以使用容器运行：

```bash
docker run -it --rm ghcr.io/anomalyco/opencode
```

### 方式七：直接下载二进制文件

你也可以从 GitHub Releases 页面直接下载预编译的二进制文件：

- [OpenCode GitHub Releases](https://github.com/anomalyco/opencode/releases)

## 配置 API Key

安装完成后，需要配置 LLM 提供商的 API Key。

### 方式一：使用 OpenCode Zen（推荐新手）

OpenCode Zen 是 OpenCode 团队精选和测试过的 AI 模型列表，适合新手使用。

1. 在 TUI 中运行以下命令：

```bash
/opencode
/opencode.ai/connect
```

2. 登录并添加账单信息，然后复制 API Key

### 方式二：使用其他 LLM 提供商

OpenCode 支持多种 LLM 提供商，你可以选择其中一个：

1. 运行连接命令：

```bash
/connect
```

2. 选择你想要的提供商
3. 输入对应的 API Key

支持的提供商包括：
- Claude（Anthropic）
- GPT（OpenAI）
- Gemini（Google）
- Models.dev 上的 75+ LLM 提供商
- 本地模型
- GitHub Copilot

## 初始化项目

配置好 API Key 后，就可以开始使用 OpenCode 了。

### 步骤 1：进入项目目录

```bash
cd /path/to/project
```

### 步骤 2：启动 OpenCode

```bash
opencode
```

### 步骤 3：初始化项目

运行以下命令让 OpenCode 分析项目结构：

```bash
/init
```

这会在项目根目录创建一个 `AGENTS.md` 文件，帮助 OpenCode 理解项目结构和编码规范。

> **提示**：建议将 `AGENTS.md` 文件提交到 Git 仓库，这样可以确保 OpenCode 始终了解项目的最新状态。

## 基本使用

### 询问问题

你可以让 OpenCode 解释代码：

```bash
How is authentication handled in @packages/functions/src/api/index.ts
```

使用 `@` 键可以模糊搜索项目中的文件。

### 添加功能

推荐先让 OpenCode 制定计划，然后再实现：

1. **切换到计划模式**：按 `Tab` 键禁用自动修改功能
2. **描述需求**：详细说明你想要的功能
3. **审核计划**：根据 OpenCode 提供的计划提出反馈
4. **切换回构建模式**：再次按 `Tab` 键
5. **执行计划**：让 OpenCode 开始实现

### 直接修改代码

对于简单的修改，可以直接让 OpenCode 执行：

```bash
Can you add authentication to the /settings route? Take a look at how this is handled in the /notes route and implement the same logic.
```

### 撤销更改

如果对修改不满意，可以使用以下命令撤销：

```bash
/undo
```

OpenCode 会恢复所有更改并重新显示你的原始请求。

## 共享会话

你可以将对话分享给团队成员：

```bash
/share
```

这会创建一个链接并复制到剪贴板。注意：对话默认不会自动共享。

## 常见问题

### Q: 安装后找不到命令？

确保将 Node.js 全局 bin 目录添加到 PATH 中，或者重新加载终端配置：

```bash
source ~/.bashrc  # 或
source ~/.zshrc
```

### Q: API Key 配置失败？

检查以下几点：
1. API Key 是否正确复制
2. API Key 是否有足够的配额
3. 网络是否能访问 LLM 提供商

### Q: Docker 方式运行有什么限制？

Docker 方式无法访问本地文件，适合测试和快速体验。

## 总结

OpenCode 是一个强大的 AI 编程助手，安装简单，配置灵活。通过本文的指南，你应该已经成功安装并配置好了 OpenCode。

建议下一步：
- 选择一个喜欢的主题
- 自定义快捷键
- 配置代码格式化工具
- 创建自定义命令

### 延伸阅读

- [OpenCode 官方文档](https://opencode.ai/docs)
- [OpenCode GitHub](https://github.com/anomalyco/opencode)
- [OpenCode Discord 社区](https://opencode.ai/discord)


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/opencode-install-guide/  

