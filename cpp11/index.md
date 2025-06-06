# c++11新特性


<!--more-->
# c++11新特性
## auto
auto类型推导使得代码更加简洁。
```c++
auto a = 11;
```

## decltype
```c++
auto a = 11;
decltype(a) b = 15;
```

## 列表初始化
- https://zhuanlan.zhihu.com/p/137851769

## 右值引用

## std:function
- 头文件`<std:functional>`
- https://en.cppreference.com/w/cpp/utility/functional/function
```cpp
#include<iostream>
#include<functional>
int add(int a,int b) {
    return a + b;
}

int main() {
    function<int(int,int)> fAdd = add;
    int c = fAdd(1,2);
    cout << 1 << " + " << 2 << " = " << c;
    return 0;
}
```

## std:bind
- 头文件`<std:functional>`
- std::bind将可调用参数及其对象进行绑定。
- 绑定后的结果可以用std:function进行保存，并延迟调用到任何我们需要的时候。
- 学习资料1: https://zhuanlan.zhihu.com/p/354765449
- 学习资料2: https://en.cppreference.com/w/cpp/utility/functional/bind

### demo
```c++
#include <iostream>
#include <vector>
#include <functional>
using namespace std;

int add(int a,int b) {
    return a + b;
}

void testBind() {
    auto f1 = std::bind(add,std::placeholders::_1,std::placeholders::_2);
    int c = f1(3,4);
    cout << 3 << " + " << 4 << " = " << c << endl;
}

int main() {
    testBind();
    return 0;
}
```

## lambda
- 学习资料: https://en.cppreference.com/w/cpp/language/lambda

## 模版的改进

## 并发
- c++11线程相关知识：https://zhuanlan.zhihu.com/p/137914574

### std:thread
- 学习资源: https://zhuanlan.zhihu.com/p/389140084
#### 重要函数
- explicit thread(Fn&&fn, Args&&...args)：初始化构造函数，创建一个带函数调用参数的thread，这个线程是可joinable的；
- thread() noexcept：默认构造函数，创建一个空的thread执行对象;
- thread(const thread&) = delete：拷贝构造函数被禁用，意味着thread对象不可拷贝构造；
- thread(thread&& x) noexcept：移动构造函数，调用成功之后，x不代表任何thread执行对象；
- get_id()：获取线程的ID，它将返回一个类型为std::thread::id的对象。
- joinable()：检查线程是否可被join。
- detach()：将当前线程对象所代表的执行实例与此线程对象分离，使得线程可以单独执行。
- swap()：交换两个线程对象所代表的底层句柄，参数是两个线程对象；
- std::this_thread::getid()：获取当前线程的ID；
- std::this_thread::yield()：当前线程放弃执行，操作系统调度另一线程继续执行；
- sleep_until()：线程休眠至某个指定的时刻，才被重新唤醒；
- sleep_for()： 线程休眠某个指定的时间片，才被重新唤醒；

#### thread中的互斥量
- std:mutex 独占式的互斥量
- std:recursive_mutex 递归式互斥量
- std:timed_mutex 允许超时的独占式互斥量
- std:recursive_timed_mutex 允许超时的递归式互斥量

### std:mutex
- 学习资料: https://zhuanlan.zhihu.com/p/598993031
### std:lock
#### 学习资料
- https://en.cppreference.com/w/cpp/thread/lock

### std:atomic
- https://en.cppreference.com/w/cpp/atomic/atomic

### std:call_once
- https://en.cppreference.com/w/cpp/thread/call_once
- https://blog.csdn.net/u012372584/article/details/96867805

### volatile
- 学习资料: https://zhuanlan.zhihu.com/p/62060524
- 当要求使用 volatile 声明的变量的值的时候，系统总是重新从它所在的内存读取数据，即使它前面的指令刚刚从该处读取过数据。
```
volatile int a = 10;
```

