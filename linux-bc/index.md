# linux-计算器命令bc


# linux-计算器命令bc
## 基本用法
- 查看版本
```bash
$ bc -v 
bc 1.07.1
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006, 2008, 2012-2017 Free Software Foundation, Inc.
```

- 查看帮助
```bash
$ bc -h
usage: bc [options] [file ...]
-h  --help         print this usage and exit
-i  --interactive  force interactive mode
-l  --mathlib      use the predefined math routines
-q  --quiet        don't print initial banner
-s  --standard     non-standard bc constructs are errors
-w  --warn         warn about non-standard bc constructs
-v  --version      print version information and exit
```

## 支持的运算
- +:加
- -:减
- *:乘
- /:除
- ^:指数
- %:求余数
- sqrt:开方
- ibase:输入进制
- obase:输出进制
- ;要计算多个结果用分号分隔
- scale:小数部分位数

## 1. 使用 echo 命令来传递运算式或命令
- 3除以2保留3位小数:echo 'scale=3; 3/2' | bc
```bash
[root@dev127 myb]# echo 'scale=3; 3/2'
scale=3; 3/2
[root@dev127 myb]# echo 'scale=3; 3/2' | bc
1.500
[root@dev127 myb]# 
```
## 2. 交换模式
- 输入bc进入交互模式
```bash
[root@dev127 myb]# bc
bc 1.06.95
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'. 
5/3
1
scale=5;5/3
1.66666
exit
0
^C

```

## 进制转换
- 10进制的3转换为2进制:echo "obase=2;3" |bc
```bash
[root@dev127 myb]# echo "obase=2;3" |bc
11
```

- 10进制的11转换为16进制:echo "obase=16;11" |bc
```bash
[root@dev127 myb]# echo "obase=16;11" |bc
B
```

- 2进制转16进制:echo "obase=16;ibase=2;11" |bc
```bash
[root@dev127 myb]# echo "obase=16;ibase=2;11" |bc
F
```

- 2进制转10进制:echo "obase=10;ibase=2;11" |bc
```bash
[root@dev127 myb]# echo "obase=10;ibase=2;11" |bc
3

[root@dev127 myb]# echo "obase=10;ibase=2;1111" |bc
15
```

- 计算平方根:100是10的平方
```bash
[root@dev127 myb]# echo "sqrt(100)" |bc
10
```

- 计算m的n次方:10的3次方,10的2次方,3的5次方:
```bash
[root@dev127 myb]# echo "10^3;10^2;3^5" |bc
1000
100
243
```
## 注意事项
- 注意：obase 要尽量放在 ibase 前面，因为 ibase 设置后，后面的数字都是以 ibase 的进制来换算的。

## 参考
- http://c.biancheng.net/view/2680.html



---

> 作者: cfanzp  
> URL: https://cfanzp.com/linux-bc/  

