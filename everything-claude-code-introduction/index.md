# Everything Claude Code：最完整的 Claude Code 配置集合


# Everything Claude Code：最完整的 Claude Code 配置集合

## 背景介绍

Claude Code 是 Anthropic 推出的 AI 编程助手，能够在终端中帮助开发者完成代码编写、调试和 Git 工作流。然而，要充分发挥 Claude Code 的潜力，需要合理的配置和扩展。

Everything Claude Code 是一个由 Anthropic hackathon 获奖者开发的综合配置集合，在 GitHub 上已获得超过 130K 颗星，成为 Claude Code 生态中最受欢迎的配置项目。

## 什么是 Everything Claude Code

Everything Claude Code（简称 ECC）是一个经过实战检验的 Claude Code 插件配置集合，包含：

- **9 个专业 Agent**：针对不同开发场景的专用代理
- **14 个命令**：扩展 Claude Code 的功能
- **8+ 个技能（Skills）**：扩展 Claude 的专业能力
- **Hooks**：自动化工作流程
- **安全规则**：保护开发环境

## 核心功能特性

### 1. 专业技能（Skills）

ECC 提供了多个专业技能来增强 Claude Code：

- **continuous-learning-v2**：持续学习技能，记录对话上下文
- **strategic-compact**：智能压缩技能，优化 token 使用
- **项目特定技能**：针对不同项目类型的定制技能

### 2. 钩子系统（Hooks）

通过 Hooks 实现自动化工作流：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "node ~/.claude/scripts/hooks/auto-tmux-dev.js"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [{
          "type": "command", 
          "command": "node ~/.claude/scripts/hooks/post-edit-format.js"
        }]
      }
    ]
  }
}
```

常见 Hook 类型：

- **SessionStart**：会话启动时加载上下文
- **PreToolUse**：工具执行前触发
- **PostToolUse**：工具执行后触发
- **Stop**：会话结束时保存状态

### 3. 安全功能

#### AgentShield 安全扫描

```bash
# 快速扫描
npx ecc-agentshield scan

# 自动修复安全问题
npx ecc-agentshield scan --fix

# 深度分析（使用 Opus 代理）
npx ecc-agentshield scan --opus --stream
```

#### 危险命令拦截

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "tool == \"Bash\" && tool_input.command matches \"rm -rf /\"",
      "hooks": [{
        "type": "command",
        "command": "echo '[Hook] BLOCKED: Dangerous command' && exit 1"
      }]
    }]
  }
}
```

### 4. 自动化脚本

- **auto-tmux-dev**：自动在 tmux 中启动开发服务器
- **post-edit-format**：编辑后自动格式化 JS/TS 文件
- **post-edit-typecheck**：编辑后自动运行 TypeScript 检查
- **suggest-compact**：智能建议压缩时机

## 安装配置

### 方法一：通过 Marketplace 安装（推荐）

```bash
# 在 Claude Code 中使用
/claude-plugin-marketplace
```

然后搜索 "Everything Claude Code" 并一键安装。

### 方法二：手动安装

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code ~/.claude/skills/everything-claude-code

# 或者使用 npx
npx skills add https://github.com/affaan-m/everything-claude-code
```

### 方法三：通过 npm 包安装

```bash
# 安装配置工具
npm install -g everything-claude-code

# 初始化配置
ecc init
```

## 使用方法

### 基本命令

```bash
# 安全扫描
/security-scan

# 配置项目
/configure-ecc

# 其他可用命令
/compact          # 手动压缩上下文
/continue         # 继续上次会话
/test             # 运行测试
```

### 在不同工具中使用

Everything Claude Code 不仅支持 Claude Code，还支持：

- Claude Code
- Codex
- OpenCode
- Cursor

## 核心概念

### 1. 项目指令（Project Instructions）

通过 `CLAUDE.md` 文件为项目提供定制化指令：

```markdown
# 项目特定指令

## 代码风格
- 使用 TypeScript
- 使用 ESLint + Prettier

## 构建命令
- 开发: npm run dev
- 构建: npm run build
- 测试: npm test
```

### 2. 技能（Skills）

技能是扩展 Claude 能力的模块，包含：

- `SKILL.md`：技能定义文件
- 执行脚本
- 配置文件

### 3. 规则（Rules）

定义代码审查和安全规则：

```json
{
  "rules": [
    {
      "pattern": "console\\.log",
      "severity": "warning",
      "message": "生产环境不应使用 console.log"
    }
  ]
}
```

## 常见场景使用

### 1. 新项目初始化

```bash
# 1. 克隆项目
git clone my-project

# 2. 进入目录
cd my-project

# 3. 启动 Claude Code（自动加载项目指令）
claude

# 4. 使用初始化命令
/initialize
```

### 2. 开发调试

```bash
# 1. 运行开发服务器（自动在 tmux 中启动）
npm run dev

# 2. 调试问题时使用深度分析
/debug

# 3. 完成后压缩上下文
/compact
```

### 3. 代码审查

```bash
# 1. 启动审查模式
/review

# 2. 或者使用安全扫描
/security-scan --opus
```

## 优势总结

| 特性 | 描述 |
|-----|------|
| **开箱即用** | 一键安装，立即获得增强功能 |
| **高度可定制** | 模块化设计，可按需选择 |
| **安全可靠** | 内置安全扫描和危险命令拦截 |
| **跨工具支持** | 支持多种 AI 编程工具 |
| **社区活跃** | 130K+ 星，活跃的开发者社区 |

## 注意事项

1. **API 配额**：某些高级功能需要 Opus 模型
2. **权限设置**：部分 Hook 需要文件执行权限
3. **兼容性**：确保 Claude Code 版本支持所需功能

## 总结

Everything Claude Code 是提升 AI 编程效率的利器，无论你是初学者还是资深开发者，都能从中获得帮助。通过合理的配置和使用，它可以将你的 AI 助手从"可用"提升到"优秀"。

强烈建议在生产项目中使用它来获得更好的开发体验。

## 参考链接

- GitHub：https://github.com/affaan-m/everything-claude-code
- 官方文档：https://affaan-m-everything-claude-code.mintlify.app
- npm 包：https://www.npmjs.com/package/everything-claude-code


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/everything-claude-code-introduction/  

