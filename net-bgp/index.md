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

## 过滤器
FRR提供了基于IP，基于Community和基于AS-PATH的三种过滤器来匹配路由。
### IP Access List
- 基于IP的路由ACL规则，比较少使用，通常是用IP Prefix List来设置策略。
```bash
access-list NAME [seq (1-4294967295)] permit IPV4-NETWORK
access-list NAME [seq (1-4294967295)] deny IPV4-NETWORK

#NAME：规则名称
#seq：规则序列号，不填则在上一个规则序列号基础上加5，若存在则加10，以此类推
#permit(deny)：允许通过还是拒绝通过
#IPV4-NETWORK： ipv4网络

#example
access-list filter deny 10.0.0.0/9
access-list filter permit 10.0.0.0/8
access-list filter seq 13 permit 10.0.0.0/7
```

### IP Prefix List
IP Prefix List提供了强大的基于IP前缀的过滤机制，除了access list之外，还能够基于ip掩码和ip掩码区间进行过滤。
```bash
ip prefix-list NAME (permit|deny) PREFIX [le LEN] [ge LEN]
ip prefix-list NAME seq NUMBER (permit|deny) PREFIX [le LEN] [ge LEN]
no ip prefix-list NAME #取消io前缀规则
show ip prefix-list NAME #显示ip前缀规则

#NAME：规则名称
#seq：规则序列号，不填则在上一个规则序列号基础上加5，若存在则加10，以此类推
#permit(deny)：允许通过还是拒绝通过
#PREFIX： ip前缀
#le LEN：匹配小于LEN的ip前缀
#ge LEN：匹配大于LEN的ip前缀

#example
ip prefix-list pl-allowed-adv seq 5 permit 82.195.133.0/25
ip prefix-list pl-allowed-adv seq 10 deny any
```

### Community-list
Community属性值是一种路由标记 ，FRR提供了基于Community的路由过滤方法。
```bash
bgp community-list [standard|expanded] NAME permit|deny COMMUNITY
no bgp community-list [standard|expanded] NAME
show bgp community-list [NAME detail]

#standard：COMMUNITY是一个确切值
#expanded：COMMUNITY可为正则表达式，都不填则由系统自动识别
#permit|deny：过滤规则

#example
bgp community-list 70 permit 7675:70
bgp community-list 70 deny
```
### as-path access-list
as-path access-list是基于as-path的过滤规则，能够使用正则表达式对as-path进行过滤。
```bash
bgp as-path access-list WORD permit|deny LINE

#WORD：列表号
#LINE：正则表达式

#example
bgp as-path access-list 99 permit _0_
bgp as-path access-list 99 permit _23456_
bgp as-path access-list 99 permit _1310[0-6][0-9]_|_13107[0-1]_
```

## 路由策略
BGP的路由策略由
FRR的路由策略通过设置Route Maps来实现。Route Maps一共可分为五个模块，分别是
- Matching Conditions（条件匹配）
- Set Actions（策略设置）
- Matching Policy（条件策略）
- Call Action（跳转）
- Exit Policy（结束策略）

## 参考
- https://zhuanlan.zhihu.com/p/22031402
- https://blog.csdn.net/qq_38265137/article/details/80439561
- https://blog.csdn.net/m0_48594855/article/details/106763166


---

> 作者:   
> URL: https://cfanzp.com/net-bgp/  

