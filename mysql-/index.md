# mysql++的使用


<!--more-->
# mysql++的使用
## download
```bash
wget https://tangentsoft.com/mysqlpp/releases/mysql++-3.3.0.tar.gz
sudo apt-get install libmysqlclient15-dev
#sudo apt-get install libmysqlclient-dev
./configure --prefix=/usr/local LDFLAGS='-pthread'
make && make install
```

## 报错
```
Didn't find mysqlclient_r library in '/usr/lib64 /usr/lib /usr/lib64/mysql
```

## doc
- https://tangentsoft.com/mysqlpp/doc/trunk/README-Linux.txt

## mysqlpp demo
```c++
#include <mysql++.h>
#include <ssqls.h>

// 定义数据表结构
sql_create_3(MyTable, 1, 3,
    mysqlpp::sql_int, id,
    mysqlpp::sql_varchar, name,
    mysqlpp::sql_int, age)

int main()
{
    // 创建一个MySQL对象并连接到数据库
    mysqlpp::Connection conn(false);
    if (conn.connect("database_name", "localhost", "username", "password")) {
        // 连接成功

        // 创建一个查询对象
        mysqlpp::Query query = conn.query();

        // 执行查询操作
        query << "SELECT * FROM my_table";
        mysqlpp::StoreQueryResult res = query.store();

        if (res) {
            // 查询成功

            // 遍历结果集
            for (size_t i = 0; i < res.num_rows(); ++i) {
                const MyTable& row = res[i];
                std::cout << "ID: " << row.id << ", Name: " << row.name << ", Age: " << row.age << std::endl;
            }
        } else {
            // 查询失败
            std::cerr << "Query error: " << query.error() << std::endl;
        }

        // 插入数据
        MyTable newRow(0, "John Doe", 25);
        query.insert(newRow);
        if (mysqlpp::SimpleResult result = query.execute()) {
            // 插入成功
            std::cout << "Insert successful. Affected rows: " << result.rows() << std::endl;
        } else {
            // 插入失败
            std::cerr << "Insert error: " << query.error() << std::endl;
        }
    } else {
        // 连接失败
        std::cerr << "Connection error: " << conn.error() << std::endl;
    }

    return 0;
}

```


---

> 作者:   
> URL: https://cfanzp.com/mysql-/  

