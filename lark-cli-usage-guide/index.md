# 飞书 lark-cli 命令行工具使用指南


# 飞书 lark-cli 命令行工具使用指南

## 背景简介

在企业协作场景中，飞书（Lark/Feishu）作为新一代办公平台，已经深入到日程管理、文档协作、项目推进等各个环节。然而，如何高效地与飞书平台进行自动化交互，一直是开发者和AI Agent面临的核心挑战。

2026年3月，飞书官方正式开源了 **lark-cli** 命令行工具，为开发者和AI Agent提供了统一的命令行接口。该工具支持200+命令，覆盖12个业务领域，包括即时通讯、日历、文档、云盘、多维表格、邮件、任务、会议、知识库、审批等，更重要的是提供了20个开箱即用的AI Agent技能，让AI能够直接操作飞书平台。

截至目前，lark-cli 在 GitHub 上已获得超过6700个Star，成为企业协作自动化领域的标杆工具。

## 安装与配置

### 环境要求

在开始安装之前，请确保你的开发环境满足以下要求：

- **Node.js**：需要 npm 或 npx 包管理器
- **Go 1.23+** 和 **Python 3**：仅在使用源码编译时需要

### 安装方式

lark-cli 提供两种安装方式，推荐使用 npm 安装：

```bash
# 方式一：使用 npm 安装（推荐）
npm install -g @larksuite/cli

# 方式二：从源码编译安装
git clone https://github.com/larksuite/cli.git
cd cli
make install
```

安装 CLI 技能是必须步骤，否则无法使用AI Agent技能：

```bash
npx skills add larksuite/cli -y -g
```

### 初始化配置

安装完成后，需要进行一次性配置：

```bash
# 初始化应用凭证（交互式引导）
lark-cli config init

# 登录飞书账号（推荐自动授权模式）
lark-cli auth login --recommend

# 验证登录状态
lark-cli auth status
```

如果是AI Agent进行配置，需要使用非阻塞模式：

```bash
# AI Agent模式：返回授权URL而非阻塞等待
lark-cli config init --new
lark-cli auth login --no-wait --domain calendar
```

## 核心功能详解

lark-cli 采用三层命令架构，从易用到高级依次为：Shortcuts（快捷命令）、API Commands（API命令）、Raw API（原始API）。

### 1. 快捷命令（Shortcuts）

快捷命令以 `+` 开头，专为人类和AI设计，内置智能默认值和结构化输出。以下是各业务域的典型用法：

**即时通讯（IM）**

```bash
# 发送消息到群聊
lark-cli im +messages-send --chat-id "oc_xxx" --text "Hello World"

# 创建群聊
lark-cli im +chats-create --name "项目讨论组" --user-id-list "ou_xxx,ou_yyy"

# 搜索消息
lark-cli im +messages-search --keyword "项目进度"
```

**日历管理**

```bash
# 查看今日 agenda
lark-cli calendar +agenda

# 创建日程事件
lark-cli calendar +events-create --title "Team Meeting" --start-time "2026-04-06T10:00:00" --end-time "2026-04-06T11:00:00"

# 查询忙碌状态
lark-cli calendar +free-busy --user-id "ou_xxx" --start-time "2026-04-06T09:00:00" --end-time "2026-04-06T18:00:00"
```

**文档操作**

```bash
# 创建文档
lark-cli docs +create --title "周报" --markdown "# 周报\n- 完成项1\n- 完成项2"

# 读取文档
lark-cli docs +get --token "xxx"
```

**多维表格（Base）**

```bash
# 创建表格
lark-cli base +tables-create --app-id "app_xxx" --name "项目看板"

# 添加记录
lark-cli base +records-create --app-id "app_xxx" --table-id "tbl_xxx" --records '[{"fields":{"名称":"任务A","状态":"进行中"}}]'
```

**电子表格（Sheets）**

```bash
# 创建表格
lark-cli sheets +create --title "销售数据"

# 写入数据
lark-cli sheets +write --spreadsheet-id "xxx" --sheet-id "yyy" --range "A1" --values '[["姓名","销售额"],["张三",10000]]'
```

**任务管理**

```bash
# 创建任务
lark-cli task +create --title "完成需求文档" --due "2026-04-10"

# 查询任务列表
lark-cli task +list --status "pending"
```

### 2. API 命令

API命令从飞书开放平台元数据自动生成，经过评估和质量门控，100+命令与平台端点一一对应：

```bash
# 日历相关
lark-cli calendar calendars list
lark-cli calendar events instance_view --params '{"calendar_id":"primary","start_time":"1700000000","end_time":"1700086400"}'

# 消息相关
lark-cli im messages send --params '{"receive_id_type":"chat_id"}' --body '{"receive_id":"oc_xxx","msg_type":"text","content":"{\"text\":\"Hello\"}"}'
```

### 3. 原始 API 调用

对于高级用户，可以直接调用飞书开放平台的2500+ API：

