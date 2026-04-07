# Superpowers：让 AI Agent 获得专家级能力的技能框架


# Superpowers：让 AI Agent 获得专家级能力的技能框架

## 背景简介

在 AI 辅助软件开发领域，如何让 AI Agent 像人类专家一样工作一直是核心挑战。传统的 AI 编程工具虽然功能强大，但在处理复杂任务时往往缺乏系统性方法——它们可能会直接开始编码，而不是先理解需求、规划方案。

**Superpowers** 是由 Keyboardio 联合创始人 Jesse Vincent 开发的一个 AI Agent 技能框架和软件开发方法论。该项目在 GitHub 上已获得超过 134000 个 Star，成为 AI 编程工作流领域的标杆工具。

## 什么是 Superpowers

Superpowers 是一个为 AI 编程 Agent 设计的技能框架和工作流工具集。它的核心理念是：**将人类专家的开发习惯和工作流程传授给 AI Agent**，让 AI 能够系统性地处理复杂任务，而不是盲目跳入编码。

### 核心设计理念

Superpowers 基于一个关键洞察：AI Agent 在处理复杂代码时经常失败，但通过特定的技能（Skills）引导，AI 可以表现得像人类专家一样。这些技能封装了：

- **系统性思考**：先理解需求，再制定计划
- **质量控制**：在实现前先验证，在修改后确认
- **工具使用**：正确使用调试、测试、审查等工具
- **迭代优化**：持续改进而非一次完成

### 技能（Skills）机制

Superpowers 的技能系统受 Simon Willison 提出的 Claude Skills 概念启发。每个技能是一个独立的指令集，可以被 AI Agent 按需加载和使用。技能的核心文件是 `SKILL.md`，其中包含：

- 技能的用途说明
- 使用场景和触发条件
- 具体的工作流程和步骤
- 工具映射说明

## 思维导图：Superpowers 整体架构

```
                         ┌─────────────────────────────────────────┐
                         │           Superpowers 框架             │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│      核心概念        │        │     主要技能         │        │    工具集成         │
│                     │        │                     │        │                     │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─技能框架(Skills)                ├─brainstorming                 ├─OpenCode
          ├─Agent工作流                     ├─verification-before-completion ├─Claude Code
          ├─工具映射                        ├─receiving-code-review        ├─Codex
          └─Bootstrap机制                  ├─requesting-code-review       └─MCP Servers
                                           ├─test-driven-development
                                           ├─systematic-debugging
                                           └─...更多
                                           
                                           ▼
                              ┌─────────────────────────────────┐
                              │      技能发现与加载机制          │
                              ├─────────────────────────────────┤
                              │ • find_skills: 发现可用技能     │
                              │ • use_skill: 加载并使用技能      │
                              │ • 启动时自动 bootstrap          │
                              └─────────────────────────────────┘
```

## OpenCode 简介

OpenCode（opencode.ai）是一个开源的 AI 编程 Agent，类似于 Claude Code 或 OpenAI Codex，但其独特之处在于：

- **模型无关**：不依赖特定模型或模型提供商
- **MCP 支持**：支持 Model Context Protocol 服务器
- **自定义工具**：允许用户添加自定义工具
- **REST API**：提供 REST API 接口，可构建自定义 UI
- **Subagent 支持**：支持子代理机制

## 在 OpenCode 中安装 Superpowers

### 安装步骤

OpenCode 本身没有内置的技能安装机制，但提供了插件系统来注入功能。安装 Superpowers 非常简单，只需在 OpenCode 中执行以下命令：

```bash
opencode
```

然后告诉它：

