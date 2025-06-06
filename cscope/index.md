# vim配置使用cscope


<!--more-->
# vim配置使用cscope
## ubuntu20.04 安装cscope
```bash
apt install cscope
```

## cscope 生成索引文件
```
find `pwd` -name "*.h" -o -name "*.hpp" -o -name "*.cpp" -o -name "*.cc" -o -name "*.c" > cscope.files
cscope -Rbq -i cscope.files
或者
cscope -Rbq // cscope 默认在当前路径查找cscope.files
```

## cscopt.vim 快捷键配置
```
Below is the minimum key mappings.

nnoremap <leader>fa :call cscope#findInteractive(expand('<cword>'))<CR>
nnoremap <leader>l :call ToggleLocationList()<CR>

Some optional key mappings to search directly.

" s: Find this C symbol
nnoremap  <leader>fs :call cscope#find('s', expand('<cword>'))<CR>
" g: Find this definition
nnoremap  <leader>fg :call cscope#find('g', expand('<cword>'))<CR>
" d: Find functions called by this function
nnoremap  <leader>fd :call cscope#find('d', expand('<cword>'))<CR>
" c: Find functions calling this function
nnoremap  <leader>fc :call cscope#find('c', expand('<cword>'))<CR>
" t: Find this text string
nnoremap  <leader>ft :call cscope#find('t', expand('<cword>'))<CR>
" e: Find this egrep pattern
nnoremap  <leader>fe :call cscope#find('e', expand('<cword>'))<CR>
" f: Find this file
nnoremap  <leader>ff :call cscope#find('f', expand('<cword>'))<CR>
" i: Find files #including this file
nnoremap  <leader>fi :call cscope#find('i', expand('<cword>'))<CR>

```

## vim 配置
```
Plug 'vim-scripts/cscope.vim'
"cscope
set cscopequickfix=s-,c-,d-,i-,t-,e-
nnoremap <leader>sa :call cscope#findInteractive(expand('<cword>'))<CR>
nnoremap <leader>sl :call ToggleLocationList()<CR>
" s: Find this C symbol
nnoremap  <leader>ss :call cscope#find('s', expand('<cword>'))<CR>
" " g: Find this definition
nnoremap  <leader>sg :call cscope#find('g', expand('<cword>'))<CR>
" " d: Find functions called by this function
nnoremap  <leader>sd :call cscope#find('d', expand('<cword>'))<CR>
" " c: Find functions calling this function
nnoremap  <leader>sc :call cscope#find('c', expand('<cword>'))<CR>
" t: Find this text string
nnoremap  <leader>st :call cscope#find('t', expand('<cword>'))<CR>
" e: Find this egrep pattern
nnoremap  <leader>se :call cscope#find('e', expand('<cword>'))<CR>
" f: Find this file
nnoremap  <leader>sf :call cscope#find('f', expand('<cword>'))<CR>
" i: Find files #including this file
nnoremap  <leader>si :call cscope#find('i', expand('<cword>'))<CR>
if has("cscope")
    set csprg=/usr/bin/cscope
    set csto=0
    set cst
    set nocsverb
    " add any database in current directory
    if filereadable("cscope.out")
        cs add cscope.out
        " else add database pointed to by environment
    elseif $CSCOPE_DB != ""
        cs add $CSCOPE_DB
    endif
    set csverb
endif

"map g<C-]> :cs find 3 <C-R>=expand(“<cword>”)<CR><CR>
"map g<C-/> :cs find 0 <C-R>=expand(“<cword>”)<CR><CR>
"
"nmap <C-_>s :cs find s <C-R>=expand("<cword>")<CR><CR>
"nmap <C-_>g :cs find g <C-R>=expand("<cword>")<CR><CR>
"nmap <C-_>c :cs find c <C-R>=expand("<cword>")<CR><CR>
"nmap <C-_>t :cs find t <C-R>=expand("<cword>")<CR><CR>
"nmap <C-_>e :cs find e <C-R>=expand("<cword>")<CR><CR>
"nmap <C-_>f :cs find f <C-R>=expand("<cfile>")<CR><CR>
"nmap <C-_>i :cs find i <C-R>=expand("<cfile>")<CR><CR>
"nmap <C-_>d :cs find d <C-R>=expand("<cword>")<CR><CR>
"设定是否使用 quickfix 窗口来显示 cscope 结果
"set cscopequickfix=s-,c-,d-,i-,t-,e-
"生成数据库
"cscope -Rbkq
"R 表示把所有子目录里的文件也建立索引
"b 表示cscope不启动自带的用户界面，而仅仅建立符号数据库
"q生成cscope.in.out和cscope.po.out文件，加快cscope的索引速度
"k在生成索引文件时，不搜索/usr/include目录
"end cscope config



```

## 参考
- [参考1](https://www.jianshu.com/p/5d53802ab745)
- [参考2](https://blog.csdn.net/hunter___/article/details/80333543)
- https://zhuanlan.zhihu.com/p/504862247
- https://blog.csdn.net/ywgdk/article/details/53607874
- [cscop.vim](https://github.com/vim-scripts/cscope.vim)
- https://www.cnblogs.com/willsonli/p/6561398.html


---

> 作者:   
> URL: http://111.230.8.71:8889/cscope/  

