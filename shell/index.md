# shell脚本基础


<!--more-->
# shell脚本基础
## shell基础用法
### 变量
```bash
# 不能数字开头，避免使用关键字（if,then,else,fi,for,while等）
# 习惯使用大写字母表示常量
# 避免使用空格,避免使用特殊符号
PATH_1="/usr/bin"
_a=3
a=4
var1=5

#使用变量
echo $a

# 删除变量
unset a
```

## shell调试
- 在运行bash脚本的时候想看看bash脚本运行的具体情况可以使用bash -x
```bash
bash -x test.sh
```



---

> 作者:   
> URL: https://cfanzp.com/shell/  

