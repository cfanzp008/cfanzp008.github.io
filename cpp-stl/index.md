# c++ STL


<!--more-->
# c++ STL
学习c++就没法绕过标准模版库STL。
## STL6大部件
- 容器（Containers）
- 分配器（Allocators）
- 算法（Algorithm）
- 迭代器（Iterators）
- 适配器（Adapters）
- 仿函数（Functors）

## STL的基本使用
### vector
vector是一种变长数组
```c++
vector<类型> 变量名;
```
- 类型名可以是int、double、char、string、struct,也可以是vector、set、queue等容器。
```c++
vector<int> name;
vector<double> name;
vector<char> name;
vector<string> name;
vector<struct node> name;
vector<vector<int> > name;
```
- `vector<vector<int> > name;`中`>>`之间要有空格` `才行。

#### 定义一个二维变长数组
```c++
vector<int> arr[10]; // 二维变长数组。
```
- 注意：低维是高维的地址。
- 二维数组的一维形式就是地址。

#### vector一般有2种访问形式
- 通过下标访问
```c++
#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector v;
    v.push_back(1);
    cout << v[0] << endl;
    return 0;
}
```

- 通过迭代器访问
```c++
void testVectorIterator() {
    vector<int> v;
    for (int i=0;i<5;++i) {
        v.push_back(i+10);
    }

    vector<int>::iterator it = v.begin();

    // it[i] 等价于*(it + i)
    for (int i=0;i<v.size();++i) {
        cout << "vector::it-" << i << ":" << it[i] << endl;
    }

    // 优雅写法
    for (vector<int>::iterator it2 = v.begin(); it2 != v.end();it2++) {
        cout << *it2 << " ";
    }

    cout << endl << "c++11:";
    for (auto it2 = v.begin(); it2 != v.end();it2++) {
        cout << *it2 << " ";
    }
}
```

#### vector常用函数
##### push_back()
- 以前还要为定长数组内存分配而苦恼时，现在只需要无脑push_back()

##### pop_back()

##### size()
- 返回元素个数,时间复杂度为O(1)

##### clear()
- 一键清空vector中的所有元素时间复杂度为O(N),其中N为vector中元素个数。

##### insert()
- 在指定位置插入元素
```c++
v.insert(v.begin()+2,-1); //将-1插入v[2]的位置
```
##### erase()
```c++
//删除v[3]
v.erase(v.begin()+3);

//删除v[1]-v[4]
v.erase(v.begin()+1,v.begin()+4);
```

#### vector常见用途
##### 存储数据
##### 用邻接表存储图

### set
#### 定义
- 是一个内部有序，不存在重复元素的容器。
- 头文件
```c++
#include<set>
using namespace std;
```

- set的定义
```c++
set<类型名>变量名;
```

#### set容器内元素的访问
- 只能通过迭代器来访问。
```c++
set<int>::iterator it;
set<char>::iterator it;
```

- 注意：除了vector和string之外的STL容器都不支持*(it+i)的访问方式

#### set常用函数
##### insert(value)
```c++
set<char> st;
st.insert('A');
st.insert('B');
st.insert('C');
```

##### find(value)
- find(value)返回的是set中value对应的迭代器，也就是value的指针（地址）。
```c++
set<char> st;
st.insert('A');
st.insert('B');
st.insert('C');
set<char>::iterator it = st.find('B');
cout << *it << endl;
```

##### erase(it)
- 删除单个元素
```c++
set<char> st;
st.insert('A');
st.insert('B');
st.insert('C');
set<char>::iterator it = st.find('B');
cout << *it << endl;
st.erase(it);
```

##### erase(beginIt,endIt)
- 删除一个区间类的元素
```c++
set<char> st;
st.insert('A');
st.insert('B');
st.insert('C');
set<char>::iterator it = st.find('B');
cout << *it << endl;
st.erase(it,st.end());
```

##### size()
- 返回set内的元素个数目

### string
### map
### queue
### priority_queue
### stack
### pair
### algrithm

## 参考
- https://zhuanlan.zhihu.com/p/344558356


---

> 作者:   
> URL: http://111.230.8.71:8889/cpp-stl/  

