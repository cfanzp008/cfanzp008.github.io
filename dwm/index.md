# dwm的安装与使用


<!--more-->
# dwm的安装与使用

### ubuntu 安装dwm
```
sudo apt-get install suckless-tools libx11-dev libxft-dev libxinerama-dev gcc make
sudo apt install compton
sudo apt install feh
sudo apt install acpi acpitool
sudo apt install light
sudo apt install numlockx
```

#### 添加启动选项
- 具体配置方式，进入/usr/share/xsessions/目录，新建文件dwm.desktop,输入内容：
```
[Desktop Entry]
Encoding=UTF-8
Name=Dwm
Comment=Dynamic window manager
Exec=dwm
Icon=dwm
Type=XSession
```

#### 使用字符界面登录
##### 使用startx命令从文字界面启动
此方式开机更加快速，使用更加灵活，系统资源占用更少。
首先将系统改为默认进入文字界面
修改grub配置,打开文件/etc/default/grub,
```
将GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
改为GRUB_CMDLINE_LINUX_DEFAULT="text"
```

然后执行命令
```
$ sudo update-grub
```

将启动等级改为多用户等级，执行如下命令：
```
$ systemctl set-default multi-user.target 
```

如果想改回启动图形界面执行下面
```
$ systemctl set-default graphical.target
```

最后修改~/.xsession文件（如果没有就新建），在最后一行加入

```
exec dwm
```

重启电脑，执行startx命令，直接进入dwm，同时也可以执行sudo systemctl start gdm.service命令，打开gdm3的用户登录界面。

### 下载
```
git clone https://git.suckless.org/dwm
```

### 快捷键
- Mod1表示:Alt,Mod4表示Windows键
```
```

- dwm问题汇总: https://blog.csdn.net/qq_34548075/article/details/106941934

## 参考
- Ubuntu DWM安装配置文档: https://zhuanlan.zhihu.com/p/262067759
- 入坑dwm——原来窗口管理器还可以这样用？ https://zhuanlan.zhihu.com/p/183861786


---

> 作者:   
> URL: https://cfanzp.com/dwm/  