```
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

OpenCode 会自动下载并执行安装脚本，完成 Superpowers 的配置。

### 安装原理

Superpowers 通过 OpenCode 的插件系统和 Hooks 机制实现自动启动：

1. **Bootstrap 机制**：在会话启动时自动触发，解释 Superpowers 是什么以及如何使用
2. **工具注入**：添加 `find_skills` 和 `use_skill` 两个自定义工具
3. **技能发现**：自动扫描 `~/.config/opencode/skills`（全局技能）和 `.opencode/skills`（项目技能）目录

### 技能存放位置

安装 Superpowers 后，你可以添加自己的技能：

- **全局技能**：`~/.config/opencode/skills/`
- **项目技能**：`项目目录/.opencode/skills/`

每个技能是一个文件夹，里面包含 `SKILL.md` 文件。

## 工具映射说明

由于 Superpowers 最初为 Claude Code 设计，需要进行工具映射才能在 OpenCode 中使用：

| Claude Code 工具 | OpenCode 等价工具 |
|-----------------|------------------|
| `TodoWrite` | `todowrite` |
| `Task`（子代理） | OpenCode 子系统（@mention） |
| `Skill` | `use_skill` 自定义工具 |
| `Read`, `Write`, `Edit`, `Bash` | OpenCode 原生工具 |

## 核心技能详解

### 1. brainstorming（头脑风暴）

这是最重要的技能之一。当用户提出一个开发任务时，AI 不应立即开始编码，而应该：

- 深入理解用户的真实需求
- 探索技术方案和实现路径
- 识别潜在风险和约束
- 制定详细的实现计划

**使用场景**：当你对 AI 说"让我们做一个 React 待办事项列表"时，AI 应该先启动 brainstorming 技能，询问你更多细节，而不是直接开始写代码。

### 2. verification-before-completion（完成前验证）

在声称工作完成之前，必须运行验证命令确认：

- 代码无语法错误
- 测试通过
- 构建成功
- 功能符合预期

### 3. receiving-code-review（接受代码审查）

在实现建议之前，需要先理解代码上下文、验证问题真实存在，而不是盲目执行。

### 4. requesting-code-review（请求代码审查）

在完成重要功能或合并分支前，主动请求人工审查。

### 5. test-driven-development（测试驱动开发）

先写测试，再写实现代码，确保代码可测试且测试通过。

### 6. systematic-debugging（系统化调试）

遇到 bug 时，先复现问题、分析根因、制定修复方案，再实施修复。

## 实际使用示例

### 触发技能

当你对 OpenCode 说"帮我在项目中添加用户认证功能"时，Superpowers 会：

1. 检测到这是一个复杂任务
2. 自动加载 brainstorming 技能
3. 询问你更多细节：认证方式、用户存储、技术栈等
4. 基于回答制定详细计划
5. 在实现过程中使用其他技能确保质量

### 手动使用技能

你也可以直接要求 AI 使用特定技能：

```
请使用 test-driven-development 技能来实现这个功能
```

## Superpowers 的设计哲学

### 停止即失败

Superpowers 有一个关键的验收测试：打开一个新会话，不做任何前置说明，直接告诉 AI：

```
Let's make a react todo list.
```

如果 AI 立刻开始写代码，说明 Superpowers 安装失败。如果 AI 停下来，启动 brainstorming 技能并试图深入了解你的需求，说明安装成功。

### Evals（评估）机制

由于 LLM 的非确定性，传统的测试套件不适用于 AI Agent。Superpowers 采用"Evals"机制：

- 多次运行测试，检查通过率
- 某些测试必须 100% 通过（如上述验收测试）
- 允许一定概率的失败（取决于任务复杂度）

## 总结

Superpowers 为 AI 编程 Agent 带来了系统化的开发方法论，通过技能机制将人类专家的工作习惯传递给 AI。结合 OpenCode 的强大功能和插件系统，开发者可以构建更可靠、更高效的 AI 辅助开发工作流。

安装 Superpowers 后，AI 不再是简单的代码生成器，而是成为了一个能够系统性思考、规范化操作的开发伙伴。

## 参考资源

- Superpowers GitHub：https://github.com/obra/Superpowers
- OpenCode 官网：https://opencode.ai
- Superpowers for OpenCode 博客：https://blog.fsck.com/2025/11/24/Superpowers-for-OpenCode/
- OpenCode 技能文档：https://opencode.ai/docs/skills/

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/superpowers-opencode-introduction/  

