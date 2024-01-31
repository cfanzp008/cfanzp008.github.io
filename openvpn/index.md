# openvpn的使用入门


<!--more-->
# openvpn的使用入门
## 1. 简介
- 最近了解了一下隧道技术，openvpn就是使用了隧道技术。这里简单记录一下openvpn的一些基础使用方法。

## 2. ubuntu20.04安装openvpn
### a. 安装openvpn及依赖
```bash
sudo apt-get -y install openvpn libssl-dev openssl
# 查看版本
openvpn --version
# 查看安装产生的文件
dpkg --list openvpn
dpkg -L openvpn | more
```

### b. 安装easy-rsa
```bash
apt -y install easy-rsa
```

### c. 制作证书
- 制作ca证书
```bash
cp -r /usr/share/easy-rsa/* /etc/openvpn/easy-rsa/
cp vars.example vars
vim vars
#修改COUNTRY,PROVINCE,CITY,ORG,EMAIL,OU等信息
#添加
export KEY_NAME="vpnaaa"
#查看安装文档
cat /usr/share/doc/easy-rsa/README.Debian
./easyrsa init-pki
ls
./easyrsa build-ca nopass
ls
```

- 制作server端证书
```bash
./easyrsa build-server-full vpnaaa nopass
#查看生成的server端证书
ls pki/issued/
ls pki/private/
```

- 制作client端证书
```bash
./easyrsa build-client-full bbb nopass
#查看生成的server端证书
ls pki/issued/
ls pki/private/
```

- 为服务器生成加密交换时的Diffie-Hellman文件
```bash
./easyrsa gen-dh
```

### d. 修改服务端配置文件
```bash
cd /etc/openvpn/
cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf /etc/openvpn/
#vim /etc/openvpn/server.conf
#配置port
port 1194
#tcp
proto tcp
;proto udp
#修改密钥，key文件
ca /etc/openvpn/ca.crt
cert /etc/openvpn/vpnaaa.crt
key /etc/openvpn/vpnaaa.key
#打开log配置
#关闭explicit-exit-notify
;explicit-exit-notify 1
```

### e. copy 证书文件到配置目录
```bash
cp easy-rsa/pki/ca.crt /etc/openvpn/
cp easy-rsa/pki/issued/vpnaaa.crt /etc/openvpn/
cp easy-rsa/pki/private/vpnaaa.key /etc/openvpn/
cp easy-rsa/pki/db.pem /etc/openvpn/
cp easy-rsa/pki/db.pem /etc/openvpn/db2048.pem

```

## 3. openvpn服务端启动
```bash
nohup /usr/sbin/openvpn --config /etc/openvpn/server.conf &
```

## 4. 客户端安装
### a. openvpn客户端下载
- openvpn下载,注意下载的客户端版本要与服务端版本一致。
```bash
https://build.openvpn.net/downloads/releases/openvpn-install-2.4.12-I601-Win10.exe
```

### b. 客户端配置文件aaa.ovpn
```bash
client
dev tun
proto tcp
remote 100.128.27.230 1194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
cert bbb.crt
key bbb.key
comp-lzo
verb 3
redirect-gateway def1
```

### c. 客户端文件
```bash
bbb.crt
bbb.key
bbb.ovpn
ca.crt

```

## 5. 查看日志
```bash
tail -f /var/log/openvpn/openvpn.log
```

## 6. 参考
- openvpn安装：https://blog.csdn.net/wfjdemmye/article/details/131486127


---

> 作者:   
> URL: https://cfanzp.com/openvpn/  

