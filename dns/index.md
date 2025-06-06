# dns


<!--more-->
# dns
## 关于dns
- 之前对dns的了解不深入，家里电脑配置dns的时候一般都是配置为网关或者114.114.114.114或者8.8.8.8之类的就可以访问了。

## linux/mac中使用命令查询nginx
- nslookup
- dig
- host
```bash
nslookup www.baidu.com
nslookup www.baidu.com 114.114.114.114
dig @114.114.114.114 www.baidu.com
host www.baidu.com 114.114.114
```

## windows中使用命令查询nginx
```bash
nslookup www.baidu.com
```
## nginx中使用dns
- dns配置
```bash
resolver 223.5.5.5 223.6.6.6 1.2.4.8 114.114.114.114 valid=3600s;
```

- 需要注意的是反向代理配置时，proxy_pass后面的域名需使用变量才会去查询dns
```bash
set $backend "foo.example.com";
proxy_pass http://$backend;
```


---

> 作者:   
> URL: http://111.230.8.71:8889/dns/  

