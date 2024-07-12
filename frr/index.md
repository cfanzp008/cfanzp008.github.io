# frr学习笔记


<!--more-->
# frr学习笔记
最近在学习frr的基本用法，这里记录一下。
## frr的安装
- ubuntu安装方法
```bash
sudo apt-get install
```

## frr的使用
我使用的是frr版本8.1和frr10.0,其它同学用的是frr7.5的版本环境是centos,我的应用环境是ubuntu,在测试时发现有些命令会有点对不上。经过验证发现7.5版本与8.1+版本的frr生成的配置文件确实存在差异。
- 主要配置文件/etc/frr/frr.conf
- 启动命令
```bash
systemctl start frr
```

## frr命令
### bgp命令
```bash
show ip bgp [x.x.x.x](longer)
show ip bgp summary
show ip route [x.x.x.x](longer)
show ip bgp neighbor [x.x.x.x]
show ip bgp neighbor [x.x.x.x] advertised-routes
show ip bgp neighbor [x.x.x.x] received-routes
```


## 同步静态路由到frr
在使用frr的时候我们发现，如果静态路由不驾到frr里的话，使用frr的bgp,邻居就学习不到路由信息。
开始我在内核和frr中分别加了一遍，测试发现这样有些路由frr学习不到。
后来发现了原因是frr本身会把路由信息添加到内核中去。
但是我们又遇到了新的问题就是frr不支持路由的优先级设置。
用的版本是frr7.5.1查看官网的命令手册也不支持。
后来我们通过修改frr7.2.1的源码。

## 参考
- frr官网：https://docs.frrouting.org/en/latest/static.html
- [FRR搭建简单BGP网络环境](https://blog.csdn.net/turbock/article/details/103869047)


---

> 作者:   
> URL: https://cfanzp.com/frr/  

