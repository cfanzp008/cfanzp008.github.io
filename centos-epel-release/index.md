# Centos yum安装提示无可用包


<!--more-->
# Centos yum安装提示无可用包
centos 在使用yum安装软件的时候，有时候会提示无可用包，这个时候可以先安装一下epel-release软件包，
epel(extra packages for enterprise linux)是基于fedora的一个项目，为红毛系列提供额外的软件包，适用于RHEL,CentOS。

## 例如安装htop 提示无可用包
```
yum -y install htop
```

- 解决方案
```
yum -y install epel-release
yum -y install htop
```




---

> 作者:   
> URL: https://cfanzp.com/centos-epel-release/  

