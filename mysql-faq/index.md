# mysql FAQ


<!--more-->
# mysql FAQ
### 常用查询
- 查看版本号
```mysql
select version();
+-----------+
| version()  |
+-----------+
| 5.6.51-log |
+-----------+
1 row in set (0.03 sec)
```

- 查看数据库编码
```mysql
show variables like 'char%';
+------------------------+--------------------------+
| Variable_name           | Value                     |
+------------------------+--------------------------+
| character_set_client     | utf8mb4                   |
| character_set_connection | utf8mb4                   |
| character_set_database   | utf8mb4                   |
| character_set_filesystem | binary                    |
| character_set_results    | utf8mb4                   |
| character_set_server     | utf8mb4                   |
| character_set_system     | utf8                      |
| character_sets_dir      | /usr/share/mysql/charsets/ |
+------------------------+--------------------------+
```

- 查看当前mysql提供哪些引擎
```
show engines;
```

- 查看当前默认存储引擎
```
show variables like '%storage_engine%';
```

- 查看表tb_a用了什么引擎
```
show create table tb_a;
```

- 如批量替换字符串前缀
```
UPDATE t_shop
SET img = REPLACE(img, 'https://a.com', 'https://b.com')
WHERE img LIKE 'https://a.com.net%';
```


---

> 作者:   
> URL: https://cfanzp.com/mysql-faq/  

