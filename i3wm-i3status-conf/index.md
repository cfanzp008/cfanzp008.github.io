# i3wm-i3wm状态栏i3status如何配置显示星期？


# i3wm-i3wm状态栏i3status如何配置显示星期？
## i3wm用的状态栏是i3status
## i3status配置状态栏的方法如下:
- 配置文件路径/etc/i3status.conf
```
vim /etc/i3status.conf
```

- tztime 结点中加入%A
```
tztime local {
    format = "%Y-%m-%d %H:%M:%S %A"
}
```



---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/i3wm-i3status-conf/  

