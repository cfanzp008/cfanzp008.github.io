# 如何在vmware中安装Ubuntu22.04并安装i3wm


<!--more-->
## 如何在vmware中安装Ubuntu22.04并安装i3wm?
最近在家居家办公，公司电脑一直用的是linux系统，家里虚拟机里有个linux系统版本太低了，主要是和宿主机不能共享剪贴板，十分不方便，趁着这个机会把虚拟机里的系统升级一下。

### 下载地址:
- 网址:https://www.omgubuntu.co.uk/2022/01/ubuntu-22-04-release-features
- https://cn.ubuntu.com/download/desktop
- 资源地址1:https://releases.ubuntu.com/22.04/ubuntu-22.04.1-desktop-amd64.iso
- 资源地址2:https://releases.ubuntu.com/22.04/ubuntu-22.04-desktop-amd64.iso

### 安装i3
```
sudo apt-get install i3
```

### 安装xfreerdp2-x11
```
sudo apt-get install freerdp2-x11
```

### 安装vlc
```
sudo snap install vlc
```

### 安装sougou
```
https://cfanzp.com/ubuntu_sougou/
sudo dpkg -i sogoupinyin_4.0.1.2800_x86_64.deb
sudo apt install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
sudo apt install libgsettings-qt1
```
- 使用im-config配置输入法系统为fcitx
```
im-config
```

- 使用fcitx-configtools设置输入法
### 安装飞书
```
sudo dpkg -i Feishu-linux_x64-5.18.11.deb
```

- i3wm设置fcitx开机启动
```
vim ~/.config/i3/confg
exec --no-startup-id fcitx
```

#### 解决i3wm中无法与宿主机共享剪贴板的问题：
- 参考链接:https://www.jianshu.com/p/96db2abea667/
```
sudo apt-get install open-vm-tools-desktop
vim ~/.config/i3/confg
exec --no-startup-id vmware-user-suid-wrapper
```


---

> 作者:   
> URL: https://cfanzp.com/vm-install-ubuntu/  

