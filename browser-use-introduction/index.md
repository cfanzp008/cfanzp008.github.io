# browser-use - AI 驱动的浏览器自动化工具


# browser-use - AI 驱动的浏览器自动化工具

## 简介

**browser-use** 是一个开源的 Python 库，旨在让 AI 代理（Agent）能够自动化操作网页浏览器。它通过结合大语言模型（LLM）和浏览器自动化技术（基于 Playwright），使得开发者可以用自然语言描述任务，让 AI 自动完成复杂的网页操作。

该项目在 GitHub 上获得了超过 9.1 万星标，是当前最热门的 AI 浏览器自动化工具之一。无论是表单填写、信息抓取、在线购物，还是自动化测试，browser-use 都能通过简单的 Python 代码来实现。

![browser-use 演示](https://raw.githubusercontent.com/browser-use/browser-use/main/static/banner.png)

## 核心特性

### 1. 自然语言驱动

不需要编写繁琐的 CSS 选择器或 XPath，只需用自然语言描述任务：

```python
task = "去 Hacker News 找到置顶帖子的标题和链接"
```

### 2. 多 LLM 支持

支持多种主流大语言模型：

| 模型提供商 | 类名称 | 示例模型 |
|-----------|---------|----------|
| Browser Use 专用 | `ChatBrowserUse` | `browser-use/bu-30b-a3b-preview` |
| OpenAI | `ChatOpenAI` | `gpt-4o`, `gpt-4.1-mini` |
| Anthropic | `ChatAnthropic` | `claude-sonnet-4-0` |
| Google | `ChatGoogle` | `gemini-flash-latest` |

### 3. 两种使用方式

**开源版本**：完全自托管，可深度定制工具和行为。

**Cloud 版本**：托管在 [Browser Use Cloud](https://cloud.browser-use.com)，提供更好的隐蔽性、代理轮换和验证码解决能力。

### 4. 丰富的功能

- **表单自动填写**：自动识别表单字段并填写
- **多标签页管理**：跨标签页操作和切换
- **结构化输出**：使用 Pydantic 模型定义输出格式
- **自定义工具**：扩展 Agent 能力
- **持久化浏览器会话**：复用登录状态
- **CLI 工具**：命令行快速操作

## 安装配置

### 环境要求

- Python >= 3.11
- Playwright（自动安装 Chromium）

### 使用 uv 安装（推荐）

```bash
# 创建虚拟环境并安装
uv init
uv add browser-use
uv sync

# 安装 Chromium（如果没有）
uvx browser-use install
```

### 使用 pip 安装

```bash
pip install browser-use
playwright install chromium
```

### 配置 API 密钥

创建 `.env` 文件：

```bash
# .env
BROWSER_USE_API_KEY=your-browser-use-key
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key
```

> 可以从 [Browser Use Cloud](https://cloud.browser-use.com/new-api-key) 获取专用 API 密钥。

## 快速上手

### 第一个 Agent

以下是一个最简单的示例，让 AI 自动访问 Hacker News 并获取置顶帖子：

```python
from browser_use import Agent, ChatBrowserUse
import asyncio

async def main():
    agent = Agent(
        task="Find the number of stars of the browser-use repo",
        llm=ChatBrowserUse(),
    )
    result = await agent.run()
    print(result.final_result())

if __name__ == "__main__":
    asyncio.run(main())
```

### 使用不同 LLM

**使用 OpenAI：**

```python
from browser_use import Agent, ChatOpenAI

agent = Agent(
    task="Go to Wikipedia and search for 'Python programming'",
    llm=ChatOpenAI(model="gpt-4o-mini"),
)
```

**使用 Anthropic Claude：**

```python
from browser_use import Agent, ChatAnthropic

agent = Agent(
    task="Find the top 3 posts on Hacker News",
    llm=ChatAnthropic(model='claude-sonnet-4-0'),
)
```

**使用 Google Gemini：**

```python
from browser_use import Agent, ChatGoogle

agent = Agent(
    task="Summarize the first result from DuckDuckGo search for 'browser automation'",
    llm=ChatGoogle(model='gemini-flash-latest'),
)
```

## 实战示例

### 1. 表单自动填写

自动填写求职申请表：

```python
from browser_use import Agent, ChatBrowserUse

task = """
1. Go to the job application form at https://example.com/apply
2. Fill in name with 'John Doe'
3. Fill in email with 'john@example.com'
4. Upload my resume from ./resume.pdf
5. Select '3-5 years' for experience
6. Click the submit button
"""

agent = Agent(task=task, llm=ChatBrowserUse())
result = await agent.run()
```

### 2. 结构化信息提取

从网页提取结构化数据：

```python
from pydantic import BaseModel
from browser_use import Agent, Controller, ChatOpenAI

class JobListing(BaseModel):
    title: str
    company: str
    location: str
    salary: str | None

class JobList(BaseModel):
    jobs: list[JobListing]

controller = Controller(output_model=JobList)

agent = Agent(
    task="""
    1. Go to indeed.com
    2. Search for 'Python developer' in 'San Francisco'
    3. Extract the first 5 job listings with title, company, location, and salary
    """,
    llm=ChatOpenAI(model="gpt-4o"),
    controller=controller,
)

result = await agent.run()
jobs = JobList.model_validate_json(result.final_result())
for job in jobs.jobs:
    print(f"{job.title} at {job.company} - {job.location}")
```

### 3. 使用持久化浏览器会话

复用已登录的浏览器配置：

```python
from browser_use import Agent, Browser, BrowserProfile, ChatBrowserUse

profile = BrowserProfile(
    headless=False,
    user_data_dir="./my_profile",  # 保存登录状态
)

browser = Browser(profile=profile)

agent = Agent(
    task="Log into my GitHub account and check my notifications",
    llm=ChatBrowserUse(),
    browser=browser,
)
```

### 4. 多步骤任务

复杂的多步骤自动化任务：

```python
task = """
1. Open https://instacart.com
2. Search for 'milk', 'eggs', 'bread', 'butter'
3. Add each item to the cart
4. Go to cart and verify all items are added
5. Return the total price
"""

agent = Agent(task=task, llm=ChatBrowserUse())
result = await agent.run()
print(result.final_result())
```

## CLI 命令行工具

browser-use 提供了便捷的命令行工具，适合快速操作和调试：

```bash
# 打开网页
browser-use open https://example.com

# 查看可点击元素
browser-use state

# 点击指定元素
browser-use click 5

# 输入文本
browser-use type "Hello World"

# 截图
browser-use screenshot page.png

# 关闭浏览器
browser-use close
```

CLI 会在命令之间保持浏览器运行，方便快速迭代。

## 自定义工具

可以扩展 Agent 的能力，添加自定义工具：

```python
from browser_use import Agent, Tools, ChatBrowserUse

tools = Tools()

@tools.action(description='Calculate the sum of two numbers.')
def calculate_sum(a: int, b: int) -> int:
    return a + b

@tools.action(description='Send an email to specified address.')
def send_email(to: str, subject: str, body: str) -> str:
    # 实现发送邮件的逻辑
    return f"Email sent to {to}"

agent = Agent(
    task="Calculate 15 + 27 and send the result via email",
    llm=ChatBrowserUse(),
    tools=tools,
)
```

## 开源 vs Cloud

| 特性 | 开源版本 | Cloud 版本 |
|------|---------|------------|
| 部署方式 | 自托管 | 完全托管 |
| 隐蔽性 | 基础 | 高级（防检测） |
| 代理轮换 | 需自行配置 | 自动 |
| 验证码解决 | 不支持 | 支持 |
| 集成数量 | 基础 | 1000+（Gmail、Slack、Notion 等） |
| 持久化存储 | 本地 | 云端 |
| 适用场景 | 开发、定制 | 生产、规模化 |

## 常见问题

### 如何选择 LLM 模型？

推荐使用 **ChatBrowserUse** 专用模型，它在浏览器自动化任务上进行了专门优化，平均完成任务速度比其他模型快 3-5 倍，且准确率最高。

**定价（每百万 tokens）：**
- 输入 tokens: $0.20
- 缓存输入 tokens: $0.02
- 输出 tokens: $2.00

### 如何处理需要登录的网站？

有两种方式：

1. **使用真实浏览器配置**：复用你本地 Chrome 的登录状态
2. **使用 AgentMail**：为临时账号提供邮箱验证
3. **同步认证配置**：使用官方脚本同步到远程浏览器

```python
# 使用真实浏览器配置示例
from browser_use import Browser, BrowserProfile

profile = BrowserProfile(
    user_data_dir="~/.config/google-chrome",
)
browser = Browser(profile=profile)
```

### 如何解决验证码（CAPTCHA）？

开源版本在应对验证码方面能力有限。对于生产环境，建议使用 **Browser Use Cloud**，它提供：

- 高级浏览器指纹伪装
- 自动代理轮换
- 内置验证码解决方案

### 可以用于生产环境吗？

对于小规模使用，开源版本完全够用。但对于大规模并行执行，推荐使用 Cloud API，它提供：

- 可扩展的浏览器基础设施
- 内存管理
- 代理轮换
- 高性能并行执行

## 相关资源

- [GitHub 仓库](https://github.com/browser-use/browser-use)
- [官方文档](https://docs.browser-use.com)
- [Cloud 平台](https://cloud.browser-use.com)
- [示例集合](https://docs.browser-use.com/examples)
- [Discord 社区](https://link.browser-use.com/discord)

## 总结

browser-use 将 AI 的自然语言理解能力与浏览器自动化完美结合，让复杂的网页操作变得简单直观。无论你是想自动化日常网页任务、构建 AI Agent 应用，还是进行网页数据抓取，browser-use 都是一个值得尝试的工具。

对于个人开发者和学习者，开源版本提供了足够的功能和灵活性；对于企业级应用，Cloud 版本则提供了更完善的解决方案。开始尝试吧，用自然语言控制你的浏览器！

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/browser-use-introduction/  

