# Hermes Agent 深度用法指南：自我进化的 AI 智能体完全手册


# Hermes Agent 深度用法指南：自我进化的 AI 智能体完全手册

## 背景简介

Hermes Agent 是由 Nous Research 开发的开源 AI 智能体，被称为"会成长的智能体"（The agent that grows with you）。截至目前，其 GitHub 仓库已获得超过 **33000 颗星**，是当前最受欢迎的自进化 AI 智能体之一。

与传统的 AI 助手不同，Hermes Agent 具备：
- **内置学习循环**：从经验中创建 Skills，持续自我改进
- **持久记忆**：跨会话记住重要信息，建立用户模型
- **多平台运行**：本地、SSH、Docker、云端皆可运行
- **完全开源**：MIT 许可证，社区活跃

## 思维导图：Hermes Agent 核心架构

```
                         ┌─────────────────────────────────────────┐
                         │       Hermes Agent 核心架构           │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│     运行模式         │        │     核心系统         │        │     接入平台        │
│                     │        │                     │        │                     │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─CLI 终端                        ├─Skills 系统                   ├─Telegram
          ├─Gateway 网关                   ├─Memory 记忆                   ├─Discord
          ├─本地运行                       ├─MCP 集成                     ├─Slack
          ├─SSH 远程                       ├─工具集                       ├─WhatsApp
          └─Docker/云端                    ├─计划任务                     └─Email
                                           │
                                           ▼
                              ┌─────────────────────────────────┐
                              │        模型支持                 │
                              ├─────────────────────────────────┤
                              │ • Nous Portal                  │
                              │ • OpenRouter (200+ 模型)       │
                              │ • OpenAI / Anthropic          │
                              │ • Kimi / MiniMax / GLM        │
                              │ • 本地 Ollama                  │
                              └─────────────────────────────────┘
```

## 安装与配置

### 快速安装

```bash
# 一键安装（Linux/macOS/WSL2）
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 加载环境
source ~/.bashrc  # 或 source ~/.zshrc

# 启动交互式 CLI
hermes
```

### 初始化配置

```bash
# 运行完整配置向导
hermes setup

# 配置模型提供商
hermes model                    # 选择 LLM

# 配置工具集
hermes tools                   # 启用/禁用工具

# 设置单个配置项
hermes config set MODEL_PROVIDER openrouter
hermes config set OPENROUTER_API_KEY xxx
```

### 环境变量配置

```bash
# .env 配置示例
MODEL_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-xxx
DEFAULT_MODEL=anthropic/claude-3.5-sonnet

# Telegram 配置
TELEGRAM_BOT_TOKEN=xxx

# Discord 配置
DISCORD_BOT_TOKEN=xxx
DISCORD_APP_ID=xxx
```

## CLI 命令详解

### 常用命令

| 命令 | 功能 |
|------|------|
| `hermes` | 启动交互式 CLI |
| `hermes model` | 选择/切换模型 |
| `hermes tools` | 配置工具集 |
| `hermes config set` | 设置配置项 |
| `hermes gateway` | 启动消息网关 |
| `hermes setup` | 运行配置向导 |
| `hermes update` | 更新版本 |
| `hermes doctor` | 诊断问题 |

### 斜杠命令（交互式）

| 命令 | 功能 |
|------|------|
| `/new` 或 `/reset` | 开始新对话 |
| `/model [provider:model]` | 切换模型 |
| `/personality [name]` | 设置人格 |
| `/retry` | 重试上一条 |
| `/undo` | 撤销上一条 |
| `/compress` | 压缩上下文 |
| `/usage` | 查看使用量 |
| `/skills` | 浏览技能库 |
| `/stop` | 停止当前任务 |

## Gateway 网关配置

Hermes Agent 支持多平台消息接入，无需一直在终端运行。

### 支持平台

- **Telegram** - 最常用
- **Discord** - 社区首选
- **Slack** - 企业集成
- **WhatsApp** - 个人通讯
- **Signal** - 隐私通讯
- **Email** - 邮件通知

### 配置示例

