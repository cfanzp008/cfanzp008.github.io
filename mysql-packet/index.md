# mysql数据包分析


<!--more-->
# mysql数据包分析
最近再研究数据库数据安全时需要分析mysql数据库的认证流程，获取到认证信息中的用户名来作为用户的唯一标识。
## 认证数据包
- Auth packet
```golang
//4 + 4 + 1 + 23
func (packet *Packet) GetDBUser() string {
    offset := 4 + 4 + 1 + 23
    data := packet.data[offset:]
    return string(data[0:bytes.IndexByte(data, 0)])
}
```

## 参考
- https://www.jianshu.com/p/76a078e308f8


---

> 作者:   
> URL: http://111.230.8.71:8889/mysql-packet/  

