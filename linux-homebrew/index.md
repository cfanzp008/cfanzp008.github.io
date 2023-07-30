# Linux如何安装Homebrew?


<!--more-->
# Linux如何安装Homebrew?
## Ubuntu,Debian中安装Homebrew
### 安装基础依赖
```
sudo apt-get install build-essential procps curl file git
```
### 下载安装脚本
```
proxychains4 wget https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh
```
### 配置一下Homebrew仓库的镜像
```
vim ~/.bashrc
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
```

### 执行安装脚本
```
cfanzp@cfanzplinux:~$ ./install.sh 
==> Found cURL: /usr/local/bin/curl
==> Setting HOMEBREW_DEVELOPER to use Git/cURL not in /usr/bin
==> Checking for `sudo` access (which may request your password)...
==> This script will install:
/home/linuxbrew/.linuxbrew/bin/brew
/home/linuxbrew/.linuxbrew/share/doc/homebrew
/home/linuxbrew/.linuxbrew/share/man/man1/brew.1
/home/linuxbrew/.linuxbrew/share/zsh/site-functions/_brew
/home/linuxbrew/.linuxbrew/etc/bash_completion.d/brew
/home/linuxbrew/.linuxbrew/Homebrew
==> The following new directories will be created:
/home/linuxbrew/.linuxbrew/bin
/home/linuxbrew/.linuxbrew/etc
/home/linuxbrew/.linuxbrew/include
/home/linuxbrew/.linuxbrew/lib
/home/linuxbrew/.linuxbrew/sbin
/home/linuxbrew/.linuxbrew/share
/home/linuxbrew/.linuxbrew/var
/home/linuxbrew/.linuxbrew/opt
/home/linuxbrew/.linuxbrew/share/zsh
/home/linuxbrew/.linuxbrew/share/zsh/site-functions
/home/linuxbrew/.linuxbrew/var/homebrew
/home/linuxbrew/.linuxbrew/var/homebrew/linked
/home/linuxbrew/.linuxbrew/Cellar
/home/linuxbrew/.linuxbrew/Caskroom
/home/linuxbrew/.linuxbrew/Frameworks
```

### 安装过程中遇到某些资源需要设置代理下载
```
alias proxy='export all_proxy=socks5://192.168.2.128:1088;export http_proxy=socks5://192.168.2.128:1088;export https_proxy=socks5://192.168.2.128:1088;export no_proxy=socks5://192.168.2.128:1088; export ALL_PROXY=socks5://192.168.2.128:1088;export HTTP_PROXY=socks5://192.168.2.128:1088;export HTTPS_PROXY=socks5://192.168.2.128:1088;export NO_PROXY=socks5://192.168.2.128:1088'
alias unproxy='unset all_proxy; unset http_proxy; unset https_proxy;unset no_proxy; unset ALL_PROXY; unset HTTP_PROXY; unset HTTPS_PROXY;unset NO_PROXY'
```
- 相关资源
```
Downloading https://ghcr.io/v2/homebrew/portable-ruby/portable-ruby/blobs/sha256:fc45ee6eddf4c7a17f4373dde7b1bc8a58255ea61e6847d3bf895225b28d072a
```

### 安装完后设置brew的环境变量
```
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> $HOME/.bash_profile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

### 使用brew 安装nvim
```
brew install  nvim
```

## 参考文档
- https://linux.cn/article-14065-1.html
- https://docs.brew.sh/Homebrew-on-Linux
- https://blog.csdn.net/qq_41437512/article/details/128172332

## 扩展
- LunarVim: lunarvim.org/docs/keybind-overview
- LunarVim Github: https://github.com/LunarVim/LunarVim



---

> 作者:   
> URL: https://cfanzp.com/linux-homebrew/  

