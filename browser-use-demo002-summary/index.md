# browser-use demo002 实战总结


# browser-use demo002 实战总结

## 背景

在上一篇介绍 browser-use 的文章中，我们了解了这个 AI 驱动的浏览器自动化工具的基本概念。本文通过一个实际的 demo002.py 示例，深入分析 browser-use 的实际运行效果，包括配置细节、执行流程和结果分析。

## 示例代码分析

`demo002.py` 是一个最小化的 browser-use 使用示例，核心代码如下：

```python
import asyncio
from browser_use import Agent, BrowserProfile
from browser_use.llm import ChatOpenAI

async def main():
    # 1. 配置浏览器参数
    browser_profile = BrowserProfile(
        headless=True,
        args=[
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--remote-debugging-port=9222",  # 强制 CDP 端口
        ],
    )

    # 2. 配置 LLM（使用 OpenAI 兼容接口）
    llm = ChatOpenAI(
        model="gpt-5.4",
        # api_key="你的API密钥",  # 也可以通过环境变量 OPENAI_API_KEY 设置
        base_url="http://127.0.0.1:9900/v1",  # 替换为你的代理服务器地址
    )

    # 3. 创建 Agent 并执行任务
    agent = Agent(
        task="打开 https://example.com 并告诉我页面标题",
        llm=llm,
        browser_profile=browser_profile,
    )

    result = await agent.run()
    print(result)

asyncio.run(main())
```

### 关键配置说明

**BrowserProfile 配置：**

| 参数 | 作用 |
|------|------|
| `headless=True` | 无头模式运行，不显示浏览器窗口 |
| `--no-sandbox` | 禁用沙箱（容器环境常用） |
| `--disable-setuid-sandbox` | 禁用 setuid 沙箱 |
| `--disable-dev-shm-usage` | 避免 /dev/shm 空间不足问题 |
| `--disable-gpu` | 禁用 GPU 加速 |
| `--remote-debugging-port=9222` | 指定 CDP 调试端口 |

**LLM 配置：**

使用 OpenAI 兼容接口，通过 `base_url` 指向本地代理服务器（端口 9900），模型指定为 `gpt-5.4`。这种方式可以很方便地对接各种 OpenAI 兼容的服务。

## 运行结果分析

执行 `python3 ./demo002.py` 后，输出如下关键日志：

### 初始化阶段

```
INFO [Agent] 🎯 Task: 打开 https://example.com 并告诉我页面标题
INFO [Agent] Starting a browser-use agent with version 0.12.6, with provider=openai and model=gpt-5.4
INFO [BrowserSession] Setting viewport to 1024x768 with device scale factor 1.0
```

Agent 自动识别任务中的 URL，并将其作为初始动作加入执行队列。

### 执行阶段

```
INFO [Agent] 📍 Step 1:
INFO [Agent]   👍 Eval: 已成功打开目标页面，并且从当前页面内容可直接看到标题。Verdict: Success
INFO [Agent]   🧠 Memory: 当前位于 https://example.com/。页面可见主标题为"Example Domain"。
INFO [Agent]   🎯 Next goal: 向用户返回页面标题。
INFO [Agent]   ▶️    done: text: 页面标题是：Example Domain, success: True, files_to_display: None
```

Agent 的执行流程非常清晰：

1. **自动导航**：Agent 识别出任务中的 URL，自动执行 `navigate` 动作
2. **页面评估**：LLM 评估当前页面状态，确认已成功打开目标页面
3. **记忆更新**：记录当前位置和关键信息（页面标题）
4. **任务完成**：调用 `done` 动作，返回结果

### 最终结果

```
📄 Final Result:
页面标题是：Example Domain

INFO [Agent] ✅ Task completed successfully
```

任务成功完成，Agent 正确识别并返回了页面标题。

### 完整结果对象

`result` 变量是一个 `AgentHistoryList` 对象，包含完整的执行历史：

