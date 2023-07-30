# ubuntu中为nvim安装coc插件支持c++


<!--more-->
# ubuntu中为nvim安装coc插件支持c++
vim中安装coc插件添加languageserver进而实现补全，是目前vim比较好的一种实现方式。

## 安装
### 1. nodejs安装
- nodejs安装可以参考这篇文章: https://blog.csdn.net/qq_37955704/article/details/113395046

安装coc先需要安装nodejs，这里使用直接下载二进制安装的方式
1. 进入nodejs官网获取最新二进制的链接
  - 官网地址: https://nodejs.org/zh-cn/download

2. 下载二进制文件并解压
```bash
wget https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz
```

3. 解压并创建软链接
```bash
root@ecs-168736:/# mkdir -p /usr/local/nodejs
root@ecs-168736:/# mv node-v18.16.0-linux-x64
node-v18.16.0-linux-x64/        node-v18.16.0-linux-x64.tar.xz  
root@ecs-168736:/data/server/tools# mv node-v18.16.0-linux-x64/* /usr/local/nodejs/

ln -s /usr/local/nodejs/bin/node /usr/local/bin
ln -s /usr/local/nodejs/bin/npm /usr/local/bin
```

4. 配置nodejs
```bash
npm config set registry https://registry.npm.taobao.org
npm config list
```

```bash
; "user" config from /root/.npmrc

registry = "https://registry.npm.taobao.org/" 

; node bin location = /usr/local/nodejs/bin/node
; node version = v18.16.0
; npm local prefix = /data/server/tools
; npm version = 9.5.1
; cwd = /data/server/tools
; HOME = /root
; Run `npm config ls -l` to show all defaults.
```
5. 验证安装结果
```
# node -v
v18.16.0
# npm -v
9.5.1
```

### 2. coc安装
- 这里vim管理插件用的vim-plug,修改vim的配置文件，添加coc插件
```vim
# vim ~/.config/nvim/init.vim
Plug 'neoclide/coc.nvim', {'branch': 'release'}
```
- 安装
```
:source %
:PluginInstall
```
这一步如果慢的话，建议手动安装
```bash
cd ~/.config/nvim/plugged
git clone https://git::@github.com/neoclide/coc.nvim.git
```

#### coc添加后端c++支持
- 可以参考这篇文章: https://www.cnblogs.com/cniwoq/p/13272746.html
#### coc安装coc-clangd
```
:CocInstall coc-clangd
```
- 提示下面的错误，按提示执行即可
```
[coc.nvim] clangd was not found on your PATH. :CocCommand clangd.install will install 16.0.2.
```

##### 安装clangd16.0.2
安装过程正常，但是运行报错,提示无法连接服务器等，后来发现了原因是下载的clangd不完整，真是无语... 手动下载后解决问题
- 报错信息
```
UnhandledRejection: write EPIPE
#或
[coc.nvim] clangd client: couldn't create connection to server
```
```
:CocCommand clangd.install
```

- 手动下载地址: https://github.com/clangd/clangd/releases/tag/16.0.2
```bash
wget https://github.com/clangd/clangd/releases/download/16.0.2/clangd-linux-16.0.2.zip
```
- 文件保存路径
```
~/.config/coc/extensions/coc-clangd-data/install/16.0.2/clangd_16.0.2/bin
```



- 相关文档看这里: https://github.com/neoclide/coc.nvim/wiki/Language-servers#ccobjective-c
```json
"languageserver": {
  "clangd": {
    "command": "clangd",
    "rootPatterns": ["compile_flags.txt", "compile_commands.json"],
    "filetypes": ["c", "cc", "cpp", "c++", "objc", "objcpp"]
  }
}
```

##### 解决vim 中clangd-tidy找不到cmake项目中头文件的方法
- 让cmake能够生成compile_commonads.json文件:
```bash
cd build
cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1 ../
```

- 或者给cmake配置别名,简单粗暴
```
# vim .bashrc
alias cmake='cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1'
```
##### vim关联多个tags文件
- https://blog.huati365.com/2eb30e87f6e67dbe


---

> 作者:   
> URL: https://cfanzp.com/nvim-coc/  

