# skynet 更新记录


## skynet升级到1.5.0
- skynet升级到1.5.0
- 对应lua版本:lua5.4.3

## skynet地址
- https://github.com/cloudwu/skynet/releases/tag/v1.5.0
- 下载地址:https://github.com/cloudwu/skynet/archive/refs/tags/v1.5.0.tar.gz
- 加速地址:https://github.91chi.fun//https://github.com//cloudwu/skynet/archive/refs/tags/v1.5.0.tar.gz

## 升级步骤
- 创建分支skynet1.5
- 删除skynet目录的所有文件，解压或同步skynet1.5.0的代码到skynet目录
```bash
rm ./skynet/* -rf
```
- 初始化skynet
```bash
git submodule update --init
```

- jemalloc库若未初始化成功,可手动克隆到3rd/jemalloc目录中
```bash
git clone https://gitee.com/mirrors/jemalloc.git
```


## 编译报错
```
skynet-src/spinlock.h:50:23: fatal error: stdatomic.h: No such file or directory
升级Gcc值4.9及以上版本
```

## gcc多版本共存。
- devtoolset对应gcc版本
```
devtoolset-3对应gcc4.x.x版本
devtoolset-4对应gcc5.x.x版本
devtoolset-6对应gcc6.x.x版本
devtoolset-7对应gcc7.x.x版本
devtoolset-8对应gcc8.x.x版本
devtoolset-9对应gcc9.x.x版本
devtoolset-10对应gcc10.x.x版本
```

- https://www.cnblogs.com/jixiaohua/p/11732225.html
```bash
sudo yum install centos-release-scl
```
- 安装devtoolset，注意，如果想安装11.*版本的，就改成devtoolset-11-gcc*
```bash
sudo yum install devtoolset-11-gcc*
```
- 激活对应的devtoolset，可以一次安装多个版本的devtoolset，需要的时候用下面这条命令切换到对应的版本
- 这仅仅在当前bash生效，如果需要永久生效，可以请自行添加环境变量。
```bash
scl enable devtoolset-11 bash
#或
source /opt/rh/devtoolset-8/enable
```
- gcc版本永久生效
```bash
echo "source /opt/rh/devtoolset-11/enable" >>/etc/profile
```
- 查看gcc版本号
```bash
gcc -v
```

## gcc安装报错
- 报错问题:
```
Transaction check error:
file /usr/lib/debug/usr/lib64/libitm.so.1.0.0.debug from install of devtoolset-8-gcc-debuginfo-8.3.1-3.2.el7.x86_64 conflicts with file from package gcc-base-debuginfo-4.8.5-39.el7.x86_64
file /usr/lib/debug/usr/lib64/libatomic.so.1.debug from install of devtoolset-8-gcc-debuginfo-8.3.1-3.2.el7.x86_64 conflicts with file from package gcc-debuginfo-4.8.5-39.el7.x86_64
file /usr/lib/debug/usr/lib64/libtsan.so.0.0.0.debug from install of devtoolset-8-gcc-debuginfo-8.3.1-3.2.el7.x86_64 conflicts with file from package gcc-debuginfo-4.8.5-39.el7.x86_64
```
- 解决方案
```bash
yum remove gcc-base-debuginfo-4.8.5-39.el7.x86_64
```


## skynet服务启动报错
```bash
[root@dev127 myb_dev]# sh/test/debug_test.sh 
try open snlua failed : luaclib/snlua.so: cannot open shared object file: No such file or directory
[:00000000] Bootstrap error : snlua bootstrap
```

- ./skynet example/config 报错
```bash
[root@dev127 skynet]# ./skynet examples/config
try open snlua failed : ./cservice/snlua.so: undefined symbol: lua_resetthread
[:00000000] Bootstrap error : snlua bootstrap
```
- 解决方案
```bash
make clean
make all
```

## 源码安装gcc11.2.0
- https://blog.csdn.net/qq_41054313/article/details/119453611
- https://blog.csdn.net/skykingf/article/details/120701069


## skynet升级改动文件
文件                                     | 修改
---                                      | ---
skynet/service-src/service_logger.c      | * 添加文件日志及转储功能。
skynet/lualib-src/lua-clientwebsocket.c  | +
skynet/lualib-src/lua-mysqlaux.c         | +
skynet/lualib-src/lua-profile.c          | +
skynet/lualib-src/lua-websocketnetpack.c | +
skynet/lualib/snax/wsgateserver.lua      | +
skynet/service/debug_console.lua         | * 添加ag等命令
skynet/service/wsgate.lua                | +
skynet/Makefile                          | * 添加 wsnetpack.so等库


---

> 作者: cfanzp  
> URL: https://cfanzp.com/skynet-update-log/  

