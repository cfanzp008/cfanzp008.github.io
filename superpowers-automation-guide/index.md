# Superpowers 自动化使用指南


# Superpowers 自动化使用指南

## 什么是 Superpowers

Superpowers 是 OpenCode 平台推出的一套 AI 技能框架，旨在为 AI Agent 提供专家级能力。通过 Superpowers，用户可以将特定领域的知识和工作流封装为可重用的技能（Skills），让 AI 在执行任务时能够自动调用这些技能。

Superpowers 的核心理念是「让 AI 具备专业领域知识」，就像为 AI 配备了一个随身携带的专家团队。

## Superpowers 架构

### 技能类型

Superpowers 将技能分为两类：

1. **Rigid Skills（刚性技能）**：严格遵循预设流程，如 TDD（测试驱动开发）、Debugging
   - 使用时必须完全按照规范执行
   - 不允许随意调整流程

2. **Flexible Skills（柔性技能）**：可以灵活适应上下文，如 Patterns
   - 可以根据实际情况调整实现方式
   - 需要理解技能背后的原理

### 技能层级

```
Superpowers
├── 基础技能（Built-in）
│   ├── playwright
│   ├── frontend-ui-ux
│   ├── git-master
│   ├── dev-browser
│   ├── review-work
│   └── ai-slop-remover
│
├── 用户技能（User-installed）
│   ├── doc-coauthoring
│   ├── blog-do-publish
│   ├── pdf
│   ├── docx
│   ├── xlsx
│   ├── pptx
│   ├── mcp-builder
│   └── article-writer
│
└── 超级技能（Superpowers）
    ├── using-superpowers
    ├── brainstorming
    ├── test-driven-development
    ├── systematic-debugging
    ├── verification-before-completion
    ├── requesting-code-review
    ├── receiving-code-review
    ├── finishing-a-development-branch
    ├── writing-plans
    ├── executing-plans
    ├── subagent-driven-development
    ├── writing-skills
    ├── skill-creator
    ├── using-git-worktrees
    └── dispatching-parallel-agents
```

## 如何使用 Superpowers

### 1. 技能加载

当任务需要特定技能时，系统会自动加载相应的技能：

```
If you think there is even a 1% chance a skill might apply to what you are doing, 
you ABSOLUTELY MUST invoke the skill.
```

### 2. 使用技能工具

使用 `/skill` 命令查看可用技能列表：

```
/skill list
```

### 3. 加载特定技能

当需要使用某个技能时，使用 `/skill invoke` 命令：

```
/skill invoke brainstorming
```

## 核心技能详解

### 1. brainstorming（头脑风暴）

在创建功能、组件、功能或修改行为之前必须使用的技能。用于探索用户意图、需求和设计。

**触发条件**：
- 创建新功能
- 构建组件
- 添加功能
- 修改行为

**流程**：
1. 明确用户意图
2. 收集需求
3. 设计方案
4. 评估可行性

### 2. test-driven-development（TDD）

实现任何功能或 bugfix 之前必须使用的技能。

**流程**：
1. 编写失败的测试
2. 运行测试确认失败
3. 实现最小代码使测试通过
4. 运行测试确认通过

### 3. systematic-debugging（系统调试）

遇到任何 bug、测试失败或意外行为时必须使用的技能。

**流程**：
1. 复现问题
2. 收集信息
3. 形成假设
4. 验证假设
5. 修复问题

### 4. verification-before-completion（完成前验证）

在声称工作完成、修复、测试通过之前必须使用的技能。

**要求**：
- 运行验证命令
- 确认输出正确
- 先有证据再断言

### 5. subagent-driven-development（子代理驱动开发）

执行具有独立任务的实现计划时使用的技能。

**流程**：
1. 将任务分解为独立单元
2. 为每个单元创建子代理
3. 并行执行
4. 验证结果

### 6. using-git-worktrees

需要隔离工作或执行实现计划时使用的技能。

**功能**：
- 创建隔离的 git worktree
- 智能选择目录
- 安全验证

### 7. dispatching-parallel-agents

面对 2 个或更多可以并行处理且无共享状态或顺序依赖的任务时使用。

**触发条件**：
- 2+ 独立任务
- 无共享状态
- 无顺序依赖

### 8. writing-plans

有规范或需求进行多步骤任务之前使用。

**输出**：
- 任务分解
- 实现计划
- 验收标准

### 9. skill-creator

创建新技能、修改和优化现有技能、测量技能性能时使用。

## 技能创建指南

### 1. 创建新技能

使用 skill-creator 技能：

```bash
/skill invoke skill-creator
```

### 2. 技能结构

每个技能包含：
- 技能描述（Description）
- 触发条件（Triggers）
- 工作流程（Workflow）
- 示例（Examples）

### 3. 技能命名规范

- 使用 kebab-case 命名
- 描述性名称
- 动词+名词形式

### 4. 技能评估

创建技能后，需要评估：
- 触发准确性
- 实用性
- 性能影响

## 最佳实践

### 1. 何时使用技能

当遇到以下情况时，必须使用相应技能：

| 场景 | 技能 |
|------|------|
| 创建新功能 | brainstorming → test-driven-development |
| 修复 bug | systematic-debugging → verification-before-completion |
| 多任务并行 | dispatching-parallel-agents |
| 实现计划 | subagent-driven-development → verification-before-completion |
| 代码审查 | requesting-code-review → receiving-code-review |

### 2. 避免误用

- 不要在不需要时触发技能
- 不要跳过必要的技能
- 不要替代用户做决定

### 3. 技能组合

可以组合多个技能：

```
brainstorming → test-driven-development → verification-before-completion → requesting-code-review
```

## 常见问题

### 1. 技能何时触发？

当任务描述与技能的触发条件匹配时，即使只有 1% 的可能性，也应该触发相应技能。

### 2. 如何选择技能？

根据任务类型选择：
- 创造性工作 → brainstorming
- 测试驱动 → test-driven-development
- 问题排查 → systematic-debugging

### 3. 技能优先级？

1. 流程技能优先（brainstorming, debugging）
2. 实现技能其次（frontend-design, mcp-builder）

## 总结

Superpowers 为 OpenCode 平台提供了强大的自动化能力。通过合理使用技能系统，可以：

- 提高任务执行效率
- 保证工作质量
- 标准化工作流程
- 降低出错概率

掌握 Superpowers 的使用是成为高效 OpenCode 用户的关键。建议在日常工作中多加练习，熟悉各类技能的触发条件和使用方法。

## 参考链接

- OpenCode 官方文档
- Superpowers 技能库

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/superpowers-automation-guide/  

