# Pi Coding Agent 入门指南：轻量级开源 AI 编码代理的安装与使用


# Pi Coding Agent 入门指南：轻量级开源 AI 编码代理的安装与使用

## 背景

2025-2026 年，AI 编码代理（Coding Agent）领域爆发式增长，Claude Code、Codex CLI、Cursor 等工具层出不穷。但这些产品化的工具都有一个共同问题：**它们帮你做了太多决策**——超大系统提示词、隐藏的上下文注入、无法自己控制的上下文策略。

Mario Zechner（libGDX 作者，知名游戏框架开发者）受够了 Claude Code 日益臃肿的设计，于 2026 年初发布了 **Pi**——一个极简的终端 AI 编码代理框架。它的设计理念非常直白：

> **"有很多代理框架，但这个是你自己的。"**

Pi 的核心哲学：系统提示词 + 工具定义控制在 **1000 tokens 以内**，剩下的上下文预算全部交给你的项目。它不做决策，它只是提供你掌控一切的脚手架。

到今天，Pi 已经发展成一个完整的生态——40k+ GitHub stars，驱动着 250k+ stars 的 [OpenClaw](https://github.com/openclaw/openclaw)（史上增长最快的 GitHub 项目之一）。

<!--more-->

## 核心概念与架构

Pi 是一个 TypeScript 单体仓库（monorepo），按依赖关系严格分层：

| 包名 | 作用 | 依赖 |
|------|------|------|
| `pi-ai` | 统一多提供商 LLM API 层（15+ 提供商） | 无 |
| `pi-agent-core` | ReAct 循环核心（~200 行） | pi-ai |
| `pi-coding-agent` | 终端编码代理 CLI | pi-agent-core + pi-tui |
| `pi-tui` | 终端 UI 组件库 | 无 |

这种分层的意义在于：每一层都可以单独使用。你可以在自己的应用中使用 `pi-ai` 做批量 LLM 调用，用 `pi-agent-core` 嵌入 ReAct 循环，用 `pi-coding-agent` 作为日常编码助手。

### 设计哲学

- **4 个核心工具**：`read`、`write`、`edit`、`bash`。没有 `search_codebase`、没有 `list_directory`——用 bash 通用工具（`grep -r`、`find .`、`git log`）替代
- **系统提示词 ~100 tokens**：`"You are an AI coding assistant. You help users with software engineering tasks. Use the provided tools to accomplish tasks."`
- **完全透明的上下文**：所有注入上下文的内容都可在 TUI 中查看
- **可扩展而非内置功能**：想加功能？写扩展，不要等核心更新

## 安装

### 通过 npm 安装（推荐）

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

验证安装：

```bash
pi --version
```

### 通过 Ollama 安装（本地模型路径）

```bash
ollama launch pi
```

这会自动安装 Pi、配置 Ollama 作为提供商、添加网络搜索工具，并启动交互式会话。

### macOS / Linux 安装脚本

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

## 快速上手

### 第一步：进入项目目录并启动

```bash
cd /path/to/your-project
pi
```

这会在你的项目目录中启动 Pi 的交互模式。

### 第二步：登录或配置 API Key

Pi 支持两种认证方式：

**方式一：交互式登录（推荐）**

在 Pi 中输入：

```
/login
```

然后选择你需要的提供商——支持 Claude Pro/Max、ChatGPT Plus/Pro、GitHub Copilot 等订阅登录。

**方式二：API Key 环境变量**

```bash
export ANTHROPIC_API_KEY=sk-ant-...
export OPENAI_API_KEY=sk-...
export DEEPSEEK_API_KEY=sk-...
pi
```

Pi 支持 15+ 提供商：Anthropic、OpenAI、Google Gemini、DeepSeek、Mistral、Groq、xAI、Together AI、Hugging Face、AWS Bedrock、Azure、Ollama 等。

### 第三步：第一次交互

启动后输入你的第一个请求：

```
解释一下这个项目的主要功能和目录结构
```

或者从命令行直接传递任务：

```bash
pi -p "Summarize this repository"
```

## 核心用法详解

### 1. 文件引用

使用 `@` 在交互模式中引用文件，也可以从命令行传递：

```bash
# 查看单个文件
pi @README.md "请总结这个文件"

# 同时查看多个相关文件
pi @src/app.ts @src/app.test.ts "请一起审查这两个文件"

# 查看代码后执行任务
pi @src/auth/login.ts "找到这个文件的潜在安全漏洞"
```

### 2. 运行命令

Pi 支持两种命令执行方式：

```
!npm test          # 运行命令并将输出发送给模型
!!npm test         # 运行命令但不将输出发送给模型（避免噪音）
```

`!` 适合让模型基于命令输出做决策，`!!` 适合只想在本机运行但不消耗上下文预算的场景。

### 3. 切换模型

在会话中切换模型：

```
/model
```

启动时指定模型：

```bash
pi --provider openai --model gpt-4o
pi --model anthropic/claude-sonnet-4-20250514
```

Pi 还支持思考级别（thinking level）：

```bash
pi --model sonnet:high
```

思考级别包括 `off`、`minimal`、`low`、`medium`、`high`、`xhigh`。简单任务用低级别，复杂推理用高级别。

### 4. 会话管理

Pi 将会话保存为 JSONL 树形结构，支持分支：

```bash
pi                    # 启动新会话
pi -c                 # 继续最近的会话
pi -r                 # 浏览并选择历史会话
pi --no-session       # 临时会话（不保存）
pi --name "release-audit"  # 命名会话
```

内部会话命令：

```
/resume    # 恢复历史会话
/new       # 新会话
/fork      # 从当前节点分支
/tree      # 查看会话树
/compact   # 压缩上下文（长会话时使用）
```

### 5. 上下文压缩（Compaction）

长时间会话会填满上下文窗口。Pi 的压缩机制会自动将旧消息替换为摘要，使用廉价模型（如 Haiku）完成：

```
/compact
/compact 重点关注修改过的文件、未解决的 Bug 和下一步计划
```

压缩阈值可在设置中配置。

## 项目配置实战

### 创建 AGENTS.md

在项目根目录创建 `AGENTS.md`，设置 Pi 的行为规则：

```markdown
# 项目指令

## 项目信息
- 技术栈：Next.js, TypeScript, Tailwind CSS, PostgreSQL
- 部署：通过 Vercel 部署到生产环境
- 包管理器：pnpm

## 开发命令
- 类型检查：pnpm typecheck
- 代码检查：pnpm lint
- 测试：pnpm test
- 构建：pnpm build

## 工作规则
- 修改前先阅读现有代码模式
- 优先小范围修改
- 不要回滚用户未请求的更改
- 完成前报告修改的文件和验证结果
- 不要修改 secrets、数据库迁移和部署配置

## 安全
- 涉及认证逻辑的修改必须先解释风险
- 不允许执行 rm -rf 或 git reset --hard
```

Pi 会自动加载 `AGENTS.md`、`CLAUDE.md` 或项目根目录下的 `SYSTEM.md`。修改后执行 `/reload` 重新加载。

### 配置 settings.json

项目级设置 `.pi/settings.json`：

```json
{
  "defaultProvider": "anthropic",
  "defaultModel": "claude-sonnet-4-20250514",
  "defaultThinkingLevel": "medium",
  "enabledModels": [
    "claude-*",
    "openai/gpt-*",
    "deepseek/*",
    "ollama/*"
  ],
  "compaction": {
    "enabled": true,
    "reserveTokens": 16384,
    "keepRecentTokens": 20000
  },
  "retry": {
    "enabled": true,
    "maxRetries": 3
  },
  "theme": "dark",
  "enableInstallTelemetry": false
}
```

## 四运行模式

Pi 不止是终端 TUI，它有四种运行模式：

| 模式 | 命令/API | 使用场景 |
|------|---------|---------|
| **交互式** | `pi` | 日常编码 |
| **Print/JSON** | `pi -p "query"`、`--mode json` | 脚本、CI 钩子、事件流 |
| **RPC** | 基于 stdin/stdout 的 JSONL | 编辑器、仪表盘、非 Node 集成 |
| **SDK** | 在 Node 中直接导入 | 嵌入应用（如 OpenClaw） |

### SDK 模式示例：嵌入到自己的应用

```typescript
import { createAgentSession } from "@mariozechner/pi-agent-core";

const session = createAgentSession({
  provider: "anthropic",
  model: "claude-sonnet-4-20250514",
  tools: [...defaultTools, ...customTools],
  extensions: [auditExtension],
  onMessage: (msg) => console.log("Agent:", msg),
});

// 发送消息
await session.send("重构 api/user.ts，保持接口不变");
```

OpenClaw 就是用这个模式嵌入 Pi，构建了多平台（WhatsApp、Telegram、Slack、Discord 等）的个人 AI 助手。

## 扩展系统（Extensions）

扩展是 TypeScript 文件，通过 jiti 运行时加载（无需构建步骤）。编辑后输入 `/reload` 即可热重载。

### 基础扩展示例

```typescript
// .pi/extensions/safety.ts
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // 注册自定义命令
  pi.registerCommand("review", {
    description: "审查暂存的更改",
    handler: async (_args, ctx) => {
      ctx.ui.notify("审查开始...");
      await ctx.runAgent("运行 git diff --staged 并审查更改");
    },
  });

  // 添加生命周期钩子
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.setStatus("repo", "安全检查已加载");
  });

  // 自定义安全门控
  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName !== "bash") return;

    const command = String(event.input.command ?? "");
    const dangerous = ["rm -rf", "git reset --hard", "drop database"];

    if (dangerous.some((d) => command.includes(d))) {
      const ok = await ctx.ui.confirm("危险命令", command);
      if (!ok) return { block: true, reason: "被安全扩展拦截" };
    }
  });
}
```

### 自扩展能力

Pi 最强大的特性：**Agent 可以自己写扩展并热重载**。工作流：

1. 描述需求："我需要一个 `/deploy` 命令来运行部署流水线"
2. Pi 编写扩展 `.ts` 文件
3. 输入 `/reload`
4. 测试新命令
5. 如果出错，Pi 读取错误、修复代码、重载、重试

> 知名 Python 开发者 Armin Ronacher（Flask 和 Jinja2 作者）评价："像黏土一样可塑的软件。" 他所有的 Pi 扩展（`/answer`、`/todos`、`/review`、`/files`）都是 Pi 自己写的。

## Skills 技能系统

Pi 实现了 [agentskills.io](https://agentskills.io) 开放标准，技能包在 Pi、Claude Code、Codex CLI 之间可移植。

### 创建技能

```markdown
# .pi/skills/code-review/SKILL.md
---
name: code-review
version: 1.0.0
description: 自动化代码审查，包含代码风格检查
triggers:
  - /review
  - "审查这个"
---

# 代码审查技能

作为代码审查助手，当激活时：

1. 读取 git 暂存的 diff
2. 检查：
   - 安全漏洞
   - 性能问题
   - 代码风格违规
   - 缺少错误处理
3. 提供可操作的建议和行引用
```

### 安装社区技能包

```bash
pi install npm:pi-skills -l
pi install npm:@ollama/pi-web-search -l
```

使用 `-l` 标志安装为项目本地包。

## 实战案例 1：日常开发工作流

以下是一个完整的日常开发会话示例：

```bash
# 进入项目并启动 Pi
cd ~/projects/my-api-server
pi
```

**会话流程：**

```
1. 用户:    @src/routes/users.ts 解释这个文件的功能
   Agent:   [读取并解释用户路由]

2. 用户:    !npm test
   Agent:   [运行测试，发现 auth 测试失败]

3. 用户:    查找 auth 测试失败的原因，先不要改文件
   Agent:   [用 grep 和 read 工具调查，定位到 token 过期时间逻辑错误]

4. 用户:    修复这个问题，最小的安全修改
   Agent:   [修改代码，解释改动]

5. 用户:    !npm test
   Agent:   测试通过 ✅

6. 用户:    /compact
   Agent:   上下文已压缩
```

## 实战案例 2：代码审查

```bash
# 在 CI 中使用 print 模式
pi -p --tools read,grep,find,ls \
  "审查最近一次提交的代码更改，重点检查安全问题和性能问题。列出所有发现和建议。"
```

使用 `--tools read,grep,find,ls` 限制为只读工具，确保审查过程中 Agent 不会修改代码。

## 实战案例 3：多模型协作

Pi 支持在同一会话中切换提供商：

```bash
# 复杂推理用 Claude
pi --model claude-sonnet-4-20250514 -p "分析这个项目的架构设计"

# 快速修改用 GPT
pi --model openai/gpt-4o-mini -p "修复 src/utils.ts 中的拼写错误"
```

在交互式会话中，可以直接使用 `/model` 切换：

```
/模型切换到 gpt-4o-mini
继续处理剩下的琐碎任务
```

## 实战案例 4：建立完整的项目配置文件

下面是一个生产级项目的完整 Pi 配置：

```
my-project/
├── AGENTS.md                    # 项目指令
├── .pi/
│   ├── settings.json           # 项目设置
│   ├── extensions/
│   │   ├── safety.ts           # 安全门控
│   │   └── deploy.ts           # 部署命令
│   ├── skills/
│   │   ├── code-review/
│   │   │   └── SKILL.md
│   │   └── release-check/
│   │       └── SKILL.md
│   └── prompts/
│       └── pr-description.md   # 自定义提示词模板
```

**提示词模板示例** (`.pi/prompts/pr-description.md`)：

```markdown
---
name: pr-description
description: 生成 PR 描述
---

# PR 描述模板

总结代码变更：
- 变更范围：(修改了哪些文件)
- 原因：(为什么做这个修改)
- 测试结果：(运行了哪些测试，结果如何)

# 审查清单
- [ ] 类型检查通过
- [ ] 测试通过
- [ ] 没有敏感信息泄露
- [ ] 向后兼容
```

在 Pi 中可以直接通过 `/pr-description` 触发此模板。

## 与 Claude Code 对比

| 特性 | Pi | Claude Code |
|------|-----|-------------|
| 开源 | 是 (MIT) | 否 |
| 系统提示词 | ~100 tokens | ~10,000 tokens |
| 提供商支持 | 15+ | Anthropic 为主 |
| 核心工具数 | 4 | 20+ |
| 扩展机制 | TypeScript 扩展 | 有限 |
| 会话树 | 支持（分支） | 线性 |
| 运行模式 | 4 种 | 交互式为主 |
| SDK 嵌入 | 支持 | 不支持 |
| 技能系统 | 开放标准 | 私有 |

## 常见问题

### Pi 和 OpenClaw 是什么关系？

OpenClaw 是构建在 Pi SDK 之上的多平台 AI 助手（支持 WhatsApp、Telegram、Slack 等），由 Peter Steinberger 开发。它是 Pi SDK 模式的旗舰案例，也是 GitHub 上增长最快的项目之一。

### 是否支持本地模型？

支持。通过 Ollama 集成可以一键启动：`ollama launch pi`。或者在 `models.json` 中配置 Ollama 或其他 OpenAI 兼容的本地推理端点（如 vLLM）。

### Pi 的性能表现如何？

Pi 在 Terminal-Bench 2.0 上与 Claude Code、Codex、Cursor 等产品抗衡，但只用了 <100 tokens 的系统提示词和 4 个工具。其创始人认为，前沿模型已经在训练数据中充分了解了编码代理的运作模式，不需要框架教它们怎么做。

### 能否在 CI/CD 中使用？

可以。使用 Print/JSON 模式 (`pi -p "task" --mode json`) 或 RPC 模式可以嵌入脚本流水线。同时可以用 `--tools` 限制只读操作，适合安全审查。

### 如何在不同提供商之间切换？

使用 `/model` 或在启动时指定 `--provider` 和 `--model`。Pi 的上下文接力（Context Handoff）功能能在不同提供商之间序列化会话状态——包括思维链、工具调用结果等——在切换模型时完整保持上下文。

## 总结

Pi 代表了一种与主流 AI 编码代理不同的设计思路：**极简核心 + 最大扩展性**。

- 如果你只需要一个"开箱即用"的编码助手，Pi 的默认体验已经很流畅
- 如果你希望完全掌控上下文策略和工作流，Pi 的扩展、技能、设置系统给了你所有必要的工具
- 如果你想在自己的应用里嵌入 AI Agent 能力，Pi 的 SDK 模式是最轻量的选择

Pi 的核心理念值得记住：框架的责任是**让路**，而不是指路。

### 参考资源

- [Pi 官方网站](https://pi.dev)
- [GitHub 仓库](https://github.com/badlogic/pi-mono)
- [Pi 扩展文档](https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/docs/extensions.md)
- [Pi Skills 文档](https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/docs/skills.md)
- [Ollama Pi 集成](https://docs.ollama.com/integrations/pi)


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/pi-coding-agent-guide/  

