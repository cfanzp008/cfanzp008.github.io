# mysql-使用mysqldump来备份数据库


# mysql-使用mysqldump来备份数据库
## 导出单个表
```
mysqldump -u root -p123456 testdb t_user > t_user.sql
```

### 去掉注释
- 这个太重要了，方便保存后通过git等代码管理工具比较差异
```
--skip-comments
```

### 输出更少的信息
```
--compact 相当于
--skip-add-drop-table --skip-add-locks --skip-comments --skip-disable-keys
```

### 插入语句单行输出
- 这一点很重要，如果记录比较多的话，生成的sql没法看。
```
--extended-insert=FALSE
```

## 备份多个表
- 在all_base_table.txt中存放需要备份的表名
```
cat all_base_table.txt
t_user_config
t_login_config
t_game_config
```
- 执行下面的脚本就可以批量备份表以及里面的数据
```
#!/bin/bash

for tbname in $(cat all_base_table.txt)
    do
    echo tbname: $tbname
    mysqldump -h192.168.2.127 -P3306 -uroot -p123456 --opt testdb  $tbname--skip-comments --extended-insert=FALSE >./base_table/$tbname.sql
    echo basetable: $tbname
done
```

## 备份整个数据库的结构:
```
des_file=testdb_no_data_v0.0.1.sql
mysqldump -h192.168.2.127 -P3306 -uroot -p123456 testdb --no-data --routines --skip-comments > $des_file
```

## 备份整个数据库的结构和数据并压缩
```
dt=$(date +%Y%m%d_%H%M%S)
des_file=testdb_bak_$dt.sql
bak_file=testdb_bak_$dt.tar.gz
mysqldump -h192.168.2.127 -P3306 -uroot -p123456 testdb --routines > $des_file
tar -czvf $bak_file $des_file
mv $bak_file ./bak/
rm -f $des_file
```

## 备份数据恢复
```
mysql -uroot -p
use testdb
source /data/testdb.sql
```

## 不想导入备份中的某些大表怎么办？
这里提供一个思路，如果你知道是那些表太大了，那就可以把这些表的insert语句删掉再进行导入。
- 例如：条record_round和表record_game太大了，不导入这2个表的记录那么可以用sed命令删除掉相关记录
```
sed '/INTO `record_round` VALUES/d;/INTO `record_game` VALUES/d' testdb.sql >testdb_min.sql
```

## 总结
- 上面只是列举了常用的几种用法
- mysqldump的用法还很多，有需要的同学可以深入研究学习一下。
- mysqldump的笔记先就记到这里，后面有更有价值的用法再行补充。


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/linux-mysqldump/  

