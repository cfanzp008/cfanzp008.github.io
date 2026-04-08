# Google Workspace CLI：统一管理 Google Workspace 的命令行工具


# Google Workspace CLI：统一管理 Google Workspace 的命令行工具

## 引言

对于经常使用 Google Workspace（Google 工作空间）的用户来说，管理 Drive、Gmail、Calendar、Sheets、Docs、Chat 等多个服务往往需要在浏览器和多个应用之间切换。虽然 Google 提供了 Web 界面和各个服务的 API，但使用这些 API 需要编写大量重复的代码和配置。Google Workspace CLI（简称 gws）的出现改变了这一状况，它提供了一个统一的命令行界面，可以操控所有 Google Workspace 服务。

gws 在 GitHub 上已获得 **24,000+ 颗星**，是当前最受欢迎的 Google Workspace 命令行工具。它采用 Rust 语言开发，具有高性能和跨平台特性，同时支持人类用户和 AI 代理使用。

## 什么是 Google Workspace CLI

Google Workspace CLI（gws）是一个统一的命令行工具，旨在为人类用户和 AI 代理提供一种简单、优雅的方式来管理所有 Google Workspace 服务。无论你是想查看 Drive 文件、发送 Gmail 邮件、管理 Calendar 事件，还是操作 Sheets 表格、Docs 文档、Chat 消息，一个 `gws` 命令就能搞定。

gws 的独特之处在于它采用了**动态命令构建**机制。它并不硬编码一组固定的命令，而是通过读取 Google 的 Discovery Service（发现服务）在运行时动态生成整个命令表面。这意味着当 Google 添加新的 API 端点或方法时，gws 会自动获取并可用，无需任何更新。

## 核心特性

### 1. 动态命令生成

gws 通过 Google Discovery Service 动态获取 API 模式文档，自动生成对应的命令。这意味着：

- 支持所有 Google Workspace API（Drive、Gmail、Calendar、Sheets、Docs、Chat、Admin 等）
- 新增 API 自动可用，无需手动更新
- 每个方法和资源都有完整的 `--help` 文档

### 2. 结构化 JSON 输出

所有命令输出都是结构化的 JSON 格式，便于：

- 脚本处理和解析
- 与其他工具集成（如 jq）
- AI 代理解析和理解

### 3. AI 代理技能

gws 附带 **100+ 个 AI Agent Skills**，为 AI 代理提供：

- 每个支持 API 的技能文件
- 高级工作流辅助技能
- 50+ 个针对 Gmail、Drive、Docs、Calendar 和 Sheets 的精选配方

### 4. 多种认证方式

支持多种认证流程，适应不同场景：

- 交互式本地桌面认证（带加密存储）
- 手动 OAuth 设置
- 服务账号（服务器到服务器）
- 预获取的访问令牌
- Headless/CI 环境认证

### 5. 辅助命令

除了自动生成的方法命令，gws 还提供手动编写的辅助命令，以 `+` 前缀区分：

- `gmail +send`：发送邮件
- `gmail +reply`：回复邮件（自动处理线程）
- `calendar +agenda`：显示今日日程
- `drive +upload`：上传文件
- `sheets +append`：追加行
- `workflow +standup-report`：生成站会报告

### 6. 分页支持

内置自动分页功能：

- `--page-all`：自动获取所有页面，输出 NDJSON
- `--page-limit`：限制最大页数
- `--page-delay`：设置页面间延迟

## 安装方法

### 前置要求

- **Node.js 18+**（用于 npm 安装）或下载预编译二进制
- **Google Cloud 项目**：用于 OAuth 凭证
- **Google 账号**：具有 Google Workspace 访问权限

### 二进制安装（推荐）

从 GitHub Releases 页面下载适合你操作系统的预编译二进制文件：

- **GitHub Releases**：https://github.com/googleworkspace/cli/releases

解压后将 `gws` 二进制文件放入 `$PATH` 中。

### npm 安装

```bash
npm install -g @googleworkspace/cli
```

### 从源码构建

```bash
cargo install --git https://github.com/googleworkspace/cli --locked
```

### Nix 安装

```bash
nix run github:googleworkspace/cli
```

### Homebrew（macOS/Linux）

```bash
brew install googleworkspace-cli
```

## 快速开始

### 第一步：认证设置

```bash
# 交互式设置（需要 gcloud CLI）
gws auth setup

# 后续登录
gws auth login
```

### 第二步：基本使用

```bash
# 列出 Drive 中最近 5 个文件
gws drive files list --params '{"pageSize": 5}'

# 创建电子表格
gws sheets spreadsheets create --json '{"properties": {"title": "Q1 Budget"}}'

# 发送 Chat 消息
gws chat spaces messages create \
  --params '{"parent": "spaces/xyz"}' \
  --json '{"text": "Deploy complete."}'

# 查看任何方法的请求/响应模式
gws schema drive.files.list
```

## 认证配置详解

### 交互式本地桌面认证

```bash
gws auth setup       # 一次性：创建 Cloud 项目、启用 API、登录
gws auth login       # 后续登录和权限选择
```

凭证使用 AES-256-GCM 加密存储在系统密钥链中。

### 手动 OAuth 设置

1. 在 Google Cloud Console 创建 OAuth 客户端
2. 下载客户端 JSON 保存到 `~/.config/gws/client_secret.json`
3. 将自己添加为测试用户
4. 运行 `gws auth login`

### 服务账号（服务器到服务器）

```bash
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/service-account.json
gws drive files list
```

### Headless/CI 环境

