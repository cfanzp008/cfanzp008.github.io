# ctags基本用法


<!--more-->

# ctags基本用法
- 生成c++ tags 排除bin,build目录
```bash
ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --exclude=bin --exclude=build
```

- vim中跳转快捷键
```bash
ctrl +] 跳转到定义
ctrl +o 返回
```

- 排除某些目录
```bash
ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --exclude=bin --exclude=build --exclude=cache --exclude=static
```

- ctags 配置文件
```
# cat ~/.ctags.d/local.ctags
  --recurse=yes
  --exclude=.git
  --exclude=build/
  --exclude=.svn
  --exclude=vendor/*
  --exclude=node_modules/*
  --exclude=public/webpack/*
  --exclude=db/*
  --exclude=log/*
  --exclude=test/*
  --exclude=tests/*
  --exclude=\*.min.\*
  --exclude=\*.swp
  --exclude=\*.bak
  --exclude=\*.pyc
  --exclude=\*.class
  --exclude=\*.cache
```

## 如何安装
- 在 Ubuntu 上安装 Universal Ctags（UCTags）
```
sudo apt install gcc make autoconf pkg-config
git clone https://github.com/universal-ctags/ctags.git
cd ctags
./autogen.sh
./configure
make
sudo make install
```



---

> 作者:   
> URL: https://cfanzp.com/ctags/  

