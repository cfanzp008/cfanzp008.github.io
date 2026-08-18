# C++ STL vector 终结篇：从入门到实战的完整用法指南


<!--more-->

# C++ STL vector 终结篇：从入门到实战的完整用法指南

## 引言

`std::vector` 是 C++ STL 中最常用的顺序容器，本质是一个**动态数组**：元素在内存中连续存储，支持 O(1) 随机访问，尾部增删元素均摊 O(1)，中间插入删除为 O(n)。

相比 C 语言原生数组，vector 自动管理内存、随时扩容，是日常开发的首选容器。写下这篇文章，把 vector 的构造、访问、迭代、容量管理、增删改查、与算法配合、二维用法和常见陷阱一次性讲透，每种用法配两个示例，看完直接上手。

使用 vector 需要包含头文件：

```cpp
#include <vector>
```

## 构造与初始化

### 默认构造

默认构造得到一个空的 vector，之后通过 `push_back` 或 `assign` 填充。

**示例 1：默认构造后动态添加**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;          // 空 vector
    v.push_back(10);
    v.push_back(20);

    std::cout << "size = " << v.size() << std::endl;  // 2
    std::cout << "v[1] = " << v[1] << std::endl;      // 20
    return 0;
}
```

**示例 2：默认构造对象类型（无默认构造函数的类型必须这样写）**

```cpp
#include <iostream>
#include <string>
#include <vector>

struct Person {
    std::string name;
    explicit Person(std::string n) : name(std::move(n)) {}
};

int main() {
    std::vector<Person> people;   // 先空构造
    people.emplace_back("Alice"); // 原地构造，避免拷贝
    std::cout << people[0].name << std::endl;  // Alice
    return 0;
}
```

### 指定大小构造

可以指定元素个数，可选填初值。

**示例 1：只给大小，元素被值初始化（int 为 0）**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v(5);       // 5 个元素，均为 0
    for (int x : v) std::cout << x << " ";  // 0 0 0 0 0
    std::cout << std::endl;
    return 0;
}
```

**示例 2：大小 + 初值**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v(4, 7);    // 4 个元素，均为 7
    std::cout << v.size() << std::endl;   // 4
    std::cout << v.front() << std::endl;  // 7
    return 0;
}
```

### 迭代器范围构造

用一段区间（迭代器对）初始化 vector，常用于从数组、另一个容器或容器的一部分拷贝数据。

**示例 1：从 C 数组初始化**

```cpp
#include <iostream>
#include <vector>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    std::vector<int> v(std::begin(arr), std::end(arr));

    for (int x : v) std::cout << x << " ";  // 1 2 3 4 5
    std::cout << std::endl;
    return 0;
}
```

**示例 2：从另一个 vector 截取子区间**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> src = {10, 20, 30, 40, 50};
    // 取下标 [1, 4) 即 20, 30, 40
    std::vector<int> sub(src.begin() + 1, src.begin() + 4);
    for (int x : sub) std::cout << x << " ";  // 20 30 40
    std::cout << std::endl;
    return 0;
}
```

### 初始化列表与拷贝构造（C++11）

C++11 起可以用花括号初始化列表直接构造，拷贝构造生成一份深拷贝。

**示例 1：初始化列表构造**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{3, 1, 4, 1, 5};
    std::cout << v.size() << std::endl;   // 5
    std::cout << v[2] << std::endl;       // 4
    return 0;
}
```

**示例 2：拷贝构造，修改副本不影响原 vector**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 3};
    std::vector<int> b(a);       // 拷贝构造

    b.push_back(4);
    std::cout << a.size() << " " << b.size() << std::endl;  // 3 4
    return 0;
}
```

## 赋值与交换

### operator= 赋值

vector 支持整体赋值，源容器可以是另一个 vector 或初始化列表。

**示例 1：vector 之间赋值**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 3};
    std::vector<int> b;
    b = a;                          // 整体赋值（深拷贝）
    a.push_back(4);
    std::cout << b.size() << std::endl;  // 3，a 的修改不影响 b
    return 0;
}
```

**示例 2：初始化列表赋值**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v = {5, 6, 7};                  // 重新赋值
    std::cout << v.size() << " " << v.back() << std::endl;  // 3 7
    return 0;
}
```

