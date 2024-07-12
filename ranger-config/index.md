# ranger如何配置预览图片？


# ranger如何配置预览图片？
ranger的配置文件在目录~/.config/ranger/rc.conf中，配置预览只需要在配置文件中加入2项配置即可:
```config
set preview_images true
set preview_images_method w3m
```

## ranger替代品
### fff
对ubuntu不是很友好，不能直接安装，需要源码安装
- 安装
```
KISS Linux (based): kiss b fff
FreeBSD: pkg install fff
Haiku: pkgman install fff
macOS: brew install fff
Nix: nix-env -iA fff
Void Linux: xbps-install -S fff
Arch Linux: pacman -S fff
```
- github: https://github.com/dylanaraps/fff
- vim/neovim中使用fff: https://github.com/dylanaraps/fff
### nnn
### lf
使用go语言编写，跨平台，非常友好。
- 下载地址：https://github.com/gokcehan/lf/releases



## 更多
- 其它ranger的使用技巧可以参考这篇文件: https://zhuanlan.zhihu.com/p/476289339


---

> 作者:   
> URL: https://cfanzp.com/ranger-config/  

