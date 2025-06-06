# skynet-给debug_console添加ag搜索


# skynet：debug console添加搜索功能
## 为什么要给skynet的debug console添加搜索功能?
-  使用skynet一段时间后，发现，在动态创建skynet service的情况下，如果service很多,有时很难找到我们想要找到我们要找的那个skynet服务，用skynet的list命令会罗列所有的服务，因此我们需要像grep,ag这样的命令功能来搜索skynet的服务。

## 实现搜索命令ag
```lua
local function get_all_list(key_string)
local table_list={}
local all_services = skynet.call(".launcher", "lua", "LIST")
local count = 0
for k,v in pairs(all_services) do
if string.match(k, key_string) or string.match(v, key_string) then
table_list[k] = v
count = count + 1
end
end
table_list["total_count"] = count
return table_list
end


function COMMAND.ag(key_string)
    if key_string == nil then
    skynet.error("ag nil string:")
    return nil
    end
    skynet.error("ag:",key_string)
return get_all_list(key_string)
end
```

---

- 查找包含vip字段的服务
```
ag vip
:0000003b       snlua vip_service
:0000003c       snlua vip_agent 1
total_count     2
<CMD OK>
```

-  查找包含3b的服务
```
ag 3b
:0000003b       snlua vip_service
total_count     1
<CMD OK>
```
---


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/skynet-debug_console-ag/  

