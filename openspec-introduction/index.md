# OpenSpec：让 AI 编程助手遵循规范而非猜测


# OpenSpec：让 AI 编程助手遵循规范而非猜测

## 背景简介

AI 编程助手最常见的问题不是它们不会写代码，而是它们写出的代码与你的预期不符。你说"添加深色模式"，它却重写了 CSS 变量、添加了切换按钮、还重构了布局——而你只是想改变颜色变量。下一次对话时，上下文丢失了，AI 又从零开始猜测你的意图。

**OpenSpec** 解决了这个问题：在 AI 开始写代码之前先生成规范文档。双方先对齐"要做什么"和"怎么做"，然后再按照规范实现。

截至目前，OpenSpec 在 GitHub 上已获得超过 36000 个 Star，成为 AI 驱动开发领域的标杆框架。

## 核心架构

OpenSpec 将项目知识分为两个部分：

```
openspec/
├── specs/              ← 真实来源（当前行为）
│   ├── auth/
│   │   └── spec.md
│   └── payments/
│       └── spec.md
└── changes/            ← 进行中的修改（每个变更一个文件夹）
    ├── add-dark-mode/
    └── archive/        ← 已完成的变更归档
```

**Specs** 描述系统的当前行为，**Changes** 是提出的修改。分开管理，多个变更可以并行进行而不会冲突。

## 思维导图：OpenSpec 整体架构

```
                         ┌─────────────────────────────────────────┐
                         │          OpenSpec 框架                  │
                         │    规范驱动开发 (Spec-Driven Dev)       │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│       真实来源        │        │      变更管理        │        │     工作流程        │
│       (Specs)        │        │     (Changes)       │        │    (Workflow)       │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─系统当前行为                    ├─proposal（提议）                ├─propose
          ├─增量更新                        ├─specs（增量规范）              ├─apply
          └─版本历史                        ├─design（设计）                ├─archive
                                       └─tasks（任务清单）              └─explore
                                            │
                                            ├─ADDED（新增）
                                            ├─MODIFIED（修改）
                                            └─REMOVED（删除）
                                            
                                            ▼
                              ┌─────────────────────────────────┐
                              │        四类产出物               │
                              ├─────────────────────────────────┤
                              │ • proposal.md - 为什么做        │
                              │ • specs/ - 什么改变了          │
                              │ • design.md - 怎么实现          │
                              │ • tasks.md - 具体步骤           │
                              └─────────────────────────────────┘
```

## 安装与配置

### 环境要求

- Node.js 20.19.0+

### 安装命令

```bash
npm install -g @fission-ai/openspec@latest
cd your-project
openspec init
```

支持 npm、pnpm、yarn、bun、nix 等包管理器。

## 基本工作流程

OpenSpec 的核心流程是：**propose → apply → archive**

### 1. Propose：描述变更

```
/opsx:propose add-dark-mode
```

AI 一次性生成四个产出物：

```
openspec/changes/add-dark-mode/
├── proposal.md       # 为什么做，范围（范围内/外）
├── specs/            # 增量规范：添加/修改/删除了什么行为
│   └── ui/
│       └── spec.md
├── design.md         # 技术方案，架构决策
└── tasks.md          # 实现检查清单（复选框）
```

| 产出物 | 回答的问题 |
|-------|-----------|
| proposal.md | 为什么要做？范围是什么？ |
| specs/ | 系统行为改变了什么？（增量） |
| design.md | 技术上如何实现？什么架构？ |
| tasks.md | 实现步骤是什么？完成了什么？ |

### 2. Apply：按规范实现

```
/opsx:apply
```

AI 逐项按照 tasks.md 执行，每完成一项就打勾：

```
Working on 1.1: Create ThemeContext...
✓ 1.1 Complete

Working on 1.2: Add CSS custom properties...
✓ 1.2 Complete
```

它不会偏离规范。如果中断，下次可以从断点继续。

### 3. Archive：记录完成

```
/opsx:archive
```

Archive 做两件事：

1. **合并增量规范**到 `openspec/specs/`（更新真实来源）
2. **移动变更文件夹**到 `openspec/changes/archive/2026-04-07-add-dark-mode/`

规范随每次归档递增，形成完整的系统行为文档。

## 规范格式

规范是行为契约，不是实现细节。使用需求 + 场景描述：

```markdown
# Auth Specification

## Purpose
Authentication and session management.

## Requirements

### Requirement: User Authentication
The system SHALL issue a JWT token upon successful login.

#### Scenario: Valid credentials
- GIVEN a user with valid credentials
- WHEN the user submits login form
- THEN a JWT token is returned
- AND the user is redirected to dashboard

#### Scenario: Invalid credentials
- GIVEN invalid credentials
- WHEN the user submits login form
- THEN an error message is displayed
- AND no token is issued
```

使用 GIVEN/WHEN/THEN 描述场景，每个场景都可测试。RFC 2119 关键字（MUST/SHALL/SHOULD/MAY）表达需求强度。

## Delta Spec：描述"改变了什么"

这是 OpenSpec 最重要的概念。修改不是重写整个规范，而是描述差异：

```markdown
# Auth 的增量

## 新增需求

### Requirement: Two-Factor Authentication
The system MUST support TOTP-based two-factor authentication.

#### Scenario: 2FA login
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented

## 修改需求

### Requirement: Session Expiration
The system MUST expire sessions after 15 minutes of inactivity.
(Previously: 30 minutes)

## 删除需求

### Requirement: Remember Me
(Deprecated in favor of 2FA.)
```

