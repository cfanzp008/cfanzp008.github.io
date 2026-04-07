# OpenCode Skill Creator 使用指南


# OpenCode Skill Creator 使用指南

## 什么是 Skill Creator

Skill Creator 是 Anthropic 官方提供的 Skill 开发助手，帮助开发者创建、优化和打包技能。它是 Claude Code 生态中用于扩展 Agent 能力的重要机制。

在 Claude Code / OpenCode 中，**Skill（技能）** 是一种可复用的能力扩展包，本质上是一个模块化知识包，可以给 AI 添加：

- 专业领域知识
- 固定工作流程
- API / 工具使用方式
- 模板和脚本

简单理解：**Skill = 给 AI 写的一份操作说明书**

**核心价值：**
- 将工作流程固化为可复用的技能
- 让 AI 助手具备领域专业知识
- 提高团队协作效率
- 标准化工作流程

## 思维导图：Skill Creator 整体架构

```
                         ┌─────────────────────────────────────────┐
                         │        Skill Creator 框架              │
                         │    AI 技能开发与评估工具链             │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│      技能结构        │        │     工作流程        │        │     核心工具        │
│   (File Structure)   │        │    (Workflow)       │        │      (Tools)       │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─SKILL.md（核心）                ├─需求询问                        ├─skill-creator
          ├─scripts/                       ├─起草 SKILL.md                  ├─eval-viewer
          ├─references/                    ├─设计测试用例                    ├─agents/
          ├─assets/                       ├─运行测试                        ├─scripts/
          └─evals/                        ├─评估结果                        └─references/
                                       └─优化迭代
                                            │
                                            ▼
                              ┌─────────────────────────────────┐
                              │        完整开发循环              │
                              ├─────────────────────────────────┤
                              │ 1. 想清楚需求                   │
                              │ 2. 起草 SKILL.md               │
                              │ 3. 设计测试用例                 │
                              │ 4. 运行测试（有 vs 无技能）     │
                              │ 5. 评估结果（看报告+打分）       │
                              │ 6. 根据反馈修改                 │
                              │ 7. 重复直到满意                  │
                              │ 8. 打包成 .skill 文件           │
                              └─────────────────────────────────┘
```

## 安装 skill-creator

### 安装 Anthropic Skills 集合

```bash
# 使用 npx 安装
npx skills add https://github.com/anthropics/skills --skill skill-creator

# 或者使用 claude 命令
claude install anthropics/skills/skill-creator
```

安装完成后，本地会下载该 Skill，包含以下目录结构：

```
skills/skill-creator/
├── SKILL.md          ← 核心说明文件
├── agents/           ← 内置的评审助手
├── eval-viewer/      ← 测试结果可视化工具
├── references/       ← 参考文档（数据格式说明等）
└── scripts/          ← 自动化脚本（打包、测评等）
```

### 调用 skill-creator

安装完成后，在 Claude 中调用：

```
/skill-creator
```

## Skill 文件结构

```
skill-name/
├── SKILL.md           # 必需：技能定义文件（核心）
├── scripts/           # 可选：辅助脚本
├── references/        # 可选：参考文档
├── assets/            # 可选：资源文件
└── evals/             # 可选：测试用例
    └── evals.json
```

### SKILL.md 编写规范

Skill 的核心文件是 `SKILL.md`，包含以下结构：

```yaml
---
name: skill-name
description: 技能描述，说明何时触发此技能
---

# 技能名称

## 核心功能
详细说明技能的功能

## 使用示例
提供具体的使用示例
```

**渐进式披露（Progressive Disclosure）：**

技能使用三层加载机制：
1. **元数据**（name + description）：始终加载（约 100 词）
2. **正文**：技能触发时加载（<500 行为佳）
3. **资源文件**：按需加载

**写作风格：**
- 使用祈使句
- 解释"为什么"而非硬性规定
- 保持通用性，避免过度专一

## 使用 skill-creator 创建 Skill

### 需求询问

Claude 会先问几个问题，帮你把需求想清楚。你不需要一次说完所有细节，像聊天一样回答就行。

**Claude 通常会问：**

1. 这个 Skill 具体做什么？
2. 什么情况下触发（用户说什么、上传什么文件）？
3. 输出是什么格式？
4. 有没有特殊要求（固定模板、特定格式规范……）？

**示例对话：**

> 你：我想做一个 Skill，把会议录音的文字稿整理成结构化的会议纪要。
> 
> Claude：好的，我来问几个问题帮你确认需求：
> - 纪要里需要包含哪些内容？（比如：时间、参与人、决议、行动事项……）
> - 输出格式是 Word 文档、Markdown，还是直接在对话里回复？
> - 有没有固定的纪要模板？

**这个阶段的目标：把所有细节和边界情况说清楚，不要跳过，后面测试时踩的坑大多源于这里没说清楚。**

### 草稿生成

确认需求后，Claude 会写出 SKILL.md 草稿，还会创建参考文件：

```
my-skill/
├── SKILL.md              ← 核心技能定义
├── references/           ← 参考文件
│   └── template.md       ← 模板文件
└── evals/                ← 测试用例
    └── evals.json
```

