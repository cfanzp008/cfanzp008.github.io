# Mac M1中使用lldb调试c++


<!--more-->
# Mac M1中使用lldb调试c++
gdb命令的使用对于学习linux c/c++同学而言非常重要.最近准备在mac中使用gdb来调试c++程序时，发现m1不支持gdb取而代之的是lldb。于是收集了一下相关用法，记录了这个笔记。

## 使用-g参数
使用lldb之前,编译程序加`-g`参数,这样可以看到源码而不是汇编代码。

## 常用指令
### break/b
- break/b 设置断点，也就是程序暂停的地方。

### run/r
- run/r 启动目标程序，如果遇到断点则暂停。

### step/s
- step/s 进入到下一条指令的函数内部。

### backtrace/bt
- backtrace/bt 查看当前有效的函数

### frame/f
- frame/f 查看道歉栈的内容，可以通过`frame/f arg`进入特定的frame

### next/n
- next/n 进入到箭头指向行

### continue/c
- continue/c 继续运行直到遇到断点

## 参考
- https://zhuanlan.zhihu.com/p/106415182


---

> 作者:   
> URL: https://cfanzp.com/mac-m1-lldb/  

