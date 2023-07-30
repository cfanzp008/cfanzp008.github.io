# ubuntu20.04如何配置生成core文件？


<!--more-->
# ubuntu20.04如何配置生成core文件？
在平时的开发过程中很有必要配置生成core文件方便快速定位问题。
## 如何查看是否开启生成core文件？
- 如果值是0说明没有开启
```bash
ulimit -c
0
```

- 开启方法
```
vim /etc/profile
ulimit -c unlimited
```

- 更新配置
```
source /etc/profile
```
- 修改生产core文件路径与名称
```
mkdir /var/core
echo "/var/core/core_%e_%p" > /proc/sys/kernel/core_pattern
```

- 关闭apport自动转储,修改配置文件，enabled 设置为0
```
vim /etc/default/apport
enabled=0
```

## 脚本
```bash
echo "ulimit -c unlimited" | sudo tee -a /etc/profile
sudo source /etc/profile
sudo cp /etc/sysctl.conf /etc/sysctl.conf.bak
echo "kernel.core_pattern=core-%e-%p-%s" | sudo tee -a /etc/sysctl.conf
sudo /sbin/sysctl -p
sudo systemctl disable apport.service
sudo systemctl stop apport.service
```

## 如果是非root用户可能会设置失败，可以参考下面这篇文章
- https://blog.csdn.net/weixin_54178481/article/details/125089769

## 参考
- https://blog.csdn.net/Xiao_brother/article/details/125546025
- https://blog.csdn.net/hejinjing_tom_com/article/details/121908482


---

> 作者:   
> URL: https://cfanzp.com/cpp_core/  

