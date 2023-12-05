# Vim配置vim-go


<!--more-->
# Vim配置vim-go插件
Vim安装了vim-go插件后语法高亮默认不会高亮函数，可以添加一些配置

## 配置文件中加入vim-go插件并安装
```vimL
Plug 'fatih/vim-go'
```

## 配置文件中加入vim-go相关配置
```vimL
" 自动补全
let g:go_auto_sameids = 1
let g:go_auto_type_info = 1
let g:go_auto_unimported = 1

" 代码格式化
autocmd BufWritePre *.go :silent! call go#fmt#Fmt()

" 调试支持
let g:go_gdb_enabled = 1
let g:go_debug_breakpoint_style = 'condition'
let g:go_debug_adapter = 'dlv'

"golang高亮
let g:go_highlight_types = 1
let g:go_highlight_fields = 1
let g:go_highlight_functions = 1
let g:go_highlight_function_calls = 1
let g:go_highlight_operators = 1
let g:go_highlight_extra_types = 1
```


---

> 作者:   
> URL: https://cfanzp.com/vim-go/  

