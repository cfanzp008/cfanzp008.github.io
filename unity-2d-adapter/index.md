# Unity小游戏适配笔记


<!--more-->
# Unity小游戏适配笔记
最近在学习使用unity做一些小游戏，小工具，咨询了一下自己的伙伴一些基础问题。这里记录一下。
## 环境
- 这里用到的unity版本为：2021.03

## Player Setting设置
- 在player setting-->Configuration-->Scripting Backend设置为ILCPP
- 对ILCPP不了解的同学可以看看这篇文章: https://zhuanlan.zhihu.com/p/141748334

## 相机Camero
相机删除默认的Main Camero然后自己创建一个Camero,这种做法的原因暂时没有去纠结。
- projection 选正交`orthographic`

## 画布Canvas
- UI Scale Mode 选Scale With Screen Size
- Screen Match Mode 选`Expand`



---

> 作者:   
> URL: https://cfanzp.com/unity-2d-adapter/  

