# [mac][x86]Mac Mini 2014安装win10


<!--more-->
# Mac Mini 2014安装win10
家里有一台mac mini 2014太老太卡了，准备换成win10,这里记录一下收集的资料信息
- BootCamp对照表
```bash
机型	Win10/11 64位	Win 8/8.1 64位	Win 7 64位	Win 7 32位
Mac Mini 2014年末	6.0.6136	5.1.5769	5.1.5769
```

- BootCamp下载
```
#下载地址：https://www.drvsky.com/apple/BootCamp_6.0.6136.htm
#解压密码：drvsky.com55710
https://note.drvsky.com/bootcamp/bootcamp_6.0.6136.7z?key=825d87c1df336a4c986e5e11fbb4682e&filetype=.exe
```

## mac mini2014更换固态
拆机更换固态硬盘可以参考这个视频：https://www.bilibili.com/video/BV1Wz411z7kG/,这里感谢大神的分享
整个过程其实挺简单的，但是我还是在这个过程中翻车了，不要相信大力出奇迹。。。 风扇的排线取下来的时候,我把固定排线的槽位给弄破了，后面用垫片压在上面的，临时用用，风扇也能用。

### 固态硬盘选择
- 这里我选择的这款比较便宜：https://item.jd.com/5115332.html
- 可以使用，因为使用时间不长，这里不做评价,以免误导大家。

## 系统安装教程
- 可以参考：https://www.bilibili.com/video/BV1gF4m177jU/?spm_id_from=333.337.search-card.all.click&vd_source=5cbf24b674b5b4183e6f626cd037b179

## U盘安装系统遇到的问题
安装过程中发现使用GPT分区表，然后使用GHOST安装win10，系统无法写入磁盘，解决方案是使用MBR分区表

## CPU温度过高
- 这个问题是安装成功win10后发现稳定过高，可以参考知乎的一个帖子解决：
  - https://www.zhihu.com/question/33606243/answer/61033114
  - 安装Macs Fan Control免费版本,配置根据cpu PECI温度来调节风扇的转速。

## 参考
- [BootCamp对照表](https://www.sysmini.com/1019.html)

## 相关工具
- [7zip解压工具下载](https://www.7-zip.org/download.html)

## 总结
一直想把家里的这台闲置的mac mini 2014款机器更换一下固态硬盘，并且换上windows系统，这两天终于折腾落地了。整个过程从挑选固态，查找资料，拆机，安装系统，调优在3天内的空余时间内完成了。过程中出现了一点失误，把风扇的插槽扯掉了。也找到了临时解决方案，不影响使用。

### 遇到问题
- 如果挑选固态
- 如果拆机
- 没有拆机工具
- 风扇插槽被扯坏了
- 系统安装，磁盘无法写入
- 安装成功后，CPU稳定80度以上

上述问题通过查找资料都不难解决。


---

> 作者:   
> URL: https://cfanzp.com/mac-mini-2014-win10/  

