# mac ssh terminal连接容易掉线卡住怎么办？


<!--more-->
# mac ssh terminal连接容易掉线卡住怎么办？
在使用mac的terminal远程连接服务器时很容易出现离开后回来连接的terminal就卡住，又不能退出的情况。如何解决？
## 配置ssh客户端每隔1分钟给服务器发送一个保活包。
- 在配置末尾添加如下配置
```bash
cat /etc/ssh/ssh_config
Host *
    SendEnv LANG LC_*

ServerAliveInterval 60 #每隔60秒就向服务器发送一个请求
ServerAliveCountMax 3  #允许超时的次数，一般都会响应
```

- mac m1配置如下
```bash
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3  #允许超时的次数，一般都会响应
```

- 抓包查看情况，可以看到每间隔1分钟就有ssh请求
```bash
sudo tcpdump -i any port 22
```


---

> 作者:   
> URL: http://111.230.8.71:8889/mac-ssh-client-ka/  

