# redis基础


<!--more-->

# redis基础
## redis 与其它的key-value存储有什么不同？
- redis具有更加复杂的数据结构并且支持原子性操作。
- redis支持持久化到磁盘。

## redis与MemCached相比有哪些优势？
- redis比MemCached快。
- redis能够持久化道磁盘，MemCached不支持。
- redis支持更复杂的数据机构,MemCached所有值都是简单的字符串。

## redis是单进程单线程的？
- redis是单进程单线程的，通过队列技术将并发的访问转化为串行访问。消除了传统数据库的穿行开销。

## 参考
- https://developer.aliyun.com/article/852976
- https://zhuanlan.zhihu.com/p/427496556


---

> 作者:   
> URL: https://cfanzp.com/redis-question/  

