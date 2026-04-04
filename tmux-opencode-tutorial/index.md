# Tmux + OpenCode 安装使用教程


# Tmux + OpenCode 安装使用教程

## 背景与简介

在日常开发和运维工作中，我们经常需要同时管理多个终端会话：

- 远程服务器上运行多个服务
- 同时查看日志、编辑代码、运行测试
- 临时断开连接后希望保持任务继续运行

Tmux（Terminal Multiplexer）正是为解决这些痛点而设计的终端复用器。而 OpenCode 作为一个开源的 AI 编程助手，可以大幅提升编码效率。

本文将详细介绍两者的安装与基本使用方法。

## 什么是 Tmux

Tmux 是一个终端复用器，允许在一个终端中运行多个会话、窗口和窗格。它的主要功能包括：

- **会话管理**：保持后台任务运行，即使 SSH 断开也不会中断
- **分屏功能**：将终端分割成多个窗格，同时查看多个任务
- **会话共享**：允许其他人加入到同一个终端会话中
- **标签式操作**：通过快捷键快速切换不同窗口

## 什么是 OpenCode

OpenCode 是一个开源的 AI 编程助手，支持：

- 代码补全与生成
- 代码审查与重构
- 自然语言编程
- 多模型支持

## Tmux 安装

### Ubuntu/Debian

```bash
sudo apt-get update
sudo apt-get install tmux
```

### CentOS/RHEL

```bash
sudo yum install tmux
```

### macOS

```bash
# 使用 Homebrew
brew install tmux
```

### 验证安装

```bash
tmux -V
```

## Tmux 基本使用

### 启动与退出

```bash
# 启动新会话
tmux

# 指定会话名称启动
tmux new -s mysession

# 退出 tmux（会话保留）
Ctrl+b 然后按 d

# 列出所有会话
tmux ls

# 重新接入会话
tmux attach -t mysession

# 杀死会话
tmux kill-session -t mysession
```

### 快捷键前缀

Tmux 的所有快捷键都需要先按下 **前缀键**（默认是 `Ctrl+b`），然后再按功能键。

### 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+b d` | detach：退出当前会话 |
| `Ctrl+b %` | split vertically：垂直分屏 |
| `Ctrl+b "` | split horizontally：水平分屏 |
| `Ctrl+b o` | 切换到下一个窗格 |
| `Ctrl+b ;` | 切换到上一个窗格 |
| `Ctrl+b x` | 关闭当前窗格 |
| `Ctrl+b c` | create：创建新窗口 |
| `Ctrl+b n` | next：切换到下一个窗口 |
| `Ctrl+b p` | previous：切换到上一个窗口 |
| `Ctrl+b 数字` | 切换到指定编号的窗口 |
| `Ctrl+b ,` | 重命名当前窗口 |

### 窗格操作示例

```bash
# 1. 创建垂直分屏
Ctrl+b %

# 2. 切换到左侧窗格
Ctrl+b ←

# 3. 创建水平分屏
Ctrl+b "

# 4. 调整窗格大小（按住 Ctrl 然后按方向键）
Ctrl+b Ctrl+方向键

# 5. 最大化当前窗格
Ctrl+b z

# 6. 列出所有快捷键
Ctrl+b ?
```

## OpenCode 安装

### Linux/macOS 一键安装

```bash
# 使用 curl
curl -sL https://opencode.com/download | sh

# 或者使用 wget
wget -qO- https://opencode.com/download | sh
```

### npm 安装

```bash
npm install -g opencode-cli
```

### Homebrew 安装（macOS）

```bash
brew install opencode
```

### Docker 运行

```bash
# 拉取镜像
docker pull opencode/opencode

# 运行
docker run -it --rm opencode/opencode
```

### 验证安装

```bash
opencode --version
```

## OpenCode 初始配置

### 配置 API Key

OpenCode 支持多种 AI 模型，首次使用需要配置 API Key：

```bash
# 交互式配置
opencode config

# 或者直接设置
opencode config set api.key YOUR_API_KEY
```

### 查看配置

```bash
opencode config list
```

### 常用配置项

```bash
# 设置默认模型
opencode config set model anthropic/claude-3-sonnet

# 设置最大并发数
opencode config set max-workers 4

# 启用技能扩展
opencode config set skills.enabled true
```

## Tmux + OpenCode 组合使用

### 场景一：开发工作流

创建一个专属的开发会话：

```bash
# 1. 创建新会话
tmux new -s dev

# 2. 分屏：左侧编写代码，右侧运行测试
# 左侧：使用 opencode
opencode edit app.py

# 右侧：运行测试
python test.py
```

### 场景二：远程开发

在远程服务器上使用 tmux 保持开发环境：

```bash
# 1. SSH 连接到服务器
ssh user@server

# 2. 启动 tmux 会话
tmux new -s remote-dev

# 3. 在 tmux 中启动 opencode
opencode serve

# 4. 断开 SSH（任务继续运行）
# 5. 重新连接后恢复会话
tmux attach -t remote-dev
```

### 场景三：并行任务处理

利用 tmux 的多窗口功能：

```bash
# 在不同窗口运行不同任务
# 窗口 1: OpenCode 服务
opencode serve

# 窗口 2: 代码编译
make build

# 窗口 3: 运行测试
make test

# 窗口 4: 查看日志
tail -f logs/app.log
```

## 常见问题

### Tmux 常见问题

**Q: 如何复制 tmux 中的文本？**
A: 进入复制模式 `Ctrl+b [`，使用方向键移动，使用 `Space` 开始选择，`Enter` 复制。

**Q: tmux 配置文件在哪里？**
A: 默认位置是 `~/.tmux.conf`。

**Q: 如何修改 tmux 前缀键？**
A: 在配置文件中添加：
```bash
set -g prefix C-a
unbind C-b
bind C-a send-prefix
```

### OpenCode 常见问题

**Q: OpenCode 支持哪些模型？**
A: 支持 Anthropic Claude、OpenAI GPT 系列、DeepSeek 等主流模型。

**Q: 如何查看帮助文档？**
A: 使用 `opencode --help` 或 `opencode help [command]`。

**Q: 技能（Skills）是什么？**
A: 技能是预定义的提示模板，可以增强特定任务的能力，如代码审查、调试等。

## 总结

Tmux 和 OpenCode 是提升开发效率的利器：

- **Tmux**：让你在终端中游刃有余，管理多个会话和窗口
- **OpenCode**：借助 AI 能力，让编程更高效、更智能

两者结合使用，无论是本地开发还是远程服务器管理，都能获得流畅的体验。建议在日常工作中逐步熟悉这些工具，发挥它们的最大价值。

---

## 参考资料

- [Tmux 官方文档](https://github.com/tmux/tmux)
- [OpenCode 官网](https://opencode.com)
- [OpenCode GitHub](https://github.com/opencode-ai/opencode)

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/tmux-opencode-tutorial/  

