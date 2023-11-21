# Go基本环境配置

# Go基本环境配置

## 下载
- https://dl.google.com/go/go1.18.1.linux-amd64.tar.gz

## 环境变量配置
- https://blog.csdn.net/Deronn/article/details/108364612
```
export GO111MODULE=on
export GOPROXY=https://goproxy.cn
export GOROOT=/usr/local/go
export GOPATH=~/go/path
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

## 环境变量生效
```
source /etc/profile ##在当前bash环境下读取并执行profile中的命令。
go env 
```

## 编译
```
go build -o main.exe main.go
```

## 运行
- 直接运行编译后的可执行程序
- go run 运行源代码


## vim配置
- https://blog.csdn.net/Jmilk/article/details/107292042
- https://zhuanlan.zhihu.com/p/51656877
- https://www.sunzhongwei.com/vim-execution-goinstallbinaries-installation-depend-on-failure
- https://blog.csdn.net/pujiao5201314/article/details/77947885

## vim配置vim-go推出时语法检查
### 相关工具
- gocode,errorcheck
- https://www.imooc.com/wenda/detail/664397
- .vimrc
```
let g:syntastic_go_checkers = ['govet', 'errcheck', 'go']
```

- GoBinaryInstall
```
go install github.com/nsf/gocode@latest
go install github.com/golang/lint@latest
```

- vim GoRun报错
```
malformed import path "go: cannot find main module, but found .git/config in /data/test": invalid ch
```

## 常见问题
### GO111MODULE
- https://zhuanlan.zhihu.com/p/374372749

### 当我们配置好go环境，可以正常使用go命令，但是使用 sudo 权限执行 go 命令，出现“sudo: go：找不到命令”时：
```
sudo vim /etc/sudoers
Defaults    secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:/usr/local/go/bin"
```

## go mod 模式下如何引入本地包名
- https://wenku.baidu.com/view/74dc3f26ecf9aef8941ea76e58fafab068dc445a.html

## go语言前景
- https://zhuanlan.zhihu.com/p/382833278

## go框架
- 一个go语言学习网站:https://www.topgoer.cn/
- https://blog.csdn.net/qq_31967569/article/details/105262821
- gfast: https://gitee.com/tiger1103/gfast
- go-zero: https://github.com/zeromicro/go-zero
- https://zhuanlan.zhihu.com/p/380803333
- go-websocket demo: https://github.com/woodylan/go-websocket
- Gin
- sonic(字节优化版的json库): https://github.com/bytedance/sonic
- gjson: github.com/tidwall/gjson
   - https://blog.csdn.net/m0_37322399/article/details/119189507

### 网络安全
- [Acra](/acra)

### 游戏框架
- https://blog.csdn.net/qq_31967569/article/details/105262821
- https://github.com/Golangltd/LollipopGo
- https://github.com/Golangltd/nest
- m3game https://github.com/Tudongye/m3game

### 日志库
- https://github.com/sirupsen/logrus
- https://www.cnblogs.com/jiujuan/p/15542743.html

### 字节内部框架
- Hertz:应用在字节跳动自研 Golang HTTP 框
- Ginex
- KiteX:字节自有 RPC 框架

### 参考
- https://learnku.com/docs/the-way-to-go/interact-with-other-languages/3581#2b59d6
- The Way to Go: https://learnku.com/docs/the-way-to-go
- https://github.com/Unknwon/the-way-to-go_ZH_CN


---

> 作者:   
> URL: https://cfanzp.com/go-env/  

