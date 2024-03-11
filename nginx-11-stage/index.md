# Nginx的11个阶段


<!--more-->
# Nginx的11个阶段
## Nginx有哪些阶段？
```bash
post-read      # 读取请求头
server-rewrite # 执行rewrite
find-config    # 根据uri替换location

rewrite      # rewrite后处理
post-rewrite # rewrite后处理

preaccess    # 认证预处理
access       # 认证处理
post-access  # 认证后处理

precontent   # 内容预处理
content      # 内容处理

log          # 日志处理
```

## OpenResty Lua Nginx Module有哪些阶段？
```bash
init_by_lua*
init_worker_by_lua*
ssl_certificate_by_lua*

set_by_lua*
rewrite_by_lua*
access_by_lua*
content_by_lua* balancer_by_lua*
header_filter_by_lua*
body_filter_by_lua*
log_by_lua*
```

## 实际问题
- 最近遇到一个问题：在反向代理过程中，需要在日志中加上一个字段，但是这个字段的数据需要通过使用http接口获得。
- Nginx本身是一个代理服务，负责数据的传递。但是要在打印日志前去请求一个http请求，感觉有点为难老。
- 如果要不影响nignx的性能，感觉只有在打印日志的阶段前，先去发送一个http请求获取数据。
- 实际测试发现，nginx不允许在log_by_lua阶段发送http请求。
- 于是改成在access_by_lua和content_by_lua阶段来处理。
- 在access_by_lua阶段如果数据不允许发给后端服务器，则先返回客户端请求结果，然后再发送请求借口获取需要打印的数据。
- content_by_lua阶段先返回客户端请求结果，然后再发送请求借口获取需要打印的数据。

## 参考
- Nginx 的 11 个执行阶段详解：https://zhuanlan.zhihu.com/p/379210150
- Nginx调试必备：https://mp.weixin.qq.com/s?__biz=MzI1MzY3NTE1NQ==&mid=2247484189&idx=1&sn=8c97653b6508a7b7a18c865eb36a0fc3&scene=21#wechat_redirecthttps://mp.weixin.qq.com/s?__biz=MzI1MzY3NTE1NQ==&mid=2247484189&idx=1&sn=8c97653b6508a7b7a18c865eb36a0fc3&scene=21#wechat_redirect


---

> 作者:   
> URL: https://cfanzp.com/nginx-11-stage/  

