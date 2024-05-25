# IPsec协议框架


<!--more-->
# IPsec协议框架
安全联盟SA,IPsec对等体间对某些要素的约定。
IPsec协议框架包含安全协议、算法、封装模式等

## 安全协议
安全协议包含：AH、ESP
### AH
- 数据来源认证
- 完整性校验
- 抗重放
### ESP
- 加密
- 数据来源认证
- 完整性校验
- 抗重放

## 算法
### 加密算法
- DES
- 3DES
- AES
- SM4

### 密钥协商算法
- DH

### 认证算法
- MD5
- SHA1
- SM3

## 封装模式
### 传输模式
```bash
IP--AH--DATA
IP--ESP--DATA--ESP-T
IP--AH--ESP--DATA--ESP-T
```
### 隧道模式
```bash
IP--AH--IP--DATA
IP--ESP--IP--DATA--ESP-T
IP--AH--ESP--IP--DATA--ESP-T
```

## 保护数据的方式
保护数据的方式主要有ACL方式和路由方式
### ACL方式
ACL方式功能丰富灵活使用

### 路由方式
路由方式配置简单，组播流量，动态路由


---

> 作者:   
> URL: https://cfanzp.com/nat-ipsec/  

