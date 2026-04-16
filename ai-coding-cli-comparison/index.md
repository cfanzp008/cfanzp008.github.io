# 三大 AI 编程 CLI 工具对比：Codex CLI vs Claude Code vs OpenCode


# 三大 AI 编程 CLI 工具对比：Codex CLI vs Claude Code vs OpenCode

## 前言

AI 编程助手已经成为开发者日常工具链的重要组成部分。本文将对三款主流终端 AI 编程工具进行深度对比：

- **Codex CLI** - OpenAI 官方出品
- **Claude Code** - Anthropic 官方出品
- **OpenCode** - 开源社区之作

## 基础信息对比

| 特性 | Codex CLI | Claude Code | OpenCode |
|------|----------|------------|----------|
| 开发公司 | OpenAI | Anthropic | 开源社区 |
| GitHub Stars | 75,000+ | - | 120,000+ |
| 语言 | Rust | - | Go |
| 开源 | 部分开源 | 否 | 完全开源 |
| 安装量 | npm | npm | 多方式 |

## 安装与配置

### Codex CLI

```bash
# npm 安装
npm install -g @openai/codex

# Homebrew
brew install --cask codex
```

### Claude Code

```bash
# 官方安装脚本
curl -fsSL https://claude.ai/install.sh | bash

# npm（已废弃）
npm install -g @anthropic-ai/claude-code
```

### OpenCode

```bash
# 一键安装
curl -fsSL https://opencode.ai/install | bash

# Homebrew
brew install anomalyco/tap/opencode

# npm
npm install -g opencode-ai

# Go
go install github.com/opencode-ai/opencode@latest
```

## 模型支持

### Codex CLI

- 默认使用 OpenAI GPT-5-Codex
- 支持切换不同 GPT 模型
- 需要 OpenAI API 或 ChatGPT 账号

### Claude Code

- 默认使用 Claude Sonnet 4
- 支持 Opus 4、Haiku 等
- 需要 Anthropic API 或 Claude 账号

### OpenCode

- **最大优势**：支持 75+ 模型提供商
- OpenAI、Anthropic、Google Gemini
- 支持本地模型（Ollama）
- 支持 GitHub Copilot
- 可用免费模型（GLM-4.7、MiniMax 等）

## 操作模式对比

三款工具都提供三级审批模式：

| 模式 | Codex CLI | Claude Code | OpenCode |
|------|-----------|------------|----------|
| 建议模式 | suggest | suggest | - |
| 半自动 | auto-edit | auto-edit | - |
| 全自动 | full-auto | auto-execute | - |

## 核心功能对比

### MCP 支持

| 工具 | MCP 支持 | 说明 |
|------|---------|------|
| Codex CLI | ✅ | 仅支持 stdio 类型 |
| Claude Code | ✅ | 完整支持 |
| OpenCode | ✅ | 原生集成 |

### Skills 技能

| 工具 | Skills | 说明 |
|------|--------|------|
| Codex CLI | ❌ | 不支持 |
| Claude Code | ✅ | GitHub 一键安装 |
| OpenCode | ✅ | 自定义 Skills |

### 记忆文件

| 工具 | CLAUDE.md | 说明 |
|------|-----------|------|
| Codex CLI | ✅ | 项目级 |
| Claude Code | ✅ | 支持多层级 |
| OpenCode | ✅ | AGENTS.md |

### 平台支持

| 平台 | Codex CLI | Claude Code | OpenCode |
|------|-----------|------------|----------|
| macOS | ✅ | ✅ | ✅ |
| Linux | ✅ | ✅ | ✅ |
| Windows | WSL2 | ✅ | ✅ |
| 桌面应用 | ❌ | ❌ | ✅ Beta |
| Web 界面 | ❌ | ❌ | ✅ |

## 特色功能

### Codex CLI 特色

- **Rust 实现**：速度快、资源占用低
- **轻量级**：专注于 CLI 体验
- **OpenAI 生态**：与 ChatGPT 无缝集成

### Claude Code 特色

- **Skills 生态**：丰富的预置技能库
- **多层级记忆**：CLAUDE.md、CLAUDE.local.md
- **深度代码理解**：Claude 的推理能力
- **VS Code 插件**：IDE 集成

### OpenCode 特色

- **完全开源**：代码透明可审计
- **模型自由**：不绑定任何提供商
- **多会话**：同一项目多个并行代理
- **分享链接**：会话可分享
- **GitHub Agent**：内置 DevOps 能力
- **远程控制**：服务器/TUI 分离
- **免费模型**：支持 GLM-4.7 等免费模型

## 配置对比

### 配置文件位置

| 工具 | 全局配置 | 项目配置 |
|------|---------|----------|
| Codex CLI | `~/.codex/config.toml` | `.codex/config.toml` |
| Claude Code | `~/.claude/settings.json` | `CLAUDE.md` |
| OpenCode | `~/.config/opencode/opencode.json` | `opencode.json` |

### 环境变量

```bash
# Codex CLI
export OPENAI_API_KEY=xxx
export OPENAI_BASE_URL=https://xxx

# Claude Code
export ANTHROPIC_API_KEY=xxx
export ANTHROPIC_BASE_URL=https://xxx

# OpenCode - 支持多种 Provider
export OPENAI_API_KEY=xxx
export ANTHROPIC_API_KEY=xxx
export GOOGLE_GENERATIVE_AI_API_KEY=xxx
```

## 使用场景推荐

### 推荐 Codex CLI

- ✅ 已订阅 ChatGPT Plus/Pro
- ✅ 习惯 OpenAI 生态
- ✅ 需要轻量级 CLI 工具
- ✅ 主要使用 GPT 模型

### 推荐 Claude Code

- ✅ 已订阅 Claude
- ✅ 需要 Skills 扩展
- ✅ 深度代码理解需求
- ✅ VS Code 用户

### 推荐 OpenCode

- ✅ 追求开源透明
- ✅ 需要模型灵活性
- ✅ 想用免费模型
- ✅ 需要 GitHub Agent
- ✅ 需要远程控制
- ✅ 多模型并行使用

## 性能对比

| 指标 | Codex CLI | Claude Code | OpenCode |
|------|-----------|------------|----------|
| 启动速度 | 快 | 中 | 快 |
| 内存占用 | 低 | 中 | 低 |
| 响应速度 | 快 | 中 | 快 |

## 总结

三款工具各有特色，选择取决于你的需求：

| 需求 | 推荐工具 |
|------|---------|
| OpenAI 生态 | Codex CLI |
| Claude 生态 | Claude Code |
| 模型自由 | OpenCode |
| 完全开源 | OpenCode |
| 免费使用 | OpenCode |
| GitHub 集成 | OpenCode |
| Skills 生态 | Claude Code |

**实际建议**：可以同时安装使用，根据不同场景选择最合适的工具。

**项目地址**：
- Codex CLI: https://github.com/openai/codex
- Claude Code: https://claude.ai/code
- OpenCode: https://opencode.ai

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/ai-coding-cli-comparison/  

