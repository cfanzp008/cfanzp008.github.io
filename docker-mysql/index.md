# Docker安装运行Mysql


<!--more-->

# Docker安装运行Mysql
## 编写docker-compose文件mysql.yaml
```
version: '3' #设置docker compose 版本
services: #设置services
  mysql:
    image: mysql:5.6
    container_name: dev127_mysql
    restart: always
    ports:
      - 3306:3306
    volumes: #指定挂载目录
      - /data/dockerrun/mysql/conf:/etc/mysql/conf.d
      - /data/dockerrun/mysql/conf:/etc/mysql/mysql.conf.d
      - /data/dockerrun/mysql/data:/var/lib/mysql
      - /data/dockerrun/mysql/logs:/var/lib/mysql/error.log
    environment:
      MYSQL_ROOT_PASSWORD: test123456
      MYSQL_DATABASE: test
      MYSQL_USER: test123
      MYSQL_PASSWORD: test123456
```

## 编写启动脚本:start_dev127_mysql.sh
```
docker-compose  -f  mysql.yaml  up  -d
```

## 关闭脚本
```
docker stop dev127_mysql
```


---

> 作者:   
> URL: https://cfanzp.com/docker-mysql/  

