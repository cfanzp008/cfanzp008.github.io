# Superfile：美观现代的终端文件管理器


# Superfile：美观现代的终端文件管理器

## 什么是 Superfile

Superfile 是一个非常精美且现代化的终端文件管理器，由 Go 语言开发。它旨在为用户提供一个既美观又功能完整的命令行文件管理体验。

截至目前，Superfile 在 GitHub 上已获得超过 17000 个 Star，是当前最受欢迎的终端文件管理器之一。

**核心特点：**
- **精美 UI**：专为美观设计的界面
- **完整功能**：支持几乎所有文件操作
- **完全可定制**：可自定义热键、主题颜色、边框样式
- **多面板支持**：可同时查看多个目录

## 安装配置

### 环境要求

- Go 1.22+（如需源码编译）
- 终端模拟器支持 Unicode 字符

### 安装方式

```bash
# 方式一：官方安装脚本（推荐）
bash -c "$(curl -sLo- https://superfile.netlify.app/install.sh)"

# 方式二：使用 wget
bash -c "$(wget -qO- https://superfile.netlify.app/install.sh)"

# 方式三：使用 Homebrew（macOS/Linux）
brew install superfile

# 方式四：使用 Go 安装
go install github.com/yorukot/superfile@latest
```

### 启动 Superfile

```bash
# 直接运行
superfile

# 或指定目录启动
superfile /path/to/directory
```

## 思维导图：Superfile 功能概览

```
                         ┌─────────────────────────────────────────┐
                         │          Superfile 功能体系             │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│      核心特性        │        │     文件操作        │        │     多面板功能       │
│                     │        │                     │        │                     │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─精美 UI 设计                    ├─浏览/导航                      ├─多标签页
          ├─主题切换                        ├─复制/移动/删除                 ├─面板切换
          ├─快捷键自定义                    ├─重命名/创建                   ├─跨面板复制
          └─边框样式                        ├─搜索/过滤                     └─分屏显示
                                           │
                                           ├─压缩/解压
                                           ├─权限修改
                                           └─书签收藏
                                           
                                           ▼
                              ┌─────────────────────────────────┐
                              │        可视化操作              │
                              ├─────────────────────────────────┤
                              │ • 进度条显示                   │
                              │ • 文件预览                     │
                              │ • 大小计算                     │
                              │ • 类型图标                     │
                              └─────────────────────────────────┘
```

## 基本操作

### 导航操作

| 按键 | 功能 |
|-----|------|
| `h/j/k/l` 或 `←↓↑→` | 导航（Vim 风格/方向键） |
| `Enter` | 进入目录/打开文件 |
| `Backspace` | 返回上级目录 |
| `g` | 转到目录开头 |
| `G` | 转到目录末尾 |
| `/` | 搜索文件 |
| `cd` | 切换目录 |

### 文件操作

| 按键 | 功能 |
|-----|------|
| `Space` | 选择/取消选择文件 |
| `v` | 可视模式选择 |
| `y` | 复制文件 |
| `x` | 剪切文件 |
| `p` | 粘贴文件 |
| `d` | 删除文件 |
| `r` | 重命名文件 |
| `n` | 创建新文件/目录 |
| `Shift + n` | 创建新目录 |

### 快捷操作

| 按键 | 功能 |
|-----|------|
| `:` | 打开命令面板 |
| `z` | 撤销操作 |
| `Ctrl + z` | 后台运行 |
| `q` | 退出 |
| `?` | 帮助 |

### 命令模式

在命令模式（按 `:`）下可以执行：

```
:open /path/to/directory  # 打开目录
:mkdir new_folder         # 创建目录
:touch new_file           # 创建文件
:rename old new           # 重命名
:delete                   # 删除选中
:copy /path/to/dest       # 复制到路径
:move /path/to/dest       # 移动到路径
```

## 多面板功能

Superfile 支持多面板操作，这是其核心特色之一。

### 面板操作

```bash
# 水平分屏
Shift + h

# 垂直分屏
Shift + v

# 切换面板
Ctrl + w

# 关闭面板
:q
```

### 跨面板复制

1. 在左侧面板选择文件（按 `Space`）
2. 按 `y` 复制
3. 切换到右侧面板（`Ctrl + w`）
4. 按 `p` 粘贴

### 多标签页

```bash
# 新建标签页
t

# 关闭标签页
x

# 切换标签页
Shift + h / Shift + l
```

## 自定义配置

### 配置文件位置

```
~/.config/superfile/
├── config.toml      # 主配置
├── theme.toml       # 主题配置
└── keymap.toml      # 快捷键配置
```

### 主题配置

```toml
# config.toml 示例
[theme]
name = "catppuccin"  # 可选: default, catppuccin, nord, dracula

[ui]
show_hidden = false    # 显示隐藏文件
show_size = true       # 显示文件大小
show_date = true       # 显示日期

[border]
style = "rounded"      # 可选: rounded, sharp, dashed
```

### 快捷键自定义

```toml
# keymap.toml 示例
[keymap]
navigate = ["h", "j", "k", "l"]
open = "enter"
back = "backspace"
delete = "d"
rename = "r"
copy = "y"
paste = "p"
```

## 与其他工具对比

| 工具 | 语言 | Star 数 | 特点 |
|-----|------|--------|------|
| **Superfile** | Go | 17k+ | 美观现代，多面板 |
| **ranger** | Python | 10k+ | Vim 风格，高度可定制 |
| **fzf** | Go | 57k+ | 模糊搜索，快速 |
| **lf** | Go | 5k+ | 轻量简单 |
| **yazi** | Rust | 12k+ | 异步快速 |

## 常见问题

### Q: 终端显示异常怎么办？

A: 确保终端支持 Unicode 和真彩色。尝试：
```bash
# 检查终端支持
export TERM=xterm-256color
```

### Q: 如何显示隐藏文件？

A: 按 `Shift + .` 或在配置中设置 `show_hidden = true`

### Q: 支持哪些终端？

A: 支持 iTerm2、Kitty、Alacritty、WezTerm 等现代终端。

### Q: 如何更新 Superfile？

```bash
# 重新运行安装脚本
bash -c "$(curl -sLo- https://superfile.netlify.app/install.sh)"
```

## 总结

Superfile 是一个兼具美观和功能性的终端文件管理器，特别适合：
- 喜欢 Vim 风格操作的用户
- 需要多面板文件管理的工作流
- 对终端界面有美学要求的使用者

通过熟练掌握其快捷键和多面板功能，可以显著提升文件管理效率。

## 参考资源

- [Superfile 官网](https://superfile.dev/)
- [Superfile GitHub](https://github.com/yorukot/superfile)
- [Superfile Discord](https://discord.gg/YYtJ23Du7B)

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/superfile-introduction/  