```bash
# GET 请求
lark-cli api GET /open-apis/calendar/v4/calendars

# POST 请求
lark-cli api POST /open-apis/im/v1/messages --params '{"receive_id_type":"chat_id"}' --body '{"receive_id":"oc_xxx","msg_type":"text","content":"{\"text\":\"Hello\"}"}'
```

## AI Agent 技能

lark-cli 最大的亮点是内置了20个开箱即用的AI Agent技能，这些技能经过专门优化，调用成功率高，非常适合集成到各种AI工作流中。

### 技能分类

| 技能名称 | 功能描述 |
|---------|----------|
| `lark-shared` | 应用配置、登录、身份切换、权限管理、安全规则（其他技能自动加载） |
| `lark-calendar` | 日程事件、议程视图、忙碌查询、时间建议 |
| `lark-im` | 发送/回复消息、群聊管理、消息搜索、上传下载媒体文件 |
| `lark-doc` | 创建、读取、更新、搜索文档（基于Markdown） |
| `lark-drive` | 上传下载文件、管理权限和评论 |
| `lark-sheets` | 创建、读取、追加、查找、导出电子表格 |
| `lark-base` | 多维表格、字段、记录、视图、仪表盘、数据聚合分析 |
| `lark-task` | 任务、任务列表、子任务、提醒、成员分配 |
| `lark-mail` | 浏览、搜索、读取邮件、发送、回复、转发、草稿管理 |
| `lark-contact` | 按姓名/邮箱/电话搜索用户、获取用户资料 |
| `lark-wiki` | 知识空间、节点、文档管理 |
| `lark-event` | 实时事件订阅（WebSocket）、正则路由、Agent友好格式 |
| `lark-vc` | 搜索会议记录、查询会议纪要 |
| `lark-approval` | 查询审批任务、批准/拒绝/转交、取消和抄送 |

### 工作流技能

除了单一业务技能，lark-cli 还提供了组合工作流技能：

- **lark-workflow-meeting-summary**：会议纪要聚合与结构化报告生成
- **lark-workflow-standup-report**：每日站会议程与待办汇总

这些技能可以直接集成到 Claude、GPT 等AI助手中，实现自动化企业协作。

## 高级用法

### 输出格式控制

lark-cli 支持多种输出格式，方便不同场景使用：

```bash
# JSON 完整输出（默认）
lark-cli calendar +agenda --format json

# 美化格式输出
lark-cli calendar +agenda --format pretty

# 表格形式输出
lark-cli im +messages-list --format table

# 换行分隔JSON（适合管道处理）
lark-cli im +messages-list --format ndjson

# CSV 格式导出
lark-cli sheets +read --format csv
```

### 分页处理

处理大量数据时，可以使用分页参数：

```bash
# 自动翻页获取所有数据
lark-cli im +messages-list --page-all

# 限制最多5页
lark-cli im +messages-list --page-limit 5

# 页面请求间隔500ms
lark-cli im +messages-list --page-delay 500
```

### 模拟运行

对于有副作用的操作，可以先预览再执行：

```bash
# 预览请求但不实际执行
lark-cli im +messages-send --chat-id "oc_xxx" --text "Hello" --dry-run
```

### Schema 自省

查看任意API方法的参数、请求体、响应结构、支持的身份和权限范围：

```bash
# 查看所有可用 Schema
lark-cli schema

# 查看特定命令的 Schema
lark-cli schema calendar.events.instance_view
lark-cli schema im.messages.delete
```

### 身份切换

可以在用户身份和机器人身份之间切换：

```bash
# 以当前用户身份执行
lark-cli calendar +agenda --as user

# 以机器人身份执行
lark-cli im +messages-send --as bot --chat-id "oc_xxx" --text "Hello"
```

## 安全注意事项

lark-cli 能够代表用户执行飞书平台操作，因此存在一定风险：

1. **模型幻觉风险**：AI Agent可能产生错误操作
2. **提示注入风险**：可能被恶意输入欺骗
3. **数据泄露风险**：在授权范围内操作可能导致敏感数据外泄

官方建议：
- 不要随意修改默认安全设置
- 建议将飞书机器人作为私有对话助手使用
- 尽量避免将其添加到群聊中
- 谨慎授权权限范围

## 总结

lark-cli 作为飞书官方出品的命令行工具，凭借其200+命令、12个业务域覆盖、20个AI Agent技能的强大能力，为开发者和AI Agent提供了高效操作飞书平台的途径。其三层命令架构设计兼顾了易用性和灵活性，无论是日常使用还是深度定制都能满足需求。

对于需要将飞书集成到自动化工作流的开发者，或者希望AI能够帮你处理企业协作任务的你，lark-cli 无疑是最佳选择。只需3分钟即可完成从安装到首次调用的全过程，MIT开源协议也保证了无任何使用门槛。

## 参考资源

- GitHub 仓库：https://github.com/larksuite/cli
- 官方文档：https://docs.larkuite.com
- 飞书开放平台：https://open.larksuite.com

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/lark-cli-usage-guide/  

