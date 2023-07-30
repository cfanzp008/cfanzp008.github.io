# mac中安ctags取代原有ctags解决Vim报错问题


<!--more-->
# mac中安ctags取代原有ctags解决Vim报错问题
## 报错提示
```
Tagbar: Ctags doesn't seem to be Exuberant Ctags!
BSD ctags will NOT WORK. Please download Exuberant Ctags from ctags.sourceforge.net and install it in a directory in your $PATH or set g:tagbar_ctags_bin.
Executed command: "'/usr/bin/ctags' --version"
Command output:
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/ctags: illegal option -- -
usage: ctags [-BFadtuwvx] [-f tagsfile] file ...
Exit code: 1
Press ENTER or type command to continue

```

## brew install
```shell
brew install ctags
```

## 修改vim配置
```vim
let Tlist_Ctags_Cmd = '/opt/homebrew/bin/ctags'
"Tagbar
let g:tagbar_ctags_bin = '/opt/homebrew/bin/ctags'
```

## 下载ctags(M1编译安装报错）
mac m1安装包错这里不推荐这种方法了。喜欢折腾的同学可以深入研究一下。
- 访问下面的网站进行下载：https://ctags.sourceforge.net/
```
wget https://udomain.dl.sourceforge.net/project/ctags/ctags/5.8/ctags-5.8.tar.gz
```
- 安装报错提示
```shell
include/dirent.h:80:2: error: use of undeclared identifier 'unused'
```

## 参考
- https://blog.csdn.net/Auris/article/details/93969343



---

> 作者:   
> URL: https://cfanzp.com/mac-vim-ctags/  

