# 终端浏览器 Carbonyl 与 Brow6el 介绍


# 终端浏览器 Carbonyl 与 Brow6el 介绍

## 背景

在终端环境中浏览网页通常意味着只能访问纯文本内容，放弃所有的图片、视频和交互式 Web 应用。但随着 `Carbonyl` 和 `Brow6el` 这两款终端浏览器的出现，开发者可以在终端中体验完整的 Web 内容，包括视频播放、WebGL 游戏等。

## Carbonyl

### 什么是 Carbonyl

Carbonyl 是一个基于 Chromium 的终端浏览器，由 Fathy Boundjadj 开发。它可以在终端中运行完整的 Chromium 浏览器，支持几乎所有现代 Web API。

### 主要特性

- **60 FPS 流畅渲染**：高性能图形渲染
- **完整 Web API 支持**：包括 WebGL、WebGPU、音频视频播放
- **无需图形界面**：不依赖 X Server，可在纯终端环境运行
- **SSH 远程支持**：可以通过 SSH 远程访问
- **Rust 实现**：使用 Rust 编写，性能优异

### 安装方法

```bash
# 使用 cargo 安装
cargo install carbonyl

# 或者下载预编译版本
# 访问 https://github.com/fathyb/carbonyl/releases
```

### 使用方法

```bash
# 基本用法
carbonyl https://www.baidu.com

# 禁用沙箱（某些环境需要）
carbonyl --no-sandbox https://www.baidu.com
```

### 键盘操作

- `j/k` 或 `↑/↓`：滚动页面
- `h/l` 或 `←/→`：左右滚动
- `o`：打开 URL
- `t`：在新标签页打开
- `f`：复制链接
- `d`：下载当前链接
- `i`：进入交互模式
- `q`：退出

## Brow6el

### 什么是 Brow6el

Brow6el 是另一款基于 Chromium (CEF) 的终端浏览器，由 Jan Antos 开发。它使用 Sixel 图形协议在终端中渲染网页内容。

### 主要特性

- **Sixel 图形支持**：使用 Sixel 协议渲染图形
- **Kitty 协议支持**：兼容 Kitty 终端的图形协议
- **Vim 风格操作**：三种模式（Normal、Insert、Visual）
- **鼠标支持**：支持鼠标点击和滚动
- **书签管理**：内置书签功能
- **下载管理**：支持文件下载
- **JavaScript 控制台**：支持 JS 控制台

### 安装方法

```bash
# 从源码编译
git clone https://codeberg.org/janantos/brow6el.git
cd brow6el
cargo build --release

# 或下载 AppImage
wget https://www.brow6el.dev/brow6el.AppImage
chmod +x brow6el.AppImage
./brow6el.AppImage
```

### 键盘操作

Brow6el 使用 Vim 风格的三种模式：

**Normal 模式：**
- `j/k`：向下/向上滚动
- `h/l`：向左/向右滚动
- `g`：跳转到页面顶部
- `G`：跳转到页面底部
- `o`：打开 URL
- `t`：新标签页
- `x`：关闭标签页
- `r`：刷新页面

**Insert 模式：**
- `i`：进入插入模式
- `Esc`：返回 Normal 模式

**Visual 模式：**
- `v`：进入可视模式选择文本

## 对比与选择

| 特性 | Carbonyl | Brow6el |
|-----|----------|---------|
| 渲染方式 | Direct Terminal | Sixel/Kitty |
| 帧率 | 60 FPS | 取决于终端 |
| 依赖 | 较轻 | 需要 Sixel 支持 |
| 操作方式 | 简单快捷 | Vim 风格 |
| 项目状态 | 活跃 | 活跃 |

### 适用场景

**推荐使用 Carbonyl：**
- 需要高帧率流畅体验
- 终端环境较为基础
- 简单快速的网页浏览

**推荐使用 Brow6el：**
- 需要 Vim 风格操作
- 使用支持 Sixel 的终端（如 mlterm、xterm）
- 需要书签和下载管理功能

## 注意事项

1. **终端兼容性**：确保终端支持相应的图形协议
2. **性能考虑**：在资源受限环境可能体验不佳
3. **视频播放**：需要终端支持视频解码
4. `--no-sandbox` 参数：在某些 Linux 环境运行 Chromium 需要此参数

## 总结

Carbonyl 和 Brow6el 为终端用户带来了完整的 Web 体验。虽然它们无法完全替代图形界面浏览器，但在服务器管理、远程 SSH 连接等场景下，这些工具可以提供极大的便利。

如果你经常在终端中工作，或需要通过 SSH 访问网页，这两个工具都值得一试。

## 参考链接

- Carbonyl GitHub：https://github.com/fathyb/carbonyl
- Brow6el 官网：https://www.brow6el.dev/
- Brow6el Codeberg：https://codeberg.org/janantos/brow6el


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/carbonyl-brow6el-terminal-browser/  

