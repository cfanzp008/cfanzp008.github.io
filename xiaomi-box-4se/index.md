# 小米盒子4se精简笔记


<!--more-->
# 小米盒子4se精简笔记
小米盒子4se使用有一段时间了，盒子里面的UI太复杂了，不太好用，小米盒子使用的是Android系统，在调试模式下，可以使用Adb进入调试模式，设置当贝桌面或其它简介桌面，卸载掉不需要的app

## 打开调试模式
- 遥控在产品型号上连按6次。
- 在账号与安全设置中开启ADB调试。

## adb连接设备
我这里是电脑和手机都使用wifi连的一个局域网,查看设备的ip,例如：192.168.2.50
- 连接设备
```
adb connect 192.168.2.50
```

- 查看设备连接状态
```
adb devices
List of devices attached
192.168.2.50:5555	device
```

- 查看当前设备中安装的app
```
adb shell pm list packages
package:com.mitv.screensaver
package:com.xiaomi.account
package:com.mitv.tvhome
package:com.mitv.alarmcenter
package:com.xiaomi.gamecenter.sdk.service.mibox
package:com.mitv.codec.update
package:com.mitv.shoplugin
package:com.miui.systemAdSolution
package:com.miui.daemon
package:com.xiaomi.mitv.settings
package:com.xiaomi.mitv.providers.settings
package:com.xiaomi.mitv.mediaexplorer
package:com.xiaomi.mitv.systemui
package:com.xiaomi.mibox.lockscreen
package:com.mitv.videoplayer
package:com.xiaomi.screenrecorder
package:com.xiaomi.mitv.smartshare
package:com.xiaomi.voicecontrol
package:com.xiaomi.tv.nameservice
package:com.xiaomi.mimusic2
package:com.xiaomi.upnp
package:com.xiaomi.miplay
package:com.xiaomi.devicereport
package:com.mitv.mivideoplayer
package:com.mitv.gallery
package:com.miui.tv.analytics
package:com.xiaomi.statistic
package:com.mitv.care
package:com.xiaomi.mitv.remotecontroller.service
package:com.xiaomi.account.auth
package:com.miui.core
package:com.xiaomi.mitv.tvmanager
```

- 查看当前设备中安装的和小米有关的主要app
```
adb shell pm list packages | grep mi
```

- 安装当贝桌面
```
adb install ./dbzm.apk
```

- 卸载com.miui.systemAdSolution
```
adb shell pm uninstall --user 0 com.miui.systemAdSolution
```
其它需要卸载的app方法同上。

## 参考资料
- 小米盒子精简教程: https://www.znds.com/tv-1181689-1-1.html


---

> 作者:   
> URL: https://cfanzp.com/xiaomi-box-4se/  

