# clangd如何使用？


<!--more-->
# ubuntu20.04安装最新版本的clangd
## 官方文档
- https://clangd.llvm.org/

## 添加LLVM官方存储库
```
wget -O - https://apt.llvm.org/llvm-snapshot.gpg.key | sudo apt-key add -
sudo add-apt-repository "deb http://apt.llvm.org/focal/ llvm-toolchain-focal main"
```

## 更新软件包列表
```
sudo apt update
```

## 安装clangd
```bash
root@VM-8-10-ubuntu:~# sudo apt install clangd
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following packages were automatically installed and are no longer required:
golang-1.13 golang-1.13-doc golang-1.13-go golang-1.13-race-detector-runtime golang-1.13-src golang-doc golang-go golang-race-detector-runtime golang-src libsass1
Use 'sudo apt autoremove' to remove them.
The following additional packages will be installed:
clangd-17 lib32gcc-s1 lib32stdc++6 libc6-i386 libclang-common-17-dev libclang-cpp17 libclang-rt-17-dev libllvm17
The following NEW packages will be installed:
clangd clangd-17 lib32gcc-s1 lib32stdc++6 libc6-i386 libclang-common-17-dev libclang-cpp17 libclang-rt-17-dev libllvm17
0 upgraded, 9 newly installed, 0 to remove and 77 not upgraded.
Need to get 48.3 MB of archives.
```

## 查看clangd版本
```
clangd --version
Ubuntu clangd version 17.0.0 (++20230711053010+0b66b3417c02-1~exp1~20230711173124.695)
Features: linux
Platform: x86_64-pc-linux-gnu
```

## vim如何配置使用clangd
- 将<version>替换为您机器上的LLVM版本号，<path_to_clang_resource_dir>替换为您机器上的clang资源目录路径
```
Plug 'vim-scripts/clang_complete'
Plug 'rhysd/vim-clang-format'

let g:clang_library_path = '/usr/lib/llvm-<version>/lib'
let g:clang_user_options = '-resource-dir=<path_to_clang_resource_dir>'
let g:clang_periodic_quickfix = 0
let g:clang_complete_auto = 1
let g:clang_complete_copen = 1
let g:clang_wp_auto_open = 1
```

- 如何查看resource_dir
```
root@VM-8-10-ubuntu:/opt/proj/7505/skynet/service-src# clang --print-resource-dir
/usr/lib/llvm-17/lib/clang/17
```

## vim-scripts/clang_complete插件如何使用？
vim-scripts/clang_complete插件为Vim提供了自动补全功能，并支持使用clang作为后端。
- <Ctrl-X><Ctrl-U> - 手动触发自动补全：在编辑C++代码时，按下Ctrl+X，然后再按下Ctrl+U即可触发自动补全功能。此时，插件将使用clang作为后端查找可能的补全项。
- <Tab> - 选择补全项：在自动补全列表中，使用Tab键选择所需的补全项。可以在多个候选项之间切换。
- <Ctrl-N> / <Ctrl-P> - 上下选择补全项：在自动补全列表中，按下Ctrl+N向下选择下一个补全项，按下Ctrl+P向上选择上一个补全项。
- <Enter> - 确定补全项：在自动补全列表中，按下Enter键即可确认当前选择的补全项并插入到代码中。
- <Ctrl-X><Ctrl-O> - 强制触发智能提示：在输入代码时，可以按下Ctrl+X，然后再按下Ctrl+O以强制触发智能提示功能。

## clang与clangd有什么区别？

## 如何安装clang
```
sudo apt install build-essential
```

## 添加存储库
```
wget -O - https://apt.llvm.org/llvm-snapshot.gpg.key | sudo apt-key add -
sudo apt-add-repository "deb http://apt.llvm.org/focal/ llvm-toolchain-focal main"
sudo apt update
sudo apt install clang
clang --version
```

## clangd vim插件vim-lsp
```
Plug 'prabirshrestha/vim-lsp'
" 启用 vim-lsp
" 如果您使用的是 Windows，请将 lsp 路径更新为正确的可执行文件路径
if executable('clangd')
  au User lsp_setup call lsp#register_server({
        \ 'name': 'clangd',
        \ 'cmd': {server_info->['clangd', '--background-index']},
        \ 'whitelist': ['c', 'cpp'],
        \ })
endif

"设置 LSP 自动完成
autocmd FileType c,cpp,python,nvim,lua call lsp#auto()

" 启用 LSP 具体支持的文件类型
autocmd FileType c setlocal omnifunc=lsp#complete
autocmd FileType cpp setlocal omnifunc=lsp#complete
autocmd FileType python setlocal omnifunc=lsp#complete
autocmd FileType nvim setlocal omnifunc=lsp#complete
autocmd FileType lua setlocal omnifunc=lsp#complete
```

## nvim-clangd
- https://www.cnblogs.com/yann-qu/p/17639175.html

## 如何配置.clangd?
- 参考：https://zhuanlan.zhihu.com/p/520720943

```bash
# .clangd
CompileFlags:
  Add:
    - "-isystem"
    - "./test_include/"
```

## nvim插件lspconfig配置clangd
- 配置c/c++项目生产compile_commands.json文件
```bash
cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1
```
- 文件格式DCMAKE_EXPORT_COMPILE_COMMANDS
```json
[
    {
        "arguments": [
            "g++",
            "-c",
            "-std=c++17",
            "-DHAVE_CONFIG_H",
            "-DDEFAULT_CONFIG_FILE=\"/usr/local/squid/etc/squid.conf\"",
            "-DDEFAULT_SQUID_DATA_DIR=\"/usr/local/squid/share\"",
            "-DDEFAULT_SQUID_CONFIG_DIR=\"/usr/local/squid/etc\"",
            "-I../..",
            "-I../../include",
            "-I../../lib",
            "-I../../src",
            "-I../../include",
            "-I/usr/include/libxml2",
            "-Wall",
            "-Wextra",
            "-Wimplicit-fallthrough=5",
            "-Wpointer-arith",
            "-Wwrite-strings",
            "-Wcomments",
            "-Wshadow",
            "-Wmissing-declarations",
            "-Woverloaded-virtual",
            "-Werror",
            "-pipe",
            "-D_REENTRANT",
            "-g",
            "-O2",
            "-march=native",
            "-o",
            "AccessRule.o",
            "AccessRule.cc"
        ],
        "directory": "/opt/proj/squid/squid-SQUID_6_6/src/adaptation",
        "file": "AccessRule.cc"
    }
]
```

- 查看lsp日志
```bash
tail ~/.local/state/nvim/lsp.log
```

- 我这里nvim用到的clangd的路径为
```bash
/root/.local/share/nvim/mason/bin/clangd
```

- 查看版本号
```bash
root@VM-8-10-ubuntu:/# /root/.local/share/nvim/mason/bin/clangd --version
clangd version 17.0.3 (https://github.com/llvm/llvm-project 888437e1b60011b8a375dd30928ec925b448da57)
Features: linux+grpc
Platform: x86_64-unknown-linux-gnu
```

## 常见问题
- 最近在一台电脑上安装的nvim代码诊断报错,还没定位原因，大概是配置原因clangd找不到头文件的位置,这里先记录一下。


---

> 作者:   
> URL: http://111.230.8.71:8889/clangd/  

