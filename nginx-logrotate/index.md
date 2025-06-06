# Nginx切割日志后日志不正常写入？


<!--more-->
# Nginx切割日志后日志不正常写入？
## 需求
- 日志需要通过filebeat等日志收集工具进行收集后交给后端服务器处理。为了控制nginx单个日志的大小，现对单个日志进行切割。比如每隔10分钟切割一次。

## 切割后日志会丢失
- 1. 最开始的方案是切割后创建个access_log文件，nginx reload, 但是发现有时，日志不能正常写入。
- 2. 后来测试切割后不创建文件，nginx reload, 但是发现有时，日志还是不能正常写入。

## 目前的方案
- 切割日志后执行以下操作
```
kill -USR1 `cat /path/nginx/logs/nginx.pid`
```

## 日志还有哪些存储方案？
- 最近查资料的时候了解到一个轻量级的日志存储方案PLG(Promtail+Loki+Grafana)
- 参考：https://blog.csdn.net/AndCo/article/details/128949093


---

> 作者:   
> URL: http://111.230.8.71:8889/nginx-logrotate/  

