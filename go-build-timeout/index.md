# go build提示timeout如何解决？


<!--more-->
# go build提示timeout如何解决？
## 场景
今天想用go写一个简单的工具，github下载了一个库，go build 编译时报错了

## 解决办法
```bash
go env -w GOPROXY=https://goproxy.io,direct
```


## 参考
- https://zhuanlan.zhihu.com/p/312031216


---

> 作者:   
> URL: http://111.230.8.71:8889/go-build-timeout/  

