# neovim配置使用Terminal


<!--more-->
# neovim配置使用Terminal
在平时做开发的过程中，需要使用terminal的场景还是很多的，在使用tmux的情况下，不在vim内部打开terminal也是可以解决绝大多数的问题的。
有几个场景下使用vim外部的terminal还是不太方便：
1. 需要将terminal中的内容复制粘贴到vim中
    - 在vim内部复制粘贴非常方便但是，如果想把terminal中的字符复制到vim里就没那么方便了。
2. 需要将vim中的内容复制粘贴到termial中


## 快捷键配置
### jk退出终端插入模式
```lua
-- jk退出termial插入模式
vim.api.nvim_set_keymap('t', 'jk', '<C-\\><C-n>', { noremap = true, silent = true })
```
### ESC退出终端插入模式
```lua
-- 终端模式下的映射
vim.api.nvim_set_keymap('t', '<Esc>', '<C-\\><C-n>', { noremap = true, silent = true })
```

### Ctrl+hjkl在vim各个窗口之间切换
```lua
-- 终端模式下的映射
vim.api.nvim_set_keymap('t', '<C-h>', '<C-\\><C-N><C-w>h', { noremap = true, silent = true })
vim.api.nvim_set_keymap('t', '<C-j>', '<C-\\><C-N><C-w>j', { noremap = true, silent = true })
vim.api.nvim_set_keymap('t', '<C-k>', '<C-\\><C-N><C-w>k', { noremap = true, silent = true })
vim.api.nvim_set_keymap('t', '<C-l>', '<C-\\><C-N><C-w>l', { noremap = true, silent = true })

-- 插入模式下的映射
vim.api.nvim_set_keymap('i', '<C-h>', '<C-\\><C-N><C-w>h', { noremap = true, silent = true })
vim.api.nvim_set_keymap('i', '<C-j>', '<C-\\><C-N><C-w>j', { noremap = true, silent = true })
vim.api.nvim_set_keymap('i', '<C-k>', '<C-\\><C-N><C-w>k', { noremap = true, silent = true })
vim.api.nvim_set_keymap('i', '<C-l>', '<C-\\><C-N><C-w>l', { noremap = true, silent = true })

-- 普通模式下的映射
vim.api.nvim_set_keymap('n', '<C-h>', '<C-w>h', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<C-j>', '<C-w>j', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<C-k>', '<C-w>k', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<C-l>', '<C-w>l', { noremap = true, silent = true }) 
```

## ToggleTerm插件使用
为什么要使用ToggleTerm插件？
1. toggleTerm插件能够方便地固定终端的位置及样式
2. 使用起来更方便

### ToggleTerm插件安装
```bash
root@VM:~/.config/nvim/lua/plugins# cat plugin-toggleterm.lua
return {
    'akinsho/toggleterm.nvim',
    version = "*",
    config = true,
    opts = {
        --[[ things you want to change go here]]
    }
}
```

### ToggleTerm插件配置
- 使用Ctrl + t开启和关闭终端
- 默认配置是在下方弹出,具体各种样式配置可以参考官网
- github地址：https://github.com/akinsho/toggleterm.nvim
```lua
-- toggleterm
vim.api.nvim_set_keymap('t', '<C-t>', '<C-\\><C-N> :ToggleTerm<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('i', '<C-t>', ':ToggleTerm<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<C-t>', ':ToggleTerm<CR>', { noremap = true, silent = true })
```

## 参考
- [nvim-termial官方配置](https://neovim.io/doc/user/terminal.html)


---

> 作者:   
> URL: http://111.230.8.71:8889/neovim-terminal/  

