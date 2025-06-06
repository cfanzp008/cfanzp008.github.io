# yumBackend.py引起yum lock的解决办法


<!--more-->
# yumBackend.py引起yum lock的解决办法
- 今天centos测试遇到yum lock问题，进程杀掉重启，解决方案、简单、直接、有效。
```bash
rm -f /var/run/yum.pid
```

## 参考
- https://blog.csdn.net/weixin_34122810/article/details/92723758


---

> 作者:   
> URL: http://111.230.8.71:8889/yum-lock/  

