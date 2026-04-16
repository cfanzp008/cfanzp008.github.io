# OpenAI Codex CLI 深度分析 - 终端 AI 编程助手


# OpenAI Codex CLI 深度分析 - 终端 AI 编程助手

## 简介

Codex CLI 是 OpenAI 推出的轻量级命令行 AI 编程助手，可以在终端中直接帮助开发者完成代码生成、重构、调试等任务。

> GitHub: https://github.com/openai/codex
> Stars: 75,000+ | Forks: 10,000+

## 系统要求

| 要求 | 详情 |
|------|------|
| 操作系统 | macOS 12+、Ubuntu 20.04+/Debian 10+、Windows 11 (WSL2) |
| 内存 | 最低 4GB（推荐 8GB） |
| Git | 可选（推荐 2.23+） |

## 安装

### npm 安装（推荐）

```bash
npm install -g @openai/codex
```

### Homebrew 安装

```bash
brew install --cask codex
```

### 验证安装

```bash
codex --version
```

## 认证配置

### 方式一：ChatGPT 账号登录

```bash
codex login
```

使用 ChatGPT Plus、Pro、Team、Edu 或 Enterprise 账号登录。

### 方式二：API Key 配置

```bash
export OPENAI_API_KEY=your-api-key
# 如使用中转服务
export OPENAI_BASE_URL=https://your-proxy.com
```

## 三种操作模式

Codex CLI 提供三种审批模式，控制 AI 的自主程度：

| 模式 | 说明 | 自主程度 |
|------|------|----------|
| `suggest` | 仅建议，不执行 | 最安全 |
| `auto-edit` | 自动编辑，执行需确认 | 平衡 |
| `full-auto` | 全自动执行 | 最高风险 |

### 使用方式

```bash
# 使用指定模式
codex -a suggest "审查代码"
codex -a auto-edit "添加错误处理"
codex -a full-auto "运行测试并修复"
```

## 常用命令

### 交互模式

```bash
codex                    # 进入交互模式
codex "解释这个项目"     # 带首 prompt 启动
```

### 非交互模式

```bash
codex exec "修复这个 Bug"    # 非交互执行
codex -q "fix build issues"  # 静默输出
```

### 快捷命令

| 命令 | 说明 |
|------|------|
| `codex login` | 登录认证 |
| `codex logout` | 退出登录 |
| `codex mcp` | MCP 服务器管理 |
| `codex completion bash` | 生成 Bash 补全 |

### 交互模式斜杠命令

| 命令 | 说明 |
|------|------|
| `/model` | 切换模型 |
| `/clear` | 清除会话 |
| `/exit` | 退出 |

## 配置管理

### 配置文件位置

- 全局配置：`~/.codex/config.toml`
- 项目配置：`PROJECT/.codex/config.toml`
- 个人偏好：`~/.codex/instructions.md`

### 示例配置

```toml
# 默认模型
model = "o4-mini"

# 默认操作模式
approval_mode = "auto-edit"

# 启用 MCP 服务器
[mcp_servers]
```

## 模型选择

### 默认模型

Codex CLI 默认使用 OpenAI 最新编程优化模型。

### 运行时切换

```bash
# 启动时指定
codex -m gpt-5-codex "重构代码"

# 交互模式内切换
/model gpt-5-codex
```

## 与 Claude Code 对比

| 维度 | Codex CLI | Claude Code |
|------|-----------|-------------|
| 开发公司 | OpenAI | Anthropic |
| 默认模型 | GPT-5-Codex | Claude Opus/Sonnet |
| 审批模式 | 3 种 | 3 种 |
| MCP 支持 | 支持 | 支持 |
| Skills | 不支持 | 支持 |
| 平台支持 | macOS/Linux/WSL2 | 全平台 |
| 开源 | Rust 实现 | 开源 |

## 安全特性

### 网络沙箱

- 本地执行 + 云端推理
- Full-Auto 模式下默认阻断外网请求
- 可手动配置白名单

### Git 保护

- 无版本控制时会警告
- 建议启用分支或 pre-commit

## 实战技巧

### 高效 Prompt 写法

1. **明确验收标准**：告诉 Codex 何时算完成
2. **指定上下文**：提供文件/函数位置
3. **清晰任务描述**：一句话描述期望结果

### 常用场景

```bash
# 快速 bug 修复
codex "fix TypeError in src/price.ts line 42"

# 批量重构
codex -a auto-edit "rename *.jsx to *.tsx"

# 代码审查
codex "审查最近的代码更改"

# 生成测试
codex "为 auth.ts 编写 Jest 单元测试"

# 生成文档
codex "为项目生成 README"
```

### 工作流集成

```bash
# Git Hook 中使用
codex -a suggest "检查提交代码"

# CI/CD 中使用
codex -a auto-edit -q "update CHANGELOG"
```

## 常见问题

### Q1: command not found

确保 npm 全局目录在 PATH 中：

```bash
npm config get prefix
# 将输出的路径/bin 添加到 PATH
```

### Q2: Node 版本过低

升级到 Node.js 22+：

```bash
nvm install 22
nvm use 22
```

### Q3: API Key 无效

检查环境变量配置：

```bash
echo $OPENAI_API_KEY
```

## 总结

Codex CLI 是 OpenAI 在 AI 编程领域的重要产品，结合了云端推理和本地执行的优势。适合习惯终端工作的开发者，可以快速完成代码生成、重构、调试等任务。

**官网：** https://github.com/openai/codex
**文档：** https://developers.openai.com/codex

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/openai-codex-cli-deep-analysis/  

