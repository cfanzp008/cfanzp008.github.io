# OpenAI Codex CLI 全面介绍：开源的终端编程助手


# OpenAI Codex CLI 全面介绍：开源的终端编程助手

## 什么是 Codex CLI

Codex CLI 是 OpenAI 于 2025 年开源的轻量级编程助手，完全运行在你的终端中。它可以读取代码库、进行编辑、运行命令，帮助开发者完成各种编程任务。

该项目在 GitHub 上已获得 **72,900+ 颗星**，是 Rust 编写的开源项目。

## 核心特性

### 1. 终端集成

- 完整的终端 UI
- 直接读取和编辑代码
- 运行终端命令
- 支持图像输入（截图分析）

### 2. 多种使用模式

- **交互模式**：全屏终端 UI，实时协作
- **非交互模式**：适合 CI/CD 集成
- **Exec 模式**：脚本化调用

### 3. 强大的命令支持

- `/test`：生成测试代码
- `/edit`：代码编辑
- `/shell`：执行 shell 命令
- `/review`：代码审查
- `/diff`：查看变更

### 4. 沙箱安全

- 安全的代码执行环境
- 防止恶意操作
- 可配置的安全级别

### 5. 多模型支持

- 支持多种 AI 模型
- 可自定义模型选择
- 支持本地模型

## 安装配置

### 安装方式

```bash
# 方法一：npm
npm i -g @openai/codex

# 方法二：Homebrew
brew install --cask codex

# 方法三：下载二进制
# 访问 GitHub Releases 页面
```

### 验证安装

```bash
# 查看版本
codex --version

# 启动交互模式
codex
```

### 认证配置

```bash
# 登录 OpenAI 账号
codex auth login

# 或设置 API Key
export OPENAI_API_KEY="sk-..."
```

## 基本使用

### 交互模式

```bash
# 启动交互模式
codex

# 带初始提示启动
codex "帮我重构这个函数"
```

### 命令行模式

```bash
# 直接执行命令
codex exec "为这个文件写单元测试"

# 附加图片
codex -i screenshot.png "分析这个错误"
```

### 常用命令

```bash
# 代码审查
codex exec --review

# 执行测试
codex exec --test

# 查看差异
codex exec --diff
```

## Slash 命令

在交互模式中使用 `/` 快速调用常用功能：

| 命令 | 功能 |
|-----|------|
| `/test` | 生成测试 |
| `/edit` | 编辑代码 |
| `/shell` | 执行命令 |
| `/review` | 代码审查 |
| `/model` | 切换模型 |
| `/summary` | 会话总结 |
| `/permission` | 调整权限 |

## 权限级别

Codex 提供细粒度的权限控制：

| 级别 | 说明 |
|-----|------|
| `read` | 只读模式 |
| `chat` | 对话模式 |
| `edit` | 允许编辑 |
| `auto-edit` | 自动编辑 |
| `automode` | 完全自主 |

## 非交互模式

适合 CI/CD 集成：

```bash
# 单次执行
codex exec --non-interactive "fix the bug"

# 在 CI 中使用
- name: Run Codex
  run: codex exec --non-interactive --approval=auto-edit "add tests"
```

## 与其他工具对比

| 工具 | 类型 | 特点 |
|-----|------|------|
| **Codex CLI** | 开源 | OpenAI 官方，终端原生 |
| **Claude Code** | 闭源 | Anthropic 官方 |
| **Cursor** | 闭源 | IDE 集成 |
| **Windsurf** | 闭源 | Agent IDE |

## 应用场景

### 1. 日常编程辅助

- 代码补全和生成
- Bug 修复
- 代码重构

### 2. 自动化测试

- 生成单元测试
- 集成测试
- 端到端测试

### 3. 代码审查

- 自动化审查
- 安全检查
- 性能建议

### 4. CI/CD 集成

- 自动化修复
- 持续测试
- 部署检查

## 项目结构

```
openai/codex/
├── codex-rs/       # Rust 核心
├── sdk/            # 多语言 SDK
├── cli/            # CLI 实现
└── sandbox/        # 沙箱执行
```

## 总结

OpenAI Codex CLI 是一个强大的开源编程助手，具有：

- ✅ **完全开源** - GitHub 72K+ 星
- ✅ **终端原生** - 无需离开终端
- ✅ **多种模式** - 交互/非交互
- ✅ **安全沙箱** - 保护系统安全
- ✅ **CI/CD 集成** - 自动化工作流

如果你需要一个免费、开源的终端编程助手，Codex CLI 值得一试。

## 参考链接

- GitHub：https://github.com/openai/codex
- 官方文档：https://developers.openai.com/codex
- NPM 包：https://www.npmjs.com/package/@openai/codex


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/openai-codex-cli-introduction/  

