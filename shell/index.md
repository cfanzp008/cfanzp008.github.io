# shell脚本基础


<!--more-->
# shell脚本基础
## shell基础用法
### 变量
```bash
# 不能数字开头，避免使用关键字（if,then,else,fi,for,while等）
# 习惯使用大写字母表示常量
# 避免使用空格,避免使用特殊符号
PATH_1="/usr/bin"
_a=3
a=4
var1=5

#使用变量
echo $a

# 删除变量
unset a
```

## shell条件判断
### 判断是否为空
```bash
#如果变量a为空 continue
[ -z "$a" ] && continue
```

### 判断是否匹配
- =~ 是一个用于正则表达式匹配的操作符。它用于测试一个字符串是否匹配一个给定的正则表达式。
- 如何$a为a0,a1,a2,a3则输出$a
```bash
[[ $a=~ a[0123]$ ]] && {
   echo $a
}
```

## shell调试
- 在运行bash脚本的时候想看看bash脚本运行的具体情况可以使用bash -x
```bash
bash -x test.sh
```
## shell中循环读取文件
```bash
root@VM-8-10-ubuntu:/shell# cat test_while.sh
#!/bin/bash
while read line
do
    echo $line
done < ./demo_while_file.txt
```

## 使用shell实时监控网络地址变化
```bash
ip -4 monitor address | while read line; do
    echo "Address change detected: $line"
    # 在这里添加你希望执行的动作，例如重新加载网络配置
done
```
- 测试
```bash
root@ubuntu:/opt/shell# ./test_address_monitor.sh
# ip 192.168.0.108改为192.168.0.109
Address change detected: Deleted 2: ens33    inet 192.168.0.108/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: valid_lft forever preferred_lft forever
Address change detected: 2: ens33    inet 192.168.0.109/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: valid_lft forever preferred_lft forever
Address change detected: 2: ens33    inet 192.168.0.109/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: valid_lft forever preferred_lft forever
Address change detected: 2: ens33    inet 192.168.0.109/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: valid_lft forever preferred_lft forever

# ip 192.168.0.109改为192.168.0.108
Address change detected: Deleted 2: ens33    inet 192.168.0.108/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: Deleted 2: ens33    inet 192.168.0.109/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: valid_lft forever preferred_lft forever
Address change detected: 2: ens33    inet 192.168.0.108/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: valid_lft forever preferred_lft forever
Address change detected: 2: ens33    inet 192.168.0.108/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: valid_lft forever preferred_lft forever
Address change detected: 2: ens33    inet 192.168.0.108/24 brd 192.168.0.255 scope global noprefixroute ens33
Address change detected: valid_lft forever preferred_lft forever
```

## shell中与awk结合使用
### 获取dns
```bash
#获取接口信息
root@ubuntu:/tmp# nmcli device show ens33 2>/dev/null
GENERAL.DEVICE:                         ens33
GENERAL.TYPE:                           ethernet
GENERAL.HWADDR:                         00:0C:29:59:EA:9D
GENERAL.MTU:                            1500
GENERAL.STATE:                          100 (connected)
GENERAL.CONNECTION:                     netplan-ens33
GENERAL.CON-PATH:                       /org/freedesktop/NetworkManager/ActiveConnection/1
WIRED-PROPERTIES.CARRIER:               on
IP4.ADDRESS[1]:                         192.168.0.108/24
IP4.GATEWAY:                            192.168.0.1
IP4.ROUTE[1]:                           dst = 192.168.0.0/24, nh = 0.0.0.0, mt = 100
IP4.ROUTE[2]:                           dst = 169.254.0.0/16, nh = 0.0.0.0, mt = 1000
IP4.ROUTE[3]:                           dst = 0.0.0.0/0, nh = 192.168.0.1, mt = 100
IP4.DNS[1]:                             192.168.0.1
IP4.DNS[2]:                             8.8.8.8
IP6.ADDRESS[1]:                         fe80::20c:29ff:fe59:ea9d/64
IP6.GATEWAY:                            --
IP6.ROUTE[1]:                           dst = fe80::/64, nh = ::, mt = 256

#获取dns
root@ubuntu:/tmp# nmcli device show ens33 2>/dev/null | awk '$1~"^IP4.DNS"{print $2}'
192.168.0.1
8.8.8.8
```



---

> 作者:   
> URL: https://cfanzp.com/shell/  

