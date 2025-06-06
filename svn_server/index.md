# linux svn服务器搭建


<!--more-->

## svn服务器搭建
### centos 安装命令
```
sudo yum install subversion
```

### 创建目录
```
sudo mkdir /data/svn/
#创建svn版本库
sudo svnadmin create /data/svn/doc
```

- 查看启动服务文件
```
/usr/lib/systemd/system/svnserve.service
```

- 修改启动配置文件,修改OPTION参数
```
vim /etc/sysconfig/svnserve
OPTIONS="-r /data/svn"
```

### 修改目录配置文件
- 配置文件目录
```
/data/svn/doc/conf
```
- 修改密码,passwd文件,users节点下添加,test帐号密码123
```
test=123
```

- 修改authz文件，加入用户权限
```
[/]
test =rw
```

- 修改svn权限
```
vim  svnserve.conf
anon-access = none               #不允许匿名用户访问
auth-access = write            #通过验证的用户可以读和写    
password-db = passwd        #用户与密码对应的数据保存在passwd文件中
authz-db = authz            #权限的信息保存在文件authz中
```

### 访问地址
```
svn://ip
```

### svn拉取代码
```
svn checkout git@xxx/doc --username aaa --password bbb
```

## 总结
- 平时工作中，大部分项目是使用的git作为源码管理工具。也有少数项目使用的是svn。
- 策划文档，很多团队更喜欢用svn。
- 学会搭建svn服务器，并熟练使用svn命令操作是十分有必要的。

### 参考文档
- https://blog.csdn.net/chenxizhan1995/article/details/110687345
- https://www.cnblogs.com/qffxj/p/12061270.html


---

> 作者:   
> URL: http://111.230.8.71:8889/svn_server/  

