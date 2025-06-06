# mac-如何让terminal中能够看到不同的颜色?


# mac-如何让terminal中能够看到不同的颜色?
## 为什么要配置终端配色?
- 终端对不通类型的文件进行配色能够方便我们通过颜色区分文件夹，脚本文件，图片文件等，大大提高了寻找文件的效率。
## 如何配置？
- 使用vim打开文件~/.bash_profile,在最后加入如下代码:
```
alias ll='ls -la'  # 命令别名
#export LS_OPTIONS='--color=auto'           # 如果没有指定，则自动选择颜色
export CLICOLOR='Yes'                       # 是否输出颜色
export LSCOLORS='ExGxFxdaCxDaDahbadacec'    # 指定颜色
export PS1="\[\033[01;31;01m\][\u@\h \W]\$\[\033[01;00;00m\] "   # 指定命令行提示符的颜色为红色
```
- 加完后不会立即生效，立即生效请执行:
```
source ~/.bash_profile
```

## 参考
- https://www.cnblogs.com/FengZeng666/p/16026268.html


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/mac-terminal-color/  