### std:condition_variable
### std:future
### async
#### 学习资料
- https://zhuanlan.zhihu.com/p/349193932
- https://blog.csdn.net/lijinqi1987/article/details/78909479

## 智能指针
- c++新特性之智能指针：https://zhuanlan.zhihu.com/p/137958974
### std:shared_ptr
### std:weak_ptr
### std:unique_ptr

## 基于范围的for循环
```c++
void testFor() {
    cout << endl << "2. testFor---start" << endl;
    vector<int> v;
    for (int i=0;i<5;++i) {
        v.push_back(i);
    }
    for (auto it = v.begin();it != v.end(); it++) {
        cout<< "*it:" << *it << endl;
    }

    for(auto i:v) {
        cout << "newFor:" << i << endl;
    }

    cout << endl << "2. testFor---end" << endl;
}
```
## 委托构造函数

## 继承构造函数

## nullptr

## final

## override

## default

## delete

## explicit

## const

## constexpr

## enum class

## 非受限联合体

## sizeof
- c++11 使用sizeof不用实例化一个对象就可以计算出大小了
```c++
truct A {
    int data[10];
    int a;
};

int main() {
    cout << "size " << sizeof(A::data) << endl;
    return 0;
}
```
## assertion
- c++11引入static_assert声明，用于在编译期间检查，
- 如果第一个参数值为false，则打印message，编译失败。
```c++
assert(true/false,message);
```

## 自定义字面量

## 内存对齐
- https://zhuanlan.zhihu.com/p/139520591

## thread_local

## 基础数值类型
c++11增加了几种数据类型:
- long long
- char16_t
- char32_t

## 随机数功能
```c++
#include <time.h>

#include <iostream>
#include <random>

using namespace std;

int main() {
    std::default_random_engine random(time(nullptr));

    std::uniform_int_distribution<int> int_dis(0, 100); // 整数均匀分布
    std::uniform_real_distribution<float> real_dis(0.0, 1.0); // 浮点数均匀分布

    for (int i = 0; i < 10; ++i) {
        cout << int_dis(random) << ' ';
    }
    cout << endl;

    for (int i = 0; i < 10; ++i) {
        cout << real_dis(random) << ' ';
    }
    cout << endl;

    return 0;
}
```

- 输出
```c++
38 100 93 7 66 0 68 99 41 7
0.232202 0.617716 0.959241 0.970859 0.230406 0.430682 0.477359 0.971858 0.0171148 0.64863
```

- 代码中举例的是整数均匀分布和浮点数均匀分布
- c++11提供的概率分布类型还有好多，例如伯努利分布、正态分布等，具体可以见最后的参考资料。

## 正则表达式
c++11引入了regex库，更好地支持正则表达式

## chrono
c++11关于时间引入了chrono库，功能强大，chrono主要有3点：
- duration
- time_point
- clocks

## 新增数据结构
- std::forward_list
- std:unordered_set
- std:unordered_map
- std:array
  - 头文件<array>
  - 支持迭代器
  - https://blog.csdn.net/qq_38410730/article/details/102802239

- std:tuple
  - https://en.cppreference.com/w/cpp/utility/tuple

## 新增加算法
- all_of:：检测表达式是否对范围[first, last)中所有元素都返回true，如果都满足，则返回true
```c++
std::vector<int> v(10, 2);
if (std::all_of(v.cbegin(), v.cend(), [](int i) { return i % 2 == 0; })) {
      std::cout << "All numbers are even\n";
}
```
- any_of
- none_of
- find_if_not
- copy_if
- itoa:对容器内的元素按序递增。

## c++11各个编译器的支持情况
- https://en.cppreference.com/w/cpp/compiler_support/11

## 总结
- 这里知识简单罗列了c++11新增的一些特性，后续会专门测试并记录一些各个特性的具体使用情况。

## 参考
- https://zhuanlan.zhihu.com/p/139515439


---

> 作者:   
> URL: http://111.230.8.71:8889/cpp11/  

