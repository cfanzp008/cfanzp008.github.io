# markview.nvim - Neovim 文档实时预览插件


# markview.nvim - Neovim 文档实时预览插件

## 简介

如果你经常在 Neovim 中编辑 Markdown、LaTeX 等文档，是否曾梦想过能够实时预览渲染效果？**markview.nvim** 正是为解决这个需求而生的插件。它支持在 Neovim 中实时预览多种文档格式，包括 Markdown、HTML、LaTeX、Typst、YAML 和 Asciidoc。

![markview.nvim 预览效果](/images/markview-preview.png)

markview.nvim 具有以下核心特性：

- **多格式支持**：支持 Markdown、HTML、LaTeX、Typst、YAML、Asciidoc 六种格式
- **混合编辑模式**：允许在预览的同时直接编辑文档
- **分屏预览**：支持左右分屏同时查看编辑和预览效果
- **高度可定制**：几乎所有功能都可以通过配置自定义
- **动态高亮**：自动适配当前colorscheme主题

## 安装要求

### 系统要求

- Neovim >= 0.10.3

### 推荐配置

- 使用 tree-sitter 基础的 colorscheme
- 推荐使用 `nowrap` 选项（插件本身支持 wrap）
- 不使用 `expandtab`

### 必需的 Tree-sitter 解析器

需要安装以下解析器：

```vim
:TSInstall markdown markdown_inline html latex typst yaml
```

### 可选解析器

- `comment`：支持 fancy comments
- `html`：支持 HTML 预览
- `latex`：支持 LaTeX 数学公式
- `typst`：支持 Typst 预览
- [tree-sitter-asciidoc](https://github.com/cathaysia/tree-sitter-asciidoc)：支持 Asciidoc

### 字体要求

- 需要现代 Unicode 字体来显示数学符号
- 推荐使用 Nerd Fonts

## 安装方式

### 使用 Lazy.nvim

```lua
-- plugins/markview.lua
return {
    "OXY2DEV/markview.nvim",
    lazy = false,
}
```

### 使用 Vim-plug

```vim
Plug 'OXY2DEV/markview.nvim'
```

### 使用 Mini.deps

```lua
local MiniDeps = require("mini.deps")
MiniDeps.add({
    source = "OXY2DEV/markview.nvim",
})
```

### 使用 Rocks.nvim

```bash
:Rocks install markview.nvim
```

## 基本使用

### 命令行

插件使用子命令的形式提供功能，主要命令为 `:Markview`：

| 命令 | 说明 |
|------|------|
| `:Markview Toggle` | 全局切换预览 |
| `:Markview Enable` | 全局启用预览 |
| `:Markview Disable` | 全局禁用预览 |
| `:Markview toggle [buffer]` | 切换指定缓冲区预览 |
| `:Markview splitToggle` | 切换分屏预览 |
| `:Markview HybridEnable` | 启用混合编辑模式 |
| `:Markview HybridDisable` | 禁用混合编辑模式 |
| `:Markview render` | 渲染当前缓冲区 |
| `:Markview clear` | 清除当前缓冲区预览 |

### 混合编辑模式（Hybrid Mode）

混合编辑模式是 markview.nvim 的一大特色，允许你在预览的同时直接编辑文档。有两种模式：

- **Node-based**（默认）：基于语法树节点清除编辑范围
- **Range-based**：基于光标上下行数清除范围

```vim
" 启用混合模式
:Markview HybridEnable

" 切换到行-wise模式
:Markview linewiseEnable
```

### 分屏预览

可以将预览窗口分离到单独窗口：

```vim
" 打开分屏预览
:Markview splitOpen

" 关闭分屏
:Markview splitClose

" 重新绘制
:Markview splitRedraw
```

## 配置示例

### 基础配置

```lua
require("markview").setup({
    preview = {
        -- 使用内置图标提供器
        icon_provider = "internal",
    },
    markdown = {
        -- 启用 Org-mode 风格的标题缩进
        headings = {
            org_indent = true,
        },
        -- 启用 Checkbox 支持
        checkboxes = {
            enabled = true,
        },
    },
})
```

### 启用混合编辑模式

```lua
require("markview").setup({
    hybrid_mode = {
        enabled = true,
        -- 默认使用行-wise模式
        linewise = true,
    },
})
```

### 分屏预览配置

```lua
require("markview").setup({
    split = {
        -- 分屏方向
        orientation = "right",
        -- 初始窗口宽度
        width = 0.5,
        -- 滚动同步
        scroll_sync = true,
    },
})
```

## 支持的语法

### Markdown

- 标题（Setext 和 ATX 风格）
- 代码块（带语言标识）
- 列表项（有序和无序）
- 表格
- Checkbox（支持 GitHub 风格）
- 引用块（支持 Callouts）
- 链接和图片
- 脚注
- 代码高亮
- Obsidian 扩展语法（块引用、内部链接、标签）

### LaTeX

- 数学块（`$$...$$`）
- 行内数学（`$...$`）
- 常用数学命令（`\frac`、`\sin`、`\cos`、`\sqrt` 等）
- 数学字体（`\mathbb`、`\mathbf`、`\mathcal` 等）
- 支持 2056 个数学符号

### HTML

- 容器元素（`<a>`、`<b>`、`<code>`、`<em>` 等）
- 空元素（`<hr>`、`<br>`）
- 自定义样式

### Typst

- 代码块和行内代码
- 标题
- 列表项
- 数学块
- 引用链接
- 932 个符号支持

### YAML

- 自定义属性图标
- 类型特定的装饰
- 常用属性高亮

### Asciidoc

- Admonitions
- Checkbox
- 水平线
- 代码块
- 列表项
- 自动化 TOC

## 调试功能

markview.nvim 提供_traceShow` 命令用于调试：

```vim
" 查看插件执行日志
:Markview traceShow

" 导出日志到文件
:Markview traceExport
```

## 检查健康状态

安装后运行以下命令检查配置：

```vim
:checkhealth markview
```

## 常见问题

### 预览不显示

1. 确认已安装所需的 tree-sitter 解析器
2. 检查是否正确加载了插件
3. 运行 `:checkhealth markview` 检查问题

### 样式不正确

1. 确保使用 tree-sitter 基础的 colorscheme
2. 检查字体是否支持所需字符（特别是数学符号）

### 透明主题兼容

如果使用透明 colorscheme 且颜色显示不正确，参考官方 Wiki 的透明主题配置。

## 总结

markview.nvim 是一个功能强大且高度可定制的文档预览插件，特别适合：

- 经常编辑 Markdown 文档的开发者
- 写作技术文档的用户
- 使用 LaTeX 写数学公式的用户
- 需要 Obsidian 风格语法的 PKM 用户

其混合编辑模式和分屏预览功能使得编辑体验非常流畅，值得一试。

## 参考链接

- [GitHub 仓库](https://github.com/OXY2DEV/markview.nvim)
- [官方 Wiki](https://github.com/OXY2DEV/markview.nvim/wiki/Home)
- [配置文档](https://github.com/OXY2DEV/markview.nvim/wiki/Configuration)

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/markview-nvim-plugin/  

