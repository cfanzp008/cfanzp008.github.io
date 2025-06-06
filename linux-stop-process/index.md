# linux中使用脚本关闭进程


# linux中使用脚本关闭进程
## 关闭进程脚本
1. 通过ps命令，grep命令以及awk命令找到进程的pid
2. 使用kill命令关闭进程

## 脚本demo:
```bash
rootot@dev doc]# cat stop_mdbook_doc.sh 
#!/bin/bash
kill_pid=`ps -ef | grep mdbook | grep 4001 | grep -v grep | awk '{print $2}'`
echo "pid = "${kill_pid}

if [ -n "${kill_pid}" ]
then
    kill -9 ${kill_pid}
    echo "mdbook 4001 pid:"${kill_pid}"进程已kill成功"
else
     echo "mdbook 4001 进程已不存在"
fi
[root@dev doc]#
```


---

> 作者: [](https://cfanzp.com/about/)  
> URL: http://111.230.8.71:8889/linux-stop-process/  

