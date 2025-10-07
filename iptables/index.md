# iptables的用法


<!--more-->
# iptables的用法
## 1. 什么是iptables?
iptables实际上是一个netfilter的管理工具。netfilter是linux内核中实现包过滤的内核模块。

## 2. iptables的四表五链
### 2.1. 表的处理优先级
```
{{< mermaid >}}
graph LR
  raw-->mangle
  mangle-->nat
  nat-->filter
{{< /mermaid >}}
```

### 2.2. 四表
- iptable_filter: filter 表用来对数据包进行过滤，要求决定如何处理一个数据包。
  - 包含链：input、forward、output
```
{{< mermaid >}}
graph LR
  filter-->input
  filter-->forward
  filter-->output
{{< /mermaid >}}
```

- iptable_nat：nat表主要用来修改数据包的IP地址、端口号信息。
  - 包含链：prerouting、postrouting、output
```
{{< mermaid >}}
graph LR
  nat-->prerouting
  nat-->postrouting
  nat-->output
{{< /mermaid >}}
```


- iptable_mangle: mangle表用来修改数据包的服务类型，生存周期，为数据包设置标记，实现流量整形，策略路由。
  - 包含链：prerouting、postrouting、input、forward、output
```
{{< mermaid >}}
graph LR
  mangle-->prerouting
  mangle-->postrouting
  mangle-->input
  mangle-->forward
  mangle-->output
{{< /mermaid >}}
```
- iptable_raw：raw主要用来决定是否对数据包进行状态跟踪。
  - 包含链：prerouting、output
```
{{< mermaid >}}
graph LR
  raw-->prerouting
  raw-->output
{{< /mermaid >}}
```


### 2.3. 五链
- PREROUTING
- INPUT
- FORWARD
- OUTPUT
- POSTROUTING
```
input 链：当收到访问防火墙本机地址的数据包时，将应用此链中的规则；
output 链：当防火墙本机向外发送数据包时，将应用此链中的规则；
forward 链：当收到需要通过防火中转发给其他地址的数据包时，
            将应用此链中的规则，
            注意如果需要实现forward转发需要开启Linux内核中的ip_forward功能；
prerouting 链：在对数据包做路由选择之前，将应用此链中的规则；
postrouting 链：在对数据包做路由选择之后，将应用此链中的规则；
```

## 3. iptables的命令用法
```bash
 iptables 命令的常用管理选项
 -A:在指定链的末尾添加一条新的规则
 -D:删除指定链中的某一条规则，可删除指定序号或具体内容
 -I:在指定链中插入一条新规则，未指定序号时默认作为第一条规则
 -R:修改、替换指定链中的某一条规则，可指定规则序号或具体内容
 -L:列出指定链中所有的规则，未指定链名，则列出表中的所有链
 -F:清空指定链中所有的规则，未指定链名，则清空表中的所有链
 -P:设置指定链的默认策略
 -n:使用数字形式显示输出结果
 -v:查看规则列表时显示详细的信息
 -h:查看命令帮助信息
 --line-numbers:查看规则列表时，同时显示规则在链中的顺序号
```

## 4. iptables使用举例
- 查看规则
```bash
iptables -L -n
```

## 5. 参考
- https://zhuanlan.zhihu.com/p/347754874


---

> 作者:   
> URL: http://111.230.8.71:8889/iptables/  

