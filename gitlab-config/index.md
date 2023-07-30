# 解决gitlab占用内存太大的问题

# 解决gitlab占用内存太大的问题
最近gitlab服务器出现了占用内存太大的问题。虚拟机里的linux系统内存>4G都被几乎用完了。

网上查询了相关资料，解决方法主要是修改一下配置。或者更换git服务器工具，比如更换为gogs或者gitea等。
因为时间关系暂且改一下配置解决一下问题:

- 配置文件路径为:
```bash
/etc/gitlab/gitlab.rb
```

- 修改相关参数
```
postgresql['shared_buffers'] = "64MB"
postgresql['max_worker_processes'] = 2
sidekiq['max-concurrency']=5
#禁用prometheus，可以进一步减少内存占用
prometheus_monitoring['enable'] = false
sidekiq['concurrency'] = 25
```

- 重启服务
```bash
gitlab-ctl reconfigure
gitlab-ctl restart
```

- 精简gitlab服务:https://zhuanlan.zhihu.com/p/389717047

## 参考资料
- https://zhuanlan.zhihu.com/p/348813603
- https://my.oschina.net/sunhualong/blog/4275867


---

> 作者:   
> URL: https://cfanzp.com/gitlab-config/  

