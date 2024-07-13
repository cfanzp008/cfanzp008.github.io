# ubuntu NetworkManager配置


<!--more-->
# ubuntu NetworkManager配置

## NetworkManager
1. NetworkManager可以直接配置网络，也可以作为netplan的渲染器。
2. NetworkManager配置文件目录为/etc/NetworkManager/。
3. NetworkManager可以使用nmcli配置网络，或直接在界面配置网络。
4. 配置保存在/etc/NetworkManager/system-connections下
```bash
netplan-ens33.nmconnection  test192.nmconnection
root@ubuntu:/etc/NetworkManager/system-connections# ls
netplan-ens33.nmconnection  test192.nmconnection
```

### NetworkManager nmcli安装
```bash
root@VM-8-10-ubuntu:/opt/blog# nmcli

Command 'nmcli' not found, but can be installed with:

apt install network-manager
```
### NetworkManager nmcli命令
- mncli可以看到当前管理的网络配置包括netplan中使用NetworkManager作为渲染器的配置和自己mncli的配置以及界面上的配置。


## systemd-networkd
### 查看服务状态
```bash
root@VM-8-10-ubuntu:/etc/netplan# systemctl status systemd-networkd
● systemd-networkd.service - Network Service
Loaded: loaded (/lib/systemd/system/systemd-networkd.service; enabled; vendor preset: enabled)
Active: active (running) since Wed 2024-05-15 21:46:03 CST; 1 months 28 days ago
TriggeredBy: ● systemd-networkd.socket
Docs: man:systemd-networkd.service(8)
Main PID: 625 (systemd-network)
Status: "Processing requests..."
Tasks: 1 (limit: 2267)
Memory: 1.9M
CGroup: /system.slice/systemd-networkd.service
└─625 /lib/systemd/systemd-networkd

May 15 21:46:03 VM-8-10-ubuntu systemd[1]: Starting Network Service...
May 15 21:46:03 VM-8-10-ubuntu systemd-networkd[625]: Enumeration completed
May 15 21:46:03 VM-8-10-ubuntu systemd[1]: Started Network Service.
May 15 21:46:03 VM-8-10-ubuntu systemd-networkd[625]: eth0: IPv6 successfully enabled
May 15 21:46:03 VM-8-10-ubuntu systemd-networkd[625]: eth0: Link UP
May 15 21:46:03 VM-8-10-ubuntu systemd-networkd[625]: eth0: Gained carrier
May 15 21:46:03 VM-8-10-ubuntu systemd-networkd[625]: eth0: DHCPv4 address 10.0.8.10/22 via 10.0.8.1
May 15 21:46:05 VM-8-10-ubuntu systemd-networkd[625]: eth0: Gained IPv6LL
```

### 使用system-networkd配置网络
1. 查看接口情况
```bash
root@ubuntu:~# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
inet 127.0.0.1/8 scope host lo
valid_lft forever preferred_lft forever
inet6 ::1/128 scope host 
valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
link/ether 00:0c:29:59:ea:9d brd ff:ff:ff:ff:ff:ff
altname enp2s1
inet 192.168.0.113/24 brd 192.168.0.255 scope global noprefixroute ens33
valid_lft forever preferred_lft forever
inet6 fe80::1b10:e933:90ce:b8aa/64 scope link noprefixroute 
valid_lft forever preferred_lft forever
```

2. 在/etc/systemd/network/创建配置文件,文件扩展名为.network,并添加配置项
```ini
sudo vim /etc/systemd/network/10-ens33.network
[Match]
Name=ens33

[Network]
Address=192.168.0.114/24
Gateway=192.168.0.1
DNS=8.8.8.8
DNS=223.5.5.5
```

3. 应用配置
```bash
sudo systemctl restart systemd-networkd
#查看状态
sudo systemctl status systemd-networkd
#查看日志
sudo journalctl -u systemd-networkd
```

## netplan
### netplan配置文件
1. 配置文件文件的默认目录是/etc/netplan/50-cloud-init.yaml
2. 配置文件的扩展名为yaml
3. 配置文件使用systemd举例：
    - 配置文件种render如果没设置，默认为netwokd(即systemd-networkd)
