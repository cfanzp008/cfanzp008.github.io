# mdbook-比gitbook更高效且简洁的markdown工具mdbook


# 比gitbook更高效且简洁的markdown工具mdbook
## mdbook简介
- mdbook是一个用rust语言编写的md文档转换为html文档的工具。
- mdbook与gitbook功能十分相似。
- 使用后直观感觉是mdbook速度比gitbook快不少。
- mdbook与gitbook相比功能要少很多，但是速度快就是最大的优势。
- mdbook只有一个可执行文件。相比gitbook不用安装一大堆的依赖库。

## github地址
- https://github.com/rust-lang/mdBook

## mdbook安装
### 安装方法1
- 先安装rust
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

```
cargo install mdbook
```

- 显示如下提示说明安装成功了
```
Compiling hyper v0.14.20
Compiling warp v0.3.2
Compiling ammonia v3.2.0
Compiling mdbook v0.4.20
Finished release [optimized] target(s) in 12m 24s
    Installing /Users/zp/.cargo/bin/mdbook
Installed package `mdbook v0.4.20` (executable `mdbook`)
```

### 安装方法2
- 直接下载二进制:https://github.com/rust-lang/mdBook/releases
```
wget https://github.com/rust-lang/mdBook/releases/download/v0.4.20/mdbook-v0.4.20-x86_64-unknown-linux-gnu.tar.gz
```

## 使用
### 初始化一本书或一个笔记项目
```
mdbook init
```

- 初始化后会在当前目录生成src文件夹

### 启动mdbook 监听8000端口
```
mdbook serve  --port 8000
```

### 后台启动mdbook
```
mdbook serve  --port 8000 &
```

## mdbook-pdf
### install
1. 方法1
```bash
cargo install mdbook-pdf
```

2. 方法2下载可执行文件
- https://github.com/HollowMan6/mdbook-pdf/releases

## 参考
- 文档: https://rust-lang.github.io/mdBook/
- 文档2: https://www.wenjiangs.com/doc/5ljx1ugy
- 文档3: https://llever.com/mdBook-zh/README.zh.html
- 中文手册: https://hellowac.github.io/mdbook_doc/index.html
- https://juejin.cn/post/7201787862236823608
- https://github.com/HollowMan6/mdbook-pdf/blob/main/README_CN.md


---

> 作者: cfanzp  
> URL: https://cfanzp.com/devtools-mdbook/  

