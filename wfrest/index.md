# c++ wfrest网络框架


<!--more-->

# c++ wfrest网络框架
- github地址:https://github.com/wfrest/wfrest
- gitee地址:https://gitee.com/wfrest/wfrest

## workflow框架
- github:https://github.com/sogou/workflow
- demo:https://blog.51cto.com/u_15175878/2739149

## 编译wfrest库
```bash
cd wfrest
make
sudo make install
```


## 编译workflow库
```bash
cd wfrest/workflow
mkdir build
cd build
cmake ..
make
sudo make install
```

## 使用wfrest库和workflow库
```bash
mkdir wfrest_demo
cp example/01_basic.cc
touch CMakeList.txt
```

## 编写CMakeList.txt
```
cmake_minimum_required(VERSION 3.6)

set(CMAKE_BUILD_TYPE RelWithDebInfo CACHE STRING "build type")

project(wfrest_demo LANGUAGES C CXX)

include_directories(
	/usr/local/include/workflow
	/usr/local/include/wfrest
)

link_directories(/usr/local/lib)
set(CMAKE_C_FLAGS   "${CMAKE_C_FLAGS}   -Wall -fPIC -pipe -std=gnu90")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -fPIC -pipe -std=c++11 -fno-exceptions")

add_executable(01_basic 01_basic.cc)
target_link_libraries(01_basic wfrest workflow)
```

## 编译
```
mkdir build
cd build
cmake ..
make
```

## 测试脚本
```
curl 127.0.0.1:8888/hello
curl 127.0.0.1:8888/data
curl 127.0.0.1:8888/multi
curl 127.0.0.1:8888/post
```


---

> 作者:   
> URL: http://111.230.8.71:8889/wfrest/  