| 章节 | 含义 | Archive 操作 |
|-----|------|-------------|
| ADDED | 新行为 | 添加到主规范 |
| MODIFIED | 修改了现有行为 | 替换原需求 |
| REMOVED | 删除的行为 | 从主规范中删除 |

为什么用增量而不是重写整个规范？**因为两个并行变更可以各自修改同一规范的不同需求而不冲突。**

## Explore 模式

当你不知道该怎么做时：

```
/opsx:explore
```

先与 AI 讨论——它分析代码库，比较方案，画出架构图。不生成产出物。等你想清楚后，再运行 `/opsx:propose`。

```
You: /opsx:explore
AI:  What would you like to explore?

You: How should we handle authentication for the mobile app?
AI:  Let me investigate your current auth setup...
     I see you're using session-based auth for the web app.
     For mobile, we have three options:
     1. JWT tokens (stateless, works offline)
     2. OAuth2 (third-party login)
     3. Extend current sessions (simpler)

You: Let's go with JWT.
AI:  Ready. Run /opsx:propose add-jwt-auth to begin.
```

## 高级命令

### 扩展工作流（需要切换 profile）

```bash
openspec config profile   # 选择扩展工作流
openspec update           # 刷新 AI 指令
```

| 命令 | 用途 |
|-----|------|
| `/opsx:new` | 仅创建文件夹，无产出物（手动节奏） |
| `/opsx:continue` | 按依赖顺序逐个产出 |
| `/opsx:ff` | 快速前进，一次性产出所有内容 |
| `/opsx:verify` | 验证实现是否符合规范 |
| `/opsx:sync` | 手动合并增量规范（不归档） |
| `/opsx:bulk-archive` | 批量归档多个变更 |
| `/opsx:onboard` | 使用你自己的代码库引导教程 |

### continue vs ff

`/opsx:continue` 逐个产出物让你逐步审核：

```
proposal → (审核) → specs → (审核) → design → (审核) → tasks
```

`/opsx:ff` 一次性产出所有内容——适用于你已经明确知道想要什么的情况。

### verify：三维度验证

```
/opsx:verify
```

| 维度 | 检查内容 |
|-----|---------|
| **Completeness** | 所有任务完成？所有需求都有对应实现？ |
| **Correctness** | 实现符合规范意图？处理了边缘情况？ |
| **Coherence** | 代码与 design.md 决策一致？命名规范统一？ |

报告分为三个级别：CRITICAL、WARNING、SUGGESTION。不会阻止归档，但让你知道需要注意什么。

## Schema：自定义产出物流程

默认的 `spec-driven` Schema 流程：

```
proposal → specs → design → tasks → implement
         ↘              ↗
          (design 只依赖 proposal，可以与 specs 并行)
```

你可以定义自定义 Schema，例如添加研究阶段：

```yaml
# openspec/schemas/research-first/schema.yaml
name: research-first
artifacts:
  - id: research
    generates: research.md
    requires: []

  - id: proposal
    generates: proposal.md
    requires: [research]

  - id: tasks
    generates: tasks.md
    requires: [proposal]
```

```bash
openspec schema init research-first
```

## 支持的工具

OpenSpec 不锁定特定 AI 工具，支持 30+ 编程助手：

| 工具 | 命令格式 |
|-----|---------|
| Claude Code | `/opsx:propose`, `/opsx:apply` |
| Cursor | `/opsx-propose`, `/opsx-apply` |
| Windsurf | `/opsx-propose`, `/opsx-apply` |
| GitHub Copilot | `/opsx-propose`, `/opsx-apply` |
| Codex / Gemini CLI / Amazon Q | 各自集成 |

基本上任何能读取文件和处理斜杠命令的 AI 工具都可以工作。

## 与其他方案对比

| 维度 | OpenSpec | Spec Kit (GitHub) | Kiro (AWS) |
|-----|---------|------------------|------------|
| 理念 | 轻量、流畅 | 完整但重量级 | 强大但 IDE 锁定 |
| 阶段控制 | 无阶段门 | 严格阶段门 | 锁定特定模型 |
| 遗留项目 | 原生支持（增量规范） | 需要完全重写 | 有限 |
| 工具锁定 | 30+ 工具 | GitHub 生态 | 仅 Kiro IDE |
| 格式 | Markdown + Git | Markdown + Python | 内置格式 |

## 总结

使用 OpenSpec 后最大的区别是：**AI 不再偏离主题。**

以前，每个新对话都需要重新解释"这个项目长什么样，之前做了什么决策"。现在 AI 读取 `openspec/specs/` 就已经知道。

`proposal.md` 中的范围区分（范围内/外）特别有用。写下"我们不做什么"，AI 就不会"好心地"做你没用请求的事。

`design.md` 也很有价值——它迫使你在写代码前先思考技术方案。很多时候，设计阶段会揭示"这个方案不行，让我们换一个"——比实现后才发现省时间。

唯一的代价是额外的一步：不能直接告诉 AI"添加深色模式"然后等结果。你需要 propose、审核、然后 apply。但回报是可预测性和可追溯性，对于任何非平凡的变更都值得。

**不适合**：改一行 CSS、修复拼写错误——直接做就行，不需要 propose 流程。

## 参考资源

- OpenSpec 官网：https://openspec.dev/
- OpenSpec GitHub：https://github.com/fission-ai/openspec
- OpenSpec npm 包：@fission-ai/openspec
- RFC 2119：需求级别关键字定义

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/openspec-introduction/  

