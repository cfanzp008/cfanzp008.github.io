# 服务器内存资源优化


<!--more-->
# 服务器内存资源优化
## 优化原因
- 手里有一台TX的服务器， 配置不高，偶尔用一用，具体配置如下:
```bash
cpu:2核
disk:50G
memory:2G
```
- top查看在不启动任何服务的情况下，内存就占用了350M左右,在总内存只有2g的情况下，优化还是很有必要的。

## 哪些进程可以kill?
```
tat_agent
qcloud相关进程
```
- 
## 关闭方法
- 关闭相关进程，删除相关目录
```bash
systemctl stop tat_agent
systemctl disable tat_agent
/usr/local/qcloud/YunJing/uninst.sh
/usr/local/qcloud/stargate/admin/uninstall.sh
/usr/local/qcloud/monitor/barad/admin/uninstall.sh

rm -f /etc/systemd/system/tat_agent.service
rm -rf /usr/local/qcloud
rm -rf /usr/local/sa
rm -rf /usr/local/agenttools
rm -rf /tmp/tat_agent
```

- 关闭相关定时器,查看定时任务，删除相关的定时任务即可
```bash
$ crontab -l
 
*/1 * * * * /usr/local/qcloud/stargate/admin/start.sh > /dev/null 2>&1 &
```

## 优化效果
- 清理了这些进程后，内存占用降低到了200M以内了。


---

> 作者:   
> URL: https://cfanzp.com/server-process-mem-tencent/  

