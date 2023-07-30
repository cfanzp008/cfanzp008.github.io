# rust语言基础

# rust语言基础
## rust语言的优点
- c/c++ 性能好，但是类型系统和内存都不太安全。
- java/c#, 有GC,内存安全有很多优秀的特性，但性能不行。
- Rust:安全，无需GC,易于维护

## rust的缺点
- 难学

## Rust特别擅长的领域
- 高性能Web Service
- WebAssemble
- 命令行工具
- 网络编程
- 嵌入式设备
- 系统编程

## Rust的用户和案例
- Google:新操作系统Fuschia,Rust:30%
- Amazon：基于Linux开发的直接可以在裸机、虚拟机上运行容器的操作系统
- System76：纯Rust开发了下一代安全操作系统Redox
- 蚂蚁金服:库操作系统Occlum
- 斯坦福和密歇根大学:嵌入式实时操作系统，应用于Google的加密产品。
- 微软:Rust重写Windows系统中的一些低级组件
- 微软:WinRT/Rust项目
- Dropbox、Yelp、LINE、npm、百度、华为、Deno等

## 注意
- Rust有很多独有的概念，他们和现在大多主流语言都不通。
- 学习Rust必须从基础概念一步一步学，否则会懵。

## 参考教材
- Rust权威指南(The rust programming language)


## Rust安装
```
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

/Users/zp/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

/Users/zp/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

/Users/zp/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

/Users/zp/.profile
/Users/zp/.bash_profile
/Users/zp/.bashrc
/Users/zp/.zshenv

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


default host triple: x86_64-apple-darwin
default toolchain: stable (default)
profile: default
modify PATH variable: yes

1) Proceed with installation (default)
    2) Customize installation
    3) Cancel installation
    >
```

- 选1，提示如下则安装成功
```
info: profile set to 'default'
info: default host triple is x86_64-apple-darwin
info: syncing channel updates for 'stable-x86_64-apple-darwin'
703.5 KiB / 703.5 KiB (100 %) 671.4 KiB/s in  1s ETA:  0s
info: latest update on 2022-06-30, rust version 1.62.0 (a8314ef7d 2022-06-27)
info: downloading component 'cargo'
4.7 MiB /   4.7 MiB (100 %)   2.8 MiB/s in  1s ETA:  0s
info: downloading component 'clippy'
info: downloading component 'rust-docs'
18.3 MiB /  18.3 MiB (100 %)   5.3 MiB/s in  4s ETA:  0s
info: downloading component 'rust-std'
24.6 MiB /  24.6 MiB (100 %)   4.0 MiB/s in  6s ETA:  0s
info: downloading component 'rustc'
52.6 MiB /  52.6 MiB (100 %)   1.5 MiB/s in 20s ETA:  0s
info: downloading component 'rustfmt'
2.4 MiB /   2.4 MiB (100 %)   1.4 MiB/s in  2s ETA:  0s
info: installing component 'cargo'
info: installing component 'clippy'
info: installing component 'rust-docs'
18.3 MiB /  18.3 MiB (100 %)   1.7 MiB/s in 21s ETA:  0s    
info: installing component 'rust-std'
24.6 MiB /  24.6 MiB (100 %)   8.9 MiB/s in  2s ETA:  0s
info: installing component 'rustc'
52.6 MiB /  52.6 MiB (100 %)  10.4 MiB/s in  5s ETA:  0s
info: installing component 'rustfmt'
info: default toolchain set to 'stable-x86_64-apple-darwin'

stable-x86_64-apple-darwin installed - rustc 1.62.0 (a8314ef7d 2022-06-27)


Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).

To configure your current shell, run:
source "$HOME/.cargo/env"
```

- 查看版本号
```
localhost:~ zp$ rustc --version
rustc 1.62.0 (a8314ef7d 2022-06-27)
```

- 卸载
```
rustup self uninstall
```

## 总结
- 今天简单了解了一下rust语言，学习了rust语言的优点和缺点。
- 学习了rust的下载安装和基本配置。
- rust是一门安全又高效的语言，这个足以秒杀现在的大部分语言了。
- 大厂都在用的语言，如果有时间还是有必要学习一下。


---

> 作者: cfanzp  
> URL: https://cfanzp.com/language-rust/  