```bash
network:
  version: 2
    renderer: networkd
      ethernets:
          eth0:
                dhcp4: true
```
4. netplan使用NetworkManager举例
- 如下配置网络接口
```bash
root@ubuntu:/etc/netplan# cat 01-network-manager-all.yaml
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      ens33:
         addresses: [10.168.27.200/24]
         dhcp4: false
         gateway4: 10.168.27.1
         nameservers:
             addresses: [10.168.27.1, 8.8.8.8]
```
- 使配置生效
```bash
root@ubuntu:~# sudo netplan apply
root@ubuntu:~# nmcli connection show
NAME                UUID                                  TYPE      DEVICE 
test192             fabbd313-93aa-4ee6-be9a-da35c2dbebb1  ethernet  ens33  
netplan-ens33       14f59568-5076-387a-aef6-10adfcca2e26  ethernet  -- 
```
## 相关命令
### NetworkManager nmcli命令
```bash
root@ubuntu:/etc/NetworkManager/system-connections# nmcli -s c
NAME                UUID                                  TYPE      DEVICE 
netplan-ens33       14f59568-5076-387a-aef6-10adfcca2e26  ethernet  ens33  
Wired connection 1  abfb0c61-44d3-30df-aa51-13d8cd13a904  ethernet  --     
root@ubuntu:/etc/NetworkManager/system-connections# nmcli connection show
NAME                UUID                                  TYPE      DEVICE 
netplan-ens33       14f59568-5076-387a-aef6-10adfcca2e26  ethernet  ens33  
Wired connection 1  abfb0c61-44d3-30df-aa51-13d8cd13a904  ethernet  -- 
```

- 添加一个连接
```bash
root@ubuntu:/etc/NetworkManager/system-connections# nmcli connection add con-name test192 ipv4.method manual autoconnect no type ethernet ifname ens33 ipv4.addresses 192.168.0.113/24 ipv4.gateway 192.168.0.1 ipv4.dns "114.114.114.114 8.8.8.8"
Connection 'test192' (fabbd313-93aa-4ee6-be9a-da35c3dbebb1) successfully added.
```

- 启用连接
```bash
netplan-ens33.nmconnection  test192.nmconnection
root@ubuntu:/etc/NetworkManager/system-connections# ls
netplan-ens33.nmconnection  test192.nmconnection
```

- 删除一个连接
```bash
sudo nmcli connection delete uuid
```

- 查看连接信息
```bash
root@ubuntu:/etc/netplan# nmcli connection show
NAME           UUID                                  TYPE      DEVICE 
netplan-ens33  14f59568-5076-387a-aef6-10adfcca2e26  ethernet  ens33  
test192        fabbd313-93aa-4ee6-be9a-da35c2dbebb1  ethernet  --     
root@ubuntu:/etc/netplan# nmcli connection show netplan-ens33
connection.id:                          netplan-ens33
connection.uuid:                        14f59568-5076-387a-aef6-10adfcca2e26
connection.stable-id:                   --
connection.type:                        802-3-ethernet
connection.interface-name:              ens33
connection.autoconnect:                 yes
connection.autoconnect-priority:        0
connection.autoconnect-retries:         -1 (default)
connection.multi-connect:               0 (default)
connection.auth-retries:                -1
connection.timestamp:                   1720886878
connection.read-only:                   no
connection.permissions:                 --
connection.zone:                        --
connection.master:                      --
connection.slave-type:                  --
connection.autoconnect-slaves:          -1 (default)
connection.secondaries:                 --
connection.gateway-ping-timeout:        0
connection.metered:                     unknown
connection.lldp:                        default
connection.mdns:                        -1 (default)
connection.llmnr:                       -1 (default)
connection.wait-device-timeout:         -1
802-3-ethernet.port:                    --
802-3-ethernet.speed:                   0
802-3-ethernet.duplex:                  --
802-3-ethernet.auto-negotiate:          no
802-3-ethernet.mac-address:             --
802-3-ethernet.cloned-mac-address:      --
802-3-ethernet.generate-mac-address-mask:--
802-3-ethernet.mac-address-blacklist:   --
802-3-ethernet.mtu:                     auto
802-3-ethernet.s390-subchannels:        --
802-3-ethernet.s390-nettype:            --
802-3-ethernet.s390-options:            --
802-3-ethernet.wake-on-lan:             --
802-3-ethernet.wake-on-lan-password:    --
ipv4.method:                            manual
ipv4.dns:                               192.168.0.1,8.8.8.8
```

### netplan命令
```bash
#应用配置
sudo netplan apply

#验证配置
sudo netplan generate

#尝试应用配置
sudo netplan try

#调试配置
sudo netplan --debug generate
```

## netplan、systemd-networkd、 NetworkManager之间的关系
### netplan
- netplan是在ubuntu 17.10版本开始引入
- 工作原理：读取/etc/netplan/下yaml格式配置文件(定义网络接口、IP、路由、DNS设置)
- 渲染器（renderer)可以选择networkd和NetworkManager

## 总结
1. 重点是要理清netplan、systemd-networkd、NetworkManager之间的关系
2. 如果你使用 nmcli 直接配置 IP 地址，这将绕过 Netplan 和 systemd-networkd 的配配置。因此不建议使用nmcli直接配置网络。
3. 使用 nmcli 的直接操作可能会导致配置的不一致性和管理上的混淆，特别是在需要多种网络配置（例如静态 IP 和 DHCP 混合）时更容易出现问题。
4. 桌面环境建议使用NetworkManager,方便直观。
5. 使用netplan服务器环境建议使用networkd作为randerer性能搞，对于桌面环境建议使用NetworkManger渲染环境，有界面友好。


---

> 作者:   
> URL: https://cfanzp.com/network-manager/  

