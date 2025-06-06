# Centos如何关闭交换分区Swap


<!--more-->
# Centos如何关闭交换分区Swap
Centos的swap分区在开启的情况下，可能会导致性能下降，在使用k8s时，要求关闭swap
## 环境
- OS
```
[root@dev127 paoshang]# cat /etc/redhat-release 
CentOS Linux release 7.9.2009 (Core)
```

### 关闭swap分区
```
swapoff -a
```

### 修改配置文件/etc/fstab,删除swap相关的行
```
[root@dev127 paoshang]# cat /etc/fstab
```bash
#
# /etc/fstab
# Created by anaconda on Tue Jun  9 19:47:48 2020
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
UUID=4541be7b-65a9-45f2-983a-8439a534b99c /                       xfs     defaults        0 0
UUID=d30bfeaa-770a-43b4-8567-a9fa4e221786 /boot                   xfs     defaults        0 0
#UUID=16cc8806-a33e-4a65-b118-e3338ebba38d swap                    swap    defaults        0 0
/dev/sdb /data ext4 defaults 0 0
```

### 确认swap已经关闭
```
free -m
```

### 调整swappiness参数
```
echo 0 > /proc/sys/vm/swappiness
vim /etc/sysctl.conf
vm.swappiness=0
```

- 使修改生效
```
sysctl -p


## 参考
- https://www.cnblogs.com/larrypeng/p/11950498.html
```


---

> 作者:   
> URL: http://111.230.8.71:8889/centos-swap/  

