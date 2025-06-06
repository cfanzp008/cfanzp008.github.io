# lua中string.pack,string.unpack的用法


# lua中string.pack,string.unpack的用法
lua string.pack的用法,查看lua5.4的官方帮助手册不难找到下面的解释:
> string.pack (fmt, v1, v2, ···)
>
> Returns a binary string containing the values v1, v2, etc. serialized in binary form (packed) according to the format string fmt (see §6.4.2).

最近一个新项目要将brotobuf协议包裹在http协议内进行传输，刚好用到了这个函数,在pb数据包封包后，协议按3部分拼接:
```
数据包长度(msgid + pb_data) + 协议ID + pb数据包体
```
封包过程如下:

```lua
local pb_data = pb_helper.pb_encode(msgname, msg)
local buf = string.pack(">I4c" .. #pb_data, msgid, pb_data)
local send_buf = string.pack(">s2", buf)
```

解包过程如下:
```lua
local buf = msg --des_decode(secret, msg)
local len = string.unpack(">I2", buf) -- 取长度
local msgid = string.unpack(">I4", buf, 3) -- 取消息号,3是标记buf从哪里开始读
```

其中的">,s2,I2,I4,c..$pb_buf"含义在手册上也能清楚查到:
```
<: sets little endian
>: sets big endian
=: sets native endian
![n]: sets maximum alignment to n (default is native alignment)
b: a signed byte (char)
B: an unsigned byte (char)
h: a signed short (native size)
H: an unsigned short (native size)
l: a signed long (native size)
L: an unsigned long (native size)
j: a lua_Integer
J: a lua_Unsigned
T: a size_t (native size)
i[n]: a signed int with n bytes (default is native size)
I[n]: an unsigned int with n bytes (default is native size)
f: a float (native size)
d: a double (native size)
n: a lua_Number
cn: a fixed-sized string with n bytes
z: a zero-terminated string
s[n]: a string preceded by its length coded as an unsigned integer with n bytes (default is a size_t)
x: one byte of padding
Xop: an empty item that aligns according to option op (which is otherwise ignored)
' ': (space) ignored
```

## 参考
- [lua5.4手册英文版](http://www.lua.org/manual/5.4/manual.html)


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/lua-string-pack/  

