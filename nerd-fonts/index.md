# Nerd Fonts


<!--more-->
# Nerd Fonts
## 字体
- install
```bash
git clone https://github.com/ryanoasis/nerd-fonts.git --depth 1
cd nerd-fonts
./install.sh
```

- 手动安装
```bash
#https://cn.linux-terminal.com/?p=4701
root@ubuntu:~/.config/nvim-lazy-config/font/my-nerd-fonts# cat install_font.sh 
#!/bin/bash
mkdir -p  ~/.local/share/fonts/
cp ./ConsolasNerdFont/*  ~/.local/share/fonts/
fc-cache -fv
```


## 参考
- https://blog.csdn.net/SmallTeddy/article/details/124850597


---

> 作者:   
> URL: http://111.230.8.71:8889/nerd-fonts/  

