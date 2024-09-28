# [nvim插件]nvim-gdb


<!--more-->
# [nvim-plugin]nvim-gdb
## nvim-gdb简介
nvim-gdb能够将gdb集成到vim中，能够方便地在vim中查看代码，调试起来更加方便了。今天安装测试了一下。
## nvim配置
配置起来非常简单
1. 在插件目录新建一个文件：plugin-nvim-gdb.lua
2. cp如下配置
```lua
root@ubuntu:~/.config/nvim-lazy-config/config/nvim/lua/plugins# cat plugin-nvim-gdb.lua 
return {
    {
        "sakhnik/nvim-gdb",
        lazy = false,
        config = function()
            vim.g.nvimgdb_use_cmake_to_find_executables=1
            --关闭nvimgdb
            --vim.g:loaded_nvimgdb = 1
        end,
    }
}
```
3. 重启nvim

## 常用快捷键
```bash

```

## 参考
- github：https://github.com/sakhnik/nvim-gdb


---

> 作者:   
> URL: https://cfanzp.com/nvim-plugin-nvim-gdb/  

