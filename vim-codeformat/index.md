# Vim使用clang-format等工具格式化c++代码


<!--more-->
# vim使用等号格式化代码
在Vim中，你可以使用equalprg选项来设置格式化C++代码时使用的外部程序。以下是一些常用的外部程序，可用于对齐和格式化C++代码：
### clang-format

![img](/images/blog/devtools/clang-format.png)

- 安装
```
apt install clang-format
```
- 配置:配置文件可以房子项目目录或者,家目录
```
# 支持LLVM, GNU, Google, Chromium, Microsoft, Mozilla, WebKit
clang-format -style=google -dump-config > .clang-format
```
- 配置说明文档:[url](https://clang.llvm.org/docs/ClangFormatStyleOptions.html)
- clang-format: Clang格式化工具，可以自动对齐和格式化C++代码。你需要先安装Clang，并确保clang-format命令可用。在Vim配置文件（如.vimrc）中添加以下行来设置equalprg选项：
```
set equalprg=clang-format
```

- vimrc配置使用等号格式化
```
set equalprg=clang-format\ -style=file\ --fallback-style=google
```

### astyle
- astyle: 一个流行的源码格式化工具，支持多种编程语言，包括C++。你需要先安装AStyle，并确保astyle命令可用。在Vim配置文件中添加以下行来设置equalprg选项：

```
set equalprg=astyle\ --style=gnu\ --indent=spaces=4
```
上述示例中的选项--style=gnu表示使用GNU风格的缩进和格式化规则，而--indent=spaces=4表示使用4个空格进行缩进。

### uncrustify
- uncrustify: 另一个流行的源码格式化工具，支持C++等多种语言。你需要先安装Uncrustify，并确保uncrustify命令可用。在Vim配置文件中添加以下行来设置equalprg选项：
```
set equalprg=uncrustify\ -c\ /path/to/uncrustify.cfg
```
上述示例中的-c选项后面是一个指向Uncrustify配置文件的路径，你需要将其替换为实际的配置文件路径。


---

> 作者:   
> URL: http://111.230.8.71:8889/vim-codeformat/  

