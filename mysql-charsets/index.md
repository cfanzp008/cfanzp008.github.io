# mysql修改编码支持utf8mb4


<!--more-->
# mysql修改编码支持utf8mb4
## utf8mb4支持
如果要支持特殊表情就必须支持utf8mb4
### 修改配置文件my.cnf
```ini
[client]
default-character-set=utf8mb4
[mysql]
default-character-set=utf8mb4
[mysqld]
character-set-client-handshake=FALSE
character-set-server=utf8mb4
#collation-server=utf8mb4_general_ci
collation-server=utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'
```

## 查看数据库编码
```mysql
use mysql;
show variables like 'char%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8mb4                    |
| character_set_connection | utf8mb4                    |
| character_set_database   | utf8mb4                    |
| character_set_filesystem | binary                     |
| character_set_results    | utf8mb4                    |
| character_set_server     | utf8mb4                    |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
```


---

> 作者:   
> URL: http://111.230.8.71:8889/mysql-charsets/  

