# frr学习笔记


<!--more-->
# frr学习笔记
最近在学习frr的基本用法，这里记录一下。
## frr的安装
- ubuntu安装方法
```bash
sudo apt-get install
```

## frr的使用
我使用的是frr版本8.1和frr10.0,其它同学用的是frr7.5的版本环境是centos,我的应用环境是ubuntu,在测试时发现有些命令会有点对不上。经过验证发现7.5版本与8.1+版本的frr生成的配置文件确实存在差异。
- 主要配置文件/etc/frr/frr.conf
- 启动命令
```bash
systemctl start frr
```


---

> 作者:   
> URL: https://cfanzp.com/frr/  

