# linux-du命令

# du命令

## du命令简介
- du命令是linux系统里的文件大小查看的命令。
- du命令的应用场景十分广泛：
- 需要查看单个目录里面多个文件总大小。
- 需要查看目录中每个文件的大小以及每个子文件夹中文件的大小。
- 查看日志文件的大小。
- 查看文件大小并排序，找出最大的或最小的文件。
- 其它需要统计文件大小的场景。
- ls,df也有类似的功能，但是du更侧重于文件大小，并且更灵活好用。是运维人员、服务端开发人员以及其他linux用户很好的工具。掌握du命令的用法十分有必要。

## du命令的使用
- 查看帮助
```
用法：du [选项]... [文件]...
　或：du [选项]... --files0-from=F
计算每个文件的磁盘用量，目录则取总用量。

必选参数对长短选项同时适用。
-0, --null            每行输出使用 NUL 空字符结尾而非使用换行符
-a, --all             输出所有文件的磁盘用量，不仅仅是目录
--apparent-size   显示表面用量，而并非是磁盘用量；虽然表面用量通常会
小一些，但有时它会因为稀疏文件间的“洞”、内部碎
片、非直接引用的块等原因显得更大一些。
-B, --block-size=大小  以指定大小为单位对块大小进行输出；例如，
'BM' 以 1,048,576 字节为单位输出大小；
详情请参见下方的“SIZE 格式”部分
-b, --bytes           等效于 '--apparent-size --block-size=1'
-c, --total           显示总计信息
-D, --dereference-args  只在符号链接显式在命令行列出时对其进行解引用
-d, --max-depth=N     仅当目录（或在 --all 选项启用时包括文件）层级不高于
命令行参数指定的 N 层时输出对应目录或文件的对应大小；
--max-depth=0 等效于 --summarize
--files0-from=F   统计由文件 F 给出的由 NUL 空字符结束的文件名列表
所对应各个文件的信息；如果 F 是 -，则从标准输入
    读取文件名列表
-H                    等效于 --dereference-args (-D)
    -h, --human-readable  以人类可读的格式输出大小（例如，1K 234M 2G）
    --inodes          列出 inode 使用信息而非块使用信息
    -k                    等效于 --block-size=1K
    -L, --dereference     解引用所有符号链接
    -l, --count-links     如果是硬连接，则重复计算其尺寸
    -m                    等效于 --block-size=1M
    -P, --no-dereference  不跟随任何符号链接（默认行为）
    -S, --separate-dirs   不包括子目录的占用量
    --si              类似 -h，但使用 1000 的倍数，而非 1024
    -s, --summarize       只分别计算命令列中每个参数所占的总用量
    -t, --threshold=大小  如果指定大小为正值，排除比该值更小的项，
    或者在值为负时排除更大的项
    --time            显示目录中或其子目录下所有文件的最后修改时间
    --time=关键字     显示指定关键字对应的时间而非最后修改时间：
    atime, access, use, ctime 或 status
    --time-style=格式   使用指定格式显示时间，格式可以为：
    full-iso, long-iso, iso 或 +FORMAT；
    FORMAT 字符串以与 'date' 工具类似的方式解读
    -X, --exclude-from=文件  排除所有与指定<文件>所提供模式匹配的文件
    --exclude=模式       排除所有与所给<模式>匹配的文件
    -x, --one-file-system    跳过位于不同文件系统上的目录
    --help      显示此帮助信息并退出
    --version     显示版本信息并退出

    所显示的数值是来自 --block-size、DU_BLOCK_SIZE、BLOCK_SIZE 
    及 BLOCKSIZE 环境变量中第一个可用的 SIZE 单位。
    否则，默认单位是 1024 字节(或是 512，若设定 POSIXLY_CORRECT 的话)。

    The SIZE argument is an integer and optional unit (example: 10K is 10*1024).
    Units are K,M,G,T,P,E,Z,Y (powers of 1024) or KB,MB,... (powers of 1000).

    GNU coreutils 在线帮助：<https://www.gnu.org/software/coreutils/>
    请向 <http://translationproject.org/team/zh_CN.html> 报告 du 的翻译错误
    完整文档请见：<https://www.gnu.org/software/coreutils/du>
    或者在本地使用：info '(coreutils) du invocation'
```

- du -h:查看当前目录各文件占用磁盘大小
```bash
$ du -h
8.0K    ./.git/refs/heads
8.0K    ./.git/refs/remotes/origin
12K     ./.git/refs/remotes
4.0K    ./.git/refs/tags
28K     ./.git/refs
4.0K    ./.git/branches
8.0K    ./.git/info
2.0M    ./.git/objects/pack
4.0K    ./.git/objects/info
2.0M    ./.git/objects
8.0K    ./.git/logs/refs/heads
8.0K    ./.git/logs/refs/remotes/origin
12K     ./.git/logs/refs/remotes
24K     ./.git/logs/refs
32K     ./.git/logs
52K     ./.git/hooks
2.1M    ./.git
2.5M    .

```

- du -s 查看文件夹总大小
```bash
$ du -s .git
2104    .git
```

- du -hd1 查看当前目录下各目录文件大小，层级深度为1
```bash
$ du -hd1 .git
28K     .git/refs
4.0K    .git/branches
8.0K    .git/info
2.0M    .git/objects
32K     .git/logs
52K     .git/hooks
2.1M    .git
```

- du -ah1 查看所有文件大小，深度为1.
```bash
$ du -ahd1
4.0K    ./arg.h
20K     ./config.h
2.1M    ./.git
4.0K    ./win.h
4.0K    ./Makefile
4.0K    ./config.mk
4.0K    ./README
56K     ./st.c
20K     ./config.def.h
4.0K    ./TODO
48K     ./x.c
52K     ./x.o
4.0K    ./LICENSE
12K     ./FAQ
52K     ./st.o
4.0K    ./st.1
4.0K    ./st.info
92K     ./st
4.0K    ./st.h
4.0K    ./LEGACY
2.5M    .
```

- 查看文件大小并按由大到小的顺序排序
```bash
$ du -ahd1 | sort -hr
2.5M    .
2.1M    ./.git
92K     ./st
56K     ./st.c
52K     ./x.o
52K     ./st.o
48K     ./x.c
20K     ./config.h
20K     ./config.def.h
12K     ./FAQ
4.0K    ./win.h
4.0K    ./TODO
4.0K    ./st.info
4.0K    ./st.h
4.0K    ./st.1
4.0K    ./README
4.0K    ./Makefile
4.0K    ./LICENSE
4.0K    ./LEGACY
4.0K    ./config.mk
4.0K    ./arg.h
```


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/linux-du/  

