# skynet-debug_console 简介

# skynet debug_console 简介
## skynet 自带了一个调试控制台服务。
```
   skynet.newservice("debug_console",8000)
```
   1. 这里的示例是监听 8000 端口，你可以修改成别的端口。
   2. 出于安全考虑，调试控制台只能监听本地地址 127.0.0.1。
   3. 所以如果需要远程使用，需要先登录到本机，然后再连接。

## 可以用 telnet 或 nc 登录调试控制台。启动后会显示
   - Welcome to skynet console 表示连接成功。
   - 由于 skynet 使用自己的 IO 库，所以很难把 libreadline 接入（不能在 readline 的 hook 中 yield）。
   - 如果你希望在控制台中使用 readline 的 history 等特性，可以自己使用 rlwrap 。
   - 输入 help 可以列出目前支持的所有指令。
   - 这份文档可能落后于实际版本，所以应以 help 列出的指令为准。

## 命令的一般格式是 命令 地址 ，有些命令不带地址，会针对所有的服务。
   - 当输入地址时，可以使用 :00000001 这样的格式指代一个服务地址.
   - 服务地址：由冒号开头的8位16进制数字，
   - 前面两个数字的 harbor id，
   - 01000001 可以简写为 1 。
   - 所有活动的服务可以输入 list 列出。

## 常用的针对所有 lua 服务的指令有：
   命令    | 作用
   :--     | :--
   list    | 列出所有服务，以及启动服务的命令参数。
   gc      | 强制让所有 lua 服务都执行一次垃圾回收，并报告回收后的内存。
   mem     | 让所有 lua 服务汇报自己占用的内存。（注：它只能获取 lua 服务的 lua vm 内存占用情况，如果需要 C 模块中内存使用报告，请参考 MemoryHook 。
   stat    | 列出所有 lua 服务的消息队列长度，以及被挂起的请求数量，处理的消息总数。如果在 Config 里设置 profile 为 true ，还会报告服务使用的 cpu 时间。
   service | 列出所有的唯一 lua 服务。并显示出请求还不存在的服务被挂起的请求。
   netstat | 列出网络连接的概况。

   - 注意，由于这些指令是挨个向每个服务发送消息并等待回应，所以当某个 lua 服务过载时，可能需要等待很长时间才有返回。

## 针对单个 lua 服务的指令有：

   命令                  | 作用
   :--                   | :--
   exit address          | 让一个 lua 服务退出。
   kill address          | 强制中止一个 lua 服务。
   info address          | 让一个 lua 服务汇报自己的内部信息，参见 Profile 。
   signal address sig    | 向服务发送一个信号，sig 默认为 0 。 当一个服务陷入死循环时，默认信号会打断正在执行的 lua 字节码，并抛出 error 显示调用栈。这是针对 endless loop 的 log 的有效调试方法。注：这里的信号并非系统信号。
   task address          | 显示一个服务中所有被挂起的请求的调用栈。
   debug address         | 针对一个 lua 服务启动内置的单步调试器。http://blog.codingnow.com/2015/02/skynet_debugger.html
   logon/logoff address  | 记录一个服务所有的输入消息到文件。需要在 Config 里配置 logpath 。
   inject address script | 将 script 名字对应的脚本插入到指定服务中运行（通常可用于热更新补丁）。
   call address          | 调用一个服务的lua类型接口，格式为: call address "foo", arg1, ... 注意接口名和string型参数必须加引号,且以逗号隔开, address目前支持服务名方式。

## 使用举例
### list
   ```
   list
   :00000004       snlua cdummy
   :00000006       snlua datacenterd
   :00000007       snlua service_mgr
   :00000009       snlua clusterd
   :0000000a       snlua clustersender centernode mybonline130153 192.168.0.40 7002
   :0000000b       snlua debug_console 7701
   :0000000c       snlua redis_mgr
   :0000000d       snlua mysql_mgr
   :0000000e       snlua mysql_agent 1
   :0000000f       snlua mysql_agent 2
   :00000010       snlua mysql_agent 3
   :00000011       snlua dbservice
   :00000012       snlua gate
   :00000013       snlua dbservice_agent 1
   :00000014       snlua dbservice_agent 2
   :00000015       snlua dbservice_agent 3
   :00000016       snlua clusteragent 9 18 8
   :00000017       snlua clusteragent 9 18 9
   :00000018       snlua clusteragent 9 18 11
   :00000019       snlua clustersender gate1node mybonline130153 192.168.0.40 7005
   <CMD OK>
   ```

