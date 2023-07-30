# linux查看打开文件情况

# linux查看打开文件情况
- 查看进程skynet(config.login)的pid

```bash
[root@dev127 login]# ps -ef | grep login
root        657      1  0 6月20 ?       00:00:49 /usr/lib/systemd/systemd-logind
root     113262      1  8 15:27 ?        00:02:19 /data/myb/sh/../skynet/skynet /data/myb/sh/login/config.login
root     113983 107342  0 15:42 pts/4    00:00:02 tail login.20220819.log -f
root     114702 112029  0 15:55 pts/2    00:00:00 grep --color=auto login
```

- 查看进程能打开的最大文件数目
```bash
[root@dev127 login]# cat /proc/113262/limits
Limit                     Soft Limit           Hard Limit           Units     
Max cpu time              unlimited            unlimited            seconds   
Max file size             unlimited            unlimited            bytes     
Max data size             unlimited            unlimited            bytes     
Max stack size            8388608              unlimited            bytes     
Max core file size        unlimited            unlimited            bytes     
Max resident set          unlimited            unlimited            bytes     
Max processes             26047                26047                processes 
Max open files            1024                 4096                 files     
Max locked memory         65536                65536                bytes     
Max address space         unlimited            unlimited            bytes     
Max file locks            unlimited            unlimited            locks     
Max pending signals       26047                26047                signals   
Max msgqueue size         819200               819200               bytes     
Max nice priority         0                    0                    
Max realtime priority     0                    0                    
Max realtime timeout      unlimited            unlimited            us        
[root@dev127 login]# 
```

## 参考链接
- https://blog.csdn.net/jsugs/article/details/122056916


---

> 作者:   
> URL: https://cfanzp.com/lsof/  

