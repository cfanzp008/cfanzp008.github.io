# mysql基础


<!--more-->
# mysql基础
## 知识点
### 索引
### 存储引擎
### bin log/redo log/undo log
### mysql架构
### 分库分表
#### 水平分库分表
#### 垂直分库分表
### 分区表
### 查询语句以及更新语句的执行过程
### exists和in的区别
### having和where的区别
### 什么是主从同步，为什么要做主从同步
### 乐观锁与悲观锁
### processlist是什么？
### MySQL的索引是怎么实现的？答案是B+树
- MySQL索引: https://developer.aliyun.com/article/1113775
- MySQL索引详解: https://developer.aliyun.com/article/831250

### 事务
### MySQL有哪几种锁？
- 表级锁
- 行级锁
- 页面锁

### 日常工作中是如何优化SQL的？
- 建索引,加快查询，空间换时间
- 分库分表
- 避免返回不必要的数据，比如select * 改为select需要的字段
- 主从架构，提升读性能
- 适当分批进行查询
- 数据库中的字段设计的时候可尽可能占用空间少
- 尽量把字段设置为NOT NULL
- 使用UNION来代替手动创建的临时表
- 避免函数索引
- 用IN来代替OR
- 用LIKE双%的时候无法使用到索引。

## 参考
- 大厂常考的MySQL高频面试题: https://developer.aliyun.com/article/848754
- MySQL面试60题: https://zhuanlan.zhihu.com/p/59838091


---

> 作者:   
> URL: http://111.230.8.71:8889/mysql-question/  

