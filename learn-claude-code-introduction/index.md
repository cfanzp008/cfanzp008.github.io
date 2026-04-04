# Learn Claude Code：从零理解 Agent Harness 工程


# Learn Claude Code：从零理解 Agent Harness 工程

## 什么是 Learn Claude Code

Learn Claude Code 是一个开源的学习项目，旨在从零开始教学 Agent Harness（智能体 harness）的构建方法。该项目在 GitHub 上已获得 47,700+ 颗星，专注于帮助开发者理解 Claude Code 背后的设计原理。

项目的核心理念是：**模型本身才是智能体，代码只是构建智能体所处的环境（Harness）**。

## 核心观点：模型即智能体

### 传统理解的误区

很多人认为"构建智能体"就是写代码——使用工作流引擎、提示链、拖拽式编排工具来"组装"一个智能体。但作者认为这种做法本质上是一个"过度工程的 Rube Goldberg 机器"——一个充满 if-else 分支和硬编码路由逻辑的脆弱管道，中间塞了一个 LLM 作为"文本补全节点"。

这并不是真正的智能体。

### 真正的智能体定义

真正的智能体是：
- 一个神经网络（Transformer、RNN、学习函数）
- 通过数十亿次梯度更新在动作序列数据上训练
- 能够感知环境、推理目标、执行动作以达成目标

从 DeepMind DQN（2013）玩 Atari，到 OpenAI Five（2019）征服 Dota 2，再到 AlphaStar（2019）掌握星际争霸，每个里程碑的"智能体"都是**模型**，而不是周围的代码。

### Harness 的定义

Harness 是智能体在特定领域运作所需的一切：

```
Harness = Tools + Knowledge + Observation + Action Interfaces + Permissions

- Tools：文件读写、shell 执行、网络请求、数据库、浏览器
- Knowledge：产品文档、领域知识、API 规范、风格指南
- Observation：git diff、错误日志、浏览器状态、传感器数据
- Action：CLI 命令、API 调用、UI 交互
- Permissions：沙箱、审批工作流、信任边界
```

**模型决定，Harness 执行。模型推理，Harness 提供上下文。模型是驾驶员，Harness 是车辆。**

## 十二个渐进式课程

项目包含 12 个逐步递进的课程（s01-s12），每个课程添加一个 harness 机制：

### Phase 1：基础循环

| 课程 | 主题 | 核心理念 |
|-----|------|---------|
| s01 | Agent Loop | 一个 while 循环 + stop_reason = 一个智能体 |
| s02 | Tool Use | 添加一个工具只需添加一个 handler |

### Phase 2：规划与知识

| 课程 | 主题 | 核心理念 |
|-----|------|---------|
| s03 | TodoWrite | 智能体没有计划会迷失——先列步骤再执行 |
| s04 | Subagents | 拆分大任务，每个子任务独立上下文 |
| s05 | Skills | 按需加载知识，而非预先加载 |
| s06 | Context Compact | 上下文会满，需要压缩策略 |

### Phase 3：持久化

| 课程 | 主题 | 核心理念 |
|-----|------|---------|
| s07 | Tasks | 大目标拆分为小任务，持久化到磁盘 |
| s08 | Background Tasks | 后台运行慢操作，智能体继续思考 |

### Phase 4：团队协作

| 课程 | 主题 | 核心理念 |
|-----|------|---------|
| s09 | Agent Teams | 任务太大时委托给队友 |
| s10 | Team Protocols | 队友需要共享通信规则 |
| s11 | Autonomous Agents | 队友扫描任务板并自动认领 |
| s12 | Worktree Isolation | 每个工作在独立目录，无干扰 |

## 核心代码模式

项目的核心代码非常简洁：

```python
def agent_loop(messages):
    while True:
        response = client.messages.create(
            model=MODEL, system=SYSTEM,
            messages=messages, tools=TOOLS,
        )
        messages.append({"role": "assistant",
                         "content": response.content})

        if response.stop_reason != "tool_use":
            return

        results = []
        for block in response.content:
            if block.type == "tool_use":
                output = TOOL_HANDLERS[block.name](**block.input)
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": output,
                })
        messages.append({"role": "user", "content": results})
```

这就是最小的 Agent 循环。每个课程都是在这个循环上叠加一个 harness 机制——而不改变循环本身。

## 项目结构

```
learn-claude-code/
|
|-- agents/           # Python 参考实现（s01-s12 + s_full）
|-- docs/{en,zh,ja}/  # 思维模型优先的文档（3种语言）
|-- web/              # 交互式学习平台（Next.js）
|-- skills/           # s05 所需的技能文件
+-- .github/workflows/ci.yml  # CI: 类型检查 + 构建
```

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/shareAI-lab/learn-claude-code
cd learn-claude-code

# 安装依赖
pip install -r requirements.txt

# 复制环境配置
cp .env.example .env
# 编辑 .env 填入你的 ANTHROPIC_API_KEY

# 运行第一个课程
python agents/s01_agent_loop.py

# 运行完整版本
python agents/s_full.py
```

### Web 平台

```bash
cd web && npm install && npm run dev
# 访问 http://localhost:3000
```

## 相关项目

### Kode Agent CLI

开源的编码智能体 CLI：

```bash
npm i -g @shareai-lab/kode
```

支持技能和 LSP 支持、Windows 兼容，可插拔使用 GLM / MiniMax / DeepSeek 等模型。

GitHub: [shareAI-lab/Kode-cli](https://github.com/shareAI-lab/Kode-cli)

### Kode Agent SDK

嵌入到应用中的智能体 SDK，无 per-user 进程开销，可嵌入后端、浏览器扩展、嵌入式设备等。

GitHub: [shareAI-lab/Kode-agent-sdk](https://github.com/shareAI-lab/Kode-agent-sdk)

### claw0（姐妹项目）

从"按需会话"到"常驻助手"：

- **Heartbeat**：每 30 秒发送消息检查是否有任务
- **Cron**：智能体可以调度未来任务
- 多渠道 IM 路由（WhatsApp/Telegram/Slack/Discord 等 13+ 平台）
- 持久上下文记忆
- Soul 个性系统

```
learn-claude-code:  核心 harness（循环、工具、规划、团队、工作树隔离）
claw0:              主动常驻 harness（心跳、cron、IM 渠道、记忆、灵魂）
```

## 为什么选择 Claude Code 教学

因为 Claude Code 是"最优雅且完全实现的"智能体 harness：

```
Claude Code = 一个 agent 循环
            + 工具（bash, read, write, edit, glob, grep, browser...）
            + 按需技能加载
            + 上下文压缩
            + 子智能体生成
            + 带依赖图的任务系统
            + 团队协调与异步邮箱
            + 并行执行的工作树隔离
            + 权限治理
```

它不试图成为智能体，不施加刚性工作流，不通过复杂的决策树"二阶猜测"模型。它给模型工具、知识、上下文管理和权限边界——然后让开。

## 哲学总结

> **"The model IS the agent. The code is the harness. Build great harnesses. The agent will do the rest."**
>
> 模型就是智能体。代码只是 harness。构建出色的 harness，智能体会完成剩下的工作。

项目标题"Bash is all you need"表达的是：不需要复杂的工作流引擎，只需要基础的 shell 能力加上正确的 harness 机制，就能构建真正有效的智能体。

## 参考链接

- GitHub：https://github.com/shareAI-lab/learn-claude-code
- Kode CLI：https://github.com/shareAI-lab/Kode-cli
- Kode SDK：https://github.com/shareAI-lab/Kode-agent-sdk
- claw0：https://github.com/shareAI-lab/claw0

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/learn-claude-code-introduction/  

