# redis缓存击穿,缓存穿透以及缓存雪崩问题


<!--more-->
# redis缓存击穿,缓存穿透以及缓存雪崩问题
## 什么是redis缓存击穿？
title: "redis缓存击穿,缓存穿透以及缓存雪崩问题"
- redis缓存击穿指的是某个key在redis中的值在某个点过期了或之前没人访问过，导致请求被转移到数据库层。这样会使数据的压力过大。

## 如何解决redis缓存击穿问题？
- 可以通过互斥锁来解决。使并发的请求串行化。
```
public String get(key) {
    String value = redis.get(key);
    if (value == null) { //代表缓存值过期
        //设置3min的超时，防止del操作失败的时候，下次缓存过期一直不能load db
        if (redis.setnx(key_mutex, 1, 3 * 60) == 1) {  //代表设置成功
            value = db.get(key);
            redis.set(key, value, expire_secs);
            redis.del(key_mutex);
        } else {  //这个时候代表同时候的其他线程已经load db并回设到缓存了，这时候重试获取缓存值即可
            sleep(50);
            get(key);  //重试
        }
    }
    return value;
}
```
- 可以利用逻辑过期解决问题。

## 与缓存穿透的区别
- 缓存穿透是数据库里面没有这个数据，而缓存击穿是数据库里有数据。
- 缓存穿透解决方案是使用布隆过滤器来解决。

## redis缓存雪崩
- redis缓存雪崩时指，redis里的key在某一时间大量失效，导致大量请求打到数据库上。
- 解决方案是让key设置不同的过期时间，让它在不同的时间点过期。

## 参考
- https://www.cnblogs.com/lvdeyinBlog/p/15774412.html
- https://blog.csdn.net/weixin_53604412/article/details/129057686
- https://blog.csdn.net/m0_57116438/article/details/122899810


---

> 作者:   
> URL: https://cfanzp.com/redis-nocache/  

