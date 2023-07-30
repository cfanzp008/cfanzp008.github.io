# ubuntu 禁用密码登录


<!--more-->
# ubuntu 禁用密码登录
## 禁止密码登陆
1. 修改配置文件
```
vim /etc/ssh/sshd_config
# PasswordAuthentication  yes
PubkeyAuthentication yes
修改为
PasswordAuthentication  no
PubkeyAuthentication yes
```

2. 重启ssh服务
```
service ssh reload
```


---

> 作者:   
> URL: https://cfanzp.com/ubuntu-password/  