### assign 重新填充

`assign` 可以把 vector 重新填成指定内容，两种重载：范围赋值和计数赋值。

**示例 1：计数赋值（N 个相同的值）**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3};
    v.assign(4, 9);                 // 清空后填入 4 个 9
    for (int x : v) std::cout << x << " ";  // 9 9 9 9
    std::cout << std::endl;
    return 0;
}
```

**示例 2：范围赋值（从数组或另一容器）**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    int arr[] = {100, 200, 300};
    v.assign(arr, arr + 3);         // 从数组区间填充
    std::cout << v[0] << " " << v[2] << std::endl;  // 100 300
    return 0;
}
```

### swap 高效交换

`swap` 只交换内部指针，O(1) 复杂度，比逐个拷贝快得多。

**示例 1：交换两个 vector**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2};
    std::vector<int> b{3, 4, 5};
    a.swap(b);
    std::cout << a.size() << " " << b.size() << std::endl;  // 3 2
    return 0;
}
```

**示例 2：用 swap 释放内存（清空容量）**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v(1000, 1);
    std::cout << "capacity before: " << v.capacity() << std::endl;

    std::vector<int>().swap(v);     // 与空 vector 交换，内存归还系统
    std::cout << "capacity after: " << v.capacity() << std::endl;  // 0
    return 0;
}
```

## 元素访问

### operator[] 与 at

`operator[]` 不检查越界（更快），`at` 越界时抛出 `std::out_of_range` 异常（更安全）。

**示例 1：operator[] 随机访问和修改**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{10, 20, 30};
    v[0] = 99;                      // 通过下标修改
    std::cout << v[0] << std::endl; // 99
    std::cout << v[2] << std::endl; // 30
    return 0;
}
```

**示例 2：at() 越界抛异常**

```cpp
#include <iostream>
#include <stdexcept>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3};
    try {
        std::cout << v.at(10) << std::endl;  // 越界
    } catch (const std::out_of_range& e) {
        std::cout << "caught: " << e.what() << std::endl;
    }
    return 0;
}
```

### front 与 back

`front()` 返回首元素引用，`back()` 返回尾元素引用，空容器上调用是未定义行为。

**示例 1：读取首尾**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{7, 8, 9};
    std::cout << v.front() << std::endl;  // 7
    std::cout << v.back() << std::endl;   // 9
    return 0;
}
```

**示例 2：通过引用修改首尾元素**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4};
    v.front() = 100;                // 修改第一个
    v.back() = -100;                // 修改最后一个
    std::cout << v.front() << " " << v.back() << std::endl;  // 100 -100
    return 0;
}
```

### data 获取底层指针

`data()` 返回指向连续内存的裸指针，便于与 C 风格函数交互。

**示例 1：与 C 函数（memcpy）配合**

```cpp
#include <cstring>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> dst(5, 0);
    int src[] = {1, 2, 3, 4, 5};
    std::memcpy(dst.data(), src, 5 * sizeof(int));  // 直接拷入底层内存
    std::cout << dst[4] << std::endl;  // 5
    return 0;
}
```

**示例 2：按 C 指针遍历**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{11, 22, 33};
    int* p = v.data();              // 等价于 &v[0]
    for (int i = 0; i < 3; ++i) {
        std::cout << p[i] << " ";   // 11 22 33
    }
    std::cout << std::endl;
    return 0;
}
```

## 迭代器

### begin 与 end 正向遍历

`begin()` 指向首元素，`end()` 指向尾元素之后的位置（开区间）。

**示例 1：for 循环遍历**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{5, 4, 3};
    for (auto it = v.begin(); it != v.end(); ++it) {
        *it += 10;                  // 通过迭代器修改元素
    }
    for (int x : v) std::cout << x << " ";  // 15 14 13
    std::cout << std::endl;
    return 0;
}
```

**示例 2：范围 for 等价写法**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::string> v{"a", "b", "c"};
    for (const auto& s : v) {       // v 的 begin/end 就在这里发挥作用
        std::cout << s << " ";      // a b c
    }
    std::cout << std::endl;
    return 0;
}
```

