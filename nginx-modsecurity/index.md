# nginx集成ModSecurity


<!--more-->
# nginx集成ModSecurity
## 1. 准备工作
- 下载nginx:1.24.0
- 下载nginx-ModSecurity:v1.0.5
- 下载ModSecurity:v3
- 下载ModSecurity核心规则集
```
git clone https://github.com/SpiderLabs/ModSecurity
cd ModSecurity
# 下载 libInjection
git submodule init
git submodule update
./build.sh
./configure && make && make install
git clone https://github.com/SpiderLabs/owasp-modsecurity-crs.git /usr/local/nginx/conf/owasp-crs
```

- coreruleset v3.3.2
- [modsecurity中文手册](http://www.modsecurity.cn/chm/ConfigurationDirectives.html)

## 2. ubuntu20.04下安装
- 下载
```bash
git clone --depth 1 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity /usr/local/src/ModSecurity/
cd /usr/local/src/ModSecurity/
sudo apt install gcc make build-essential autoconf automake libtool libcurl4-openssl-dev liblua5.3-dev libfuzzy-dev ssdeep gettext pkg-config libpcre3 libpcre3-dev libxml2 libxml2-dev libcurl4 libgeoip-dev libyajl-dev doxygen -y
git submodule update
./build.sh
./configure
```

- 安装报错
```bash
checking pkg-config is at least version 0.9.0... yes
configure: error: 

  libInjection was not found within ModSecurity source directory.

  libInjection code is available as part of ModSecurity source code in a format
  of a git-submodule. git-submodule allow us to specify the correct version of
  libInjection and still uses the libInjection repository to download it.

  You can download libInjection using git:

     $ git submodule init
     $ git submodule update

   
root@VM-8-10-ubuntu:/usr/local/src/ModSecurity# git submodule init
Submodule 'bindings/python' (https://github.com/SpiderLabs/ModSecurity-Python-bindings.git) registered for path 'bindings/python'
Submodule 'others/libinjection' (https://github.com/libinjection/libinjection.git) registered for path 'others/libinjection'
Submodule 'test/test-cases/secrules-language-tests' (https://github.com/SpiderLabs/secrules-language-tests) registered for path 'test/test-cases/secrules-language-tests'
root@VM-8-10-ubuntu:/usr/local/src/ModSecurity# git submodule update
Cloning into '/usr/local/src/ModSecurity/bindings/python'...
error: RPC failed; curl 28 Failed to connect to github.com port 443: Connection timed out
fatal: the remote end hung up unexpectedly
fatal: clone of 'https://github.com/SpiderLabs/ModSecurity-Python-bindings.git' into submodule path '/usr/local/src/ModSecurity/bindings/python' failed
Failed to clone 'bindings/python'. Retry scheduled
Cloning into '/usr/local/src/ModSecurity/others/libinjection'...
Cloning into '/usr/local/src/ModSecurity/test/test-cases/secrules-language-tests'...
Cloning into '/usr/local/src/ModSecurity/bindings/python'...
Submodule path 'bindings/python': checked out 'bc625d5bb0bac6a64bcce8dc9902208612399348'
Submodule path 'others/libinjection': checked out 'bfba51f5af8f1f6cf5d6c4bf862f1e2474e018e3'
Submodule path 'test/test-cases/secrules-language-tests': checked out 'a3d4405e5a2c90488c387e589c5534974575e35b'
Submodule path 'bindings/python': checked out 'bc625d5bb0bac6a64bcce8dc9902208612399348'
```

- configure结果
```bash
ModSecurity -  for Linux
 
 Mandatory dependencies
   + libInjection                                  ....
   + SecLang tests                                 ....625f9a5
 
 Optional dependencies
   + GeoIP/MaxMind                                 ....found 
      * (GeoIP) v1.6.12
         -lGeoIP, -I/usr/include/
   + LibCURL                                       ....found v7.78.0 
      -L/usr/local/lib -lcurl, -I/usr/local/include -DWITH_CURL_SSLVERSION_TLSv1_2 -DWITH_CURL
   + YAJL                                          ....found v2.1.0
      -lyajl, -DWITH_YAJL -I/usr/include/yajl
   + LMDB                                          ....not found
   + LibXML2                                       ....found v2.9.10
      -lxml2, -I/usr/include/libxml2 -DWITH_LIBXML2
   + SSDEEP                                        ....found 
      -lfuzzy -L/usr/lib/x86_64-linux-gnu/, -DWITH_SSDEEP -I/usr/include
   + LUA                                           ....found v503
      -llua5.3 -L/usr/lib/x86_64-linux-gnu/, -DWITH_LUA -DWITH_LUA_5_3 -I/usr/include/lua5.3
   + PCRE2                                          ....not found
 
 Other Options
   + Test Utilities                                ....enabled
   + SecDebugLog                                   ....enabled
   + afl fuzzer                                    ....disabled
   + library examples                              ....enabled
   + Building parser                               ....disabled
   + Treating pm operations as critical section    ....disabled
```

- make报错
```bash
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_global_init@CURL_OPENSSL_4'
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_easy_perform@CURL_OPENSSL_4'
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_slist_free_all@CURL_OPENSSL_4'
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_easy_strerror@CURL_OPENSSL_4'
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_easy_setopt@CURL_OPENSSL_4'
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_easy_init@CURL_OPENSSL_4'
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_slist_append@CURL_OPENSSL_4'
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_easy_cleanup@CURL_OPENSSL_4'
/usr/bin/ld: /usr/local/src/ModSecurity/src/.libs/libmodsecurity.so: undefined reference to `curl_global_cleanup@CURL_OPENSSL_4'
collect2: error: ld returned 1 exit status
make[2]: *** [Makefile:506: multi] Error 1
make[2]: Leaving directory '/usr/local/src/ModSecurity/examples/multiprocess_c'
make[1]: *** [Makefile:553: all-recursive] Error 1
make[1]: Leaving directory '/usr/local/src/ModSecurity/examples'
make: *** [Makefile:1047: all-recursive] Error 1

#curl版本不对的原因
root@VM-8-10-ubuntu:/usr/lib/x86_64-linux-gnu# ll libcur*
lrwxrwxrwx 1 root root      16 Mar 19 21:53 libcurl.a -> libcurl-gnutls.a
-rw-r--r-- 1 root root 1179052 Mar 19 21:53 libcurl-gnutls.a
-rw-r--r-- 1 root root    1002 Mar 19 21:53 libcurl-gnutls.la
lrwxrwxrwx 1 root root      23 Mar 19 21:53 libcurl-gnutls.so -> libcurl-gnutls.so.4.6.0
lrwxrwxrwx 1 root root      19 Mar 19 21:53 libcurl-gnutls.so.3 -> libcurl-gnutls.so.4
lrwxrwxrwx 1 root root      23 Mar 19 21:53 libcurl-gnutls.so.4 -> libcurl-gnutls.so.4.6.0
-rw-r--r-- 1 root root  584312 Mar 19 21:53 libcurl-gnutls.so.4.6.0
lrwxrwxrwx 1 root root      17 Mar 19 21:53 libcurl.la.bak -> libcurl-gnutls.la
lrwxrwxrwx 1 root root      25 Apr  4 22:19 libcurl.so -> /usr/local/lib/libcurl.so*
lrwxrwxrwx 1 root root      27 Apr  4 22:21 libcurl.so.4 -> /usr/local/lib/libcurl.so.4*
-rw-r--r-- 1 root root  596616 Mar 19 21:53 libcurl.so.4.6.0.bak
lrwxrwxrwx 1 root root      31 Apr  4 22:21 libcurl.so.4.7.0 -> /usr/local/lib/libcurl.so.4.7.0*
lrwxrwxrwx 1 root root      16 Mar 19 21:53 libcurl.so.4.bak -> libcurl.so.4.6.0
lrwxrwxrwx 1 root root      12 May 17  2023 libcurses.a -> libncurses.a
lrwxrwxrwx 1 root root      13 May 17  2023 libcurses.so -> libncurses.so
```

- 下载nginx-modsecurity连接器
```bash
#add-dynamic-module
https://github.com/owasp-modsecurity/ModSecurity-nginx
./configure --add-module=/path/to/ModSecurity-nginx
#或
./configure --add-dynamic-module=/path/to/ModSecurity-nginx --with-compat
```
## 3. centos7下安装
- http://www.modsecurity.cn/practice/post/11.html

## 4. docker安装modsecurity
- https://www.cnblogs.com/netcore3/p/17315736.html

## 5. 测试
```bash
curl 'http://localhost/?search=<scritp>alert('xss');</script>' -I
```

## 6. 审计日志配置
- 日志打印到/var/log/nginx/modsecurity中
- 日志打印到多个文件
```bash
SecAuditEngine RelevantOnly
#SecAuditLogRelevantStatus "^(?:5|4(?!04))"
SecAuditLogRelevantStatus "^(?:6(?!04))"

# Log everything we know about a transaction.
#SecAuditLogParts ABIJDEFHZ
#SecAuditLogParts ABCDEFHZ
SecAuditLogParts ABCDEFGHIJKZ

# Use a single file for logging. This is much easier to look at, but
# assumes that you will use the audit log only ocassionally.
#
#SecAuditLogType Serial
SecAuditLogType Concurrent
#SecAuditLog /var/log/modsec_audit.log
#SecAuditLog /var/log/nginx/modsecurity/modsec_audit.log
SecAuditLogFormat JSON

# Specify the path for concurrent audit logging.
#SecAuditLogStorageDir /opt/modsecurity/var/audit/
SecAuditLogStorageDir /var/log/nginx/modsecurity/
```

## 7. 靶场
- https://github.com/zhuifengshaonianhanlu/pikachu

## 8. FAQ
### 遇到curl链接错误
- 有多个curl版本，只保留一个。

### modsecurity配置的审计日志不打印。
- 配置了modsecurity审计日志后， 如果不创建目录，modsecurity会自动创建目录。
- 但是modsecurity创建的目录可能没有权限，这点有点坑。
- 解决方法是手动给创建的目录设置权限，例如：
```bash
mkdir /var/log/nginx/modsecurity
chmod +777 /var/log/nginx/modsecurity
```


## 9. 参考
- https://zhuanlan.zhihu.com/p/415862524
- https://www.cnblogs.com/miracle-luna/p/17204007.html
- https://blog.csdn.net/ilqgffvramusm2864/article/details/107663339
- https://www.freebuf.com/sectool/274495.html
- http://www.modsecurity.cn/practice/post/4.html


---

> 作者:   
> URL: https://cfanzp.com/nginx-modsecurity/  

