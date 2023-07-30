# mysql存储过程


# mysql存储过程
## FAQ
## 如何创建存储过程?
下面是一个创建存储过程的demo:
- 存储过程名为:p_login
- 存储过程有3个参数:a_platform,a_account,a_password
```mysql
CREATE DEFINER=`root`@`%` PROCEDURE `p_login`(in a_platform int,
in a_account varchar(64), in a_password varchar(32))
begin
    SELECT *,userid as uid
    FROM tb_account
    WHERE account=a_account AND
          platform=a_platform  AND
          `password`=a_password AND
          nullity = '0'  AND android = '0';
end
```

## 如何调用存储过程?
```mysql
CALL p_login(1,"aaa","password");
```

## 存储过程中常用的函数有哪些？
- 获取当前时间搓
```mysql
current_timestamp()
```

- 获取时间
```mysql
NOW()
```

- 获取当前日期
```mysql
curdate()
```

- 获取最后一个标识值
在一条 INSERT、SELECT INTO 或大容量复制语句完成后，@@IDENTITY 中包含语句生成的最后一个标识值
```
select @@IDENTITY
```

- 获取今天，昨天，前天的当前时间
```mysql
CREATE DEFINER=`root`@`%` PROCEDURE `p_demo_get_daily_login_report`(IN `a_step` int)
BEGIN
    DECLARE start_day TIMESTAMP;
    DECLARE end_day TIMESTAMP;
    # a_step=0 今天
    # a_step=1 昨天
    # a_step=2 前天
    SET start_day = (CAST(SYSDATE()AS DATE) - INTERVAL a_step DAY);
    SET end_day = (CAST(SYSDATE()AS DATE) + INTERVAL 1 DAY - INTERVAL a_step DAY);

    select a.userid,a.channel_id,b.nickname,COUNT(a.userid) as cnt
    from t_record_login as a,t_account as b
    where a.insert_date > start_day and
          a.insert_date < end_day and
          a.userid = b.userid
    group by a.userid order by cnt desc limit 10;
END
```


---

> 作者:   
> URL: https://cfanzp.com/mysql-procedure/  

