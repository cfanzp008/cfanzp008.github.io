# lua面向对象编程


## lua面向对象编程
- 对象定义:
```lua
local logger = require "common.logger"
local date = require "common.date"
local uuid = require "uuid"
uuid.seed() -- 初始化uuid种子

local Tracer = {
    tid = "",
    uid = 0,
    msgid = 0,
    start_time = 0,
    end_time = 0
}

local function get_new_id()
    local tmp_uuid = uuid()
    local new_uuid = string.gsub(tmp_uuid,"-","")
    return new_uuid
end

local function get_traceid(a_uid,a_msgid,start_time)
    local uid = a_uid
    if a_uid == nil then
        uid = ""
    end
    local msgid = a_msgid
    if a_msgid == nil then
        msgid = ""
    end
    local id = get_new_id()
    local tid = "utid_" .. tostring(uid) .. "_" ..msgid .. "_".. id
    tid = tid .. "_" .. tostring(start_time)
    return tid,start_time
end

function Tracer:new(a_uid,a_msgid)
    local o = {}
    self.__index = self
    setmetatable(o,self)
    o.uid = a_uid
    o.msgid = a_msgid
    o.start_time = date.skynet_time()
    local tid = get_gate_traceid(a_uid,a_msgid,o.start_time)
    o.tid = tid
    return o
end

function Tracer:get_tid()
    return self.tid
end

local function check_time(tid,start_time,end_time,...)
    local diff_time = math.floor(end_time - start_time)
    if diff_time > ERROR_TIME then
        local str_time = string.format("\x1b[31mERROR NEED UPDATE-%dms\x1b[0m", diff_time)
        ELOG(string.format("[%s][%s]", tid, str_time ),...)
    elseif diff_time > WARN_TIME then
        local str_time = string.format("\x1b[33mTOO SLOW-%dms\x1b[0m", diff_time)
        WLOG(string.format("[%s][%s]", tid, str_time ),...)
    elseif diff_time > DEBUG_TIME then
        local str_time = string.format("\x1b[34mSLOW-%dms\x1b[0m", diff_time)
        WLOG(string.format("[%s][%s]", tid, str_time),...)
    else
        local str_time = string.format("\x1b[32mFAST-%dms\x1b[0m", diff_time)
        NLOG(string.format("[%s][%s]", tid, str_time),...)
    end
end

function Tracer:trace_ret(end_time,...)
    self.end_time = end_time
    --ELOG("self.start_time:",self.start_time)
    check_time(self.tid,self.start_time,end_time,...)
end

return Tracer
```

- 使用举例:
```lua
local Tracer = require "common.tracer"
local cur_tracer = Tracer:new(msg.uid,msgid)
local tid = cur_tracer:get_tid()
DLOG(tid,"req:",msgid,utils.dump(body_req))
local ret = msg_helper.calllobby_byhttpgate(msg,tid)
--WLOG(tid,"calllobby_byhttpgate_ret:",msgid,utils.dump(ret))
cur_tracer:trace_ret(date.skynet_time(),"calllobby_byhttpgate_ret",msgid,utils.dump(ret))
```

我们可以用.来访问属性:
```lua
local tid = cur_tracer.tid
local uid = cur_tracer.uid
```
## 参考链接:
- [lua面向对象](https://www.runoob.com/lua/lua-object-oriented.html)


---

> 作者:   
> URL: http://111.230.8.71:8889/lua-new/  

