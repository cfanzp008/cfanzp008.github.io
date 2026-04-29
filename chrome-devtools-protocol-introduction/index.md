# CDP (Chrome DevTools Protocol) 详解


# CDP (Chrome DevTools Protocol) 详解

## 简介

**Chrome DevTools Protocol（CDP）** 是 Google Chrome / Chromium 提供的一套底层调试协议，允许外部工具通过 JSON 消息对浏览器进行**检测、检查、调试和性能分析**。

你可能不知道，平时用的 Chrome DevTools 开发者工具，底层就是靠 CDP 来和浏览器通信的。而现在，越来越多的自动化工具（Puppeteer、Playwright、browser-use 等）都基于 CDP 构建。

在上一篇 [browser-use 实战总结](/browser-use-demo002-summary/) 中，我们看到了 `--remote-debugging-port=9222` 这个参数，这正是启用 CDP 的关键。

## 什么是 CDP

CDP 本质上是一个基于 **WebSocket** 的 JSON 消息协议。它将浏览器的各种能力划分为多个**域（Domain）**，每个域定义了一组支持的**命令（Commands）**和**事件（Events）**。

### 协议架构

```
┌──────────────────────────────────────────┐
│          Chrome / Chromium             │
│  ┌────────────────────────────────┐  │
│  │   DOM   Network   Page   ...  │  │
│  └────────────────────────────────┘  │
│            ▲      │                  │
│            │      ▼                  │
│     ┌─────────────────────┐         │
│     │   CDP WebSocket     │         │
│     └─────────────────────┘         │
└──────────────────────────────────────────┘
            ▲      │
            │      ▼
┌──────────────────────────────────────┐
│  DevTools / Puppeteer / Playwright │
└──────────────────────────────────────┘
```

### 核心域（Domains）

CDP 包含 40+ 个域，常用的有：

| 域 | 说明 |
|---|---|
| `Page` | 页面导航、截图、打印 |
| `Network` | 网络请求拦截、Cookie 管理 |
| `DOM` | DOM 树操作、节点查询 |
| `Runtime` | JavaScript 执行、表达式求值 |
| `Debugger` | JavaScript 调试、断点管理 |
| `Emulation` | 设备模拟、UA 伪装 |
| `Input` | 鼠标、键盘输入模拟 |
| `Browser` | 浏览器级别操作 |

## 启用 CDP

### 启动参数

要让 Chrome / Chromium 开启 CDP 服务，启动时加上 `--remote-debugging-port` 参数：

```bash
# 启动 Chrome 并开启 CDP，端口 9222
google-chrome --remote-debugging-port=9222

# 无头模式 + CDP
google-chrome --headless --remote-debugging-port=9222

# 指定 CDP 端口为 0，让浏览器自动选择可用端口
google-chrome --remote-debugging-port=0
```

> 在 [browser-use demo002](/browser-use-demo002-summary/) 中，我们用的就是这个参数：
> ```python
> browser_profile = BrowserProfile(
>     args=["--remote-debugging-port=9222"],
> )
> ```

### 验证是否启用成功

浏览器启动后，访问 `http://localhost:9222/json/version` 可以看到版本信息：

```json
{
  "Browser": "Chrome/126.0.6478.0",
  "Protocol-Version": "1.3",
  "User-Agent": "Mozilla/5.0 ... Chrome/126.0...",
  "webkit-Version": "537.36...",
  "webSocketDebuggerUrl": "ws://localhost:9222/devtools/browser/..."
}
```

## HTTP 端点

开启 CDP 后，同一端口会暴露多个 HTTP 端点，用于查询和操作浏览器：

### `GET /json/version`

获取浏览器版本元数据：

```json
{
  "Browser": "Chrome/72.0.3601.0",
  "Protocol-Version": "1.3",
  "webSocketDebuggerUrl": "ws://localhost:9222/devtools/browser/..."
}
```

### `GET /json` 或 `/json/list`

列出所有可用的 WebSocket Target（标签页）：

```json
[
  {
    "description": "",
    "devtoolsFrontendUrl": "/devtools/inspector.html?ws=localhost:9222/devtools/page/...",
    "id": "DAB7FB6187B554E10B0BD18821265734",
    "title": "Example Domain",
    "type": "page",
    "url": "https://example.com/",
    "webSocketDebuggerUrl": "ws://localhost:9222/devtools/page/DAB7FB6187B554E10B0BD18821265734"
  }
]
```

### `GET /json/protocol/`

获取当前浏览器支持的完整 CDP 协议定义（JSON 格式）：

