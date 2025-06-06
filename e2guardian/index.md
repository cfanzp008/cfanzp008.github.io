# e2guardian


<!--more-->
# e2guardian
## 概念
e2guardian是一个开源的url过滤和url内容过滤的软件。最近编译安装测试了一下，还是很实用的。

## e2guardian下载
- https://github.com/e2guardian/e2guardian
```
wget https://github.com/e2guardian/e2guardian/archive/refs/tags/v5.5.4r.tar.gz
```

## 源码安装
- 参考: https://github.com/e2guardian/e2guardian/wiki/Installation-From-Source
```
apt-get build-dep e2guardian
./autogen.sh
./configure '--prefix=/usr' '--enable-clamd=yes' '--with-proxyuser=e2guardian' '--with-proxygroup=e2guardian' '--sysconfdir=/etc' '--localstatedir=/var' '--enable-icap=yes' '--enable-commandline=yes' '--enable-email=yes' '--enable-ntlm=yes' '--mandir=${prefix}/share/man' '--infodir=${prefix}/share/info' '--enable-pcre=yes' '--enable-sslmitm=yes' 'CPPFLAGS=-mno-sse2 -g -O2'
```

## squid与e2guardian配合使用
- e2guardian可作为icap server与squid配合使用。


## 参考
- [e2guardian wiki](https://github.com/e2guardian/e2guardian/wiki)


---

> 作者:   
> URL: http://111.230.8.71:8889/e2guardian/  

