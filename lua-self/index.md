# lua中的self

# lua中的self
## self的用法
- 使用:定义的函数默认接收第一个参数是self
- 使用:调用函数默认传入第一个参数是调用者
- 使用.定义和调用函数不会接受或传入self

:为我们省下了一个参数，下面例子中的A:Add()与A.Add(t)是等价的
```lua
local A = {x = 1, y = 2}
function t:Add()
    return (self.x + self.y)
end

print(A:Add())
print(A.Add(A))
```


---

> 作者:   
> URL: https://cfanzp.com/lua-self/  

