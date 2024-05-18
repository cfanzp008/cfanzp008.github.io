# BGP协议


<!--more-->
# BGP协议
## 基本概念
- BGP
- iBGP
- eBGP
- AS
- 对等体
- Speadker
- Peer
- BGP的路由器号(Route ID)

## BGP协议
最近自己接触的一个项目有涉及到BGP相关的知识，这里记录一下。

## BGP协议的基本概念
- BGP是Border GateWay Protocol,边界网关路由协议。
- 用于自治系统（Autonomous System)之间交换路由信息,称之为外部BGP,即eBGP
- 用于自治系统（Autonomous System)内部交换路由信息,称之为内部BGP,即iBGP
- BGP建立使用179端口
- GBP本身建立在TCP之上，可能不安全，需要有安全机制。

## BGP建立连接
- 默认端口是179
- 默认TTL=1

## BGP的工作原理
BGP对等体的建立、更新和删除等交互过程主要有5种报文、6种状态机和5个原则

## BGP报文
### 5种报文
- Open报文:用于建立BGP对等体连接。
- Update报文:用于在对等体之间交换路由信息。
- Notification报文:用于中断BGP连接。
- Keepalive报文:用于保持BGP连接。
- Route-refresh报文:用于改变路由策略后请求对等体重新发送路由信息。只有支持路由刷新(Route-refresh)能力的BGP设备会发送和响应此报文。

## BGP状态机
### 6种状态
- 空闲(Idle)
- 连接(Connect)
- 活跃(Active)
- Open报文已发送(OpenSent)
- Open报文已确认(OpenConfirm)
- 连接已建立(Established)
在BGP对等体建立的过程中，通常可见的3个状态是：Idle、Active和Established

## BGP安全保护

## AS号
- AS号分为2字节AS号[1-65535]和4字节AS号[1-4294967295]
- 为了防止AS间产生环路，当BGP设备接收EBGP对等体发送的路由时，会将带有本地AS号的路由丢弃。
- 为了防止AS内产生环路，BGP设备不将从IBGP对等体学到的路由通告给其他IBGP对等体，并与所有IBGP对等体建立全连接。

## 参考
- https://zhuanlan.zhihu.com/p/22031402
- https://blog.csdn.net/qq_38265137/article/details/80439561


---

> 作者:   
> URL: https://cfanzp.com/net-bgp/  

