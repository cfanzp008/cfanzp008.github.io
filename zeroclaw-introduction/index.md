# ZeroClaw：超轻量级 AI 助手基础设施


# ZeroClaw：超轻量级 AI 助手基础设施

## 什么是 ZeroClaw

ZeroClaw 是一个用 Rust 编写的下一代 AI 助手框架，致力于提供"零开销、零妥协"的解决方案。它可以在仅 10 美元的硬件上运行，内存占用少于 5MB，比同类产品节省 99% 的资源。

该项目由哈佛、MIT 和 Sundai.Club 社区的学生和成员构建，在 GitHub 上已获得 29,300+ 颗星。

## 核心特性

### 🚀 极致性能

| 指标 | ZeroClaw | OpenClaw |
|-----|----------|----------|
| 启动时间 | < 10ms | ~500ms |
| 二进制大小 | 3.4MB | ~150MB |
| 内存占用 | < 5MB | > 1GB |
| 安全保证 | Rust 内存安全 | 运行时检查 |

### 📦 超轻量级

- 单一二进制文件，支持 ARM、x86 和 RISC-V 架构
- 无运行时依赖，部署简单
- 设计目标：10 美元的开发板也能运行

### 🔌 可插拔架构

基于 Rust trait 系统的灵活组件扩展：

- **核心层**：基于 trait 的架构、内存安全保证、异步运行时
- **AI 适配层**：统一 API 抽象、22+ AI 提供商、灵活切换
- **渠道层**：多平台支持、消息路由、事件处理

### 🌐 广泛的平台支持

**AI 提供商**：
- OpenAI (GPT-4o, o1, o3)
- Anthropic (Claude)
- Google Gemini
- Mistral
- Ollama（本地部署）
- 22+ 其他提供商

**通讯平台**：
- WhatsApp、Telegram、Slack、Discord、Signal
- iMessage、Matrix、IRC、Email
- Bluesky、Nostr、Reddit、LinkedIn、Twitter
- DingTalk、Lark、QQ、WeChat Work
- MQTT、WebSocket

### 🔒 内存安全

- 由 Rust 语言保证，无数据竞争，无内存泄漏
- 129+ 安全测试集成在 CI 中
- 沙箱隔离、路径遍历阻断、命令白名单

## 快速开始

### 安装（推荐）

#### Homebrew（macOS/Linux）

```bash
brew install zeroclaw
```

#### 一键引导

```bash
git clone https://github.com/zeroclaw-labs/zeroclaw.git
cd zeroclaw
./install.sh
```

安装后会自动运行 `zeroclaw onboard` 进行配置。

### 基本命令

```bash
# 启动网关（Web 服务器 + Web 控制台）
zeroclaw gateway                # 默认: 127.0.0.1:42617
zeroclaw gateway --port 0       # 随机端口（安全加固）

# 与助手对话
zeroclaw agent -m "Hello, ZeroClaw!"

# 交互模式
zeroclaw agent

# 启动完整守护进程
zeroclaw daemon

# 查看状态
zeroclaw status

# 运行诊断
zeroclaw doctor

# 启动频道服务器（重要！）
zeroclaw channel start
```

### ⚠️ 重要：channel start 的坑

`zeroclaw channel start` 是启动频道服务器的关键命令，但很多人会忽略它：

- **不启动 channel start 的后果**：即使配置了 Telegram、Discord 等频道，ZeroClaw 也无法接收和响应消息
- **正确流程**：
  1. 先运行 `zeroclaw onboard` 完成初始配置
  2. 然后运行 `zeroclaw channel start` 启动频道监听
  3. 或者直接运行 `zeroclaw daemon`（包含 channel start）

```bash
# 完整启动流程
zeroclaw onboard                    # 初始化配置
zeroclaw channel start              # 启动频道服务器（常驻）

# 或者一键启动所有服务
zeroclaw daemon                      # 启动完整守护进程（包含 gateway + channel）
```

**常见问题**：
- 配置了频道但收不到消息 → 检查是否运行了 `channel start`
- Telegram/Discord 机器人无响应 → 确保 channel 服务已启动
- 生产环境建议使用 `zeroclaw daemon` 保持服务持续运行

### 配置示例