### rbegin 与 rend 反向遍历

反向迭代器从尾部向头部遍历，配合 `rbegin()/rend()` 使用。

**示例 1：反向打印**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4};
    for (auto it = v.rbegin(); it != v.rend(); ++it) {
        std::cout << *it << " ";    // 4 3 2 1
    }
    std::cout << std::endl;
    return 0;
}
```

**示例 2：借助反向迭代器查找最后一个等于目标值的位置**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 2, 1};
    auto it = std::find(v.rbegin(), v.rend(), 2);
    if (it != v.rend()) {
        // 反向后下标 = 距离，对应原下标 = size - 1 - 距离
        std::cout << "last 2 at index "
                  << static_cast<int>(v.size() - 1 - (it - v.rbegin()))
                  << std::endl;     // index 3
    }
    return 0;
}
```

### cbegin 与 cend 常量迭代器

C++11 提供 `cbegin()/cend()` 返回常量迭代器，只能读不能改，防止误修改。

**示例 1：只读遍历**

```cpp
#include <iostream>
#include <vector>

int main() {
    const std::vector<int> v{1, 2, 3};
    for (auto it = v.cbegin(); it != v.cend(); ++it) {
        std::cout << *it << " ";    // 只读：1 2 3
    }
    std::cout << std::endl;
    return 0;
}
```

**示例 2：与算法配合（remove_if 等只读场景）**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{4, 7, 4, 9, 4};
    // 用 cbegin/cend 统计出现次数，保证不修改数据
    int cnt = std::count(v.cbegin(), v.cend(), 4);
    std::cout << "count of 4 = " << cnt << std::endl;  // 3
    return 0;
}
```

## 容量管理

### size 与 empty

`size()` 返回元素个数，`empty()` 判断是否为空，两者都是 O(1)。

**示例 1：获取 size**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<double> v{1.5, 2.5, 3.5};
    std::cout << "size = " << v.size() << std::endl;   // 3
    v.push_back(4.5);
    std::cout << "size = " << v.size() << std::endl;   // 4
    return 0;
}
```

**示例 2：empty 判空**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    std::cout << v.empty() << std::endl;   // 1（true）

    v.push_back(1);

    std::cout << v.empty() << std::endl;   // 0（false）
    std::cout << v.size() * v.size() << std::endl;  // 1
    return 0;
}
```

### capacity 与 reserve

`capacity()` 是当前分配的容量（>= size），`reserve(n)` 预分配至少 n 个元素的空间，避免反复扩容拷贝。

**示例 1：观察 capacity 增长规律**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    for (int i = 0; i < 10; ++i) {
        v.push_back(i);
        std::cout << "size=" << v.size()
                  << " capacity=" << v.capacity() << std::endl;
    }
    // 典型输出：1->1, 2->2, 3->4, 5->8, 9->16（约 1.5~2 倍增长）
    return 0;
}
```

**示例 2：reserve 预分配避免扩容**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.reserve(1000);                    // 一次性分配足够空间
    for (int i = 0; i < 1000; ++i) {
        v.push_back(i);                 // 全程不触发扩容
    }
    std::cout << "size=" << v.size()
              << " capacity=" << v.capacity() << std::endl;  // 1000 1000
    return 0;
}
```

### resize 与 shrink_to_fit

`resize(n)` 改变元素个数（可能增删元素），`shrink_to_fit()` 把 capacity 缩减到 size（非强制，取决于实现）。

**示例 1：resize 增大与缩小**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3};
    v.resize(5, 0);                 // 扩大到 5，新增元素填 0
    std::cout << v.size() << " " << v[4] << std::endl;  // 5 0

    v.resize(2);                    // 缩小到 2，多余元素被丢弃
    std::cout << v.size() << " " << v.back() << std::endl;  // 2 2
    return 0;
}
```

