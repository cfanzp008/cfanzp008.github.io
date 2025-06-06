# GOPROXY配置

# GOPROXY配置
最近在使用hugo时需要依赖go环境在安装依赖包的时候，速度很慢，之前都是配置外网环境解决的。其实go环境有国内的替代域名资源可以使用。
在go环境下，需要下载依赖包的时候，如果没有外网环境的话，很多包默认是无法下载下来的，解决办法就是修改一下GOPROXY的配置
```
go env -w GOPROXY=https://goproxy.io,direct
```


---

> 作者:   
> URL: http://111.230.8.71:8889/goproxy/  

