# http协议


<!--more-->
# http协议
## http协议的格式
### HTTP请求报文
```
方法 URL 版本 \n\r   (请求行)
首部字段名:值 \n\r
...
...
首部字段名:值 \n\r
\n\r
实体主体（通常不用）
```
- 方法:OPTION GET HEAD POST PUT DELETE TRACE CONNECT
- 请求例子
```
GET /gts1c3/aaa HTTP/1.1
Host: ocsp.pki.goog
X-Apple-Request-UUID: 111-222-333-444-99999
Accept: */*
User-Agent: com.apple.trustd/2.2
Accept-Language: zh-CN,zh-Hans;q=0.9
Accept-Encoding: gzip, deflate
Connection: keep-alive

```

### HTTP返回报文
```
版本 状态码 短语\n\r   (状态行)
首部字段名:值 \n\r
...
...
首部字段名:值 \n\r
\n\r
实体主体（有些报文不用）
```

- 返回例子
```
HTTP/1.1 200 OK
Server: ocsp_responder
Content-Length: 471
X-XSS-Protection: 0
X-Frame-Options: SAMEORIGIN
Date: Fri, 22 Dec 2023 13:56:50 GMT
Cache-Control: public, max-age=14400
Content-Type: application/ocsp-response
Age: 1993

0...
......0....	+.....0......0...0.......t.......
n...i.q..6S...c....20231221122544Z....20231228112543Z0
.	*.H..
.............M.19ZV..lT.x%..*.>.."w<.{.&...9.........f.,.....):.5....5%e........
.M..@.i...U	l.....6

```

## HTTP1.0
- HTTP1.0 是http协议的第二个版本，是第一个在通讯中定版本号的HTTP协议
- http1.0 浏览器与服务器只保持短暂的连接，每次请求都需要与服务器建立一个TCP连接，服务器完成请求处理后，立即断开TCP连接，服务器不跟踪每个客户,也不记录过去的请求。
  - 每次与服务器交互，都需要新开一个连接。
  - 性能上有缺陷。
  - 如果要建立长连接，需要设置一个非标准的Connection字段`Connnection:keep-alive`

## HTTP1.1
- HTTP1.1中，默认支持长连接(`Connection:keep-alive`),即在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟。
- HTTP1.1允许客户端不用等待上一次请求结果返回，就可以发出下一次请求，但服务器必须按照接收到客户端请求的先后顺序依次回送响应结果。
- HTTP1.1在HTTP1.0的基础上，增加了更多的请求头和响应头来完善功能：
  - 引入了更多的缓存控制策略:if-Unmodified-Since,if-Match,if-None_-Match等缓存头来控制缓存策略。
  - 引入range,允许值请求资源某个部分。
  - 引入host,实现在一台WEB服务器上可以在同一个IP地址和端口号上使用不同的主机名来创建多个虚拟WEB站点。
  - 还添加了：put,delete,options等等请求方法。

## HTTP2.0
HTTP2.0在之前版本的基础上性能有很大的提升，添加了特性:
- 多路复用
- 二进制分帧
- 首部压缩
- 服务器推送

## 参考:
- https://vue3js.cn/interview/http/1.0_1.1_2.0.html


---

> 作者:   
> URL: http://111.230.8.71:8889/http/  

