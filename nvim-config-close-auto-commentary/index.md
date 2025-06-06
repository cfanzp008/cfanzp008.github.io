# [nvim配置-复制粘贴]nvim配置关闭插入代码时换行自动注释


<!--more-->
# nvim配置关闭插入代码时换行自动注释
使用nvim的时候如果相应复制一段代码到vim中经常遇到这样的问题
1. 复制代码代系统剪贴板。
2. 在xshell等远程工具中按下shift+insert或鼠标右键粘贴到nvim中。
3. 如果被复制的代码块中有注释行，那么被粘贴到vim中的代码，注释行后面的行都将会被注释掉。这个十分讨厌。
## 解决方法
- 在nvim配置文件上加上如下配置，关闭换行时自动添加注释
```lua
-- Disable automatic commenting on newline
vim.api.nvim_create_autocmd({"BufEnter", "FileType"}, {
    pattern = "*",
    callback = function()
        vim.opt_local.formatoptions:remove("c")
        vim.opt_local.formatoptions:remove("r")
        vim.opt_local.formatoptions:remove("o")
    end,
})
```


---

> 作者:   
> URL: http://111.230.8.71:8889/nvim-config-close-auto-commentary/  

