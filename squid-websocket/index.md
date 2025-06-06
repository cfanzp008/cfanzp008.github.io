# Squid代理Websocket的问题


<!--more-->
# TODO--Squid代理Websocket的问题
## 背景
最近研究一款安全产品时，需要使用Squid代理Http/Https流量。对于Https协议，我采用了自签名证书，客户端安装CA证书的方式来测试识别解密后的http请求。其中出现了一个问题：在客户端请求中ws/wss流量无法通过squid,squid配置为代理模式和透明模式结果都一样。如果不对https进行解密，那么ws/wss流量可以正常通过。

## 基础概念
### 什么时websocket协议?
- websocket是一个双工协议，是http的升级协议，支持服务端与客户端双向通信。

## 问题
### 为什么解密后wss协议数据包就无法通过squid呢？
- 由于接触squid时间还不是很长，暂时不能下结论。这里先记录一下。

### 如何解决？
- 思路：研究squid源码，看如何区分websocket流量和http流量，如果是websocket流量直接进行转发(项目需求不关系websocket流量)。

### 如何分离http协议中的websocket数据包？
- 这里提供了一个思路：https://www.cnblogs.com/shanheyongmu/p/16580344.html

## 总结
目前还没有好的解决方案，这里先记录一下。


---

> 作者:   
> URL: http://111.230.8.71:8889/squid-websocket/  