```json
{
  "domains": [
    {
      "domain": "Accessibility",
      "experimental": true,
      "dependencies": ["DOM"],
      "types": [...],
      "commands": [...],
      "events": [...]
    }
  ]
}
```

### `PUT /json/new?{url}`

打开新标签页，返回新 Tab 的 Target 数据：

```bash
curl -X PUT "http://localhost:9222/json/new?https://example.com"
```

### `GET /json/activate/{targetId}`

将指定标签页置于前台（激活 Tab）：

```bash
curl "http://localhost:9222/json/activate/DAB7FB6187B554E10B0BD18821265734"
```

### `GET /json/close/{targetId}`

关闭指定标签页：

```bash
curl "http://localhost:9222/json/close/DAB7FB6187B554E10B0BD18821265734"
```

## WebSocket 通信

真正的 CDP 操作是通过 **WebSocket** 连接完成的。每个 Target（标签页）都有一个对应的 WebSocket URL。

### 连接格式

```
ws://localhost:9222/devtools/page/{targetId}
# 或浏览器级别：
ws://localhost:9222/devtools/browser/{browserId}
```

### 消息格式

CDP 消息是 JSON 对象，包含 `id`（请求 ID）、`method`（方法名）和 `params`（参数）：

**发送命令：**
```json
{
  "id": 1,
  "method": "Page.navigate",
  "params": {
    "url": "https://example.com"
  }
}
```

**接收响应：**
```json
{
  "id": 1,
  "result": {
    "frameId": "ABC123"
  }
}
```

**接收事件：**
```json
{
  "method": "Page.loadEventFired",
  "params": {
    "timestamp": 12345678.123
  }
}
```

### Python 示例：通过 WebSocket 操作浏览器

```python
import asyncio
import json
import websockets

async def main():
    # 1. 获取 Target 列表
    import urllib.request
    targets = json.loads(urllib.request.urlopen(
        "http://localhost:9222/json"
    ).read())
    
    # 2. 连接到第一个 page 的 WebSocket
    ws_url = targets[0]["webSocketDebuggerUrl"].replace("ws://", "ws://")
    
    async with websockets.connect(ws_url) as ws:
        # 3. 发送 Page.navigate 命令
        await ws.send(json.dumps({
            "id": 1,
            "method": "Page.navigate",
            "params": {"url": "https://example.com"}
        }))
        
        # 4. 接收响应
        response = await ws.recv()
        print("Response:", json.loads(response))
        
        # 5. 等待加载完成事件
        while True:
            msg = json.loads(await ws.recv())
            if msg.get("method") == "Page.loadEventFired":
                print("Page loaded!")
                break

asyncio.run(main())
```

## 使用场景

CDP 适用的场景非常广泛：

### 1. 浏览器自动化测试

Puppeteer、Playwright 等工具底层都使用 CDP 来控制浏览器，模拟用户操作、截图、生成 PDF 等。

### 2. 网页爬虫

通过 CDP 可以绕过一些反爬机制，获取动态渲染后的页面内容，拦截网络请求等。

### 3. 性能分析

使用 `Profiler`、`Performance` 等域，可以分析页面性能、内存使用等。

### 4. 远程调试

通过 CDP 可以远程调试设备上的 Chrome 浏览器，特别是移动端调试。

### 5. AI Agent 浏览器自动化

如 [browser-use](/browser-use-introduction/) 这样的 AI Agent 工具，通过 CDP 让 LLM 能够"看到"并操作网页。

## 基于 CDP 的主流工具

### Puppeteer（Node.js）

Google 官方出品，直接封装 CDP：

```javascript
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch({
    args: ['--remote-debugging-port=9222']
});
const page = await browser.newPage();
await page.goto('https://example.com');
await page.screenshot({ path: 'screenshot.png' });
```

### Playwright（Node.js / Python）

微软出品，支持 Chromium、Firefox、WebKit 多浏览器：

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    page.screenshot(path="screenshot.png")
    browser.close()
```

Playwright 也支持直接通过 CDP Session 发送原始命令：

```python
page = browser.new_page()
cdp_session = page.context.new_cdp_session(page)
cdp_session.send("Page.captureScreenshot", {"format": "jpeg"})
```

### browser-use（Python）

AI 驱动的浏览器自动化工具，底层使用 Playwright（基于 CDP）：

```python
from browser_use import Agent, BrowserProfile
from browser_use.llm import ChatOpenAI

