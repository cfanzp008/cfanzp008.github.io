# 如何生成内网可用的https证书？


<!--more-->
# 如何生成内网可用的https证书？
## 生成https证书方案
这里主要说说其中的2种：
- openssl
- mkcert

## openssl 生成SSL证书
- 生成一个2048位的RSA私钥
```
openssl genrsa -out server.key 2048
```

- 创建证书请求（CSR）
```
openssl req -new -key server.key -out server.csr
```

- 生成自签名证书
```
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

## wfrest 生成证书脚本
```
openssl genrsa -out server.key 2048
openssl req -new -x509 -key server.key -out server.crt -days 3650
./19_https cert/server.crt cert/server.key
```
### 做出的证书会提示不安全

## 使用mkcert制作证书
- [mkcert github](https://github.com/FiloSottile/mkcert/releases)

### 生成客户端CA证书(pem/crt)
```bash
./mkcert --install
./mkcert -CAROOT /root/.local/share/mkcert/
#查看证书
ls /root/.local/share/mkcert/
rootCA-key.pem rootCA.pem
```

### mac导入证书
- [参考]( https://blog.csdn.net/weixin_43963253/article/details/124091713)


---

> 作者:   
> URL: https://cfanzp.com/openssl-https/  

