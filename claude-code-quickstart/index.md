# Claude Code 快速入门指南


# Claude Code 快速入门指南

## 什么是 Claude Code

Claude Code 是 Anthropic 推出的 AI 编程 CLI 工具。它可以直接在终端中运行，帮助开发者：

- 自动编写代码
- 修复 Bug
- 阅读大型代码库
- 自动生成脚本
- 分析项目结构

## 系统要求

- macOS 13.0+ / Windows 10+ / Ubuntu 20.04+
- Node.js 18+（可选，原生安装不需要）

## 安装

### macOS / Linux（推荐）

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows PowerShell

```powershell
irm https://claude.ai/install.ps1 | iex
```

### 验证安装

```bash
claude --version
```

## 配置国内使用

由于网络原因，国内使用需要配置 API Key 和代理。

### 方法一：配置环境变量

```bash
# 方式一：使用 API Key
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# 方式二：使用第三方中转
export ANTHROPIC_API_KEY=your-key
export ANTHROPIC_BASE_URL=https://your-proxy-url.com
```

### 方法二：使用中转服务

可使用 Claude Router 等工具管理多提供商配置。

## 启动

```bash
# 进入项目目录
cd your-project

# 启动 Claude Code
claude
```

## 基本命令

| 命令 | 说明 |
|------|------|
| `claude` | 启动交互模式 |
| `claude --version` | 查看版本 |
| `claude whoami` | 检查登录状态 |
| `claude doctor` | 诊断问题 |
| `/init` | 初始化项目 |
| `/exit` | 退出 |

## CLAUDE.md 文件

在项目根目录创建 `CLAUDE.md` 文件，可以为 Claude 提供持久的项目上下文和指令。

```markdown
# 项目配置

## 技术栈
- React 18
- TypeScript
- Vite

## 构建命令
npm run dev
```

## 常用 Slash 命令

- `/init` - 初始化项目
- `/doctor` - 运行诊断
- `/install-github-app` - 安装 GitHub 集成
- `/exit` - 退出

## Skills

Claude Code 支持 Skills 扩展，可以从 GitHub 仓库一键安装常用技能。

## 总结

Claude Code 是强大的 AI 编程助手，通过终端直接与 AI 协作完成开发任务。国内使用需要配置代理或中转服务。

**官网：** https://claude.ai/code

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/claude-code-quickstart/  

