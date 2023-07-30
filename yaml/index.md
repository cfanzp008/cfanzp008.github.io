# yaml配置文件编写规范


<!--more-->
# yaml配置文件编写规范

- key: value表示一对键值对，冒号后面必须要有空格
```yml
key: value
```

## 基本语法
- 大小写敏感。
- 使用空格缩进,不能使用tab。
- 缩进的空格数不重要，只要相同层级的元素左对齐即可。
- #表示注释

## 数据类型
- 对象： 键值对的集合，mapping/hashes/dictionary。
- 数组：sequence/list。
- 纯量：单个的、不可再分的值。

## YAML对象
```yml
key:
  key1:value1
  key2:value2
```

- 复杂对象: ? + 空格代表一个复杂的key,: + 一个空格代表一个value
```yml
? 
  - keya
  - keyb
:
  - valuea
  - valueb
```

## YAML数组
以`-`开头的行表示构成一个数组。
```yml
key:
  - a1
  - a2
  - a3
```

- 行内表示方法
```yml
key: [a1,a2,a3]
```

- 数组嵌入数组
```yml
-
  - a1
  - a2
  - a3
```

- 数组内是对象举例：
```yml
room:
    -
        tableid: 1
        name:table1
    -
        tableid: 2
        name:table2
```

- 也可表示为
```yml
room: [{tableid: 1,name: table1},{tableid: 2,name: table2}]
```

## 纯量
```yaml
boolean:
  - TRUE #true,True都可以
  - FALSE #false,False都可以
float:
  - 3.01
  - 3.1415926
int:
  - 10
  - 0b1010_0111_0100_1010_1110  #二进制表示
null:
  nodeName: 'node'
  parent: ~ #使用~表示null
string:
  - 'Hello xiaomi'
  - xiaoli
  - xiaoliu
  - xiaohu
date:
  - 2023-02-19 #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime:
  - 2018-02-17T15:02:31+08:00 #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```

## 参考
- https://www.runoob.com/w3cnote/yaml-intro.html


---

> 作者:   
> URL: https://cfanzp.com/yaml/  

