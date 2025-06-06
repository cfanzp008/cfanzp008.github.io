# linux-xargs用法简介

# xargs命令
##  为啥必须要学会xargs命令？
- 主要原因是xargs的作用太大了，应用十分广泛，以下是平时工作中经常用到的一部分:
- 读取文件并重新格式化
- 配合wc统计文件行数
- 查找文件后批量删除文件
- 批量关闭进程
- 批量修改文件的权限
- 批量解压文件
- 其它用法可使用xargs --help深入学习
```
[root@dev127 myb]# xargs --help
Usage: xargs [OPTION]... COMMAND INITIAL-ARGS...
Run COMMAND with arguments INITIAL-ARGS and more arguments read from input.

Mandatory arguments to long options are mandatory for short options too.
Non-mandatory arguments are indicated by [square brackets]
-0, --null                   Items are separated by a null, not whitespace.使用
Disables quote and backslash processing
-a, --arg-file=FILE          Read arguments from FILE, not standard input
-d, --delimiter=CHARACTER    Input items are separated by CHARACTER, not by
blank space. Disables quote and backslash
processing
-E END                       If END occurs as a line of input, the rest of
the input is ignored.
-e [END], --eof[=END]        Equivalent to -E END if END is specified.
Otherwise, there is no end-of-file string
    --help                       Print a summary of the options to xargs.
-I R                         same as --replace=R (R must be specified)
    -i,--replace=[R]             Replace R in initial arguments with names
    read from standard input. If R is
    unspecified, assume {}
    -L,-l, --max-lines=MAX-LINES Use at most MAX-LINES nonblank input lines per
    command line
    -l                           Use at most one nonblank input line per
    command line
    -n, --max-args=MAX-ARGS      Use at most MAX-ARGS arguments per command
    line
    -P, --max-procs=MAX-PROCS    Run up to max-procs processes at a time
    -p, --interactive            Prompt before running commands
    --process-slot-var=VAR       Set environment variable VAR in child
    processes
    -r, --no-run-if-empty        If there are no arguments, run no command.使用
    If this option is not given, COMMAND will be
    run at least once.
    -s, --max-chars=MAX-CHARS    Limit commands to MAX-CHARS at most
    --show-limits                Show limits on command-line length.
    -t, --verbose                Print commands before executing them
    --version                    Print the version number
    -x, --exit                   Exit if the size (see -s) is exceeded

    Report bugs to <bug-findutils@gnu.org>.
```

## xargs的使用
### 读取文件并重新格式化
- 例如下面的命令把一个4行4个字母格式化为1行了:
```
$ cat c.txt
a
b
c
d
# zp @ zp-pc in ~/temp [21:02:54] 
$ cat c.txt |xargs
a b c d
```

- 格式化为每行2项:
```
$ cat c.txt |xargs -n2
a b
c d
```

- 指定分割符号-d:
```
$ echo "a;b;c;d" | xargs -d ";"
a b c d
```

### 统计文件行数
- 统计当前目录下所有文件的行数:
```
$ wc ./* -l
40 ./b.txt
4 ./c.txt
130 ./tmp.txt
174 total
```

- 等价于:
```
$ wc ./* -l
40 ./b.txt
4 ./c.txt
130 ./tmp.txt
174 total
```

- 查找a目录下的.txt结尾的文件并删除不询问
```
$ find ./a -name "*.txt" | xargs -i rm {}
```

### 查找并删除文件
- 查找a目录下的.log结尾的文件并询问是否删除:
```
[root@lzw lobby]# find ./a -name "*.log" | xargs -p -i rm {}
rm ./a/lobby.20220118.log ?...y
rm ./a/lobby.20220118-2.log ?...y
rm ./a/lobby.20220117-3.log ?...y
rm ./a/lobby.20220117-2.log ?...y
rm ./a/lobby.20220118-3.log ?...y
rm ./a/lobby.20220118-1.log ?...y
rm ./a/lobby.20220115.log ?...y
rm ./a/lobby.20220117-5.log ?...y
rm ./a/lobby.20220117-1.log ?...y
rm ./a/lobby.20220116.log ?...y
rm ./a/lobby.20220117.log ?...y
rm ./a/lobby.20220117-4.log ?...y
rm ./a/lobby.20220117-6.log ?...y
```

### 批量修改文件的权限
- 批量修改当前目录下的lua文件把权限为755的改为644:
```
find ./ -name "*.lua" -perm 755 | xargs chmod 644
```

### 批量关闭进程
- 批量杀掉包含关键字"chrome"的进程:
```
ps -ef | grep chrome | grep "grep" -v |xargs kill
或
ps -ef | grep chrome | ag "ag" -v |xargs kill
```
### 批量解压文件
```
$ls gate.20220117*.log.gz  | xargs -i tar -xzvf {}
data/log/server/gate/gate.20220117-1.log
data/log/server/gate/gate.20220117-2.log
data/log/server/gate/gate.20220117-3.log
data/log/server/gate/gate.20220117-4.log
data/log/server/gate/gate.20220117.log
```


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/linux-xargs/  

