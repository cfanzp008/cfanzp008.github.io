# mysql配置外网访问权限


<!--more-->

# mysql配置外网访问权限

## 修改配置文件
```
[mysqld]
bind-address=0.0.0.0
```

## 登录mysql并修改数据库权限
```
mysql -u root -p
mysql> use mysql;
mysql> select user,host from user;

mysql> update user set host='%' where user='root';
mysql> flush privileges;

mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
mysql> flush privileges;
```


---

> 作者:   
> URL: http://111.230.8.71:8889/mysql-login/  