创建完成后，会验证技能结构是否正确。

### 测试验证

验证通过后，会打包 Skill，并展示目录结构。然后可以测试：

```
整理以下会议纪要：一、会议基本信息
  会议主题：学习平台内容优化会议
  参会人员：张三、李四、王五
  会议时间：2025-XX-XX 14:00-15:00
  记录人：张三
  ...
```

AI 会根据 Skill 的指导生成结构化的会议纪要。

## 测试与评估系统

### 创建测试用例

在 `evals/evals.json` 中定义测试用例：

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "用户的实际任务描述",
      "expected_output": "期望的结果描述",
      "files": []
    }
  ]
}
```

**测试用例设计原则：**
- 真实场景：从实际使用中提炼
- 多样性：覆盖不同输入类型
- 可验证：输出能够客观评判
- 建议 3-5 个，覆盖核心功能、边界情况、常见变体

### 运行测试

运行对比测试，评估技能效果：

1. **启动带技能版本**：使用新创建的技能执行任务
2. **启动基准版本**：不使用技能执行相同任务
3. **收集数据**：记录 token 消耗和执行时间

```bash
# 启动测试
python -m scripts.run_loop \
  --eval-set evals/evals.json \
  --skill-path ./my-skill \
  --model <model-id> \
  --max-iterations 5
```

### eval-viewer 评估结果

使用 `eval-viewer` 查看测试结果：

```bash
python eval-viewer/generate_review.py \
  <workspace>/iteration-N \
  --skill-name "my-skill" \
  --benchmark <workspace>/benchmark.json
```

eval-viewer 提供：
- 测试结果可视化
- 性能对比报告
- 评分与反馈

**优化方向：**
- 通用化：从具体反馈中提取普遍问题
- 精简提示：移除冗余内容
- 解释原理：帮助模型理解"为什么"

## 描述编写技巧

描述是技能触发的关键。需要：

- 包含具体的触发短语（"当用户说 XXX 时使用"）
- 说明技能的具体用途
- 使用"pushy"风格，提高触发准确性

**示例：**
```yaml
description: "创建博客文章技能。当用户说'写一篇关于XXX的文章'、'帮我写个博客'、'创建一个技术教程'时使用。此技能自动生成符合 Hugo 博客规范的 Markdown 文章。"
```

### 提高触发准确性

1. 使用具体触发短语
2. 包含边缘案例说明
3. 使用"pushy"风格描述
4. 运行触发评估优化

## 实战案例：创建博客写作技能

**需求分析：**
- 目标：为 Hugo 博客自动生成符合主题规范的文章
- 触发：用户请求写文章、创建博客帖子
- 输出：符合 FixIt 主题的 Markdown 文件

**SKILL.md 草稿：**

```yaml
---
name: article-writer
description: "写技术博客文章技能。当用户请求写文章、创建博客帖子、撰写技术文档、生成 Markdown 文章时使用。
特别适用于：用户说'写一篇关于XXX的文章'、'帮我写个博客'等场景。"
---

# 技术博客文章写作技能

## 项目信息
- **项目路径**: `/data/note`
- **文章目录**: `content/posts/`
- **主题**: FixIt

## 文章结构
推荐使用以下结构：
1. 背景/简介
2. 基本概念
3. 安装/配置
4. 核心功能
5. 实战案例
6. 常见问题
7. 总结
```

## 常见问题

### Q: 技能描述应该多长？

A: 描述是触发依据，应该足够详细以准确匹配意图。建议 50-150 词，包含：
- 具体触发场景
- 核心功能概述
- 适用/不适用情况

### Q: 测试用例多少合适？

A: 建议 3-5 个，覆盖：
- 核心功能
- 边界情况
- 常见变体

### Q: skill-creator 适合什么样的场景？

A: 适合需要 AI 遵循特定工作流程、输出格式或专业知识的场景。不适合简单的单次任务（如改一行代码）。

## 最佳实践

1. **从真实需求出发**：不要为了创建技能而创建
2. **小步迭代**：先做 MVP，持续优化
3. **文档完整**：包括使用说明和示例
4. **版本控制**：记录变更历史
5. **社区分享**：好的技能值得分享
6. **测试驱动**：用评估结果指导优化

## 总结

Skill Creator 是 AI 助手能力扩展的核心工具，它让用户能够：

- **封装知识**：将专家经验转化为可复用技能
- **自动化流程**：减少重复性工作
- **团队协作**：共享和复用技能
- **持续优化**：通过测试和反馈迭代改进

掌握 Skill Creator，你就能让 AI 助手成为真正的领域专家。

## 参考资源

- [Anthropic Skills GitHub](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
- [skill-creator 官方文档](https://www.runoob.com/claude-code/skill-creator-usage.html)
- [OpenCode 官方文档](https://opencode.ai)
- 示例技能：[article-writer](https://github.com/cfanzp/config/tree/main/opencode/skills/article-writer)


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/opencode-skill-creator-guide/  