**示例 2：shrink_to_fit 回收多余容量**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v(100, 1);
    v.resize(10);                   // 只保留 10 个
    std::cout << "capacity: " << v.capacity() << std::endl;  // 可能仍是 100

    v.shrink_to_fit();
    std::cout << "capacity: " << v.capacity() << std::endl;  // 10 左右
    return 0;
}
```

### max_size

`max_size()` 返回理论上能容纳的最大元素个数（取决于内存与实现），正常代码很少用到，但可用于边界检查。

**示例 1：单独使用**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    std::cout << "max_size = " << v.max_size() << std::endl;
    return 0;
}
```

**示例 2：分配前校验**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<char> v;
    unsigned long long want = 1ULL << 62;  // 超过任何机器实际能力
    if (want > v.max_size()) {
        std::cout << "cannot allocate, exceeded max_size" << std::endl;
        return 1;
    }
    v.resize(want);
    std::cout << v.size() << std::endl;
    return 0;
}
```

## 增删元素

### push_back 与 pop_back

`push_back` 尾部追加，`pop_back` 尾部弹出，均摊 O(1)。

**示例 1：push_back 追加多个元素**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    std::cout << v.size() << " " << v.back() << std::endl;  // 3 3
    return 0;
}
```

**示例 2：pop_back 删除尾部**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    v.pop_back();
    v.pop_back();
    std::cout << v.size() << " " << v.back() << std::endl;  // 3 3
    v.clear();                       // 顺便演示 clear：全部清空
    std::cout << v.empty() << std::endl;  // 1
    return 0;
}
```

### emplace_back 与 emplace

C++11 起 `emplace_back` 在容器内**原地构造**元素，省去一次临时对象拷贝/移动；`emplace(pos, args...)` 是 insert 的就地版本。

**示例 1：emplace_back 构造复杂对象**

```cpp
#include <iostream>
#include <string>
#include <vector>

struct Point {
    int x, y;
    Point(int a, int b) : x(a), y(b) {}
};

int main() {
    std::vector<Point> points;
    points.emplace_back(1, 2);      // 直接传构造参数，无需创建临时对象
    points.emplace_back(3, 4);
    std::cout << points[1].x << "," << points[1].y << std::endl;  // 3,4
    return 0;
}
```

**示例 2：emplace 在指定位置就地构造**

```cpp
#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> v{"a", "c"};
    v.emplace(v.begin() + 1, 3, 'b');   // 位置 1 处构造 "bbb"
    for (const auto& s : v) std::cout << s << " ";  // a bbb c
    std::cout << std::endl;
    return 0;
}
```

### insert 插入

`insert` 有多种重载：单元素、多个相同值、迭代器区间。中间插入为 O(n)，因为后续元素要后移。

**示例 1：在指定位置插入单个元素**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3};
    auto it = v.insert(v.begin() + 1, 99);  // 插到下标 1
    std::cout << v[1] << std::endl;         // 99
    std::cout << *it << std::endl;          // 返回指向新元素的迭代器 99
    return 0;
}
```

**示例 2：插入多个相同值 / 区间**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 5};
    v.insert(v.begin() + 1, 3, 0);      // 插入 3 个 0
    // v: 1 0 0 0 5

    std::vector<int> extra{7, 8};
    v.insert(v.end(), extra.begin(), extra.end());  // 尾部追加区间
    // v: 1 0 0 0 5 7 8
    std::cout << v.size() << " " << v.back() << std::endl;  // 7 8
    return 0;
}
```

### erase 删除

`erase` 可删除单个元素或一个区间，返回被删元素之后的位置（C++11 起）。中间删除同样 O(n)。

**示例 1：删除单个元素**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    v.erase(v.begin() + 2);             // 删除 3
    for (int x : v) std::cout << x << " ";  // 1 2 4 5
    std::cout << std::endl;
    return 0;
}
```

