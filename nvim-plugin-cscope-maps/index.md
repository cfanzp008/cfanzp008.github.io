# [nvim插件]cscope_maps.nvim


<!--more-->
# [nvim插件]cscope_maps.nvim
## cscope_maps.nvim插件是什么？
- cscope_maps.nvim是一个nvim的代码跳转插件，之前尝试在vim中使用过，后来使用nvim比较多，安装类似插件没有配置成功，原因是nvim某个版本开始不支持了。
- 在nvim0.9.5+版本后cscope可以使用了。安装cscope_maps插件就可以了。

## cscope_maps插件的原理是什么？
- cscope_maps的原理是使用cscope生成代码数据库，cscope_maps调用对应的cscope命令实现相应的跳转功能。

## cscope_maps插件有什么作用？
- cscope_maps.nvim插件能帮助我们实现代码的跳转
  - 能够跳转到代码的实现(implement)
  - 能够跳转到代码的声明
  - 能够跳转到函数被那些函数引用了(reference)

## cscope插件如何安装
- 这里仅仅演示一下lazy.nvim的安装方式，其它插件管理工具安装方式这里不再赘述。
```bash
touch ~/.config/nvim/lua/plugins/plugin-nvim-cscope-maps.lua
nvim ~/.config/nvim/lua/plugins/plugin-nvim-cscope-maps.lua
```

- 添加插件配置代码
```lua
return {
    {
  "dhananjaylatkar/cscope_maps.nvim",
  dependencies = {
    "folke/which-key.nvim", -- optional [for whichkey hints]
    "nvim-telescope/telescope.nvim", -- optional [for picker="telescope"]
    "ibhagwan/fzf-lua", -- optional [for picker="fzf-lua"]
    "nvim-tree/nvim-web-devicons", -- optional [for devicons in telescope or fzf]
  },
  opts = {
    -- USE EMPTY FOR DEFAULT OPTIONS
    -- DEFAULTS ARE LISTED BELOW
  },
}
}
```
## 用法
- 配合map-key插件
```bash
<leader> + c + b Build database (生成数据库文件)
<leader> + c + a Find places where this symbo is assigned
<leader> + c + c Find functions calling this function(查找引用)
<leader> + c + d Find functions called by this function(查找被当前函数调用的函数)
<leader> + c + e Find this egrep pattern
<leader> + c + f Find this file
<leader> + c + g Find this global definition
<leader> + c + i Find files #including this file
<leader> + c + s Find this symbol
<leader> + c + t Find this text string
```


---

> 作者:   
> URL: https://cfanzp.com/nvim-plugin-cscope-maps/  

