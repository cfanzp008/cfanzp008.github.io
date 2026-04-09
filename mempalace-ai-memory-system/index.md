# MemPalace - GitHub 最强 AI 记忆系统


# MemPalace - GitHub 最强 AI 记忆系统

## 简介

MemPalace 是一款开源的 AI 记忆系统，由《生化危机》女主角 Milla Jovovich 与程序员老友 Ben Sigman 及 Claude 共同打造。

该项目在 LongMemEval 基准测试中拿下**96.6% 的史上最高分**，而且完全免费、本地可运行。

> GitHub: https://github.com/milla-jovovich/mempalace
> Stars: 30,000+ | Fork: 3,800+

## 为什么需要 AI 记忆系统

现在的 AI 对话存在一个核心问题：**每次对话都是从头开始**，AI 不记得你们之前聊过什么。

传统方案要么把所有历史塞进上下文（成本太高），要么用向量数据库搜索（效果有限）。

MemPalace 提出了全新的解决思路：**记忆宫殿法**。

## 核心设计：记忆宫殿

MemPalace 的名字来源于古希腊演说家常用的"记忆宫殿法"——通过在脑中构建虚拟空间来存储和检索信息。

### 层级结构

```
Palace（宫殿）
├── Wings（翅膀）- 一个人或一个项目
│   └── Rooms（房间）- 具体主题（如认证、计费、部署）
│       └── Drawers（抽屉）- 原始对话记录
│       └── Closets（衣柜）- 压缩摘要
│   └── Halls（走廊）- 记忆属性（建议、偏好、决策）
└── Tunnels（隧道）- 打通不同 wing 的同一主题
```

### 检索效率

在 22000+ 真实对话中的测试结果：

| 检索方式 | 效果 |
|---------|------|
| 全局乱搜 | 基础 |
| 限定 Wing | +12% |
| 加上 Hall | +24% |
| 精确到 Room | **+34%** |

## 性能对比

### 基准测试成绩

| 基准 | 分数 |
|------|------|
| LongMemEval (RAW) | **96.6%** |
| ConvoMem | 92.9% |
| LoCoMo | 100% |

### 成本对比

6 个月对话数据（约 1950 万 tokens）：

| 方案 | 年成本 | 效果 |
|------|-------|------|
| 全部塞入上下文 | ~$507 | 丢信息 |
| 总结压缩 | ~$3500 | 丢细节 |
| MemPalace | **~$10** | 不牺牲 |

## 安装使用

### 安装

```bash
pip install mempalace
```

### 初始化

```bash
# 创建记忆宫殿
mempalace init ~/projects/myapp

# 挖掘项目数据
mempalace mine ~/projects/myapp

# 挖掘对话记录
mempalace mine ~/chats/ --mode convos
```

### 使用方式

**自动模式**（需要 MCP 支持）：

```bash
claude mcp add mempalace -- python -m mempalace.mcp_server
```

**手动模式**：

```bash
# 加载基础记忆（170 tokens）
mempalace wake-up > context.txt

# 按需搜索
mempalace search "auth decisions" > results.txt
```

### Python API

```python
from mempalace.searcher import search_memories

results = search_memories("auth decisions", palace_path="~/.mempalace/palace")
```

## 核心技术

### AAAK 语言

MemPalace 为 AI 专用设计了一种压缩语言 AAAK，可以在保持精度的同时大幅减少 token 消耗。

- RAW 模式：96.6% 召回率
- AAAK 模式：84.2% 召回率，省 token

### 记忆堆栈

```
L0 + L1: 常驻记忆（~170 tokens）- 每次对话加载
L2: 房间级召回（按需）
L3: 全局深度搜索
```

### 本地隐私

所有数据都在本地处理，不上传云端，解决隐私担忧。

## 团队背景

MemPalace 由"一个架构师 + 一个程序员 + Claude"打造：

- **架构师**：Milla Jovovich（《生化危机》女主角）
- **程序员**：Ben Sigman（资深开发者）
- **AI**：Claude

据 Milla 介绍，她私下一直在做游戏项目，过程中意识到信息管理比项目本身更重要，于是找到了相识 20 年的老朋友 Ben 一起研究这个问题。

## 总结

MemPalace 是一个革命性的 AI 记忆系统：

- 史上最高分：LongMemEval 96.6%
- 超低成本：年费用约 $10
- 完全本地：隐私安全
- 开源免费：GPLv3

如果你想让 AI 记住你们之前的对话，MemPalace 值得一试。

**项目地址：** https://github.com/milla-jovovich/mempalace

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/mempalace-ai-memory-system/  

