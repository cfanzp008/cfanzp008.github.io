# watch命令的用法


<!--more-->
## watch命令的用法
### 使用watch命令查看文件game.log 大小的实时变化,3s刷新1次
```bash
watch -n3 ls -lh game.log
```

### 每3秒查看网络连接数变化(怀疑收到攻击时会比较有用）
```bash
watch -n3 'netstat -ntp |wc -l'
```

### 每5秒查看系统负载
```bash
watch -n5 'cat /proc/loadavg'
```

### 每1秒查看http连接数，确认是否收到CC攻击
```bash
watch -n 1 -d 'pstree|grep http'
```

### 每3秒输出一次内存使用情况
```bash
watch -n 3 -d free -m
```

### 每5秒输出一次系统负载情况
```bash
watch -n 3 -d uptime
```



---

> 作者:   
> URL: https://cfanzp.com/watch/  

