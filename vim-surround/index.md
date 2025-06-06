# vim-surround插件用法


# vim-surround插件用法
## vim-surround插件有什么用？
vim-surround插件能够帮助我们方便地处理代码中成对的符号，包括:
- 成对增加符号
- 成对修改符号
- 成对删除符号

## 使用plug插件管理器安装方法
- 在.vimrc中加入如下配置:
```vimrc
Plug 'tpope/vim-surround'
```

## 如何使用vim-surround?
### 普通模式使用vim-surround-添加成对符号
普通模式在单词2边加上双引号:
```cmd
ysiw"
```

普通模式在整行加上双引号:
```cmd
yss"
```

### 普通模式使用vim-surround-修改成对符号
普通模式在单词2边加上双引号改为单引号:
```cmd
cs"'
```

### 普通模式使用vim-surround-删除成对符号
普通模式删除单词2边双引号:
```cmd
ds"
```

## 参考链接
- https://github.com/tpope/vim-surround
- https://zhuanlan.zhihu.com/p/158604935/

## 总结
- 上面列举的是个人觉得比较实用的几种用法，更多用法可以参考一下上面的参考链接。


---

> 作者:   
> URL: http://111.230.8.71:8889/vim-surround/  

