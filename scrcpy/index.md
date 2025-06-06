# 使用scrcpy投屏手机到电脑


<!--more-->
# 使用scrcpy投屏手机到电脑
android手机可以使用adb和scrcpy将手机投屏到电脑，可以实现use连接投屏和wifi投屏。
- 手机设置：手机设置打开调试模式
- adb连接
```
adb list 查看设置
adb connect ip 连接手机
scrcpy -s deviceid 设备投屏
```

## 无线连接注意事项
底层相关配置的属性为：service.adb.tcp.port, >0 adbd将监听网络对应端口，<=-1将监听USB,USB连接电脑后执行下面的命令来设置端口

```shell
adb tcpip 5555
#成功提示：
restarting in TCP mode port 5555
```

- 查看手机ip,连接无线
```
adb connect 192.168.2.139:5555
```

- 检查连接状况
```
adb devices
```

- 调试完后断开连接
```
adb disconnect 192.168.2.139:5555
```

- 重置端口
```
setprop service.adb.tcp.port -1
stop adbd
start adbd
```

## 参考链接
- 如何将 Android 手机投屏在 Ubuntu/LinuxMint/Debian 上: https://www.jianshu.com/p/f52e142671f8
- adb连接手机的2种方式: https://blog.csdn.net/qq_34329508/article/details/88704243


---

> 作者:   
> URL: http://111.230.8.71:8889/scrcpy/  

