# ubuntu设置swap分区


<!--more-->
# ubuntu如何设置swap
## 配置命令
```bash
#创建一个空白文件
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
#设置文件权限
sudo chmod 600 /swapfile
#使mkswap实用程序将文件格式化为SWAP空间
sudo mkswap /swapfile
#vim /etc/fstab
/swapfile swap swap defaults 0 0

# 查看swap分区
sudo swapon --show
##或者
sudo free -h

```

## 相关命令
- 查看swap
```bash
sudo swapon --show
```
## 参考
- [如何在 Ubuntu 中创建、删除和调整 SWAP 空间](https://www.sysgeek.cn/ubuntu-swap-size/)


---

> 作者:   
> URL: http://111.230.8.71:8889/ubuntu-swap/  

