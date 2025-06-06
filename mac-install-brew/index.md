# Mac安装Brew


<!--more-->
# mac 安装brew
最近上手一款mac M1在安装brew的时候遇到了问题，发现安装下载失败，原因是最常见的源的原因，于是找到了一个镜像安装方法，非常方便的安装上去了。
```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

### M1 brew安装报错解决方案
- 报错信息：
```
Mac M1 Brew install 报错Command failed with exit 128:git
```

- 解决方案
```
git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-cask
git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-core
```

## 参考
- https://www.jianshu.com/p/22122a1d4474
- https://blog.csdn.net/qq_25404477/article/details/126102189


---

> 作者:   
> URL: http://111.230.8.71:8889/mac-install-brew/  

