# 如何在Ubuntu20.04上安装Mysql-Workbench?


<!--more-->
# 如何在Ubuntu20.04上安装Mysql-Workbench?
mysql-workbench是官方出的一款mysql管理工具，个人觉得没有navicat好用，但是最大的优点就是免费。
因为我这里使用的ubuntu版本是比较老的ubuntu20.04,需要在官方网站上下载对应比较老的安装包
## 下载地址
- 官方地址:https://downloads.mysql.com/archives/workbench/
- 我下载的版本地址:
```
https://cdn.mysql.com/archives/mysql-workbench/mysql-workbench-community_8.0.29-1ubuntu20.04_amd64.deb
```

### 下载后安装命令
```
sudo dpkg -i ./mysql-workbench-community_8.0.29-1ubuntu20.04_amd64.deb
```

### 安装报错
- 报错内容
```
正在读取软件包列表... 完成
正在分析软件包的依赖关系树       
正在读取状态信息... 完成       
wget 已经是最新版 (1.20.3-1ubuntu2)。
wget 已设置为手动安装。
您也许需要运行“apt --fix-broken install”来修正上面的错误。
下列软件包有未满足的依赖关系：
 mysql-workbench-community : 依赖: libpcrecpp0v5 (>= 7.7) 但是它将不会被安装
                              依赖: libproj15 (>= 6.3.0) 但是它将不会被安装
                                                           依赖: libzip5 (>= 0.10) 但是它将不会被安装
                                                           E: 有未能满足的依赖关系。请尝试不指明软件包的名字来运行“apt --fix-broken install”(也可以指定一个解决办法)。
```
- 解决方案
```
sudo apt-get  -f install
```

#### 参考链接
- https://www.cnblogs.com/wasi-991017/p/13702313.html


---

> 作者:   
> URL: https://cfanzp.com/ubuntu-mysql-workbench/  