```bash
# 启动网关设置向导
hermes gateway setup

# 启动网关服务
hermes gateway start

# 查看运行状态
hermes gateway status
```

### 配置 Telegram Bot

1. 在 Telegram 中搜索 @BotFather
2. 创建新机器人，获取 Token
3. 运行配置：
```bash
hermes gateway setup
# 选择 Telegram，粘贴 Token
hermes gateway start
```

## Skills 系统（核心特性）

Skills 是 Hermes Agent 最强大的特性——让 Agent 能够自我进化。

### 什么是 Skills

Skill 是一段可复用的工作流封装，包含：
- 执行步骤说明
- 触发条件
- 使用示例
- 工具集配置

### 使用 Skills

```bash
# 浏览可用 Skills
/skills

# 使用特定 Skill
/<skill-name>

# 查看 Skill 详情
/hermes-skills
```

### 自动创建 Skill

当 Agent 完成复杂任务后，它会：
1. 分析任务模式
2. 提取可复用的步骤
3. 创建新 Skill
4. 保存到技能库

### 技能类型

| 类型 | 说明 |
|------|------|
| 核心技能 | 内置必需技能 |
| 可选技能 | 可按需启用 |
| 用户技能 | 自定义创建 |
| 社区技能 | agentskills.io 共享 |

## Memory 记忆系统

### 记忆类型

1. **会话记忆**：当前对话上下文
2. **持久记忆**：跨会话的重要信息
3. **用户模型**（Honcho）：用户偏好分析
4. **会话搜索**（FTS5）：跨会话搜索

### 记忆管理

```bash
# 手动保存重要记忆
# 对 Hermes 说："记住这个重要信息..."

# 查看记忆
# 使用 /memories 命令或查看 ~/.hermes/memory/

# 清理记忆
hermes memory clear
```

### 最佳实践

- 明确告知需要记忆的内容
- 定期检查和整理记忆
- 使用用户画像功能

## MCP 集成

Hermes Agent 支持连接任何 MCP 服务器，扩展能力。

### 添加 MCP 服务器

```bash
# 使用 MCP 配置命令
hermes mcp add <server-name>

# 或在配置文件中添加
```

### 常用 MCP 服务

- **文件系统** - 文件操作
- **GitHub** - 代码管理
- **数据库** - SQL 查询
- **Puppeteer** - 浏览器自动化
- **自定义** - 自己开发的 MCP

## 工具集（Toolsets）

Hermes Agent 内置 40+ 工具，涵盖：

| 类别 | 工具 |
|------|------|
| 文件操作 | read, write, edit, glob, grep |
| Git 操作 | git status, git commit, git push |
| 终端命令 | bash, run |
| 代码执行 | python, node |
| Web 搜索 | ddg, wikipedia |
| API 调用 | http request |

### 配置工具集

```bash
# 查看可用工具
hermes tools list

# 启用/禁用工具
hermes tools enable <tool>
hermes tools disable <tool>
```

## 定时任务（Cron）

Hermes Agent 内置 Cron 调度器，支持自然语言配置定时任务。

### 创建定时任务

```bash
# 对 Hermes 说：
# "每天早上 8 点给我发送天气报告"
# "每周日凌晨 2 点备份我的项目"
```

### 支持平台

定时任务结果可发送到：
- CLI（终端）
- Telegram
- Discord
- Slack
- Email

## 模型配置

### 支持的模型提供商

| 提供商 | 模型数量 | 特点 |
|--------|---------|------|
| OpenRouter | 200+ | 性价比高 |
| OpenAI | GPT-4/3.5 | 稳定 |
| Anthropic | Claude | 推理强 |
| Nous Portal | 自有模型 | 优化过 |
| Ollama | 本地模型 | 隐私 |
| Kimi/Moonshot | 中文优化 | 中文强 |
| MiniMax | 中文优化 | 中文强 |

### 切换模型

```bash
# 在对话中切换
/model anthropic:claude-3.5-sonnet
/model openai:gpt-4-turbo
/model openrouter:meta-llama/llama-3-70b

# 默认配置
hermes config set DEFAULT_MODEL anthropic:claude-3.5-sonnet
```

## 终端运行模式