```bash
# 使用 API key 快速配置
./install.sh --api-key "sk-..." --provider openrouter
```

## 架构设计

### 核心组件

1. **Gateway**：HTTP/WS/SSE 控制平面
   - 会话管理
   - 配置管理
   - Cron 定时任务
   - Webhook
   - Web 控制台
   - 设备配对

2. **Agent**：代理编排循环
   - 工具调度
   - 提示构建
   - 消息分类
   - 内存加载

3. **Provider**：AI 提供商适配
   - 20+ LLM 后端
   - 故障转移
   - 重试机制

4. **Channel**：消息渠道
   - 多平台消息接收
   - 消息路由
   - 事件处理

### 工具系统

内置丰富的工具集：

- **核心工具**：shell、文件读写、git 操作、glob 搜索、内容搜索
- **Web 工具**：浏览器控制、网页抓取、网页搜索、截图
- **集成工具**：Jira、Notion、Google Workspace、Microsoft 365
- **MCP**：Model Context Protocol 工具包装器
- **调度工具**：cron 定时任务管理
- **记忆工具**：recall、store、forget、knowledge
- **硬件工具**：ESP32、STM32、Arduino、Raspberry Pi GPIO

## 安全特性

### 自主级别

| 级别 | 行为 |
|-----|------|
| ReadOnly | 代理只能观察，不能行动 |
| Supervised（默认） | 代理行动需要中/高风险操作审批 |
| Full | 代理在策略范围内自主行动 |

### 安全机制

- **DM 配对**：默认情况下，未知发送者收到配对码，机器人不处理其消息
- **沙箱隔离**：工作区隔离、路径遍历阻断、命令白名单
- **禁止路径**：`/etc`、`/root`、`~/.ssh` 等
- **速率限制**：最大操作次数/小时，最大成本/天
- **审批门控**：中/高风险操作需要交互式审批
- **紧急停止**：一键紧急关闭能力

> ⚠️ 注意：请务必从官方仓库（zeroclaw-labs/zeroclaw）获取信息，zeroclaw.org 和 zeroclaw.net 是模仿者站点。

## Web 控制台

ZeroClaw 内置 React 19 + Vite 6 + Tailwind CSS 4 Web 控制台：

- **Dashboard**——系统概览、健康状态、正常运行时间、成本跟踪
- **Agent Chat**——与代理交互式聊天
- **Memory**——浏览和管理记忆条目
- **Config**——查看和编辑配置
- **Cron**——管理定时任务
- **Tools**——浏览可用工具
- **Logs**——查看代理活动日志
- **Cost**——令牌使用和成本跟踪
- **Doctor**——系统健康诊断
- **Pairing**——设备配对管理

## 从 OpenClaw 迁移

ZeroClaw 可以导入 OpenClaw 的工作区、记忆和配置：

```bash
# 预览迁移内容（安全，只读）
zeroclaw migrate openclaw --dry-run

# 执行迁移
zeroclaw migrate openclaw
```

这会将记忆条目、工作区文件和配置从 `~/.openclaw/` 迁移到 `~/.zeroclaw/`，配置会自动从 JSON 转换为 TOML。

## 适用场景

1. **个人 AI 助手**：在本地设备上运行，保护隐私
2. **嵌入式 AI**：10 美元的开发板即可部署
3. **企业集成**：多渠道接入，统一管理
4. **硬件控制**：连接 ESP32、Arduino 等微控制器
5. **自动化工作流**：SOP 自动化、事件驱动

## 总结

ZeroClaw 是一个极具创新性的 AI 助手框架，通过 Rust 实现了极致的性能和资源效率。它适合：

- 追求隐私的用户（本地运行）
- 资源受限的部署环境
- 需要快速启动的场景
- 多平台集成的需求

如果你正在寻找一个轻量、安全、可扩展的 AI 助手解决方案，ZeroClaw 值得一试。

## 参考链接

- GitHub：https://github.com/zeroclaw-labs/zeroclaw
- 官网：https://zeroclawlabs.ai
- 官方文档：https://github.com/zeroclaw-labs/zeroclaw/blob/master/docs/README.md
- Discord：https://discord.com/invite/wDshRVqRjx

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/zeroclaw-introduction/  

