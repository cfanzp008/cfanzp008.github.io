# skynet-skynet目录结构

# 【skynet学习笔记】skynet的目录结构
## skynet目录结构
- 学习skynet必须先了解一下skynet的目录结构。
- skynet的目录结构十分清晰，一目了然。
- 下面来具体看看各个目录。
```
[root@lzw skynet]# tree -f -L 1
.
├── ./3rd
├── ./cservice
├── ./examples
├── ./HISTORY.md
├── ./LICENSE
├── ./luaclib
├── ./lualib
├── ./lualib-src
├── ./Makefile
├── ./platform.mk
├── ./README.md
├── ./service
├── ./service-src
├── ./skynet
├── ./skynet-src
└── ./test
```
## 目录结构分析
### 3rd目录
- ./3rd：存放第三方库里面包括了:jemalloc,lpeg,lua,lua-md5
- jemalloc:是个内存管理库，可以提高内存是利用率，减少内存碎片。skynet中可以通过编译选项来决定是否使用这个库。
- lpeg:是一个模式匹配库。
- lua:lua源代码，目前skynet1.5.0用的lua版本是5.4.4。
- lua-md5:一个lua的md5库。
```
[root@lzw skynet]# tree -f -L 1 3rd/
3rd
├── 3rd/jemalloc
├── 3rd/lpeg
├── 3rd/lua
└── 3rd/lua-md5
```

### cservice目录
- cservice目录存放c语言实现的skynet服务
```
[root@lzw skynet]# tree -f -L 1 cservice/
cservice
├── cservice/gate.so
├── cservice/harbor.so
├── cservice/logger.so
└── cservice/snlua.so
```

- examples：存放skynet的一些官方的例子，这里不展开介绍了，后面会逐个分析一下各个例子。
```
[root@lzw skynet]# tree -f -L 1 examples/
examples
├── examples/abort.lua
├── examples/agent.lua
├── examples/checkdeadloop.lua
├── examples/client.lua
├── examples/cluster1.lua
├── examples/cluster2.lua
├── examples/clustername.lua
├── examples/config
├── examples/config.c1
├── examples/config.c2
├── examples/config_log
├── examples/config.login
├── examples/config.mc
├── examples/config.mongodb
├── examples/config.mysql
├── examples/config.path
├── examples/config.userlog
├── examples/globallog.lua
├── examples/injectlaunch.lua
├── examples/login
├── examples/main_log.lua
├── examples/main.lua
├── examples/main_mongodb.lua
├── examples/main_mysql.lua
├── examples/preload.lua
├── examples/protoloader.lua
├── examples/proto.lua
├── examples/share.lua
├── examples/simpledb.lua
├── examples/simplemonitor.lua
├── examples/simpleweb.lua
├── examples/simplewebsocket.lua
├── examples/userlog.lua
└── examples/watchdog.lua
```

### luaclib目录
- luaclib目录存放.so库
```
[root@lzw skynet]# tree -f -L 1 luaclib/
luaclib
├── luaclib/bson.so
├── luaclib/client.so
├── luaclib/clientws.so
├── luaclib/lpeg.so
├── luaclib/ltls.so
├── luaclib/md5.so
├── luaclib/mysqlaux.so
├── luaclib/skynet.so
├── luaclib/sproto.so
└── luaclib/wsnetpack.so
```

### lualib目录
- 存放skynet的lua库
```
[root@lzw skynet]# tree lualib -L 1
lualib
├── compat10
├── http
├── loader.lua
├── md5.lua
├── skynet
├── skynet.lua
├── snax
├── sprotoloader.lua
├── sproto.lua
└── sprotoparser.lua
```

### lualib-src目录
- 存放skynetlua库的源码
```
[root@lzw skynet]# tree -f -L 1 lualib-src
lualib-src
├── lualib-src/lsha1.c
├── lualib-src/ltls.c
├── lualib-src/lua-bson.c
├── lualib-src/lua-clientsocket.c
├── lualib-src/lua-clientwebsocket.c
├── lualib-src/lua-cluster.c
├── lualib-src/lua-crypt.c
├── lualib-src/lua-datasheet.c
├── lualib-src/lua-debugchannel.c
├── lualib-src/lua-memory.c
├── lualib-src/lua-mongo.c
├── lualib-src/lua-multicast.c
├── lualib-src/lua-mysqlaux.c
├── lualib-src/lua-netpack.c
├── lualib-src/lua-profile.c
├── lualib-src/lua-seri.c
├── lualib-src/lua-seri.h
├── lualib-src/lua-sharedata.c
├── lualib-src/lua-sharetable.c
├── lualib-src/lua-skynet.c
├── lualib-src/lua-socket.c
├── lualib-src/lua-stm.c
├── lualib-src/lua-websocketnetpack.c
└── lualib-src/sproto
```

