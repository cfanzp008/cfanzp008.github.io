# lua中给日志关键字加上颜色


<!--more-->
# lua中给日志关键字加上颜色
## 控制文本颜色的ANSI转义序列
通用的控制文本颜色的转义序列格式如下：
```
CSI n1 [;n2 [;…]] m
```
- 其中CSI全称为“控制序列引导器”（Control Sequence Introducer/Initiator），也就是上述示例中的"\033["；
- n1、n2等表示SGR参数（下面会列出一些常用的SGR参数），用于控制颜色、粗体、斜体、闪烁等文本输出格式；
- m表示转义序列结束。

## 依次输出黑红绿黄蓝紫青白
```bash
echo -e "\033[30mBlack Text\033[0m"
echo -e "\033[31mRed Text\033[0m"
echo -e "\033[32mGreen Text\033[0m"
echo -e "\033[33mYellow Text\033[0m"
echo -e "\033[34mBlue Text\033[0m"
echo -e "\033[35mMagenta Text\033[0m"
echo -e "\033[36mCyan Text\033[0m"
echo -e "\033[37mWhite Text\033[0m"
```

编码含义
| 编码 | 含义                             |
| --   | --                               |
| 0    | 关闭所有格式，还原为初始状态     |
| 1    | 粗体/高亮显示                    |
| 2    | 模糊                             |
| 3    | 斜体                             |
| 4    | 下划线                           |
| 5    | 闪烁（慢）                       |
| 6    | 闪烁（快）                       |
| 7    | 交换背景色与前景色               |
| 8    | 隐藏（伸手不见五指，啥也看不见） |
| 30-37    | 前景色|
| 40-47    | 背景色|

前景色编码含义
| 前景色编码 | 含义 |
| --         | --   |
| 30         | 黑色 |
| 31         | 红色 |
| 32         | 绿色 |
| 33         | 黄色 |
| 34         | 蓝色 |
| 35         | 紫色 |
| 36         | 青色 |
| 37         | 白色 |


背景色编码含义
| 背景色编码 | 含义 |
| --         | --   |
| 40         | 黑色 |
| 41         | 红色 |
| 42         | 绿色 |
| 43         | 黄色 |
| 44         | 蓝色 |
| 45         | 紫色 |
| 46         | 青色 |
| 47         | 白色 |

### 在lua中打印带颜色的日志
```lua
local function logger(str,color)
    return function(...)
        skynet.error(string.format("%s%s\x1b[0m", color, str), ...)
    end
end
-- 把DEBUG日志打印成蓝色
local DEBUG = logger("[D]", "\x1b[34m")
-- 把INFO日志打印成绿色
local INFO = logger("[I]", "\x1b[32m")
-- 把WARN日志打印成白色
local WARN = logger("[W]", "\x1b[33m")
-- 把错误日志打印成红色
local ERROR = logger("[E]", "\x1b[31m")

DEBUG("this is a debug log")
```
## 参考资料
- https://www.cnblogs.com/opangle/p/4082692.html


---

> 作者:   
> URL: http://111.230.8.71:8889/terminal-color/  

