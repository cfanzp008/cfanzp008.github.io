# ubuntu20.04中使用redis-plus-plus-1.3.8


<!--more-->
# ubuntu20.04中使用redis-plus-plus-1.3.8
## 安装hiredis
```bash
cd /usr/local/src/
proxychains wget https://github.com/redis/hiredis/archive/refs/tags/v1.1.0.tar.gz
tar -xzvf v1.1.0.tar.gz
cd hiredis-1.1.0/
make && make install
```

## 安装redis-plus-plus-1.3.8
```bash
cd /usr/local/src/
proxychains wget https://github.com/sewenew/redis-plus-plus/archive/refs/tags/1.3.8.tar.gz
mv 1.3.8.tar.gz redis-plus-plus-1.3.8.tar.gz
tar -xzvf redis-plus-plus-1.3.8.tar.gz
cd redis-plus-plus-1.3.8/
mkdir build
cd build/
cmake ..
make && make install
```

## 编写demo程序
```c++
#include <iostream>
#include <sw/redis++/redis++.h>
using namespace sw::redis;

// https://github.com/sewenew/redis-plus-plus/tree/1.3.8#use-redis-plus-plus-in-your-project
int main() {
    try {
        auto redis = Redis("tcp://127.0.0.1:6379");
        redis.set("config","/etc/redis.conf");
        auto val = redis.get("config");
        if (val) {
            std::cout << "config:" << * val<< std::endl;
        }
    } catch (...) {
        std::cout << "exception" << std::endl;
    }
    return 0;
}
```

## 编译
- use static-lib
```bash
g++ -std=c++17 -o demo_static_lib.exe demo.cpp -I/usr/local/include/ /usr/local/lib/libredis++.a /usr/local/lib/libhiredis.a -pthread
```

- use share-lib
```bash
g++ -std=c++17 -o demo_share_lib.exe demo.cpp -lredis++ -lhiredis -pthread
```


---

> 作者:   
> URL: http://111.230.8.71:8889/redis-plus-plus/  