### service目录
- service目录存放一些lua实现的skynet服务
```
[root@lzw skynet]# tree -f -L 1 service
service
├── service/bootstrap.lua
├── service/cdummy.lua
├── service/clusteragent.lua
├── service/clusterd.lua
├── service/clusterproxy.lua
├── service/clustersender.lua
├── service/cmaster.lua
├── service/cmemory.lua
├── service/console.lua
├── service/cslave.lua
├── service/datacenterd.lua
├── service/dbg.lua
├── service/debug_agent.lua
├── service/debug_console.lua
├── service/gate.lua
├── service/launcher.lua
├── service/multicastd.lua
├── service/service_cell.lua
├── service/service_mgr.lua
├── service/service_provider.lua
├── service/sharedatad.lua
├── service/snaxd.lua
└── service/wsgate.lua
```

### service-src目录
- service-src目录存放c语言写的服务的源码
```
[root@lzw skynet]# tree -f -L 1 service-src
service-src
├── service-src/databuffer.h
├── service-src/hashid.h
├── service-src/service_gate.c
├── service-src/service_harbor.c
├── service-src/service_logger.c
└── service-src/service_snlua.c
```

### skynet-src目录
- skynet-src目录存放skynet的核心c语言源码
```
[root@lzw skynet]# tree -f -L 1 skynet-src
skynet-src
├── skynet-src/atomic.h
├── skynet-src/malloc_hook.c
├── skynet-src/malloc_hook.h
├── skynet-src/rwlock.h
├── skynet-src/skynet_daemon.c
├── skynet-src/skynet_daemon.h
├── skynet-src/skynet_env.c
├── skynet-src/skynet_env.h
├── skynet-src/skynet_error.c
├── skynet-src/skynet.h
├── skynet-src/skynet_handle.c
├── skynet-src/skynet_handle.h
├── skynet-src/skynet_harbor.c
├── skynet-src/skynet_harbor.h
├── skynet-src/skynet_imp.h
├── skynet-src/skynet_log.c
├── skynet-src/skynet_log.h
├── skynet-src/skynet_main.c
├── skynet-src/skynet_malloc.h
├── skynet-src/skynet_module.c
├── skynet-src/skynet_module.h
├── skynet-src/skynet_monitor.c
├── skynet-src/skynet_monitor.h
├── skynet-src/skynet_mq.c
├── skynet-src/skynet_mq.h
├── skynet-src/skynet_server.c
├── skynet-src/skynet_server.h
├── skynet-src/skynet_socket.c
├── skynet-src/skynet_socket.h
├── skynet-src/skynet_start.c
├── skynet-src/skynet_timer.c
├── skynet-src/skynet_timer.h
├── skynet-src/socket_buffer.h
├── skynet-src/socket_epoll.h
├── skynet-src/socket_info.h
├── skynet-src/socket_kqueue.h
├── skynet-src/socket_poll.h
├── skynet-src/socket_server.c
├── skynet-src/socket_server.h
└── skynet-src/spinlock.h
```

### test目录
- test目录存放skynet的测试代码
```
[root@lzw skynet]# tree -f -L 1 test
test
├── test/pingserver.lua
├── test/sharemap.sp
├── test/testbson.lua
├── test/testcoroutine.lua
├── test/testcrypt.lua
├── test/testdatacenter.lua
├── test/testdatasheet.lua
├── test/testdeadcall.lua
├── test/testdeadloop.lua
├── test/testdns.lua
├── test/testecho.lua
├── test/testendless.lua
├── test/testharborlink.lua
├── test/testhttp.lua
├── test/testmemlimit.lua
├── test/testmongodb.lua
├── test/testmulticast2.lua
├── test/testmulticast.lua
├── test/testmysql.lua
├── test/testoverload.lua
├── test/testping.lua
├── test/testpipeline.lua
├── test/testqueue.lua
├── test/testredis2.lua
├── test/testrediscluster.lua
├── test/testredis.lua
├── test/testresponse.lua
├── test/testselect.lua
├── test/testservice
├── test/testsha.lua
├── test/testsharetable.lua
├── test/testsm.lua
├── test/testsocket.lua
├── test/teststm.lua
├── test/testterm.lua
├── test/testtimeout.lua
├── test/testtimer.lua
├── test/testtobeclosed.lua
├── test/testudp.lua
└── test/time.lua
```

## 总结
- 以上粗略地介绍了一下skynet的目录结构。后续会逐个分析一下每个目录里的文件以及作用。
- 在使用skynet进行开发的时候，我们最好不要在skynet这几个目录同级目录建立自己的项目，而是在他的上级目录去创建一个文件夹来包含skynet框架的代码，这样方便我们去更新和维护skynet的源代码。
- 在某些时候需要对skynet进行扩展时，最好不要直接修改代码，而是以新的模块的方式去扩展，这样更方便日后同步更新skynet框架。


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/skynet_dir/  

