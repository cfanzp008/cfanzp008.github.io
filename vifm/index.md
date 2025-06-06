# 适合vim用户的一款终端文件管理器：Vifm


<!--more-->
# 适合vim用户的一款终端文件管理器：Vifm
## 介绍
之前自己一直用的终端文件管理工具是ranger,今天偶然发现了另外一款终端文件管理工具非常使用vim用户，使用c语言开发，而ranger是使用python开发，ranger有时候会遇到安装不成功的情况。还没有深入体验，暂时不做过多介绍，这里先记录一下。

## ubuntu20.04安装方法
```
apt install vifm
#mac
brew install vifm
```

## 下载地址
- https://vifm.info/downloads.shtml

## 用法及快捷键绑定
- https://vifm.info/cheatsheets.shtml


## 参考
- https://linux.cn/article-14001-1.html

## FAQ
mac打开文件报错

```
mkdir .vifm
cd .vifm
touch vifmrc
nvim vifmrc
filetype *.vim,*.vimrc,*.gvimrc !nvim %
```


---

> 作者:   
> URL: http://111.230.8.71:8889/vifm/  

