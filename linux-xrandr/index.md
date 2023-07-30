# 如何在linux中使用xrandr


<!--more-->
# 如何在linux中使用xrandr
## 查询显示设备信息
```
xrandr -q
```

## 多屏显示
### i3wm中使用方法
```
vim ~/.config/i3/config
exec xrandr --output HDMI-1-2 --auto --right-of HDMI-3
exec xrandr --output HDMI-3 --auto --primary
```

### dwm中使用方法
```
vim ~/.dwm/autostart.sh
xrandr --output HDMI-1-2 --auto --right-of HDMI-3
xrandr --output HDMI-3 --auto --primary
```


## 参考
- https://linuxconfig.org/how-to-configure-your-monitors-with-xrandr-in-linux

## 总结
xrandr平时都使用不到，主要是在使用平铺式桌面管理器如i3wm,dwm时需要用到。简单适用。


---

> 作者:   
> URL: https://cfanzp.com/linux-xrandr/  

