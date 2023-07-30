# lua-luacheck


# luacheck
luacheck 是一个lua代码的静态检查工具，可以用来发现lua代码中的一些缺陷，规范lua代码的书写。lua是一们解释型语言，很多错误只有在运行时才会暴露出来。借助静态检查工具能够方便我们在前期就发现一些低级错误并及时修正。

## 安装
### ubuntu
```bash
sudo apt install lua-check
```

### centos
```bash
yum install luarocks
```

这里使用luarocks来安装luacheck,安装过程中可能遇到报错的问题。
- 安装报错信息:
```bash
root@mybonline1 mybonline]# luarocks install luacheck
Installing https://luarocks.org/luacheck-0.25.0-1.src.rock...
Using https://luarocks.org/luacheck-0.25.0-1.src.rock... switching to 'build' mode

Missing dependencies for luacheck:
luafilesystem >= 1.6.3
argparse >= 0.6.0

Using https://luarocks.org/luafilesystem-1.8.0-1.src.rock... switching to 'build' mode
gcc -O2 -fPIC -I/usr/include -c src/lfs.c -o src/lfs.o
src/lfs.c:84:10: fatal error: lua.h: No such file or directory
   84 | #include <lua.h>
         |          ^~~~~~~
         compilation terminated.

         Error: Failed installing dependency: https://luarocks.org/luafilesystem-1.8.0-1.src.rock - Build error: Failed compiling object src/lfs.o
```

- centos 安装luarocks
```bash
-$ wget https://luarocks.org/releases/luarocks-3.8.0.tar.gz
-$ tar zxpf luarocks-3.8.0.tar.gz
-$ cd luarocks-3.8.0
./configure --with-lua-include=/usr/local/include
make
make install
/usr/local/bin/luarocks install luacheck
```
2. 使用luarocks 安装
```bash
sudo apt install luarocks
luarocks install luacheck
```

## github安装帮助
- https://github.com/luarocks/luarocks/wiki/Installation-instructions-for-Unix

## 配置文件
- .luacheckrc

## 配置参数
```
ignore = {
    "631",  -- max_line_length
        "212/_.*",  -- unused argument, for vars with "_" prefix
}
```

## 使用
1. 忽略注释长度超过限制
```bash
luacheck --no-max-comment-line-length inject_test.lua
```

2. 查看错误代码codes
```bash
luacheck --codes inject_test.lua
```

## vim中配置luacheck
```
"no-unused-args 忽略不使用的参数
"no-redefined 忽略重定义
"no-max-line-length 忽略每行最长的检测
"ignore 542 551 忽略if条件的body为空(如...elseif ret == nil then end，then和end中间没有语句)；忽略空语句(如;)，如果用了;则成对出现该语法检测warning
"有语法错误的一行左侧栏会有S&gt;标识，光标移动到改行，vim下发会给出提示。修改正确后保存，则该'S&gt;'会消失。
"let g:syntastic_lua_checkers = ["luac", "luacheck"]
let g:syntastic_lua_checkers = ["/use/bin/luac5.4.3", "luacheck"]
"let g:syntastic_lua_luacheck_args =
"--codes --no-max-comment-line-length --ignore 542 551"
let g:syntastic_lua_luacheck_args = "--codes"
```



---

> 作者: cfanzp  
> URL: https://cfanzp.com/lua-luacheck/  

