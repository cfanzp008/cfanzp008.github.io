# RedisBloom安装与使用


<!--more-->
# RedisBloom安装与使用
RedisBloom模块提供了四种数据类型：
  - Bloom Filter (布隆过滤器)
  - Cuckoo Filter（布谷鸟过滤器）
  - Count-Mins-Sketch
  - Top-K

Bloom Filter和 Cuckoo 用于确定（以给定的确定性）集合中是否存在某项。

使用 Count-Min Sketch 来估算子线性空间中的项目数。

使用Top-K 维护K个最频繁项目的列表。

## 作用
RedisBloom能够解决缓存穿透的问题。
- 参考链接: http://c.biancheng.net/redis/cache.html

## 下载地址
- https://github.com/RedisBloom/RedisBloom#building-and-loading-redisbloom
```
git clone https://github.com/RedisBloom/RedisBloom.git
```

### 编译redisbloom
```
make
```

## 编译报错
```
deps/readies/mk/main:6: *** GNU Make version is too old. Aborting..  Stop.
```

#### 原因:make版本太低需要make>=4
- 下载make: http://mirrors.ustc.edu.cn/gnu/make/
- 参考: https://blog.csdn.net/CLinuxF/article/details/108705142
```bash
wget http://mirrors.ustc.edu.cn/gnu/make/make-4.4.tar.gz
tar -xzvf make-4.4.tar.gz
./configure --prefix=/usr/local/make
make
make install
ln -s /usr/local/make/bin/make /usr/bin/make
```

#### 修改redis配置文件redis.conf,添加如下内容
```
loadmodule /opt/RedisBloom/bin/linux-x64-release/redisbloom.so
```

#### 官方文档
- https://redis.io/docs/stack/bloom/quick_start/

#### 测试布隆过滤器
```
192.168.2.127:8001> BF.ADD testusers dev1
(integer) 1
192.168.2.127:8001> BF.EXISTS testusers dev2
(integer) 0
192.168.2.127:8001> BF.EXISTS testusers dev1
(integer) 1
```

### 测试布谷鸟过滤器
```
192.168.2.127:8001> CF.EXISTS newCuckooFilter foo
(integer) 0
192.168.2.127:8001> CF.RESERVE newCuckooFilter 1000
OK
192.168.2.127:8001> CF.ADD newCuckooFilter foo
(integer) 1
192.168.2.127:8001> CF.EXISTS newCuckooFilter foo
(integer) 1
192.168.2.127:8001> CF.EXISTS newCuckooFilter notpresent
(integer) 0
192.168.2.127:8001> CF.DEL newCuckooFilter foo
(integer) 1
192.168.2.127:8001> CF.EXISTS newCuckooFilter foo
(integer) 0
```

## 参考
- https://www.cnblogs.com/yaopengfei/p/13928512.html
- https://redis.io/docs/stack/bloom/quick_start/
- https://redis.io/docs/stack/bloom/
- https://github.com/RedisBloom/


---

> 作者:   
> URL: https://cfanzp.com/redis-bloom/  

