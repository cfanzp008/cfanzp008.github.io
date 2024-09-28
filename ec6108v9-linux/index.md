# ec6108v9刷成linux笔记


<!--more-->
# ec6108v9刷成linux笔记
准备吧自己家里的一台ec6108v9电视盒子刷成ubuntu系统。这里先收集一下资料做一下笔记。

## 资源准备
- HiTool：http://xz.w10a.com/small/HiTool.7z
- 刷机包：https://node4.histb.com:9088/update/system/mv100-mdmo1d-usb-flash.zip

## 注意事项
- 短接点：可以用镊子,参考视频
- 当前设备短接点为：J15
- U盘接入电源线旁边的usb口

## 刷机流程
1. [usb刷机教程参考](https://ecoo.top/docs/tutorial-basics/usb-flash)

### 刷机注意事项
1. 短接开始按住不动，5-8秒放开，短接J15,会黑屏2分钟左右，显示初始化中，再过3分钟左右就刷好了。
2. 黑屏2分钟时灯会闪烁。
3. 过程中要插上网线，不然可能获取不到IP。

## 刷机型号表
- 参考：https://ecoo.top/histb.html
```bash
华为悦盒ec6108v9 hi3798mv100 1G emmc4G mdmo1d 短接点 J15
```

## 其它
家里还有一个Hi3798MV300这里记录一下刷机包地址
-  芯片Hi3798MV300刷机固件包 https://download.csdn.net/download/zdy1006/88905133

## 参考
- 华为悦盒EC6018V9E线刷linux教程：https://blog.csdn.net/wp2341/article/details/127166673
- 华为悦盒烧写Ubuntu系统刷机教程：https://blog.csdn.net/hu_yinghui/article/details/125198111
- 华为EC6108V9C海思NAS 卡刷包：https://zhuanlan.zhihu.com/p/547526217?utm_id=0


---

> 作者:   
> URL: https://cfanzp.com/ec6108v9-linux/  

