# dnsmasq


<!--more-->
# dnsmasq
## 什么是dnsmasq?
dnsmasq是一个轻量级的、易于配置的DNS（Domain Name System）和DHCP（Dynamic Host Configuration Protocol）服务器软件。它可以在Linux和其他类Unix系统上运行，并提供DNS缓存、DHCP服务和网络引导功能。

- 作为DNS服务器，dnsmasq能够响应主机的DNS查询请求，并将这些查询发送到上游DNS服务器，从而帮助加快DNS解析速度并减轻上游DNS服务器的负载。此外，dnsmasq还可以通过本地缓存来改善网络性能，并支持将特定域名的解析请求重定向到指定的IP地址。
- 作为DHCP服务器，dnsmasq可以自动为连接到网络的计算机分配IP地址、网关和DNS服务器等网络配置信息，从而简化了网络管理和配置的工作。
- 除此之外，dnsmasq还具有透明代理、网络引导等功能，使其成为一个多功能的网络服务软件。由于其轻量级和易用性，dnsmasq经常被用于嵌入式系统、家庭网络路由器和小型办公室网络中。
- 总的来说，dnsmasq在网络环境中扮演着重要角色，为用户提供了简单而有效的DNS和DHCP服务，并在一定程度上提高了网络的性能和可管理性。

## ubuntu安装
```bash
sudo apt-get install dnsmasq
```

## dnsmasq配置文件
```bash
/etc/dnsmasq.conf
```

### 源码下载地址
- https://thekelleys.org.uk/dnsmasq/


---

> 作者:   
> URL: http://111.230.8.71:8889/dnsmasq/  

