# DeerFlow 2.0：字节跳动的开源超级智能体框架


# DeerFlow 2.0：字节跳动的开源超级智能体框架

## 什么是 DeerFlow

DeerFlow（Deep Exploration and Efficient Research Flow）是字节跳动开源的超级智能体（SuperAgent）框架。它能够研究、编码和创造，通过沙箱、记忆、工具、技能和子智能体的协作，处理从几分钟到几小时不等的多层次任务。

DeerFlow 2.0 于 2026 年 2 月 27 日发布，一经推出便迅速登上 GitHub Trending 第一名，24 小时内获得 35,300+ 颗星，目前累计已超过 45,000 颗星。

> ⚠️ 注意：DeerFlow 2.0 是完全重写的版本，与 1.0 版本没有共享代码。

## 核心特性

### 1. 沙箱执行（Sandbox）

DeerFlow 在隔离的沙箱环境中执行代码，确保安全性和稳定性：

```yaml
# Docker 沙箱配置示例
sandbox:
  use: src.community.aio_sandbox:AioSandboxProvider
  image: enterprise-public-cn-beijing.cr.volces.com/vefaas-public/all-in-one-sandbox:latest
  port: 8080
  auto_start: true
  container_prefix: deer-flow-sandbox
```

- 隔离执行环境
- 支持代码运行
- 网络请求转发
- 文件系统访问

### 2. 持久记忆（Memory）

DeerFlow 具有强大的记忆功能，可以在对话之间保持上下文：

```python
class MemoryMiddleware:
    def before_model(self, state, runtime):
        # 注入记忆上下文
        memory_content = format_memory_for_injection(
            memory_data,
            max_tokens=config.max_injection_tokens,
            current_context=conversation_context,
        )
        # 注入为系统消息
        memory_message = SystemMessage(
            content=f"<memory>\n{memory_content}\n</memory>",
            name="memory_context",
        )
```

- 长期记忆存储
- 上下文感知检索
- 自动事实提取

### 3. 子智能体（Sub-Agents）

支持将任务委托给专门的子智能体处理：

- **研究子智能体**：负责信息收集和整理
- **编码子智能体**：负责代码编写和调试
- **创建子智能体**：负责内容生成

### 4. 可扩展工具（Tools）

内置丰富的工具集：

- **网络搜索**：获取最新信息
- **内容抓取**：爬取网页内容
- **代码执行**：运行 Python 代码
- **文件管理**：读写文件
- **知识检索**：RAG 知识库查询

### 5. 消息网关（Message Gateway）

支持多渠道消息接入和分发。

### 6. 技能系统（Skills）

通过技能扩展框架能力：

```yaml
# 技能配置示例
skills:
  - name: web_search
    type: search
    provider: tavily
  - name: code_executor
    type: sandbox
    language: python
```

## 架构设计

DeerFlow 2.0 采用现代化的全栈架构：

### 技术栈

- **后端**：Python + LangGraph
- **前端**：React + TypeScript
- **数据库**：SQLite（本地存储）
- **执行环境**：Docker 沙箱

### 核心架构

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│         (React + TypeScript Web App)                      │
├─────────────────────────────────────────────────────────┤
│                    Backend API Layer                      │
│         (FastAPI + WebSocket)                             │
├─────────────────────────────────────────────────────────┤
│                   LangGraph Core                         │
│  ┌─────────────┬─────────────┬─────────────┐           │
│  │   Planner   │   Executor  │   Memory    │           │
│  │   Agent     │   Agent     │   Manager   │           │
│  └─────────────┴─────────────┴─────────────┘           │
├─────────────────────────────────────────────────────────┤
│                   Tool Integration                        │
│  ┌─────────┬─────────┬─────────┬─────────┐              │
│  │ Search  │ Crawl  │  Code   │  File   │              │
│  └─────────┴─────────┴─────────┴─────────┘              │
├─────────────────────────────────────────────────────────┤
│              Sandboxed Execution                         │
│         (Docker Container per Thread)                    │
└─────────────────────────────────────────────────────────┘
```

### 线程隔离

每个对话/任务运行在独立的线程环境中：
- 独立的内存空间
- 独立的文件系统
- 独立的网络访问

## 安装部署

### 前置要求

- Python 3.10+
- Docker
- Node.js 18+（前端开发）
- OpenAI API Key 或其他 LLM 提供商

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/bytedance/deer-flow.git
cd deer-flow

# 2. 安装后端依赖
cd backend
pip install -r requirements.txt

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入 API Key

# 4. 启动后端
python -m src.main

# 5. 启动前端（另一个终端）
cd frontend
npm install
npm run dev
```

### Docker 部署

```bash
# 使用 Docker Compose
docker compose up -d
```

## 使用方法

### 基本使用流程

1. **创建任务**：在 Web 界面输入任务描述
2. **智能规划**：Agent 自动规划执行步骤
3. **执行任务**：按计划执行各步骤
4. **返回结果**：汇总并展示结果

### 配置 LLM

编辑 `backend/.env` 文件：

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# 或使用其他提供商
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-...
```

### 示例任务

```python
# 研究任务
"帮我调研一下最新的 AI Agent 框架发展趋势"

# 编码任务
"写一个 Python 脚本来分析 CSV 文件并生成图表"

# 创建任务
"写一篇关于 Rust 编程语言的文章"
```

## 与 1.0 版本对比

| 特性 | DeerFlow 1.0 | DeerFlow 2.0 |
|-----|-------------|--------------|
| 架构 | 基础架构 | LangGraph 重构 |
| 代码共享 | - | 零共享，完全重写 |
| 沙箱 | 基础隔离 | Docker 隔离 |
| 记忆 | 简单存储 | TF-IDF 上下文感知 |
| 扩展性 | 有限 | 技能系统 |
| 活跃状态 | 维护中 | 活跃开发 |

## 应用场景

1. **深度研究**：自动化信息收集和报告生成
2. **代码开发**：辅助编程和调试
3. **数据分析**：执行分析脚本和可视化
4. **内容创作**：生成文章、文档
5. **知识管理**：构建私人知识库

## 总结

DeerFlow 2.0 是一个功能强大的开源超级智能体框架。它通过 LangGraph 实现了灵活的编排能力，结合沙箱执行、持久记忆和可扩展工具，能够处理复杂的多步骤任务。

对于需要构建 AI 助手、研究自动化工具或知识管理系统的开发者来说，DeerFlow 2.0 是一个值得关注的选项。

## 参考链接

- GitHub：https://github.com/bytedance/deer-flow
- 官方文档：https://github.com/bytedance/deer-flow/blob/main/README.md
- 社区讨论：https://github.com/bytedance/deer-flow/discussions

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/deerflow-2-introduction/  

