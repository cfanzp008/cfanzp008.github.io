# 简单git服务器的搭建


<!--more-->
# 简单git服务器的搭建
## 为什么要搭建自己的git服务器
- github,gitee等等代码托管平台都是可以用的，但是也有他们的限制。如果只是自己用，完全可以自己搭建自己的git服务器。

## 步骤
### 创建用户和组
```
groupadd git
useradd git -g git
```

### 创建用户ssh密钥权限目录及权限，并授权组和用户
```
mkdir /home/git/.ssh
cd /home/git/
chown -R git:git .ssh
cd .ssh/
cp ~/.ssh/authorized_keys ./
chown -R git:git authorized_keys
```

### 选择一个项目的目录，并创建一个测试的git仓库
- 这里指定为/srv目录
```
cd /srv
git init --bare test.git
chown -R git:git test.git/
```

### 获取访问地址
- 假设ip为: 192.168.2.188,那么clone地址为:
```
git clone git@192.168.2.188:/srv/test.git
```

### 禁用git账号的登录
- 修改文件/etc/passwd
```bash
git:x:1001:1001:git-user,,,:/home/git:/bin/bash
```
- 修改为
```bash
git:x:1001:1001:git-user,,,:/home/git:/user/bin/git-shell
```

## 总结
- 如果自己有自己的开发服务器，不防搭建一个自己的git服务器,方便自己的开发工作，过程并不复杂。


---

> 作者:   
> URL: http://111.230.8.71:8889/git-server/  

