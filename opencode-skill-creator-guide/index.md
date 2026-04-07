# OpenCode Skill Creator 使用指南


# OpenCode Skill Creator 使用指南

## 什么是 Skill Creator

Skill Creator 是 OpenCode 平台的一个强大工具，用于创建和管理自定义技能（Skills）。它允许用户将重复性的工作流程封装成可复用的技能，让 AI 助手能够自动化执行复杂任务。

**核心价值：**
- 将工作流程固化为可复用的技能
- 让 AI 助手具备领域专业知识
- 提高团队协作效率
- 标准化工作流程

## Skill Creator 工作流程

Skill Creator 遵循一套标准化的创建流程：

```mermaid
graph LR
    A[理解需求] --> B[编写草稿]
    B --> C[创建测试用例]
    C --> D[运行测试]
    D --> E[用户评估]
    E --> F{是否满意?}
    F -->|否| B
    F -->|是| G[优化触发描述]
    G --> H[打包发布]
```

### 第一步：理解需求

在创建技能之前，需要明确回答以下问题：

1. **技能目标**：这个技能要解决什么问题？
2. **触发条件**：用户什么情况下会使用这个技能？
3. **输出格式**：期望的输出是什么样的？
4. **测试验证**：如何验证技能是否正常工作？

### 第二步：编写 SKILL.md

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

#### 描述编写技巧

描述是技能触发的关键。需要：

- 包含具体的触发短语（"当用户说 XXX 时使用"）
- 说明技能的具体用途
- 使用"pushy"风格，提高触发准确性

**示例：**
```yaml
description: "创建博客文章技能。当用户说'写一篇关于XXX的文章'、'帮我写个博客'、'创建一个技术教程'时使用。此技能自动生成符合 Hugo 博客规范的 Markdown 文章。"
```

### 第三步：创建测试用例

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

### 第四步：运行测试

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

### 第五步：评估与优化

使用 `eval-viewer` 查看测试结果：

```bash
python eval-viewer/generate_review.py \
  <workspace>/iteration-N \
  --skill-name "my-skill" \
  --benchmark <workspace>/benchmark.json
```

**优化方向：**
- 通用化：从具体反馈中提取普遍问题
- 精简提示：移除冗余内容
- 解释原理：帮助模型理解"为什么"

## 技能文件结构

```
skill-name/
├── SKILL.md           # 必需：技能定义文件
├── scripts/           # 可选：辅助脚本
├── references/        # 可选：参考文档
└── assets/            # 可选：资源文件
```

### SKILL.md 编写规范

**渐进式披露（Progressive Disclosure）：**

技能使用三层加载机制：
1. **元数据**（name + description）：始终加载（约 100 词）
2. **正文**：技能触发时加载（<500 行为佳）
3. **资源文件**：按需加载

**写作风格：**
- 使用祈使句
- 解释"为什么"而非硬性规定
- 保持通用性，避免过度专一

## 实战案例

### 案例：创建博客写作技能

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

### Q: 如何提高触发准确性？

A: 
1. 使用具体触发短语
2. 包含边缘案例说明
3. 使用"pushy"风格描述
4. 运行触发评估优化

### Q: 测试用例多少合适？

A: 建议 3-5 个，覆盖：
- 核心功能
- 边界情况
- 常见变体

## 最佳实践

1. **从真实需求出发**：不要为了创建技能而创建
2. **小步迭代**：先做 MVP，持续优化
3. **文档完整**：包括使用说明和示例
4. **版本控制**：记录变更历史
5. **社区分享**：好的技能值得分享

## 总结

Skill Creator 是 OpenCode 平台的核心能力之一，它让用户能够：

- **封装知识**：将专家经验转化为可复用技能
- **自动化流程**：减少重复性工作
- **团队协作**：共享和复用技能
- **持续优化**：通过测试和反馈迭代改进

掌握 Skill Creator，你就能让 AI 助手成为真正的领域专家。

## 参考资源

- [OpenCode 官方文档](https://opencode.ai)
- [Skill Creator GitHub](https://github.com/opencode-ai/skill-creator)
- 示例技能：[article-writer](https://github.com/cfanzp/config/tree/main/opencode/skills/article-writer)


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/opencode-skill-creator-guide/  