### stat
   ```
   stat
   :00000004       cpu:0.000648    message:9       mqlen:0 task:0
   :00000006       cpu:0.000417    message:7       mqlen:0 task:0
   :00000007       cpu:0.001085    message:27      mqlen:0 task:0
   :00000009       cpu:0.00093     message:27      mqlen:0 task:0
   :0000000a       cpu:0.001511    message:15      mqlen:0 task:1
   :0000000b       cpu:0.005971    message:36      mqlen:0 task:1
   :0000000c       cpu:0.002868    message:90      mqlen:0 task:1
   :0000000d       cpu:0.586735    message:32433   mqlen:0 task:0
   :0000000e       cpu:1.041848    message:16828   mqlen:0 task:2
   :0000000f       cpu:1.045539    message:16767   mqlen:0 task:2
   :00000010       cpu:1.054712    message:17290   mqlen:0 task:2
   :00000011       cpu:0.568066    message:32442   mqlen:0 task:0
   :00000012       cpu:0.34314     message:20203   mqlen:0 task:0
   :00000013       cpu:0.549106    message:10815   mqlen:0 task:0
   :00000014       cpu:0.541082    message:10834   mqlen:0 task:0
   :00000015       cpu:0.550082    message:10868   mqlen:0 task:0
   :00000016       cpu:0.000717    message:9       mqlen:0 task:0
   :00000017       cpu:0.677452    message:32350   mqlen:0 task:0
   :00000018       cpu:0.002423    message:80      mqlen:0 task:0
   :00000019       cpu:0.003337    message:81      mqlen:0 task:1
   <CMD OK>
   ```

### info
   ```
   info d
{
      agent_index_ = 1,
      balance_ = {},
      mysql_agent_count_ = 3
}
<CMD OK>
```

###  task
```
task e
22527   stack traceback:
[C]: in function 'skynet.profile.yield'
skynet/lualib/skynet.lua:141: in function <skynet/lualib/skynet.lua:113>
22530   stack traceback:
[C]: in function 'skynet.profile.yield'
skynet/lualib/skynet.lua:244: in upvalue 'suspend_sleep'
skynet/lualib/skynet.lua:270: in function 'skynet.wait'
skynet/lualib/skynet/socketchannel.lua:127: in upvalue 'pop_response'
skynet/lualib/skynet/socketchannel.lua:167: in function <skynet/lualib/skynet/socketchannel.lua:165>
[C]: in function 'pcall'
skynet/lualib/skynet/socketchannel.lua:303: in upvalue 'f'
skynet/lualib/skynet.lua:141: in function <skynet/lualib/skynet.lua:113>
<CMD OK>
```

### call
```
:0000002f       snlua luckyshop_service
:00000030       snlua luckyshop_agent 1
total_count     4
<CMD OK>
call 30 "reload"
n       0
<CMD OK>
```

### clearcache
```
clearcache
<CMD OK>
```

### service
```
service
clusterd        :00000009
debug_console   :0000000b
mysql_mgr       :0000000d
redis_mgr       :0000000c
<CMD OK>
```

### exit
```
list
:00000004       snlua cdummy
:00000006       snlua datacenterd
:00000007       snlua service_mgr
:00000009       snlua clusterd
:0000000a       snlua clustersender centernode dev1273031 192.168.2.127 7002
:0000000b       snlua debug_console 7310
:0000000c       snlua gateservice
:0000000d       snlua forward_service
:0000000e       snlua wsgate
:0000000f       snlua node_service
:00000010       snlua node_agent 1
:00000011       snlua gate
:00000012       snlua clustersender loginnode dev1273031 192.168.2.127 7001
:00000013       snlua clusteragent 9 17 6
:00000014       snlua clustersender lobbynode dev1273031 192.168.2.127 7003
:00000017       snlua clustersender matchnode dev1273031 192.168.2.127 7201
:00000018       snlua clusteragent 9 17 11
:00000036       snlua clustersender recreationnode dev1273031 192.168.2.127 7401
:00000039       snlua clusteragent 9 17 30
:00000040       snlua clustersender paynode dev1273031 192.168.2.127 7008
:00000042       snlua clusteragent 9 17 41
:0000009a       snlua clusteragent 9 17 69
<CMD OK>
exit 10
<CMD OK>
list
:00000004       snlua cdummy
:00000006       snlua datacenterd
:00000007       snlua service_mgr
:00000009       snlua clusterd
:0000000a       snlua clustersender centernode dev1273031 192.168.2.127 7002
:0000000b       snlua debug_console 7310
:0000000c       snlua gateservice
:0000000d       snlua forward_service
:0000000e       snlua wsgate
:0000000f       snlua node_service
:00000011       snlua gate
:00000012       snlua clustersender loginnode dev1273031 192.168.2.127 7001
:00000013       snlua clusteragent 9 17 6
:00000014       snlua clustersender lobbynode dev1273031 192.168.2.127 7003
:00000017       snlua clustersender matchnode dev1273031 192.168.2.127 7201
:00000018       snlua clusteragent 9 17 11
:00000036       snlua clustersender recreationnode dev1273031 192.168.2.127 7401
:00000039       snlua clusteragent 9 17 30
:00000040       snlua clustersender paynode dev1273031 192.168.2.127 7008
:00000042       snlua clusteragent 9 17 41
:0000009a       snlua clusteragent 9 17 69
```

---
- 扫描下方二维码，关注我的公众号，获取更多技术方面的知识
- ![技术分享](/images/gzh.jpeg)



---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/debug_console/  

