# Hermes Agent：会自我进化的 AI 智能体


# Hermes Agent：会自我进化的 AI 智能体

## 引言

在人工智能快速发展的今天，AI 智能体（Agent）已经成为技术领域的热门话题。大多数 AI 智能体本质上只是「带有额外步骤的聊天机器人」——你与它们对话，它们忘记一切，下次重新开始。然而，Hermes Agent 采取了不同的方式，它致力于打造一个「与你共同成长的智能体」。

Hermes Agent 是由 **Nous Research** 开发的开源 AI 智能体，核心理念是「The agent that grows with you」（与你共同成长的智能体）。该项目在 GitHub 上已获得 **33,000+ 颗星**，是当前最受欢迎的自进化 AI 智能体之一。

## 什么是 Hermes Agent

Hermes Agent 是一个功能强大的开源 autonomous AI agent，采用 MIT 许可证发布。与传统聊天机器人不同，它具有以下核心特性：

- **长期记忆**：跨会话记住重要信息，自动保存学习到的知识
- **自我进化**：从成功和失败中学习，逐渐适应用户的习惯和偏好
- **多平台运行**：支持本地运行（保护隐私）、Ollama 部署、云端 API 调用
- **完全开源**：社区活跃，持续迭代更新

## 核心功能详解

### 1. 持久记忆系统

Hermes Agent 拥有先进的持久记忆系统，通过 `MEMORY.md` 和 `USER.md` 文件保存用户偏好、项目信息和学习到的知识。这种有边界的、精心管理的记忆能够跨会话持久化，让 Agent 记住你的偏好、项目和环境设置。

### 2. 上下文文件

Hermes Agent 能够自动发现和加载项目上下文文件，包括：
- `.hermes.md`
- `AGENTS.md`
- `CLAUDE.md`
- `SOUL.md`
- `.cursorrules`

这些文件会塑造 Agent 在项目中的行为方式，让它更好地理解你的项目规范和需求。

### 3. 上下文引用

使用 `@` 符号可以快速注入文件、文件夹、git diff 和 URL 到对话中。Hermes Agent 会自动展开引用并追加内容，方便快捷。

### 4. 检查点与回滚

Hermes Agent 会在修改文件之前自动快照工作目录，支持使用 `/rollback` 命令回滚更改。这为用户提供了一个安全网，可以在出现问题时轻松恢复。

### 5. 技能系统

Hermes Agent 的技能系统遵循渐进式披露模式，按需加载知识文档以最小化 token 使用量。技能兼容 [agentskills.io](https://agentskills.io/specification) 开放标准。

### 6. 定时任务

支持使用自然语言或 cron 表达式设置定时任务。任务可以附加技能，向任意平台交付结果，并支持暂停、恢复和编辑操作。

### 7. 子代理委托

`delegate_task` 工具可以生成子代理实例，具有隔离的上下文、受限的工具集和独立的终端会话。支持最多 3 个并发子代理用于并行工作流。

### 8. 浏览器自动化

支持多种后端进行完整的浏览器自动化：
- Browserbase 云服务
- Browser Use 云服务
- 通过 CDP 本地 Chrome
- 本地 Chromium

可以导航网站、填写表单和提取信息。

### 9. 语音模式

支持 CLI 和消息平台的完整语音交互。可以对着麦克风说话，收听语音回复，甚至可以在 Discord 语音频道中进行实时语音对话。

### 10. 视觉与图像支持

多模态视觉支持，可以从剪贴板粘贴图像到 CLI 中，让 Agent 分析、描述或处理图像。

### 11. MCP 集成

通过 stdio 或 HTTP 传输连接到任何 MCP 服务器，访问外部工具。无需编写原生 Hermes 工具即可连接 GitHub、数据库、文件系统和内部 API。

### 12. 提供商路由

精细控制哪个 AI 提供商处理请求。可以根据成本、速度或质量进行排序、白名单、黑名单和优先级排序。

### 13. API 服务器

将 Hermes 暴露为 OpenAI 兼容的 HTTP 端点，可以连接任何使用 OpenAI 格式的前端，如 Open WebUI、LobeChat、LibreChat 等。

### 14. IDE 集成（ACP）

支持在 ACP 兼容的编辑器（如 VS Code、Zed 和 JetBrains）中使用 Hermes。聊天、工具活动、文件差异和终端命令都在编辑器内渲染。

### 15. 强化学习训练

可以从 Agent 会话生成轨迹数据，用于强化学习和模型微调。

## 安装配置

### 前置要求

- Python 3.8+
- 支持 Ollama（本地运行）或 OpenAI API

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent

# 安装依赖
pip install -r requirements.txt

# 复制环境配置
cp .env.example .env

# 编辑 .env 文件，配置 API Key
```

### 使用 Ollama 本地运行

```bash
# 安装 Ollama
brew install ollama

# 拉取模型
ollama pull hermes-agent

# 启动 Hermes Agent
python main.py --local
```

### 快速启动

```bash
# 基本对话模式
python main.py

# 指定模型
python main.py --model hermes-agent

# 本地模式
python main.py --local --model llama3
```

## 与其他 Agent 对比

| 特性 | Hermes Agent | OpenClaw | Claude Code |
|-----|-------------|----------|-------------|
| 记忆持久化 | ✅ | ✅ | ❌ |
| 自我进化 | ✅ | ❌ | ❌ |
| 本地运行 | ✅ | ✅ | ✅ |
| 开源 | ✅ | ✅ | ❌ |
| Stars | 33K+ | 29K+ | - |
| MCP 集成 | ✅ | ❌ | ✅ |
| 定时任务 | ✅ | ❌ | ❌ |
| 语音模式 | ✅ | ❌ | ❌ |

## 应用场景

### 1. 个人助理

- 记住你的偏好和习惯
- 从日常交互中学习
- 提供个性化服务

### 2. 开发助手

- 辅助代码编写和调试
- 学习项目规范
- 自动化重复任务

### 3. 研究工具

- 长期研究项目
- 知识积累和管理
- 文献分析

### 4. 自动化工作流

- 多步骤复杂任务
- 跨应用协调
- 持续优化

## 总结

Hermes Agent 是一个具有革命性意义的 AI 智能体，它代表了 AI Agent 的一个新方向——不仅仅是执行任务，更能够学习和成长。

主要优势：
- ✅ **持久记忆** - 记住跨会话的信息
- ✅ **自我进化** - 从经验中学习和改进
- ✅ **本地运行** - 保护隐私安全
- ✅ **完全开源** - 社区活跃可定制
- ✅ **多模型支持** - 灵活选择
- ✅ **丰富的功能** - 语音、浏览器自动化、MCP 集成等

如果你需要一个能够「记住」并「成长」的 AI 助手，Hermes Agent 是极佳的选择。

## 参考链接

- GitHub：https://github.com/NousResearch/hermes-agent
- 官方文档：https://hermes-agent.nousresearch.com/
- Nous Research：https://nousresearch.com/

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/hermes-agent-introduction/  

