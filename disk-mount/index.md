# 磁盘挂载


<!--more-->
# 磁盘挂载
## 修改配置文件/etc/fstab
- 格式
```bash
<设备> <挂载点> <文件系统类型> <挂载选项> <备份频率> <检查顺序>
```
- 例如
```bash
vim /etc/fstab
/dev/sdb1 /data ext4 defaults 0 0
sudo mount -a
```


---

> 作者:   
> URL: https://cfanzp.com/disk-mount/  

