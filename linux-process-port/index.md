# linux查看哪个进程占用了端口?

## linux查看哪个进程占用了端口?
方法1:使用lsof命令
```bash
[root@dev127 paoshang]# lsof -i:8201
COMMAND    PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
skynet  110379 root    6u  IPv4 7563011      0t0  TCP localhost:trivnet2 (LISTEN)
```

方法2:使用netstat命令
```bash
[root@dev127 paoshang]# netstat -tunlp | grep 8201
tcp        0      0 127.0.0.1:8201          0.0.0.0:*               LISTEN      110379/skynet
```



---

> 作者: cfanzp  
> URL: https://cfanzp.com/linux-process-port/  

