# lua-pbc(lua的protobuf库)如何使用？


# lua-pbc(lua的protobuf库)如何使用？
## lua-pbc是什么?
lua-pbc,即lua protocol buffer fro c,是云风写的一个给lua使用的protobuf封包解包的库,如果你想用skynet来写游戏等服务端应用，lua-pbc是不错的选择。

lua-pbc github地址为: https://github.com/cloudwu/pbc

关于pbc的设计，大家可以看一下云风的博客: https://blog.codingnow.com/2011/12/protocol_buffers_for_c.html


## lua-pbc如何使用？
这里有几个接个api需要熟悉一下

编写protobuf的proto文件 User.proto
```protobuf
package tutorial;
message User {
   optional string name  = 1;
}
```

引入模块`protobuf`
```lu
local pb = require "protobuf"
```

注册文件
```lua
pb.register_file "User.pb"
```

encode
```lua
local msg_table = {
    name = "test1"
}
pb.encode("tutorial.User",msg_table},
```

decode
```
local msg_table = pb.decode("tutorial.Person", buf)
```

## 使用感受
lua-pbc使用了很长一段时间，官方skynte升级支持lua5.4以后，pbc还是可以正常工作的。
pbc的接口设计是比较简洁的，用起来也非常方便。想深入了解的同学，建议去看看源码。

## 参考
- pbc: https://github.com/cloudwu/pbc
- pbc binding lua: https://github.com/cloudwu/pbc/blob/master/binding/lua/README.md


---

> 作者: [](https://cfanzp.com/about/)  
> URL: http://111.230.8.71:8889/lua-pbc/  

