# centos 安装使用mysqldiff,mysqldbcompare


<!--more-->
# centos 安装使用mysqldiff,mysqldbcompare
## 下载
```
wget https://downloads.mysql.com/archives/get/p/30/file/mysql-utilities-1.6.5.tar.gz
```

## 安装
- 错误提示(如果用yum命令安装或者使用rpm包安装可能会出现）
```
from mysql.utilities.common.tools import check_python_version
```
- 解决办法是使用源码编译安装（python使用python2)
```
tar -zxvf mysql-utilities-1.6.5.tar.gz
cd mysql-utilities-1.6.5/
python2 ./setup.py build
python2 ./setup.py install
```

### python默认版本2改3后yum提示错误,修改yum程序文件解决
- 查看安装的python版本
```bash
[root@lzw portainer]# ls /usr/bin | ag python
python
python2
python2.7
python2.7-config
python2-config
python3
python3.6
python3.6m
python-config
```

- 修改/usr/bin/yum和/usr/libexec/urlgrabber-ext-down,将python改为python2
```shell
vim /usr/bin/yum
#!/usr/bin/python2
vim /usr/libexec/urlgrabber-ext-down
#!/usr/bin/python2
```

## 使用mysqldiff
- 对比数据库
```bash
[root@dev127 ~]# mysqldiff --server1=root:123456@localhost --server2=root:123456@localhost paoshangdb:paoshangdb_zp
# WARNING: Using a password on the command line interface can be insecure.
# server1 on localhost: ... connected.
# server2 on localhost: ... connected.
# WARNING: Objects in server1.paoshangdb but not in server1.paoshangdb_zp:
#        TABLE: t_formationitem_change_reocrd
#    PROCEDURE: p_gm_init_hero_test
#    PROCEDURE: p_gm_init_hero_test_formation_todel
#    PROCEDURE: p_test
#    PROCEDURE: p_gm_init_hero_test_todel
#    PROCEDURE: p_gm_init_hero_test_formation_old
# WARNING: Objects in server1.paoshangdb_zp but not in server1.paoshangdb:
#        TABLE: t_zong_task_guan_config
#    PROCEDURE: p_zongtask_guan_eventgroup_config
# Compare failed. One or more differences found.
```

- 对比表
```bash
[root@dev127 ~]# mysqldiff --server1=myb:123456@localhost --server2=myb:123456@localhost paoshangdb.t_account:paoshangdb_zp.t_account
# WARNING: Using a password on the command line interface can be insecure.
# server1 on localhost: ... connected.
# server2 on localhost: ... connected.
# Comparing paoshangdb.t_account to paoshangdb_zp.t_account        [PASS]
# Success. All objects are the same.
```

## 使用mysqldbcompare
```
mysqldbcompare --server1=myb:123456@localhost --server2=myb:'123456'@127.0.0.1:8803 \
    --changes-for=server1 \
    --difftype=sql \
    --skip-checksum-table \
    --skip-data-check \
    --skip-row-count \
    --run-all-tests paoshangdb_zp:paoshangdb
```

## 参考
- 源码编译安装mysql utilities: https://blog.csdn.net/xfxfxfxfxf666/article/details/101164604

## 总结
- 安装mysqldiff会遇到python依赖问题，当前版本的mysqldiff依赖python2。（希望python2快点淘汰掉吧）
- mysqldiff 对于简单的数据库以及表对比还是比较有用的。
- yum 依赖python2,如果把系统默认的python版本软链接到了python3记得需要修改yum程序开头python的版本(vim /usr/bin/yum)


---

> 作者:   
> URL: http://111.230.8.71:8889/mysqldiff/  

