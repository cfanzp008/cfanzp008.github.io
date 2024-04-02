# nginx集成ModSecurity(未完)


<!--more-->
# nginx集成ModSecurity(未完)
## 准备工作
- 下载nginx:1.24.0
- 下载nginx-ModSecurity:v1.0.5
- 下载ModSecurity:v3
```
git clone https://github.com/SpiderLabs/ModSecurity
cd ModSecurity
# 下载 libInjection
git submodule init
git submodule update
./build.sh
./configure && make && make install
```

- coreruleset v3.3.2
- [modsecurity中文手册](http://www.modsecurity.cn/chm/ConfigurationDirectives.html)

## ubuntu20.04下安装

## centos7下安装

## FAQ
### 遇到curl链接错误
- 有多个curl版本，只保留一个。


## 参考
- https://zhuanlan.zhihu.com/p/415862524


---

> 作者:   
> URL: https://cfanzp.com/nginx-modsecurity/  

