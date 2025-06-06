# skynet中使用uuid库

# skynet中使用uuid库
最近在使用之前一位同学写的uuid库时发现了uuid在不通的skynet虚拟机中可能会产生相同的值的现象，这里记录一下。产生的原因是，这2个虚拟机是在服务启动的时候创建的，间隔时间很短，随机种子估计是一样的。后面产生的随机序列都是一样的。
## uuid库初始化种子
相同时间初始化种子，后续产生的随机数是相同的,随机种子初始化代码如下:
```lua
local uuid = require "uuid"
uuid.seed() -- 初始化uuid种子
```

不同lua虚拟机中使用uuid可能生成相同的uuid,下面就是2个skynet服务在相同时间创建并初始化uuid种子的例子,不难看出，2个服务轮询接受请求，依次产生的uuid是相同的。
```
[:0000001a] [2022-07-29 11:36:36.561] [W] [login_web_agent1] service/login/platform/account_login.lua:111: req: 40a1bbf6-2e44-4b4a-cb9d-7a383472184b
[:0000001b] [2022-07-29 11:36:44.059] [W] [login_web_agent2] service/login/platform/account_login.lua:111: req: 40a1bbf6-2e44-4b4a-cb9d-7a383472184b
[:0000001a] [2022-07-29 11:36:55.069] [W] [login_web_agent1] service/login/platform/account_login.lua:111: req: bc96f82f-c94c-4398-c346-e956a92dcc11
[:0000001b] [2022-07-29 11:41:13.213] [W] [login_web_agent2] service/login/platform/account_login.lua:111: req: bc96f82f-c94c-4398-c346-e956a92dcc11
```
## 总结
这个uuid库的使用需要保证uuid的使用是在一个虚拟机内。如果想uuid不重复，又要保证唯一性，可以创建一个专有的skynet虚拟机来提供uuid的分配工作。


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/skynet-uuid/  

