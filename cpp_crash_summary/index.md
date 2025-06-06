# c++ 容易crash的点


<!--more-->
# c++ 容易crash的点
## 一点感想
c++ 是一门让人又爱又不安的语言，爱的是它的运行高效，兼顾面向对象的特性。不安的是用不好的情况下很容易就crash了。这里收集一些比较典型的容易crash的点。

## 容易crash得点
### 数组越界

### replace引起的crash
在做replcae操作前，需要先确定这个元素是存在的。
- 例如
```c++
string a = "abc";
a.replace(a.find("_"),1,",");
```
- 安全写法
```c++
string a = "abc";
if (a.find("_") != string::npos) {
   a.replace(a.find("_"),1,",");
}
```

### char* 转string 引起的crash
- char* 为0或null赋值给string,或通过函数参数转为string都会引起crash.
```c++
char* a = 0;
string b = a;
```


---

> 作者:   
> URL: http://111.230.8.71:8889/cpp_crash_summary/  

