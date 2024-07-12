# libuv


<!--more-->
# libuv
最近自己在做的一个项目的部分逻辑是从一个老项目中移植过来的，移植过来后发现了其中的websocket模块会经常crash掉，原来的项目也是如此。而websocket模块用到了libuv库，这个库我大概查了点资料，总的来说，还是有些坑的。这里记录一下。
后续解决了问题，再来补充。


## libuv websocket
这里找到了一个libuv的websocket库，先记录一下
- libuv websocket库：https://github.com/zyx4843/websocket_by_libuv


---

> 作者:   
> URL: https://cfanzp.com/libuv/  

