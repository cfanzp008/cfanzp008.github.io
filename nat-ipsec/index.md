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

## ipsec安装配置
### ipsec安装
- https://github.com/matfabia/strongswan
### 配置文件demo
- 官网https://wiki.strongswan.org/projects/strongswan/wiki/ConnSection
```bash
# ipsec.conf - strongSwan IPsec configuration file

# basic configuration

config setup
	# strictcrlpolicy=yes
 	# uniqueids = no
 	
# Add connections here.

# Sample VPN connections

#conn sample-self-signed           //ipsec隧道名 一条ipsec配置的起始处
#      leftsubnet=10.1.0.0/16
#      leftcert=selfCert.der
#      leftsendcert=never
#      right=192.168.0.2
#      rightsubnet=10.2.0.0/16
#      rightcert=peerCert.der
#      auto=start
#conn sample-with-ca-cert
#      leftsubnet=10.1.0.0/16
#      leftcert=myCert.pem
#      right=192.168.0.2
#      rightsubnet=10.2.0.0/16
#      rightid="C=CH, O=Linux strongSwan CN=peer name"
#      auto=start

```

- 服务端demo
```bash
config setup
        charondebug="cfg 4, dmn 4, ike 4, net 4, knl 4"
        uniqueids=yes
        strictcrlpolicy=no

conn %default
        ikelifetime=24h       //在重新协商之前应该持续多长时间
        keylife=8h             //从成功协商到期应该持续多长时间
        rekeymargin=30m
        keyingtries=3
        keyexchange=ikev2
        authby=psk
        dpddelay=180s
        ike=aes256-sha1-modp2048!
        esp=aes192-sha1-esn!    //用于连接ESP加密认证算法
        mobike=no

conn test                       //隧道名称，一条ipsec的起始处
        left=%any               //ipsec协商公网IP 填写IP或者%defaultroute
        leftcert=vrf_0.pem      //公钥证书
        leftsubnet=192.168.0.1/32   //本段保护子网
        leftid=198.18.0.1           //本端id
        leftfirewall=yes            //关闭防火
        right=%any                  //ipsec对端IP  %any表示任意，服务端配置为%any
        rightid=198.18.0.2          //对端id
        rightsubnet=0.0.0.0/0       //对端保护子网
        rightdns=114.114.114.114 
        auto=add                   //不发起ipsec连接
```

- 客户端demo
```bash
conn %default
...
type=tunnel
dpddelay=180s
apdaction=restart   //dpd检测失败后重新连接


conn test-cli
    left=192.168.100.180
    auto=start               //主动发起连接
    keyingtries=%forever     //直到协商成功
    letfsubnet=192.18.0.2    //保护子网
    right=192.168.100.161    //服务端IP
    leftid=198.18.0.2        //移动端ios作为标识要用
    reghtid=198.18.0.1       //对端


```


## 参考
- [ipsec配置](https://blog.csdn.net/jkwanga/article/details/109621684)


---

> 作者:   
> URL: http://111.230.8.71:8889/nat-ipsec/  

