# git-ftp的使用

# git-ftp的使用
## git-ftp有什么用？
- git-ftp 能够方便的帮助我们将自己管理的git项目相关代码或资源提交到自己的ftp服务器上

## git-ftp命令
```
git ftp init
git ftp push
```
## 安装
- 首次使用需要下载安装git-ftp并进行配置
### ubuntu安装
```
sudo apt-get install git-ftp
```

### mac 安装
```
brew install git-ftp
```
- mac安装过程中相关依赖可能会报错，我安装的时候遇到了报错问题，这里记录一下:
```
Error: No such file or directory @ rb_sysopen - /Users/zp/Library/Caches/Homebrew/downloads/8687c3e085e812f09d11aeca541ef9cdefbc8f971d9dd3c407c8b18bb3954957--libnghttp2-1.47.0.monterey.bottle.tar.gz 
```
- 报错解决方案:安装相关库即可
```
brew install libnghttp2
brew install openldap
brew install brotli
brew install zstd
brew install curl
brew install git-ftp
```

## 配置
- 简单配置,修改.git/config添加如下配置
```
[git-ftp]
    url = your-ftp-url
    user = your-ftp-user
    password = your_ftp_url
    syncroot = your-local-upload-fullpath
    remote-root= your-ftp-upload-path(eg:htdocs)
```

## 参考
- 官方文档:[https://github.com/git-ftp/git-ftp/blob/master/man/git-ftp.1.md](https://github.com/git-ftp/git-ftp/blob/master/man/git-ftp.1.md)


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/git-ftp/  

