# Vim插件:对齐插件-Tabular

# vim插件-对齐插件tabular
## 简单介绍
- vim中怎么按"=","+" 等符号对齐代码呢？使用tabular插件可以轻松解决。
- tabular英语单词，主要用作动词，意思是:列成表格的

## 安装
- 使用Plug管理插件的话，.vimrc中加入如下代码:
```
Plug 'godlygeek/tabular'
```
- 使用其它管理工具的安装方法类似，这里就不介绍了。
- 不了解Plug管理插件的同学可以先了解一下相关方面的知识。

## 使用方法
### 例如按=号对齐代码
- visual模式选中要对齐的行
- 进入底行模式输入Tabularize/=
- 单词太长记不住怎么办？按Tab键会有提示的。
```
:Tabularize/=
```

- 执行前
```lua
local a = 1
local hello = "hello"
```lua
- 执行后
```
local a     = 1
local hello = "hello"
```


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/vim-plug-tabular/  

