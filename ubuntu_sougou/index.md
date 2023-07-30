# ubuntu如何安装sougou?


<!--more-->
## ubuntu如何安装sougou?
### 下载
下载直接去官网下载就可以了，下载地址:
- https://shurufa.sogou.com/linux

### 安装
```
sudo dpkg -i sogoupinyin_4.0.1.2800_x86_64.deb
```

### 命令行执行下面的命令(解决输入法无法输入中文的问题)
```
sudo apt install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
sudo apt install libgsettings-qt1
```

注意事项:
- Keyboard input method system选择 fcitx。重启系统。


---

> 作者:   
> URL: https://cfanzp.com/ubuntu_sougou/  

