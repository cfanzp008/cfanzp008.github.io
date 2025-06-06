# 网络GRE协议


<!--more-->
# 网络GRE协议
## 什么是GRE隧道？
通用路由封装（GRE）是一种协议，用于将使用一个路由协议的数据包封装在另一协议的数据包中。
- GRE:Generic Routing Encapsulation
- GRE是在网络上建立直接点对点连接的一种方法，目的是简化单独网络之间的连接。
- GRE是一种将一种类型的数据包装载到另外一种类型的数据包中的方式。
- 使用GRE协议可以克服IGP协议的一些局限性。

## GRE解决了什么问题？
- 私有IP网络之间无法直接通过Internet互通。
- 异种网络（IPX,AppleTalk）之间无法通过Internet直接进行通信。

## GRE工作原理
- 报文到达本端设备，在私网的原始报文前面添加GRE头。
- 在GRE头前面加上新的IP头、新IP头的IP地址为公网地址。
- 对端收到后，首先判断这个报文是不是GRE报文，如果是，报文被送到Tunnel接口解封装，去掉外层IP头，GRE头，恢复为原始报文。
- 对端设备根据原始报文的目的地址再次查找路由表，根据路由匹配结果进行报文转发。

## IPSec与GRE结合
- GRE本身不对数据进行加密。
- 可以建立IPSec隧道对GRE数据进行加密。可以保证报文传输的私密性和完整性。

## 参考
- https://zhuanlan.zhihu.com/p/270319357
- https://zhuanlan.zhihu.com/p/580919066


---

> 作者:   
> URL: http://111.230.8.71:8889/network-gre/  

