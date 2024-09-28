# Ubuntu22.04 Open Root Ssh


<!--more-->
# ubuntu22.04 ssh允许root进行ssh
## 配置
```bash
vim /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
PermitRootLogin yes
```

## 注意
- 开发环境为了方便可以这样配置，正式环境不建议开启root ssh登陆。


## 参考
- https://blog.csdn.net/SGchi/article/details/138717315


---

> 作者:   
> URL: https://cfanzp.com/ubuntu22.04-open-root-ssh/  

