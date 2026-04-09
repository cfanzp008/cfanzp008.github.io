# Surfingkeys - 浏览器端的 Vim 键位扩展


# Surfingkeys - 浏览器端的 Vim 键位扩展

## 什么是 Surfingkeys

[Surfingkeys](https://github.com/brookhong/Surfingkeys) 是一个为浏览器设计的键位扩展，兼容 Chrome、Chromium、Firefox 和 Safari。它将 Vim 编辑器的操作方式带入浏览器，让用户可以完全脱离鼠标，仅用键盘就能高效浏览网页。

目前该项目在 GitHub 上拥有 **6.1k stars**，可见其受欢迎程度。

## 安装

### Chrome/Chromium

从 [Chrome Web Store](https://chrome.google.com/webstore/detail/surfingkeys/gfbliohnnapiefjpjlpjnehglfpaknnc) 安装

### Firefox

从 [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/surfingkeys_ff/) 安装

## 核心功能

### 1. 键盘导航

| 按键 | 功能 |
|------|------|
| `j/k` | 向下/向上滚动 |
| `h/l` | 向左/向右滚动 |
| `d/u` | 向下/向上滚动半页 |
| `f` | 跟随链接（显示提示字母） |
| `F` | 在新标签页中打开链接 |
| `t` | 搜索书签/历史 |
| `/` | 在当前页面搜索 |
| `T` | 切换标签页 |

### 2. Vim 风格操作

- **Normal 模式**: 默认模式，使用上述键位导航
- **Insert 模式**: 在输入框中输入时自动启用
- **Visual 模式**: 按 `v` 切换，可使用 Vim 光标移动选择文本
- **Vim-like marks**: 支持书签标记

### 3. 页面操作

| 按键 | 功能 |
|------|------|
| `i` | 插入模式 |
| `v` | 切换 Visual 模式 |
| `yy` | 复制当前页面 URL |
| `yf` | 复制当前页面 Frame URL |
| `yr` | 读取并复制页面源码 |
| `;p` | 打印页面 |
| `;pb` | Markdown 预览 |

### 4. Tab 管理

| 按键 | 功能 |
|------|------|
| `x` | 关闭当前标签页 |
| `X` | 恢复刚关闭的标签页 |
| `J/K` | 切换到左/右标签页 |
| `g0/g$` | 跳到首/尾标签页 |
| `Q` | 列出所有标签页 |

### 5. 搜索和 Hint 模式

 Surfingkeys 提供了丰富的 Hint 模式功能：

- 按 `f` 后，页面所有可点击元素会显示字母提示
- 按提示字母即可点击
- 支持搜索结果的快速选择
- 支持表单填充

## 高级功能

### 1. 内置 Vim 编辑器

 Surfingkeys 集成了 Ace Editor，提供完整的 Vim 编辑体验：

- `Ctrl-i`: 在输入框中打开 Vim 编辑器
- 支持 `Ctrl-b/f` 删除单词
- 支持 `Alt-b/f` 单词前后移动

### 2. 代理模式

通过快捷键快速切换代理：

```javascript
;pb  // 按主机设置代理
;pc  // 清除代理
;pd  // 直连模式
;ps  // 使用系统代理
```

### 3. 自定义配置

所有设置通过 JavaScript 文件配置，可以自定义键位映射：

```javascript
// 示例：自定义映射
mapkey('<Ctrl-y>', 'Show me the money', function() {
    // 你的自定义动作
});

map(';d', '<Ctrl-Alt-d>');

// 设置主题
settings.theme = `
:root {
  --fg: #C5C8C6;
  --bg: #282A2E;
}
`;
```

### 4. 书签和历史

| 按键 | 功能 |
|------|------|
| `go` | 打开书签 |
| `gn` | 在当前页搜索书签 |
| `gr` | 在当前页搜索历史 |
| `gs` | 选择搜索引擎 |

## 使用技巧

### 显示帮助

按 `?` 可以查看当前所有可用快捷键

### 数量前缀

支持重复执行，如 `3j` 向下滚动 3 行

### 重复上次动作

按 `.` 可以重复上次执行的命令

### Emoji 支持

在 Insert 模式下，`Ctrl-6` 后可输入 Emoji

## 适用人群

- **Vim 用户**: 已习惯 Vim 操作方式，期望浏览器也能如此
- **效率追求者**: 想要摆脱鼠标，完全键盘操作
- **开发者**: 经常在浏览器和编辑器间切换

## 总结

 Surfingkeys 将 Vim 的高效操作哲学带入浏览器，让用户能够：
- 双手无需离开键盘
- 快速导航和操作页面
- 完全自定义键位映射

如果你已经是 Vim 用户， Surfingkeys 能让你在浏览器中延续熟悉的操作体验，大幅提升浏览效率。

---

**参考链接**：
- GitHub: https://github.com/brookhong/Surfingkeys
- Chrome Web Store: https://chrome.google.com/webstore/detail/surfingkeys/gfbliohnnapiefjpjlpjnehglfpaknnc

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/surfingkeys-vim-browser-extension/  