**示例 2：删除一个区间**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6};
    v.erase(v.begin() + 1, v.begin() + 4);  // 删除 [1,4) 即 2,3,4
    for (int x : v) std::cout << x << " ";  // 1 5 6
    std::cout << std::endl;
    return 0;
}
```

## 与 STL 算法配合

### sort 排序

`std::sort` 对随机迭代器 O(n log n) 排序，可自定义比较函数（普通函数、lambda 均可）。

**示例 1：默认升序排序**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{5, 2, 9, 1, 7};
    std::sort(v.begin(), v.end());      // 升序
    for (int x : v) std::cout << x << " ";  // 1 2 5 7 9
    std::cout << std::endl;
    return 0;
}
```

**示例 2：lambda 自定义规则（降序 / 结构体排序）**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

struct Student {
    std::string name;
    int score;
};

int main() {
    std::vector<int> nums{3, 1, 4, 1, 5};
    std::sort(nums.begin(), nums.end(),
              [](int a, int b) { return a > b; });  // 降序
    std::cout << nums.front() << std::endl;         // 5

    std::vector<Student> st{{"a", 80}, {"b", 95}, {"c", 70}};
    std::sort(st.begin(), st.end(),
              [](const Student& x, const Student& y) {
                  return x.score > y.score;         // 按分数降序
              });
    std::cout << st[0].name << std::endl;           // b
    return 0;
}
```

### find 查找

`std::find` 线性查找，返回指向第一个匹配元素的迭代器；找不到返回 `end()`。

**示例 1：查找基本类型**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{10, 20, 30, 40};
    auto it = std::find(v.begin(), v.end(), 30);
    if (it != v.end()) {
        std::cout << "found at index "
                  << std::distance(v.begin(), it) << std::endl;  // 2
    }
    return 0;
}
```

**示例 2：查找不存在的值**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3};
    auto it = std::find(v.begin(), v.end(), 99);
    if (it == v.end()) {
        std::cout << "99 not found" << std::endl;
        // 处理未找到：可以向尾部插入
        v.push_back(99);
    }
    std::cout << v.back() << std::endl;  // 99
    return 0;
}
```

### binary_search 与 lower_bound

在**已排序**的 vector 上二分查找：`binary_search` 只返回是否存在，`lower_bound` 返回第一个不小于目标值的位置。

**示例 1：binary_search 判断存在性**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 3, 5, 7, 9};
    if (std::binary_search(v.begin(), v.end(), 5)) {
        std::cout << "5 exists" << std::endl;    // 输出
    }
    if (!std::binary_search(v.begin(), v.end(), 6)) {
        std::cout << "6 not exists" << std::endl;
    }
    return 0;
}
```

**示例 2：lower_bound 定位插入点**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 3, 5, 7};
    // 找到第一个 >= 4 的位置，插入后保持有序
    auto it = std::lower_bound(v.begin(), v.end(), 4);
    v.insert(it, 4);
    for (int x : v) std::cout << x << " ";   // 1 3 4 5 7
    std::cout << std::endl;
    return 0;
}
```

### max_element 与 accumulate

`max_element/min_element` 返回最值的迭代器，`accumulate` 做区间求和（需 `<numeric>`）。

**示例 1：求最大值和最小值**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{3, 8, 1, 6, 11};
    auto mx = std::max_element(v.begin(), v.end());
    auto mn = std::min_element(v.begin(), v.end());
    std::cout << "max = " << *mx << std::endl;  // 11
    std::cout << "min = " << *mn << std::endl;  // 1
    return 0;
}
```

**示例 2：accumulate 求和与自定义归约**

```cpp
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    int sum = std::accumulate(v.begin(), v.end(), 0);
    std::cout << "sum = " << sum << std::endl;  // 15

    int prod = std::accumulate(v.begin(), v.end(), 1,
                               [](int a, int b) { return a * b; });
    std::cout << "prod = " << prod << std::endl;  // 120
    return 0;
}
```

### reverse 反转

`std::reverse` 原地反转区间顺序，O(n)。

**示例 1：反转整个 vector**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    std::reverse(v.begin(), v.end());
    for (int x : v) std::cout << x << " ";  // 5 4 3 2 1
    std::cout << std::endl;
    return 0;
}
```

**示例 2：只反转局部区间**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    std::reverse(v.begin() + 1, v.begin() + 4);  // 反转 [1,4)
    for (int x : v) std::cout << x << " ";       // 1 4 3 2 5
    std::cout << std::endl;
    return 0;
}
```

