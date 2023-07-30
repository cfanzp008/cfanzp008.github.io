# redis基础入门


# redis基础入门
## redis是什么?
- Redis 是一个高性能的 key-value 数据库。
- Redis 是完全开源的，遵守 BSD 协议。
- Redis支持数据的持久化，即写入文件保存。
- Redis 支持简单的key-value类型的数据，提供list，set，zset，hash等数据结构的存储。
- Redis 支持数据的备份，即master-slave模式的数据备份。

## 如何下载？
- 例如:下载版本5.0.4
```bash
wget http://download.redis.io/releases/redis-5.0.4.tar.gz
```
- 其它版本下载，访问下面地址获取:
```
http://download.redis.io/releases/
```

## redis相关资源地址有哪些？
- 官网:https://redis.io/
- 官方文档:https://redis.io/documentation
- 中文官方网站:http://redis.cn/
- github地址:https://github.com/redis/redis

## 如何安装？
```bash
tar -xzvf redis-5.0.4.tar.gz
cd redis-5.0.4
make && make test && make install
```

## 如何配置开机启动？
```bash
[root@dev127 redis-5.0.4]# cd utils/
[root@dev127 utils]# ls
build-static-symbols.tcl  corrupt_rdb.c   generate-command-help.rb  hashtable    install_server.sh  redis-copy.rb      redis_init_script.tpl  releasetools          whatisdoing.sh
cluster_fail_time.tcl     create-cluster  graphs                    hyperloglog  lru                redis_init_script  redis-sha1.rb          speed-regression.tcl
[root@dev127 utils]# ./install_server.sh 
Welcome to the redis service installer
This script will help you easily set up a running redis server

Please select the redis port for this instance: [6379] 8001
Please select the redis config file name [/etc/redis/8001.conf] 
Selected default - /etc/redis/8001.conf
Please select the redis log file name [/var/log/redis_8001.log] 
Selected default - /var/log/redis_8001.log
Please select the data directory for this instance [/var/lib/redis/8001] 
Selected default - /var/lib/redis/8001
Please select the redis executable path [/usr/local/bin/redis-server] 
Selected config:
Port           : 8001
Config file    : /etc/redis/8001.conf
Log file       : /var/log/redis_8001.log
Data dir       : /var/lib/redis/8001
Executable     : /usr/local/bin/redis-server
Cli Executable : /usr/local/bin/redis-cli
Is this ok? Then press ENTER to go on or Ctrl-C to abort.
Copied /tmp/8001.conf => /etc/init.d/redis_8001
Installing service...
Successfully added to chkconfig!
Successfully added to runlevels 345!
Starting Redis server...
Installation successful!
[root@dev127 utils]# chkconfig

Note: This output shows SysV services only and does not include native
systemd services. SysV configuration data might be overridden by native
systemd configuration.

If you want to list systemd services use 'systemctl list-unit-files'.
To see services enabled on particular target use
'systemctl list-dependencies [target]'.

jenkins         0:off   1:off   2:off   3:on    4:off   5:on    6:off
netconsole      0:off   1:off   2:off   3:off   4:off   5:off   6:off
network         0:off   1:off   2:on    3:on    4:on    5:on    6:off
redis_8001      0:off   1:off   2:on    3:on    4:on    5:on    6:off
[root@dev127 utils]# 
```
- 修改配置文件/etc/redis/8001.conf
```
#把daemonize no改成daemonize yes
daemonize yes
```

- 启动
```bash
service redis_8001 start
```
- 关闭
```bash
service redis_8001 stop
```

- 成功配置目录
```
Selected config:
Port           : 8001
Config file    : /etc/redis/8001.conf
Log file       : /var/log/redis_8001.log
Data dir       : /var/lib/redis/8001
Executable     : /usr/local/bin/redis-server
Cli Executable : /usr/local/bin/redis-cli
```

## 常用配置

参数 | 作用
--- | ---
daemonize no | 默认不以守护进程的方式运行，yes：启用守护进程
pidfile /var/run/redis_8001.pid | redis pid写入的对应文件
port 8001 | 指定端口 8001
bind 127.0.0.1 | 绑定主机地址
timeout 300 | 客户端闲置读少秒后关闭连接，设置为0则关闭该功能
loglevel notice | 日志级别,可选值:debug,verbose,notice,warning
logfile /var/log/redis_8001.log | 日志文件目录
databases 16 | 数据库数量，默认数据库为0，可以使用SELECT 命令在连接上指定数据库
save 900 1 | 900秒内有1次更新就写入文件，可以多个条件配合
rdbcompression yes | 数据本地存储是否压缩数据库，yes文件小,消耗cpu，no文件大
dbfilename dump.rdb | 指定数据库名为dump.rdb
dir /var/lib/redis/8001 | 指定数据库目录
requirepass foobared123456 | redis密码
maxclients 10000 | 同一时间redis最大客户端连接个数
maxmemory <bytes>  | 同一时间最大客户端连接数，默认无限制，同时打开的客户端连接数为 Redis 进程可以打开的最大文件描述符数，设置0，表示不限制。连接数到达限制时，Redis 会关闭新的连接并向客户端返回 max number of clients reached
appendonly no | 是否在每次更新操作后记录日志，默认情况下是异步的把数据写入磁盘，不开启，可能会在断电时导致一段时间内的数据丢失。因为 redis 本身同步数据文件是按上面 save 条件来同步的，所以有的数据会在一段时间内只存在于内存中。默认为 no。
appendfilename "appendonly.aof" | 指定更新日志文件名
appendfsync everysec |更新日志条件:always,everysec,no
vm-enabled no | 是否启用vm机制
vm-swap-file /tmp/redis.swap | 虚拟内存文件路径
vm-pages 134217728 | swap 文件page数
vm-max-threads 4 | 访问额swap文件线程数
glueoutputbuf yes | 给客户端发包，是否将较小的包合并为一个包发送
activerehashing yes | 是否激活重置哈希
#include /path/to/local.conf | 指定包含其它配置文件，可以在同一主机上多个Redis实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件,没有注释即可。

## redis 如何配置开机启动
- https://blog.csdn.net/yexiaomodemo/article/details/94626231

## 参考
- https://blog.csdn.net/qq_35949344/article/details/109012039?utm_source=app&app_version=5.0.1&code=app_1562916241&uLinkId=usr1mkqgl919blen
- https://blog.csdn.net/weixin_33709590/article/details/91849380
- https://www.cnblogs.com/Sungeek/p/11691231.html


---

> 作者: cfanzp  
> URL: https://cfanzp.com/redis/  