browser_profile = BrowserProfile(
    args=["--remote-debugging-port=9222"],
)
agent = Agent(
    task="打开 https://example.com 并告诉我页面标题",
    llm=ChatOpenAI(model="gpt-4o"),
    browser_profile=browser_profile,
)
await agent.run()
```

## 使用 Chrome Extension 调试协议

除了直接连接 WebSocket，还可以通过 Chrome Extension 的 `chrome.debugger` API 来使用 CDP：

```javascript
// 在 Chrome 扩展中
chrome.debugger.attach({ targetId: tabId }, "1.3", function() {
    chrome.debugger.sendCommand(
        { targetId: tabId },
        "Page.captureScreenshot",
        { format: "jpeg" },
        function(result) {
            console.log("Screenshot captured!");
        }
    );
});
```

这种方式的好处是：不需要手动管理 WebSocket 连接，Chrome 扩展框架帮你处理请求和响应的绑定。

## 在 Chrome DevTools 中使用 CDP

Chrome DevTools 本身也提供了查看和发送 CDP 命令的功能：

### Protocol Monitor

1. 打开 DevTools → 设置（齿轮图标）→ 实验功能
2. 启用 **Protocol Monitor**
3. 关闭并重新打开 DevTools
4. 菜单 → More Tools → Protocol Monitor

在这里你可以：
- 实时查看所有 CDP 请求和响应
- 直接发送 CDP 命令
- 使用 CDP Editor 可视化编辑参数

### DevTools-on-DevTools

还可以打开"DevTools on DevTools"，在内部的 DevTools 控制台中使用：

```javascript
let Main = await import('./front_end/entrypoints/main/main.js');
await Main.MainImpl.sendOverProtocol('Emulation.setDeviceMetricsOverride', {
    mobile: true,
    width: 412,
    height: 732,
    deviceScaleFactor: 2.625,
});
```

## 多客户端支持

从 **Chrome 63** 开始，CDP 支持多个客户端同时连接。这意味着你可以一边用 DevTools 调试，一边用 Puppeteer 做自动化，两者不会互相踢出。

当某个客户端断开连接时，会收到 `Inspector.detached` 事件：

```json
{
  "method": "Inspector.detached",
  "params": {
    "reason": "replaced_with_devtools"
  }
}
```

## 常见问题

### CDP 和 WebDriver 有什么区别？

| 特性 | CDP | WebDriver (Selenium) |
|------|-----|---------------------|
| 协议 | 私有 JSON/WebSocket | W3C 标准 HTTP |
| 速度 | 快（直接连接浏览器） | 较慢（中间层多） |
| 功能 | 更底层、更完整 | 标准化、跨浏览器 |
| 浏览器支持 | 主要是 Chrome/Chromium | 多浏览器 |

### 如何获取协议定义文件？

协议定义在 Chromium 源码中：
- `browser_protocol.pdl`：浏览器相关
- `js_protocol.pdl`：V8 相关

GitHub 镜像：https://github.com/ChromeDevTools/devtools-protocol

也可以通过 `http://localhost:9222/json/protocol/` 获取当前浏览器支持的协议。

### `--remote-debugging-port=0` 是什么？

指定端口为 0 时，Chrome 会自动选择一个可用的端口。端口号会写入：
- stderr 输出
- 用户数据目录下的 `DevToolsActivePort` 文件

## 总结

CDP 是连接人类和 Chrome 浏览器的桥梁，它让程序能够像人一样操作浏览器。从基本的页面导航、截图，到复杂的 AI Agent 自动化，CDP 提供了完整的能力支持。

**核心要点：**

1. CDP 是基于 WebSocket 的 JSON 协议，分为 40+ 个功能域
2. 通过 `--remote-debugging-port` 启动参数开启
3. HTTP 端点提供 Target 管理和协议查询
4. WebSocket 端点是实际通信的通道
5. Puppeteer、Playwright、browser-use 等工具都基于 CDP
6. Chrome 63+ 支持多客户端同时连接

无论你是想做浏览器自动化测试、网页爬虫，还是开发 AI Agent，理解 CDP 都是非常有价值的基础。

## 参考链接

- [官方文档](https://chromedevtools.github.io/devtools-protocol/)
- [Chrome DevTools Protocol 官方说明](https://developer.chrome.com/docs/devtools/debugger-protocol/)
- [awesome-chrome-devtools](https://github.com/ChromeDevTools/awesome-chrome-devtools)
- [Getting Started with CDP](https://github.com/aslushnikov/getting-started-with-cdp)
- [上一篇：browser-use 介绍](/browser-use-introduction/)
- [实战：browser-use demo002](/browser-use-demo002-summary/)

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/chrome-devtools-protocol-introduction/  

