# Windows如何写一个脚本定时删除日志？


<!--more-->
# Windows如何写一个脚本定时删除日志？
windows服务器维护时，经常需要定期删除日志，这里时一个删除7天前日志的脚本demo，配置定时任务，每天执行就可以了。
vim ./del_log.bat
```
@echo off
forfiles -p F:\log\ -s -m *.log* -d -7 -c "cmd /c del @path"
```


---

> 作者:   
> URL: http://111.230.8.71:8889/windows-del-log/  

