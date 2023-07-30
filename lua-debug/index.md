# lua中如何实现打印行号和当前函数名？


# lua中如何实现打印行号和当前函数名？
lua中可以使用debug的get_info方法来获取当前的堆栈信息，进而可以打印出相关的环境信息，具体信息包括:
```lua
table: 0x7f92b8f19e80
{
    isvararg = false    ,
    what = Lua  ,
    func = function: 0x7f92b7b8d600     ,
    namewhat =  ,
    istailcall = true   ,
    lastlinedefined = 16        ,
    source = @service/db/db_interactionemotion.lua      ,
    linedefined = 7     ,
    currentline = 11    ,
    ntransfer = 0       ,
    short_src = service/db/db_interactionemotion.lua    ,
    ftransfer = 0       ,
    nups = 3    ,
    nparams = 0 ,
}
```

lua中需要打印行号多半是日志需求，下面是一个demo:
```lua
local logger_api = require 'common.logger_api'
local tag = "test"
local test_id = 0

local M = {}

local function get_debuginfo(info)
    --utils.var_dump(info)
    local d = ""
    if info ~= nil and info.short_src ~= nil and info.currentline ~= nil then
      d =  info.short_src .. ":" .. info.currentline .. ":"
    end
    return d
end

function M.ELOG(...)
    local info = debug.getinfo(2)
    local d = get_debuginfo(info)
    logger_api.ERROR(string.format("%s[E]no_%s_%s",d,test_id,tag),...)
end

function M.WLOG(...)
    local info = debug.getinfo(2)
    local d = get_debuginfo(info)
    logger_api.WARN(string.format("%s[W]no_%s_%s",d,test_id,tag),...)
end

function M.NLOG(...)
    logger_api.INFO(string.format("[N]no_%s_%s", test_id,tag), ...)
end

function M.DLOG(...)
    local info = debug.getinfo(2)
    local d = get_debuginfo(info)
    logger_api.DEBUG(string.format("%s[D]no_%s_%s",d,test_id,tag),...)
end
return M
```


---

> 作者:   
> URL: https://cfanzp.com/lua-debug/  

