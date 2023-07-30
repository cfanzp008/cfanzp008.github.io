# skynet-actor模型


<!--more-->
# skynet-actor模型
skynet是使用c语言实现了一套actor模型，那么什么是actor模型呢？

## actor模型简介
erlang将actor称之为“进程”,在代码层面考虑并发性。
- actor模型用于并行计算
- actor是最小的计算单元
- 基于消息设计
- actor之间相互隔离

## skynet中的actor
### skynet用框架实现actor模型
- 启动多个并发actor
- actor之间通过消息进行沟通
- actor拥有私有消息队列，存储有序的消息
- actor通过回掉来消耗消息

### skynet中的actor是什么样的结构
```
struct skynet_context // 具体可以参看skynet源码
```

### skynet中开启了哪些线程，工作线程具体的任务是什么？
- timer线程
- socket线程
- monitor线程 检查服务消息过载
- worker线程

### skynet中的actor是怎么运行的，消息如何调度？
- 消息队列(全局消息队列，actor消息队列)
    - 全局消息队列存储有消息的actor

### 消息是如何生产消费的？
#### 生产
- actor之间发送消息
- 定时器向actor发送消息
- 信号向actor发送消息
- socket向actor发送消息

#### 消费
- skynet callback回调来消费消息

### c语言的actor
- logger服务

### lua语言的actor
- lua虚拟机
- service_snlua.c来加载lua服务


---

> 作者:   
> URL: https://cfanzp.com/skynet-actor/  

