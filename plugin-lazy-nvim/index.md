# [nvim插件]lazy.nvim用法


<!--more-->
# [nvim插件]lazy.nvim用法
## 官方网站
- https://github.com/folke/lazy.nvim

## lazy.nvim插件有什么用？
- lazy.nvim是一个nvim插件的管理工具

## lazy.nvim插件如何安装？
- init.lua
```bash
-- bootstrap lazy.nvim
-- ./lua/lazynvim-init.lua
require("lazynvim-init")
```

- 加载插件
- ./lua/lazynvim-init.lua
```bash
-- 1. 准备lazy.nvim模块（存在性检测）
-- stdpath("data")
-- macOS/Linux: ~/.local/share/nvim
-- Windows: ~/AppData/Local/nvim-data
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
    vim.fn.system({
        "git",
        "clone",
        "--filter=blob:none",
        "https://github.com/folke/lazy.nvim.git",
        "--branch=stable", -- latest stable release
        lazypath,
    })
end
-- 
-- 2. 将 lazypath 设置为运行时路径
-- rtp（runtime path）
-- nvim进行路径搜索的时候，除已有的路径，还会从prepend的路径中查找
-- 否则，下面 require("lazy") 是找不到的
vim.opt.rtp:prepend(lazypath)

-- 3. 加载lazy.nvim模块
require("lazy").setup({})
```

- lazy.nvim安装位置
```bash
~/.local/share/nvim/lazy/lazy.nvim
```

## lazy.nvim相关命令
```bash
:Lazy help
:Lazy home 查看主界面
:Lazy health 查看lazy健康状态


## 参考
- https://zhuanlan.zhihu.com/p/638379995
```


---

> 作者:   
> URL: http://111.230.8.71:8889/plugin-lazy-nvim/  

