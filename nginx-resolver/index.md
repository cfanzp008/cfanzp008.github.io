# nginx使用resolver


<!--more-->
# nginx使用resolver
## resolver
- resolver是nginx配置文件中的条要配置指令，可以配置为：
```nginx
resolver 8.8.8.8;
```
## resolver配置多个ip
- nginx配置多个ip的方法：
```nginx
resolver 114.114.114.114 8.8.8.8;
resolver 114.114.114.114 8.8.8.8 ipv6=off;
resolver 114.114.114.114 8.8.8.8 valid=30s ipv6=off;
```
- 测试会发现nignx中配置多个DNS是轮询的，不是每次都查前面的。这样就要求配置上的dns都是有效的。
- `valid=30s` 设置缓存时间为30s
- 最近在做nginx反向代理的时候就遇到了这个问题，域名配置的2个DNS中只有第一个DNS能解析域名，结果是nginx交替出现正常页面和502页面。



---

> 作者:   
> URL: http://111.230.8.71:8889/nginx-resolver/  