### remove + erase 惯用法

`std::remove` 只把"要删的元素"移到末尾并返回新逻辑尾部，真正删除还需 `erase`，两者配合是删除满足条件元素的标准写法。

**示例 1：删除所有指定值**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{3, 1, 3, 2, 3, 4};
    // 先 remove 后 erase：删除所有 3
    v.erase(std::remove(v.begin(), v.end(), 3), v.end());
    for (int x : v) std::cout << x << " ";  // 1 2 4
    std::cout << std::endl;
    return 0;
}
```

**示例 2：remove_if 按条件删除**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6};
    // 删除所有偶数
    v.erase(std::remove_if(v.begin(), v.end(),
                           [](int x) { return x % 2 == 0; }),
            v.end());
    for (int x : v) std::cout << x << " ";  // 1 3 5
    std::cout << std::endl;
    return 0;
}
```

## 二维 vector

### 定义与访问

二维 vector 是"vector 的 vector"：`vector<vector<T>>`。注意 `>>` 在 C++11 之前要写成 `> >`。

**示例 1：固定行列的二维数组**

```cpp
#include <iostream>
#include <vector>

int main() {
    // 3 行 4 列，全部初始化为 0
    std::vector<std::vector<int>> grid(3, std::vector<int>(4, 0));
    grid[1][2] = 42;                    // 行优先访问
    std::cout << grid[1][2] << std::endl;  // 42
    std::cout << grid.size() << "x"
              << grid[0].size() << std::endl;  // 3x4
    return 0;
}
```

**示例 2：从初始化列表构造**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> matrix{
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    };
    std::cout << matrix[2][1] << std::endl;  // 8
    return 0;
}
```

### 遍历与不规则二维数组

每行可以有不同的长度（不规则数组），遍历时逐行处理。

**示例 1：双重循环遍历**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> m{{1, 2}, {3, 4, 5}};
    int sum = 0;
    for (const auto& row : m) {         // row 是 vector<int> 的引用
        for (int x : row) sum += x;
    }
    std::cout << "sum = " << sum << std::endl;  // 15
    return 0;
}
```

**示例 2：动态构造不规则行（三角阵）**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> tri;
    for (int i = 1; i <= 3; ++i) {
        tri.push_back(std::vector<int>(i, i));  // 第 i 行 i 个元素
    }
    for (const auto& row : tri) {
        for (int x : row) std::cout << x << " ";
        std::cout << std::endl;
    }
    // 输出：
    // 1
    // 2 2
    // 3 3 3
    return 0;
}
```

## 比较运算

vector 支持关系运算符（`==`、`!=`、`<`、`<=`、`>`、`>=`）：`==` 要求大小与对应元素全相等，`<` 按元素字典序比较。

### == 与 !=

**示例 1：相等与不等判断**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 3};
    std::vector<int> b{1, 2, 3};
    std::vector<int> c{1, 2, 4};

    std::cout << (a == b) << std::endl;  // 1
    std::cout << (a == c) << std::endl;  // 0
    std::cout << (a != c) << std::endl;  // 1
    return 0;
}
```

**示例 2：size 不同直接不等**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 3};
    std::vector<int> b{1, 2, 3, 4};
    std::cout << (a == b) << std::endl;  // 0：长度不同即不等
    return 0;
}
```

### 字典序比较

**示例 1：< 运算符**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v1{1, 2, 3};
    std::vector<int> v2{1, 2, 4};
    std::vector<int> v3{1, 2};
    std::cout << (v1 < v2) << std::endl;  // 1：第 3 个元素 3<4
    std::cout << (v3 < v1) << std::endl;  // 1：前缀短者更小
    return 0;
}
```