```bash
# 在有浏览器机器上完成交互式认证后导出
gws auth export --unmasked > credentials.json

# 在无头机器上使用
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/credentials.json
gws drive files list
```

## 实用示例

### Gmail 操作

```bash
# 发送邮件
gws gmail +send --to alice@example.com --subject "Hello" --body "Hi there"

# 回复邮件
gws gmail +reply --message-id MESSAGE_ID --body "Thanks!"

# 查看未读收件箱摘要
gws gmail +triage
```

### Calendar 操作

```bash
# 显示今日日程
gws calendar +agenda

# 创建新事件
gws calendar events insert --json '{...}'

# 在特定时区显示日程
gws calendar +agenda --timezone America/New_York
```

### Drive 操作

```bash
# 列出文件
gws drive files list --params '{"pageSize": 10}'

# 上传文件
gws drive +upload ./report.pdf --name "Q1 Report"

# 创建文件夹
gws drive files create --json '{"name": "My Folder", "mimeType": "application/vnd.google-apps.folder"}'
```

### Sheets 操作

```bash
# 读取单元格
gws sheets spreadsheets values get \
  --params '{"spreadsheetId": "ID", "range": "Sheet1!A1:C10"}'

# 追加行
gws sheets +append --spreadsheet SPREADSHEET_ID --values "Alice,95"
```

> **注意**：Sheets 范围使用 `!`，bash 会解释为历史扩展，务必用单引号包裹。

### 工作流自动化

```bash
# 站会报告
gws workflow +standup-report

# 会议准备
gws workflow +meeting-prep

# 周报摘要
gws workflow +weekly-digest

# 将邮件转为任务
gws workflow +email-to-task
```

## AI 代理集成

### 安装代理技能

```bash
# 安装所有技能
npx skills add https://github.com/googleworkspace/cli

# 安装特定服务技能
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-drive
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-gmail
```

### OpenClaw 集成

```bash
# 符号链接所有技能（保持同步）
ln -s $(pwd)/skills/gws-* ~/.openclaw/skills/

# 或复制特定技能
cp -r skills/gws-drive skills/gws-gmail ~/.openclaw/skills/
```

### Gemini CLI 扩展

```bash
# 先完成 CLI 认证
gws auth setup

# 安装扩展
gemini extensions install https://github.com/googleworkspace/cli
```

安装后，Gemini CLI 代理可直接访问所有 gws 命令和 Google Workspace 代理技能。

## 环境变量

gws 支持多种环境变量进行配置：

```bash
# 预获取的访问令牌（最高优先级）
export GOOGLE_WORKSPACE_CLI_TOKEN=...

# 凭证文件路径
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=...

# 配置文件目录
export GOOGLE_WORKSPACE_CLI_CONFIG_DIR=...

# 日志级别
export GOOGLE_WORKSPACE_CLI_LOG=gws=debug

# Model Armor 模板
export GOOGLE_WORKSPACE_CLI_SANITIZE_TEMPLATE=projects/P/locations/L/templates/T
```

## 退出码

gws 使用结构化退出码，便于脚本处理：

| 退出码 | 含义 | 示例原因 |
|-------|------|---------|
| 0 | 成功 | 命令正常完成 |
| 1 | API 错误 | Google 返回 4xx/5xx 响应 |
| 2 | 认证错误 | 凭证缺失、过期或无效 |
| 3 | 验证错误 | 参数错误、未知服务、无效标志 |
| 4 | Discovery 错误 | 无法获取 API 模式文档 |
| 5 | 内部错误 | 意外失败 |

## 与其他工具对比

| 特性 | Google Workspace CLI | gcloud CLI | Google APIs Client Library |
|-----|---------------------|------------|---------------------------|
| 支持服务 | 所有 Workspace 服务 | GCP 为主 | 需编写代码 |
| 命令行友好 | ✅ | ✅ | ❌ |
| AI 代理支持 | ✅ 100+ 技能 | ❌ | ❌ |
| 动态命令生成 | ✅ | ❌ | ❌ |
| 结构化 JSON | ✅ | 部分 | 需解析 |
| Stars | 24K+ | - | - |

## 适用场景

1. **日常自动化**：自动化重复性任务，如定期备份文件、发送报告
2. **脚本集成**：在 shell 脚本中调用 Google Workspace API
3. **CI/CD**：在持续集成环境中操作 Google Workspace
4. **AI 代理**：为 AI 代理提供 Google Workspace 操作能力
5. **快速调试**：快速测试和探索 API，无需编写代码

## 注意事项

1. **非官方产品**：gws 不是 Google 官方支持的产品
2. **测试模式限制**：未验证的 OAuth 应用在测试模式下受限于约 25 个权限范围
3. **活跃开发**：项目仍在积极开发中，v1.0 之前可能会有破坏性变更
4. **API 未启用**：使用前需确保相应的 Google API 已在 Cloud Console 中启用

## 总结

Google Workspace CLI 是一个功能强大且灵活的命令行工具，它大大简化了与 Google Workspace 服务交互的方式。无论是人类用户想要快速执行操作，还是 AI 代理需要自动化工作流程，gws 都能提供出色的支持。

其动态命令生成机制意味着它会自动跟随 Google API 的更新，而丰富的 AI 代理技能使其成为 AI 自动化工作流的理想选择。如果你经常需要操作 Google Workspace 服务，不妨试试 gws，它会让你的工作效率大幅提升。

## 参考链接

- GitHub 仓库：https://github.com/googleworkspace/cli
- 下载地址：https://github.com/googleworkspace/cli/releases
- 技能索引：https://github.com/googleworkspace/cli/blob/main/docs/skills.md

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/google-workspace-cli-introduction/  

