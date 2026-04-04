# Hermes Agent：会自我进化的 AI 智能体


# Hermes Agent：会自我进化的 AI 智能体

## 什么是 Hermes Agent

Hermes Agent 是由 Nous Research 开发的开源 AI 智能体，核心理念是"The agent that grows with you"（与你共同成长的智能体）。该项目在 GitHub 上已获得 **24,500+ 颗星**，是当前最受欢迎的自进化 AI 智能体之一。

### 核心理念

大多数 AI 智能体本质上只是"带有额外步骤的聊天机器人"——你与它们对话，它们忘记一切，下次重新开始。Hermes Agent 采取了不同的方式：

- **长期记忆**：记住学习到的知识
- **自我进化**：从工作中不断学习和改进
- **持续成长**：随着使用时间增长变得更加智能

## 核心特性

### 1. 持久记忆系统

- 跨会话记住重要信息
- 自动保存学习到的知识
- 知识可以复用和积累

### 2. 自我进化能力

- 从成功和失败中学习
- 自动优化工作流程
- 逐渐适应用户的习惯和偏好

### 3. 多平台运行

- 本地运行（保护隐私）
- 支持 Ollama 部署
- 云端 API 调用
- 多模型支持

### 4. Agent 工作流

- 自主规划和执行任务
- 工具调用和工具创建
- 多步骤复杂任务处理

### 5. 开源免费

- 完全开源
- MIT 许可证
- 社区活跃

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

## 使用方法

### 基本使用

```bash
# 启动交互式对话
python main.py

# 指定模型
python main.py --model hermes-agent

# 本地模式
python main.py --local --model llama3
```

### 配置自定义工具

```python
# 在 tools 目录添加自定义工具
# 工具会自动注册到 Agent
```

### 记忆管理

```bash
# 查看记忆
python -m memory list

# 导出记忆
python -m memory export

# 清除记忆
python -m memory clear
```

## 与其他 Agent 对比

| 特性 | Hermes Agent | OpenClaw | Claude Code |
|-----|-------------|----------|-------------|
| 记忆持久化 | ✅ | ✅ | ❌ |
| 自我进化 | ✅ | ❌ | ❌ |
| 本地运行 | ✅ | ✅ | ✅ |
| 开源 | ✅ | ✅ | ❌ |
| Stars | 24.5K | 29K | - |

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

Hermes Agent 是一个具有革命性意义的 AI 智能体：

- ✅ **持久记忆** - 记住跨会话的信息
- ✅ **自我进化** - 从经验中学习和改进
- ✅ **本地运行** - 保护隐私安全
- ✅ **完全开源** - 社区活跃可定制
- ✅ **多模型支持** - 灵活选择

如果你需要一个能够"记住"并"成长"的 AI 助手，Hermes Agent 是极佳的选择。

## 参考链接

- GitHub：https://github.com/NousResearch/hermes-agent
- Nous Research：https://nousresearch.com/
- 官方文档：https://github.com/NousResearch/hermes-agent/blob/main/README.md

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/hermes-agent-introduction/  