```python
AgentHistoryList(
    all_results=[
        ActionResult(
            is_done=False,
            success=None,
            extracted_content='🔗 Navigated to https://example.com',
            # ...导航结果
        ),
        ActionResult(
            is_done=True,
            success=True,
            judgement=JudgementResult(
                reasoning='用户任务有两个关键点：1) 打开 https://example.com；2) 告诉用户页面标题。...',
                verdict=True
            ),
            extracted_content='页面标题是：Example Domain',
            # ...最终结果
        ),
    ],
    all_model_outputs=[
        {'navigate': {'url': 'https://example.com', 'new_tab': False}},
        {'done': {'text': '页面标题是：Example Domain', 'success': True}},
    ]
)
```

这个结果对象非常重要，它包含了：
- 每一步的执行结果
- LLM 的判断推理过程
- 最终输出内容
- 完整的模型调用历史

## 中途中断的情况

`result.txt` 中还记录了另一个测试（`main.py`），使用 Ctrl+C 中断了执行：

```
INFO [Agent] 🎯 Task: 打开 https://example.com 并告诉我页面标题
^C

⏸️  Paused the agent and left the browser open.
        Press [Enter] to resume or [Ctrl+C] again to quit.
```

browser-use 支持 **暂停/恢复** 机制，按下 Ctrl+C 会暂停 Agent，保留浏览器状态，方便调试。再按一次 Ctrl+C 则完全退出。

## 关键要点总结

### 1. 任务自动解析

Agent 能够自动从自然语言任务中提取 URL，并作为初始动作执行，无需手动编写导航代码。

### 2. 执行过程透明

每一步都有详细的日志输出，包括：
- `Eval`：LLM 对当前状态的评估
- `Memory`：累积的上下文信息
- `Next goal`：下一步目标
- 具体执行的动作

### 3. 结果结构清晰

最终结果通过 `done` 动作返回，包含 `text`（输出文本）和 `success`（是否成功）两个关键字段。

### 4. 兼容接口灵活

通过 `base_url` 参数，可以轻松对接任何 OpenAI 兼容的服务，包括本地模型、代理服务等。

### 5. 调试友好

- 支持暂停/恢复
- 保留浏览器状态
- 完整的执行历史记录
- CDP 端口可指定，方便远程调试

## 常见问题与解决

### 页面加载超时

日志中出现了警告：

```
WARNING [BrowserSession] ⚠️ Page readiness timeout (8.0s, 8690ms) for https://example.com
```

这是因为在 8 秒内页面未触发 `load` 事件，但 browser-use 会继续执行，通常不影响后续操作。

### 无头模式下的调试

如果需要在无头模式下调试，可以：
- 设置 `headless=False` 显示浏览器窗口
- 指定 `--remote-debugging-port` 后，可用 Chrome DevTools 连接调试

### 使用自己的 LLM 服务

只需修改 `base_url` 和 `model` 参数：

```python
llm = ChatOpenAI(
    model="自定义模型名",
    base_url="http://你的服务地址/v1",
    api_key="你的密钥",
)
```

## 总结

通过这个简单的 demo002.py 示例，我们可以看到 browser-use 的核心工作流程：

1. **配置** → BrowserProfile（浏览器参数）+ LLM（模型配置）
2. **执行** → Agent 自动解析任务、规划步骤、执行动作
3. **结果** → 结构化的输出，包含完整执行历史

这个示例虽然简单，但涵盖了 browser-use 的核心用法。基于此，你可以扩展到更复杂的场景：多步骤任务、表单填写、数据提取等。

## 参考链接

- [browser-use GitHub](https://github.com/browser-use/browser-use)
- [browser-use 官方文档](https://docs.browser-use.com)
- [上一篇：browser-use 介绍文章](/browser-use-introduction/)

> 本文基于 `/home/ubuntu/test/demo002.py` 和 `result.txt` 的实际运行结果整理。

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/browser-use-demo002-summary/  

