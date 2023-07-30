# Mac如何远程连接Windows


<!--more-->
## Mac如何远程连接Windows
### 1. 使用microsoft-remote-desktop-for-mac
Mac远程连接Windows的工具不多比较好用，且免费的，这里介绍一款:微软官方的Microsoft-remote-desktop-for-mac,下载地址:
- https://install.appcenter.ms/orgs/rdmacios-k2vy/apps/microsoft-remote-desktop-for-mac/distribution_groups/all-users-of-microsoft-remote-desktop-for-mac

微软官方地址:
- https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-mac

这里职能下载Bate版本，如果是要下载正式版本需要访问国外的app store,国内的app store是没法访问的。

下载后是一个zip压缩包解压后拖到应用程序界面就可以了。

### 2. 使用rdesktop(亲测可用)
- 安装rdesktop 推荐先安装macPorts
```
sudo brew install macPorts
sudo port install rdesktop
```

- 使用X11报错,解决方案,安装XQuartz
```
UI(error): ui_init(), failed to open X11 display:
brew install --cask XQuartz
```
- 重启后，配置DISPLAY环境变量
```
vim ~/.bash_profile
DISPLAY=/private/tmp/com.apple.launchd.Tt4i2z07qg/org.macosforge.xquartz:0
```
参考: https://github.com/FreeRDP/FreeRDP/issues/993

- 值得注意的是rdesktop已经不再更新维护了

### 3. 使用xfreerdp
- 安装帮助:https://github.com/FreeRDP/FreeRDP/wiki/PreBuilds
```
sudo port install freerdp(不可用)
#或者
brew install freerdp(可用)
sudo ln -s /usr/local/bin/xfreerdp /opt/local/bin/xfreerdp
```
- 运行报错(重装，使用brew安装可用)
```
[19:46:08:143] [2900:06a80000] [ERROR][com.freerdp.core] - transport_connect_tls:freerdp_set_last_error_ex ERRCONNECT_TLS_CONNECT_FAILED [0x00020008]
```


---

> 作者:   
> URL: https://cfanzp.com/mac-windows/  