**示例 2：用于排序与判重**

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> lists{{3, 1}, {1, 2}, {1, 2}};
    std::sort(lists.begin(), lists.end());          // 依赖 operator<
    std::cout << lists[0][0] << std::endl;          // 1
    std::cout << (lists[0] == lists[1]) << std::endl;  // 1：可判重
    return 0;
}
```

## 注意事项与常见陷阱

### 动态扩容与迭代器失效

vector 容量不足时会重新分配整块更大内存并拷贝所有元素，**所有指向旧内存的迭代器、指针、引用全部失效**（未定义行为）。扩容后继续使用旧迭代器是 vector 最常见的坑之一。

**示例 1：扩容导致迭代器失效（错误写法）**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3};
    auto it = v.begin();

    for (int i = 4; i <= 10; ++i) {
        v.push_back(i);             // 多次扩容，旧迭代器已不可用
    }
    // 危险！it 指向的内存可能已被释放
    std::cout << *it << std::endl;  // 未定义行为，切勿这样写
    return 0;
}
```

**示例 2：先 reserve 保证迭代器稳定**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3};
    v.reserve(10);                  // 预分配，之后 push 不再扩容
    auto it = v.begin();

    for (int i = 4; i <= 10; ++i) {
        v.push_back(i);
    }
    std::cout << *it << std::endl;  // 1，迭代器依然有效
    return 0;
}
```

### erase 循环删除的正确写法

循环中调用 `erase` 后迭代器自动后移，如果循环体里再 `++it` 就会跳元素甚至越界。正确做法是在 `erase` 时让循环变量接收返回值，或使用 remove-erase 惯用法。

**示例 1：错误写法（会跳过元素）**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 2, 3};
    for (auto it = v.begin(); it != v.end(); ++it) {
        if (*it == 2) {
            v.erase(it);            // 删除后 it 指向下一元素，但循环又 ++it
        }
    }
    // 有一个 2 被跳过
    for (int x : v) std::cout << x << " ";  // 1 2 3
    std::cout << std::endl;
    return 0;
}
```

**示例 2：正确写法（erase 返回下一个迭代器）**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 2, 3};
    for (auto it = v.begin(); it != v.end(); ) {
        if (*it == 2) {
            it = v.erase(it);       // 用返回值更新，不要 ++it
        } else {
            ++it;
        }
    }
    for (int x : v) std::cout << x << " ";  // 1 3
    std::cout << std::endl;
    return 0;
}
```

### 引用失效与死引用

除扩容外，`insert` 和 `erase` 也会让被操作位置之后的引用/迭代器失效。持有跨语句的引用时务必警惕。

**示例 1：insert/erase 使引用失效**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 6};
    int& ref = v[0];                // 引用首元素
    v.insert(v.begin(), 0);         // 所有元素后移，ref 绑定位置改变了

    // ref 现在指向的是新下标 1 的元素（实现相关，行为不确定）
    std::cout << ref << std::endl;  // 可能不是 1，避免这种写法
    return 0;
}
```

**示例 2：安全做法——每次取值**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 6};
    v.insert(v.begin(), 0);
    std::cout << v[0] << std::endl;  // 0：通过容器每次重新取
    std::cout << v[1] << std::endl;  // 1：结果确定
    return 0;
}
```

## 总结

vector 是 C++ 开发中使用频率最高的容器，掌握它的关键在于记住三个核心模型：

- **内存模型**：元素连续存储、尾部增删 O(1)、中间操作 O(n)，扩容约 1.5~2 倍且使全部迭代器失效。
- **接口模型**：构造六式（默认/大小/初值/范围/列表/拷贝）、访问五法（`[]`/`at`/`front`/`back`/`data`）、容量四件套（`reserve`/`resize`/`capacity`/`shrink_to_fit`）、增删八招（`push_back`/`pop_back`/`emplace`/`emplace_back`/`insert`/`erase`/`clear`/`swap`）。
- **算法模型**：配合 `<algorithm>` 的排序、查找、二分、最值、反转，以及最有价值的 remove-erase 惯用法。

编程时多问自己三个问题：会不会扩容（先 `reserve`）、迭代器会不会失效（用返回值更新）、能不能用 `emplace_back` 减少拷贝。一旦形成习惯，vector 就真正被你掌握了。

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/cpp-stl-vector/  

