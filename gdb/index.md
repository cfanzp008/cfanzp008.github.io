# gdb


<!--more-->
# gdb
```bash
root@ecs-test:/data/linux_dev_blog# gdb --help
This is the GNU debugger.  Usage:
    gdb [options] [executable-file [core-file or process-id]]
    gdb [options] --args executable-file [inferior-arguments ...]
Selection of debuggee and its files:

  --args             Arguments after executable-file are passed to inferior
  --core=COREFILE    Analyze the core dump COREFILE.
  --exec=EXECFILE    Use EXECFILE as the executable.
  --pid=PID          Attach to running process PID.
  --directory=DIR    Search for source files in DIR.
  --se=FILE          Use FILE as symbol file and executable file.
  --symbols=SYMFILE  Read symbols from SYMFILE.
  --readnow          Fully read symbol files on first access.
  --readnever        Do not read symbol files.
  --write            Set writing into executable and core files.
Initial commands and command files:

  --command=FILE, -x Execute GDB commands from FILE.
  --init-command=FILE, -ix
                     Like -x but execute commands before loading inferior.
  --eval-command=COMMAND, -ex
                     Execute a single GDB command.
                     May be used multiple times and in conjunction
                     with --command.
  --init-eval-command=COMMAND, -iex
                     Like -ex but before loading inferior.
  --nh               Do not read ~/.gdbinit.
  --nx               Do not read any .gdbinit files in any directory.

Output and user interface control:

  --fullname         Output information used by emacs-GDB interface.
  --interpreter=INTERP
                     Select a specific interpreter / user interface
  --tty=TTY          Use TTY for input/output by the program being debugged.
  -w                 Use the GUI interface.
  --nw               Do not use the GUI interface.
  --tui              Use a terminal user interface. 
  --dbx              DBX compatibility mode.
  -q, --quiet, --silent
                     Do not print version number on startup.

Operating modes:

  --batch            Exit after processing options. 
  --batch-silent     Like --batch, but suppress all gdb stdout output.
  --return-child-result
                     GDB exit code will be the child's exit code.
  --configuration    Print details about GDB configuration and then exit.
  --help             Print this message and then exit.
```

## 添加调试信息-g
## 基本操作
```
命令名称	命令缩写	命令说明
run	r	运行一个待调试的程序
continue	c	让暂停的程序继续运行
next	n	运行到下一行
step	s	单步执行，遇到函数会进入
until	u	运行到指定行停下来
finish	fi	结束当前调用函数，回到上一层调用函数处
return	return	结束当前调用函数并返回指定值，到上一层函数调用处
jump	j	将当前程序执行流跳转到指定行或地址
print	p	打印变量或寄存器值
backtrace	bt	查看当前线程的调用堆栈
frame	f	切换到当前调用线程的指定堆栈
thread	thread	切换到指定线程
break	b	添加断点
tbreak	tb	添加临时断点
delete	d	删除断点
enable	enable	启用某个断点
disable	disable	禁用某个断点
watch	watch	监视某一个变量或内存地址的值是否发生变化
list	l	显示源码
info	i	查看断点 / 线程等信息
ptype	ptype	查看变量类型
disassemble	dis	查看汇编代码
set args	set args	设置程序启动命令行参数
show args	show args	查看设置的命令行参数
```

### 启用gui界面
```bash
tui enable
```

### 设置断点
- 在gdb启动程序后可以使用b + 文件绝对路径+文件名:行号来设置断点
```bash
b /data/code/test.cpp:66
```
- 在函数上打断点
```bash
b main
```
### 调试流程
```bash
# 编译程序添加-g参数，添加调试信息
gcc -g main.c -o main

# 启动gdb
gdb ./main

# 设置启动参数
set args -R

# 运行
run/r

# 启用gui
gui enable

# 设置断点
break/b main
break/b main.c:25

# 下一行
next/n

# 进入函数
step/s

# 运行到下一个断点
continue/c

# 跳出循环
util/u

# 运行到56行停下来
util/u 56

# 执行完当前函数
finish/fi
```

### 打印变量
- 打印变量a的值
```bash
p a
```

- 取消打印的字符串长度限制
```bash
set print elements 0
```

## gdb调试core文件
```bash
gcc -c /tmp/core.server ./server
```

## 调试.so文件

## 多线程调试

## 更多gdb调试技巧
- https://www.yanbinghu.com/2019/04/20/41283.html
- [gdb调试1000招](https://zhuanlan.zhihu.com/p/563678056)
- 参考：https://zhuanlan.zhihu.com/p/162164942


---

> 作者:   
> URL: https://cfanzp.com/gdb/  