### 本地运行

```bash
# 直接启动
hermes

# 指定模型
hermes --model anthropic:claude-3.5-sonnet
```

### SSH 运行

```bash
# SSH 到远程服务器运行
hermes --remote user@server

# 或在服务器上运行后，通过 Gateway 接入
```

### Docker 运行

```bash
# 使用 Docker 运行
docker run -it nousresearch/hermes-agent

# 或使用 docker-compose
```

### 云端运行

支持的云端平台：
- **Daytona** - Serverless 开发环境
- **Modal** - Serverless 运行时
- **自定义 VPS** - $5 云服务器

## 从 OpenClaw 迁移

如果之前使用 OpenClaw，可以平滑迁移：

```bash
# 自动迁移
hermes claw migrate

# 预览迁移内容
hermes claw migrate --dry-run

# 仅迁移用户数据（不含密钥）
hermes claw migrate --preset user-data
```

迁移内容包括：
- 人物设定（SOUL.md）
- 记忆（MEMORY.md）
- Skills
- 命令白名单
- 消息平台配置
- API 密钥（可选）

## 实际使用案例

### 案例 1：编程开发助手

```
用户：帮我写一个 Python 脚本来批量重命名文件

Hermes：好的，我来创建这个脚本。请问：
1. 文件命名规则是什么？（如 prefix_日期_序号）
2. 需要重命名哪些目录的文件？
3. 是否需要保留原文件？

用户：就按 filename_001, filename_002 这样命名吧，在 ~/documents 目录下

Hermes：（编写脚本并执行）
已创建 rename_files.py，支持：
- 自定义前缀和序号
- 预览模式（不实际重命名）
- 撤销功能
要保存为 Skill 吗？下次可以直接调用。
```

### 案例 2：自动化工作流

```
用户：每天下午 5 点检查服务器状态并报告

Hermes：已创建定时任务。

Schedule: 每天 17:00
Actions:
1. SSH 连接到服务器
2. 检查 CPU/内存/磁盘使用率
3. 检查关键服务状态
4. 汇总报告发送到 Telegram
```

### 案例 3：学习助手

```
用户：帮我记住我常用的开发环境配置

Hermes：好的，请告诉我你的配置信息，我可以记住：
- 偏好的代码风格
- 常用工具链
- 项目结构偏好
- 特定技术的偏好实现方式

用户：
- Python: venv + poetry
- 前端: React + TypeScript + Tailwind
- 代码风格: Google style
- Git: 偏好 feature branch workflow

Hermes：已保存。现在每次开始新项目时，我会自动应用这些偏好。
```

## 常见问题

### Q: 如何更新 Hermes？

```bash
hermes update
```

### Q: 遇到问题如何诊断？

```bash
hermes doctor
```

### Q: 如何导出/备份数据？

```bash
# 导出所有配置和记忆
hermes config export
# 或手动备份 ~/.hermes/ 目录
```

### Q: 支持 Windows 吗？

Windows 原生不支持，需要安装 WSL2。

### Q: 如何获取更多帮助？

- Discord: https://discord.gg/NousResearch
- 文档: https://hermes-agent.nousresearch.com/docs/
- GitHub Issues

## 总结

Hermes Agent 是一个功能强大且可自我进化的 AI 智能体：

**核心优势：**
- ✅ 持久记忆 - 跨会话记住重要信息
- ✅ Skills 系统 - 从经验中自动创建技能
- ✅ 多平台接入 - Telegram/Discord/Slack 等
- ✅ 模型灵活 - 支持 200+ 模型
- ✅ 成本低廉 - 可在 $5 VPS 上运行
- ✅ 完全开源 - MIT 许可证

**适用场景：**
- 个人 AI 助手
- 开发协作伙伴
- 自动化工作流
- 长期研究项目
- 企业集成

## 参考资源

- [GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [官方文档](https://hermes-agent.nousresearch.com/docs/)
- [Discord 社区](https://discord.gg/NousResearch)
- [Skills Hub](https://agentskills.io)
- [Nous Research](https://nousresearch.com)

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/hermes-agent-usage-guide/  

