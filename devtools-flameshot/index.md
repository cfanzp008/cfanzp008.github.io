# devtools-flameshot


# flameshot
## 简介
flameshot 是一款跨平台的截图工具。

## 配置文件路经
```
linux:
~/.config/flameshot/flameshot.ini 
windows: 
C:\Users\{YOURNAME}\AppData\Roaming\flameshot\flameshot.ini 
```

## github地址:
```
https://github.com/flameshot-org/flameshot
```
## 下载
```
https://github.com/flameshot-org/flameshot/releases/tag/v0.10.2
```

## 常见平台安装
- MacOS
```
brew install --cask flameshot
```

- Manjaro
```
pacman -S flameshot
```
- Ubuntu 16.04
```
wget https://github.com/flameshot-org/flameshot/releases/download/v11.0.rc1/Flameshot-11.0.rc1.x86_64.AppImage

```
- Ubuntu 18.04+
```
apt install flameshot
# https://github.com/flameshot-org/flameshot/releases
```
- Ubuntu 20.04+ 下载deb包安装
```
https://github.com/flameshot-org/flameshot/releases
wget http://github.com/flameshot-org/flameshot/releases/download/v11.0.0/flameshot-11.0.0-1.ubuntu-20.04.amd64.deb
sudo apt install ./flameshot-11.0.0-1.ubuntu-20.04.amd64.deb
```
Debian  10+
```
apt install flameshot
```

- windows 直接下载安装包,下载地址: 

```
https://github.com/flameshot-org/flameshot/releases/tag/v0.10.2
```
## 常用快捷键

```
按PrintScreen键 激活
Ctrl + c 拷贝到剪贴版 
Ctrl + s 保存到文件
Ctrl + z 撤销
```

## 贴图功能
今天同事跟我show了一把截图软件的贴图功能，用的是一款收费的软件，我平时不怎么用，但是感觉比较好用也用flameshot设置了一下，快捷键F3
- 使用PrintScreen截图
- 使用F3贴图,贴图在屏幕上是置顶的，所以在写代码或者对照功能的时候是非常有用的。

## 常见问题
- 运行时提示 linux下提示/usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.14' not found 解决办法
```
sudo pacman -Ss gcc
sudo pacman -S core/gcc
```


---

> 作者: cfanzp  
> URL: https://cfanzp.com/devtools-flameshot/  

