# ubuntu20.04配置gtest环境


<!--more-->
# ubuntu20.04配置gtest环境
## 写一个脚本安装gtest
- cat ./install_gtest1.8.1.sh
```bash
cd /usr/local/src/
proxychains wget https://github.com/google/googletest/archive/release-1.8.1.tar.gz
tar -xzvf release-1.8.1.tar.gz
cd googletest-release-1.8.1/
mkdir build
cd build
cmake ../
make && make install
```

## 编写一个测试程序
- cat demo.cpp
```c++
#include "demo.h"

int add(int a, int b) {
  return (a + b);
}
```

- cat demo.h
```c++
#ifndef C_DEMO_H_
#define C_DEMO_H_

int add(int a, int b);

#endif //  C_DEMO_H_
```

- cat test_demo.cpp
```c++
#include <gtest/gtest.h>
#include "demo.cpp"

TEST(add, case1) {
  EXPECT_LT(2, add(0, 2));
  EXPECT_EQ(7, add(5, 2));
  ASSERT_LT(-2, add(1, 2));
  ASSERT_EQ(3, add(1, 2));
}

int main(int argc, char **argv) {
  testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
```

### build
```
g++ -std=c++11 test.cpp -o test -lgtest -lpthread
```

### 运行效果
```
[==========] Running 1 test from 1 test suite.
[----------] Global test environment set-up.
[----------] 1 test from add
[ RUN      ] add.case1
test_demo.cpp:5: Failure
Expected: (2) < (add(0, 2)), actual: 2 vs 2
[  FAILED  ] add.case1 (0 ms)
[----------] 1 test from add (0 ms total)

[----------] Global test environment tear-down
[==========] 1 test from 1 test suite ran. (0 ms total)
[  PASSED  ] 0 tests.
[  FAILED  ] 1 test, listed below:
[  FAILED  ] add.case1
```


---

> 作者:   
> URL: https://cfanzp.com/gtest/  

